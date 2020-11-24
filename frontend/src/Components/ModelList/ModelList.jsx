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
import AddIcon from "@material-ui/icons/Add";
import "./ModelList.scss";

const ModelList = (props) => {
  const { title, list, service, createItem, removeItem } = props;
  const [data, setData] = useState(list);
  useEffect(() => {
    setData(list);
  }, [list]);
  return (
    <Card id="model-list">
      <CardContent>
        <Typography variant="h6" component="h2">
          {title}
        </Typography>
        <List id={`${service}-list`} dense>
          {data.map((entry) => (
            <ListItem key={entry.id}>
              <ListItemText primary={entry.name} />
              <ListItemSecondaryAction>
                {service === "application" && (
                  <IconButton name="add-button" edge="end" aria-label="add">
                    <AddIcon
                      edge="end"
                      name="add-button"
                      aria-label="add"
                      onClick={() => {
                        createItem(service, entry);
                      }}
                    />
                  </IconButton>
                )}
                {service !== "application" && (
                  <IconButton name="edit-button" edge="end" aria-label="edit">
                    <EditIcon />
                  </IconButton>
                )}
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

export default ModelList;
