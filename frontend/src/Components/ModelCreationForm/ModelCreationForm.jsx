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

export const createModel = (
  roleVal,
  nameVal,
  birthVal = undefined,
  capVal = undefined,
  timeVal = undefined,
  status = undefined
) => ({
  name: nameVal === "" ? null : nameVal,
  birth_date: roleVal === "student" ? birthVal : undefined,
  capacity: roleVal === "course" ? capVal : undefined,
  time_slot: roleVal === "course" ? timeVal : undefined,
  status: roleVal === "course" ? status : undefined,
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
  const [statusVal, setStatusVal] = useState();

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

  const handleStatusChange = (event) => {
    setStatusVal(event.target.value);
  };

  const handleModelCreation = (event) => {
    event.preventDefault();
    const model = createModel(
      roleVal,
      nameVal,
      birthVal,
      capVal,
      timeVal,
      statusVal
    );
    Client.service(roleVal)
      .create(model)
      .then(() => {
        notifySuccess("Successful Creation!");
        updateLists();
        setNameVal("");
        setBirthVal("");
        setEmailVal("");
        setCapVal(0);
        setTimeVal("");
        setStatusVal("");
      })
      .catch((e) => {
        notifyFailure("Unsuccessful Creation!");
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
            id="user-birth"
            name="birth"
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
              value={timeVal}
              onChange={handleTimeChange}
            />
            <TextField
              id="course-status"
              name="status"
              label="Status"
              variant="filled"
              value={statusVal}
              onChange={handleStatusChange}
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
