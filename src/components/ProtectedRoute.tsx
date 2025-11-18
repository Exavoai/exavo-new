import { useAuth } from '@/contexts/AuthContext';
import { Navigate } from 'react-router-dom';
import { Loader2 } from 'lucide-react';
import { EmailVerificationBanner } from './EmailVerificationBanner';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requireRole?: 'admin' | 'client';
}

const ProtectedRoute = ({ children, requireRole }: ProtectedRouteProps) => {
  const { user, userRole, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (requireRole && userRole !== requireRole) {
    // Redirect to appropriate dashboard based on role
    return <Navigate to={userRole === 'admin' ? '/admin' : '/client'} replace />;
  }

  // Show verification banner for unverified users (except admins)
  if (!user.email_confirmed_at && userRole === 'client') {
    return (
      <div className="min-h-screen bg-background p-6">
        <EmailVerificationBanner />
        <div className="max-w-2xl mx-auto">
          {children}
        </div>
      </div>
    );
  }

  return <>{children}</>;
};

export default ProtectedRoute;
