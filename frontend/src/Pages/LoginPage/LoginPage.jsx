import React from "react";
import { Container } from "@material-ui/core/";
import { LoginForm, RegisterForm } from "Components";

import "./LoginPage.scss";

function LoginPage() {
  return (
    <div id="content">
      <Container maxWidth="sm">
        <LoginForm />
        <RegisterForm />
      </Container>
    </div>
  );
}

export default LoginPage;
