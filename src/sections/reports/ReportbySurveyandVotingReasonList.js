import { useEffect, useState } from "react";
import {
  Typography,
  Card,
  Stack,
  Grid,
  Switch,
  Divider,
  Box,
  Chip,
  TextField,
} from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";

import MUIDataTable from "mui-datatables";
import { connect } from "react-redux";
import { showAlert } from "../../actions/alert";
import { LoadingButton } from "@mui/lab";
import { searchFiltercolor } from "../../constants";

const ReportbySurveyandVotingReasonList = ({ showAlert }) => {
  useEffect(() => {}, []);

  const columns = [
    {
      label: "Constituency Name",
    },
    {
      label: "Mandal Name",
    },
    {
      label: "Panchayat",
    },
    {
      label: "Village",
    },

    {
      label: "Voter",
    },
    {
      label: "Phone",
    },
    {
      label: "Poll Reason",
    },
    { label: "Voting Reason" },
  ];

  const options = {
    elevation: 0,
    selectableRows: "none",
    responsive: "standard",
  };

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
          <MUIDataTable
            title=""
            columns={columns}
            data={[
              [
                "Constituency 1",
                "Mandal 1",
                "Panchayat 1",
                "Village 1",
                "Voter 1",
                "Phone 1",
                "Poll Reason 1",
                "Voting Reason 1",
              ],
              [
                "Constituency 1",
                "Mandal 1",
                "Panchayat 1",
                "Village 1",
                "Voter 1",
                "Phone 1",
                "Poll Reason 1",
                "Voting Reason 1",
              ],
              [
                "Constituency 1",
                "Mandal 1",
                "Panchayat 1",
                "Village 1",
                "Voter 1",
                "Phone 1",
                "Poll Reason 1",
                "Voting Reason 1",
              ],
              [
                "Constituency 1",
                "Mandal 1",
                "Panchayat 1",
                "Village 1",
                "Voter 1",
                "Phone 1",
                "Poll Reason 1",
                "Voting Reason 1",
              ],
              [
                "Constituency 1",
                "Mandal 1",
                "Panchayat 1",
                "Village 1",
                "Voter 1",
                "Phone 1",
                "Poll Reason 1",
                "Voting Reason 1",
              ],
            ]}
            options={options}
          />
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
})(ReportbySurveyandVotingReasonList);
