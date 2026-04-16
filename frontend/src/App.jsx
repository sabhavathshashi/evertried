import { Routes, Route, Navigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from './context/AuthContext';
import Layout from './components/Layout';
import LandingPage from './pages/LandingPage';
import WorkerDashboard from './pages/WorkerDashboard';
import EmployerDashboard from './pages/EmployerDashboard';
import AuthPage from './pages/AuthPage';

// Protected Route Component to securely prevent unauthorized access
const ProtectedRoute = ({ children, allowedRole }) => {
    const { user } = useContext(AuthContext);
    
    if (!user) {
        return <Navigate to="/auth" replace />;
    }
    
    if (allowedRole && user.role !== allowedRole) {
        // Redirect to their respective dashboard instead of blocking
        return <Navigate to={`/${user.role}`} replace />;
    }
    
    return children;
};

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<LandingPage />} />
        <Route path="auth" element={<AuthPage />} />
        
        {/* Protected Dashboard Routes */}
        <Route path="worker" element={
            <ProtectedRoute allowedRole="worker">
                <WorkerDashboard />
            </ProtectedRoute>
        } />
        
        <Route path="employer" element={
            <ProtectedRoute allowedRole="employer">
                <EmployerDashboard />
            </ProtectedRoute>
        } />
      </Route>
    </Routes>
  );
}

export default App;
