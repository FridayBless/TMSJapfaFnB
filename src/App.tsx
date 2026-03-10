import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { SidebarProvider } from './context/SidebarContext';
import { RoleGuard } from './components/layouts/RoleGuard';

// Login Page
import Login from './pages/login/Login';

// Admin Logistik Pages
import LogisticsDashboard from './pages/logistik/Dashboard';
import LogisticsRoutePlanning from './pages/logistik/RoutePlanning';
import LogisticsDriverPerformance from './pages/logistik/DriverPerformance';
import LogisticsFleetManagement from './pages/logistik/FleetManagement';
import LogisticsAnalytics from './pages/logistik/Analytics';
import LogisticsSettings from './pages/logistik/Settings';

// Admin POD Pages
import PodDashboard from './pages/pod/Dashboard';
import PodVerifications from './pages/pod/Verifications';
import PodMonitoring from './pages/pod/Monitoring';
import PodHistory from './pages/pod/History';
import PodSettings from './pages/pod/Settings';

// Admin Sales Pages
import SalesDashboardLayout, { SalesHome } from './pages/sales/Dashboard';
import SalesOrderEntry from './pages/sales/OrderEntry';
import SalesVisibility from './pages/sales/Visibility';
import SalesBilling from './pages/sales/Billing';

// Driver Pages
import DriverDashboard from './pages/driver/Dashboard';
import DriverRouteList from './pages/driver/RouteList';
import DriverDeliveryDetail from './pages/driver/DeliveryDetail';
import DriverPodCapture from './pages/driver/PodCapture';
import DriverTripSummary from './pages/driver/TripSummary';

// Logistics Layout
import LogisticsLayout from './components/layouts/LogisticsLayout';

function App() {
  return (
    <Router>
      <AuthProvider>
        <SidebarProvider>
          <Routes>
            {/* Public Route */}
            <Route path="/login" element={<Login />} />

            {/* Root Redirect */}
            <Route path="/" element={<Navigate to="/login" replace />} />

            {/* Admin Logistik Routes */}
            <Route element={<RoleGuard allowedRoles={['logistik']} />}>
              <Route element={<LogisticsLayout />}>
                <Route path="/logistik" element={<LogisticsDashboard />} />
                <Route path="/logistik/route-planning" element={<LogisticsRoutePlanning />} />
                <Route path="/logistik/fleet" element={<LogisticsFleetManagement />} />
                <Route path="/logistik/drivers" element={<LogisticsDriverPerformance />} />
                <Route path="/logistik/analytics" element={<LogisticsAnalytics />} />
                <Route path="/logistik/settings" element={<LogisticsSettings />} />
              </Route>
            </Route>

            {/* Admin POD Routes */}
            <Route element={<RoleGuard allowedRoles={['pod']} />}>
              <Route path="/pod" element={<PodDashboard />} />
              <Route path="/pod/verifications" element={<PodVerifications />} />
              <Route path="/pod/monitoring" element={<PodMonitoring />} />
              <Route path="/pod/history" element={<PodHistory />} />
              <Route path="/pod/settings" element={<PodSettings />} />
              {/* Catch-all for pod routes */}
              <Route path="/pod/*" element={<Navigate to="/pod" replace />} />
            </Route>

            {/* Admin Sales Routes */}
            <Route element={<RoleGuard allowedRoles={['sales']} />}>
              <Route element={<SalesDashboardLayout />}>
                <Route path="/sales" element={<SalesHome />} />
                <Route path="/sales/order-entry" element={<SalesOrderEntry />} />
                <Route path="/sales/visibility" element={<SalesVisibility />} />
                <Route path="/sales/billing" element={<SalesBilling />} />
                <Route path="/sales/*" element={<Navigate to="/sales" replace />} />
              </Route>
            </Route>

            {/* Driver Routes (Mobile First) */}
            <Route element={<RoleGuard allowedRoles={['driver']} />}>
              <Route path="/driver" element={<DriverDashboard />} />
              <Route path="/driver/routes" element={<DriverRouteList />} />
              <Route path="/driver/detail" element={<DriverDeliveryDetail />} />
              <Route path="/driver/pod" element={<DriverPodCapture />} />
              <Route path="/driver/summary" element={<DriverTripSummary />} />
            </Route>

            {/* Catch-all route */}
            <Route path="*" element={<Navigate to="/login" replace />} />
          </Routes>
        </SidebarProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
