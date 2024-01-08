import { Grid, Container, Typography, Box, TextField, Card, MenuItem } from "@mui/material";
import Page from "../components/Page";
import { connect } from "react-redux";
import { LoadingButton } from "@mui/lab";
import Autocomplete from "@mui/material/Autocomplete";
import ViewUsersList from "../sections/reports/ViewUsersList";
import Button from "@mui/material/Button";
import MandalsList from "../sections/reports/MandalsList";
import { useEffect, useState } from "react";
import instance from "../utils/axios";
import { getAllMandalRoute, getAllStatesRoute, getAllDistrictsRoute, createMandalsRoute, getAllConstituenciesRoute } from "../utils/apis";
import { set } from "date-fns";
import { showAlert } from "../actions/alert";
import ApiServices from "../services/apiservices";

const MandalPage = ({ dashboard, showAlert, account }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [fetchedData, setFetchedData] = useState({
    states: [{}],
    district: [{}],
    consistency: [{}],
    mandal: [{}],
  });

  const [selectedValues, setSelectedValues] = useState({
    state_id: "",
    district_id: "",
    consistency_id: "",
    mandal_name: "",
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
        /// get all mandals
        const mandalsResponse = await ApiServices.postRequest(getAllMandalRoute);
        console.log("mandals", mandalsResponse.data.message);

        /// state update
        setFetchedData((prevState) => ({
          ...prevState,
          mandal: mandalsResponse.data.message,
        }));
      } catch (error) {
        console.log(error);
      }
    };
    fecthOptionsData();
  }, [refresh]);

  const handleSubmit = async () => {
    if (!selectedValues.district_id) {
      showAlert({ text: "Please Select District", color: "error" });
      return;
    }
    if (!selectedValues.consistency_id) {
      showAlert({ text: "Please Select Constituency", color: "error" });
      return;
    }
    if (!selectedValues.mandal_name) {
      showAlert({ text: "Please enter mandal name", color: "error" });
      return;
    }

    console.log(selectedValues);
    try {
      setIsLoading(true);
      const response = await ApiServices.postRequest(createMandalsRoute, {
        mandal_name: selectedValues.mandal_name,
        consistency_id: selectedValues.consistency_id,
      });
      showAlert({ text: "Mandal Created Successfully", color: "success" });

      console.log(response.data.message);
      setIsLoading(false);
      setSelectedValues((prevState) => ({
        ...prevState,
        state_id: "",
        district_id: "",
        consistency_id: "",
        mandal_name: "",
      }));
      setRefresh((prevState) => !prevState);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
      showAlert({ text: "Something went wrong", color: "error" });
      setRefresh((prevState) => !prevState);
    }
  };

  return (
    <Page title="Mandals">
      <Container maxWidth="xl">
        {/* <Typography variant="h4" sx={{ mb: 1 }}>
          Mandals
        </Typography> */}

        <Card sx={{ p: 3 }}>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} md={6} lg={9}>
              <MandalsList fetchedData={fetchedData} setFetchedData={setFetchedData} selectedValues={selectedValues} setSelectedValues={setSelectedValues} refresh={refresh} setRefresh={setRefresh} />
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
                    consistency_id: "",
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
                label="Mandal Name"
                fullWidth
                required
                value={selectedValues.mandal_name}
                onChange={(e) => {
                  setSelectedValues((prevState) => ({
                    ...prevState,
                    mandal_name: e.target.value,
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

export default connect(mapStateToProps, { showAlert })(MandalPage);
