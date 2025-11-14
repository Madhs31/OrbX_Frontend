import React from 'react';

const Dashboard: React.FC = () => {
  return (
    <div className="dashboard-layout">

      <div className="dashboard-content">
        <h1>Dashboard</h1>

        <div className="stats-cards">
          <div className="card">
            <h3>Total Countries</h3>
            <p>195</p>
          </div>
          <div className="card">
            <h3>Total Cities</h3>
            <p>4,416</p>
          </div>
          <div className="card">
            <h3>API Status</h3>
            <p className="status-operational">
              <span className="status-dot"></span>
              Operational
            </p>
          </div>
          <div className="card">
            <h3>Data Points Synced</h3>
            <p>1.2M</p>
          </div>
        </div>

        <div className="map-container">
          <div className="map-placeholder"></div>
        </div>

        <div className="table-container">
          <h2>Recently Accessed Locations</h2>
          <table>
            <thead>
              <tr>
                <th>Location</th>
                <th>Type</th>
                <th>Last Accessed</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Tokyo, Japan</td>
                <td>City</td>
                <td>2 hours ago</td>
                <td><span className="status status-syncing">Syncing</span></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;