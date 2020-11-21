import React from "react";
import { Container } from "@material-ui/core/";
import { LoginForm } from "Components";
import "./LoginPage.scss";

function LoginPage() {
  return (
    <div id="content">
      <Container maxWidth="sm">
        <LoginForm />
      </Container>
    </div>
  );
}

export default LoginPage;
