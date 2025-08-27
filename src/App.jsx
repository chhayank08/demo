import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './contexts/AuthContext';
import { ThemeProvider } from './contexts/ThemeContext';
import { WebsiteProvider } from './contexts/WebsiteContext';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import SiteBuilder from './pages/SiteBuilder';
import PrivateRoute from './components/PrivateRoute';

function App() {
  return (
    <AuthProvider>
      <ThemeProvider>
        <WebsiteProvider>
          <Router>
          <div className="min-h-screen bg-background text-foreground">
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route 
                path="/dashboard/*" 
                element={
                  <PrivateRoute>
                    <Dashboard />
                  </PrivateRoute>
                } 
              />
              <Route 
                path="/builder/:siteId" 
                element={
                  <PrivateRoute>
                    <SiteBuilder />
                  </PrivateRoute>
                } 
              />
              <Route path="/" element={<Navigate to="/dashboard" replace />} />
            </Routes>
            <Toaster 
              position="top-right" 
              toastOptions={{
                className: 'bg-card text-card-foreground shadow-lg',
                style: {
                  borderRadius: '0.5rem',
                },
              }}
            />
          </div>
          </Router>
        </WebsiteProvider>
      </ThemeProvider>
    </AuthProvider>
  );
}

export default App;
