import { AuthContext } from '@core/api/auth.provider';
import { useContext } from 'react';

export const useAuth = () => useContext(AuthContext);
