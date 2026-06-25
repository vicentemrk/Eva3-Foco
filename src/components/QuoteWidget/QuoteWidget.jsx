import { useApi } from '../../hooks/useApi';

export default function QuoteWidget() {
  const { data, loading, error, refetch } = useApi();

  return (
    <div className="quote-widget card p-3 h-100">
      <div className="d-flex justify-content-between align-items-start">
        <h5 className="mb-2"><i className="bi bi-chat-quote me-1" />Cita del día</h5>
        <button className="btn btn-sm btn-outline-warning" onClick={refetch} title="Nueva cita">
          <i className="bi bi-arrow-clockwise" />
        </button>
      </div>

      {loading && (
        <div className="d-flex align-items-center gap-2 text-muted">
          <span className="spinner-border spinner-border-sm" />
          <span>Cargando cita...</span>
        </div>
      )}

      {error && (
        <div className="alert alert-danger py-2 mb-0">
          <i className="bi bi-exclamation-triangle me-1" />
          No se pudo cargar la cita.
          <button className="btn btn-sm btn-link p-0 ms-2" onClick={refetch}>
            Reintentar
          </button>
        </div>
      )}

      {!loading && !error && data && (
        <div>
          <p className="quote-text mb-1">"{data.quote}"</p>
          <footer className="blockquote-footer mt-1 mb-0">{data.author}</footer>
        </div>
      )}
    </div>
  );
}
