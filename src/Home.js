import React from 'react';
import { PieChart } from 'react-minimal-pie-chart';

const AdminPanel = () => {
  // Function to handle form submit
  const handleSave = (event) => {
    event.preventDefault();
    // Handle save logic here
  };

  return (
    <div className="admin-panel">
      <Sidebar />
      <div className="content">
        <Dashboard />
        <Settings onSave={handleSave} />
      </div>
    </div>
  );
};

const Sidebar = () => {
  return (
    <div className="sidebar">
      <div className="logo">
        {/* Place your logo here */}
        <h1>Company</h1>
      </div>
      <nav className="nav">
        <ul className="nav-items">
          <li className="nav-item"><a href="#general">General</a></li>
          <li className="nav-item"><a href="#settings">Settings</a></li>
          <li className="nav-item"><a href="#users">Users</a></li>
          <li className="nav-item"><a href="#statistics">Statistics</a></li>
          <li className="nav-item"><a href="#billing">Billing</a></li>
        </ul>
      </nav>
      <div className="logout">
        <button onClick={() => { /* Handle logout logic */ }}>Sign out</button>
      </div>
    </div>
  );
};

const Dashboard = () => {
  return (
    <div className="dashboard">
      <h2>Dashboard</h2>
      <PieChart
        data={[
          { title: 'One', value: 26, color: '#C13C37' },
          { title: 'Two', value: 4, color: '#6A2135' },
        ]}
      />
    </div>
  );
};

const Settings = ({ onSave }) => {
  return (
    <div className="settings">
      <h2>Settings</h2>
      <form onSubmit={onSave}>
        {/* Form fields here */}
        <button type="submit">Save</button>
      </form>
    </div>
  );
};

export default AdminPanel;
