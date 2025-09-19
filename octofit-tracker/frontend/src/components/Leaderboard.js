import React, { useEffect, useState } from 'react';
import { apiEndpoints } from '../App';

export default function Leaderboard() {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const url = apiEndpoints.leaderboard;
  useEffect(() => {
    console.log('[Leaderboard] Fetch URL:', url);
    fetch(url)
      .then(r => { if(!r.ok) throw new Error(r.status + ' ' + r.statusText); return r.json(); })
      .then(data => {
        console.log('[Leaderboard] Raw data:', data);
        const arr = Array.isArray(data) ? data : (data.results || []);
        setRows(arr);
      })
      .catch(e => setError(e.message))
      .finally(() => setLoading(false));
  }, [url]);
  if(loading) return <div className="p-3">Loading leaderboard...</div>;
  if(error) return <div className="alert alert-danger m-3">{error}</div>;
  return (
    <div className="container py-4">
      <h2>Leaderboard</h2>
      <table className="table table-bordered table-sm mt-3">
        <thead><tr><th>Rank</th><th>Team</th><th>Total Points</th></tr></thead>
        <tbody>
          {rows.map(r => (<tr key={r.id}><td>{r.rank}</td><td>{r.team?.name}</td><td>{r.total_points}</td></tr>))}
        </tbody>
      </table>
    </div>
  );
}
