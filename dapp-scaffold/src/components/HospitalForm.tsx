import React, { useState } from 'react';
import { PublicKey, Connection, SystemProgram, Transaction, TransactionInstruction, Keypair } from '@solana/web3.js';
import { useWallet } from '@solana/wallet-adapter-react';

const HospitalForm: React.FC = () => {
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [message, setMessage] = useState('');
  const { publicKey, sendTransaction } = useWallet();

  const addHospital = async (e: React.FormEvent) => {
    e.preventDefault();
    const connection = new Connection('https://api.devnet.solana.com');
    const programID = new PublicKey('5qfbwtS1Xn7GxsSAcFbbgGKFPvUUAoKV1HMYqnZCGo2U');

    const newHospital = Keypair.generate();

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
            { pubkey: newHospital.publicKey, isSigner: true, isWritable: true },
            { pubkey: publicKey!, isSigner: true, isWritable: false },
            { pubkey: SystemProgram.programId, isSigner: false, isWritable: false },
          ],
          programId: programID,
          data: Buffer.from(JSON.stringify({
            name,
            address: newHospital.publicKey.toBase58()
          })),
        })
      );

      console.log("Created transaction instruction");

      await sendTransaction(transaction, connection, { signers: [newHospital] });
      console.log("Transaction sent successfully!");

      setMessage('Hospital added successfully!');
      setName('');
      setAddress('');
    } catch (error) {
      console.error("Error adding hospital:", error);
      if (error instanceof Error) {
        setMessage(`Failed to add hospital. ${error.message}`);
      } else {
        setMessage('Failed to add hospital. Please try again.');
      }
    }
  };

  return (
    <form onSubmit={addHospital}>
      <input type="text" className="input-field" placeholder="Hospital Name" value={name} onChange={(e) => setName(e.target.value)} required />
      <input type="text" className="input-field" placeholder="Hospital Address" value={address} onChange={(e) => setAddress(e.target.value)} required />
      <button type="submit" className="submit-button">Add Hospital</button>
      {message && <p className={message.includes('successfully') ? 'success' : 'error'}>{message}</p>}
    </form>
  );
};

export default HospitalForm;
