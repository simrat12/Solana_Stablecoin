use anchor_lang::prelude::*;

declare_id!("Fg6PaFpoGXkYsidMpWTK6W2BeZ7FEfcYkg476zPFsLnS");

#[program]
pub mod open_interest_protocol {
    use super::*;

    pub fn initialize(ctx: Context<Initialize>, amount: u64) -> ProgramResult {
        let borrower = &mut ctx.accounts.borrower;
        borrower.collateral = amount;
        borrower.health_factor = 110;
        Ok(())
    }

    pub fn deposit(ctx: Context<Deposit>, amount: u64) -> ProgramResult {
        let borrower = &mut ctx.accounts.borrower;
        borrower.collateral += amount;
        Ok(())
    }

    pub fn withdraw(ctx: Context<Withdraw>, amount: u64) -> ProgramResult {
        let borrower = &mut ctx.accounts.borrower;
        if borrower.collateral < amount {
            return Err(ErrorCode::NotEnoughCollateral.into());
        }
        borrower.collateral -= amount;
        Ok(())
    }

    pub fn get_health_factor(ctx: Context<GetHealthFactor>) -> ProgramResult {
        let borrower = &mut ctx.accounts.borrower;
        msg!("The health factor is: {}", borrower.health_factor);
        Ok(())
    }
}

#[derive(Accounts)]
pub struct Initialize<'info> {
    #[account(init)]
    pub borrower: ProgramAccount<'info, Borrower>,
    pub rent: Sysvar<'info, Rent>,
}

#[derive(Accounts)]
pub struct Deposit<'info> {
    #[account(mut)]
    pub borrower: ProgramAccount<'info, Borrower>,
}

#[derive(Accounts)]
pub struct Withdraw<'info> {
    #[account(mut)]
    pub borrower: ProgramAccount<'info, Borrower>,
}

#[derive(Accounts)]
pub struct GetHealthFactor<'info> {
    #[account(mut)]
    pub borrower: ProgramAccount<'info, Borrower>,
}

#[account]
pub struct Borrower {
    pub collateral: u64,
    pub health_factor: u8,
}

#[error]
pub enum ErrorCode {
    #[msg("Not enough collateral")]
    NotEnoughCollateral,
}
