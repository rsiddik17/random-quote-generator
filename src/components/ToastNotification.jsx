import React from "react";
import { Snackbar } from "@mui/material";

const ToastNotification = ({ open, message, onClose }) => {
  return (
    <Snackbar
      open={open}
      autoHideDuration={3000}
      message={message}
      onClose={onClose}
      anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
    />
  );
};

export default ToastNotification;