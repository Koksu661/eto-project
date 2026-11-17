import { createContext, useContext, useState } from 'react';
import { mockAuthUsers } from '../data/MockData';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  // Load saved user from localStorage if available
  const [currentUser, setCurrentUser] = useState(() => {
    const saved = localStorage.getItem('mock_user');
    return saved ? JSON.parse(saved) : null;
  });

  const login = (email, password) => {
    const foundUser = mockAuthUsers.find(
      (u) => u.email.toLowerCase() === email.trim().toLowerCase() && u.password === password
    );

    if (!foundUser) {
      return { success: false, message: "Hibás e-mail cím vagy jelszó!" };
    }

    setCurrentUser(foundUser);
    localStorage.setItem('mock_user', JSON.stringify(foundUser));
    return { success: true, user: foundUser };
  };

  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem('mock_user');
  };

  return (
    <AuthContext.Provider value={{ currentUser, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);