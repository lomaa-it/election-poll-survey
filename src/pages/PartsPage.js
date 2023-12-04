import { Grid, Container, Typography, Box, TextField, Card } from "@mui/material";
import Page from "../components/Page";
import { connect } from "react-redux";
import { LoadingButton } from "@mui/lab";

import ViewUsersList from "../sections/reports/ViewUsersList";
import Button from "@mui/material/Button";
import VoterAndVolunteerMappingList from "../sections/reports/VoterAndVolunteerMappingList";
import PartsList from "../sections/reports/PartsList";

const PartsPage = ({ dashboard }) => {
  return (
    <Page title="View User">
      <Container maxWidth="xl">
        <Typography variant="h4" sx={{ mb: 1 }}>
          Parts
        </Typography>

        <Card sx={{ p: 3 }}>
          <Typography sx={{ pb: 2 }}>Add Parts</Typography>

          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} md={6} lg={2}>
              <TextField size="small" label="Select State" fullWidth select />
            </Grid>
            <Grid item xs={12} md={6} lg={2}>
              <TextField size="small" label="Select District" fullWidth select />
            </Grid>
            <Grid item xs={12} md={6} lg={2}>
              <TextField size="small" label="Select Constituency" fullWidth select />
            </Grid>
            <Grid item xs={12} md={6} lg={2}>
              <TextField size="small" label="Select Mandal" fullWidth select />
            </Grid>
            <Grid item xs={12} md={6} lg={2}>
              <TextField size="small" label="Select Division" fullWidth select />
            </Grid>
            <Grid item xs={12} md={6} lg={2}>
              <TextField size="small" label="Select Sachivalayam " fullWidth select />
            </Grid>
            <Grid item xs={12} md={6} lg={2}>
              <TextField size="small" label="Part Number " fullWidth />
            </Grid>
            <Grid item xs={12} md={6} lg={2}>
              <TextField size="small" label="Part Name " fullWidth />
            </Grid>
            <Grid item xs={12} md={6} lg={2}>
              <TextField size="small" label="Male Votes " fullWidth />
            </Grid>
            <Grid item xs={12} md={6} lg={2}>
              <TextField size="small" label="Female Votes" fullWidth />
            </Grid>
            <Grid item xs={12} md={6} lg={2}>
              <TextField size="small" label="Tg Votes" fullWidth />
            </Grid>
            <Grid item xs={12} md={6} lg={2}>
              <TextField size="small" label="Totals Votes" fullWidth />
            </Grid>
            <Grid item xs={12} md={6} lg={2}>
              <LoadingButton variant="contained">Add</LoadingButton>
            </Grid>
          </Grid>
        </Card>

        <Box p={1} />

        <PartsList />
      </Container>
    </Page>
  );
};

const mapStateToProps = (state) => {
  return {
    dashboard: state.dashboard,
  };
};

export default connect(mapStateToProps, null)(PartsPage);
