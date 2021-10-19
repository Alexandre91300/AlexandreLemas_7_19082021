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

      // Send request
      Axios.post('http://localhost:3000/api/auth/isUserAuth', { token: token, uid: uid }, {
        headers: {
          authorization: uid + ' ' + token
        }
      }).then(res => {

        localStorage.setItem('username', res.data.username)


        if (res.data.isAuth) {
          console.log('User connected');
          setIsAuthenticated(true)
          setLoading(false)
        } else {
          console.log('User disconnected');
          localStorage.clear()
        }

      }).catch(err => {
        setLoading(false)
      })
    } else {
      setLoading(false)
    }

  }, [token, uid])

  if (loading) {
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