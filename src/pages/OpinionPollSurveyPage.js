import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Grid, Container, Typography, Box, TextField, Card } from "@mui/material";
import Page from "../components/Page";
import { connect } from "react-redux";
import { LoadingButton } from "@mui/lab";

import OpinionPollSurveyList from "../sections/reports/OpinionPollSurveyList";
import SearchByFilter from "../sections/common/SearchByFilter";
import { getAllVotersSurvey, clearVoterReducer } from "../actions/voter";
import { searchFiltercolor } from "../constants";

const OpinionPollSurveyPage = ({ getAllVotersSurvey, clearVoterReducer }) => {
  const [filterValues, setFilterValues] = useState(null);
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    clearVoterReducer();
  }, []);

  const onSubmit = async () => {
    setLoading(true);

    await getAllVotersSurvey(filterValues);

    setLoading(false);
  };

  return (
    <Page title="Opinion Survey">
      <Container maxWidth="xl">
        <Typography variant="h4" sx={{ mb: 1 }}>
          Opinion Survey
        </Typography>

        <Card sx={{ p: 3, backgroundColor: searchFiltercolor }}>
          <Typography sx={{ pb: 2 }}>Search by filter</Typography>

          <Grid container spacing={2} alignItems="center">
            <SearchByFilter onChanged={(value) => setFilterValues(value)} />

            <Grid item xs={12} md={6} lg={2}>
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
            </Grid>
            <Grid item xs={12} md={6} lg={2}>
              <LoadingButton loading={isLoading} variant="contained" onClick={onSubmit}>
                Search
              </LoadingButton>
            </Grid>
          </Grid>
        </Card>

        <Box p={1} />

        <Grid container spacing={3}>
          <Grid item xs={12} md={6} lg={12}>
            <OpinionPollSurveyList />
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
};

export default connect(null, { getAllVotersSurvey, clearVoterReducer })(OpinionPollSurveyPage);
