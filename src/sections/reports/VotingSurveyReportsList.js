import { useEffect, useState } from "react";
import { Typography, Card, Stack, Grid, Switch, Divider, Box, Chip, TextField } from "@mui/material";
import MUIDataTable from "mui-datatables";
import { connect } from "react-redux";
import { showAlert } from "../../actions/alert";
import { LoadingButton } from "@mui/lab";
import PollResultsBarChartWidget from "../opinionPollSurveyResults/PollResultsBarChartWidget";
import SearchByFilter from "../common/SearchByFilter";

import { createTheme, ThemeProvider } from "@mui/material/styles";
import { searchFiltercolor } from "../../constants";

const VotingSurveyReportsList = ({ showAlert }) => {
  useEffect(() => {}, []);

  const columns = [
    {
      label: "Mandal Name",
    },
    {
      label: "Divsion Name",
    },
    {
      label: "Sachivalayam Name",
    },
    {
      label: "Part No",
    },
    {
      label: "Village Name",
    },
    {
      label: "Total Votes",
    },
    {
      label: "YCP (Votes)",
    },
    {
      label: "YCP (%)",
    },
    {
      label: "TDP (Votes)",
    },
    {
      label: "TDP (%)",
    },

    {
      label: "JSP (Votes)",
    },
    {
      label: "JSP (%)",
    },
    {
      label: "BJP (Votes)",
    },
    {
      label: "BJP (%)",
    },
    {
      label: "Others (Votes)",
    },
    {
      label: "Others (%)",
    },
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
        <Box p={3}>
          <Typography sx={{ pb: 2 }}>Search by filter</Typography>

          <Grid container spacing={2} alignItems="center">
            <SearchByFilter />

            <Grid item xs={12} md={6} lg={2}>
              <TextField size="small" label="Select User" fullWidth select />
            </Grid>
            <Grid item xs={12} md={6} lg={2}>
              <TextField size="small" label="Select Next Level User" fullWidth select />
            </Grid>
            <Grid item xs={12} md={6} lg={2}>
              <LoadingButton variant="contained">Search</LoadingButton>
            </Grid>
          </Grid>
        </Box>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} md={6} lg={8}>
            <PollResultsBarChartWidget
              title=""
              sx={{ height: "100%" }}
              chartLabels={["YCP", "TDP", "JSP", "BJP", "Others"]}
              chartData={[
                {
                  name: "Total",
                  data: ["150", 120, 100, 80, 50],
                },
              ]}
            />
          </Grid>
        </Grid>

        <Divider />
        <ThemeProvider theme={getMuiTheme()}>
          <MUIDataTable
            title="Survey Analysis"
            columns={columns}
            data={[
              ["Mandal 1", "Divsion 1", "Sachivalayam 1", "6", "Village 1", "25000", "2522", "69%", "888", "24%", "699", "5%", "455", "4%", "230", "2%"],
              ["Mandal 2", "Divsion 1", "Sachivalayam 1", "1", "Village 1", "25000", "2522", "69%", "888", "24%", "699", "5%", "455", "4%", "230", "2%"],
              ["Mandal 3", "Divsion 1", "Sachivalayam 1", "2", "Village 1", "25000", "2522", "69%", "888", "24%", "699", "5%", "455", "4%", "230", "2%"],
              ["Mandal 4", "Divsion 1", "Sachivalayam 1", "3", "Village 1", "25000", "2522", "69%", "888", "24%", "699", "5%", "455", "4%", "230", "2%"],
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
})(VotingSurveyReportsList);
