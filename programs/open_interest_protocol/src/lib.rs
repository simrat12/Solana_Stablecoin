use anchor_lang::prelude::*;
use anchor_spl::token::{self, Transfer, MintTo, Burn, TokenAccount};
pub mod state;
use state::{PriceFeed, ErrorCode};
use anchor_lang::solana_program::entrypoint::ProgramResult;

declare_id!("4Nnb1v32be4zUXwBBrugiDsK3Pgs8uTmEcdk3UbrQxwJ");

#[program]
pub mod sol_anchor_contract {
    use super::*;
    pub fn init(ctx: Context<Init>) -> ProgramResult {
        let admin = &mut ctx.accounts.admin;
        admin.admin_pubkey = *ctx.accounts.user.key;
        Ok(())
    }

    pub fn deposit(ctx: Context<Deposit>, amount: u64) -> ProgramResult {
        let cpi_accounts = Transfer {
            from: ctx.accounts.from.to_account_info().clone(),
            to: ctx.accounts.borrower_collateral_account.to_account_info().clone(),
            authority: ctx.accounts.user.to_account_info().clone(),
        };
        let cpi_program = ctx.accounts.token_program.to_account_info().clone();
        let cpi_ctx = CpiContext::new(cpi_program, cpi_accounts);
        token::transfer(cpi_ctx, amount)?;
    
        let borrower = &mut ctx.accounts.borrower;
        borrower.collateral += amount as f64;
        borrower.owner = *ctx.accounts.user.key;
        Ok(())
    }

    pub fn withdraw(ctx: Context<Withdraw>, amount: u64) -> Result<()> {
        let borrower = &mut ctx.accounts.borrower;
        let borrower_collateral_account = &mut ctx.accounts.borrower_collateral_account;
        let user = &ctx.accounts.user;
    
        if borrower_collateral_account.owner != *borrower.to_account_info().key {
            return Err(error!(ErrorCode::InvalidOwner));
        }
    
        // considering health factor and current loan
        let max_withdrawable = borrower.collateral * borrower.health_factor - borrower.borrowed;
        if max_withdrawable < amount as f64 {
            return Err(error!(ErrorCode::NotEnoughCollateral));
        }
    
        let cpi_accounts = Transfer {
            from: ctx.accounts.borrower_collateral_account.to_account_info().clone(),
            to: ctx.accounts.to.to_account_info().clone(),
            authority: ctx.accounts.user.to_account_info().clone(),
        };
        let cpi_program = ctx.accounts.token_program.to_account_info().clone();
        let cpi_ctx = CpiContext::new(cpi_program, cpi_accounts);
        token::transfer(cpi_ctx, amount)?;
    
        borrower.collateral -= amount as f64;
        Ok(())
    }

    pub fn borrow(ctx: Context<Borrow>, amount: u64) -> Result<()> {
        let borrower = &mut ctx.accounts.borrower;
        let user = &ctx.accounts.user;
        let admin = &ctx.accounts.admin;
        
        if borrower.owner != *user.key && admin.admin_pubkey != *user.key {
            return Err(error!(ErrorCode::Unauthorized));
        }
    
        let loan_feed = &ctx.accounts.pyth_loan_account;
        let current_timestamp1 = Clock::get()?.unix_timestamp;
        let loan_price = loan_feed.get_price_no_older_than(current_timestamp1, 60).ok_or(ErrorCode::PythOffline)?;
        let loan_max_price = loan_price.price.checked_add(loan_price.conf as i64).ok_or(ErrorCode::Overflow)?;
        let value_of_collateral = borrower.collateral * loan_max_price as f64;
    
        if value_of_collateral < (amount * 100) as f64 {
            return Err(error!(ErrorCode::NotEnoughCollateral));
        }
    
        let cpi_accounts = MintTo {
            mint: ctx.accounts.debt_token_mint.to_account_info().clone(),
            to: ctx.accounts.borrower_debt_token_account.to_account_info().clone(),
            authority: ctx.accounts.admin.to_account_info().clone(),
        };
    
        let cpi_program = ctx.accounts.token_program.to_account_info().clone();
        let cpi_ctx = CpiContext::new(cpi_program, cpi_accounts);
        token::mint_to(cpi_ctx, amount)?;
    
        borrower.borrowed += amount as f64;
        Ok(())
    }

    pub fn repay(ctx: Context<Repay>, amount: u64) -> Result<()> {
        let borrower = &mut ctx.accounts.borrower;
        let user = &ctx.accounts.user;
        
        // Check if the user or admin is invoking this transaction.
        if borrower.owner != *user.key {
            return Err(error!(ErrorCode::Unauthorized));
        }
        if borrower.borrowed < (amount as f64) {
            return Err(error!(ErrorCode::NotEnoughCollateral));
        }
    
        let cpi_accounts = Burn {
            mint: ctx.accounts.debt_token_mint.to_account_info().clone(),
            from: ctx.accounts.borrower_debt_token_account.to_account_info().clone(),
            authority: ctx.accounts.user.to_account_info().clone(),
        };
        let cpi_program = ctx.accounts.token_program.to_account_info().clone();
        let cpi_ctx = CpiContext::new(cpi_program, cpi_accounts);
        token::burn(cpi_ctx, amount)?;
    
        borrower.borrowed -= amount as f64;
        Ok(())
    }

    pub fn get_health_factor(ctx: Context<GetHealthFactor>) -> Result<()> {
        let borrower = &mut ctx.accounts.borrower;
        let collateral_feed = &ctx.accounts.pyth_collateral_account;
        let current_timestamp1 = Clock::get()?.unix_timestamp;
        let loan_price = collateral_feed.get_price_no_older_than(current_timestamp1, 60).ok_or(ErrorCode::PythOffline)?;
        let loan_max_price = loan_price.price.checked_add(loan_price.conf as i64).ok_or(ErrorCode::Overflow)?;
        let value_of_collateral = borrower.collateral * loan_max_price as f64;
        borrower.health_factor = value_of_collateral / (borrower.borrowed * 100.0);
        Ok(())
    }
}


#[derive(Accounts)]
pub struct Init<'info> {
    /// CHECK: The `admin` account needs to be initialized, and its address needs
    /// to be derived from the `borrower` constant and the user's public key.
    #[account(init, payer = user, space = 8 + 24 + 32)]
    pub admin: Account<'info, Admin>,
    #[account(mut)]
    pub user: Signer<'info>,
    /// CHECK: The `system_program` is not constrained since we assume it is the System program which does not require any specific checks.
    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
pub struct Deposit<'info> {
    /// CHECK: Safe 
    #[account(mut)]
    pub from: AccountInfo<'info>,
    /// CHECK: Safe
    #[account(
        mut,
        seeds = [b"borrower_collateral".as_ref(), user.key.as_ref()],
        bump,
    )]
    pub borrower_collateral_account: Account<'info, TokenAccount>,
    /// CHECK: Safe
    #[account(
        init,
        seeds = [b"borrower".as_ref(), user.key.as_ref()],
        bump,
        payer = user,
        space = TokenAccount::LEN,
    )]
    pub borrower: Account<'info, Borrower>,
    /// CHECK: Safe
    pub system_program: AccountInfo<'info>,
    /// CHECK: Safe
    #[account(mut)]
    pub user: Signer<'info>,
    /// CHECK: Safe
    pub token_program: AccountInfo<'info>,
}

#[derive(Accounts)]
pub struct Withdraw<'info> {
    /// CHECK: Safe
    #[account(
        seeds = [user.key().as_ref()],
        bump,
    )]
    pub borrower: Account<'info, Borrower>,
    /// CHECK: Safe
    #[account(
        mut,
        constraint = borrower_collateral_account.owner == *borrower.to_account_info().key,
    )]
    pub borrower_collateral_account: Account<'info, TokenAccount>,
    /// CHECK: Safe
    #[account(mut)]
    pub to: AccountInfo<'info>,
    /// CHECK: Safe
    pub user: Signer<'info>,
    /// CHECK: Safe
    pub token_program: AccountInfo<'info>,
}

#[derive(Accounts)]
pub struct Borrow<'info> {
    /// CHECK: Safe
    pub admin: Account<'info, Admin>,
    #[account(
        seeds = [user.key().as_ref()],
        bump,
    )]
    /// CHECK: Safe
    pub borrower: Account<'info, Borrower>,
    // CHECK: Safe
    pub pyth_loan_account: Account<'info, PriceFeed>,
    /// CHECK: Safe
    #[account(mut)]
    pub borrower_debt_token_account: Account<'info, TokenAccount>,
    /// CHECK: Safe
    pub debt_token_mint: AccountInfo<'info>,
    /// CHECK: Safe
    pub token_program: AccountInfo<'info>,
    /// CHECK: Safe
    pub user: Signer<'info>,
}

#[derive(Accounts)]
pub struct Repay<'info> {
    /// CHECK: Safe
    #[account(
        seeds = [user.key().as_ref()],
        bump,
    )]
    pub borrower: Account<'info, Borrower>,
    /// CHECK: Safe
    #[account(
        mut,
        constraint = borrower_debt_token_account.owner == *user.key,
    )]
    pub borrower_debt_token_account: Account<'info, TokenAccount>,
    /// CHECK: Safe
    pub debt_token_mint: AccountInfo<'info>,
    /// CHECK: Safe
    pub token_program: AccountInfo<'info>,
    /// CHECK: Safe
    pub user: Signer<'info>,
}

#[derive(Accounts)]
pub struct GetHealthFactor<'info> {
    /// CHECK: Safe
    pub admin: Account<'info, Admin>,
    pub user: Signer<'info>,
    /// CHECK: Safe
    #[account(
        seeds = [user.key().as_ref()],
        bump,
    )]
    pub borrower: Account<'info, Borrower>,
    /// CHECK: Safe
    pub pyth_collateral_account: Account<'info, PriceFeed>,
}

#[account]
pub struct Admin {
    pub admin_pubkey: Pubkey,
}

#[derive(Default)]
#[account]
pub struct Borrower {
    pub collateral: f64,
    pub borrowed: f64,
    pub health_factor: f64,
    pub owner: Pubkey,
    pub bump : u8,
}









