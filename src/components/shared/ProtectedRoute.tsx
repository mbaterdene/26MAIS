import { Navigate } from "react-router-dom";
import { ShieldOff } from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import type { AdminRole } from "../../lib/admin-types";

function AccessDenied() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4 text-center px-4">
      <div className="w-16 h-16 rounded-full bg-cardinal-red/10 flex items-center justify-center text-cardinal-red">
        <ShieldOff size={28} />
      </div>
      <div>
        <h2 className="text-xl font-bold text-gray-900">Access Denied</h2>
        <p className="text-gray-500 mt-1 text-sm max-w-xs">
          You don't have permission to access this page. Contact a super admin if you need access.
        </p>
      </div>
    </div>
  );
}

interface ProtectedRouteProps {
  children: React.ReactNode;
  /** If provided, only these roles may access. Omit to allow any authenticated user. */
  allowedRoles?: AdminRole[];
}

export function ProtectedRoute({ children, allowedRoles }: ProtectedRouteProps) {
  const { isAuthenticated, isLoading, admin } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-cardinal-red" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/admin/login" replace />;
  }

  if (allowedRoles && admin && !allowedRoles.includes(admin.role)) {
    return <AccessDenied />;
  }

  return <>{children}</>;
}
