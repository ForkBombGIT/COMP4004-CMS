import React, { useState, useEffect } from "react";
import {
  CardContent,
  Container,
  Typography,
  Card,
  Divider,
} from "@material-ui/core/";
import { UserList, ModelCreationForm } from "Components";
import { Client } from "Server";
import "./AdminPage.scss";

const AdminPage = () => {
  const [students, setStudents] = useState([]);
  const [professors, setProfessors] = useState([]);
  const [administrators, setAdministrators] = useState([]);
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
              User Management
            </Typography>
          </CardContent>
          <Divider />
          <CardContent id="user-management">
            <ModelCreationForm
              title="User Creation Form"
              updateLists={getListData}
            />
            <UserList title="Students" service="student" list={students} />
            <UserList
              title="Professors"
              service="professor"
              list={professors}
            />
            <UserList
              title="Administrators"
              service="administrator"
              list={administrators}
            />
          </CardContent>
        </Card>
      </Container>
    </div>
  );
};

export default AdminPage;
