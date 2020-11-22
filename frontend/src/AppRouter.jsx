// import React, { useEffect, useContext, createContext, useState } from "react";
import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  // Link,
  // Redirect,
  // useHistory,
  // useLocation,
} from "react-router-dom";
import { RouterPaths } from "Utils/";
import { PrivateRoute, ProvideAuth } from "Utils/RouterAuth";
import { LoginPage, AdminPage } from "Pages/";

function AppRouter() {
  return (
    <ProvideAuth>
      <Router>
        <Switch>
          <Route exact path={RouterPaths.LOGIN}>
            <LoginPage />
          </Route>
          <PrivateRoute path={RouterPaths.ADMIN}>
            <AdminPage />
          </PrivateRoute>
        </Switch>
      </Router>
    </ProvideAuth>
  );
}

export default AppRouter;
