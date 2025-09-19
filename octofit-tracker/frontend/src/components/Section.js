import React from 'react';

export default function Section({ title, endpoint, actions, children }) {
  return (
    <div className="container py-4">
      <div className="card app-section-card">
        <div className="card-header d-flex flex-wrap justify-content-between align-items-center gap-2">
          <h2 className="h5 m-0">{title}</h2>
          <div className="d-flex align-items-center gap-2 ms-auto">
            {endpoint && <code className="small bg-light p-1 px-2 border rounded">{endpoint}</code>}
            {actions}
          </div>
        </div>
        <div className="card-body p-0">
          {children}
        </div>
      </div>
    </div>
  );
}
