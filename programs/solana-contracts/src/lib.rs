use anchor_lang::prelude::*;

declare_id!("G3fCSLaKAw8LQAoVoPEGzaJ7PMD33dno3TUU647qcXAc");

#[program]
pub mod solana_contracts {
    use super::*;

    pub fn initialize(ctx: Context<Initialize>) -> Result<()> {
        let account = &mut ctx.accounts.data_account;
        account.value = 42; // Default value
        Ok(())
    }

    pub fn update_value(ctx: Context<Update>, new_value: u64) -> Result<()> {
        let account = &mut ctx.accounts.data_account;
        account.value = new_value;
        Ok(())
    }
}

#[derive(Accounts)]
pub struct Initialize<'info> {
    #[account(init, payer = user, space = 8 + 8)]
    pub data_account: Account<'info, DataAccount>,
    #[account(mut)]
    pub user: Signer<'info>,
    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
pub struct Update<'info> {
    #[account(mut)]
    pub data_account: Account<'info, DataAccount>,
}

#[account]
pub struct DataAccount {
    pub value: u64,
}
