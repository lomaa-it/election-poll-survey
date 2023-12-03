import { useEffect, useState } from "react";
import { Grid, Container, Typography, Box, TextField, Card, MenuItem } from "@mui/material";
import Page from "../components/Page";
import { connect } from "react-redux";
import { LoadingButton } from "@mui/lab";

import OpinionPollSurveyResultsList from "../sections/reports/OpinionPollSurveyResultsList";
import PollResultsBarChartWidget from "../sections/opinionPollSurveyResults/PollResultsBarChartWidget";
import SearchByFilter from "../sections/common/SearchByFilter";
import { getOpinionResults, clearDashboardReducer } from "../actions/dashboard";
import { BarChartWidget } from "../sections/common";
import { BJPColor, CONGRESSColor, JSPColor, NETURALColor, OTHERColor, TDPColor, YSRCPColor } from "../utils/constants";
import { searchFiltercolor } from "../constants";

const OpinionPollSurveyResultsPage = ({ dashboard, getOpinionResults, clearDashboardReducer }) => {
  const [filterValues, setFilterValues] = useState(null);
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    clearDashboardReducer();
  }, []);

  const onSubmit = async () => {
    setLoading(true);

    await getOpinionResults(filterValues);

    setLoading(false);
  };

  return (
    <Page title="View Tickets">
      <Container maxWidth="xl">
        <Typography variant="h4" sx={{ mb: 1 }}>
          Opinion Results
        </Typography>
        <Card sx={{ p: 3, backgroundColor: searchFiltercolor }}>
          <Typography sx={{ pb: 2 }}>Search by filter</Typography>

          <Grid container spacing={2} alignItems="center">
            <SearchByFilter onChanged={(value) => setFilterValues(value)} />

            <Grid item xs={12} md={6} lg={2}>
              <LoadingButton loading={isLoading} variant="contained" onClick={onSubmit}>
                Search
              </LoadingButton>
            </Grid>
          </Grid>
        </Card>

        <Box p={1} />

        <Card sx={{ p: 3 }}>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} md={6} lg={1}>
              <Typography sx={{ pb: 2 }}>Survey % </Typography>
            </Grid>

            <Grid item xs={12} md={6} lg={2}>
              <TextField size="small" label="Select Survey%" fullWidth select>
                <MenuItem value="10">10</MenuItem>
                <MenuItem value="20">20</MenuItem>
                <MenuItem value="30">30</MenuItem>
                <MenuItem value="40">40</MenuItem>
                <MenuItem value="50">50</MenuItem>
              </TextField>
            </Grid>

            <Grid item xs={12} md={6} lg={2}>
              <LoadingButton variant="contained">Search</LoadingButton>{" "}
            </Grid>

            <Grid item xs={12} md={6} lg={12}>
              <BarChartWidget
                distributed={true}
                withCard={false}
                chartLabels={["Neutral", "YCP", "TDP", "JSP", "Congress", "BJP", "Others"]}
                chartData={[
                  {
                    name: "Total",
                    data: [
                      dashboard.opinionResults.reduce((sum, e) => sum + e.neutral, 0),
                      dashboard.opinionResults.reduce((sum, e) => sum + e.ysrcp, 0),
                      dashboard.opinionResults.reduce((sum, e) => sum + e.tdp, 0),
                      dashboard.opinionResults.reduce((sum, e) => sum + e.janasena, 0),
                      dashboard.opinionResults.reduce((sum, e) => sum + e.congress, 0),
                      dashboard.opinionResults.reduce((sum, e) => sum + e.bjp, 0),
                      dashboard.opinionResults.reduce((sum, e) => sum + e.otherss, 0),
                    ],
                  },
                ]}
                chartColors={[NETURALColor, YSRCPColor, TDPColor, JSPColor, CONGRESSColor, BJPColor, OTHERColor]}
              />
            </Grid>
          </Grid>
        </Card>

        <Box p={1} />

        <OpinionPollSurveyResultsList />
      </Container>
    </Page>
  );
};

const mapStateToProps = (state) => {
  return {
    dashboard: state.dashboard,
  };
};

export default connect(mapStateToProps, { getOpinionResults, clearDashboardReducer })(OpinionPollSurveyResultsPage);
