import React, { useState, useEffect } from "react";
import { paramsForServer } from "feathers-hooks-common";
import {
  Divider,
  CardContent,
  Container,
  Typography,
  Card,
} from "@material-ui/core/";
import { StudentCoursePage } from "Pages/";
import { Switch, Route, useRouteMatch, useHistory } from "react-router-dom";
import { ModelList, LogoutButton } from "Components";
import { Client } from "Server";
import { useAuth } from "Utils/RouterAuth";
import { notifySuccess, notifyFailure, subscribeToService } from "Utils/";
import "./StudentPage.scss";

const StudentPage = () => {
  const history = useHistory();
  const { path, url } = useRouteMatch();
  const [courses, setCourses] = useState([]);
  const [registeredCourses, setRegisteredCourses] = useState([]);
  const auth = useAuth();
  const courseId = "1";

  const linkItem = (id) => {
    history.push(`${url}/${id}`);
  };

  const removeRegistered = (data) => {
    return data.filter((course) => {
      return !course.students.reduce((acc, student) => {
        if (
          acc === true ||
          auth.user.studentId === student.enrolled.studentId
        ) {
          return true;
        }
        return false;
      }, false);
    });
  };

  const removeUnRegistered = (data) => {
    return data.filter((course) => {
      return course.students.reduce((acc, student) => {
        if (
          acc === true ||
          auth.user.studentId === student.enrolled.studentId
        ) {
          return true;
        }
        return false;
      }, false);
    });
  };

  /* ---------- Set Data Functions ------------- */
  const registerCourse = (service, id) => {
    Client.service(service)
      .create({ courseId, studentId: id })
      .then(() => {
        notifySuccess("Success, student added!");
      })
      .catch(() => {
        notifyFailure("Failed to add student");
      });
  };

  const unRegisterCourse = (service, id) => {
    Client.service(service)
      .remove(null, {
        query: { courseId, studentId: id },
      })
      .then(() => {
        notifySuccess("Success, student removed!");
      })
      .catch(() => {
        notifyFailure("Failed to remove student");
      });
  };

  useEffect(() => {
    subscribeToService(
      ["enrolled", "course"],
      "course",
      removeRegistered,
      paramsForServer({
        query: {},
        models: ["student"],
      }),
      setCourses
    );
    subscribeToService(
      ["enrolled", "course"],
      "course",
      removeUnRegistered,
      paramsForServer({
        query: {},
        models: ["student"],
      }),
      setRegisteredCourses
    );
    Client.service("course")
      .find(
        paramsForServer({
          query: {},
          models: ["student"],
        })
      )
      .then((data) => {
        setCourses(removeRegistered(data));
      });

    Client.service("course")
      .find(
        paramsForServer({
          query: {},
          models: ["student"],
        })
      )
      .then((data) => {
        setRegisteredCourses(removeUnRegistered(data));
      });
  }, []);

  return (
    <Switch>
      <Route exact path={path}>
        <div id="content-student-page">
          <Container maxWidth="lg">
            <Card>
              <CardContent id="card-title">
                <Typography variant="h5" component="h2">
                  Student Homepage
                </Typography>
                <LogoutButton />
              </CardContent>
              <Divider />
              <CardContent>
                <div id="lists">
                  <ModelList
                    title="Courses"
                    service="course"
                    registerItem={registerCourse}
                    list={courses}
                    dataService="enrolled"
                  />
                  <ModelList
                    title="My Courses"
                    service="registered-course"
                    unRegisterItem={unRegisterCourse}
                    linkItem={linkItem}
                    list={registeredCourses}
                    dataService="enrolled"
                  />
                </div>
              </CardContent>
            </Card>
          </Container>
        </div>
      </Route>
      <Route path={`${path}/:courseId`}>
        <StudentCoursePage />
      </Route>
    </Switch>
  );
};

export default StudentPage;
