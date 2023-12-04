import { Grid, Container, Typography, Box, TextField, Card, MenuItem } from "@mui/material";
import Page from "../components/Page";
import { connect } from "react-redux";
import { LoadingButton } from "@mui/lab";

import CircularProgress from "@mui/material/CircularProgress";
import ViewVotersList from "../sections/reports/ViewVotersList";
import Button from "@mui/material/Button";
import { useState, useEffect } from "react";
import { getAllVotersRoute } from "../utils/apis";
import instance from "../utils/axios";
import { ageDropdown } from "../utils/dropdownconstants";
import SearchByFilter from "../sections/common/SearchByFilter";
import { searchFiltercolor } from "../constants";

const ViewVoterPage = ({ dashboard }) => {
  const [votersData, setVotersData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);

    const getVotersData = async () => {
      try {
        console.log("api started");
        const response = await instance.get(getAllVotersRoute);
        const responseData = response.data.message;

        console.log("data", responseData);

        const filterData = responseData.map((item) => {
          return [item.voter_id, " ", item.voter_name, item.guardian_name, "Male", item.is_resident != null ? "Yes" : "No", item.phone_no, item.age];
        });
        setVotersData(filterData);
        setIsLoading(false);
      } catch (error) {
        console.log("error", error);
      }
    };
    getVotersData();
  }, []);

  return (
    <Page title="View User">
      <Container maxWidth="xl">
        <Typography variant="h4" sx={{ mb: 1 }}>
          Voter List
        </Typography>

        <Card sx={{ p: 3, backgroundColor: searchFiltercolor }}>
          <Typography sx={{ pb: 2 }}>Search by filter</Typography>

          <Grid container spacing={2} alignItems="center">
            <SearchByFilter />

            <Grid item xs={12} md={6} lg={2}>
              <TextField
                size="small"
                label="Part SLNO"
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
              <LoadingButton variant="contained">Search</LoadingButton>
            </Grid>
          </Grid>
        </Card>

        <Box p={1} />

        {isLoading ? (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",

              height: "100vh",
            }}
          >
            <CircularProgress />
          </Box>
        ) : (
          <ViewVotersList votersData={votersData} />
        )}

        <Card sx={{ p: 3, marginTop: "10px" }}>
          <Grid container spacing={2} alignItems="center">
            <Grid
              item
              xs={12}
              md={6}
              lg={3}
              sx={{
                display: "flex",
              }}
            >
              <Button
                variant="outlined"
                sx={{
                  marginRight: "10px",
                  padding: "10px 35px",
                }}
              >
                Add
              </Button>
              <Button variant="outlined">Upload</Button>
            </Grid>
          </Grid>
        </Card>
      </Container>
    </Page>
  );
};

const mapStateToProps = (state) => {
  return {
    dashboard: state.dashboard,
  };
};

export default connect(mapStateToProps, null)(ViewVoterPage);
