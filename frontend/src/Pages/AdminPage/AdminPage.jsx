import React, { useState, useEffect } from "react";
import {
  CardContent,
  Container,
  Typography,
  Card,
  Divider,
} from "@material-ui/core/";
import { ModelList, ModelCreationForm, LogoutButton } from "Components";
import { AdminCoursePage } from "Pages/";
import { Switch, Route, useRouteMatch, useHistory } from "react-router-dom";
import { Client } from "Server";
import "./AdminPage.scss";

const AdminPage = () => {
  const [students, setStudents] = useState([]);
  const [professors, setProfessors] = useState([]);
  const [administrators, setAdministrators] = useState([]);
  const [courses, setCourses] = useState([]);
  const [applications, setApplications] = useState([]);
  const [dbInteraction, setDbInteraction] = useState(false);
  const history = useHistory();
  const { path, url } = useRouteMatch();

  const getListData = () => {
    Client.service("student")
      .find()
      .then((s) => {
        setStudents(s);
      });
    Client.service("professor")
      .find()
      .then((p) => {
        setProfessors(p);
      });
    Client.service("administrator")
      .find()
      .then((a) => {
        setAdministrators(a);
      });
    Client.service("course")
      .find()
      .then((c) => {
        setCourses(c);
      });
    Client.service("application")
      .find()
      .then((a) => {
        setApplications(a);
      });
  };

  const removeItem = (s, id) => {
    if (!dbInteraction) {
      setDbInteraction(true);
      Client.service(s)
        .remove(id)
        .then(() => {
          setDbInteraction(false);
          getListData();
        });
    }
  };

  const createItem = (s, item) => {
    if (!dbInteraction) {
      setDbInteraction(true);
      const service = s === "application" ? "student" : s;
      Client.service(service)
        .create(item)
        .then(() => {
          setDbInteraction(false);
          if (s === "application") {
            removeItem(s, item.id);
          } else {
            getListData();
          }
        });
    }
  };

  const linkItem = (id) => {
    history.push(`${url}/${id}`);
  };

  useEffect(() => {
    getListData();
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
                <ModelCreationForm
                  title="Model Creation Form"
                  updateLists={getListData}
                />
                <div id="lists">
                  <div>
                    <ModelList
                      title="Students"
                      service="student"
                      createItem={createItem}
                      removeItem={removeItem}
                      list={students}
                    />
                    <ModelList
                      title="Professors"
                      service="professor"
                      createItem={createItem}
                      removeItem={removeItem}
                      list={professors}
                    />
                    <ModelList
                      title="Administrators"
                      service="administrator"
                      createItem={createItem}
                      removeItem={removeItem}
                      list={administrators}
                    />
                  </div>
                  <div>
                    <ModelList
                      title="Courses"
                      service="course"
                      createItem={createItem}
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
