import useAuth from '@core/api/hooks/useAuth';
import { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';

export function NoUserRoute({ children }: { children: ReactNode }) {
  const { hasUser } = useAuth();

  return (
    <>
      {hasUser && <Navigate to="/" />}
      {children}
    </>
  );
}

export function HasUserRoute({ children }: { children: ReactNode }) {
  const { hasNoUser } = useAuth();

  return (
    <>
      {hasNoUser && <Navigate to="/" />}
      {children}
    </>
  );
}
