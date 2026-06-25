import { useState, useCallback } from 'react';
import { useHabits } from './hooks/useHabits';
import HabitList from './components/HabitList/HabitList';
import AddHabitModal from './components/AddHabitModal/AddHabitModal';
import WeekHeatmap from './components/WeekHeatmap/WeekHeatmap';
import StatsPanel from './components/StatsPanel/StatsPanel';
import QuoteWidget from './components/QuoteWidget/QuoteWidget';
import Toast from './components/Toast/Toast';
import './App.css';

export default function App() {
  const { habits, addHabit, updateHabit, toggleHabit, deleteHabit } = useHabits();
  const [showModal, setShowModal] = useState(false);
  const [editHabit, setEditHabit] = useState(null);
  const [toast, setToast] = useState({ message: '', type: '' });

  const showToast = useCallback((message, type = 'success') => {
    setToast({ message, type });
  }, []);

  const handleOpenCreate = useCallback(() => {
    setEditHabit(null);
    setShowModal(true);
  }, []);

  const handleOpenEdit = useCallback((habit) => {
    setEditHabit(habit);
    setShowModal(true);
  }, []);

  const handleModalSave = useCallback((name, color, icon) => {
    if (editHabit) {
      updateHabit(editHabit.id, name, color, icon);
      showToast('Hábito actualizado exitosamente');
    } else {
      addHabit(name, color, icon);
      showToast('Hábito creado exitosamente');
    }
    setShowModal(false);
    setEditHabit(null);
  }, [editHabit, updateHabit, addHabit, showToast]);

  const handleToggle = useCallback((habitId, dateKey) => {
    toggleHabit(habitId, dateKey);
  }, [toggleHabit]);

  const handleDelete = useCallback((habitId) => {
    deleteHabit(habitId);
    showToast('Hábito eliminado', 'warning');
  }, [deleteHabit, showToast]);

  return (
    <div className="app-container">
      <Toast
        message={toast.message}
        type={toast.type}
        onClose={() => setToast({ message: '', type: '' })}
      />

      <header className="app-header py-3 mb-4 text-center">
        <h1 className="app-title mb-1">
          <i className="bi bi-bullseye me-2" />Foco
        </h1>
        <p className="text-muted mb-0">
          <i className="bi bi-grid-3x3-gap-fill me-1" />Dashboard de Gestión de Hábitos
        </p>
      </header>

      <main className="container">
        <div className="row g-4">
          <div className="col-lg-4 order-lg-2">
            <div className="d-flex flex-column gap-4">
              <QuoteWidget />
              <StatsPanel habits={habits} />
            </div>
          </div>

          <div className="col-lg-8 order-lg-1">
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h5 className="mb-0"><i className="bi bi-list-check me-1" />Mis Hábitos</h5>
              <button
                className="btn btn-add-habit"
                onClick={handleOpenCreate}
              >
                <i className="bi bi-plus-lg me-1" />Nuevo Hábito
              </button>
            </div>

            <HabitList
              habits={habits}
              onToggle={handleToggle}
              onDelete={handleDelete}
              onEdit={handleOpenEdit}
            />

            <div className="mt-4">
              <WeekHeatmap habits={habits} />
            </div>
          </div>
        </div>
      </main>

      <AddHabitModal
        show={showModal}
        onClose={() => { setShowModal(false); setEditHabit(null); }}
        onAdd={handleModalSave}
        initialData={editHabit}
      />
    </div>
  );
}
