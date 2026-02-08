'use client';

import { getAuthenticatedUser } from '@/old-api/auth/check';
import { HttpStatusCode } from 'axios';
import { createContext, useLayoutEffect, useState } from 'react';

export const AuthContext = createContext({
  isAuthenticated: false,
  user: null,
  resetAuthState: () => {},
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  // You can add authentication logic here and provide values to the context
  const [state, setState] = useState({
    isAuthenticated: false,
    user: null,
  });

  const resetAuthState = () => {
    setState({
      isAuthenticated: false,
      user: null,
    });
  };

  useLayoutEffect(() => {
    // Initialize authentication state here if needed

    getAuthenticatedUser()
      .then((response) => {
        if (response.status === HttpStatusCode.Ok) {
          setState({
            isAuthenticated: true,
            user: response.data,
          });
        }
      })
      .catch(() => {
        setState({
          isAuthenticated: false,
          user: null,
        });
      });
  }, []);

  return (
    <AuthContext.Provider value={{ ...state, resetAuthState }}>
      {children}
    </AuthContext.Provider>
  );
}
