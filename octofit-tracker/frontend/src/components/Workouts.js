import React, { useEffect, useState } from 'react';
import { apiEndpoints } from '../App';
import Section from './Section';

export default function Workouts() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const url = apiEndpoints.workouts;
  useEffect(() => {
    console.log('[Workouts] Fetch URL:', url);
    fetch(url)
      .then(r => { if(!r.ok) throw new Error(r.status + ' ' + r.statusText); return r.json(); })
      .then(data => {
        console.log('[Workouts] Raw data:', data);
        const arr = Array.isArray(data) ? data : (data.results || []);
        setItems(arr);
      })
      .catch(e => setError(e.message))
      .finally(() => setLoading(false));
  }, [url]);
  const body = (
    <div className="table-responsive">
      <table className="table table-sm mb-0 table-striped">
        <thead className="table-light"><tr><th>ID</th><th>Name</th><th>Description</th></tr></thead>
        <tbody>
          {items.map(w => (
            <tr key={w.id}><td>{w.id}</td><td>{w.name}</td><td className="text-muted small">{w.description}</td></tr>
          ))}
        </tbody>
      </table>
    </div>
  );
  return (
    <Section title="Workouts" endpoint={url}>
      {loading ? <div className="p-4 loading-placeholder">Loading...</div> : error ? <div className="p-4 text-danger">{error}</div> : body}
    </Section>
  );
}
