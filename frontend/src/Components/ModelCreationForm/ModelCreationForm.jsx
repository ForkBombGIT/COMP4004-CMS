import React, { useState, useRef } from "react";
import {
  Typography,
  TextField,
  Select,
  MenuItem,
  Button,
} from "@material-ui/core/";
import { notifySuccess, notifyFailure } from "Utils/";
import "./ModelCreationForm.scss";
import { Client } from "Server";

export const createModel = (roleVal, nameVal, birthVal = "") => ({
  name: nameVal === "" ? null : nameVal,
  birth_date: roleVal === "student" ? birthVal : undefined,
});

const ModelCreationForm = (props) => {
  const { title, updateLists } = props;
  const formRef = useRef();
  const [roleVal, setRoleVal] = useState("student");
  const [nameVal, setNameVal] = useState("");
  const [emailVal, setEmailVal] = useState("");
  const [birthVal, setBirthVal] = useState();
  const [capVal, setCapVal] = useState(0);
  const [timeVal, setTimeVal] = useState();

  const handleRoleVal = (event) => {
    setRoleVal(event.target.value);
  };

  const handleNameChange = (event) => {
    setNameVal(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmailVal(event.target.value);
  };

  const handleBirthChange = (event) => {
    setBirthVal(event.target.value);
  };

  const handleCapacityChange = (event) => {
    setCapVal(event.target.value);
  };

  const handleTimeChange = (event) => {
    setTimeVal(event.target.value);
  };

  const handleModelCreation = (event) => {
    event.preventDefault();
    const model = createModel(roleVal, nameVal, birthVal);
    Client.service(roleVal)
      .create(model)
      .then(() => {
        notifySuccess("Successful creation!");
        updateLists();
        setNameVal("");
        setBirthVal("");
        setEmailVal("");
        setCapVal(0);
        setTimeVal("");
      })
      .catch((e) => {
        notifyFailure("Unsuccessful creation!");
        // eslint-disable-next-line no-console
        console.log(e);
      });
  };

  return (
    <div id="creation-form">
      <Typography variant="h6" component="h2">
        {title}
      </Typography>
      <form ref={formRef} onSubmit={handleModelCreation}>
        <Select name="model-select" value={roleVal} onChange={handleRoleVal}>
          <MenuItem name="student" value="student">
            Student
          </MenuItem>
          <MenuItem name="professor" value="professor">
            Professor
          </MenuItem>
          <MenuItem name="administrator" value="administrator">
            Administrator
          </MenuItem>
          <MenuItem name="course" value="course">
            Course
          </MenuItem>
        </Select>
        <TextField
          id="user-name"
          name="name"
          label="Name"
          variant="filled"
          value={nameVal}
          onChange={handleNameChange}
        />
        {roleVal === "student" && (
          <TextField
            id="user-date"
            label="Birthday"
            type="date"
            variant="filled"
            value={birthVal}
            onChange={handleBirthChange}
            InputLabelProps={{
              shrink: true,
            }}
          />
        )}
        {roleVal !== "course" && (
          <TextField
            id="user-email"
            name="email"
            label="Email"
            variant="filled"
            value={emailVal}
            onChange={handleEmailChange}
          />
        )}
        {roleVal === "course" && (
          <>
            <TextField
              id="course-capacity"
              name="capacity"
              label="Capacity"
              variant="filled"
              type="number"
              InputProps={{ inputProps: { min: 0 } }}
              value={capVal}
              onChange={handleCapacityChange}
            />
            <TextField
              id="course-time"
              name="time"
              label="Time"
              variant="filled"
              type="time"
              value={timeVal}
              onChange={handleTimeChange}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </>
        )}
        <Button variant="contained" name="create-button" type="submit">
          CREATE
        </Button>
      </form>
    </div>
  );
};

export default ModelCreationForm;
