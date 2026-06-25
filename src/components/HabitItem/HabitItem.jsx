import { useState } from 'react';
import { getTodayKey } from '../../utils/dateHelpers';

export default function HabitItem({ habit, onToggle, onDelete, onEdit }) {
  const [confirmDelete, setConfirmDelete] = useState(false);
  const todayKey = getTodayKey();
  const done = !!habit.completions[todayKey];

  return (
    <li className="list-group-item d-flex align-items-center justify-content-between habit-item">
      <div className="d-flex align-items-center gap-2">
        <span
          className="habit-icon-wrapper"
          style={{ backgroundColor: habit.color }}
        >
          <i className={`bi ${habit.icon || 'bi-book'} habit-icon`} />
        </span>
        <span className={`habit-name ${done ? 'text-decoration-line-through text-muted' : ''}`}>
          {habit.name}
        </span>
      </div>

      <div className="d-flex align-items-center gap-2">
        <button
          className={`btn btn-sm ${done ? 'btn-success' : 'btn-outline-secondary'}`}
          onClick={() => onToggle(habit.id, todayKey)}
          title={done ? 'Desmarcar' : 'Marcar como completado'}
        >
          <i className={`bi ${done ? 'bi-check-circle-fill' : 'bi-circle'}`} />
        </button>

        <button
          className="btn btn-sm btn-outline-primary"
          onClick={() => onEdit(habit)}
          title="Editar hábito"
        >
          <i className="bi bi-pencil" />
        </button>

        {confirmDelete ? (
          <div className="d-flex gap-1">
            <button
              className="btn btn-sm btn-danger"
              onClick={() => { onDelete(habit.id); setConfirmDelete(false); }}
            >
              <i className="bi bi-check-lg me-1" />Confirmar
            </button>
            <button
              className="btn btn-sm btn-secondary"
              onClick={() => setConfirmDelete(false)}
            >
              <i className="bi bi-x-lg me-1" />Cancelar
            </button>
          </div>
        ) : (
          <button
            className="btn btn-sm btn-outline-danger"
            onClick={() => setConfirmDelete(true)}
            title="Eliminar hábito"
          >
            <i className="bi bi-trash" />
          </button>
        )}
      </div>
    </li>
  );
}
