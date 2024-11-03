import type { NextPage } from "next";
import Head from "next/head";
import CampaignApprovalList from "../components/CampaignApprovalList";

const ApproveCampaigns: NextPage = () => {
  return (
    <div>
      <Head>
        <title>Medifund - Approve Campaigns</title>
        <meta name="description" content="Medifund - Solana Scaffold" />
      </Head>
      <h1>Approve Campaigns</h1>
      <CampaignApprovalList />
    </div>
  );
};

export default ApproveCampaigns;
