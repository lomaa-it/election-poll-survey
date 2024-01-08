import { Grid, Container, Typography, Box, TextField, Card, MenuItem } from "@mui/material";
import Page from "../components/Page";
import { connect } from "react-redux";
import { LoadingButton } from "@mui/lab";
import Autocomplete from "@mui/material/Autocomplete";

import ViewUsersList from "../sections/reports/ViewUsersList";
import Button from "@mui/material/Button";
import DistrictsList from "../sections/reports/DistrictsList";
import { useEffect, useState } from "react";
import { getAllDistrictsWithJoinRoute, getAllStatesRoute, createDistrictsRoute, getAllDistrictsRoute } from "../utils/apis";

import { showAlert } from "../actions/alert";
import ApiServices from "../services/apiservices";

const DistrictsPage = ({ dashboard, showAlert, account }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [fetchedData, setFetchedData] = useState({
    states: [{}],
    district: [{}],
  });

  const [selectedValues, setSelectedValues] = useState({
    state_id: "",
    district_name: "",
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

        /// state update
        setFetchedData((prevState) => ({
          ...prevState,
          states: statesResponse.data.message,
          district: districtsResponse.data.message,
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
        /// get all districts
        const districtsResponse = await ApiServices.postRequest(getAllDistrictsRoute);
        console.log("districts", districtsResponse.data.message);

        /// state update
        setFetchedData((prevState) => ({
          ...prevState,
          district: districtsResponse.data.message,
        }));
      } catch (error) {
        console.log(error);
      }
    };
    fecthOptionsData();
  }, [refresh]);

  const handleSubmit = async () => {
    if (!selectedValues.district_name) {
      showAlert({ text: "Please enter district name", color: "error" });

      return;
    }

    try {
      setIsLoading(true);
      const response = await ApiServices.postRequest(createDistrictsRoute, {
        state_id: account.user.state_pk,
        district_name: selectedValues.district_name,
      });

      setIsLoading(false);
      showAlert({ text: "District Added Successfully", color: "success" });
      setRefresh((prevState) => !prevState);
      setSelectedValues({
        state_id: "",
        district_name: "",
      });
    } catch (error) {
      console.log(error);
      showAlert({ text: "District Not Added", color: "error" });
      setIsLoading(false);
      setRefresh((prevState) => !prevState);
    }
  };

  console.log("fetchedData", fetchedData);
  return (
    <Page title="Districts">
      <Container maxWidth="xl">
        {/* <Typography variant="h4" sx={{ mb: 1 }}>
          Districts
        </Typography> */}

        <Card sx={{ p: 3 }}>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} md={6} lg={9}>
              <DistrictsList fetchedData={fetchedData} setFetchedData={setFetchedData} selectedValues={selectedValues} setSelectedValues={setSelectedValues} refresh={refresh} setRefresh={setRefresh} />
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
                value={account.user.state_pk}
                onChange={(e) => {
                  setSelectedValues((prevState) => ({
                    ...prevState,
                    state_id: e.target.value,
                    district_id: "",
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
                label="District Name"
                fullWidth
                value={selectedValues.district_name}
                onChange={(e) => {
                  setSelectedValues((prevState) => ({
                    ...prevState,
                    district_name: e.target.value,
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
    account: state.auth,
  };
};

export default connect(mapStateToProps, { showAlert })(DistrictsPage);
