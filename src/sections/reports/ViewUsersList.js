import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Typography, Card, Stack, Grid, Switch, Divider, Box, Chip, TextField, Button, CircularProgress, Checkbox, IconButton } from "@mui/material";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { connect } from "react-redux";
import { showAlert } from "../../actions/alert";
import { checkOrUncheckUser, clearUserReducer, deleteUserInRedux } from "../../actions/user";
import EditNoteIcon from "@mui/icons-material/EditNote";
import { LoadingButton } from "@mui/lab";
import instance from "../../utils/axios";
import { deleteUserById, sendCredsToUsersRoute } from "../../utils/apis";

// pop up

import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import CustomMuiDataTable from "../../components/CustomMuiDataTable";

//

const ViewUsersList = ({ user, showAlert, checkOrUncheckUser, deleteUserInRedux, clearUserReducer, account }) => {
  const navigate = useNavigate();

  const [isLoading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [deleteUserPk, setDeleteUserPk] = useState(null);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const columns = [
    {
      name: "is_first_login",
      label: "Is First",
      options: {
        display: false,
      },
    },
    {
      name: "isCheck",
      label: "Select",
      options: {
        customBodyRender: (value, tableMeta, updateValue) => {
          var data = tableMeta.rowData;
          return data[0] ? <Checkbox checked={value ?? false} onChange={(e) => checkOrUncheckUser(data[2], e.target.checked)} /> : null;
        },
      },
    },
    {
      name: "user_pk",
      label: "User Id",
    },
    {
      name: "username",
      label: "Username",
    },
    { name: "user_displayname", label: "Full Name" },
    { name: "lookup_valuename", label: "Designation" },
    {
      name: "mandal_name",
      label: "Mandal Name",
      options: {
        customBodyRender: (value, tableMeta, updateValue) => {
          return value ?? "-";
        },
      },
    },
    {
      name: "division_name",
      label: "Division Name",
      options: {
        customBodyRender: (value, tableMeta, updateValue) => {
          return value ?? "-";
        },
      },
    },
    {
      name: "sachivalayam_name",
      label: "Sachivalyam Name",
      options: {
        customBodyRender: (value, tableMeta, updateValue) => {
          return value ?? "-";
        },
      },
    },
    {
      name: "part_no",
      label: "Part/Booth No",
      options: {
        customBodyRender: (value, tableMeta, updateValue) => {
          return value ?? "-";
        },
      },
    },
    {
      name: "village_name",
      label: "Village",
      options: {
        customBodyRender: (value, tableMeta, updateValue) => {
          return value ?? "-";
        },
      },
    },
    { name: "phone_no", label: "Phone" },
    {
      name: "user_pk",
      label: "Action",
      options: {
        customBodyRender: (value, tableMeta, updateValue) => {
          console.log("tableMeta", tableMeta.rowData);
          return (
            <Box
              sx={{
                display: "flex",
              }}
            >
              <>
                <IconButton color="primary" onClick={() => handleEdit(value)}>
                  <EditNoteIcon />
                </IconButton>
                <>
                  {tableMeta.rowData[5] !== "MLA" ? (
                    <IconButton
                      color="error"
                      onClick={() => {
                        setDeleteUserPk(value);
                        handleClickOpen();
                      }}
                    >
                      <DeleteForeverIcon />
                    </IconButton>
                  ) : null}

                  <Dialog
                    sx={{
                      opacity: 0.7,
                    }}
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                  >
                    <DialogTitle id="alert-dialog-title">{"Are You Sure you want to Delete This User?"}</DialogTitle>
                    <DialogContent>
                      <DialogContentText id="alert-dialog-description">
                        {user.data.map((item) => {
                          if (deleteUserPk === item.user_pk) {
                            return (
                              <>
                                <Typography
                                  sx={{
                                    display: "flex",
                                  }}
                                >
                                  <Typography
                                    sx={{
                                      fontWeight: "bold",
                                    }}
                                  >
                                    User ID:{" "}
                                  </Typography>
                                  {item.user_pk}
                                </Typography>
                                <Typography
                                  sx={{
                                    display: "flex",
                                  }}
                                >
                                  <Typography
                                    sx={{
                                      fontWeight: "bold",
                                    }}
                                  >
                                    Name:
                                  </Typography>
                                  {item.user_displayname}
                                </Typography>
                                <Typography
                                  sx={{
                                    display: "flex",
                                  }}
                                >
                                  <Typography
                                    sx={{
                                      fontWeight: "bold",
                                    }}
                                  >
                                    Designation:
                                  </Typography>
                                  {item.designation_name}
                                </Typography>
                              </>
                            );
                          }

                          return null;
                        })}
                      </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                      {/* <Button onClick={handleClose}>Disagree</Button> */}
                      <LoadingButton
                        variant="outlined"
                        sx={{
                          color: "red",
                          borderColor: "red",
                        }}
                        onClick={handleClose}
                      >
                        Cancel
                      </LoadingButton>

                      {/* <Button onClick={handleDelete} autoFocus>

                        Agree
                      </Button> */}
                      <LoadingButton loading={isLoading} variant="outlined" onClick={handleDelete}>
                        Delete
                      </LoadingButton>
                    </DialogActions>
                  </Dialog>
                </>
              </>
            </Box>
          );
        },
      },
    },
  ];

  const options = {
    elevation: 0,
    selectableRows: "none",
    responsive: "standard",
    ...(account.user?.desgination_name != "MLA" && {
      filter: false,
      search: false,
      download: false,
      print: false,
      viewColumns: false,
    }),
  };

  const handleEdit = (id) => {
    var index = user.data.findIndex((e) => e.user_pk == id);
    if (index != -1) {
      navigate("/user-management/user-registration", {
        state: { userData: user.data[index] },
      });
    }
  };
  console.log("account", account);

  const handleDelete = async () => {
    try {
      setLoading(true);
      console.log(deleteUserPk);
      // var index = user.data.findIndex((e) => e.user_pk == deleteUserPk);

      const response = await instance.delete(`${deleteUserById + deleteUserPk}`);
      console.log(response);
      showAlert({ text: "User Deleted Successfully", color: "success" });
      deleteUserInRedux(deleteUserPk, user);
      setLoading(false);
    } catch (error) {
      console.error(error);
      showAlert({ text: "Failed to delete user", color: "danger" });
      setLoading(false);
    } finally {
      handleClose();
    }
  };

  const handleSubmit = async () => {
    var userList = user.data
      .filter((e) => e.isCheck == true)
      .map((e) => ({
        user_pk: e.user_pk,
        user_displayname: e.user_displayname,
        phone_no: e.username,
      }));
    if (userList.length <= 0) {
      showAlert({ text: "No user selected" });
      return;
    }

    setLoading(true);
    try {
      var jsonData = {
        usersList: userList,
      };

      await instance.post(sendCredsToUsersRoute, jsonData);

      clearUserReducer();
      showAlert({
        text: "Login credientials send successfully",
        color: "success",
      });
      setLoading(false);
    } catch (error) {
      console.error(error);
      showAlert({ text: "Something went wrong" });
      setLoading(false);
    }
  };

  return (
    <Card elevation={1}>
      {user.isLoading && (
        <Box minHeight={200} display="flex" justifyContent="center" alignItems="center">
          <CircularProgress />
        </Box>
      )}

      {!user.isLoading && (
        <>
          <Box p={4}>
            <Typography variant="body1" sx={{ mb: 2 }}>
              {user.data.filter((e) => e.isCheck == true).length} users selected
            </Typography>

            <Grid container spacing={2} alignItems="center">
              <Grid item xs={12} md={6} lg={6}>
                <LoadingButton loading={isLoading} variant="outlined" onClick={handleSubmit}>
                  Send Login Credentials
                </LoadingButton>
              </Grid>
            </Grid>
          </Box>

          <Divider />

          <CustomMuiDataTable title="Users List" columns={columns} data={user.data} options={options} />
        </>
      )}
    </Card>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.user,
    account: state.auth,
  };
};

export default connect(mapStateToProps, {
  showAlert,
  checkOrUncheckUser,
  deleteUserInRedux,
  clearUserReducer,
})(ViewUsersList);
