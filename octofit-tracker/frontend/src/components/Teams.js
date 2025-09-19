import React, { useEffect, useState } from 'react';
import { apiEndpoints } from '../App';

export default function Teams() {
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const url = apiEndpoints.teams;
  useEffect(() => {
    console.log('[Teams] Fetch URL:', url);
    fetch(url)
      .then(r => { if(!r.ok) throw new Error(r.status + ' ' + r.statusText); return r.json(); })
      .then(data => {
        console.log('[Teams] Raw data:', data);
        const arr = Array.isArray(data) ? data : (data.results || []);
        setTeams(arr);
      })
      .catch(e => setError(e.message))
      .finally(() => setLoading(false));
  }, [url]);
  if(loading) return <div className="p-3">Loading teams...</div>;
  if(error) return <div className="alert alert-danger m-3">{error}</div>;
  return (
    <div className="container py-4">
      <h2>Teams</h2>
      <ul className="list-group mt-3">
        {teams.map(t => <li key={t.id} className="list-group-item d-flex justify-content-between align-items-center"><span>{t.name}</span><span className="text-muted small">{t.description}</span></li>)}
      </ul>
    </div>
  );
}
