import { Grid, Container, Typography, Box, TextField, Card, MenuItem } from "@mui/material";
import Page from "../components/Page";
import { connect } from "react-redux";
import { LoadingButton } from "@mui/lab";
import Autocomplete from "@mui/material/Autocomplete";
import ViewUsersList from "../sections/reports/ViewUsersList";
import Button from "@mui/material/Button";
import ConstituenciesList from "../sections/reports/ConstituenciesList";
import { useEffect, useState } from "react";
import { getAllStatesRoute, getAllConstituenciesWithJoinRoute, createConstituenciesRoute, getAllDistrictsRoute, getAllConstituenciesRoute } from "../utils/apis";

import { showAlert } from "../actions/alert";
import { set } from "date-fns";
import ApiServices from "../services/apiservices";

const ConstituenciesPage = ({ dashboard, showAlert }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [fetchedData, setFetchedData] = useState({
    states: [{}],
    district: [{}],
    consistency: [{}],
  });

  const [selectedValues, setSelectedValues] = useState({
    state_id: "",
    district_id: "",
    consistency_name: "",
  });

  useEffect(() => {
    const fecthOptionsData = async () => {
      try {
        /// get all states
        const statesResponse = await ApiServices.postRequest(getAllStatesRoute);
        console.log("states", statesResponse.data.message);
        /// get all districts
        const districtsResponse = await ApiServices.postRequest(getAllDistrictsRoute);
        console.log("districts", districtsResponse.data.message);

        /// get all constituencies
        const constituenciesResponse = await ApiServices.postRequest(getAllConstituenciesRoute);
        console.log("constituencies", constituenciesResponse.data.message);

        /// state update
        setFetchedData((prevState) => ({
          ...prevState,
          states: statesResponse.data.message,
          district: districtsResponse.data.message,
          consistency: constituenciesResponse.data.message,
        }));
      } catch (error) {
        console.log(error);
      }
    };
    fecthOptionsData();
  }, []);

  useEffect(() => {
    const fecthOptionsData = async () => {
      try {
        /// get all constituencies
        const constituenciesResponse = await ApiServices.postRequest(getAllConstituenciesRoute);
        console.log("constituencies", constituenciesResponse.data.message);

        /// state update
        setFetchedData((prevState) => ({
          ...prevState,
          consistency: constituenciesResponse.data.message,
        }));
      } catch (error) {
        console.log(error);
      }
    };
    fecthOptionsData();
  }, [refresh]);

  const handleSubmit = async () => {
    if (!selectedValues.state_id) {
      showAlert({ text: "Please Select State", color: "error" });
      return;
    }

    if (!selectedValues.district_id) {
      showAlert({ text: "Please Select District", color: "error" });
      return;
    }

    if (!selectedValues.consistency_name) {
      showAlert({ text: "Please Enter Constituency Name", color: "error" });
      return;
    }

    console.log(selectedValues);

    try {
      setIsLoading(true);
      const response = await ApiServices.postRequest(createConstituenciesRoute, {
        consistency_name: selectedValues.consistency_name,
        district_pk: selectedValues.district_id,
      });
      console.log("response", response);
      setIsLoading(false);
      setRefresh(!refresh);
      showAlert({ text: "Constituency Added Successfully", color: "success" });
      setSelectedValues((prevState) => ({
        ...prevState,
        state_id: "",
        district_id: "",
        consistency_name: "",
      }));
    } catch (error) {
      console.log(error);
      setIsLoading(false);
      showAlert({ text: "Something went wrong", color: "error" });
    }
  };

  return (
    <Page title="Constituencies">
      <Container maxWidth="xl">
        {/* <Typography variant="h4" sx={{ mb: 1 }}>
          Constituencies
        </Typography> */}

        <Card sx={{ p: 3 }}>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} md={6} lg={9}>
              <ConstituenciesList fetchedData={fetchedData} setFetchedData={setFetchedData} selectedValues={selectedValues} setSelectedValues={setSelectedValues} refresh={refresh} setRefresh={setRefresh} />
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
              <TextField
                size="small"
                label="Select State"
                fullWidth
                select
                required
                value={selectedValues.state_id}
                onChange={(e) => {
                  setSelectedValues((prevState) => ({
                    ...prevState,
                    state_id: e.target.value,
                    district_id: "",
                  }));
                }}
              >
                {fetchedData.states.map((state) => {
                  return <MenuItem value={state.state_pk}>{state.state_name}</MenuItem>;
                })}
              </TextField>
              <TextField
                size="small"
                label="Select District"
                fullWidth
                required
                select
                value={selectedValues.district_id}
                onChange={(e) => {
                  setSelectedValues((prevState) => ({
                    ...prevState,
                    district_id: e.target.value,
                  }));
                }}
              >
                {/* filter districk based on state_id */}
                {fetchedData.district
                  .filter((district) => district.state_id === selectedValues.state_id)
                  .map((district) => {
                    return <MenuItem value={district.district_pk}>{district.district_name}</MenuItem>;
                  })}
              </TextField>
              <TextField
                size="small"
                label="Constituency Name"
                fullWidth
                value={selectedValues.consistency_name}
                onChange={(event) => {
                  setSelectedValues((prevState) => ({
                    ...prevState,
                    consistency_name: event.target.value,
                  }));
                }}
              />
              <LoadingButton
                loading={isLoading}
                variant="contained"
                sx={{
                  padding: "15px",
                }}
                onClick={handleSubmit}
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

export default connect(mapStateToProps, { showAlert })(ConstituenciesPage);
