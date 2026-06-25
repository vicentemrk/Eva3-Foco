import { useState, useEffect } from 'react';
import { getTodayKey } from '../utils/dateHelpers';

const API_URL = 'https://dummyjson.com/quotes/random';
const STORAGE_KEY = 'foco_quote_cache';

function getCached() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (parsed.date === getTodayKey()) return parsed;
  } catch {
    /* ignore */
  }
  return null;
}

function setCached(quote) {
  try {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({ date: getTodayKey(), quote })
    );
  } catch {
    /* ignore */
  }
}

export function useApi() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchQuote = async (forceRefresh = false) => {
    if (!forceRefresh) {
      const cached = getCached();
      if (cached) {
        setData(cached.quote);
        setLoading(false);
        return;
      }
    }

    setLoading(true);
    setError(null);
    try {
      const response = await fetch(API_URL);
      if (!response.ok) throw new Error('Error al obtener la cita');
      const result = await response.json();
      setCached(result);
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

  const refetch = () => fetchQuote(true);

  return { data, loading, error, refetch };
}
