import React from "react";
import { Modal, Typography, Card, CardContent } from "@material-ui/core/";
import { ModelCRUDForm } from "Components";
import "./ModelDetailModal.scss";

const ModelDetailModal = (props) => {
  const { display, setDisplay, model, relatedModelId } = props;

  const handleClose = () => {
    setDisplay(false);
  };
  return (
    <Modal id="model-modal" open={display} onClose={handleClose}>
      <Card>
        <CardContent>
          {display && (
            <div>
              <Typography variant="h5" component="h2">
                {`${
                  model.service.charAt(0).toUpperCase() + model.service.slice(1)
                } Details`}
              </Typography>
              <ModelCRUDForm
                setDisplay={setDisplay}
                modelToUpdate={model}
                relatedModelId={relatedModelId}
                action="update"
              />
            </div>
          )}
        </CardContent>
      </Card>
    </Modal>
  );
};

export default ModelDetailModal;
