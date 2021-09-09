import React, { useEffect, useState } from "react";
import { Redirect, Route } from "react-router-dom";
import Axios from 'axios';

const ProtectedRoute = ({ component: Component, ...restOfProps }) => {

  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [loading, setLoading] = useState(true)
  const token = localStorage.getItem('token');
  const uid = localStorage.getItem('id');

  useEffect(() => {

    if (token && uid) {

        console.log('send request');
        // Send request
        Axios.post('http://localhost:3000/api/auth/isUserAuth', {token: token, uid: uid})
        .then(res => {

        if (res.data.isAuth) {
            console.log('User connected');
            setIsAuthenticated(true)
            setLoading(false)
        }
  
        })
        .catch(err => {
            setLoading(false)
        })
    } else {
        setLoading(false)
    }

  }, [])

  if(loading){
    return <>Loading...</>
  }

  return (
    <Route
      {...restOfProps}
      render={(props) =>
        isAuthenticated ? <Component {...props} /> : <Redirect to="/login" />
      }
    />
  );
}

export default ProtectedRoute;