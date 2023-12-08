import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Typography, Card, Stack, Grid, Switch, Divider, Box, Chip, TextField, Button, CircularProgress, Checkbox, IconButton } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import MUIDataTable from "mui-datatables";
import { connect } from "react-redux";
import { showAlert } from "../../actions/alert";
import { getMuiTableTheme } from "../../constants";
import { checkOrUncheckUser, clearUserReducer } from "../../actions/user";
import EditNoteIcon from "@mui/icons-material/EditNote";
import { LoadingButton } from "@mui/lab";
import instance from "../../utils/axios";
import { sendCredsToUsersRoute } from "../../utils/apis";

const ViewUsersList = ({ user, showAlert, checkOrUncheckUser, clearUserReducer }) => {
  const navigate = useNavigate();

  const [isLoading, setLoading] = useState(false);

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
    { name: "user_displayname", label: "User Name" },
    { name: "lookup_valuename", label: "Designation" },
    { name: "mandal_name", label: "Mandal Name" },
    { name: "division_name", label: "Division Name" },
    { name: "sachivalayam_name", label: "Sachivalyam Name" },
    {
      name: "parts",
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
          return (
            <IconButton color="primary" onClick={() => handleEdit(value)}>
              <EditNoteIcon />
            </IconButton>
          );
        },
      },
    },
  ];

  const options = {
    elevation: 0,
    selectableRows: "none",
    responsive: "standard",
  };

  const handleEdit = (id) => {
    var index = user.data.findIndex((e) => e.user_pk == id);
    if (index != -1) {
      navigate("/user-management/user-registration", {
        state: { userData: user.data[index] },
      });
    }
  };

  const handleSubmit = async () => {
    var userList = user.data.filter((e) => e.isCheck == true).map((e) => ({ user_pk: e.user_pk, user_displayname: e.user_displayname, phone_no: e.phone_no }));
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
      showAlert({ text: "Login credientials successfully", color: "success" });
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

          <ThemeProvider theme={getMuiTableTheme()}>
            <MUIDataTable title="Users List" columns={columns} data={user.data} options={options} />
          </ThemeProvider>
        </>
      )}
    </Card>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};

export default connect(mapStateToProps, {
  showAlert,
  checkOrUncheckUser,
  clearUserReducer,
})(ViewUsersList);
