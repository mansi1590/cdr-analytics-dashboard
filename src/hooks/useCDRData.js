import { useEffect, useState } from "react";
import API from "../services/api";

export function useCDRData() {

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchData = async () => {

    try {

      setLoading(true);

      const response = await API.get(
        "/Cdr?page=1&pageSize=1000"
      );

      setData(response.data.data);

      setError("");

    } catch (err) {

      console.error(err);

      setError("Failed to fetch CDR data");
    }
    finally {

      setLoading(false);
    }
  };

  useEffect(() => {

    fetchData();

  }, []);

  return {
    data,
    loading,
    error,
    refetch: fetchData
  };
}