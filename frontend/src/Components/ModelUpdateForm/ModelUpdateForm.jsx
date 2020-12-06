import React, { useState, useRef, useEffect } from "react";
import {
  TextField,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@material-ui/core/";
import { notifySuccess, notifyFailure, createModel } from "Utils/";
import { paramsForServer } from "feathers-hooks-common";
import "./ModelUpdateForm.scss";
import { Client } from "Server";

const ModelUpdateForm = (props) => {
  const { setDisplay, model, relatedModelId } = props;
  const formRef = useRef();
  const [name, setName] = useState(model.name);
  const [email, setEmail] = useState();
  const [birth, setBirth] = useState(
    model.service === "student" ? model.birth_date.split("T")[0] : null
  );
  const [cap, setCap] = useState(model.capacity);
  const [time, setTime] = useState(model.time_slot);
  const [status, setStatus] = useState(model.status);
  const [dueDate, setDueDate] = useState(model.due_date);
  const [weight, setWeight] = useState(model.weight);

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

  const handleModelUpdate = (event) => {
    event.preventDefault();
    const createdModel = createModel(
      model.service,
      name,
      birth,
      cap,
      time,
      status,
      dueDate,
      weight,
      relatedModelId
    );
    Client.service(model.service)
      .patch(
        model.id,
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
        notifySuccess("Successful Update!");
        setDisplay(false);
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
        notifyFailure("Unsuccessful Update!");
      });
  };

  useEffect(() => {
    if (model.service !== "course" && model.service !== "deliverable") {
      const query = {};
      query[`${model.service}Id`] = model.id;
      query.user_role = model.service;
      Client.service("loginCredential")
        .find({ query })
        .then((cred) => {
          setEmail(cred[0].email);
        });
    }
  }, []);

  return (
    <div id="update-form">
      <form ref={formRef} onSubmit={handleModelUpdate}>
        <TextField
          id="modal-user-name"
          name="modal-name"
          label="Name"
          variant="filled"
          value={name}
          onChange={handleNameChange}
        />
        {model.service === "student" && (
          <TextField
            id="modal-user-birth"
            name="modal-birth"
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
        {model.service !== "course" && model.service !== "deliverable" && (
          <TextField
            id="modal-user-email"
            name="modal-email"
            label="Email"
            variant="filled"
            value={email}
            onChange={handleEmailChange}
          />
        )}
        {model.service === "course" && (
          <>
            <TextField
              id="modal-course-capacity"
              name="modal-capacity"
              label="Capacity"
              variant="filled"
              type="number"
              InputProps={{ inputProps: { min: 0 } }}
              value={cap}
              onChange={handleCapacityChange}
            />
            <TextField
              id="modal-course-time"
              name="modal-time"
              label="Time"
              variant="filled"
              value={time}
              onChange={handleTimeChange}
            />
            <FormControl variant="filled">
              <InputLabel>Status</InputLabel>
              <Select
                name="modal-course-status-select"
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
        {model.service === "deliverable" && (
          <>
            <TextField
              id="modal-deliverable-weight"
              name="modal-weight"
              label="Weight"
              variant="filled"
              type="number"
              value={weight}
              onChange={handleWeightChange}
            />
            <TextField
              id="modal-deliverable-due-date"
              name="modal-due"
              label="Due Date"
              variant="filled"
              value={dueDate}
              onChange={handleDueDateChange}
            />
          </>
        )}
        <Button variant="contained" id="update-button" type="submit">
          UPDATE
        </Button>
      </form>
    </div>
  );
};

export default ModelUpdateForm;
