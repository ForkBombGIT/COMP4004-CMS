import React, { useEffect, useState } from "react";
import {
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  TextareaAutosize,
  Typography,
  Card,
  CardContent,
  Divider,
} from "@material-ui/core/";
import { Deliverable } from "Components/";
import { Client } from "Server";
import "./DeliverableList.scss";

const DeliverableList = (props) => {
  const { title, service, studentId, list, professorId } = props;
  const [data, setData] = useState(list);
  useEffect(() => {
    setData(list);
  }, [list]);

  return (
    <Card id="model-list" width={1}>
      <CardContent>
        <Typography variant="h6" component="h2">
          {title}
        </Typography>
        <List id={`${service}-list`} dense>
          {data.map((entry) => (
            <Deliverable
              studentId={studentId}
              professorId={professorId}
              deliverable={entry}
            />
          ))}
        </List>
      </CardContent>
    </Card>
  );
};

export default DeliverableList;
