import { Grid, Container, Typography, Box, TextField, Card } from "@mui/material";
import Page from "../components/Page";
import { connect } from "react-redux";
import { LoadingButton } from "@mui/lab";

import ViewUsersList from "../sections/reports/ViewUsersList";
import Button from "@mui/material/Button";
import PartiesList from "../sections/reports/PartiesList";

const PartiesPage = ({ dashboard }) => {
  return (
    <Page title="View User">
      <Container maxWidth="xl">
        <Typography variant="h4" sx={{ mb: 1 }}>
          Parties
        </Typography>

        <Card sx={{ p: 3 }}>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} md={6} lg={9}>
              <PartiesList />
            </Grid>
            <Grid
              item
              xs={12}
              md={6}
              lg={3}
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: "15px",
              }}
            >
              <TextField size="small" label="Sequence Number" fullWidth /> <TextField size="small" label="Party Name" fullWidth />
              <LoadingButton
                variant="contained"
                sx={{
                  padding: "15px",
                }}
              >
                Add
              </LoadingButton>
            </Grid>
          </Grid>
        </Card>

        <Box p={1} />
      </Container>
    </Page>
  );
};

const mapStateToProps = (state) => {
  return {
    dashboard: state.dashboard,
  };
};

export default connect(mapStateToProps, null)(PartiesPage);
