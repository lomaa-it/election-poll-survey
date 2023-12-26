import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Card,
  Stack,
  Box,
  CircularProgress,
  IconButton,
  Typography,
  Divider,
  TextField,
  Grid,
  MenuItem,
  Button,
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
  getTicketColorByValue,
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
import {
  UncontrolledSelectField,
  UncontrolledTextField,
} from "../../components/hook-form/RHFTextField";
import SearchIcon from "@mui/icons-material/Search";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";

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
  const fieldname = useRef();
  const fieldvalue = useRef();
  const [radioValue, setRadioValue] = useState("null");

  const columns = [
    {
      name: "voter_pkk",
      label: "Survey",
      options: {
        customBodyRender: (value, tableMeta, updateValue) => {
          // console.log("tableMeta", tableMeta.rowData[18])
          // console.log("value", value)
          const isActive = tableMeta.rowData[18] !== null ? true : false;

          var index = voter.data.findIndex((e) => e.voter_pkk == value);
          return (
            <Stack direction="row" spacing={1}>
              <UpdateVoterDialog
                voterData={voter.data[index]}
                isActive={isActive}
              />

              {tableMeta.rowData[18] == PARTY_ID.NEUTRAL && (
                <IconButton
                  onClick={() => handleEdit(voter.data[index])}
                  sx={{
                    p: 0,
                    color: getTicketColorByValue(voter.data[index]?.status_id),
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
      name: "opinionparty",
      label: "Neutral",
      options: {
        customBodyRender: (value, tableMeta, updateValue) => {
          var data = tableMeta.rowData;
          var partyId = PARTY_ID.NEUTRAL;
          return (
            <NeutralRadio
              sx={{
                p: 0,
              }}
              disabled={account.user?.desgination_name == "MLA"}
              checked={value == partyId}
              onChange={() => {
                handleChange(data[0], partyId);
              }}
            />
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
              disabled={account.user?.desgination_name == "MLA"}
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
              disabled={account.user?.desgination_name == "MLA"}
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
              disabled={account.user?.desgination_name == "MLA"}
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
              disabled={account.user?.desgination_name == "MLA"}
              checked={value == partyId}
              onChange={() => handleChange(data[0], partyId)}
            />
          );
        },
      },
    },
    {
      name: "opinionparty",
      label: "INC",
      options: {
        customBodyRender: (value, tableMeta, updateValue) => {
          var data = tableMeta.rowData;
          var partyId = PARTY_ID.CONGRESS;
          return (
            <CongressRadio
              sx={{
                p: 0,
              }}
              disabled={account.user?.desgination_name == "MLA"}
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
          return (
            <OthersRadio
              sx={{
                p: 0,
              }}
              disabled={account.user?.desgination_name == "MLA"}
              checked={value == partyId}
              onChange={() => handleChange(data[0], partyId)}
            />
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
    var searchForm = {
      fieldname: fieldname.current.value,
      fieldvalue: fieldvalue.current.value,
    };

    console.log("Hi", radioValue);

    getAllVotersSurvey(
      {
        ...filterValues,
        ...searchForm,
        isSurveyed: radioValue == "null" ? null : radioValue,
      },
      tableState.page,
      tableState.rowsPerPage
    );
  };
  console.log("radioValue", radioValue);
  return (
    <>
      <AnalyticsCard
        names={["Total Voters", "Survey Completed", "Pending"]}
        values={[voter.count, voter.completed, voter.pending]}
      />

      <Box p={1} />

      <Card elevation={1}>
        <Box p={3}>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={2}>
              <UncontrolledTextField
                inputRef={fieldname}
                label="Search by"
                select
              >
                {searchFields.map((item, index) => (
                  <MenuItem key={index} value={item.name}>
                    {item.label}
                  </MenuItem>
                ))}
              </UncontrolledTextField>
            </Grid>

            <Grid item xs={3}>
              <UncontrolledTextField inputRef={fieldvalue} label="Search..." />
            </Grid>
            <Grid item xs={3}>
              <FormControl>
                {/* <FormLabel id="demo-row-radio-buttons-group-label">
                  Gender
                </FormLabel> */}
                <RadioGroup
                  onChange={(e) => setRadioValue(e.target.value)}
                  value={radioValue}
                  row
                  aria-labelledby="demo-row-radio-buttons-group-label"
                  name="row-radio-buttons-group"
                >
                  <FormControlLabel
                    value="null"
                    control={<Radio />}
                    label="All"
                  />
                  <FormControlLabel value="Y" control={<Radio />} label="Yes" />
                  <FormControlLabel value="N" control={<Radio />} label="No" />
                </RadioGroup>
              </FormControl>
            </Grid>

            <Grid item xs={3}>
              <Button
                disabled={voter.isLoading}
                variant="contained"
                onClick={handleRetrieveData}
              >
                <SearchIcon />
              </Button>
            </Grid>
          </Grid>
        </Box>

        <Divider />

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
          <>
            <ThemeProvider theme={getMuiTableTheme()}>
              <MUIDataTable
                title="Opinion Poll"
                columns={columns}
                data={voter.data}
                options={options}
              />
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
