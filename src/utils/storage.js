const STORAGE_KEY = 'foco_habits';

function isValidHabit(data) {
  return (
    data &&
    typeof data.id === 'string' &&
    typeof data.name === 'string' &&
    typeof data.color === 'string' &&
    typeof data.createdAt === 'string' &&
    data.completions !== null &&
    typeof data.completions === 'object' &&
    !Array.isArray(data.completions)
  );
}

export function loadHabits() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    const valid = parsed.filter(isValidHabit);
    return valid;
  } catch {
    return [];
  }
}

export function saveHabits(habits) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(habits));
  } catch {
    console.error('Error saving to localStorage');
  }
}
