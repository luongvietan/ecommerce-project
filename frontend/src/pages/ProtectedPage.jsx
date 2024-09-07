import React, { useEffect, useState } from "react";
import { axiosWithAuth } from "../utils/auth";

const ProtectedPage = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosWithAuth().get("/api/protected");
        setData(response.data);
      } catch (error) {
        console.error("Error fetching protected data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h1>Protected Page</h1>
      {data ? <pre>{JSON.stringify(data, null, 2)}</pre> : <p>Loading...</p>}
    </div>
  );
};

export default ProtectedPage;
