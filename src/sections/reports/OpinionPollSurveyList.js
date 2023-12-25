import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, Stack, Box, CircularProgress, IconButton, Typography, Divider, TextField, Grid, MenuItem, Button } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";

import MUIDataTable from "mui-datatables";
import { connect } from "react-redux";
import { showAlert } from "../../actions/alert";

import EditNoteIcon from "@mui/icons-material/EditNote";
import { PARTY_ID, ROWS_PER_PAGE_OPTION, getMuiTableTheme } from "../../constants";
import { changeOpinionPoll, getAllVotersSurvey } from "../../actions/voter";
import { BJPRadio, CongressRadio, JSPRadio, NeutralRadio, OthersRadio, TDPRadio, YCPRadio } from "../common/PartyRadioButtons";
import UpdateVoterDialog from "../common/UpdateVoterDialog";
import AnalyticsCard from "../common/AnalyticsCard";
import { UncontrolledTextField } from "../../components/hook-form/RHFTextField";
import SearchIcon from "@mui/icons-material/Search";

const OpinionPollSurveyList = ({ isUser, voter, account, filterValues, showAlert, changeOpinionPoll, getAllVotersSurvey }) => {
  const navigate = useNavigate();
  const [searchForm, setSearchForm] = useState({ fieldname: "", fieldvalue: "" });

  const columns = [
    {
      name: "voter_pkk",
      label: "Survey",
      options: {
        customBodyRender: (value, tableMeta, updateValue) => {
          var index = voter.data.findIndex((e) => e.voter_pkk == value);
          return <UpdateVoterDialog voterData={voter.data[index]} />;
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
      options: {
        setCellProps: () => ({ style: { minWidth: "200px" } }),
      },
    },
    {
      name: "guardian_type",
      label: "Guardian",
    },
    {
      name: "guardian_name",
      label: "Guardian Name",
      options: {
        setCellProps: () => ({ style: { minWidth: "200px" } }),
      },
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
      options: {
        setCellProps: () => ({ style: { minWidth: "200px" } }),
      },
    },
    {
      name: "voter_phone_no",
      label: "Phone",
      options: {
        customBodyRender: (value, tableMeta, updateValue) => {
          return <Typography>{value ?? "-"}</Typography>;
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
      options: {
        setCellProps: () => ({ style: { minWidth: "200px" } }),
      },
    },
    // {
    //   name: "opinionparty",
    //   label: "Neutral",
    //   options: {
    //     customBodyRender: (value, tableMeta, updateValue) => {
    //       var data = tableMeta.rowData;
    //       var partyId = PARTY_ID.NEUTRAL;
    //       var index = voter.data.findIndex((e) => e.voter_pkk == data[0]);

    //       return (
    //         <Stack direction="row" alignItems="center" spacing={2}>
    //           <NeutralRadio
    //             sx={{
    //               p: 0,
    //             }}
    //             checked={value == partyId}
    //             onChange={() => {
    //               handleChange(data[0], partyId);
    //             }}
    //           />

    //           {value == PARTY_ID.NEUTRAL && (
    //             <IconButton
    //               onClick={() => handleEdit(voter.data[index])}
    //               sx={{
    //                 p: 0,
    //               }}
    //             >
    //               <EditNoteIcon />
    //             </IconButton>
    //           )}
    //         </Stack>
    //       );
    //     },
    //   },
    // },
    // {
    //   name: "opinionparty",
    //   label: "YCP",
    //   options: {
    //     customBodyRender: (value, tableMeta, updateValue) => {
    //       var data = tableMeta.rowData;
    //       var partyId = PARTY_ID.YSRCP;
    //       return (
    //         <YCPRadio
    //           sx={{
    //             p: 0,
    //           }}
    //           checked={value == partyId}
    //           onChange={() => handleChange(data[0], partyId)}
    //         />
    //       );
    //     },
    //   },
    // },
    // {
    //   name: "opinionparty",
    //   label: "TDP",
    //   options: {
    //     customBodyRender: (value, tableMeta, updateValue) => {
    //       var data = tableMeta.rowData;
    //       var partyId = PARTY_ID.TDP;
    //       return (
    //         <TDPRadio
    //           sx={{
    //             p: 0,
    //           }}
    //           checked={value == partyId}
    //           onChange={() => handleChange(data[0], partyId)}
    //         />
    //       );
    //     },
    //   },
    // },
    // {
    //   name: "opinionparty",
    //   label: "JSP",
    //   options: {
    //     customBodyRender: (value, tableMeta, updateValue) => {
    //       var data = tableMeta.rowData;
    //       var partyId = PARTY_ID.JANASENA;
    //       return (
    //         <JSPRadio
    //           sx={{
    //             p: 0,
    //           }}
    //           checked={value == partyId}
    //           onChange={() => handleChange(data[0], partyId)}
    //         />
    //       );
    //     },
    //   },
    // },
    // {
    //   name: "opinionparty",
    //   label: "BJP",
    //   options: {
    //     customBodyRender: (value, tableMeta, updateValue) => {
    //       var data = tableMeta.rowData;
    //       var partyId = PARTY_ID.BJP;
    //       return (
    //         <BJPRadio
    //           sx={{
    //             p: 0,
    //           }}
    //           checked={value == partyId}
    //           onChange={() => handleChange(data[0], partyId)}
    //         />
    //       );
    //     },
    //   },
    // },
    // {
    //   name: "opinionparty",
    //   label: "INC",
    //   options: {
    //     customBodyRender: (value, tableMeta, updateValue) => {
    //       var data = tableMeta.rowData;
    //       var partyId = PARTY_ID.CONGRESS;
    //       return (
    //         <CongressRadio
    //           sx={{
    //             p: 0,
    //           }}
    //           checked={value == partyId}
    //           onChange={() => handleChange(data[0], partyId)}
    //         />
    //       );
    //     },
    //   },
    // },
    // {
    //   name: "opinionparty",
    //   label: "Others",
    //   options: {
    //     customBodyRender: (value, tableMeta, updateValue) => {
    //       var data = tableMeta.rowData;
    //       var partyId = PARTY_ID.OTHERS;
    //       return (
    //         <OthersRadio
    //           sx={{
    //             p: 0,
    //           }}
    //           checked={value == partyId}
    //           onChange={() => handleChange(data[0], partyId)}
    //         />
    //       );
    //     },
    //   },
    // },
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
      name: "guardian_type",
      label: "Guardian",
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
      name: "permenent_address",
      label: "Permanent Address",
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
    getAllVotersSurvey({ ...filterValues, ...searchForm }, tableState.page, tableState.rowsPerPage);
  };

  return (
    <>
      <AnalyticsCard names={["Total Voters", "Survey Completed", "Pending"]} values={[voter.count, voter.completed, voter.pending]} />

      <Box p={1} />

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
              <MUIDataTable title="Opinion Poll" columns={columns} data={voter.data} options={options} />
            </ThemeProvider>
          </>
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
