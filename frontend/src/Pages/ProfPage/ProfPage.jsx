import React, { useState, useEffect } from "react";
import {
  Container,
  Card,
  CardContent,
  Typography,
  Divider,
} from "@material-ui/core/";
import { LogoutButton, ModelList } from "Components";
import { Switch, Route, useRouteMatch, useHistory } from "react-router-dom";
import { ProfCoursesPage } from "Pages";
import { Client } from "Server";
import "./ProfPage.scss";

const ProfPage = () => {
  const history = useHistory();
  const [courses, setCourses] = useState([]);
  const { path, url } = useRouteMatch();

  const linkItem = (id) => {
    history.push(`${url}/${id}`);
  };

  const getListData = () => {
    Client.service("course")
      .find()
      .then((c) => {
        setCourses(c);
      });
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
                  Course Management
                </Typography>
                <LogoutButton />
              </CardContent>
              <Divider />
              <CardContent>
                <ModelList
                  title="Courses"
                  service="course"
                  linkItem={linkItem}
                  list={courses}
                />
              </CardContent>
            </Card>
          </Container>
        </div>
      </Route>
      <Route path={`${path}/:courseId`}>
        <ProfCoursesPage />
      </Route>
    </Switch>
  );
};

export default ProfPage;
