import { useEffect, useState } from "react";
import { Typography, Card, Stack, Grid, Switch, Divider, Box, Chip, TextField, CircularProgress } from "@mui/material";
import { CheckBox } from "@mui/icons-material";
import MUIDataTable from "mui-datatables";
import { connect } from "react-redux";
import { showAlert } from "../../actions/alert";
import { LoadingButton } from "@mui/lab";
import EditNoteIcon from "@mui/icons-material/EditNote";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { ROWS_PER_PAGE_OPTION, getMuiTableTheme, searchFiltercolor } from "../../constants";
import { getAllVotersSurvey } from "../../actions/voter";

const ViewVotersList = ({ voter, filterValues, showAlert, getAllVotersSurvey }) => {
  const columns = [
    { name: "voter_id", label: "Voter ID" },
    {
      name: "part_slno",
      label: "Part Slno",
    },
    {
      name: "voter_name",
      label: "Voter Name",
    },
    { name: "guardian_name", label: "Father/Mother/Husband" },
    {
      name: "gender_type",
      label: "Gender",
    },
    {
      name: "is_resident",
      label: "Residential",
      options: {
        customBodyRender: (value, tableMeta, updateValue) => {
          return value == 1 ? "Yes" : value == 0 ? "No" : "-";
        },
      },
    },
    {
      name: "voter_phone_no",
      label: "Phone",
    },

    {
      name: "age",
      label: "Age",
    },
    {
      name: "voter_pkk",
      label: "Edit/Delete",
      options: {
        customBodyRender: (value, tableMeta, updateValue) => {
          return (
            <Stack direction="row" spacing={1}>
              <EditNoteIcon color="primary" />
              <DeleteForeverIcon color="error" />
            </Stack>
          );
        },
      },
    },
  ];

  const options = {
    elevation: 0,
    selectableRows: "none",
    responsive: "standard",
    serverSide: true,
    count: voter.count,
    page: voter.page,
    rowsPerPage: voter.limit,
    rowsPerPageOptions: ROWS_PER_PAGE_OPTION,
    onTableChange: (action, tableState) => {
      switch (action) {
        case "changePage":
          handleRetrieveData(tableState);
          break;
        case "changeRowsPerPage":
          handleRetrieveData(tableState);
          break;
        default:
        // console.log("action not handled.");
        // console.log(action, tableState);
      }
    },
  };

  const handleRetrieveData = (tableState) => {
    getAllVotersSurvey(filterValues, tableState.page, tableState.rowsPerPage);
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

  return (
    <Card elevation={1}>
      {voter.isLoading && (
        <Box minHeight={200} display="flex" justifyContent="center" alignItems="center">
          <CircularProgress />
        </Box>
      )}

      {!voter.isLoading && (
        <ThemeProvider theme={getMuiTableTheme()}>
          <MUIDataTable title="Voter List" columns={columns} data={voter.data} options={options} />
        </ThemeProvider>
      )}
    </Card>
  );
};

const mapStateToProps = (state) => {
  return {
    voter: state.voter,
  };
};

export default connect(mapStateToProps, {
  showAlert,
  getAllVotersSurvey,
})(ViewVotersList);
