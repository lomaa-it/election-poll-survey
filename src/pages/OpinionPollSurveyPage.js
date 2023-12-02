import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Grid, Container, Typography, Box, TextField, Card } from "@mui/material";
import Page from "../components/Page";
import { connect } from "react-redux";
import { LoadingButton } from "@mui/lab";

import OpinionPollSurveyList from "../sections/reports/OpinionPollSurveyList";
import SearchByFilter from "../sections/common/SearchByFilter";
import { getAllVotersSurvey, clearVoterReducer } from "../actions/voter";

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

        <Card sx={{ p: 3 }}>
          <Typography sx={{ pb: 2 }}>Search by filter</Typography>

          <Grid container spacing={2} alignItems="center">
            <SearchByFilter onChanged={(value) => setFilterValues(value)} />

            <Grid item xs={12} md={6} lg={2}>
              <TextField label="Voter ID" fullWidth select />
            </Grid>
            <Grid item xs={12} md={6} lg={2}>
              <TextField label="Voter Name" fullWidth select />
            </Grid>
            <Grid item xs={12} md={6} lg={2}>
              <TextField label="Phone Number" fullWidth select />
            </Grid>
            <Grid item xs={12} md={6} lg={2}>
              <TextField label="Select User" fullWidth select />
            </Grid>
            <Grid item xs={12} md={6} lg={2}>
              <TextField label="Select Next Level User" fullWidth select />
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
