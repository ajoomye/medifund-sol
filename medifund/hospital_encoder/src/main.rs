// campaign_instruction.rs
use std::env;
use borsh::{BorshSerialize, BorshDeserialize};
use bs58;

#[derive(BorshSerialize, BorshDeserialize)]
struct CreateCampaignInstruction {
    instruction_index: u8, // 0 if create_campaign is the first function in the program
    patient_details: String,
    required_amount: u64,
    hospital: [u8; 32],
}

fn main() {
    let args: Vec<String> = env::args().collect();
    if args.len() < 4 {
        eprintln!("Usage: cargo run -- <patient_details> <required_amount> <hospital_pubkey>");
        return;
    }

    let patient_details = args[1].clone();
    let required_amount: u64 = args[2].parse().expect("Invalid amount");
    let hospital_pubkey = &args[3];

    let hospital_bytes: [u8; 32] = bs58::decode(hospital_pubkey)
        .into_vec()
        .expect("Invalid pubkey format")
        .try_into()
        .expect("Invalid pubkey length");

    let instruction = CreateCampaignInstruction {
        instruction_index: 0,
        patient_details,
        required_amount,
        hospital: hospital_bytes,
    };

    let encoded_data = instruction.try_to_vec().expect("Failed to serialize");
    println!("{:?}", encoded_data);
}
