import { useState, useEffect, useRef } from 'react';
import { HABIT_ICONS, DEFAULT_ICON } from '../../utils/habitIcons';

const COLORS = ['#D81B60', '#FDD835', '#4CAF50', '#2196F3', '#FF5722', '#9C27B0'];

export default function AddHabitModal({ show, onClose, onAdd, initialData }) {
  const [name, setName] = useState('');
  const [color, setColor] = useState(COLORS[0]);
  const [icon, setIcon] = useState(DEFAULT_ICON);
  const [error, setError] = useState('');
  const inputRef = useRef(null);
  const isEditing = !!initialData;

  useEffect(() => {
    if (show) {
      setName(initialData ? initialData.name : '');
      setColor(initialData ? initialData.color : COLORS[0]);
      setIcon(initialData ? initialData.icon : DEFAULT_ICON);
      setError('');
      if (inputRef.current) inputRef.current.focus();
    }
  }, [show, initialData]);

  function sanitize(str) {
    return str.replace(/[<>]/g, '').trim();
  }

  function handleSubmit(e) {
    e.preventDefault();
    const sanitized = sanitize(name);
    if (!sanitized) {
      setError('El nombre del hábito es requerido');
      return;
    }
    if (sanitized.length > 50) {
      setError('El nombre no puede exceder 50 caracteres');
      return;
    }
    onAdd(sanitized, color, icon);
    onClose();
  }

  function handleClose() {
    setError('');
    onClose();
  }

  if (!show) return null;

  return (
    <div className="modal-backdrop-custom" onClick={handleClose}>
      <div
        className="modal-dialog-custom slide-up"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="card">
          <div className="card-header d-flex justify-content-between align-items-center">
            <h5 className="mb-0">
              <i className={`bi ${isEditing ? 'bi-pencil' : 'bi-plus-circle'} me-2`} />
              {isEditing ? 'Editar Hábito' : 'Nuevo Hábito'}
            </h5>
            <button className="btn-close" onClick={handleClose} />
          </div>
          <div className="card-body">
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label">
                  <i className="bi bi-type me-1" />Nombre del hábito
                </label>
                <input
                  ref={inputRef}
                  type="text"
                  className={`form-control ${error ? 'is-invalid' : ''}`}
                  value={name}
                  onChange={(e) => { setName(e.target.value); setError(''); }}
                  placeholder="Ej: Leer 20 minutos"
                  maxLength={50}
                />
                {error && <div className="invalid-feedback">{error}</div>}
              </div>

              <div className="mb-3">
                <label className="form-label">
                  <i className="bi bi-palette me-1" />Color
                </label>
                <div className="d-flex gap-2 flex-wrap">
                  {COLORS.map((c) => (
                    <button
                      key={c}
                      type="button"
                      className={`color-picker-btn ${color === c ? 'color-picker-active' : ''}`}
                      style={{ backgroundColor: c }}
                      onClick={() => setColor(c)}
                    />
                  ))}
                </div>
              </div>

              <div className="mb-3">
                <label className="form-label">
                  <i className="bi bi-emoji-smile me-1" />Ícono
                </label>
                <div className="d-flex gap-2 flex-wrap">
                  {HABIT_ICONS.map((item) => (
                    <button
                      key={item.id}
                      type="button"
                      className={`icon-picker-btn ${icon === item.icon ? 'icon-picker-active' : ''}`}
                      onClick={() => setIcon(item.icon)}
                      title={item.label}
                    >
                      <i className={`bi ${item.icon}`} />
                    </button>
                  ))}
                </div>
              </div>

              <div className="d-flex gap-2 justify-content-end">
                <button type="button" className="btn btn-secondary" onClick={handleClose}>
                  <i className="bi bi-x-lg me-1" />Cancelar
                </button>
                <button type="submit" className="btn btn-primary" style={{ backgroundColor: '#D81B60', borderColor: '#D81B60' }}>
                  <i className={`bi ${isEditing ? 'bi-check-lg' : 'bi-plus-lg'} me-1`} />
                  {isEditing ? 'Guardar Cambios' : 'Crear Hábito'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
