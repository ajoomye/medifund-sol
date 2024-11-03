import React, { useEffect, useState } from 'react';
import { PublicKey, Connection } from '@solana/web3.js';

interface Campaign {
  id: string;
  patient_details: string;
  required_amount: number;
  total_donated: number;
  verified: boolean;
  hospital: string;
}

const CampaignList: React.FC = () => {
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);

  useEffect(() => {
    const fetchCampaigns = async () => {
      const connection = new Connection('https://api.devnet.solana.com');
      const programID = new PublicKey('5qfbwtS1Xn7GxsSAcFbbgGKFPvUUAoKV1HMYqnZCGo2U');
      
      try {
        const accounts = await connection.getProgramAccounts(programID);
        const campaigns = accounts.map(account => {
          const data = account.account.data;
          // Add the parsing logic for data to convert buffer to required fields
          return {
            id: account.pubkey.toBase58(),
            patient_details: "", // Update with actual field extraction
            required_amount: 0, // Update with actual field extraction
            total_donated: 0, // Update with actual field extraction
            verified: false, // Update with actual field extraction
            hospital: "", // Update with actual field extraction
          };
        });
        setCampaigns(campaigns);
      } catch (error) {
        console.error("Error fetching campaigns:", error);
      }
    };

    fetchCampaigns();
  }, []);

  return (
    <div>
      {campaigns.map((campaign) => (
        <div key={campaign.id}>
          <h3>{campaign.patient_details}</h3>
          <p>Required Amount: {campaign.required_amount}</p>
          <p>Total Donated: {campaign.total_donated}</p>
          <p>Verified: {campaign.verified.toString()}</p>
          <p>Hospital: {campaign.hospital}</p>
        </div>
      ))}
    </div>
  );
};

export { CampaignList };
