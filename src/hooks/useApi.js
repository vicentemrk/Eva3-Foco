import { useState, useEffect } from 'react';

const API_URL = 'https://dummyjson.com/quotes/random';

export function useApi() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchQuote = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(API_URL);
      if (!response.ok) throw new Error('Error al obtener la cita');
      const result = await response.json();
      setData(result);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchQuote();
  }, []);

  return { data, loading, error, refetch: fetchQuote };
}
