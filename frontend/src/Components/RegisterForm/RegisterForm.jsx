import React, { useState } from "react";
import { TextField, Typography, Button } from "@material-ui/core/";
import { Client } from "Server/";
import { notifySuccess, notifyFailure } from "Utils/";
import "./RegisterForm.scss";

export const createApplication = (nameVar, birthVar) => ({
  name: nameVar,
  birth_date: birthVar,
});

const RegisterForm = () => {
  const [studentName, setStudentName] = useState();
  const [studentBirthDate, setStudentBirthDate] = useState("2020-05-24");

  const handleStudentChange = (event) => {
    setStudentName(event.target.value);
  };

  const handleStudentBirthChange = (event) => {
    setStudentBirthDate(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await Client.service("application").create(
        createApplication(studentName, studentBirthDate)
      );
      notifySuccess("Application Created!");
      setStudentName("");
      setStudentBirthDate("");
    } catch (e) {
      notifyFailure("Application Creation Failed!");
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
      <TextField
        id="student-birth-date"
        label="birthday"
        type="date"
        variant="filled"
        value={studentBirthDate}
        onChange={handleStudentBirthChange}
        InputLabelProps={{
          shrink: true,
        }}
      />
      <Button variant="contained" id="register-button" type="submit">
        SUBMIT
      </Button>
    </form>
  );
};

export default RegisterForm;
