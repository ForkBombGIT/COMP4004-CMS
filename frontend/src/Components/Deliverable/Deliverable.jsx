import React, { useEffect, useState } from "react";
import useDeepCompareEffect from "use-deep-compare-effect";
import {
  ListItem,
  ListItemText,
  TextareaAutosize,
  Button,
} from "@material-ui/core/";
import { notifySuccess, notifyFailure } from "Utils/";
import { Client } from "Server";
import "./Deliverable.scss";

const Deliverable = (props) => {
  const { deliverable, studentId } = props;
  const [entry, setEntry] = useState(deliverable);
  const [deliverableText, setDeliverableText] = useState("");
  const [submitsData, setSubmitsData] = useState(null);

  const handleTextAreaChange = (event) => {
    setDeliverableText(event.target.value);
  };

  const createDeliverable = () => ({
    studentId,
    deliverableId: entry.id,
    submission: deliverableText,
  });

  const handleSubmit = (event) => {
    event.preventDefault();

    Client.service("submits")
      .create(createDeliverable())
      .then(() => {
        notifySuccess("Success, deliverable submitted!");
      })
      .catch(() => {
        notifyFailure("Failure, deliverable not submitted");
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
    const convDate = date.split(" ");
    const g = String(
      new Date(`${convDate[0]} ${convDate[1]}`).toLocaleString()
    );
    return g;
  };

  return (
    <ListItem class="deliverable-item" key={entry.id}>
      <div className="deliverable-text">
        <ListItemText primary={`Assignment Name: ${entry.name}`} />
        <ListItemText primary={`Assignment Weight: ${entry.weight}`} />
        <ListItemText
          primary={`Assignment Due_Date: ${
            entry.due_date ? dateConv(entry.due_date) : "null"
          }`}
        />
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
        <TextareaAutosize
          value={deliverableText}
          onChange={handleTextAreaChange}
          rowsMin={5}
          class="deliverable-text-area"
        />
      </div>
      <Button
        className="submit-button"
        variant="contained"
        name="submit-button"
        type="submit"
        onClick={handleSubmit}
      >
        SUBMIT
      </Button>
    </ListItem>
  );
};

export default Deliverable;
