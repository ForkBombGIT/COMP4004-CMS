import React, { useState, useRef } from "react";
import {
  Typography,
  TextField,
  Select,
  MenuItem,
  Button,
  FormControl,
  InputLabel,
} from "@material-ui/core/";
import { notifySuccess, notifyFailure } from "Utils/";
import "./ModelCreationForm.scss";
import { Client } from "Server";

export const createModel = (
  model,
  name,
  birth = undefined,
  cap = undefined,
  time = undefined,
  status = undefined,
  due = undefined,
  weight = undefined,
  relatedModelId = undefined
) => ({
  name: name === "" ? undefined : name,
  birth_date: model === "student" ? birth : undefined,
  capacity: model === "course" ? cap : undefined,
  time_slot: model === "course" ? time : undefined,
  status: model === "course" ? status : undefined,
  weight: model === "deliverable" ? weight : undefined,
  due_date: model === "deliverable" ? due : undefined,
  courseId: model === "deliverable" ? relatedModelId : undefined,
});

const ModelCreationForm = (props) => {
  const { title, service, relatedModelId } = props;
  const formRef = useRef();
  const [modelVal, setModelVal] = useState(
    service === undefined ? "student" : service
  );
  const [nameVal, setNameVal] = useState("");
  const [emailVal, setEmailVal] = useState("");
  const [birthVal, setBirthVal] = useState();
  const [capVal, setCapVal] = useState(0);
  const [timeVal, setTimeVal] = useState("");
  const [statusVal, setStatusVal] = useState("");
  const [dueDateVal, setDueDateVal] = useState("");
  const [weightVal, setWeightVal] = useState(0);

  const handleModelVal = (event) => {
    setModelVal(event.target.value);
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

  const handleDueDateChange = (event) => {
    setDueDateVal(event.target.value);
  };

  const handleWeightChange = (event) => {
    setWeightVal(event.target.value);
  };

  const handleModelCreation = (event) => {
    event.preventDefault();
    const createdModel = createModel(
      modelVal,
      nameVal,
      birthVal,
      capVal,
      timeVal,
      statusVal,
      dueDateVal,
      weightVal,
      relatedModelId
    );
    Client.service(modelVal)
      .create(createdModel)
      .then(() => {
        notifySuccess("Successful Creation!");
        setNameVal("");
        setBirthVal("");
        setEmailVal("");
        setCapVal(0);
        setTimeVal("");
        setStatusVal("");
        setDueDateVal("");
        setWeightVal(0);
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
        {modelVal !== "deliverable" && (
          <FormControl variant="filled">
            <InputLabel>Model</InputLabel>
            <Select
              name="model-select"
              value={modelVal}
              onChange={handleModelVal}
            >
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
          </FormControl>
        )}
        <TextField
          id="user-name"
          name="name"
          label="Name"
          variant="filled"
          value={nameVal}
          onChange={handleNameChange}
        />
        {modelVal === "student" && (
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
        {modelVal !== "course" && modelVal !== "deliverable" && (
          <TextField
            id="user-email"
            name="email"
            label="Email"
            variant="filled"
            value={emailVal}
            onChange={handleEmailChange}
          />
        )}
        {modelVal === "course" && (
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
            <FormControl variant="filled">
              <InputLabel>Status</InputLabel>
              <Select
                name="course-status-select"
                value={statusVal}
                onChange={handleStatusChange}
              >
                <MenuItem name="inprogress" value="inprogress">
                  IN PROGRESS
                </MenuItem>
                <MenuItem name="cancelled" value="cancelled">
                  CANCELLED
                </MenuItem>
                <MenuItem name="unscheduled" value="unscheduled">
                  UNSCHEDULED
                </MenuItem>
                <MenuItem name="completed" value="completed">
                  COMPLETED
                </MenuItem>
              </Select>
            </FormControl>
          </>
        )}
        {modelVal === "deliverable" && (
          <>
            <TextField
              id="deliverable-weight"
              name="weight"
              label="Weight"
              variant="filled"
              type="number"
              value={weightVal}
              onChange={handleWeightChange}
            />
            <TextField
              id="deliverable-due-date"
              name="due"
              label="Due Date"
              variant="filled"
              value={dueDateVal}
              onChange={handleDueDateChange}
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
