import { useCallback, useEffect, useRef, useState } from "react";
import {
  Grid,
  Container,
  Typography,
  Box,
  TextField,
  Card,
  MenuItem,
} from "@mui/material";
import Page from "../components/Page";
import { connect } from "react-redux";
import { LoadingButton } from "@mui/lab";

import OpinionPollSurveyResultsList from "../sections/reports/OpinionPollSurveyResultsList";
import PollResultsBarChartWidget from "../sections/opinionPollSurveyResults/PollResultsBarChartWidget";
import SearchByFilter from "../sections/common/SearchByFilter";
import { getOpinionResults, clearDashboardReducer } from "../actions/dashboard";
import { BarChartWidget } from "../sections/common";
import {
  BJPColor,
  CONGRESSColor,
  JSPColor,
  NETURALColor,
  OTHERColor,
  TDPColor,
  YSRCPColor,
} from "../utils/constants";
import { searchFiltercolor } from "../constants";
import { useLocation } from "react-router-dom";

const OpinionPollSurveyResultsPage = ({
  dashboard,
  getOpinionResults,
  clearDashboardReducer,
}) => {
  const [filterValues, setFilterValues] = useState(null);
  const [isLoading, setLoading] = useState(false);
  const [reset, setReset] = useState(false);
  let location = useLocation();
  const buttonRef = useRef();

  useEffect(() => {
    clearDashboardReducer();
  }, []);

  const onSubmit = useCallback(async () => {
    setLoading(true);
    console.log("filterValues232", filterValues);
    console.log("HI im Here");
    await getOpinionResults(filterValues);
    setLoading(false);
  }, [filterValues, getOpinionResults]);

  useEffect(() => {
    onSubmit();
  }, [location, onSubmit]);

  return (
    <Page title=" Opinion Results">
      <Container maxWidth="xl">
        {/* <Typography variant="h4" sx={{ mb: 1 }}>
          Opinion Results
        </Typography> */}
        <Card sx={{ p: 3, backgroundColor: searchFiltercolor }}>
          <Grid container spacing={2} alignItems="center">
            <SearchByFilter
              reset={reset}
              onChanged={(value) => setFilterValues(value)}
            />

            <Grid item xs={12} md={6} lg={2}>
              <LoadingButton
                ref={buttonRef}
                loading={isLoading}
                variant="contained"
                onClick={onSubmit}
              >
                Search
              </LoadingButton>
              <LoadingButton
                loading={isLoading}
                variant="contained"
                sx={{
                  backgroundColor: "red",
                  marginLeft: "15px",
                }}
                onClick={() => {
                  setReset(!reset);
                }}
              >
                Clear
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
                chartLabels={[
                  "Neutral",
                  "YCP",
                  "TDP",
                  "JSP",
                  "Congress",
                  "BJP",
                  "Others",
                ]}
                chartData={[
                  {
                    name: "Total",
                    data: [
                      dashboard.opinionResults.reduce(
                        (sum, e) => sum + e.neutral,
                        0
                      ),
                      dashboard.opinionResults.reduce(
                        (sum, e) => sum + e.ysrcp,
                        0
                      ),
                      dashboard.opinionResults.reduce(
                        (sum, e) => sum + e.tdp,
                        0
                      ),
                      dashboard.opinionResults.reduce(
                        (sum, e) => sum + e.janasena,
                        0
                      ),
                      dashboard.opinionResults.reduce(
                        (sum, e) => sum + e.congress,
                        0
                      ),
                      dashboard.opinionResults.reduce(
                        (sum, e) => sum + e.bjp,
                        0
                      ),
                      dashboard.opinionResults.reduce(
                        (sum, e) => sum + e.otherss,
                        0
                      ),
                    ],
                  },
                ]}
                chartColors={[
                  NETURALColor,
                  YSRCPColor,
                  TDPColor,
                  JSPColor,
                  CONGRESSColor,
                  BJPColor,
                  OTHERColor,
                ]}
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

export default connect(mapStateToProps, {
  getOpinionResults,
  clearDashboardReducer,
})(OpinionPollSurveyResultsPage);
