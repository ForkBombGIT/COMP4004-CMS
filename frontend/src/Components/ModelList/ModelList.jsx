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
import { MoreHoriz, Edit, Add, Delete } from "@material-ui/icons";
import "./ModelList.scss";

const ModelList = (props) => {
  const {
    title,
    list,
    service,
    createItem,
    editItem,
    removeItem,
    linkItem,
    registerItem,
    unRegisterItem,
    dataService,
  } = props;
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
                {createItem && (
                  <IconButton name="add-button" edge="end" aria-label="add">
                    <Add
                      edge="end"
                      name="add-button"
                      aria-label="add"
                      onClick={() => {
                        createItem(service, entry);
                      }}
                    />
                  </IconButton>
                )}
                {editItem && (
                  <IconButton
                    name="edit-button"
                    edge="end"
                    aria-label="edit"
                    onClick={() => {
                      editItem(service, entry);
                    }}
                  >
                    <Edit />
                  </IconButton>
                )}
                {removeItem && (
                  <IconButton
                    edge="end"
                    name="delete-button"
                    aria-label="delete"
                    onClick={() => {
                      removeItem(service, entry.id);
                    }}
                  >
                    <Delete />
                  </IconButton>
                )}
                {linkItem && (
                  <IconButton
                    name="link-button"
                    edge="end"
                    aria-label="edit"
                    onClick={() => {
                      linkItem(entry.id);
                    }}
                  >
                    <MoreHoriz />
                  </IconButton>
                )}
                {registerItem && (
                  <IconButton
                    name="register-button"
                    edge="end"
                    aria-label="register"
                    onClick={() => {
                      registerItem(dataService, entry.id);
                    }}
                  >
                    <Add />
                  </IconButton>
                )}
                {unRegisterItem && (
                  <IconButton
                    name="unregister-button"
                    edge="end"
                    aria-label="unregister"
                    onClick={() => {
                      unRegisterItem(dataService, entry.id);
                    }}
                  >
                    <Delete />
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

export default ModelList;
