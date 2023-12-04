import { Grid, Container, Typography, Box, TextField, Card } from "@mui/material";
import Page from "../components/Page";
import { connect } from "react-redux";
import { LoadingButton } from "@mui/lab";

import UserMappingList from "../sections/reports/UserMappingList";
import Button from "@mui/material/Button";
import VoterAndVolunteerMappingList from "../sections/reports/VoterAndVolunteerMappingList";
import SearchByFilter from "../sections/common/SearchByFilter";
import { searchFiltercolor } from "../constants";

const UserMappingPage = ({ dashboard }) => {
  return (
    <Page title="View User">
      <Container maxWidth="xl">
        <Typography variant="h4" sx={{ mb: 1 }}>
          User Mapping
        </Typography>

        <Card sx={{ p: 3, backgroundColor: searchFiltercolor }}>
          <Typography sx={{ pb: 2 }}>Search by filter</Typography>

          <Grid container spacing={2} alignItems="center">
            <SearchByFilter />
            <Grid
              item
              xs={12}
              md={6}
              lg={2}
              sx={{
                marginLeft: "auto",
              }}
            >
              <LoadingButton variant="contained">Search</LoadingButton>
            </Grid>
          </Grid>
        </Card>

        <Card sx={{ p: 3, marginTop: 1 }}>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} md={6} lg={3}>
              <TextField size="small" label="Select Designation" fullWidth select />
            </Grid>
            <Grid item xs={12} md={6} lg={3}>
              <Button
                variant="outlined"
                sx={{
                  padding: "15px 45px",
                }}
              >
                Assign Designation
              </Button>
            </Grid>
            <Grid item xs={12} md={6} lg={3}>
              <TextField size="small" label="Select Reporting Manager" fullWidth select />
            </Grid>
            <Grid item xs={12} md={6} lg={3}>
              <Button
                variant="outlined"
                sx={{
                  padding: "15px 45px",
                }}
              >
                Assign Reporting Manager
              </Button>
            </Grid>
          </Grid>
        </Card>

        <Box p={1} />
        <UserMappingList />
      </Container>
    </Page>
  );
};

const mapStateToProps = (state) => {
  return {
    dashboard: state.dashboard,
  };
};

export default connect(mapStateToProps, null)(UserMappingPage);
