import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { getAuthToken, getUserEmail, saveAuthToken, clearAuthToken, isAuthenticated as checkAuth } from '@/lib/api';

interface AuthContextType {
  isAuthenticated: boolean;
  userEmail: string | null;
  login: (token: string, email: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(checkAuth());
  const [userEmail, setUserEmail] = useState<string | null>(getUserEmail());

  useEffect(() => {
    setIsAuthenticated(checkAuth());
    setUserEmail(getUserEmail());
  }, []);

  const login = (token: string, email: string) => {
    saveAuthToken(token, email);
    setIsAuthenticated(true);
    setUserEmail(email);
  };

  const logout = () => {
    clearAuthToken();
    setIsAuthenticated(false);
    setUserEmail(null);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, userEmail, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
