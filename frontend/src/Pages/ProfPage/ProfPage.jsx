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
import { subscribeToService } from "Utils/";
import { useAuth } from "Utils/RouterAuth";
import "./ProfPage.scss";

const ProfPage = () => {
  const auth = useAuth();
  const history = useHistory();
  const [courses, setCourses] = useState([]);
  const { path, url } = useRouteMatch();

  const linkItem = (id) => {
    history.push(`${url}/${id}`);
  };

  useEffect(() => {
    subscribeToService(
      ["course"],
      "course",
      (data) => {
        return data;
      },
      {
        query: {
          professorId: auth.user.professorId,
        },
      },
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
