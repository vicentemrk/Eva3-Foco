import { useReducer, useEffect, useCallback } from 'react';
import { loadHabits, saveHabits } from '../utils/storage';
import { getTodayKey } from '../utils/dateHelpers';
import { DEFAULT_ICON } from '../utils/habitIcons';

function sanitize(str) {
  return str.replace(/[<>]/g, '').trim();
}

function generateId() {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 8);
}

const initialState = {
  habits: [],
  error: null,
};

function reducer(state, action) {
  switch (action.type) {
    case 'LOAD_HABITS':
      return { ...state, habits: action.payload, error: null };

    case 'ADD_HABIT': {
      const sanitizedName = sanitize(action.payload.name);
      if (!sanitizedName) {
        return { ...state, error: 'El nombre del hábito no puede estar vacío' };
      }
      const newHabit = {
        id: generateId(),
        name: sanitizedName,
        color: action.payload.color || '#D81B60',
        icon: action.payload.icon || DEFAULT_ICON,
        createdAt: getTodayKey(),
        completions: {},
      };
      return { ...state, habits: [...state.habits, newHabit], error: null };
    }

    case 'UPDATE_HABIT': {
      const { habitId, name, color, icon } = action.payload;
      const sanitizedName = sanitize(name);
      if (!sanitizedName) {
        return { ...state, error: 'El nombre del hábito no puede estar vacío' };
      }
      const habits = state.habits.map((h) =>
        h.id === habitId
          ? { ...h, name: sanitizedName, color: color || h.color, icon: icon || h.icon }
          : h
      );
      return { ...state, habits, error: null };
    }

    case 'TOGGLE_HABIT': {
      const { habitId, dateKey } = action.payload;
      const habits = state.habits.map((h) => {
        if (h.id !== habitId) return h;
        const completions = { ...h.completions };
        if (completions[dateKey]) {
          delete completions[dateKey];
        } else {
          completions[dateKey] = true;
        }
        return { ...h, completions };
      });
      return { ...state, habits };
    }

    case 'DELETE_HABIT':
      return {
        ...state,
        habits: state.habits.filter((h) => h.id !== action.payload),
      };

    case 'SET_ERROR':
      return { ...state, error: action.payload };

    case 'CLEAR_ERROR':
      return { ...state, error: null };

    default:
      return state;
  }
}

export function useHabits() {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const habits = loadHabits();
    dispatch({ type: 'LOAD_HABITS', payload: habits });
  }, []);

  useEffect(() => {
    if (state.habits.length > 0 || loadHabits().length > 0) {
      saveHabits(state.habits);
    }
  }, [state.habits]);

  const addHabit = useCallback((name, color, icon) => {
    dispatch({ type: 'ADD_HABIT', payload: { name, color, icon } });
  }, []);

  const updateHabit = useCallback((habitId, name, color, icon) => {
    dispatch({ type: 'UPDATE_HABIT', payload: { habitId, name, color, icon } });
  }, []);

  const toggleHabit = useCallback((habitId, dateKey) => {
    dispatch({ type: 'TOGGLE_HABIT', payload: { habitId, dateKey } });
  }, []);

  const deleteHabit = useCallback((habitId) => {
    dispatch({ type: 'DELETE_HABIT', payload: habitId });
  }, []);

  const clearError = useCallback(() => {
    dispatch({ type: 'CLEAR_ERROR' });
  }, []);

  return {
    habits: state.habits,
    error: state.error,
    addHabit,
    updateHabit,
    toggleHabit,
    deleteHabit,
    clearError,
  };
}
