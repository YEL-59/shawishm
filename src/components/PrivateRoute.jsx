// import React from "react";
// import { Navigate, useLocation } from "react-router-dom";

// import Spinner from "./spinner/Spinner";
// import { useUser } from "../contexts/UserProvider";

// const PrivateRoute = ({ children }) => {
//   const { user, loading } = useUser();
//   const location = useLocation();

//   console.log(user, loading)

//   if (loading) {

//     return <Spinner />;
//   }


//   if (user) {

//     return children;
//   }


//   return <Navigate state={{ from: location }} to="/login" />;
// };

// export default PrivateRoute;




import React, { useEffect, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";

import { getAccessToken } from "../utils/cookieHelper";

const PrivateRoute = ({ children }) => {
  const location = useLocation();
  const [isTokenValidState, setIsTokenValidState] = useState(false);

 
    const accessToken = getAccessToken();


  if (!accessToken) {
    return <Navigate state={{ from: location }} to="/login" />;
  }

  return children;
};

export default PrivateRoute;

