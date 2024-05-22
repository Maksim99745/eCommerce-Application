import useAuth from '@hooks/useAuth';
import { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';

export function NoUserRoute({ children }: { children: ReactNode }) {
  const { hasNoUser, hasUser } = useAuth();

  return (
    <>
      {hasUser && <Navigate to="/" />}
      {hasNoUser && children}
    </>
  );
}

export function HasUserRoute({ children }: { children: ReactNode }) {
  const { hasNoUser, hasUser } = useAuth();

  return (
    <>
      {hasNoUser && <Navigate to="/" />}
      {hasUser && children}
    </>
  );
}
