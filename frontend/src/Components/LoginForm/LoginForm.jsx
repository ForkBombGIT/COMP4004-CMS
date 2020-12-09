import React, { useState } from "react";
import { TextField, Typography, Button } from "@material-ui/core/";
import { notifySuccess, notifyFailure } from "Utils/";
import { useAuth } from "Utils/RouterAuth";
import { useHistory } from "react-router-dom";
import "./LoginForm.scss";

const LoginPage = () => {
  const auth = useAuth();
  const history = useHistory();
  const [emailVal, setEmailVal] = useState();
  const [passVal, setPassVal] = useState();

  const handleEmailChange = (event) => {
    setEmailVal(event.target.value);
  };

  const handlePassChange = (event) => {
    setPassVal(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const client = await auth.signin(emailVal, passVal);
    if (client === null) notifyFailure("Unsuccessful Login!");
    else if (client.token !== null) {
      notifySuccess("Successful Login!");
      history.push(client.user_role);
    }
  };

  return (
    <form id="login-form" onSubmit={handleSubmit}>
      <Typography component="h1" variant="h6">
        Login
      </Typography>
      <TextField
        id="user-email"
        name="email"
        label="Email"
        variant="filled"
        value={emailVal}
        onChange={handleEmailChange}
      />
      <TextField
        id="user-password"
        name="password"
        label="Password"
        variant="filled"
        type="password"
        value={passVal}
        onChange={handlePassChange}
      />
      <Button variant="contained" name="login-button" type="submit">
        SUBMIT
      </Button>
    </form>
  );
};

export default LoginPage;
