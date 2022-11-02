import React from "react";
import { Redirect, Route } from "react-router-dom";

function AdminRoute({ component: Component, ...restOfProps }) {
  const isAdmin = localStorage.getItem("isAdmin");

  return (
    <Route
      {...restOfProps}
      render={(props) =>
        isAdmin ? <Component {...props} /> : <Redirect to="/login" />
      }
    />
  );
}

export default AdminRoute;