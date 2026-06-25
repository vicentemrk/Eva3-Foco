import { getTodayKey, getLast28Days } from '../../utils/dateHelpers';

export default function StatsPanel({ habits }) {
  const todayKey = getTodayKey();
  const last28 = getLast28Days();

  const totalCompletions = habits.reduce((sum, h) => {
    return sum + Object.keys(h.completions).length;
  }, 0);

  const totalPossible = habits.length * last28.length;
  const consistency = totalPossible > 0
    ? Math.round((totalCompletions / totalPossible) * 100)
    : 0;

  let bestStreak = 0;
  habits.forEach((h) => {
    let currentStreak = 0;
    let maxStreak = 0;
    last28.forEach((dateKey) => {
      if (h.completions[dateKey]) {
        currentStreak++;
        maxStreak = Math.max(maxStreak, currentStreak);
      } else {
        currentStreak = 0;
      }
    });
    bestStreak = Math.max(bestStreak, maxStreak);
  });

  const todayCompletions = habits.filter((h) => h.completions[todayKey]).length;

  return (
    <div>
      <h5 className="mb-3"><i className="bi bi-graph-up me-1" />Estadísticas</h5>
      <div className="row g-2">
        <div className="col-6">
          <div className="stat-card text-center p-3">
            <i className="bi bi-calendar-check fs-4 d-block mb-1" style={{ color: 'var(--magenta)' }} />
            <div className="stat-value">{todayCompletions}/{habits.length}</div>
            <div className="stat-label">Hoy</div>
          </div>
        </div>
        <div className="col-6">
          <div className="stat-card text-center p-3">
            <i className="bi bi-check-all fs-4 d-block mb-1" style={{ color: 'var(--magenta)' }} />
            <div className="stat-value">{totalCompletions}</div>
            <div className="stat-label">Total</div>
          </div>
        </div>
        <div className="col-6">
          <div className="stat-card text-center p-3">
            <i className="bi bi-pie-chart fs-4 d-block mb-1" style={{ color: 'var(--magenta)' }} />
            <div className="stat-value">{consistency}%</div>
            <div className="stat-label">Consistencia</div>
          </div>
        </div>
        <div className="col-6">
          <div className="stat-card text-center p-3">
            <i className="bi bi-trophy fs-4 d-block mb-1" style={{ color: 'var(--magenta)' }} />
            <div className="stat-value">{bestStreak}</div>
            <div className="stat-label">Mejor racha</div>
          </div>
        </div>
      </div>
    </div>
  );
}
