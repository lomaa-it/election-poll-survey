import React, { createContext, useContext, useState } from "react";
import { Snackbar, Alert, Typography, Slide, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button, List, ListItem, Backdrop, CircularProgress } from "@mui/material";

function TransitionUp(props) {
  return <Slide {...props} direction="left" />;
}

const AlertContext = createContext();

export const useAlertContext = () => {
  const context = useContext(AlertContext);
  if (!context) {
    throw new Error("useAlertContext must be used within a AlertProvider");
  }

  return context;
};

export const AlertProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarColor, setSnackbarColor] = useState("success");

  const [alertDialogOpen, setAlertDialogOpen] = useState(false);
  const [alertDialogTitle, setAlertDialogTitle] = useState("");
  const [alertDialogDescription, setAlertDialogDescription] = useState("");
  const [alertDialogAgreeCallback, setAlertDialogAgreeCallback] = useState(null);

  const showLoading = () => {
    setLoading(true);
  };

  const hideLoading = () => {
    setLoading(false);
  };

  const showSnackbar = (message, color = "success") => {
    setSnackbarMessage(message);
    setSnackbarColor(color);
    setSnackbarOpen(true);
  };

  const handleCloseSnackbar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setSnackbarOpen(false);
  };

  const showAlertDialog = ({ title = "Are you sure ?", description = "", agreeCallback = null }) => {
    setAlertDialogTitle(title);
    setAlertDialogDescription(description);
    setAlertDialogAgreeCallback(() => agreeCallback);
    setAlertDialogOpen(true);
  };

  const handleCloseAlertDialog = (result) => {
    setAlertDialogOpen(false);

    if (result === "yes" && typeof alertDialogAgreeCallback === "function") {
      alertDialogAgreeCallback();
    }
  };

  return (
    <AlertContext.Provider value={{ showLoading, hideLoading, showSnackbar, showAlertDialog }}>
      {children}

      <Backdrop open={loading} sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        <CircularProgress color="inherit" />
      </Backdrop>

      <Snackbar anchorOrigin={{ vertical: "top", horizontal: "right" }} open={snackbarOpen} autoHideDuration={3000} TransitionComponent={TransitionUp} onClose={handleCloseSnackbar}>
        <Alert severity={snackbarColor} sx={{ width: "100%", margin: "0px 20px" }} onClose={handleCloseSnackbar}>
          <Typography variant="body1">{snackbarMessage}</Typography>
        </Alert>
      </Snackbar>

      <Dialog
        open={alertDialogOpen}
        maxWidth="xs"
        fullWidth
        PaperProps={{
          elevation: 0,
        }}
      >
        <DialogTitle>{alertDialogTitle}</DialogTitle>

        <DialogContent>
          <DialogContentText>{alertDialogDescription}</DialogContentText>
        </DialogContent>

        <DialogActions>
          <Button color="secondary" onClick={() => handleCloseAlertDialog("no")}>
            No
          </Button>

          <Button color="secondary" onClick={() => handleCloseAlertDialog("yes")} autoFocus>
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </AlertContext.Provider>
  );
};
