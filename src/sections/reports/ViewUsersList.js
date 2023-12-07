import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Typography, Card, Stack, Grid, Switch, Divider, Box, Chip, TextField, Button, CircularProgress, Checkbox, IconButton } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import MUIDataTable from "mui-datatables";
import { connect } from "react-redux";
import { showAlert } from "../../actions/alert";
import { getMuiTableTheme } from "../../constants";
import { checkOrUncheckUser } from "../../actions/user";
import EditNoteIcon from "@mui/icons-material/EditNote";

const ViewUsersList = ({ user, showAlert, checkOrUncheckUser }) => {
  const navigate = useNavigate();

  useEffect(() => {}, []);

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
          return data[0] ? <Checkbox checked={value} onChanged={(e) => checkOrUncheckUser(e, data[3])} /> : null;
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
    { name: "part_no", label: "Part/Booth No" },
    { name: "village_name", label: "Village" },
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

  return (
    <Card elevation={1}>
      {user.isLoading && (
        <Box minHeight={200} display="flex" justifyContent="center" alignItems="center">
          <CircularProgress />
        </Box>
      )}

      {!user.isLoading && (
        <ThemeProvider theme={getMuiTableTheme()}>
          <MUIDataTable title="Users List" columns={columns} data={user.data} options={options} />
        </ThemeProvider>
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
})(ViewUsersList);
