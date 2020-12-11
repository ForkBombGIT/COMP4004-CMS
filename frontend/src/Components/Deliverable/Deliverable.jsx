import React, { useEffect, useState } from "react";
import { ListItem, ListItemText, TextField, Button } from "@material-ui/core/";
import { notifySuccess, notifyFailure } from "Utils/";
import { Client } from "Server";
import "./Deliverable.scss";

const Deliverable = (props) => {
  const { deliverable, studentId, professorId } = props;
  const [entry, setEntry] = useState(deliverable);
  const [deliverableText, setDeliverableText] = useState("");
  const [grade, setGrade] = useState("");
  const [submitsData, setSubmitsData] = useState(null);

  const handleTextAreaChange = (event) => {
    setDeliverableText(event.target.value);
  };

  const handleGradeChange = (event) => {
    setGrade(event.target.value);
  };

  const createDeliverable = () => ({
    studentId,
    deliverableId: entry.id,
    submission: deliverableText,
  });

  const createDeliverableGrade = () => ({
    studentId,
    deliverableId: entry.id,
    grade,
  });

  const handleGradeSubmit = (event) => {
    event.preventDefault();

    Client.service("submits")
      .create(createDeliverableGrade())
      .then(() => {
        notifySuccess("Success, deliverable grade submitted!");
      })
      .catch((e) => {
        notifyFailure(e.message);
      });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    Client.service("submits")
      .create(createDeliverable())
      .then(() => {
        notifySuccess("Success, deliverable submitted!");
      })
      .catch((e) => {
        notifyFailure(e.message);
      });
  };

  useEffect(() => {
    Client.service("submits")
      .find({
        query: {
          studentId,
          deliverableId: deliverable.id,
        },
      })
      .then((delivData) => {
        if (delivData.length) {
          setSubmitsData(delivData[0]);
          setDeliverableText(delivData[0].submission);
        } else {
          setSubmitsData(null);
        }
      });

    setEntry(deliverable);
  }, [deliverable]);

  const dateConv = (date) => {
    return date;
    // const convDate = date.split(" ");
    // const g = String(
    //   new Date(`${convDate[0]} ${convDate[1]}`).toLocaleString()
    // );
    // return g;
  };

  return (
    <ListItem class="deliverable-item" key={entry.id}>
      <div className="deliverable-text">
        <ListItemText primary={`Assignment Name: ${entry.name}`} />
        <ListItemText primary={`Assignment Weight: ${entry.weight}`} />
        <ListItemText
          primary={`Assignment Due Date: ${
            entry.due_date ? dateConv(entry.due_date) : "null"
          }`}
        />
        {!submitsData && <ListItemText primary="No submission" />}
        {submitsData && (
          <>
            <ListItemText primary="Assignment Submitted" />
            <ListItemText
              primary={`Assignment Grade: ${
                submitsData.grade ? submitsData.grade : "ungraded"
              }`}
            />
          </>
        )}
      </div>
      <div id="deliverable-text-area">
        <textarea
          value={deliverableText}
          onChange={handleTextAreaChange}
          rows={5}
          className="deliverable-text-area"
          readOnly={!!professorId}
        />
      </div>
      {!professorId && (
        <Button
          className="submit-button"
          variant="contained"
          name="submit-button"
          type="submit"
          onClick={handleSubmit}
        >
          SUBMIT
        </Button>
      )}
      {professorId && submitsData && (
        <div className="grade-submission">
          <TextField
            id="standard-number"
            label="Grade"
            value={grade}
            onChange={handleGradeChange}
            inputProps={{
              inputmode: "numeric",
              maxlength: "3",
              pattern: "^[1-9][0-9]?$|^100$",
            }}
          />
          <Button
            className="submit-button-grade"
            variant="contained"
            name="submit-button-grade"
            type="submit"
            onClick={handleGradeSubmit}
          >
            SUBMIT
          </Button>
        </div>
      )}
    </ListItem>
  );
};

export default Deliverable;
