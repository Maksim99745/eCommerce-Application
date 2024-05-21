import useAuth from '@hooks/useAuth';
import { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';

export function NoUserRoute({ children }: { children: ReactNode }) {
  const { user } = useAuth();

  return (
    <>
      {user && <Navigate to="/" />}
      {!user && children}
    </>
  );
}

export function HasUserRoute({ children }: { children: ReactNode }) {
  const { user, hasUser } = useAuth();

  return (
    <>
      {!user && <Navigate to="/" />}
      {hasUser && children}
    </>
  );
}
