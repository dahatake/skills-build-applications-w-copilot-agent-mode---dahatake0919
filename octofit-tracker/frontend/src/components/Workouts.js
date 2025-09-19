import React, { useEffect, useState } from 'react';
import { apiEndpoints } from '../App';

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
  if(loading) return <div className="p-3">Loading workouts...</div>;
  if(error) return <div className="alert alert-danger m-3">{error}</div>;
  return (
    <div className="container py-4">
      <h2>Workouts</h2>
      <div className="list-group mt-3">
        {items.map(w => (
          <div key={w.id} className="list-group-item">
            <h6 className="mb-1">{w.name}</h6>
            <p className="mb-1 small text-muted">{w.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
