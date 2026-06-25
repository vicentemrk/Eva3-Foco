const TZ = 'America/Santiago';

function toChileDate(raw) {
  const date = raw ? new Date(raw) : new Date();
  const parts = new Intl.DateTimeFormat('sv-SE', {
    timeZone: TZ,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).formatToParts(date);
  const year = parts.find((p) => p.type === 'year').value;
  const month = parts.find((p) => p.type === 'month').value;
  const day = parts.find((p) => p.type === 'day').value;
  return { year, month, day };
}

export function formatDate(date) {
  const { year, month, day } = toChileDate(date);
  return `${year}-${month}-${day}`;
}

export function getTodayKey() {
  return formatDate();
}

export function getLast28Days() {
  const days = [];
  const now = new Date();
  const nowChile = new Date(
    new Intl.DateTimeFormat('sv-SE', { timeZone: TZ }).format(now)
  );
  for (let i = 27; i >= 0; i--) {
    const d = new Date(nowChile);
    d.setDate(d.getDate() - i);
    const { year, month, day } = toChileDate(d);
    days.push(`${year}-${month}-${day}`);
  }
  return days;
}
