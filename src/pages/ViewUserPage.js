import { Grid, Container, Typography, Box, TextField, Card } from "@mui/material";
import Page from "../components/Page";
import { connect } from "react-redux";
import { LoadingButton } from "@mui/lab";
import ViewUsersList from "../sections/reports/ViewUsersList";
import Button from "@mui/material/Button";
import { useEffect, useState } from "react";
import SearchByFilter from "../sections/common/SearchByFilter";
import { searchFiltercolor } from "../constants";
import { clearUserReducer, getAllUsers } from "../actions/user";

const ViewUserPage = ({ common, clearUserReducer, getAllUsers }) => {
  const [filterValues, setFilterValues] = useState(null);
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    clearUserReducer();
  }, []);

  const onSubmit = async () => {
    setLoading(true);

    await getAllUsers(filterValues);

    setLoading(false);
  };

  return (
    <Page title="User List">
      <Container maxWidth="xl">
        {/* <Typography variant="h4" sx={{ mb: 1 }}>
          User List
        </Typography> */}

        <Card sx={{ p: 3, backgroundColor: searchFiltercolor }}>
          {/* <Typography sx={{ pb: 2 }}>Search by filter</Typography> */}

          <Grid container spacing={2} alignItems="center">
            <SearchByFilter onChanged={(value) => setFilterValues(value)} />

            <Grid item xs={12} md={6} lg={2}>
              <TextField
                size="small"
                label="User Type"
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
              <LoadingButton loading={isLoading} variant="contained" onClick={onSubmit}>
                Search
              </LoadingButton>
            </Grid>
          </Grid>
        </Card>

        <Box p={1} />

        <ViewUsersList />
      </Container>
    </Page>
  );
};

const mapStateToProps = (state) => {
  return {
    common: state.common,
  };
};

export default connect(mapStateToProps, { clearUserReducer, getAllUsers })(ViewUserPage);
