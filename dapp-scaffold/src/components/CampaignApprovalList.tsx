import React, { useEffect, useState } from 'react';

interface Campaign {
  id: string;
  patient_details: string;
  required_amount: number;
  total_donated: number;
  hospital: string;
}

const CampaignApprovalList: React.FC = () => {
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);

  useEffect(() => {
    // Fetch campaigns awaiting approval from the blockchain
  }, []);

  const approveCampaign = async (campaignId: string) => {
    // Code to approve campaign on the blockchain
  };

  return (
    <div>
      {campaigns.map((campaign) => (
        <div key={campaign.id}>
          <h3>{campaign.patient_details}</h3>
          <p>Required Amount: {campaign.required_amount}</p>
          <p>Total Donated: {campaign.total_donated}</p>
          <p>Hospital: {campaign.hospital}</p>
          <button onClick={() => approveCampaign(campaign.id)}>Approve</button>
        </div>
      ))}
    </div>
  );
};

export default CampaignApprovalList;
