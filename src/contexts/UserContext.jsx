import React, { createContext, useContext, useState, useEffect } from 'react';

const UserContext = createContext();

const ONE_DAY = 24 * 60 * 60 * 1000; 

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    const storedRole = localStorage.getItem('role');
    const storedUserId = localStorage.getItem('userId');
    const storedTimestamp = localStorage.getItem('timestamp');

    if (storedToken && storedRole && storedUserId) {
      const currentTime = Date.now();
      if (storedTimestamp && (currentTime - storedTimestamp < ONE_DAY)) {
        setUser({ userId: storedUserId, role: storedRole, token: storedToken });
      } else {
        // Token expired
        logout();
      }
    }
  }, []);

  const login = (userId, userRole, token) => {
    setUser({ userId, role: userRole, token });
    localStorage.setItem('userId', userId);
    localStorage.setItem('role', userRole);
    localStorage.setItem('token', token);
    localStorage.setItem('timestamp', Date.now()); 
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    localStorage.removeItem('userId');
    localStorage.removeItem('timestamp'); 
  };

  return (
    <UserContext.Provider value={{ user, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  return useContext(UserContext);
};
