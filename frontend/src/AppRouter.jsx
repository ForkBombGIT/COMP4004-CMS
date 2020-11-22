import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { RouterPaths } from "Utils/";
import { PrivateRoute, ProvideAuth } from "Utils/RouterAuth";
import { NotFound } from "Components/";
import { ProfPage, StudentPage, LoginPage, AdminPage } from "Pages/";

function AppRouter() {
  return (
    <ProvideAuth>
      <Router>
        <Switch>
          <Route exact path={RouterPaths.LOGIN}>
            <LoginPage />
          </Route>
          <PrivateRoute path={RouterPaths.ADMINISTRATOR}>
            <AdminPage />
          </PrivateRoute>
          <PrivateRoute path={RouterPaths.PROFESSOR}>
            <ProfPage />
          </PrivateRoute>
          <PrivateRoute path={RouterPaths.STUDENT}>
            <StudentPage />
          </PrivateRoute>
          <Route component={NotFound} />
        </Switch>
      </Router>
    </ProvideAuth>
  );
}

export default AppRouter;
