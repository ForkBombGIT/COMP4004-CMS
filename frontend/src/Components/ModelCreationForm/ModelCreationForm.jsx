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
import { notifySuccess, notifyFailure, createModel } from "Utils/";
import { paramsForServer } from "feathers-hooks-common";
import "./ModelCreationForm.scss";
import { Client } from "Server";

const ModelCreationForm = (props) => {
  const { title, service, relatedModelId } = props;
  const formRef = useRef();
  const [model, setModel] = useState(
    service === undefined ? "student" : service
  );
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [birth, setBirth] = useState();
  const [cap, setCap] = useState(0);
  const [time, setTime] = useState("");
  const [status, setStatus] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [weight, setWeight] = useState(0);

  const handleModel = (event) => {
    setModel(event.target.value);
  };

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleBirthChange = (event) => {
    setBirth(event.target.value);
  };

  const handleCapacityChange = (event) => {
    setCap(event.target.value);
  };

  const handleTimeChange = (event) => {
    setTime(event.target.value);
  };

  const handleStatusChange = (event) => {
    setStatus(event.target.value);
  };

  const handleDueDateChange = (event) => {
    setDueDate(event.target.value);
  };

  const handleWeightChange = (event) => {
    setWeight(event.target.value);
  };

  const handleModelCreation = (event) => {
    event.preventDefault();
    const createdModel = createModel(
      model,
      name,
      birth,
      cap,
      time,
      status,
      dueDate,
      weight,
      relatedModelId
    );
    Client.service(model)
      .create(
        createdModel,
        model.service !== "course" && model.service !== "deliverable"
          ? paramsForServer({
              data: {
                email,
              },
            })
          : null
      )
      .then(() => {
        notifySuccess("Successful Creation!");
        setName("");
        setBirth("");
        setEmail("");
        setCap(0);
        setTime("");
        setStatus("");
        setDueDate("");
        setWeight(0);
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
        {model !== "deliverable" && (
          <FormControl variant="filled">
            <InputLabel>Model</InputLabel>
            <Select name="model-select" value={model} onChange={handleModel}>
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
          value={name}
          onChange={handleNameChange}
        />
        {model === "student" && (
          <TextField
            id="user-birth"
            name="birth"
            label="Birthday"
            type="date"
            variant="filled"
            value={birth}
            onChange={handleBirthChange}
            InputLabelProps={{
              shrink: true,
            }}
          />
        )}
        {model !== "course" && model !== "deliverable" && (
          <TextField
            id="user-email"
            name="email"
            label="Email"
            variant="filled"
            value={email}
            onChange={handleEmailChange}
          />
        )}
        {model === "course" && (
          <>
            <TextField
              id="course-capacity"
              name="capacity"
              label="Capacity"
              variant="filled"
              type="number"
              InputProps={{ inputProps: { min: 0 } }}
              value={cap}
              onChange={handleCapacityChange}
            />
            <TextField
              id="course-time"
              name="time"
              label="Time"
              variant="filled"
              value={time}
              onChange={handleTimeChange}
            />
            <FormControl variant="filled">
              <InputLabel>Status</InputLabel>
              <Select
                name="course-status-select"
                value={status}
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
        {model === "deliverable" && (
          <>
            <TextField
              id="deliverable-weight"
              name="weight"
              label="Weight"
              variant="filled"
              type="number"
              value={weight}
              onChange={handleWeightChange}
            />
            <TextField
              id="deliverable-due-date"
              name="due"
              label="Due Date"
              variant="filled"
              value={dueDate}
              onChange={handleDueDateChange}
            />
          </>
        )}
        <Button variant="contained" id="create-button" type="submit">
          CREATE
        </Button>
      </form>
    </div>
  );
};

export default ModelCreationForm;
