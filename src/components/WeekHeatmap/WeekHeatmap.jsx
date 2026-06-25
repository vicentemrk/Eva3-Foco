import { getLast28Days } from '../../utils/dateHelpers';

const DAY_LABELS = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];

export default function WeekHeatmap({ habits }) {
  const days = getLast28Days();

  const completionMap = {};
  habits.forEach((h) => {
    Object.keys(h.completions).forEach((dateKey) => {
      completionMap[dateKey] = (completionMap[dateKey] || 0) + 1;
    });
  });

  const maxCompletions = Math.max(...Object.values(completionMap), 1);

  function getIntensity(count) {
    if (count === 0) return 'heat-0';
    const ratio = count / maxCompletions;
    if (ratio <= 0.25) return 'heat-1';
    if (ratio <= 0.5) return 'heat-2';
    if (ratio <= 0.75) return 'heat-3';
    return 'heat-4';
  }

  const grid = Array.from({ length: 7 }, () => []);
  days.forEach((dateKey, index) => {
    const d = new Date(dateKey + 'T00:00:00');
    const dayOfWeek = d.getDay();
    const weekCol = Math.floor(index / 7);
    grid[dayOfWeek][weekCol] = dateKey;
  });

  return (
    <div className="week-heatmap">
      <h5 className="mb-3">Heatmap (últimos 28 días)</h5>
      <div className="heatmap-grid">
        <div className="heatmap-rows">
          {grid.map((row, ri) => (
            <div key={ri} className="heatmap-row d-flex align-items-center gap-1">
              <span className="heatmap-day-label">{DAY_LABELS[ri]}</span>
              {row.map((dateKey, ci) => {
                const count = dateKey ? (completionMap[dateKey] || 0) : 0;
                return (
                  <div
                    key={ci}
                    className={`heatmap-cell ${dateKey ? getIntensity(count) : 'heat-none'}`}
                    title={dateKey ? `${dateKey}: ${count} hábito(s)` : ''}
                  />
                );
              })}
            </div>
          ))}
        </div>
      </div>
      <div className="heatmap-legend d-flex align-items-center gap-2 mt-2 justify-content-end">
        <small className="text-muted">Menos</small>
        <div className="heatmap-cell heat-0" />
        <div className="heatmap-cell heat-1" />
        <div className="heatmap-cell heat-2" />
        <div className="heatmap-cell heat-3" />
        <div className="heatmap-cell heat-4" />
        <small className="text-muted">Más</small>
      </div>
    </div>
  );
}
