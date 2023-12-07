import {
  Grid,
  Container,
  Typography,
  Box,
  TextField,
  Card,
  Stack,
  MenuItem,
} from "@mui/material";
import Page from "../components/Page";
import { connect } from "react-redux";
import { LoadingButton } from "@mui/lab";

import ViewUsersList from "../sections/reports/ViewUsersList";
import Button from "@mui/material/Button";
import VoterAndVolunteerMappingList from "../sections/reports/VoterAndVolunteerMappingList";
import VillagesList from "../sections/reports/VillagesList";
import { useEffect, useState } from "react";
import instance from "../utils/axios";
import {
  getAllConstituenciesRoute,
  getAllDistrictsRoute,
  getAllDivisionRoute,
  getAllMandalRoute,
  getAllPartsRoute,
  getAllSachivalayamRoute,
  getAllStatesRoute,
  getAllVillageRoute,
  createVillagesRoute,
} from "../utils/apis";
import { showAlert } from "../actions/alert";
import { set } from "date-fns/esm";

const VillagesPage = ({ dashboard }) => {
  const [refresh, setRefresh] = useState(false);

  const [isLoading, setIsLoading] = useState(false);
  const [fetchedData, setFetchedData] = useState({
    states: [{}],
    district: [{}],
    consistency: [{}],
    mandal: [{}],
    division: [{}],
    sachivalayam: [{}],
    part: [{}],
    village: [{}],
  });

  const [selectedValues, setSelectedValues] = useState({
    state_id: "",
    district_id: "",
    consistency_id: "",
    mandal_id: "",
    division_id: "",
    sachivalayam_id: "",
    part_no: "",
    village_name: "",
  });

  useEffect(() => {
    const fecthOptionsData = async () => {
      try {
        /// get all states
        const statesResponse = await instance.get(getAllStatesRoute);
        // console.log("states", statesResponse.data.message);
        /// get all districts
        const districtsResponse = await instance.get(getAllDistrictsRoute);
        // console.log("districts", districtsResponse.data.message);

        /// get all constituencies
        const constituenciesResponse = await instance.get(
          getAllConstituenciesRoute
        );
        // console.log("constituencies", constituenciesResponse.data.message);

        /// get all mandals
        const mandalsResponse = await instance.get(getAllMandalRoute);
        // console.log("mandals", mandalsResponse.data.message);

        /// get all divisions
        const divisionsResponse = await instance.get(getAllDivisionRoute);
        // console.log("divisions", divisionsResponse.data.message);

        /// get all sachivalayam
        const sachivalayamResponse = await instance.get(
          getAllSachivalayamRoute
        );
        // console.log("sachivalayam", sachivalayamResponse.data.message);

        /// get all parts
        const partsResponse = await instance.get(getAllPartsRoute);
        console.log("parts", partsResponse.data.message);

        /// state update
        setFetchedData((prevState) => ({
          ...prevState,
          states: statesResponse.data.message,
          district: districtsResponse.data.message,
          consistency: constituenciesResponse.data.message,
          mandal: mandalsResponse.data.message,
          division: divisionsResponse.data.message,
          sachivalayam: sachivalayamResponse.data.message,
          part: partsResponse.data.message,
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
        /// get all villages
        const villagesResponse = await instance.get(getAllVillageRoute);
        console.log("villages", villagesResponse.data.message);

        /// state update
        setFetchedData((prevState) => ({
          ...prevState,
          village: villagesResponse.data.message,
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
      const response = await instance.post(createVillagesRoute, {
        part_no: selectedValues.part_no,
        village_name: selectedValues.village_name,
      });
      console.log("response", response.data.message);
      showAlert({
        text: "Part No Added Successfully",
        color: "success",
      });
      setIsLoading(false);

      setSelectedValues((prevState) => ({
        ...prevState,
        state_id: "",
        district_id: "",
        consistency_id: "",
        mandal_id: "",
        division_id: "",
        sachivalayam_id: "",
        part_no: "",
        village_name: "",
      }));

      setRefresh((prevState) => !prevState);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
      setRefresh((prevState) => !prevState);
    }
  };

  return (
    <Page title="View User">
      <Container maxWidth="xl">
        <Typography variant="h4" sx={{ mb: 1 }}>
          Villages
        </Typography>

        <Card sx={{ p: 3 }}>
          <Typography sx={{ pb: 2 }}>Add Village</Typography>

          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} md={6} lg={2}>
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
                    sachivalayam_id: "",
                    part_no: "",
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
            </Grid>
            <Grid item xs={12} md={6} lg={2}>
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
                    sachivalayam_id: "",
                    part_no: "",
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
            </Grid>
            <Grid item xs={12} md={6} lg={2}>
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
                    sachivalayam_id: "",
                    part_no: "",
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
            </Grid>
            <Grid item xs={12} md={6} lg={2}>
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
                    sachivalayam_id: "",
                    part_no: "",
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
            </Grid>
            <Grid item xs={12} md={6} lg={2}>
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
                    sachivalayam_id: "",
                    part_no: "",
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
            </Grid>
            <Grid item xs={12} md={6} lg={2}>
              <TextField
                size="small"
                label="Select Sachivalayam "
                fullWidth
                select
                value={selectedValues.sachivalayam_id}
                onChange={(e) => {
                  setSelectedValues((prevState) => ({
                    ...prevState,
                    sachivalayam_id: e.target.value,
                    part_no: "",
                  }));
                }}
              >
                {/* filter sachivalayam based on division_id */}
                {fetchedData.sachivalayam
                  .filter(
                    (sachivalayam) =>
                      sachivalayam.division_id === selectedValues.division_id
                  )
                  .map((sachivalayam) => {
                    return (
                      <MenuItem value={sachivalayam.sachivalayam_pk}>
                        {sachivalayam.sachivalayam_name}
                      </MenuItem>
                    );
                  })}
              </TextField>
            </Grid>
            <Grid item xs={12} md={6} lg={2}>
              <TextField
                size="small"
                label="Select Part"
                fullWidth
                select
                value={selectedValues.part_no}
                onChange={(e) => {
                  setSelectedValues((prevState) => ({
                    ...prevState,
                    part_no: e.target.value,
                  }));
                }}
              >
                {/* filter part based on sachivalayam_id */}
                {fetchedData.part
                  .filter(
                    (part) =>
                      part.sachivalayam_id === selectedValues.sachivalayam_id
                  )
                  .map((part) => {
                    return (
                      <MenuItem value={part.part_no}>{part.part_no}</MenuItem>
                    );
                  })}
              </TextField>
            </Grid>
            <Grid item xs={12} md={6} lg={2}>
              <TextField
                size="small"
                label="Village Name"
                fullWidth
                value={selectedValues.village_name}
                onChange={(e) => {
                  setSelectedValues((prevState) => ({
                    ...prevState,
                    village_name: e.target.value,
                  }));
                }}
              />
            </Grid>
            <Grid item xs={12} md={6} lg={2}>
              <LoadingButton
                loading={isLoading}
                onClick={handleSubmit}
                variant="contained"
              >
                Add
              </LoadingButton>
            </Grid>
          </Grid>
        </Card>

        <Box p={1} />

        <VillagesList villageList={fetchedData.village} />
      </Container>
    </Page>
  );
};

const mapStateToProps = (state) => {
  return {
    dashboard: state.dashboard,
  };
};

export default connect(mapStateToProps, null)(VillagesPage);
