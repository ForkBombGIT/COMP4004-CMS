import React, { useEffect, useState } from "react";
import { subscribeToService } from "Utils/";
import { Client } from "Server";
import "./Deadlines.scss";

const Deadlines = (props) => {
  const { courseId, status } = props;
  const [deadlines, setDeadlines] = useState([]);
  const [prerequisites, setPrerequisites] = useState([]);

  useEffect(() => {
    /* ------------------------------------ event listener setup -------------------------- */
    subscribeToService(
      ["academicDeadline"],
      "academicDeadline",
      (data) => data,
      {
        query: {
          courseId,
        },
      },
      setDeadlines
    );
    subscribeToService(
      ["prerequisite"],
      "prerequisite",
      (data) => data,
      {
        query: {
          courseId,
        },
      },
      setPrerequisites
    );
    /* ------------------------------------ Initial loading --------------------------*/
    Client.service("academicDeadline")
      .find({
        query: {
          courseId,
        },
      })
      .then((data) => {
        setDeadlines(data);
      })
      .catch((e) => {});
    Client.service("prerequisite")
      .find({
        query: {
          courseId,
        },
      })
      .then((data) => {
        setPrerequisites(data);
      })
      .catch((e) => {});
  }, []);

  return (
    <div className="deadlines">
      <div>
        <p className="course">{`course status: ${status}`}</p>
        {prerequisites.map((entry) => (
          <p className="prerequisite">{`prerequisite: ${entry.prerequisite_course_name}`}</p>
        ))}
        {deadlines.map((entry) => (
          <p className="deadline">
            {`${entry.type} due date: ${entry.due_date.toLocaleString()}`}
          </p>
        ))}
      </div>
    </div>
  );
};

export default Deadlines;
