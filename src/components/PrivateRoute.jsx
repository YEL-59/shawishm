import React, { useContext } from 'react';


import { Navigate, useLocation } from 'react-router-dom';
import { UserProvider } from '../contexts/UserProvider';
import Spinner from './spinner/Spinner';

const PrivateRoute = ({ children }) => {
  const { user, loading } = useContext(UserProvider); 
  const location = useLocation(); 

 
  if (loading) {
    return <Spinner />;
  }

 
  if (user) {
    return children;
  }


  return <Navigate state={{ from: location }} to="/login" replace />;
};

export default PrivateRoute;
