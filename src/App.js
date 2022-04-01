/** @format */

import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';

import Dashboard from './components/dashboard/Dashboard.js';
import Login from './components/authentication/Login.js';
import PrivateRoute from './components/routes/PrivateRoute.js';
import PublicRoute from './components/routes/PublicRoute.js';
import React from 'react';
import Register from './components/authentication/Register.js';

function App() {
  return (
    <>
      <Router>  
        <Routes>
          <Route
            path="/register"
            element={
              <PublicRoute>
                <Register />{' '}
              </PublicRoute>
            }
          />
          <Route
            path="/login"
            element={
              <PublicRoute>
                {' '}
                <Login />{' '}
              </PublicRoute>
            }
          />
          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <Dashboard />{' '}
              </PrivateRoute>
            }
          />
        </Routes>
      </Router>
    </>
  );
}

export default App;
