import React, { useState, useEffect, useRef } from "react";
import {
  Typography,
  TextField,
  Select,
  MenuItem,
  Button,
  FormControl,
  InputLabel,
} from "@material-ui/core/";
import {
  notifySuccess,
  notifyFailure,
  createModel,
  subscribeToService,
} from "Utils/";
import { paramsForServer } from "feathers-hooks-common";
import "./ModelCRUDForm.scss";
import { Client } from "Server";

const ModelCRUDForm = (props) => {
  const { title, modelToUpdate, relatedModelId, action, setDisplay } = props;
  const formRef = useRef();
  const [possiblePrerequisites, setPossiblePrerequisites] = useState([]);
  const [model, setModel] = useState({
    id: modelToUpdate !== undefined ? modelToUpdate.id : "",
    service: modelToUpdate !== undefined ? modelToUpdate.service : "student",
    name: modelToUpdate !== undefined ? modelToUpdate.name : "",
    email: "",
    birth:
      // eslint-disable-next-line no-nested-ternary
      modelToUpdate !== undefined
        ? modelToUpdate.service === "student"
          ? modelToUpdate.birth_date.split("T")[0]
          : null
        : "",
    cap: modelToUpdate !== undefined ? modelToUpdate.capacity : 0,
    time: modelToUpdate !== undefined ? modelToUpdate.time_slot : "",
    status: modelToUpdate !== undefined ? modelToUpdate.status : "",
    courseRegistrationDate: "",
    courseWithdrawDate: "",
    due_date: modelToUpdate !== undefined ? modelToUpdate.due_date : "",
    weight: modelToUpdate !== undefined ? modelToUpdate.weight : "",
    relatedModelId,
    prerequisite_course_id:
      modelToUpdate !== undefined ? modelToUpdate.prerequisite_course_id : "",
  });

  const setModelVal = (key, value) => {
    const newModel = { ...model };
    newModel[key] = value;
    setModel(newModel);
  };

  const handleModelChange = (event) => {
    setModelVal(event.target.name, event.target.value);
  };

  const resetState = () => {
    setModel({
      service: model.service,
      name: "",
      email: "",
      birth: "",
      cap: 0,
      time: "",
      status: "",
      courseRegistrationDate: "",
      courseWithdrawDate: "",
      due_date: "",
      weight: 0,
      relatedModelId,
      prerequisite_course_id: "",
    });
    if (setDisplay !== undefined) setDisplay(false);
  };

  const createParams = () => {
    if (model.service === "course") {
      return paramsForServer({
        data: {
          courseRegistrationDate: model.courseRegistrationDate,
          courseWithdrawDate: model.courseWithdrawDate,
        },
      });
    }
    if (
      model.service !== "course" &&
      model.service !== "deliverable" &&
      model.service !== "prerequisite"
    ) {
      return paramsForServer({
        data: {
          email: model.email,
        },
      });
    }
    return null;
  };
  const handleModelCreation = (event) => {
    event.preventDefault();
    if (action === "create") {
      Client.service(model.service)
        .create(createModel(model), createParams())
        .then(() => {
          notifySuccess("Successful Creation!");
          resetState();
        })
        .catch(() => {
          notifyFailure("Unsuccessful Creation!");
        });
    } else if (action === "update") {
      Client.service(model.service)
        .patch(model.id, createModel(model), createParams())
        .then(() => {
          notifySuccess("Successful Update!");
          resetState();
        })
        .catch(() => {
          notifyFailure(`Unsuccessful Update!`);
        });
    }
  };

  const removeCurrentCourse = (data) => {
    return data.filter((course) => {
      if (model.relatedModelId === course.id) {
        return false;
      }
      return true;
    });
  };

  useEffect(() => {
    if (action === "update") {
      if (
        model.service !== "course" &&
        model.service !== "deliverable" &&
        model.service !== "prerequisite"
      ) {
        const query = {};
        query[`${model.service}Id`] = model.id;
        query.user_role = model.service;
        Client.service("loginCredential")
          .find({ query })
          .then((cred) => {
            setModelVal("email", cred[0].email);
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
            const newModel = { ...model };
            // eslint-disable-next-line no-plusplus
            for (let i = 0; i < deadlines.length; i++) {
              const deadlineType = deadlines[i].type;
              // eslint-disable-next-line prefer-destructuring
              newModel[
                `course${
                  deadlineType.charAt(0).toUpperCase() + deadlineType.slice(1)
                }Date`
              ] = deadlines[i].due_date.split("T")[0];
            }
            setModel(newModel);
          });
      }
    }

    if (model.service === "prerequisite") {
      subscribeToService(
        ["course"],
        "course",
        removeCurrentCourse,
        {},
        setPossiblePrerequisites
      );
    }
  }, []);

  return (
    <div id="creation-form">
      <Typography variant="h6" component="h2">
        {title}
      </Typography>
      <form ref={formRef} onSubmit={handleModelCreation}>
        {action === "create" &&
          model.service !== "deliverable" &&
          model.service !== "prerequisite" && (
            <FormControl variant="filled">
              <InputLabel>Model</InputLabel>
              <Select
                id={`${action}-model-select`}
                name="service"
                value={model.service}
                onChange={handleModelChange}
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
        {model.service !== "prerequisite" && (
          <TextField
            id={`${action}-name`}
            name="name"
            label="Name"
            variant="filled"
            value={model.name}
            onChange={handleModelChange}
          />
        )}
        {model.service === "student" && (
          <TextField
            id={`${action}-birth`}
            name="birth"
            label="Birthday"
            type="date"
            variant="filled"
            value={model.birth}
            onChange={handleModelChange}
            InputLabelProps={{
              shrink: true,
            }}
          />
        )}
        {model.service !== "course" &&
          model.service !== "deliverable" &&
          model.service !== "prerequisite" && (
            <TextField
              id={`${action}-email`}
              name="email"
              label="Email"
              variant="filled"
              value={model.email}
              onChange={handleModelChange}
            />
          )}
        {model.service === "course" && (
          <>
            <TextField
              id={`${action}-capacity`}
              name="cap"
              label="Capacity"
              variant="filled"
              type="number"
              InputProps={{ inputProps: { min: 0 } }}
              value={model.cap}
              onChange={handleModelChange}
            />
            <TextField
              id={`${action}-time`}
              name="time"
              label="Time"
              variant="filled"
              value={model.time}
              onChange={handleModelChange}
            />
            <TextField
              id={`${action}-course-registration-date`}
              name="courseRegistrationDate"
              label="Registration Date"
              variant="filled"
              type="date"
              value={model.courseRegistrationDate}
              onChange={handleModelChange}
              InputLabelProps={{
                shrink: true,
              }}
            />
            <TextField
              id={`${action}-course-withdraw-date`}
              name="courseWithdrawDate"
              label="Withdraw Date"
              variant="filled"
              type="date"
              value={model.courseWithdrawDate}
              onChange={handleModelChange}
              InputLabelProps={{
                shrink: true,
              }}
            />
            <FormControl
              style={action === "update" ? { width: "100%" } : {}}
              variant="filled"
            >
              <InputLabel>Status</InputLabel>
              <Select
                id={`${action}-course-status-select`}
                name="status"
                value={model.status}
                onChange={handleModelChange}
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
              id={`${action}-deliverable-weight`}
              name="weight"
              label="Weight"
              variant="filled"
              type="number"
              value={model.weight}
              onChange={handleModelChange}
            />
            <TextField
              id={`${action}-deliverable-due-date`}
              name="due"
              label="Due Date"
              variant="filled"
              value={model.deliverableDueDate}
              onChange={handleModelChange}
            />
          </>
        )}
        {model.service === "prerequisite" && (
          <FormControl variant="filled">
            <InputLabel>Prerequisite Course Name</InputLabel>
            <Select id={`${action}-name`} name="name" value={model.name}>
              {possiblePrerequisites.map((prereq) => (
                <MenuItem
                  key={prereq.name}
                  name={prereq.name}
                  value={prereq.name}
                  onClick={() => {
                    const newModel = { ...model };
                    newModel.name = prereq.name;
                    newModel.prerequisite_course_id = prereq.id;
                    setModel(newModel);
                  }}
                >
                  {prereq.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        )}
        <Button variant="contained" id={`${action}-button`} type="submit">
          {action}
        </Button>
      </form>
    </div>
  );
};

export default ModelCRUDForm;
