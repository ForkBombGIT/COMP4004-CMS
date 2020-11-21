import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { RouterPaths } from "Utils/";
import { LoginPage, AdminPage } from "Pages/";

function AppRouter() {
  return (
    <Router>
      <Switch>
        <Route path={RouterPaths.ADMIN}>
          <AdminPage />
        </Route>
        <Route exact path={RouterPaths.LOGIN}>
          <LoginPage />
        </Route>
      </Switch>
    </Router>
  );
}

export default AppRouter;
