import React, { createContext, useContext, useState, useEffect } from 'react';
import api from '../lib/axios';

const AuthContext = createContext();
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const login = async (userData) => {
    const userloginData = {
      email: userData.email,
      password: userData.password,
      role: userData.role
    }
    try {      
      const res = await api.post('/auth/login', userloginData);   
      setUser(res.data);
      localStorage.setItem('user', JSON.stringify(res.data));
    } catch (error) {
      console.error('Login failed:', error);
    }   
    
  };

  const logout = async () => {
      try {
        await api.post('/auth/logout', {}, {
          headers: {
            Authorization: `Bearer ${user.accessToken}`,
          },
          
        });
      } catch (error) {
        console.error('Logout failed:', error);
      }
    setUser(null);
    localStorage.removeItem('user');
  };

  if (loading) {
    return null; // Or a minimal spinner
  }

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
