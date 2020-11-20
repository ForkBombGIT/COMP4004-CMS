import React, { useState } from "react";
import { TextField, Typography, Button } from "@material-ui/core/";
import { Client } from "Server/";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./RegisterForm.scss";

const notifySuccess = () =>
  toast.success("Application Created!", {
    position: "bottom-left",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: false,
    progress: undefined,
  });

const notifyFailure = () =>
  toast.error("Application Creation Failed", {
    position: "bottom-left",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: false,
    progress: undefined,
  });

export const createApplication = (nameVar) => ({
  name: nameVar,
});

const RegisterForm = () => {
  const [studentName, setStudentName] = useState();

  const handleStudentChange = (event) => {
    setStudentName(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      await Client.service("application").create(
        createApplication(studentName)
      );
      notifySuccess();
    } catch (e) {
      notifyFailure();
    }
  };

  return (
    <form id="application-form" onSubmit={handleSubmit}>
      <Typography component="h1" variant="h6">
        Student Application Form
      </Typography>
      <TextField
        id="student-name"
        name="student"
        label="Student Name"
        variant="filled"
        value={studentName}
        onChange={handleStudentChange}
      />
      <Button variant="contained" id="register-button" type="submit">
        SUBMIT
      </Button>
    </form>
  );
};

export default RegisterForm;
