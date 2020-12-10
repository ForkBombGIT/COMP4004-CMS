import React, { useState, useEffect } from "react";
import { paramsForServer } from "feathers-hooks-common";
import {
  CardContent,
  Container,
  Typography,
  Card,
  Divider,
} from "@material-ui/core/";
import {
  useParams,
  Switch,
  Route,
  useRouteMatch,
  useHistory,
} from "react-router-dom";
import { ProfStudentPage } from "Pages/";
import {
  LogoutButton,
  NotFound,
  ModelList,
  ModelCRUDForm,
  ModelDetailModal,
} from "Components";
import { notifySuccess, notifyFailure, subscribeToService } from "Utils/";
import { Client } from "Server";

import "./ProfCoursesPage.scss";

const ProfCoursesPage = () => {
  /* ------------------------------------ State setters --------------------------*/
  const { courseId } = useParams();
  const history = useHistory();
  const [courseData, setCourseData] = useState({
    name: "",
    time_slot: "",
    capacity: "",
  });
  const [dbInteraction, setDbInteraction] = useState(false);
  const [professor, setProfessor] = useState([]);
  const [deliverables, setDeliverables] = useState([]);
  const [displayModal, setDisplayModal] = useState(false);
  const [registeredStudents, setRegisteredStudents] = useState([]);
  const [modalModel, setModalModel] = useState({});
  const { path, url } = useRouteMatch();

  const linkItem = (id) => {
    history.push(`${url}/${id}`);
  };

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

  const removeUnRegistered = (data) => {
    return data.filter((student) => {
      return student.courses.reduce((acc, course) => {
        if (acc === true || courseId === course.enrolled.courseId) {
          return true;
        }
        return false;
      }, false);
    });
  };

  const editItem = (s, item) => {
    setDisplayModal(true);
    const modelForModal = item;
    modelForModal.service = s;
    setModalModel(modelForModal);
  };

  const removeItem = (s, id) => {
    if (!dbInteraction) {
      setDbInteraction(true);
      Client.service(s)
        .remove(id)
        .then(() => {
          setDbInteraction(false);
          notifySuccess("Successful Deletion!");
        })
        .catch(() => {
          notifyFailure("Unsuccessful Creation!");
        });
    }
  };

  /* ------------------------------------ Event listener setup --------------------------*/
  useEffect(() => {
    ["updated", "patched"].forEach((event) => {
      Client.service("course").on(event, () => {
        Client.service("course")
          .get(courseId)
          .then((data) => {
            setCourseData(data);
            setCurrentProfessor(data.professorId);
          })
          .catch(() => {
            setCourseData(null);
          });
      });
    });
    subscribeToService(
      ["deliverable"],
      "deliverable",
      (data) => {
        return data;
      },
      {
        query: {
          courseId,
        },
      },
      setDeliverables
    );
    subscribeToService(
      ["enrolled", "student"],
      "student",
      removeUnRegistered,
      paramsForServer({
        query: {},
        models: ["course"],
      }),
      setRegisteredStudents
    );
    /* ------------------------------------ Initial loading --------------------------*/
    Client.service("student")
      .find(
        paramsForServer({
          query: {},
          models: ["course"],
        })
      )
      .then((data) => {
        setRegisteredStudents(removeUnRegistered(data));
      });
    Client.service("course")
      .get(courseId)
      .then((data) => {
        setCourseData(data);
        setCurrentProfessor(data.professorId);
      })
      .catch(() => {
        setCourseData(null);
      });
  }, []);

  /* ------------------------------------ render--------------------------*/
  return (
    <Switch>
      <Route exact path={path}>
        <div id="content">
          {courseData ? (
            <Container maxWidth="lg">
              <Card>
                <CardContent id="header">
                  <Typography variant="h6" component="h2">
                    {`Course: ${courseData.name}`}
                  </Typography>
                  <Typography variant="h6" component="h2">
                    {`Time slot: ${courseData.time_slot}`}
                  </Typography>
                  <Typography variant="h6" component="h2">
                    {`Capacity: ${courseData.capacity}`}
                  </Typography>
                  <Typography variant="h6" component="h2">
                    {`Registered Professor: ${professor}`}
                  </Typography>
                  <LogoutButton />
                </CardContent>
                <Divider />
                <CardContent id="course-management">
                  <ModelCRUDForm
                    title="Deliverable Creation Form"
                    modelToUpdate={{
                      service: "deliverable",
                    }}
                    action="create"
                    relatedModelId={courseId}
                  />
                  <div>
                    <ModelList
                      title="Deliverables"
                      service="deliverable"
                      list={deliverables}
                      editItem={editItem}
                      removeItem={removeItem}
                    />
                    <ModelList
                      title="Registered Students"
                      service="registered-students"
                      list={registeredStudents}
                      linkItem={linkItem}
                    />
                  </div>
                </CardContent>
              </Card>
              <ModelDetailModal
                display={displayModal}
                setDisplay={setDisplayModal}
                model={modalModel}
                relatedModelId={courseId}
              />
            </Container>
          ) : (
            <Route component={NotFound} />
          )}
        </div>
      </Route>
      <Route path={`${path}/:studentId`}>
        <ProfStudentPage />
      </Route>
    </Switch>
  );
};

export default ProfCoursesPage;
