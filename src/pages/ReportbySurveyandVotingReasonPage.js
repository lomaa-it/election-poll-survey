import { Grid, Container, Typography, Box, TextField, Card, MenuItem } from "@mui/material";
import Page from "../components/Page";
import { connect } from "react-redux";
import { LoadingButton } from "@mui/lab";

import ViewUsersList from "../sections/reports/ViewUsersList";
import Button from "@mui/material/Button";
import ReportbySurveyandVotingReasonList from "../sections/reports/ReportbySurveyandVotingReasonList";
import SearchByFilter from "../sections/common/SearchByFilter";
import { searchFiltercolor } from "../constants";

const ReportbySurveyandVotingReasonPage = ({ dashboard }) => {
  return (
    <Page title="View User">
      <Container maxWidth="xl">
        <Typography variant="h4" sx={{ mb: 1 }}>
          Report by Survey and Voting Reason
        </Typography>

        <Card sx={{ p: 3, backgroundColor: searchFiltercolor }}>
          <Typography sx={{ pb: 2 }}>Search by filter</Typography>

          <Grid container spacing={2} alignItems="center">
            <SearchByFilter />
            <Grid item xs={12} md={6} lg={2}>
              <TextField
                size="small"
                label="Poll Reason"
                fullWidth
                select
                sx={{
                  backgroundColor: "#fff",
                  borderRadius: "5px",
                }}
              >
                <MenuItem value="yes">Yes</MenuItem>
                <MenuItem value="no">No</MenuItem>
              </TextField>
            </Grid>
            <Grid item xs={12} md={6} lg={2}>
              <TextField
                size="small"
                label="Voting Reason"
                fullWidth
                select
                sx={{
                  backgroundColor: "#fff",
                  borderRadius: "5px",
                }}
              >
                <MenuItem value="yes">Yes</MenuItem>
                <MenuItem value="no">No</MenuItem>
              </TextField>
            </Grid>
            <Grid item xs={12} md={6} lg={2}>
              <LoadingButton variant="contained">Search</LoadingButton>
            </Grid>
          </Grid>
        </Card>

        <Box p={1} />
        <ReportbySurveyandVotingReasonList />
      </Container>
    </Page>
  );
};

const mapStateToProps = (state) => {
  return {
    dashboard: state.dashboard,
  };
};

export default connect(mapStateToProps, null)(ReportbySurveyandVotingReasonPage);
