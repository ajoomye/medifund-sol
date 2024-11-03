// hospital_instruction.rs
use std::env;

fn main() {
    let args: Vec<String> = env::args().collect();
    let hospital_name = args.get(1).expect("Hospital name required");
    let hospital_pubkey = args.get(2).expect("Hospital Pubkey required");

    let mut instruction_data = vec![0]; // Assuming `add_hospital` is the first function, so index `0`

    // Add the hospital name as UTF-8 bytes (padded or truncated as needed)
    instruction_data.extend(hospital_name.as_bytes());

    // Add the hospital pubkey (parse it to bytes)
    let pubkey_bytes = hex::decode(hospital_pubkey).expect("Invalid pubkey format");
    instruction_data.extend(pubkey_bytes);

    println!("{:?}", instruction_data);
}
