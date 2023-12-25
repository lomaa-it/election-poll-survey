import { useEffect, useState } from "react";
import { Typography, Card, Stack, Grid, Switch, Divider, Box, Chip, TextField, CircularProgress, MenuItem, Button } from "@mui/material";
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
import { UncontrolledTextField } from "../../components/hook-form/RHFTextField";
import SearchIcon from "@mui/icons-material/Search";

const ViewVotersList = ({ voter, filterValues, showAlert, getAllVotersSurvey, account }) => {
  const [searchForm, setSearchForm] = useState({ fieldname: "", fieldvalue: "" });

  const columns = [
    {
      name: "part_no",
      label: "Part No",
    },
    {
      name: "part_slno",
      label: "Part Slno",
    },
    { name: "voter_id", label: "Voter ID" },
    {
      name: "voter_name",
      label: "Voter Name",
      options: {
        setCellProps: () => ({ style: { minWidth: "200px" } }),
      },
    },
    {
      name: "guardian_name",
      label: "Guardian Name",
      options: {
        setCellProps: () => ({ style: { minWidth: "200px" } }),
      },
    },
    { name: "guardian_type", label: "Guardian" },
    {
      name: "gender_type",
      label: "Gender",
    },
    {
      name: "age",
      label: "Age",
    },
    {
      name: "voter_phone_no",
      label: "Phone",
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
      name: "current_address",
      label: "Current Address",
      options: {
        setCellProps: () => ({ style: { minWidth: "200px" } }),
      },
    },
    {
      name: "permenent_address",
      label: "Permanent Address",
      options: {
        setCellProps: () => ({ style: { minWidth: "200px" } }),
      },
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

  const searchFields = [
    {
      name: "part_slno",
      label: "Part Slno",
    },
    {
      name: "voter_id",
      label: "Voter ID",
    },
    {
      name: "voter_name",
      label: "Voter Name",
    },
    {
      name: "guardian_name",
      label: "Guardian Name",
    },
    {
      name: "current_address",
      label: "Current Address",
    },
    {
      name: "phone_no",
      label: "Phone",
    },
  ];

  const options = {
    elevation: 0,
    selectableRows: "none",
    responsive: "standard",
    serverSide: true,
    filter: false,
    search: false,
    ...(account.user?.desgination_name != "MLA" && {
      download: false,
      print: false,
      viewColumns: false,
    }),
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
    getAllVotersSurvey({ ...filterValues, ...searchForm }, tableState.page, tableState.rowsPerPage);
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
        <>
          <Box p={3}>
            <Grid container spacing={2} alignItems="center">
              <Grid item xs={2}>
                <UncontrolledTextField name="fieldname" label="Search by" value={searchForm.fieldname} onChange={(e) => setSearchForm((state) => ({ ...state, fieldname: e.target.value }))} select>
                  {searchFields.map((item, index) => (
                    <MenuItem key={index} value={item.name}>
                      {item.label}
                    </MenuItem>
                  ))}
                </UncontrolledTextField>
              </Grid>
              <Grid item xs={3}>
                <UncontrolledTextField name="fieldvalue" label="Search..." value={searchForm.fieldvalue} onChange={(e) => setSearchForm((state) => ({ ...state, fieldvalue: e.target.value }))} />
              </Grid>
              <Grid item xs={3}>
                <Button variant="contained" onClick={handleRetrieveData}>
                  <SearchIcon />
                </Button>
              </Grid>
            </Grid>
          </Box>

          <Divider />
          <ThemeProvider theme={getMuiTableTheme()}>
            <MUIDataTable title="Voter List" columns={columns} data={voter.data} options={options} />
          </ThemeProvider>
        </>
      )}
    </Card>
  );
};

const mapStateToProps = (state) => {
  return {
    voter: state.voter,
    account: state.auth,
  };
};

export default connect(mapStateToProps, {
  showAlert,
  getAllVotersSurvey,
})(ViewVotersList);
