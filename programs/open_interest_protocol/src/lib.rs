use anchor_lang::prelude::*;
use anchor_spl::token::{self, Transfer};
use pyth_client;
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
        borrower.collateral += amount;
        Ok(())
    }

    pub fn withdraw(ctx: Context<Withdraw>, amount: u64) -> Result<()> {
        let borrower = &mut ctx.accounts.borrower;
        let from = &mut ctx.accounts.from;
        let user = &ctx.accounts.user;
    
        if from.owner != *user.key {
            return Err(error!(ErrorCode::InvalidOwner));
        }

        if borrower.collateral < amount {
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

        borrower.collateral -= amount;
        Ok(())
    }

    pub fn borrow(ctx: Context<Borrow>, amount: u64) -> Result<()> {
        let borrower = &mut ctx.accounts.borrower;
        let price = pyth_client::get_price("H6ARHf6YXhGYeQfUzQNGk6rDNnLBQKrenN712K4AQJEG");
        let value_of_collateral = borrower.collateral * price; 
        if value_of_collateral < amount * 100 {
            return Err(error!(ErrorCode::NotEnoughCollateral));
        }
        borrower.borrowed += amount;
        Ok(())
    }

    pub fn repay(ctx: Context<Repay>, amount: u64) -> Result<()> {
        let borrower = &mut ctx.accounts.borrower;
        if borrower.borrowed < amount {
            return Err(error!(ErrorCode::NotEnoughCollateral));
        }
        borrower.borrowed -= amount;
        Ok(())
    }

    pub fn get_health_factor(ctx: Context<GetHealthFactor>) -> ProgramResult {
        let borrower = &mut ctx.accounts.borrower;
        let price = pyth_client::get_price("<key_of_SOL/USD_account>");
        let value_of_collateral = borrower.collateral * price;
        borrower.health_factor = value_of_collateral / (borrower.borrowed * 100);
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
}

#[account]
pub struct Admin {
    pub admin_pubkey: Pubkey,
}

#[account]
pub struct Borrower {
    pub collateral: u64,
    pub borrowed: u64,
    pub health_factor: u64,
    pub owner: Pubkey,
}

#[error_code]
pub enum ErrorCode {
    #[msg("Not enough collateral.")]
    NotEnoughCollateral,
    #[msg("You are not the owner!.")]
    InvalidOwner,
}





