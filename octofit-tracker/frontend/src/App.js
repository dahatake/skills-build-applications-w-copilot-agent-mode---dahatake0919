import React from 'react';
import { NavLink, Routes, Route } from 'react-router-dom';
import './App.css';
import Activities from './components/Activities';
import Leaderboard from './components/Leaderboard';
import Teams from './components/Teams';
import Users from './components/Users';
import Workouts from './components/Workouts';

const codespaceName = process.env.REACT_APP_CODESPACE_NAME;
const base = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev/api`
  : (process.env.REACT_APP_API_BASE || 'http://localhost:8000/api');

export const apiEndpoints = {
  activities: `${base}/activities/`,
  leaderboard: `${base}/leaderboard/`,
  teams: `${base}/teams/`,
  users: `${base}/users/`,
  workouts: `${base}/workouts/`
};

function Home() {
  return (
    <div className="container py-4">
      <div className="card app-section-card">
        <div className="card-header d-flex justify-content-between align-items-center">
          <h1 className="h4 m-0">OctoFit Tracker</h1>
          <span className="badge bg-light text-dark api-endpoint-badge">API BASE</span>
        </div>
        <div className="card-body">
          <p className="lead">Select a section from the navigation.</p>
          <code className="small d-block p-2 bg-light border rounded">{base}</code>
        </div>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
          <NavLink className="navbar-brand d-flex align-items-center" to="/">
            <img src="/logo.png" className="brand-logo me-2" alt="OctoFit" />
            <span>OctoFit</span>
          </NavLink>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarsExample" aria-controls="navbarsExample" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarsExample">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item"><NavLink className="nav-link" to="/activities">Activities</NavLink></li>
              <li className="nav-item"><NavLink className="nav-link" to="/leaderboard">Leaderboard</NavLink></li>
              <li className="nav-item"><NavLink className="nav-link" to="/teams">Teams</NavLink></li>
              <li className="nav-item"><NavLink className="nav-link" to="/users">Users</NavLink></li>
              <li className="nav-item"><NavLink className="nav-link" to="/workouts">Workouts</NavLink></li>
            </ul>
          </div>
        </div>
      </nav>
      <main className="pb-5">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/activities" element={<Activities />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/teams" element={<Teams />} />
          <Route path="/users" element={<Users />} />
          <Route path="/workouts" element={<Workouts />} />
        </Routes>
      </main>
    </>
  );
}
