import React, { useState, useEffect } from "react";
import {
  Container,
  Card,
  CardContent,
  Typography,
  Divider,
  Button,
  TextField,
} from "@material-ui/core/";
import { DeliverableList, NotFound, LogoutButton, ModelList } from "Components";
import {
  useParams,
  Switch,
  Route,
  useRouteMatch,
  useHistory,
} from "react-router-dom";
import { notifySuccess, notifyFailure, subscribeToService } from "Utils/";
import { Client } from "Server";
import { paramsForServer } from "feathers-hooks-common";
import { useAuth } from "Utils/RouterAuth";
import "./ProfStudentPage.scss";

const ProfStudentPage = () => {
  const { courseId, studentId } = useParams();
  const auth = useAuth();
  const [deliverables, setDeliverables] = useState([]);
  const [grade, setGrade] = useState("");
  const [courseData, setCourseData] = useState({
    name: "",
    time_slot: "",
    capacity: "",
  });

  /* --------------- Grade submission ---------- */

  const handleGradeChange = (event) => {
    setGrade(event.target.value);
  };

  const createStudentGrade = () => ({
    studentId,
    courseId,
    grade,
    status: "complete",
  });

  const handleGradeSubmit = (event) => {
    event.preventDefault();

    Client.service("enrolled")
      .patch(null, createStudentGrade(), {
        query: {
          studentId,
          courseId,
        },
      })
      .then(() => {
        notifySuccess("Success, course grade submitted!");
      })
      .catch((e) => {
        notifyFailure(e.message);
      });
  };

  /* ------------ Transformation functions --------- */
  const setDeliverablesFromCourse = (data) => {
    setDeliverables(data[0].deliverables);
  };

  useEffect(() => {
    /* ----- inital data for render setup ----*/
    ["course", "enrolled", "student"].forEach((serviceListen) => {
      ["removed", "updated", "patched"].forEach((event) => {
        Client.service(serviceListen).on(event, () => {
          Client.service("student")
            .get(
              studentId,
              paramsForServer({
                models: ["courseWithQuery"],
                data: courseId,
              })
            )
            .then((data) => {
              setCourseData(data.courses[0]);
            })
            .catch(() => {
              setCourseData(null);
            });
        });
      });
    });
    Client.service("student")
      .get(
        studentId,
        paramsForServer({
          models: ["courseWithQuery"],
          data: courseId,
        })
      )
      .then((data) => {
        setCourseData(data.courses[0]);
      })
      .catch(() => {
        setCourseData(null);
      });
    /* ------------- inital data setup----------*/
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
    /* - subscriber creation (event listeners) -*/
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
  }, []);

  return (
    <div id="content-prof-student-page">
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
                {`Course Grade: ${courseData.enrolled.grade}`}
              </Typography>
              {auth.user.professorId && (
                <div className="course-grade-submission">
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
              <Typography variant="subtitle2" component="h2">
                {`Student status: ${courseData.enrolled.status}`}
              </Typography>
              <LogoutButton />
            </CardContent>
            <Divider />
            <CardContent id="list-management">
              <div id="lists">
                <DeliverableList
                  title="Deliverable List"
                  service="deliverable"
                  studentId={studentId}
                  list={deliverables}
                  professorId={auth.user.professorId}
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

export default ProfStudentPage;
