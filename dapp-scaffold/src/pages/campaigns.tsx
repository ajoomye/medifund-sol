import type { NextPage } from "next";
import Head from "next/head";
import CampaignForm from "../components/CampaignForm";
import { CampaignList } from "../components/CampaignList";

const Campaigns: NextPage = () => {
  return (
    <div>
      <Head>
        <title>Medifund - Campaigns</title>
        <meta name="description" content="Medifund - Solana Scaffold" />
      </Head>
      <h1>All Campaigns</h1>
      <CampaignList />
      <h2>Create a New Campaign</h2>
      <CampaignForm />
    </div>
  );
};

export default Campaigns;
