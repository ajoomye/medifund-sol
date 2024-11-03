import React, { useEffect, useState } from 'react';

interface Hospital {
  name: string;
  address: string;
}

const HospitalList: React.FC = () => {
  const [hospitals, setHospitals] = useState<Hospital[]>([]);

  useEffect(() => {
    // Fetch hospitals from the blockchain
  }, []);

  return (
    <div>
      {hospitals.map((hospital) => (
        <div key={hospital.address}>
          <h3>{hospital.name}</h3>
          <p>Address: {hospital.address}</p>
        </div>
      ))}
    </div>
  );
};

export default HospitalList;
