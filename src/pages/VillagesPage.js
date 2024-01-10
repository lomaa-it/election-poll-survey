import { Grid, Container, Typography, Box, TextField, Card, Stack, MenuItem } from "@mui/material";
import Page from "../components/Page";
import { connect } from "react-redux";
import { LoadingButton } from "@mui/lab";

import VillagesList from "../sections/reports/VillagesList";
import { useEffect, useState, useRef } from "react";
import { getAllConstituenciesRoute, getAllDistrictsRoute, getAllDivisionRoute, getAllMandalRoute, getAllPartsRoute, getAllSachivalayamRoute, getAllStatesRoute, getAllVillageRoute, createVillagesRoute } from "../utils/apis";
import { showAlert } from "../actions/alert";
import ApiServices from "../services/apiservices";

const VillagesPage = ({ account, showAlert }) => {
  const [fetchLoading, setFetchLoading] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [isEditState, setEditState] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [fetchedData, setFetchedData] = useState({
    states: [],
    district: [],
    consistency: [],
    mandal: [],
    division: [],
    sachivalayam: [],
    part: [],
    village: [],
  });

  const [formValues, setFormValues] = useState({
    district_id: "",
    consistency_id: "",
    mandal_id: "",
    division_id: "",
    sachivalayam_id: "",
    part_no: "",
    village_name: "",
  });

  const inputFieldRef = useRef();

  useEffect(() => {
    if (isEditState) {
      inputFieldRef.current.focus();
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [isFocused, isEditState]);

  useEffect(() => {
    fecthOptionsData();
    fecthVillageData();
  }, []);

  const fecthOptionsData = async () => {
    try {
      /// get all states
      const statesResponse = await ApiServices.postRequest(getAllStatesRoute);
      // console.log("states", statesResponse.data.message);
      /// get all districts
      const districtsResponse = await ApiServices.postRequest(getAllDistrictsRoute);
      // console.log("districts", districtsResponse.data.message);

      /// get all constituencies
      const constituenciesResponse = await ApiServices.postRequest(getAllConstituenciesRoute);
      // console.log("constituencies", constituenciesResponse.data.message);

      /// get all mandals
      const mandalsResponse = await ApiServices.postRequest(getAllMandalRoute);
      // console.log("mandals", mandalsResponse.data.message);

      /// get all divisions
      const divisionsResponse = await ApiServices.postRequest(getAllDivisionRoute);
      // console.log("divisions", divisionsResponse.data.message);

      /// get all sachivalayam
      const sachivalayamResponse = await ApiServices.postRequest(getAllSachivalayamRoute);
      // console.log("sachivalayam", sachivalayamResponse.data.message);

      /// get all parts
      const partsResponse = await ApiServices.postRequest(getAllPartsRoute);
      // console.log("parts", partsResponse.data.message);

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

  const fecthVillageData = async () => {
    setFetchLoading(true);
    try {
      const villagesResponse = await ApiServices.postRequest(getAllVillageRoute);

      setFetchedData((prevState) => ({
        ...prevState,
        village: villagesResponse.data?.message ?? [],
      }));
    } catch (error) {
      console.log(error);
    }
    setFetchLoading(false);
  };

  const handleEdit = async (data) => {
    setEditState(true);
    setIsFocused((prevState) => !prevState);

    console.log("data", data);

    setFormValues({
      village_id: data.village_id,
      district_id: data.district_id,
      consistency_id: data.consistency_id,
      mandal_id: data.mandal_id,
      division_id: data.division_id,
      sachivalayam_id: data.sachivalayam_id,
      part_no: data.part_no,
      village_name: data.village_name,
    });
  };

  const handleSubmit = async () => {
    console.log("formValues", formValues);

    if (!formValues.district_id) {
      showAlert({ text: "Please select district", color: "error" });
      return;
    }

    if (!formValues.consistency_id) {
      showAlert({ text: "Please select constituency", color: "error" });
      return;
    }

    if (!formValues.mandal_id) {
      showAlert({ text: "Please select mandal", color: "error" });
      return;
    }

    if (!formValues.division_id) {
      showAlert({ text: "Please select division", color: "error" });
      return;
    }

    if (!formValues.sachivalayam_id) {
      showAlert({ text: "Please select sachivalayam", color: "error" });
      return;
    }

    if (!formValues.part_no) {
      showAlert({ text: "Please select part", color: "error" });
      return;
    }

    if (!formValues.village_name) {
      showAlert({ text: "Please enter village name", color: "error" });
      return;
    }

    setLoading(true);

    var body = {
      part_no: formValues.part_no,
      village_name: formValues.village_name,
    };

    if (!isEditState) {
      await addVillage(body);
    } else {
      await updateVillage(formValues.village_id, body);
    }

    setLoading(false);
  };

  const handleReset = () => {
    setEditState(false);
    setFormValues({
      district_id: "",
      consistency_id: "",
      mandal_id: "",
      division_id: "",
      sachivalayam_id: "",
      part_no: "",
      village_name: "",
    });
  };

  const addVillage = async (data) => {
    try {
      await ApiServices.postRequest(createVillagesRoute, data);

      showAlert({
        text: "Village Created Successfully",
        color: "success",
      });

      fecthVillageData();
      handleReset();
    } catch (error) {
      console.log(error);
      showAlert({ text: "Village Creation Failed" });
    }
  };

  const updateVillage = async (id, data) => {
    try {
      await ApiServices.putRequest(`${createVillagesRoute}${id}`, data);

      showAlert({
        text: "Village Updated Successfully",
        color: "success",
      });

      fecthVillageData();
      handleReset();
    } catch (error) {
      console.log(error);
      showAlert({ text: "Village Updation Failed" });
    }
  };

  return (
    <Page title="Villages">
      <Container maxWidth="xl">
        <Card sx={{ p: 3 }}>
          <Typography sx={{ pb: 2 }}>{isEditState ? "Edit Village" : "Add Village"}</Typography>

          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} md={6} lg={2}>
              <TextField
                size="small"
                label="Select State"
                fullWidth
                select
                value={account.user.state_pk}
                onChange={(e) => {
                  setFormValues((prevState) => ({
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
                disabled
              >
                {fetchedData.states.map((item, index) => (
                  <MenuItem key={index} value={item.state_pk}>
                    {item.state_name}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={12} md={6} lg={2}>
              <TextField
                size="small"
                label="Select District"
                fullWidth
                select
                value={formValues.district_id}
                onChange={(e) => {
                  setFormValues((prevState) => ({
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
                  .filter((district) => district.state_id === account.user.state_pk)
                  .map((district, index) => {
                    return (
                      <MenuItem key={index} value={district.district_id}>
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
                value={formValues.consistency_id}
                onChange={(e) => {
                  setFormValues((prevState) => ({
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
                  .filter((consistency) => consistency.district_id === formValues.district_id)
                  .map((consistency, index) => {
                    return (
                      <MenuItem key={index} value={consistency.consistency_id}>
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
                value={formValues.mandal_id}
                onChange={(e) => {
                  setFormValues((prevState) => ({
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
                  .filter((mandal) => mandal.consistency_id === formValues.consistency_id)
                  .map((mandal, index) => {
                    return (
                      <MenuItem key={index} value={mandal.mandal_id}>
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
                value={formValues.division_id}
                onChange={(e) => {
                  setFormValues((prevState) => ({
                    ...prevState,
                    division_id: e.target.value,
                    sachivalayam_id: "",
                    part_no: "",
                  }));
                }}
              >
                {/* filter division based on mandal_id */}
                {fetchedData.division
                  .filter((division) => division.mandal_id === formValues.mandal_id)
                  .map((division, index) => {
                    return (
                      <MenuItem key={index} value={division.division_id}>
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
                value={formValues.sachivalayam_id}
                onChange={(e) => {
                  setFormValues((prevState) => ({
                    ...prevState,
                    sachivalayam_id: e.target.value,
                    part_no: "",
                  }));
                }}
              >
                {/* filter sachivalayam based on division_id */}
                {fetchedData.sachivalayam
                  .filter((sachivalayam) => sachivalayam.division_id === formValues.division_id)
                  .map((sachivalayam, index) => {
                    return (
                      <MenuItem key={index} value={sachivalayam.sachivalayam_id}>
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
                value={formValues.part_no}
                onChange={(e) => {
                  setFormValues((prevState) => ({
                    ...prevState,
                    part_no: e.target.value,
                  }));
                }}
              >
                {/* filter part based on sachivalayam_id */}
                {fetchedData.part
                  .filter((part) => part.sachivalayam_id === formValues.sachivalayam_id)
                  .map((part) => {
                    return <MenuItem value={part.part_no}>{part.part_no}</MenuItem>;
                  })}
              </TextField>
            </Grid>
            <Grid item xs={12} md={6} lg={2}>
              <TextField
                inputRef={inputFieldRef}
                size="small"
                label="Village Name"
                fullWidth
                value={formValues.village_name}
                onChange={(e) => {
                  setFormValues((prevState) => ({
                    ...prevState,
                    village_name: e.target.value,
                  }));
                }}
              />
            </Grid>
            <Grid item xs={12} md={6} lg={2}>
              {!isEditState && (
                <LoadingButton loading={isLoading} onClick={handleSubmit} variant="contained">
                  Add
                </LoadingButton>
              )}

              {isEditState && (
                <Stack direction="row" spacing={1}>
                  <LoadingButton loading={isLoading} onClick={handleSubmit} variant="contained">
                    Update
                  </LoadingButton>

                  <LoadingButton loading={isLoading} onClick={handleReset} variant="contained">
                    Cancel
                  </LoadingButton>
                </Stack>
              )}
            </Grid>
          </Grid>
        </Card>

        <Box p={1} />

        <VillagesList loading={fetchLoading} villageList={fetchedData.village} handleEdit={handleEdit} />
      </Container>
    </Page>
  );
};

const mapStateToProps = (state) => {
  return {
    account: state.auth,
  };
};

export default connect(mapStateToProps, { showAlert })(VillagesPage);
