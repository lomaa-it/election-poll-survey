import { Grid, Container, Typography, Box, TextField, Card } from "@mui/material";
import Page from "../components/Page";
import { connect } from "react-redux";
import { LoadingButton } from "@mui/lab";

import ViewUsersList from "../sections/reports/ViewUsersList";
import Button from "@mui/material/Button";
import VoterAndVolunteerMappingList from "../sections/reports/VoterAndVolunteerMappingList";

const VoterAndVolunteerMappingPage = ({ dashboard }) => {
  return (
    <Page title="View User">
      <Container maxWidth="xl">
        <Typography variant="h4" sx={{ mb: 1 }}>
          Voter And Volunteer Mapping
        </Typography>

        <Card sx={{ p: 3 }}>
          <Typography sx={{ pb: 2 }}>Search by filter</Typography>

          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} md={6} lg={2}>
              <TextField label="Select Mandal" fullWidth select />
            </Grid>

            <Grid item xs={12} md={6} lg={2}>
              <TextField label="Select Division" fullWidth select />
            </Grid>

            <Grid item xs={12} md={6} lg={2}>
              <TextField label="Select Sachivalayam" fullWidth select />
            </Grid>

            <Grid item xs={12} md={6} lg={2}>
              <TextField label="Select Part/Booth No" fullWidth select />
            </Grid>

            <Grid item xs={12} md={6} lg={2}>
              <TextField label="Select Village" fullWidth select />
            </Grid>

            <Grid item xs={12} md={6} lg={2}>
              <LoadingButton variant="contained">Search</LoadingButton>
            </Grid>
          </Grid>
        </Card>

        <Card sx={{ p: 3, marginTop: 1 }}>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} md={6} lg={3}>
              <TextField label="Select Volunteer" fullWidth select />
            </Grid>
            <Grid item xs={12} md={6} lg={3}>
              <Button
                variant="outlined"
                sx={{
                  padding: "15px 45px",
                }}
              >
                Assign Volunteer
              </Button>
            </Grid>
            <Grid item xs={12} md={6} lg={3}>
              <TextField label="Select Gruhasarathulu" fullWidth select />
            </Grid>
            <Grid item xs={12} md={6} lg={3}>
              <Button
                variant="outlined"
                sx={{
                  padding: "15px 45px",
                }}
              >
                Assign Gruhasarathulu
              </Button>
            </Grid>
          </Grid>
        </Card>

        <Box p={1} />

        <VoterAndVolunteerMappingList />
      </Container>
    </Page>
  );
};

const mapStateToProps = (state) => {
  return {
    dashboard: state.dashboard,
  };
};

export default connect(mapStateToProps, null)(VoterAndVolunteerMappingPage);
