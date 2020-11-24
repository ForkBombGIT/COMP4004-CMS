import React from "react";
import { Button } from "@material-ui/core/";
import { useAuth, notifySuccess, notifyFailure, RouterPaths } from "Utils/";
import { useHistory } from "react-router-dom";

const LogoutButton = () => {
  const auth = useAuth();
  const history = useHistory();

  const handleLogout = async (event) => {
    event.preventDefault();

    const client = await auth.signout();
    if (client === null) notifyFailure("Unsuccessful Logout");
    else if (client.token !== null) {
      notifySuccess("Successfuly Logged Out");
      history.push(RouterPaths.LOGIN);
    }
  };

  return (
    <Button id="logout-button" onClick={handleLogout}>
      Logout
    </Button>
  );
};

export default LogoutButton;
