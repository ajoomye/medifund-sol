import type { NextPage } from "next";
import Head from "next/head";
import HospitalForm from "../components/HospitalForm"; 
import HospitalList from "../components/HospitalList"

const ManageHospitals: NextPage = () => {
  return (
    <div>
      <Head>
        <title>Medifund - Manage Hospitals</title>
        <meta name="description" content="Medifund - Solana Scaffold" />
      </Head>
      <h1>Manage Hospitals</h1>
      <HospitalList />
      <h2>Add New Hospital</h2>
      <HospitalForm />
    </div>
  );
};

export default ManageHospitals;
