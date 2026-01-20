import React, { useState } from 'react';
import UserForm from './components/UserForm';
import UsersList from './components/UsersList';
import './App.css';

function App() {
  const [refreshList, setRefreshList] = useState(false);

  const handleSuccess = () => {
    setRefreshList(prev => !prev);
  };

  return (
    <div className="app-container">
      <header className="app-header">
        <div className="header-content">
          <h1>🌅 Good Morning!</h1>
          <p className="subtitle">Welcome to Tann Mann Foundation Registration</p>
        </div>
      </header>

      <div className="main-content">
        <section className="form-section">
          <h2>Register Yourself</h2>
          <UserForm onSuccess={handleSuccess} />
        </section>

        <section className="list-section">
          <h2>Registered Volunteers</h2>
          <UsersList refresh={refreshList} />
        </section>
      </div>

      <footer className="app-footer">
        <p>Tann Mann Foundation &copy; {new Date().getFullYear()} | Volunteer Registration System</p>
      </footer>
    </div>
  );
}

export default App;
