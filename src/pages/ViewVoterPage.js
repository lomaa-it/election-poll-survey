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

const ViewVoterPage = ({ dashboard }) => {
  const [votersData, setVotersData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [reset, setReset] = useState(false);
  const [filterValues, setFilterValues] = useState(null);

  useEffect(() => {
    setIsLoading(true);

    const getVotersData = async () => {
      try {
        console.log("api started");
        const response = await instance.post(getAllVotersRoute);
        const responseData = response.data.message;

        console.log("data", responseData);

        const filterData = responseData.map((item) => {
          let genderName = "";
          if (item.gender === 13) {
            genderName = "Male";
          }
          if (item.gender === 14) {
            genderName = "Male";
          }
          if (item.gender === 15) {
            genderName = "Male";
          }

          return [
            item.voter_id,
            item.part_slno,
            item.voter_name,
            item.guardian_name,
            genderName,
            item.is_resident != null ? "Yes" : "No",
            item.phone_no,
            item.age,
          ];
        });
        setVotersData(filterData);
        setIsLoading(false);
      } catch (error) {
        console.log("error", error);
      }
    };
    getVotersData();
  }, []);

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
              reset={reset}
              onChanged={(value) => setFilterValues(value)}
            />

            <Grid item xs={12} md={6} lg={2}>
              <RHFAutoComplete
                key={reset} // add this line
                name="part_slno"
                label="Part SLNO"
                value={filterValues?.part_slno}
                onChange={handleChange}
                options={[
                  { value: "1", label: "1" },
                  { value: "2", label: "2" },
                  { value: "3", label: "3" },
                ]}
              />
            </Grid>

            <Grid item xs={12} md={6} lg={2}>
              <RHFAutoComplete
                key={reset} // add this line
                name="voter_id"
                label="Voter ID"
                value={filterValues?.voter_id}
                onChange={handleChange}
                options={[
                  { value: "1", label: "1" },
                  { value: "2", label: "2" },
                  { value: "3", label: "3" },
                ]}
              />
            </Grid>

            <Grid item xs={12} md={6} lg={2}>
              <LoadingButton variant="contained">Search</LoadingButton>
              <LoadingButton
                loading={isLoading}
                variant="contained"
                sx={{
                  backgroundColor: "red",
                  marginLeft: "15px",
                }}
                onClick={() => {
                  setReset(!reset);
                }}
              >
                Clear
              </LoadingButton>
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
