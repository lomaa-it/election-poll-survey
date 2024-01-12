import * as Yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, Stack, Box, CircularProgress, IconButton, Typography, Divider, TextField, Grid, MenuItem, Button } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import Tooltip from "@material-ui/core/Tooltip";
import MUIDataTable from "mui-datatables";
import { connect } from "react-redux";
import { showAlert } from "../../actions/alert";

import EditNoteIcon from "@mui/icons-material/EditNote";
import { PARTY_ID, ROWS_PER_PAGE_OPTION, getMuiTableTheme, getTicketColorByValue } from "../../constants";
import { changeOpinionPoll, getAllVotersSurvey } from "../../actions/voter";
import { BJPRadio, CongressRadio, JSPRadio, NeutralRadio, OthersRadio, TDPRadio, YCPRadio } from "../common/PartyRadioButtons";
import UpdateVoterDialog from "../common/UpdateVoterDialog";
import AnalyticsCard from "../common/AnalyticsCard";
import SearchIcon from "@mui/icons-material/Search";
import { FormProvider, RHFTextField } from "../../components/hook-form";
import CustomMuiDataTable from "../../components/CustomMuiDataTable";

const OpinionPollSurveyList = forwardRef(({ isUser, voter, account, showAlert, changeOpinionPoll, handleSubmit, handlePaginationSubmit }, ref) => {
  const userPermission = account.user && account.user.permissions ? account.user.permissions : [];
  const pageActions = userPermission.filter((p) => p.page_id === 114)[0];
  console.log("pageActions12", pageActions);

  const navigate = useNavigate();

  const schema = Yup.object().shape({
    fieldname: Yup.string(),
    fieldvalue: Yup.string(),
  });

  const defaultValues = {
    fieldname: "",
    fieldvalue: "",
  };

  const methods = useForm({
    resolver: yupResolver(schema),
    defaultValues,
  });

  const { getValues, reset } = methods;

  const columns = [
    {
      name: "voter_pkk",
      label: "Survey",
      options: {
        customBodyRender: (value, tableMeta, updateValue) => {
          // console.log("tableMeta", tableMeta.rowData[18])
          // console.log("value", value)

          var index = voter.data.findIndex((e) => e.voter_pkk == value);
          const isActive = voter.data[index].opinionparty !== null ? true : false;

          // console.log("voter.data[index]", voter.data[index]);
          return (
            <Stack direction="row" spacing={1}>
              <UpdateVoterDialog voterData={voter.data[index]} isActive={isActive} pageActions={pageActions} />

              {voter.data[index].opinionparty == PARTY_ID.NEUTRAL && (
                <Tooltip title={pageActions.survey_perm != 1 ? "You don't have access to create" : ""}>
                  <span>
                    <IconButton
                      disabled={pageActions.survey_perm != 1}
                      onClick={() => handleEdit(voter.data[index])}
                      sx={{
                        p: 0,
                        color: getTicketColorByValue(voter.data[index]?.status_id),
                      }}
                    >
                      <EditNoteIcon />
                    </IconButton>
                  </span>
                </Tooltip>
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
      name: "permenent_address",
      label: "Permanent Address",
      options: {
        setCellProps: () => ({ style: { minWidth: "200px" } }),
      },
    },
    ...(account.user?.desgination_name == "MLA" || account.user?.desgination_name == "Admin"
      ? [
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
            name: "current_address",
            label: "Current Address",
            options: {
              setCellProps: () => ({ style: { minWidth: "200px" } }),
            },
          },
          {
            name: "nr_state",
            label: "State",
          },
          {
            name: "nr_city",
            label: "City",
          },
          {
            name: "opinionparty",
            label: "Neutral",
            options: {
              customBodyRender: (value, tableMeta, updateValue) => {
                var data = tableMeta.rowData;
                var partyId = PARTY_ID.NEUTRAL;
                return (
                  <Tooltip title={pageActions.survey_perm != 1 ? "You don't have access to select" : ""}>
                    <span>
                      <NeutralRadio
                        sx={{
                          p: 0,
                        }}
                        disabled={pageActions.survey_perm != 1}
                        checked={value == partyId}
                        onChange={() => {
                          handleChange(data[0], partyId);
                        }}
                      />
                    </span>
                  </Tooltip>
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
                  <Tooltip title={pageActions.survey_perm != 1 ? "You don't have access to select" : ""}>
                    <span>
                      <YCPRadio
                        sx={{
                          p: 0,
                        }}
                        disabled={pageActions.survey_perm != 1}
                        checked={value == partyId}
                        onChange={() => handleChange(data[0], partyId)}
                      />
                    </span>
                  </Tooltip>
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
                  <Tooltip title={pageActions.survey_perm != 1 ? "You don't have access to select" : ""}>
                    <span>
                      <TDPRadio
                        sx={{
                          p: 0,
                        }}
                        disabled={pageActions.survey_perm != 1}
                        checked={value == partyId}
                        onChange={() => handleChange(data[0], partyId)}
                      />
                    </span>
                  </Tooltip>
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
                  <Tooltip title={pageActions.survey_perm != 1 ? "You don't have access to select" : ""}>
                    <span>
                      <JSPRadio
                        sx={{
                          p: 0,
                        }}
                        disabled={pageActions.survey_perm != 1}
                        checked={value == partyId}
                        onChange={() => handleChange(data[0], partyId)}
                      />
                    </span>
                  </Tooltip>
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
                var partyId = PARTY_ID.BJP;
                return (
                  <Tooltip title={pageActions.survey_perm != 1 ? "You don't have access to select" : ""}>
                    <span>
                      <CongressRadio
                        sx={{
                          p: 0,
                        }}
                        disabled={pageActions.survey_perm != 1}
                        checked={value == partyId}
                        onChange={() => handleChange(data[0], partyId)}
                      />
                    </span>
                  </Tooltip>
                );
              },
            },
          },
          {
            name: "opinionparty",
            label: "Not Traced",
            options: {
              customBodyRender: (value, tableMeta, updateValue) => {
                var data = tableMeta.rowData;
                var partyId = PARTY_ID.CONGRESS;
                return (
                  <Tooltip title={pageActions.survey_perm != 1 ? "You don't have access to select" : ""}>
                    <span>
                      <BJPRadio
                        sx={{
                          p: 0,
                        }}
                        disabled={pageActions.survey_perm != 1}
                        checked={value == partyId}
                        onChange={() => handleChange(data[0], partyId)}
                      />
                    </span>
                  </Tooltip>
                );
              },
            },
          },
        ]
      : []),

    {
      name: "surveyed_by",
      label: "Surveyed By",
    },
    // {
    //   name: "updatedby",
    //   label: "Updated By",
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
    download: false,
    print: false,
    viewColumns: false,

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
          handlePaginationSubmit(tableState);
          break;
        case "changeRowsPerPage":
          handlePaginationSubmit(tableState);
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

  const getSearchData = () => {
    var fieldname = getValues("fieldname");
    var fieldvalue = getValues("fieldvalue");

    var searchData = {
      fieldname: fieldname === "" ? null : fieldname,
      fieldvalue: fieldvalue === "" ? null : fieldvalue,
    };

    return searchData;
  };

  useImperativeHandle(ref, () => ({
    getSearchData: getSearchData,
    reset: reset,
  }));

  return (
    <>
      <AnalyticsCard names={["Total Voters", "Survey Completed", "Pending"]} values={[voter.count, voter.completed, voter.pending]} />

      <Box p={1} />

      <Card elevation={1}>
        <FormProvider methods={methods}>
          <Box p={3}>
            <Grid container spacing={2} alignItems="center">
              <Grid item xs={2}>
                <RHFTextField name="fieldname" label="Search by" select>
                  {searchFields.map((item, index) => (
                    <MenuItem key={index} value={item.name}>
                      {item.label}
                    </MenuItem>
                  ))}
                </RHFTextField>
              </Grid>

              <Grid item xs={3}>
                <RHFTextField name="fieldvalue" label="Search..." />
              </Grid>

              <Grid item xs={3}>
                <Button disabled={voter.isLoading} variant="contained" onClick={() => handleSubmit()}>
                  <SearchIcon />
                </Button>
              </Grid>
            </Grid>
          </Box>
        </FormProvider>

        <Divider />

        {voter.isLoading && (
          <Box minHeight={200} display="flex" justifyContent="center" alignItems="center">
            <CircularProgress />
          </Box>
        )}

        {!voter.isLoading && (
          <>
            <CustomMuiDataTable title="Opinion Poll" columns={columns} data={voter.data} options={options} />
          </>
        )}
      </Card>
    </>
  );
});

const mapStateToProps = (state) => {
  return {
    voter: state.voter,
    account: state.auth,
  };
};

export default connect(
  mapStateToProps,
  {
    showAlert,
    changeOpinionPoll,
    getAllVotersSurvey,
  },
  null,
  { forwardRef: true }
)(OpinionPollSurveyList);
