use anchor_lang::prelude::*;
use anchor_lang::solana_program::entrypoint::ProgramResult;
use anchor_spl::token::{self, Transfer, MintTo, Burn, TokenAccount};
pub mod state;
use state::{PriceFeed, ErrorCode, AdminConfig};

declare_id!("4Bnb1v32be4zUXwBBrugiDsK3Pgs8uTmEcdk3UbrQxwJ");

#[program]
pub mod sol_anchor_contract {
    use super::*;

    pub fn create_accounts(ctx: Context<CreateAccounts>, config: AdminConfig) -> ProgramResult {
        let pda_account = &mut ctx.accounts.pda_account;
        ctx.accounts.config.set_inner(config);
        let user_deposit_account = &mut ctx.accounts.user_deposit_account;

        user_deposit_account.user = *ctx.accounts.user_account.key;
        user_deposit_account.deposited_amount = 0;

        Ok(())
    }

    pub fn deposit(ctx: Context<Deposit>, amount: u64) -> ProgramResult {
        // Transfer SOL from user_account to the PDA account
        let cpi_program = ctx.accounts.system_program.to_account_info();
        let cpi_accounts = [
            ctx.accounts.user_account.to_account_info().clone(),
            ctx.accounts.pda_account.to_account_info().clone(),
        ];

        let cpi_instruction = anchor_lang::solana_program::system_instruction::transfer(&ctx.accounts.user_account.key, &ctx.accounts.pda_account.key, amount);
        anchor_lang::solana_program::program::invoke_signed(&cpi_instruction, &cpi_accounts, &[])?;
        
        // Update the user deposit account with the new amount
        ctx.accounts.user_deposit_account.deposited_amount += amount;

        Ok(())
    }

    pub fn borrow(ctx: Context<Borrow>, amount: u64) -> Result<()> {
        let borrower = ctx.accounts.user_deposit_account.user;
        let user = &ctx.accounts.user;
        if borrower != *user.key {
            return Err(ErrorCode::Unauthorized.into());
        }

        if *ctx.accounts.borrower_debt_token_account.owner != *user.key {
            return Err(ErrorCode::Unauthorized.into());
        }
        
        let token_mint = token::accessor::mint(&ctx.accounts.borrower_debt_token_account)?;
        if token_mint != *ctx.accounts.debt_token_mint.key {
            return Err(ErrorCode::InvalidArgument.into());
        }

        let loan_feed = &ctx.accounts.pyth_loan_account;
        let current_timestamp1 = Clock::get()?.unix_timestamp;
        let loan_price = loan_feed.get_price_no_older_than(current_timestamp1, 60).ok_or(ErrorCode::PythOffline)?;
        let loan_max_price = loan_price.price.checked_add(loan_price.conf as i64).ok_or(ErrorCode::Overflow)?;
        let value_of_collateral = ctx.accounts.user_deposit_account.deposited_amount * loan_max_price as u64;

        if value_of_collateral < (amount * 100) {
            return Err(error!(ErrorCode::NotEnoughCollateral));
        }

        let cpi_accounts = MintTo {
            mint: ctx.accounts.debt_token_mint.to_account_info(),
            to: ctx.accounts.borrower_debt_token_account.to_account_info(),
            authority: ctx.accounts.token_program.to_account_info(),
        };

        let cpi_program = ctx.accounts.token_program.to_account_info().clone();
        let cpi_ctx = CpiContext::new(cpi_program, cpi_accounts);
        token::mint_to(cpi_ctx, amount)?;

        ctx.accounts.user_borrow_tracker.borrowed_amount += amount;
        Ok(())
    }
}

#[account]
pub struct UserDepositAccount {
    pub user: Pubkey,
    pub deposited_amount: u64,
}

#[account]
pub struct UserBorrowTracker {
    pub user: Pubkey,
    pub borrowed_amount: u64,
}

#[derive(Accounts)]
pub struct CreateAccounts<'info> {
    /// CHECK: Safe
    #[account(mut, signer)]
    pub user_account: AccountInfo<'info>,
    /// CHECK: Safe
    #[account(init, payer = user_account, seeds = [b"pda_account", user_account.key.as_ref()], bump, space = 8 + 165)]
    pub pda_account: AccountInfo<'info>,
    /// CHECK: Safe
    #[account(init, payer = user_account, seeds = [b"user_deposit_account", user_account.key.as_ref()], bump, space = 8 + 8 + 165)]
    pub user_deposit_account: Account<'info, UserDepositAccount>,
    /// CHECK: Safe
    pub system_program: AccountInfo<'info>,
    #[account(
        init,
        payer = user_account,
        space = 8 + AdminConfig::INIT_SPACE
    )]
    pub config: Account<'info, AdminConfig>,
}

#[derive(Accounts)]
pub struct Deposit<'info> {
    /// CHECK: Safe
    #[account(mut, signer)]
    pub user_account: AccountInfo<'info>,
    /// CHECK: Safe
    #[account(mut, seeds = [b"pda_account", user_account.key.as_ref()], bump)]
    pub pda_account: AccountInfo<'info>,
    /// CHECK: Safe
    #[account(mut, seeds = [b"user_deposit_account", user_account.key.as_ref()], bump)]
    pub user_deposit_account: Account<'info, UserDepositAccount>,
    /// CHECK: Safe
    pub system_program: AccountInfo<'info>,
}

#[derive(Accounts)]
pub struct Borrow<'info> {
    /// CHECK: Safe
    pub config: Account<'info, AdminConfig>,
    /// CHECK: Safe
    #[account(init, payer = user, seeds = [b"user_deposit_account", user.key.as_ref()], bump, space=200)]
    pub user_deposit_account: Account<'info, UserDepositAccount>,
    /// CHECK: Safe
    #[account(init, payer = user, seeds = [b"user_borrow_tracker", user.key.as_ref()], bump, space=200)]
    pub user_borrow_tracker: Account<'info, UserBorrowTracker>,
    // CHECK: Safe
    #[account(
        address = config.loan_price_feed_id @ ErrorCode::InvalidArgument
    )]
    pub pyth_loan_account: Account<'info, PriceFeed>,
    /// CHECK: Safe
    #[account(mut)]
    pub borrower_debt_token_account: AccountInfo<'info>,
    /// CHECK: Safe
    pub debt_token_mint: AccountInfo<'info>,
    /// CHECK: Safe
    pub token_program: AccountInfo<'info>,
    /// CHECK: Safe
    #[account(mut)]
    pub user: Signer<'info>,
    /// CHECK: Safe
    pub system_program: AccountInfo<'info>,
}




