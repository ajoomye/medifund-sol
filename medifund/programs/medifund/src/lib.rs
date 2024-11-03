use anchor_lang::prelude::*;

declare_id!("5qfbwtS1Xn7GxsSAcFbbgGKFPvUUAoKV1HMYqnZCGo2U");

#[program]
pub mod medifund {
    use super::*;

    pub fn create_campaign(ctx: Context<CreateCampaign>, patient_details: String, required_amount: u64, hospital: Pubkey) -> Result<()> {
        let campaign = &mut ctx.accounts.campaign;
        campaign.patient_details = patient_details;
        campaign.required_amount = required_amount;
        campaign.hospital = hospital;
        campaign.total_donated = 0;
        campaign.verified = false;
        campaign.owner = *ctx.accounts.owner.key;
        msg!("Campaign created with patient details: {}", campaign.patient_details);
        Ok(())
    }

    pub fn verify_campaign(ctx: Context<VerifyCampaign>) -> Result<()> {
        let campaign = &mut ctx.accounts.campaign;
        campaign.verified = true;
        msg!("Campaign verified: {}", campaign.patient_details);
        Ok(())
    }

    pub fn donate(ctx: Context<Donate>, amount: u64) -> Result<()> {
        let campaign = &mut ctx.accounts.campaign;
        let platform_fee = amount / 100; // 1% platform fee
        let gas_fee = amount / 200; // 0.5% gas fee
        campaign.total_donated += amount - platform_fee - gas_fee;

        **campaign.to_account_info().try_borrow_mut_lamports()? -= gas_fee;
        **ctx.accounts.hospital.to_account_info().try_borrow_mut_lamports()? += campaign.total_donated;
        msg!("Donation of {} to campaign: {}", amount, campaign.patient_details);
        
        Ok(())
    }

    pub fn add_hospital(ctx: Context<AddHospital>, name: String, address: Pubkey) -> Result<()> {
        let hospital = &mut ctx.accounts.hospital;
        hospital.name = name;
        hospital.address = address;
        msg!("Hospital added: {} with address {}", hospital.name, hospital.address);
        Ok(())
    }
}

#[derive(Accounts)]
pub struct CreateCampaign<'info> {
    #[account(init, payer = owner, space = 8 + 128 + 64 + 32 + 8 + 1)]
    pub campaign: Account<'info, Campaign>,
    #[account(mut)]
    pub owner: Signer<'info>,
    #[account(mut)]
    pub hospital: Signer<'info>,
    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
pub struct VerifyCampaign<'info> {
    #[account(mut)]
    pub campaign: Account<'info, Campaign>,
}

#[derive(Accounts)]
pub struct Donate<'info> {
    #[account(mut)]
    pub campaign: Account<'info, Campaign>,
    #[account(mut)]
    pub hospital: Signer<'info>,
    pub user: Signer<'info>,
}

#[derive(Accounts)]
pub struct AddHospital<'info> {
    #[account(init, payer = owner, space = 8 + 32 + 256)]
    pub hospital: Account<'info, Hospital>,
    #[account(mut)]
    pub owner: Signer<'info>,
    pub system_program: Program<'info, System>,
}

#[account]
pub struct Campaign {
    pub patient_details: String,
    pub required_amount: u64,
    pub total_donated: u64,
    pub verified: bool,
    pub hospital: Pubkey,
    pub owner: Pubkey,
}

#[account]
pub struct Hospital {
    pub name: String,
    pub address: Pubkey,
}
