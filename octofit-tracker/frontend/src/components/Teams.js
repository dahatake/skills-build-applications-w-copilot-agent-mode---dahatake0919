import React, { useEffect, useState } from 'react';
import { apiEndpoints } from '../App';
import Section from './Section';
import Modal from './Modal';
import TeamCreateForm from './TeamCreateForm';

export default function Teams() {
  const [teams, setTeams] = useState([]);
  const [showCreate, setShowCreate] = useState(false);
  const [creating, setCreating] = useState(false);
  const [createError, setCreateError] = useState(null);
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
  const handleCreate = (payload) => {
    setCreating(true); setCreateError(null);
    console.log('[Teams] Creating team payload:', payload);
    fetch(url, { method:'POST', headers:{ 'Content-Type':'application/json' }, body: JSON.stringify(payload) })
      .then(r => { if(!r.ok) throw new Error(r.status + ' ' + r.statusText); return r.json(); })
      .then(created => {
        console.log('[Teams] Created team:', created);
        setTeams(prev => [...prev, created]);
        setShowCreate(false);
      })
      .catch(e => setCreateError(e.message))
      .finally(()=> setCreating(false));
  };

  const actions = (
    <button className="btn btn-sm btn-outline-light" onClick={()=>setShowCreate(true)}>+ New Team</button>
  );

  const body = (
    <div className="table-responsive">
      <table className="table table-sm mb-0 table-striped">
        <thead className="table-light"><tr><th>ID</th><th>Name</th><th>Description</th></tr></thead>
        <tbody>
          {teams.map(t => <tr key={t.id}><td>{t.id}</td><td>{t.name}</td><td className="text-muted small">{t.description}</td></tr>)}
        </tbody>
      </table>
    </div>
  );
  return (
    <>
      <Section title="Teams" endpoint={url} actions={actions}>
        {loading ? <div className="p-4 loading-placeholder">Loading...</div> : error ? <div className="p-4 text-danger">{error}</div> : body}
      </Section>
      <Modal title="Create Team" show={showCreate} onClose={()=>!creating && setShowCreate(false)}
        footer={createError && <div className="text-danger small me-auto">{createError}</div>}>
        <TeamCreateForm onSubmit={handleCreate} submitting={creating} />
      </Modal>
    </>
  );
}
