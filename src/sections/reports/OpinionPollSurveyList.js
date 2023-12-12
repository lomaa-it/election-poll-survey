import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, Stack, Box, CircularProgress, IconButton, TableRow, TableCell, TableContainer, Table, TableHead, TableBody, Paper, Typography } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";

import MUIDataTable from "mui-datatables";
import { connect } from "react-redux";
import { showAlert } from "../../actions/alert";

import EditNoteIcon from "@mui/icons-material/EditNote";
import { PARTY_ID, ROWS_PER_PAGE_OPTION, getMuiTableTheme } from "../../constants";
import { changeOpinionPoll, getAllVotersSurvey } from "../../actions/voter";
import { BJPRadio, CongressRadio, JSPRadio, NeutralRadio, OthersRadio, TDPRadio, YCPRadio } from "../common/PartyRadioButtons";
import UpdateVoterDialog from "../common/UpdateVoterDialog";

const OpinionPollSurveyList = ({ voter, filterValues, showAlert, changeOpinionPoll, getAllVotersSurvey }) => {
  const navigate = useNavigate();
  console.log("OpinionPollSurveyListVoter", voter);

  const columns = [
    {
      name: "voter_pkk",
      label: "Voter PK",
      options: {
        display: false,
      },
    },
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
      name: "voter_age",
      label: "Age",
    },
    {
      name: "voter_phone_no",
      label: "Phone",
      options: {
        customBodyRender: (value, tableMeta, updateValue) => {
          var data = tableMeta.rowData;
          var index = voter.data.findIndex((e) => e.voter_pkk == data[0]);

          return (
            <Stack direction="row" alignItems="center">
              <Typography>{value ?? "-"}</Typography>
              {index != -1 && <UpdateVoterDialog voterData={voter.data[index]} />}
            </Stack>
          );
        },
      },
    },
    {
      name: "intrested_party",
      label: "Neutral",
      options: {
        customBodyRender: (value, tableMeta, updateValue) => {
          var data = tableMeta.rowData;
          var partyId = PARTY_ID.NEUTRAL;

          return (
            <Stack direction="row" alignItems="center">
              <NeutralRadio
                checked={value == partyId}
                onChange={() => {
                  handleChange(data[0], partyId);
                }}
              />

              {value == PARTY_ID.NEUTRAL && (
                <IconButton onClick={() => handleEdit(data)}>
                  <EditNoteIcon />
                </IconButton>
              )}
            </Stack>
          );
        },
      },
    },
    {
      name: "intrested_party",
      label: "YCP",
      options: {
        customBodyRender: (value, tableMeta, updateValue) => {
          var data = tableMeta.rowData;
          var partyId = PARTY_ID.YSRCP;
          return <YCPRadio checked={value == partyId} onChange={() => handleChange(data[0], partyId)} />;
        },
      },
    },

    {
      name: "intrested_party",
      label: "TDP",
      options: {
        customBodyRender: (value, tableMeta, updateValue) => {
          var data = tableMeta.rowData;
          var partyId = PARTY_ID.TDP;
          return <TDPRadio checked={value == partyId} onChange={() => handleChange(data[0], partyId)} />;
        },
      },
    },
    {
      name: "intrested_party",
      label: "JSP",
      options: {
        customBodyRender: (value, tableMeta, updateValue) => {
          var data = tableMeta.rowData;
          var partyId = PARTY_ID.JANASENA;
          return <JSPRadio checked={value == partyId} onChange={() => handleChange(data[0], partyId)} />;
        },
      },
    },
    {
      name: "intrested_party",
      label: "BJP",
      options: {
        customBodyRender: (value, tableMeta, updateValue) => {
          var data = tableMeta.rowData;
          var partyId = PARTY_ID.BJP;
          return <BJPRadio checked={value == partyId} onChange={() => handleChange(data[0], partyId)} />;
        },
      },
    },
    {
      name: "intrested_party",
      label: "Congress",
      options: {
        customBodyRender: (value, tableMeta, updateValue) => {
          var data = tableMeta.rowData;
          var partyId = PARTY_ID.CONGRESS;
          return <CongressRadio checked={value == partyId} onChange={() => handleChange(data[0], partyId)} />;
        },
      },
    },
    {
      name: "intrested_party",
      label: "Others",
      options: {
        customBodyRender: (value, tableMeta, updateValue) => {
          var data = tableMeta.rowData;
          var partyId = PARTY_ID.OTHERS;
          return <OthersRadio checked={value == partyId} onChange={() => handleChange(data[0], partyId)} />;
        },
      },
    },
    {
      name: "religion_name",
      label: "Religion",
    },
    {
      name: "caste_name",
      label: "Caste",
    },
    {
      name: "disability",
      label: "Disability",
      options: {
        customBodyRender: (value, tableMeta, updateValue) => {
          return value == 1 ? "Yes" : value == 0 ? "No" : "-";
        },
      },
    },
    {
      name: "govt_employee",
      label: "Govt Employee",
      options: {
        customBodyRender: (value, tableMeta, updateValue) => {
          return value == 1 ? "Yes" : value == 0 ? "No" : "-";
        },
      },
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
      label: "Address",
    },
    {
      name: "volunteer_id",
      label: "Volunteer",
      options: {
        display: false,
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
          console.log("action not handled.");
          console.log(action, tableState);
      }
    },
  };

  const handleChange = async (id, value) => {
    var result = await changeOpinionPoll(id, value);
    if (result) {
      showAlert({ text: "Opinion Submitted", color: "success" });
    }
  };

  const handleEdit = (data) => {
    navigate("/add-ticket1", { state: { ...data } });
  };

  const handleRetrieveData = (tableState) => {
    getAllVotersSurvey(filterValues, tableState.page, tableState.rowsPerPage);
  };

  return (
    <>
      <TableContainer component={Paper} elevation={1}>
        <Table
          sx={{
            "& .MuiTableCell-head": {
              fontSize: "1.2rem",
              fontWeight: "bold",
              textAlign: "center",
            },
            "& .MuiTableCell-body": {
              fontSize: "1.2rem",
              fontWeight: "bold",
              textAlign: "center",
              color: "blue",
            },
          }}
        >
          <TableHead>
            <TableRow>
              <TableCell>Total Voters</TableCell>
              <TableCell>Survey Completed</TableCell>
              <TableCell>Pending</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell>{voter.count}</TableCell>
              <TableCell>{voter.completed}</TableCell>
              <TableCell>{voter.pending}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>

      <Box p={1} />

      <Card elevation={1}>
        {voter.isLoading && (
          <Box minHeight={200} display="flex" justifyContent="center" alignItems="center">
            <CircularProgress />
          </Box>
        )}

        {!voter.isLoading && (
          <ThemeProvider theme={getMuiTableTheme()}>
            <MUIDataTable title="Opinion Poll" columns={columns} data={voter.data} options={options} />
          </ThemeProvider>
        )}
      </Card>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    voter: state.voter,
  };
};

export default connect(mapStateToProps, { showAlert, changeOpinionPoll, getAllVotersSurvey })(OpinionPollSurveyList);
