import { Grid, Container, Typography, Box, TextField, Card, MenuItem } from "@mui/material";
import Page from "../components/Page";
import { connect } from "react-redux";
import { LoadingButton } from "@mui/lab";

import ViewUsersList from "../sections/reports/ViewUsersList";
import Button from "@mui/material/Button";

import DivisionList from "../sections/reports/DivisionList";
import { useEffect, useState } from "react";
import instance from "../utils/axios";
import { getAllConstituenciesRoute, getAllDistrictsRoute, getAllMandalRoute, getAllStatesRoute, getAllDivisionRoute, createDivisionsRoute } from "../utils/apis";
import { showAlert } from "../actions/alert";
import ApiServices from "../services/apiservices";

const DivisionPage = ({ dashboard, showAlert, account }) => {
  const [refresh, setRefresh] = useState(false);

  const [isLoading, setIsLoading] = useState(false);
  const [fetchedData, setFetchedData] = useState({
    states: [{}],
    district: [{}],
    consistency: [{}],
    mandal: [{}],
    division: [{}],
  });

  const [selectedValues, setSelectedValues] = useState({
    state_id: "",
    district_id: "",
    consistency_id: "",
    mandal_id: "",
    division_name: "",
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

        /// get all mandals
        const mandalsResponse = await ApiServices.postRequest(getAllMandalRoute);
        console.log("mandals", mandalsResponse.data.message);

        /// get all divisions
        const divisionsResponse = await ApiServices.postRequest(getAllDivisionRoute);
        console.log("divisions", divisionsResponse.data.message);

        /// state update
        setFetchedData((prevState) => ({
          ...prevState,
          states: statesResponse.data.message,
          district: districtsResponse.data.message,
          consistency: constituenciesResponse.data.message,
          mandal: mandalsResponse.data.message,
          division: divisionsResponse.data.message,
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
        /// get all divisions
        const divisionsResponse = await ApiServices.postRequest(getAllDivisionRoute);
        console.log("divisions", divisionsResponse.data.message);

        /// state update
        setFetchedData((prevState) => ({
          ...prevState,

          division: divisionsResponse.data.message,
        }));
      } catch (error) {
        console.log(error);
      }
    };
    fecthOptionsData();
  }, [refresh]);

  const handleSubmit = async () => {
    if (!selectedValues.district_id) {
      showAlert({ text: "Please select district", color: "error" });
      return;
    }

    if (!selectedValues.consistency_id) {
      showAlert({ text: "Please select constituency", color: "error" });
      return;
    }

    if (!selectedValues.mandal_id) {
      showAlert({ text: "Please select mandal", color: "error" });
      return;
    }

    if (!selectedValues.division_name) {
      showAlert({ text: "Please enter division name", color: "error" });
      return;
    }

    console.log(selectedValues);
    try {
      setIsLoading(true);
      const response = await ApiServices.postRequest(createDivisionsRoute, {
        division_name: selectedValues.division_name,
        mandal_id: selectedValues.mandal_id,
      });

      console.log(response.data.message);
      showAlert({ text: "Division Created Successfully", color: "success" });
      setIsLoading(false);

      setSelectedValues((prevState) => ({
        ...prevState,
        state_id: "",
        district_id: "",
        consistency_id: "",
        mandal_id: "",
        division_name: "",
      }));
      setRefresh((prevState) => !prevState);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
      setRefresh((prevState) => !prevState);
    }
  };

  return (
    <Page title="Divisions">
      <Container maxWidth="xl">
        {/* <Typography variant="h4" sx={{ mb: 1 }}>
          Division
        </Typography> */}

        <Card sx={{ p: 3 }}>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} md={6} lg={9}>
              <DivisionList fetchedData={fetchedData} setFetchedData={setFetchedData} selectedValues={selectedValues} setSelectedValues={setSelectedValues} refresh={refresh} setRefresh={setRefresh} />
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
                value={account.user.state_pk}
                onChange={(e) => {
                  setSelectedValues((prevState) => ({
                    ...prevState,
                    state_id: e.target.value,
                    district_id: "",
                    consistency_id: "",
                    mandal_id: "",
                  }));
                }}
                disabled
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
                    consistency_id: "",
                    mandal_id: "",
                  }));
                }}
              >
                {/* filter districk based on state_id */}
                {fetchedData.district
                  .filter((district) => district.state_id === account.user.state_pk)
                  .map((district) => {
                    return <MenuItem value={district.district_pk}>{district.district_name}</MenuItem>;
                  })}
              </TextField>
              <TextField
                size="small"
                label="Select Constituency"
                fullWidth
                required
                select
                value={selectedValues.consistency_id}
                onChange={(e) => {
                  setSelectedValues((prevState) => ({
                    ...prevState,
                    consistency_id: e.target.value,
                    mandal_id: "",
                  }));
                }}
              >
                {/* filter constituency based on district_id */}
                {fetchedData.consistency
                  .filter((consistency) => consistency.district_pk === selectedValues.district_id)
                  .map((consistency) => {
                    return <MenuItem value={consistency.consistency_pk}>{consistency.consistency_name}</MenuItem>;
                  })}
              </TextField>
              <TextField
                size="small"
                label="Select Mandal"
                fullWidth
                required
                select
                value={selectedValues.mandal_id}
                onChange={(e) => {
                  setSelectedValues((prevState) => ({
                    ...prevState,
                    mandal_id: e.target.value,
                  }));
                }}
              >
                {/* filter mandal based on consistency_id */}
                {fetchedData.mandal
                  .filter((mandal) => mandal.consistency_id === selectedValues.consistency_id)
                  .map((mandal) => {
                    return <MenuItem value={mandal.mandal_pk}>{mandal.mandal_name}</MenuItem>;
                  })}
              </TextField>

              <TextField
                size="small"
                label="Division Name"
                fullWidth
                required
                value={selectedValues.division_name}
                onChange={(e) => {
                  setSelectedValues((prevState) => ({
                    ...prevState,
                    division_name: e.target.value,
                  }));
                }}
              />
              <LoadingButton
                loading={isLoading}
                onClick={handleSubmit}
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
    account: state.auth,
  };
};

export default connect(mapStateToProps, { showAlert })(DivisionPage);
