import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

// Define the shape of the auth state
interface AuthState {
  user: null | { id: string; email: string; name?: string };
  token: string | null;
  loading: boolean;
}

// Define the shape of the auth actions
interface AuthActions {
  login: (token: string, user: { id: string; email: string; name?: string }) => void;
  logout: () => void;
}

// Combined context value
interface AuthContextType extends AuthState, AuthActions {}

// Create the context with a default value (will be overridden by Provider)
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Custom hook to use auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

// Provider component
interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [state, setState] = useState<AuthState>({
    user: null,
    token: null,
    loading: true,
  });

  // Simulate checking for persisted token on mount (e.g., from localStorage)
  useEffect(() => {
    const token = localStorage.getItem('authToken');
    const userJson = localStorage.getItem('authUser');
    if (token && userJson) {
      try {
        const user = JSON.parse(userJson);
        setState({ user, token, loading: false });
      } catch {
        // If parsing fails, treat as no user
        setState({ user: null, token: null, loading: false });
      }
    } else {
      setState(prev => ({ ...prev, loading: false }));
    }
  }, []);

  const login = (token: string, user: { id: string; email: string; name?: string }) => {
    localStorage.setItem('authToken', token);
    localStorage.setItem('authUser', JSON.stringify(user));
    setState({ user, token, loading: false });
  };

  const logout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('authUser');
    setState({ user: null, token: null, loading: false });
  };

  const value: AuthContextType = {
    ...state,
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};