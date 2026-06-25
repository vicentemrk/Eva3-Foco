import HabitItem from '../HabitItem/HabitItem';

export default function HabitList({ habits, onToggle, onDelete, onEdit }) {
  if (habits.length === 0) {
    return (
      <div className="text-center text-muted py-5">
        <i className="bi bi-clipboard-check fs-1 d-block mb-2" />
        No hay hábitos aún. ¡Crea tu primer hábito!
      </div>
    );
  }

  return (
    <ul className="list-group">
      {habits.map((habit) => (
        <HabitItem
          key={habit.id}
          habit={habit}
          onToggle={onToggle}
          onDelete={onDelete}
          onEdit={onEdit}
        />
      ))}
    </ul>
  );
}
