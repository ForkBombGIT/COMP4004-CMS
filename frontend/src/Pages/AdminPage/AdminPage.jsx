import React, { useState, useEffect } from "react";
import {
  CardContent,
  Container,
  Typography,
  Card,
  Divider,
} from "@material-ui/core/";
import { ModelList, ModelCreationForm } from "Components";
import { Client } from "Server";
import "./AdminPage.scss";

const AdminPage = () => {
  const [students, setStudents] = useState([]);
  const [professors, setProfessors] = useState([]);
  const [administrators, setAdministrators] = useState([]);
  const [courses, setCourses] = useState([]);
  const [applications, setApplications] = useState([]);
  const [dbInteraction, setDbInteraction] = useState(false);
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

  useEffect(() => {
    getListData();
  }, []);

  return (
    <div id="content">
      <Container maxWidth="lg">
        <Card>
          <CardContent>
            <Typography variant="h5" component="h2">
              Model Management
            </Typography>
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
  );
};

export default AdminPage;
