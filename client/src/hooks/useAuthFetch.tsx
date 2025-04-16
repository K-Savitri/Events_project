import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { useAuth } from "../context/AuthContext";


interface FetchResult<T> {
    data: T | null;
    loading: boolean;
    error: string | null;
  }

function useAuthFetchInternal<T>(url: string, run = true): FetchResult<T> {
    const { token } = useAuth();
    const [data, setData] = useState<T | null>(null);
    const [loading, setLoading] = useState(run);
    const [error, setError] = useState<string | null>(null);
  
    useEffect(() => {
      if (!run) return;
  
      const fetchData = async () => {
        setLoading(true);
        try {
          const res = await fetch(url, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
  
          const json = await res.json();
          console.log('Fetch result:', json);
  
          if (!res.ok) {
            setError(json.message || 'Failed to fetch');
            toast.error(json.message || 'Failed to fetch');
          } else {
            setData(json);
          }
        } catch (err: any) {
          console.error('Fetch error:', err);
          setError(err.message || 'Something went wrong');
          toast.error('Something went wrong');
        } finally {
          setLoading(false);
        }
      };
  
      fetchData();
    }, [url, run, token]);
  
    return { data, loading, error };
  }
  
  export const useAuthFetch = useAuthFetchInternal;
  