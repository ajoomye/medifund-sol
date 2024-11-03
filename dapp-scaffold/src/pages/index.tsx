import type { NextPage } from "next";
import Head from "next/head";
import { CampaignList } from "../components/CampaignList";

const Home: NextPage = () => {
  return (
    <div>
      <Head>
        <title>Medifund</title>
        <meta name="description" content="Medifund - Solana Scaffold" />
      </Head>

      {/* Cover Photo Section */}
      <div
        className="relative w-full h-[500px] bg-cover bg-center"
        style={{ backgroundImage: `url('../Medifunc.png')` }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
          <h1 className="text-5xl text-white font-bold">Welcome to Medifund</h1>
        </div>
      </div>

      {/* Campaign List */}
      <div className="p-8">
        <CampaignList />
      </div>
    </div>
  );
};

export default Home;
