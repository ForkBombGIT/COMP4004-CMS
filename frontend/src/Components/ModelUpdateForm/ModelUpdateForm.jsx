import React, { useState, useRef } from "react";
import {
  TextField,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@material-ui/core/";
import { notifySuccess, notifyFailure, createModel } from "Utils/";
import "./ModelUpdateForm.scss";
import { Client } from "Server";

const ModelUpdateForm = (props) => {
  const { setDisplay, model, relatedModelId } = props;
  const formRef = useRef();
  const [nameVal, setNameVal] = useState(model.name);
  const [emailVal, setEmailVal] = useState();
  const [birthVal, setBirthVal] = useState(
    model.service === "student" ? model.birth_date.split("T")[0] : null
  );
  const [capVal, setCapVal] = useState(model.capacity);
  const [timeVal, setTimeVal] = useState(model.time_slot);
  const [statusVal, setStatusVal] = useState(model.status);
  const [dueDateVal, setDueDateVal] = useState(model.due_date);
  const [weightVal, setWeightVal] = useState(model.weight);

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

  const handleModelUpdate = (event) => {
    event.preventDefault();
    const createdModel = createModel(
      model.service,
      nameVal,
      birthVal,
      capVal,
      timeVal,
      statusVal,
      dueDateVal,
      weightVal,
      relatedModelId
    );
    console.log(createdModel);
    Client.service(model.service)
      .patch(model.id, createdModel)
      .then(() => {
        notifySuccess("Successful Update!");
        setDisplay(false);
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
        notifyFailure("Unsuccessful Update!");
        // eslint-disable-next-line no-console
        console.log(e);
      });
  };

  return (
    <div id="update-form">
      <form ref={formRef} onSubmit={handleModelUpdate}>
        <TextField
          id="modal-user-name"
          name="modal-name"
          label="Name"
          variant="filled"
          value={nameVal}
          onChange={handleNameChange}
        />
        {model.service === "student" && (
          <TextField
            id="modal-user-birth"
            name="modal-birth"
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
        {(model.service !== "course" && model.service !== "deliverable") && (
          <TextField
            id="modal-user-email"
            name="modal-email"
            label="Email"
            variant="filled"
            value={emailVal}
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
              value={capVal}
              onChange={handleCapacityChange}
            />
            <TextField
              id="modal-course-time"
              name="modal-time"
              label="Time"
              variant="filled"
              value={timeVal}
              onChange={handleTimeChange}
            />
            <FormControl variant="filled">
              <InputLabel>Status</InputLabel>
              <Select
                name="modal-course-status-select"
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
        {model.service === "deliverable" && (
          <>
            <TextField
              id="modal-deliverable-weight"
              name="modal-weight"
              label="Weight"
              variant="filled"
              type="number"
              value={weightVal}
              onChange={handleWeightChange}
            />
            <TextField
              id="modal-deliverable-due-date"
              name="modal-due"
              label="Due Date"
              variant="filled"
              value={dueDateVal}
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
