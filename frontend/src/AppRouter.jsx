import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { RouterPaths } from "Utils/";
import { LoginPage } from "Pages/";

function AppRouter() {
  return (
    <Router>
      <Switch>
        <Route path={RouterPaths.LOGIN}>
          <LoginPage />
        </Route>
      </Switch>
    </Router>
  );
}

export default AppRouter;
