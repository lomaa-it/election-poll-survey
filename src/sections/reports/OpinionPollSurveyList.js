import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Card,
  Stack,
  Box,
  CircularProgress,
  IconButton,
  Typography,
} from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";

import MUIDataTable from "mui-datatables";
import { connect } from "react-redux";
import { showAlert } from "../../actions/alert";

import EditNoteIcon from "@mui/icons-material/EditNote";
import {
  PARTY_ID,
  ROWS_PER_PAGE_OPTION,
  getMuiTableTheme,
} from "../../constants";
import { changeOpinionPoll, getAllVotersSurvey } from "../../actions/voter";
import {
  BJPRadio,
  CongressRadio,
  JSPRadio,
  NeutralRadio,
  OthersRadio,
  TDPRadio,
  YCPRadio,
} from "../common/PartyRadioButtons";
import UpdateVoterDialog from "../common/UpdateVoterDialog";
import AnalyticsCard from "../common/AnalyticsCard";

const OpinionPollSurveyList = ({
  isUser,
  voter,
  account,
  filterValues,
  showAlert,
  changeOpinionPoll,
  getAllVotersSurvey,
}) => {
  const navigate = useNavigate();

  const columns = [
    {
      name: "voter_pkk",
      label: "Voter PK",
      options: {
        display: false,
      },
    },
    {
      name: "opinionparty",
      label: "Neutral",
      options: {
        customBodyRender: (value, tableMeta, updateValue) => {
          var data = tableMeta.rowData;
          var partyId = PARTY_ID.NEUTRAL;
          var index = voter.data.findIndex((e) => e.voter_pkk == data[0]);

          return (
            <Stack direction="row" alignItems="center" spacing={2}>
              <NeutralRadio
                sx={{
                  p: 0,
                }}
                checked={value == partyId}
                onChange={() => {
                  handleChange(data[0], partyId);
                }}
              />

              {value == PARTY_ID.NEUTRAL && (
                <IconButton
                  onClick={() => handleEdit(voter.data[index])}
                  sx={{
                    p: 0,
                  }}
                >
                  <EditNoteIcon />
                </IconButton>
              )}
            </Stack>
          );
        },
      },
    },
    {
      name: "opinionparty",
      label: "YCP",
      options: {
        customBodyRender: (value, tableMeta, updateValue) => {
          var data = tableMeta.rowData;
          var partyId = PARTY_ID.YSRCP;
          return (
            <YCPRadio
              sx={{
                p: 0,
              }}
              checked={value == partyId}
              onChange={() => handleChange(data[0], partyId)}
            />
          );
        },
      },
    },

    {
      name: "opinionparty",
      label: "TDP",
      options: {
        customBodyRender: (value, tableMeta, updateValue) => {
          var data = tableMeta.rowData;
          var partyId = PARTY_ID.TDP;
          return (
            <TDPRadio
              sx={{
                p: 0,
              }}
              checked={value == partyId}
              onChange={() => handleChange(data[0], partyId)}
            />
          );
        },
      },
    },
    {
      name: "opinionparty",
      label: "JSP",
      options: {
        customBodyRender: (value, tableMeta, updateValue) => {
          var data = tableMeta.rowData;
          var partyId = PARTY_ID.JANASENA;
          return (
            <JSPRadio
              sx={{
                p: 0,
              }}
              checked={value == partyId}
              onChange={() => handleChange(data[0], partyId)}
            />
          );
        },
      },
    },
    {
      name: "opinionparty",
      label: "BJP",
      options: {
        customBodyRender: (value, tableMeta, updateValue) => {
          var data = tableMeta.rowData;
          var partyId = PARTY_ID.BJP;
          return (
            <BJPRadio
              sx={{
                p: 0,
              }}
              checked={value == partyId}
              onChange={() => handleChange(data[0], partyId)}
            />
          );
        },
      },
    },
    {
      name: "opinionparty",
      label: "Congress",
      options: {
        customBodyRender: (value, tableMeta, updateValue) => {
          var data = tableMeta.rowData;
          var partyId = PARTY_ID.CONGRESS;
          return (
            <CongressRadio
              sx={{
                p: 0,
              }}
              checked={value == partyId}
              onChange={() => handleChange(data[0], partyId)}
            />
          );
        },
      },
    },
    {
      name: "opinionparty",
      label: "Others",
      options: {
        customBodyRender: (value, tableMeta, updateValue) => {
          var data = tableMeta.rowData;
          var partyId = PARTY_ID.OTHERS;
          var index = voter.data.findIndex((e) => e.voter_pkk == data[0]);
          return (
            <Stack direction="row" alignItems="center" spacing={2}>
              <OthersRadio
                sx={{
                  p: 0,
                }}
                checked={value == partyId}
                onChange={() => handleChange(data[0], partyId)}
              />
              {index != -1 && (
                <UpdateVoterDialog voterData={voter.data[index]} />
              )}
            </Stack>
          );
        },
      },
    },
    {
      name: "part_no",
      label: "Part No",
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
      name: "guardian_type",
      label: "Guardian",
    },
    {
      name: "guardian_name",
      label: "Guardian Name",
    },
    {
      name: "gender_type",
      label: "Gender",
    },
    {
      name: "voter_age",
      label: "Age",
    },
    {
      name: "current_address",
      label: "Current Address",
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

              {/* {index != -1 && (
                <UpdateVoterDialog voterData={voter.data[index]} />
              )} */}
            </Stack>
          );
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
      name: "volunteer_id",
      label: "Volunteer",
      options: {
        display: false,
      },
    },
    {
      name: "permenent_address",
      label: "Permanent Address",
    },
  ];

  const options = {
    elevation: 0,
    selectableRows: "none",
    responsive: "standard",
    serverSide: true,
    ...(account.user?.desgination_name != "MLA" && {
      filter: false,
      search: false,
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

  // const options = {
  //   elevation: 0,
  //   selectableRows: "none",
  //   responsive: "standard",
  //   serverSide: true,
  //   filter: false,
  //   search: false,
  //   download: false,
  //   print: false,
  //   viewColumns: false,
  //   count: voter.count,
  //   page: voter.page,
  //   rowsPerPage: voter.limit,
  //   rowsPerPageOptions: ROWS_PER_PAGE_OPTION,
  //   onTableChange: (action, tableState) => {
  //     switch (action) {
  //       case "changePage":
  //         handleRetrieveData(tableState);
  //         break;
  //       case "changeRowsPerPage":
  //         handleRetrieveData(tableState);
  //         break;
  //       default:
  //       // console.log("action not handled.");
  //       // console.log(action, tableState);
  //     }
  //   },
  // };

  const handleChange = async (id, value) => {
    const volunteer_id = account.user?.user_pk;
    var result = await changeOpinionPoll(id, value, volunteer_id);
    if (result) {
      showAlert({ text: "Opinion Submitted", color: "success" });
    }
  };

  const handleEdit = (data) => {
    if (isUser) {
      navigate("/user/view-ticket-history", { state: { data: data } });
    } else {
      navigate("/view-ticket-history", { state: { data: data } });
    }
  };

  const handleRetrieveData = (tableState) => {
    getAllVotersSurvey(filterValues, tableState.page, tableState.rowsPerPage);
  };

  return (
    <>
      <AnalyticsCard
        names={["Total Voters", "Survey Completed", "Pending"]}
        values={[voter.count, voter.completed, voter.pending]}
      />

      <Box p={1} />

      <Card elevation={1}>
        {voter.isLoading && (
          <Box
            minHeight={200}
            display="flex"
            justifyContent="center"
            alignItems="center"
          >
            <CircularProgress />
          </Box>
        )}

        {!voter.isLoading && (
          <ThemeProvider theme={getMuiTableTheme()}>
            <MUIDataTable
              title="Opinion Poll"
              columns={columns}
              data={voter.data}
              options={options}
            />
          </ThemeProvider>
        )}
      </Card>
    </>
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
  changeOpinionPoll,
  getAllVotersSurvey,
})(OpinionPollSurveyList);
