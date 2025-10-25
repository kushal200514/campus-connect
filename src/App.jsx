import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import Layout from './Layout';
import Login from './pages/Login';
import Home from './pages/Home';
import PostItem from './pages/PostItem';
import ItemDetails from './pages/ItemDetails';
import MyClaims from './pages/MyClaims';
import Profile from './pages/Profile';

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/login" element={<Login />} />
          
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Layout>
                  <Home />
                </Layout>
              </ProtectedRoute>
            }
          />
          
          <Route
            path="/post"
            element={
              <ProtectedRoute>
                <Layout>
                  <PostItem />
                </Layout>
              </ProtectedRoute>
            }
          />
          
          <Route
            path="/item/:id"
            element={
              <ProtectedRoute>
                <Layout>
                  <ItemDetails />
                </Layout>
              </ProtectedRoute>
            }
          />
          
          <Route
            path="/claims"
            element={
              <ProtectedRoute>
                <Layout>
                  <MyClaims />
                </Layout>
              </ProtectedRoute>
            }
          />
          
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Layout>
                  <Profile />
                </Layout>
              </ProtectedRoute>
            }
          />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
