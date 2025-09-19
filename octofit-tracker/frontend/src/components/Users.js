import React, { useEffect, useState } from 'react';
import { apiEndpoints } from '../App';
import Section from './Section';

export default function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const url = apiEndpoints.users;
  useEffect(() => {
    console.log('[Users] Fetch URL:', url);
    fetch(url)
      .then(r => { if(!r.ok) throw new Error(r.status + ' ' + r.statusText); return r.json(); })
      .then(data => {
        console.log('[Users] Raw data:', data);
        const arr = Array.isArray(data) ? data : (data.results || []);
        setUsers(arr);
      })
      .catch(e => setError(e.message))
      .finally(() => setLoading(false));
  }, [url]);
  const body = (
    <div className="table-responsive">
      <table className="table table-sm table-hover mb-0">
        <thead className="table-light"><tr><th>ID</th><th>Name</th><th>Email</th><th>Team</th></tr></thead>
        <tbody>
          {users.map(u => <tr key={u.id}><td>{u.id}</td><td>{u.name}</td><td>{u.email}</td><td>{u.team?.name}</td></tr>)}
        </tbody>
      </table>
    </div>
  );
  return (
    <Section title="Users" endpoint={url}>
      {loading ? <div className="p-4 loading-placeholder">Loading...</div> : error ? <div className="p-4 text-danger">{error}</div> : body}
    </Section>
  );
}
