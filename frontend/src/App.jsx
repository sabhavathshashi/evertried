import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import LandingPage from './pages/LandingPage';
import WorkerDashboard from './pages/WorkerDashboard';
import EmployerDashboard from './pages/EmployerDashboard';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<LandingPage />} />
        <Route path="worker" element={<WorkerDashboard />} />
        <Route path="employer" element={<EmployerDashboard />} />
      </Route>
    </Routes>
  );
}

export default App;
