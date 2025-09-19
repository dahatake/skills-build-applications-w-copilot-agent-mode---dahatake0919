import React, { useEffect, useState } from 'react';
import { apiEndpoints } from '../App';
import Section from './Section';

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
  const body = (
    <div className="table-responsive">
      <table className="table table-sm table-hover mb-0">
        <thead className="table-light"><tr><th>Rank</th><th>Team</th><th>Total Points</th></tr></thead>
        <tbody>
          {rows.map(r => (<tr key={r.id}><td>{r.rank}</td><td>{r.team?.name}</td><td>{r.total_points}</td></tr>))}
        </tbody>
      </table>
    </div>
  );
  return (
    <Section title="Leaderboard" endpoint={url}>
      {loading ? <div className="p-4 loading-placeholder">Loading...</div> : error ? <div className="p-4 text-danger">{error}</div> : body}
    </Section>
  );
}
