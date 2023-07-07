use anchor_lang::prelude::*;
use anchor_spl::token::{self, Transfer};
pub mod state;
use state::{PriceFeed, ErrorCode};
use anchor_lang::solana_program::entrypoint::ProgramResult;


declare_id!("GFPM2LncpbWiLkePLs3QjcLVPw31B2h23FwFfhig79fh");


#[program]
pub mod sol_anchor_contract {
    use super::*;
    pub fn init(ctx: Context<Init>, admin_pubkey: Pubkey) -> ProgramResult {
        let admin = &mut ctx.accounts.admin;
        admin.admin_pubkey = admin_pubkey;
        Ok(())
    }

    pub fn deposit(ctx: Context<Deposit>, amount: u64) -> Result<()> {
        let cpi_accounts = Transfer {
            from: ctx.accounts.from.to_account_info().clone(),
            to: ctx.accounts.to.to_account_info().clone(),
            authority: ctx.accounts.user.to_account_info().clone(),
        };
        let cpi_program = ctx.accounts.token_program.to_account_info().clone();
        let cpi_ctx = CpiContext::new(cpi_program, cpi_accounts);
        token::transfer(cpi_ctx, amount)?;
        
        let borrower = &mut ctx.accounts.borrower;
        borrower.collateral += amount as f64;
        Ok(())
    }

    pub fn withdraw(ctx: Context<Withdraw>, amount: u64) -> Result<()> {
        let borrower = &mut ctx.accounts.borrower;
        let from = &mut ctx.accounts.from;
        let user = &ctx.accounts.user;
    
        if from.owner != *user.key {
            return Err(error!(ErrorCode::InvalidOwner));
        }

        if borrower.collateral < (amount as f64) {
            return Err(error!(ErrorCode::NotEnoughCollateral));
        }

        let cpi_accounts = Transfer {
            from: ctx.accounts.from.to_account_info().clone(),
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
        let loan_feed = &ctx.accounts.pyth_loan_account;
        let current_timestamp1 = Clock::get()?.unix_timestamp;
        let loan_price = loan_feed.get_price_no_older_than(current_timestamp1, 60).ok_or(ErrorCode::PythOffline)?;
        let loan_max_price = loan_price.price.checked_add(loan_price.conf as i64).ok_or(ErrorCode::Overflow)?;
        let value_of_collateral = borrower.collateral * loan_max_price as f64; 
        if value_of_collateral < (amount * 100) as f64 {
            return Err(error!(ErrorCode::NotEnoughCollateral));
        }
        borrower.borrowed += amount as f64;
        Ok(())
    }

    pub fn repay(ctx: Context<Repay>, amount: u64) -> Result<()> {
        let borrower = &mut ctx.accounts.borrower;
        if borrower.borrowed < (amount as f64) {
            return Err(error!(ErrorCode::NotEnoughCollateral));
        }
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
    pub admin: Account<'info, Admin>,
    pub rent: Sysvar<'info, Rent>,
}

#[derive(Accounts)]
pub struct Deposit<'info> {
    pub admin: Account<'info, Admin>,
    #[account(mut)]
    pub borrower: Account<'info, Borrower>,
    #[account(mut)]
    pub from: Account<'info, Borrower>,
    pub to: Account<'info, Borrower>,
    pub user: AccountInfo<'info>,
    pub token_program: AccountInfo<'info>,
}

#[derive(Accounts)]
pub struct Withdraw<'info> {
    #[account(mut)]
    pub borrower: Account<'info, Borrower>,
    #[account(mut)]
    pub from: Account<'info, Borrower>,
    pub to: Account<'info, Borrower>,
    pub user: AccountInfo<'info>,
    pub token_program: AccountInfo<'info>,
}

#[derive(Accounts)]
pub struct Borrow<'info> {
    pub admin: Account<'info, Admin>,
    #[account(mut)]
    pub borrower: Account<'info, Borrower>,
    pub pyth_loan_account: Account<'info, PriceFeed>,
}

#[derive(Accounts)]
pub struct Repay<'info> {
    pub admin: Account<'info, Admin>,
    #[account(mut)]
    pub borrower: Account<'info, Borrower>,
}

#[derive(Accounts)]
pub struct GetHealthFactor<'info> {
    #[account(mut)]
    pub borrower: Account<'info, Borrower>,
    pub pyth_collateral_account: Account<'info, PriceFeed>,
}

#[account]
pub struct Admin {
    pub admin_pubkey: Pubkey,
}

#[account]
pub struct Borrower {
    pub collateral: f64,
    pub borrowed: f64,
    pub health_factor: f64,
    pub owner: Pubkey,
}








