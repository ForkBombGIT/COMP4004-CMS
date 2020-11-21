import React from 'react'
import { Snackbar } from "@material-ui/core/";

const SnackBar = (props) => {
  const { openSnack, setOpenSnack, message } = props;
  return (
    <Snackbar
      open={openSnack}
      autoHideDuration={3000}
      name="snackbar"
      onClose={() => setOpenSnack(false)}
      message={<span id="message-id">{message}</span>}
    />
  );
}

export default SnackBar;
