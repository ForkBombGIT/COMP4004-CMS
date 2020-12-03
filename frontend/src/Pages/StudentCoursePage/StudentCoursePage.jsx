import React, { useState, useEffect } from "react";
import { paramsForServer } from "feathers-hooks-common";
import { useParams, Route } from "react-router-dom";
import {
  CardContent,
  Container,
  Typography,
  Card,
  Divider,
  Button,
} from "@material-ui/core/";
import { notifySuccess, notifyFailure, subscribeToService } from "Utils/";
import { DeliverableList, LogoutButton, NotFound, ModelList } from "Components";
import { useAuth } from "Utils/RouterAuth";
import { Client } from "Server";

import "./StudentCoursePage.scss";

const StudentCoursePage = () => {
  /* ------------------------------------ State setters --------------------------*/
  const auth = useAuth();
  const { courseId } = useParams();
  const [professor, setProfessor] = useState([]);
  const [deliverables, setDeliverables] = useState([]);
  const [courseData, setCourseData] = useState({
    name: "",
    time_slot: "",
    capacity: "",
  });

  /* ------------------------------------ Data manipulation functions --------------------------*/
  const setCurrentProfessor = (id) => {
    Client.service("professor")
      .get(id)
      .then((prof) => {
        setProfessor(prof.name);
      })
      .catch(() => {
        setProfessor("No professor");
      });
  };

  const setDeliverablesFromCourse = (data) => {
    setDeliverables(data[0].deliverables);
  };

  /* ------------------------------------ top level data setup --------------------------*/
  useEffect(() => {
    ["updated", "patched"].forEach((event) => {
      Client.service("student").on(event, () => {
        Client.service("student")
          .get(auth.user.studentId)
          .then((data) => {
            setCourseData(data.courses[0]);
            setCurrentProfessor(data.professorId);
          })
          .catch(() => {
            setCourseData(null);
          });
      });
    });
    Client.service("student")
      .get(
        auth.user.studentId,
        paramsForServer({
          models: ["courseWithQuery"],
          data: courseId,
        })
      )
      .then((data) => {
        setCourseData(data.courses[0]);
        setCurrentProfessor(data.professorId);
      })
      .catch(() => {
        setCourseData(null);
      });
    /* ------------------------------------ event listener setup -------------------------- */
    subscribeToService(
      ["submits", "deliverable"],
      "course",
      (data) => data,
      paramsForServer({
        query: {
          id: courseId,
        },
        models: ["deliverable"],
      }),
      setDeliverablesFromCourse
    );
    /* ------------------------------------ Initial loading --------------------------*/
    Client.service("course")
      .find(
        paramsForServer({
          query: {
            id: courseId,
          },
          models: ["deliverable"],
        })
      )
      .then((data) => {
        setDeliverablesFromCourse(data);
      });
  }, []);

  /* ------------------------------------ render--------------------------*/
  return (
    <div id="content-student-course-page">
      {courseData && courseData.enrolled ? (
        <Container maxWidth="lg">
          <Card>
            <CardContent id="card-title">
              <Typography variant="subtitle2" component="h2">
                {`Course: ${courseData.name}`}
              </Typography>
              <Typography variant="subtitle2" component="h2">
                {`Time slot: ${courseData.time_slot}`}
              </Typography>
              <Typography variant="subtitle2" component="h2">
                {`Capacity: ${courseData.capacity}`}
              </Typography>
              <Typography variant="subtitle2" component="h2">
                {`Registered Professor: ${professor}`}
              </Typography>
              <Typography variant="subtitle2" component="h2">
                {`Course Grade: ${courseData.enrolled.grade}`}
              </Typography>
              <LogoutButton />
            </CardContent>
            <Divider />
            <CardContent id="list-management">
              <div id="lists">
                <DeliverableList
                  title="Deliverable List"
                  service="deliverable"
                  studentId={auth.user.studentId}
                  list={deliverables}
                />
              </div>
            </CardContent>
          </Card>
        </Container>
      ) : (
        <Route component={NotFound} />
      )}
    </div>
  );
};

export default StudentCoursePage;
