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
import {
  LogoutButton,
  NotFound,
  RegisterList,
  ModelCRUDForm,
  ModelList,
  ModelDetailModal,
} from "Components";
import { Client } from "Server";

import "./AdminCoursesPage.scss";

const AdminCoursePage = () => {
  /* ------------------------------------ State setters --------------------------*/
  const { courseId } = useParams();
  const [courseData, setCourseData] = useState({
    name: "",
    time_slot: "",
    capacity: "",
  });
  const [students, setStudents] = useState([]);
  const [prerequisites, setPrerequisites] = useState([]);
  const [registeredStudents, setRegisteredStudents] = useState([]);
  const [professors, setProfessors] = useState([]);
  const [professor, setProfessor] = useState([]);
  const [dbInteraction, setDbInteraction] = useState(false);
  const [displayModal, setDisplayModal] = useState(false);
  const [modalModel, setModalModel] = useState({});

  /* ------------------------------------ Remove Functions --------------------------*/
  const removeRegistered = (data) => {
    return data.filter((student) => {
      return !student.courses.reduce((acc, course) => {
        if (acc === true || courseId === course.enrolled.courseId) {
          return true;
        }
        return false;
      }, false);
    });
  };

  const removeItem = (s, id) => {
    if (!dbInteraction) {
      setDbInteraction(true);
      Client.service(s)
        .remove(id)
        .then(() => {
          setDbInteraction(false);
          if (s !== "application") notifySuccess("Successful Deletion!");
        })
        .catch(() => {
          notifyFailure("Unsuccessful Creation!");
        });
    }
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

  const removeCurrentProfessor = (data) => {
    return data.filter((prof) => {
      if (courseData.professorId === prof.id) {
        return false;
      }
      return true;
    });
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

  const editItem = (s, item) => {
    setDisplayModal(true);
    const modelForModal = item;
    modelForModal.service = s;
    setModalModel(modelForModal);
  };

  const registerProfessor = (service, id) => {
    if (courseData.professorId === null) {
      Client.service(service)
        .patch(courseData.id, { professorId: id })
        .then(() => {
          notifySuccess("Success, professor added!");
        })
        .catch((e) => {
          notifyFailure("Failed to add professor");
        });
    } else {
      notifyFailure(
        "Failure, Another Professor is already registered for this course!"
      );
    }
  };

  const registerStudent = (service, id) => {
    Client.service(service)
      .create({ courseId, studentId: id })
      .then(() => {
        notifySuccess("Success, student added!");
      })
      .catch(() => {
        notifyFailure("Failed to add student");
      });
  };

  const unRegisterStudent = (service, id) => {
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

  const unRegisterProfessor = () => {
    if (courseData.professorId !== null) {
      Client.service("course")
        .patch(courseData.id, { professorId: null })
        .then(() => {
          notifySuccess("Success, professor removed!");
        })
        .catch(() => {
          notifyFailure("Failed to remove professor");
        });
    } else {
      notifyFailure("Failure, no professor is registered in this course!");
    }
  };

  /* ------------------------------------ Evenet listener setup --------------------------*/
  useEffect(() => {
    ["removed", "updated", "patched"].forEach((event) => {
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
      ["course", "professor"],
      "professor",
      removeCurrentProfessor,
      {},
      setProfessors
    );
    subscribeToService(
      ["enrolled", "student"],
      "student",
      removeRegistered,
      paramsForServer({
        query: {},
        models: ["course"],
      }),
      setStudents
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
    subscribeToService(
      ["prerequisite"],
      "prerequisite",
      (data) => {
        return data;
      },
      {
        query: {
          courseId,
        },
      },
      setPrerequisites
    );
    /* ------------------------------------ Initial loading --------------------------*/
    Client.service("course")
      .get(courseId)
      .then((data) => {
        setCourseData(data);
        setCurrentProfessor(data.professorId);
      })
      .catch(() => {
        setCourseData(null);
      });

    Client.service("student")
      .find(
        paramsForServer({
          query: {},
          models: ["course"],
        })
      )
      .then((data) => {
        setStudents(removeRegistered(data));
      });

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
  }, []);

  useEffect(() => {
    Client.service("professor")
      .find({})
      .then((data) => {
        setProfessors(removeCurrentProfessor(data));
      });
  }, [courseData]);

  /* ------------------------------------ render--------------------------*/
  return (
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
              <Button
                id="unregister-professor-button"
                onClick={() => {
                  unRegisterProfessor();
                }}
              >
                Un-register Professor
              </Button>
              <LogoutButton />
            </CardContent>
            <Divider />
            <CardContent id="user-management">
              <ModelCRUDForm
                title="Prerequisite Creation Form"
                action="create"
                modelToUpdate={{
                  service: "prerequisite",
                }}
                relatedModelId={courseId}
              />
              <div id="lists" className="admin-course-lists">
                <div className="list-div">
                  <RegisterList
                    title="Students"
                    service="student"
                    manageRegister={registerStudent}
                    registerService="enrolled"
                    type="add"
                    list={students}
                  />
                  <RegisterList
                    title="Registered Students"
                    service="registered-student"
                    manageRegister={unRegisterStudent}
                    registerService="enrolled"
                    type="remove"
                    list={registeredStudents}
                  />
                  <RegisterList
                    title="Professors"
                    service="professor"
                    manageRegister={registerProfessor}
                    registerService="course"
                    type="add"
                    list={professors}
                  />
                </div>
                <div id="prereq-list" className="list-div">
                  <ModelList
                    title="Prerequisites"
                    service="prerequisite"
                    list={prerequisites}
                    removeItem={removeItem}
                    editItem={editItem}
                  />
                </div>
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
  );
};

export default AdminCoursePage;
