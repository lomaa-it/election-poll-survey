import {
  Grid,
  Container,
  Typography,
  Box,
  TextField,
  Card,
  MenuItem,
} from "@mui/material";
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
import { RHFAutoComplete } from "../components/hook-form";
import { clearVoterReducer, getAllVotersSurvey } from "../actions/voter";
import { UncontrolledTextField } from "../components/hook-form/RHFTextField";

const ViewVoterPage = ({ dashboard }) => {
  const [votersData, setVotersData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [reset, setReset] = useState(false);
  const [filterValues, setFilterValues] = useState(null);
  const [part_slno, setPart_slno] = useState([]);

  useEffect(() => {
    clearVoterReducer();
  }, []);

  const handleSubmit = async (filterValues) => {
    await getAllVotersSurvey(filterValues);
  };

  const handleChange = (name, value) => {
    const values = {};

    values[name] = value;

    setFilterValues((state) => ({ ...state, ...values }));
  };

  return (
    <Page title="View Voter">
      <Container maxWidth="xl">
        {/* <Typography variant="h4" sx={{ mb: 1 }}>
          Voter List
        </Typography> */}

        <Card sx={{ p: 3, backgroundColor: searchFiltercolor }}>
          {/* <Typography sx={{ pb: 2 }}>Search by filter</Typography> */}

          <Grid container spacing={2} alignItems="center">
            <SearchByFilter
             onSubmit={handleSubmit}
              children={
                <>
                  <Grid item xs={12} md={6} lg={2}>
                    <UncontrolledTextField
                      name="part_slno"
                      label="Part SLNO"
                      value={filterValues?.part_slno}
                      onChange={handleChange}
                    />
                  </Grid>

                  <Grid item xs={12} md={6} lg={2}>
                    <UncontrolledTextField
                      name="voter_id"
                      label="Voter ID"
                      value={filterValues?.voter_id}
                      onChange={handleChange}
                    />
                  </Grid>
                </>
              }
            />
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
