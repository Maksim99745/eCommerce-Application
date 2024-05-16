import { userLoadingSignal, userSignal } from '@core/signals/user.signal';
import FallbackPage from '@pages/Fallback/Fallback.page';
import { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';

export function NoUserRoute({ children }: { children: ReactNode }) {
  return (
    <>
      {userLoadingSignal.value && <FallbackPage />}
      {userSignal.value && <Navigate to="/" />}
      {!userSignal.value && !userLoadingSignal.value && children}
    </>
  );
}

export function HasUserRoute({ children }: { children: ReactNode }) {
  return (
    <>
      {userLoadingSignal.value && <FallbackPage />}
      {!userSignal.value && <Navigate to="/" />}
      {userSignal.value && !userLoadingSignal.value && children}
    </>
  );
}
