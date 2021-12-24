import React from "react"
import { Route, Navigate } from "react-router-dom"
import { useAuth } from "../contexts/AuthContext"

export default function PrivateRoute({ component: Component }) {
  const { currentUser } = useAuth()
  //const ele = currentUser === true ? element : <Navigate to="/login"  />;
  //return <Route path={path} element={ele} />;
  console.log(currentUser)
  //return currentUser === true ? <Component {...props} /> : <Navigate to="/login" />;
  //accessToken
  //if(currentUser){
  //  return <RouteComponent />
  //} else {
  //  <Navigate to="/login" />
  //}
        return currentUser ? <Component /> : <Navigate to="/login" />


}