import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AdminCheck = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem('token');
      const role = localStorage.getItem('role');
      if (!token) {
        setIsAuthenticated(false);
        setIsAdmin(false);
        return;
      }

      try {
        const response = await axios.get('http://localhost:3000/api/user/auth', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setIsAuthenticated(true);
        setIsAdmin(role === 'ADMIN');
      } catch (error) {
        setIsAuthenticated(false);
        setIsAdmin(false);
      }
    };

    checkAuth();
  }, []);

  if (!isAuthenticated) {
    return null;
  }

  return isAdmin ? children : null;
};

export default AdminCheck;