import React, { useState, useRef } from "react";
import { TextField, Button } from "@material-ui/core/";
import { notifySuccess, notifyFailure } from "Utils/";
import "./ModelUpdateForm.scss";
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

const ModelUpdateForm = (props) => {
  const { setDisplay, model, getListData } = props;
  const formRef = useRef();
  const [nameVal, setNameVal] = useState(model.name);
  const [emailVal, setEmailVal] = useState();
  const [birthVal, setBirthVal] = useState(
    model.service === "student" ? model.birth_date.split("T")[0] : null
  );

  const handleNameChange = (event) => {
    setNameVal(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmailVal(event.target.value);
  };

  const handleBirthChange = (event) => {
    setBirthVal(event.target.value);
  };

  const handleModelUpdate = (event) => {
    event.preventDefault();
    Client.service(model.service)
      .patch(model.id, createModel(model.service, nameVal, birthVal))
      .then(() => {
        notifySuccess("Successful Update!");
        setDisplay(false);
        getListData();
        setNameVal("");
        setBirthVal("");
        setEmailVal("");
        setCapVal(0);
        setTimeVal("");
        setStatusVal("");
      })
      .catch((e) => {
        notifyFailure("Unsuccessful Update!");
        // eslint-disable-next-line no-console
        console.log(e);
      });
  };

  return (
    <div id="creation-form">
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
        {model.service !== "course" && (
          <TextField
            id="modal-user-email"
            name="modal-email"
            label="Email"
            variant="filled"
            value={emailVal}
            onChange={handleEmailChange}
          />
        )}
        <Button variant="contained" name="update-button" type="submit">
          UPDATE
        </Button>
      </form>
    </div>
  );
};

export default ModelUpdateForm;
