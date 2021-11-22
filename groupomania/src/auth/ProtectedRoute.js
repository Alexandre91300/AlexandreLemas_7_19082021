// Vérification de l'authentification de l'utilisateur

import React, { useEffect, useState } from "react";
import { Redirect, Route } from "react-router-dom";
import { userIsAuth } from "../api/User";

const ProtectedRoute = ({ component: Component, ...restOfProps }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("token");
  const uid = localStorage.getItem("id");

  useEffect(() => {
    if (token && uid) {
      userIsAuth()
        .then(() => {
          console.log("User is auth");
          setIsAuthenticated(true);
          setLoading(false);
        })
        .catch(() => {
          localStorage.clear();
          setLoading(false);
        })
    } else {
      setLoading(false);
    }
  }, [token, uid]);

  if (loading) {
    return <div className="lds-ripple"><div></div><div></div></div>
  }

  return (
    <Route
      {...restOfProps}
      render={(props) =>
        isAuthenticated ? <Component {...props} /> : <Redirect to="/login" />
      }
    />
  );
};

export default ProtectedRoute;
