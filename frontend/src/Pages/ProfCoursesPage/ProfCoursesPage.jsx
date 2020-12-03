import React, { useState, useEffect } from "react";
import { useParams, Route } from "react-router-dom";
import {
  CardContent,
  Container,
  Typography,
  Card,
  Divider,
} from "@material-ui/core/";
import {
  LogoutButton,
  NotFound,
  ModelList,
  ModelCreationForm,
  ModelDetailModal,
} from "Components";
import { notifySuccess, notifyFailure, subscribeToService } from "Utils/";
import { Client } from "Server";

import "./ProfCoursesPage.scss";

const ProfCoursesPage = () => {
  /* ------------------------------------ State setters --------------------------*/
  const { courseId } = useParams();
  const [courseData, setCourseData] = useState({
    name: "",
    time_slot: "",
    capacity: "",
  });
  const [dbInteraction, setDbInteraction] = useState(false);
  const [professor, setProfessor] = useState([]);
  const [deliverables, setDeliverables] = useState([]);
  const [displayModal, setDisplayModal] = useState(false);
  const [modalModel, setModalModel] = useState({});

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

  const removeItem = (s, id) => {
    if (!dbInteraction) {
      setDbInteraction(true);
      Client.service(s)
        .remove(id)
        .then(() => {
          setDbInteraction(false);
          notifySuccess("Successful Deletion");
        })
        .catch(() => {
          notifyFailure("Unsuccessful Creation");
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
  }, []);

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
              <LogoutButton />
            </CardContent>
            <Divider />
            <CardContent id="course-management">
              <ModelCreationForm
                title="Deliverable Creation Form"
                service="deliverable"
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

export default ProfCoursesPage;
