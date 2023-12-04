import { useEffect, useState } from "react";
import { Typography, Card, Stack, Grid, Switch, Divider, Box, Chip, TextField } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { CheckBox } from "@mui/icons-material";
import MUIDataTable from "mui-datatables";
import { connect } from "react-redux";
import { showAlert } from "../../actions/alert";
import { LoadingButton } from "@mui/lab";
import ViewUserPage from "../../pages/ViewUserPage";

import EditNoteIcon from "@mui/icons-material/EditNote";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { searchFiltercolor } from "../../constants";

const ViewUsersList = ({ showAlert, usersData }) => {
  useEffect(() => {}, []);

  const columns = [
    {
      label: "Select",
    },

    {
      label: "User Name",
    },
    {
      label: "User Id",
    },
    {
      label: "User Login Name",
    },
    {
      label: "Designation",
    },
    {
      label: "Mandal Name",
    },
    {
      label: "Division Name",
    },
    {
      label: "Sachivalyam Name",
    },
    {
      label: "Part/Booth No",
    },
    {
      label: "Village",
    },
    {
      label: "Phone",
    },
    {
      label: "Edit/Delete",
    },
  ];

  const options = {
    elevation: 0,
    selectableRows: "none",
    responsive: "standard",
  };

  const renderCheckBox = () => {
    return <CheckBox />;
  };

  const renderEditAndDelete = () => {
    return (
      <Box>
        <EditNoteIcon
          sx={{
            color: "#1976d2",
          }}
        />
        <DeleteForeverIcon
          sx={{
            color: "#f44336",
            marginLeft: "10px",
          }}
        />
      </Box>
    );
  };

  const filterChartData = usersData.map((item) => {
    return [renderCheckBox(), ...item, renderEditAndDelete()];
  });

  const getMuiTheme = () =>
    createTheme({
      components: {
        MUIDataTableHeadCell: {
          styleOverrides: {
            root: {
              backgroundColor: searchFiltercolor,
            },
          },
        },
      },
    });
  return (
    <Card elevation={1}>
      <Stack>
        <Divider />
        <ThemeProvider theme={getMuiTheme()}>
          <MUIDataTable title="Users List Table" columns={columns} data={filterChartData} options={options} />
        </ThemeProvider>
      </Stack>
    </Card>
  );
};

const mapStateToProps = (state) => {
  return {
    batches: state.common,
    students: state.management,
  };
};

export default connect(mapStateToProps, {
  showAlert,
})(ViewUsersList);
