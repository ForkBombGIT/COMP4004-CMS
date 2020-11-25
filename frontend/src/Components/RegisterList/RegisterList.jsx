import React, { useState, useEffect } from "react";
import {
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Typography,
  Card,
  CardContent,
} from "@material-ui/core/";
import { Add, Remove } from "@material-ui/icons";
import "./RegisterList.scss";

const RegisterList = (props) => {
  const { title, list, service, type, registerService, manageRegister } = props;
  const [data, setData] = useState(list);
  useEffect(() => {
    setData(list);
  }, [list]);
  return (
    <Card id="register-list">
      <CardContent>
        <Typography variant="h6" component="h2">
          {title}
        </Typography>
        <List id={`${service}-list`} dense>
          {data.map((entry) => (
            <ListItem key={entry.id}>
              <ListItemText primary={entry.name} />
              <ListItemSecondaryAction>
                {type === "add" ? (
                  <IconButton
                    name="add-button"
                    edge="end"
                    aria-label="edit"
                    onClick={() => {
                      manageRegister(registerService, entry.id);
                    }}
                  >
                    <Add />
                  </IconButton>
                ) : (
                  <IconButton
                    name="remove-button"
                    edge="end"
                    aria-label="edit"
                    onClick={() => {
                      manageRegister(registerService, entry.id);
                    }}
                  >
                    <Remove />
                  </IconButton>
                )}
              </ListItemSecondaryAction>
            </ListItem>
          ))}
        </List>
      </CardContent>
    </Card>
  );
};

export default RegisterList;
