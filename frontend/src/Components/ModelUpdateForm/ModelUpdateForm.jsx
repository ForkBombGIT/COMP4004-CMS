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
  const [courseRegistrationDate, setCourseRegistrationDate] = useState("");
  const [courseWithdrawDate, setCourseWithdrawDate] = useState("");
  const [deliverableDueDate, setDeliverableDueDate] = useState(model.due_date);
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

  const handleCourseRegistrationDateChange = (event) => {
    setCourseRegistrationDate(event.target.value);
  };

  const handleCourseWithdrawDateChange = (event) => {
    setCourseWithdrawDate(event.target.value);
  };

  const handleDeliverableDueDateChange = (event) => {
    setDeliverableDueDate(event.target.value);
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
      deliverableDueDate,
      weight,
      relatedModelId
    );
    let paramsToSend = null;
    if (model.service === "course") {
      paramsToSend = paramsForServer({
        data: {
          courseRegistrationDate,
          courseWithdrawDate,
        },
      });
    } else if (model.service !== "course" && model.service !== "deliverable") {
      paramsToSend = paramsForServer({
        data: {
          email,
        },
      });
    }
    console.log(createdModel);
    Client.service(model.service)
      .patch(model.id, createdModel, paramsToSend)
      .then(() => {
        notifySuccess("Successful Update!");
        setDisplay(false);
        setName("");
        setBirth("");
        setEmail("");
        setCap(0);
        setTime("");
        setStatus("");
        setCourseRegistrationDate("");
        setCourseWithdrawDate("");
        setDeliverableDueDate("");
        setWeight(0);
      })
      .catch((e) => {
        console.log(e);
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
    if (model.service === "course") {
      Client.service("academicDeadline")
        .find({
          query: {
            courseId: model.id,
          },
        })
        .then((deadlines) => {
          // eslint-disable-next-line no-plusplus
          for (let i = 0; i < deadlines.length; i++) {
            if (deadlines[i].type === "registration")
              setCourseRegistrationDate(deadlines[i].due_date.split("T")[0]);
            else if (deadlines[i].type === "withdraw")
              setCourseWithdrawDate(deadlines[i].due_date.split("T")[0]);
          }
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
            <TextField
              id="course-registration-date"
              name="registration"
              label="Registration Date"
              variant="filled"
              type="date"
              value={courseRegistrationDate}
              onChange={handleCourseRegistrationDateChange}
              InputLabelProps={{
                shrink: true,
              }}
            />
            <TextField
              id="course-withdraw-date"
              name="withdraw"
              label="Withdraw Date"
              variant="filled"
              type="date"
              value={courseWithdrawDate}
              onChange={handleCourseWithdrawDateChange}
              InputLabelProps={{
                shrink: true,
              }}
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
              value={deliverableDueDate}
              onChange={handleDeliverableDueDateChange}
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
