import { useAuth } from '@core/api/use-auth.hook';
import FallbackPage from '@pages/Fallback/Fallback.page';
import { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';

export function NoUserRoute({ children }: { children: ReactNode }) {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return <FallbackPage />;
  }

  if (user) {
    return <Navigate to="/" />;
  }

  return children;
}

export function HasUserRoute({ children }: { children: ReactNode }) {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return <FallbackPage />;
  }

  if (!user) {
    return <Navigate to="/" />;
  }

  return children;
}
