import React, { useEffect, useState } from 'react';
import { apiEndpoints } from '../App';
import Section from './Section';

export default function Activities() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const url = apiEndpoints.activities;
  useEffect(() => {
    console.log('[Activities] Fetch URL:', url);
    fetch(url)
      .then(r => {
        if(!r.ok) throw new Error(r.status + ' ' + r.statusText);
        return r.json();
      })
      .then(data => {
        console.log('[Activities] Raw data:', data);
        const arr = Array.isArray(data) ? data : (data.results || []);
        setItems(arr);
      })
      .catch(e => setError(e.message))
      .finally(() => setLoading(false));
  }, [url]);
  const body = (
    <div className="table-responsive">
      <table className="table table-sm table-striped mb-0">
        <thead className="table-light"><tr><th>ID</th><th>User</th><th>Type</th><th>Duration</th><th>Date</th></tr></thead>
        <tbody>
          {items.map(a => (
            <tr key={a.id}><td>{a.id}</td><td>{a.user?.name}</td><td>{a.activity_type}</td><td>{a.duration}</td><td>{a.date}</td></tr>
          ))}
        </tbody>
      </table>
    </div>
  );
  return (
    <Section title="Activities" endpoint={url}>
      {loading ? <div className="p-4 loading-placeholder">Loading...</div> : error ? <div className="p-4 text-danger">{error}</div> : body}
    </Section>
  );
}
