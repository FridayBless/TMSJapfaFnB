import { Navigate, Outlet } from 'react-router-dom';
import { useAuth, type Role } from '../../context/AuthContext';

interface RoleGuardProps {
  allowedRoles: Role[];
  redirectTo?: string;
}

export const RoleGuard = ({ allowedRoles, redirectTo = '/login' }: RoleGuardProps) => {
  const { role } = useAuth();

  // If not logged in or role not allowed, redirect
  if (!role || !allowedRoles.includes(role)) {
    return <Navigate to={redirectTo} replace />;
  }

  // If allowed, render the child routes
  return <Outlet />;
};
