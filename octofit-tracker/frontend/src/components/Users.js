import React, { useEffect, useState } from 'react';
import { apiEndpoints } from '../App';

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
  if(loading) return <div className="p-3">Loading users...</div>;
  if(error) return <div className="alert alert-danger m-3">{error}</div>;
  return (
    <div className="container py-4">
      <h2>Users</h2>
      <table className="table table-hover table-sm mt-3">
        <thead><tr><th>ID</th><th>Name</th><th>Email</th><th>Team</th></tr></thead>
        <tbody>
          {users.map(u => <tr key={u.id}><td>{u.id}</td><td>{u.name}</td><td>{u.email}</td><td>{u.team?.name}</td></tr>)}
        </tbody>
      </table>
    </div>
  );
}
