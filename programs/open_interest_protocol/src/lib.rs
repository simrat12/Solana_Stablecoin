use anchor_lang::prelude::*;
use anchor_lang::solana_program::entrypoint::ProgramResult;

declare_id!("4Nnb1v32be4zUXwBBrugiDsK3Pgs8uTmEcdk3UbrQxwJ");

#[program]
pub mod sol_anchor_contract {
    use super::*;

    pub fn create_accounts(ctx: Context<CreateAccounts>) -> ProgramResult {
        let pda_account = &mut ctx.accounts.pda_account;
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
}

#[account]
pub struct UserDepositAccount {
    pub user: Pubkey,
    pub deposited_amount: u64,
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




