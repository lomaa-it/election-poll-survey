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

import SachivalayamList from "../sections/reports/SachivalayamList";
import { useEffect, useState } from "react";
import instance from "../utils/axios";
import {
  getAllConstituenciesRoute,
  getAllDistrictsRoute,
  getAllDivisionRoute,
  getAllMandalRoute,
  getAllStatesRoute,
  getAllSachivalayamRoute,
  createSachivalayamRoute,
} from "../utils/apis";
import { showAlert } from "../actions/alert";
import { set } from "date-fns";
import ApiServices from "../services/apiservices";

const Sachivalayam = ({ dashboard }) => {
  const [refresh, setRefresh] = useState(false);

  const [isLoading, setIsLoading] = useState(false);
  const [fetchedData, setFetchedData] = useState({
    states: [{}],
    district: [{}],
    consistency: [{}],
    mandal: [{}],
    division: [{}],
    sachivalayam: [{}],
  });

  const [selectedValues, setSelectedValues] = useState({
    state_id: "",
    district_id: "",
    consistency_id: "",
    mandal_id: "",
    division_id: "",
    sachivalayam_name: "",
  });

  useEffect(() => {
    const fecthOptionsData = async () => {
      try {
        /// get all states
        const statesResponse = await ApiServices.postRequest(getAllStatesRoute);
        // console.log("states", statesResponse.data.message);
        /// get all districts
        const districtsResponse = await ApiServices.postRequest(getAllDistrictsRoute);
        // console.log("districts", districtsResponse.data.message);

        /// get all constituencies
        const constituenciesResponse = await ApiServices.postRequest(
          getAllConstituenciesRoute
        );
        // console.log("constituencies", constituenciesResponse.data.message);

        /// get all mandals
        const mandalsResponse = await ApiServices.postRequest(getAllMandalRoute);
        // console.log("mandals", mandalsResponse.data.message);

        /// get all divisions
        const divisionsResponse = await ApiServices.postRequest(getAllDivisionRoute);
        // console.log("divisions", divisionsResponse.data.message);

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
        /// get all sachivalayam
        const sachivalayamResponse = await ApiServices.postRequest(
          getAllSachivalayamRoute
        );
        console.log("sachivalayam", sachivalayamResponse.data.message);

        /// state update
        setFetchedData((prevState) => ({
          ...prevState,

          sachivalayam: sachivalayamResponse.data.message,
        }));
      } catch (error) {
        console.log(error);
      }
    };
    fecthOptionsData();
  }, [refresh]);

  const handleSubmit = async () => {
    console.log("selectedValues", selectedValues);
    try {
      setIsLoading(true);
      const response = await ApiServices.postRequest(createSachivalayamRoute, {
        sachivalayam_name: selectedValues.sachivalayam_name,
        division_id: selectedValues.division_id,
      });
      console.log("created", response.data.message);
      showAlert({
        text: "Sachivalayam Created Successfully",
        color: "success",
      });
      setIsLoading(false);
      setSelectedValues((prevState) => ({
        ...prevState,
        state_id: "",
        district_id: "",
        consistency_id: "",
        division_id: "",
        mandal_id: "",
        sachivalayam_name: "",
      }));

      setRefresh((prevState) => !prevState);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  return (
    <Page title="Sachivalayam">
      <Container maxWidth="xl">
        {/* <Typography variant="h4" sx={{ mb: 1 }}>
          Sachivalayam
        </Typography> */}

        <Card sx={{ p: 3 }}>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} md={6} lg={9}>
              <SachivalayamList
                sachivalayamList={fetchedData.sachivalayam}
                fetchedData={fetchedData}
                setFetchedData={setFetchedData}
                selectedValues={selectedValues}
                setSelectedValues={setSelectedValues}
                refresh={refresh}
                setRefresh={setRefresh}
              />
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
                value={selectedValues.state_id}
                onChange={(e) => {
                  setSelectedValues((prevState) => ({
                    ...prevState,
                    state_id: e.target.value,
                    district_id: "",
                    consistency_id: "",
                    mandal_id: "",
                    division_id: "",
                  }));
                }}
              >
                {fetchedData.states.map((state) => {
                  return (
                    <MenuItem value={state.state_pk}>
                      {state.state_name}
                    </MenuItem>
                  );
                })}
              </TextField>
              <TextField
                size="small"
                label="Select District"
                fullWidth
                select
                value={selectedValues.district_id}
                onChange={(e) => {
                  setSelectedValues((prevState) => ({
                    ...prevState,
                    district_id: e.target.value,
                    consistency_id: "",
                    mandal_id: "",
                    division_id: "",
                  }));
                }}
              >
                {/* filter districk based on state_id */}
                {fetchedData.district
                  .filter(
                    (district) => district.state_id === selectedValues.state_id
                  )
                  .map((district) => {
                    return (
                      <MenuItem value={district.district_pk}>
                        {district.district_name}
                      </MenuItem>
                    );
                  })}
              </TextField>
              <TextField
                size="small"
                label="Select Constituency"
                fullWidth
                select
                value={selectedValues.consistency_id}
                onChange={(e) => {
                  setSelectedValues((prevState) => ({
                    ...prevState,
                    consistency_id: e.target.value,
                    mandal_id: "",
                    division_id: "",
                  }));
                }}
              >
                {/* filter constituency based on district_id */}
                {fetchedData.consistency
                  .filter(
                    (consistency) =>
                      consistency.district_pk === selectedValues.district_id
                  )
                  .map((consistency) => {
                    return (
                      <MenuItem value={consistency.consistency_pk}>
                        {consistency.consistency_name}
                      </MenuItem>
                    );
                  })}
              </TextField>
              <TextField
                size="small"
                label="Select Mandal"
                fullWidth
                select
                value={selectedValues.mandal_id}
                onChange={(e) => {
                  setSelectedValues((prevState) => ({
                    ...prevState,
                    mandal_id: e.target.value,
                    division_id: "",
                  }));
                }}
              >
                {/* filter mandal based on consistency_id */}
                {fetchedData.mandal
                  .filter(
                    (mandal) =>
                      mandal.consistency_id === selectedValues.consistency_id
                  )
                  .map((mandal) => {
                    return (
                      <MenuItem value={mandal.mandal_pk}>
                        {mandal.mandal_name}
                      </MenuItem>
                    );
                  })}
              </TextField>
              <TextField
                size="small"
                label="Select Division"
                fullWidth
                select
                value={selectedValues.division_id}
                onChange={(e) => {
                  setSelectedValues((prevState) => ({
                    ...prevState,
                    division_id: e.target.value,
                  }));
                }}
              >
                {/* filter division based on mandal_id */}
                {fetchedData.division
                  .filter(
                    (division) =>
                      division.mandal_id === selectedValues.mandal_id
                  )
                  .map((division) => {
                    return (
                      <MenuItem value={division.division_pk}>
                        {division.division_name}
                      </MenuItem>
                    );
                  })}
              </TextField>
              <TextField
                size="small"
                label="Sachivalayam Name"
                fullWidth
                value={selectedValues.sachivalayam_name}
                onChange={(e) => {
                  setSelectedValues((prevState) => ({
                    ...prevState,
                    sachivalayam_name: e.target.value,
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
  };
};

export default connect(mapStateToProps, null)(Sachivalayam);
