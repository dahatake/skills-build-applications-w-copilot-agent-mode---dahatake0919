import React, { useState } from 'react';

export default function TeamCreateForm({ onSubmit, submitting }) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const disabled = submitting || !name.trim();
  const handleSubmit = (e) => {
    e.preventDefault();
    if(disabled) return;
    onSubmit({ name: name.trim(), description: description.trim() });
  };
  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-3">
        <label className="form-label">Name<span className="text-danger">*</span></label>
        <input className="form-control" value={name} onChange={e=>setName(e.target.value)} placeholder="Team name" required />
      </div>
      <div className="mb-3">
        <label className="form-label">Description</label>
        <textarea className="form-control" rows={3} value={description} onChange={e=>setDescription(e.target.value)} placeholder="Optional description" />
      </div>
      <div className="d-flex justify-content-end gap-2">
        <button type="submit" disabled={disabled} className="btn btn-primary">
          {submitting ? 'Creating...' : 'Create Team'}
        </button>
      </div>
    </form>
  );
}
