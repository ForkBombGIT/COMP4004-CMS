import React from "react";
import { Container } from "@material-ui/core/";
import { RegisterForm } from "Components/";
import "./LoginPage.scss";

const LoginPage = () => {
  return (
    <div id="content">
      <Container maxWidth="sm">
        <RegisterForm />
      </Container>
    </div>
  );
};

export default LoginPage;
