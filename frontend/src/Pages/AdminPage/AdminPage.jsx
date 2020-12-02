import React, { useState, useEffect } from "react";
import {
  CardContent,
  Container,
  Typography,
  Card,
  Divider,
} from "@material-ui/core/";
import {
  ModelList,
  ModelCreationForm,
  LogoutButton,
  ModelDetailModal,
} from "Components";
import { notifySuccess, notifyFailure, subscribeToService } from "Utils/";
import { AdminCoursePage } from "Pages/";
import { Switch, Route, useRouteMatch, useHistory } from "react-router-dom";
import { Client } from "Server";
import "./AdminPage.scss";

const AdminPage = () => {
  const history = useHistory();
  const { path, url } = useRouteMatch();
  const [students, setStudents] = useState([]);
  const [professors, setProfessors] = useState([]);
  const [administrators, setAdministrators] = useState([]);
  const [courses, setCourses] = useState([]);
  const [applications, setApplications] = useState([]);
  const [dbInteraction, setDbInteraction] = useState(false);
  const [displayModal, setDisplayModal] = useState(false);
  const [modalModel, setModalModel] = useState({});

  const removeItem = (s, id) => {
    if (!dbInteraction) {
      setDbInteraction(true);
      Client.service(s)
        .remove(id)
        .then(() => {
          setDbInteraction(false);
          if (s !== "application") notifySuccess("Successful Deletion");
        })
        .catch(() => {
          notifyFailure("Unsuccessful Creation");
        });
    }
  };

  const editItem = (s, item) => {
    setDisplayModal(true);
    const modelForModal = item;
    modelForModal.service = s;
    setModalModel(modelForModal);
  };

  const createItem = (s, item) => {
    if (!dbInteraction) {
      setDbInteraction(true);
      const service = s === "application" ? "student" : s;
      Client.service(service)
        .create(item)
        .then(() => {
          if (s === "application") {
            removeItem(s, item.id);
          }
          notifySuccess("Successful Creation");
        })
        .catch(() => {
          notifyFailure("Unsuccessful Creation");
        })
        .finally(() => {
          setDbInteraction(false);
        });
    }
  };

  const linkItem = (id) => {
    history.push(`${url}/${id}`);
  };

  useEffect(() => {
    subscribeToService(
      ["student"],
      "student",
      (data) => {
        return data;
      },
      {},
      setStudents
    );
    subscribeToService(
      ["professor"],
      "professor",
      (data) => {
        return data;
      },
      {},
      setProfessors
    );
    subscribeToService(
      ["administrator"],
      "administrator",
      (data) => {
        return data;
      },
      {},
      setAdministrators
    );
    subscribeToService(
      ["application"],
      "application",
      (data) => {
        return data;
      },
      {},
      setApplications
    );
    subscribeToService(
      ["course"],
      "course",
      (data) => {
        return data;
      },
      {},
      setCourses
    );
  }, []);

  return (
    <Switch>
      <Route exact path={path}>
        <div id="content">
          <Container maxWidth="lg">
            <Card>
              <CardContent className="card-title">
                <Typography variant="h5" component="h2">
                  Model Management
                </Typography>
                <LogoutButton />
              </CardContent>
              <Divider />
              <CardContent id="user-management">
                <ModelCreationForm title="Model Creation Form" />
                <div id="lists">
                  <div>
                    <ModelList
                      title="Students"
                      service="student"
                      editItem={editItem}
                      removeItem={removeItem}
                      list={students}
                    />
                    <ModelList
                      title="Professors"
                      service="professor"
                      editItem={editItem}
                      removeItem={removeItem}
                      list={professors}
                    />
                    <ModelList
                      title="Administrators"
                      service="administrator"
                      editItem={editItem}
                      removeItem={removeItem}
                      list={administrators}
                    />
                  </div>
                  <div>
                    <ModelList
                      title="Courses"
                      service="course"
                      createItem={createItem}
                      editItem={editItem}
                      removeItem={removeItem}
                      linkItem={linkItem}
                      list={courses}
                    />
                    <ModelList
                      title="Student Applications"
                      service="application"
                      createItem={createItem}
                      removeItem={removeItem}
                      list={applications}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
            <ModelDetailModal
              display={displayModal}
              setDisplay={setDisplayModal}
              model={modalModel}
            />
          </Container>
        </div>
      </Route>
      <Route path={`${path}/:courseId`}>
        <AdminCoursePage />
      </Route>
    </Switch>
  );
};

export default AdminPage;
