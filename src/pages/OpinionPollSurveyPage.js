import { useCallback, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Grid, Container, Typography, Box, TextField, Card } from "@mui/material";
import Page from "../components/Page";
import { connect } from "react-redux";
import { LoadingButton } from "@mui/lab";

import OpinionPollSurveyList from "../sections/reports/OpinionPollSurveyList";
import SearchByFilter from "../sections/common/SearchByFilter";
import { getAllVotersSurvey, clearVoterReducer } from "../actions/voter";
import { searchFiltercolor } from "../constants";
import { useLocation } from "react-router-dom";

const OpinionPollSurveyPage = ({ getAllVotersSurvey, clearVoterReducer }) => {
  const [filterValues, setFilterValues] = useState(null);
  const [isLoading, setLoading] = useState(false);
  const [reset, setReset] = useState(false);
  let location = useLocation();
  const buttonRef = useRef();

  useEffect(() => {
    clearVoterReducer();
  }, []);

  const onSubmit = useCallback(async () => {
    setLoading(true);
    console.log("filterValues232", filterValues);
    console.log("HI im Here");

    await getAllVotersSurvey(filterValues);

    setLoading(false);
  }, [filterValues, getAllVotersSurvey]);

  useEffect(() => {
    onSubmit();
  }, [location, onSubmit]);
  return (
    <Page title="Opinion Survey">
      <Container maxWidth="xl">
        {/* <Typography variant="h4" sx={{ mb: 1 }}>
          Opinion Survey
        </Typography> */}

        <Card sx={{ p: 3, backgroundColor: searchFiltercolor }}>
          <Grid container spacing={2} alignItems="center">
            <SearchByFilter reset={reset} onChanged={(value) => setFilterValues(value)} />

            {/* <Grid item xs={12} md={6} lg={2}>
              <TextField
                size="small"
                label="Voter ID"
                fullWidth
                select
                sx={{
                  backgroundColor: "#fff",
                  borderRadius: "5px",
                }}
              />
            </Grid>
            <Grid item xs={12} md={6} lg={2}>
              <TextField
                size="small"
                label="Voter Name"
                fullWidth
                select
                sx={{
                  backgroundColor: "#fff",
                  borderRadius: "5px",
                }}
              />
            </Grid>
            <Grid item xs={12} md={6} lg={2}>
              <TextField
                size="small"
                label="Phone Number"
                fullWidth
                select
                sx={{
                  backgroundColor: "#fff",
                  borderRadius: "5px",
                }}
              />
            </Grid>
            <Grid item xs={12} md={6} lg={2}>
              <TextField
                size="small"
                label="Select User"
                fullWidth
                select
                sx={{
                  backgroundColor: "#fff",
                  borderRadius: "5px",
                }}
              />
            </Grid>
            <Grid item xs={12} md={6} lg={2}>
              <TextField
                size="small"
                label="Select Next Level User"
                fullWidth
                select
                sx={{
                  backgroundColor: "#fff",
                  borderRadius: "5px",
                }}
              />
            </Grid> */}
            <Grid item xs={12} md={6} lg={2}>
              <LoadingButton ref={buttonRef} loading={isLoading} variant="contained" onClick={onSubmit}>
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

        <Grid container spacing={3}>
          <Grid item xs={12} md={6} lg={12}>
            <OpinionPollSurveyList filterValues={filterValues} />
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
};

export default connect(null, { getAllVotersSurvey, clearVoterReducer })(OpinionPollSurveyPage);
