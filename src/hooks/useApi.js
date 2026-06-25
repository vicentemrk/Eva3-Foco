import { useState, useEffect } from 'react';
import { getTodayKey } from '../utils/dateHelpers';

const API_URL = 'https://dummyjson.com/quotes/random';
const STORAGE_KEY = 'foco_quote_cache';

const FALLBACK_QUOTES = [
  { quote: 'El éxito es la suma de pequeños esfuerzos repetidos día tras día.', author: 'Robert Collier' },
  { quote: 'No cuentes los días, haz que los días cuenten.', author: 'Muhammad Ali' },
  { quote: 'El hábito es el puente entre la meta y el logro.', author: 'Jim Rohn' },
  { quote: 'Pequeñas acciones diarias llevan a grandes resultados.', author: 'Robin Sharma' },
  { quote: 'La disciplina es el puente entre metas y logros.', author: 'Jim Rohn' },
  { quote: 'El momento en que te comprometes, la providencia también se mueve.', author: 'Johann Wolfgang von Goethe' },
  { quote: 'No esperes. Nunca será el momento perfecto.', author: 'Napoleon Hill' },
  { quote: 'La excelencia no es un acto, sino un hábito.', author: 'Aristóteles' },
  { quote: 'El secreto para avanzar es comenzar.', author: 'Mark Twain' },
  { quote: 'La consistencia vence a la intensidad.', author: 'James Clear' },
];

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

function pickRandomFallback() {
  return FALLBACK_QUOTES[Math.floor(Math.random() * FALLBACK_QUOTES.length)];
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
    } catch {
      const fallback = pickRandomFallback();
      setCached(fallback);
      setData(fallback);
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
