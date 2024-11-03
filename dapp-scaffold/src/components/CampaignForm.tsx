import React, { useState } from 'react';
import { PublicKey, Connection, SystemProgram, Transaction, Keypair, TransactionInstruction } from '@solana/web3.js';
import { useWallet } from '@solana/wallet-adapter-react';

const CampaignForm: React.FC = () => {
  const [patientDetails, setPatientDetails] = useState('');
  const [requiredAmount, setRequiredAmount] = useState('');
  const [message, setMessage] = useState('');
  const { publicKey, sendTransaction } = useWallet();

  const createCampaign = async (e: React.FormEvent) => {
    e.preventDefault();
    const connection = new Connection('https://api.devnet.solana.com');
    const programID = new PublicKey('5qfbwtS1Xn7GxsSAcFbbgGKFPvUUAoKV1HMYqnZCGo2U');
    const exampleHospitalPublicKey = new PublicKey('DYPkipPpJYV3CfvhSn5d2q9f47KPRHE775zhWGPT8bPw');

    const newCampaign = Keypair.generate();

    try {
      const { blockhash } = await connection.getLatestBlockhash();
      const feePayer = publicKey || Keypair.generate().publicKey;

      console.log("Fetched latest blockhash:", blockhash);
      console.log("Fee payer public key:", feePayer.toBase58());

      const transaction = new Transaction({
        feePayer,
        recentBlockhash: blockhash,
      }).add(
        new TransactionInstruction({
          keys: [
            { pubkey: newCampaign.publicKey, isSigner: true, isWritable: true },
            { pubkey: publicKey!, isSigner: true, isWritable: false },
            { pubkey: exampleHospitalPublicKey, isSigner: false, isWritable: false },
            { pubkey: SystemProgram.programId, isSigner: false, isWritable: false },
          ],
          programId: programID,
          data: Buffer.from(JSON.stringify({
            patient_details: patientDetails,
            required_amount: parseInt(requiredAmount),
            hospital: exampleHospitalPublicKey.toBase58()
          })),
        })
      );

      console.log("Created transaction instruction");

      await sendTransaction(transaction, connection, { signers: [newCampaign] });
      console.log("Transaction sent successfully!");

      setMessage('Campaign added successfully!');
      setPatientDetails('');
      setRequiredAmount('');
    } catch (error) {
      console.error("Error adding campaign:", error);
      if (error instanceof Error) {
        setMessage(`Failed to add campaign. ${error.message}`);
      } else {
        setMessage('Failed to add campaign. Please try again.');
      }
    }
  };

  return (
    <form onSubmit={createCampaign}>
      <input type="text" className="input-field" placeholder="Patient Details" value={patientDetails} onChange={(e) => setPatientDetails(e.target.value)} required />
      <input type="number" className="input-field" placeholder="Required Amount" value={requiredAmount} onChange={(e) => setRequiredAmount(e.target.value)} required />
      <button type="submit" className="submit-button">Create Campaign</button>
      {message && <p className={message.includes('successfully') ? 'success' : 'error'}>{message}</p>}
    </form>
  );
};

export default CampaignForm;
