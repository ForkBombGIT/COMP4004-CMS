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
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import "./UserList.scss";

const UserList = (props) => {
  const { title, list, service, removeItem } = props;
  const [data, setData] = useState(list);
  useEffect(() => {
    setData(list);
  }, [list]);
  return (
    <Card id="user-list">
      <CardContent>
        <Typography variant="h6" component="h2">
          {title}
        </Typography>
        <List id={`${service}-list`} dense>
          {data.map((entry) => (
            <ListItem key={entry.id}>
              <ListItemText primary={entry.name} />
              <ListItemSecondaryAction>
                <IconButton name="edit-button" edge="end" aria-label="edit">
                  <EditIcon />
                </IconButton>
                <IconButton
                  edge="end"
                  name="delete-button"
                  aria-label="delete"
                  onClick={() => {
                    removeItem(service, entry.id);
                  }}
                >
                  <DeleteIcon />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          ))}
        </List>
      </CardContent>
    </Card>
  );
};

export default UserList;
