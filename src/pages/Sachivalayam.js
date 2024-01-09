import { Grid, Container, Typography, Box, TextField, Card, Stack, MenuItem } from "@mui/material";
import Page from "../components/Page";
import { connect } from "react-redux";
import { LoadingButton } from "@mui/lab";

import SachivalayamList from "../sections/reports/SachivalayamList";
import { useEffect, useState } from "react";
import instance from "../utils/axios";
import { getAllConstituenciesRoute, getAllDistrictsRoute, getAllDivisionRoute, getAllMandalRoute, getAllStatesRoute, getAllSachivalayamRoute, createSachivalayamRoute } from "../utils/apis";
import { showAlert } from "../actions/alert";
import { set } from "date-fns";
import ApiServices from "../services/apiservices";

const Sachivalayam = ({ dashboard, showAlert, account }) => {
  const [fetchLoading, setFetchLoading] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [isEditState, setEditState] = useState(false);
  const [fetchedData, setFetchedData] = useState({
    states: [],
    district: [],
    consistency: [],
    mandal: [],
    division: [],
    sachivalayam: [],
  });

  const [formValues, setFormValues] = useState({
    district_id: "",
    consistency_id: "",
    mandal_id: "",
    division_id: "",
    sachivalayam_name: "",
  });

  useEffect(() => {
    fecthOptionsData();
    fecthSachivalayamData();
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

  const fecthSachivalayamData = async () => {
    try {
      /// get all sachivalayam
      const sachivalayamResponse = await ApiServices.postRequest(getAllSachivalayamRoute);
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

  const handleEdit = async (data) => {
    setEditState(true);
    console.log("data", data);
    setFormValues({
      district_id: data.district_id,
      consistency_id: data.consistency_id,
      mandal_id: data.mandal_id,
      division_id: data.division_id,
      sachivalayam_id: data.sachivalayam_id,
      sachivalayam_name: data.sachivalayam_name,
    });
  };

  const handleSubmit = async () => {
    console.log("formValues", formValues);

    if (!formValues.district_id) {
      showAlert({
        text: "Please Select District",
        color: "error",
      });

      return;
    }

    if (!formValues.consistency_id) {
      showAlert({
        text: "Please Select Constituency",
        color: "error",
      });

      return;
    }

    if (!formValues.mandal_id) {
      showAlert({
        text: "Please Select Mandal",
        color: "error",
      });

      return;
    }

    if (!formValues.division_id) {
      showAlert({
        text: "Please Select Division",
        color: "error",
      });

      return;
    }

    if (!formValues.sachivalayam_name) {
      showAlert({
        text: "Please Enter Sachivalayam Name",
        color: "error",
      });

      return;
    }

    setLoading(true);

    var body = {
      sachivalayam_name: formValues.sachivalayam_name,
      division_pk: formValues.division_id,
      division_id: formValues.division_id,
    };

    if (!isEditState) {
      await addSachivalayam(body);
    } else {
      await updateSachivalayam(formValues.sachivalayam_id, body);
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
      sachivalayam_name: "",
    });
  };

  const addSachivalayam = async (body) => {
    try {
      await ApiServices.postRequest(createSachivalayamRoute, body);

      showAlert({
        text: "Sachivalayam Created Successfully",
        color: "success",
      });
      fecthSachivalayamData();
      handleReset();
    } catch (error) {
      console.log(error);
      showAlert({ text: "Sachivalayam Creation Failed" });
    }
  };

  const updateSachivalayam = async (id, data) => {
    try {
      await ApiServices.putRequest(`${createSachivalayamRoute}${id}`, data);

      showAlert({
        text: "Sachivalayam Updated Successfully",
        color: "success",
      });
      fecthSachivalayamData();
      handleReset();
    } catch (error) {
      console.log(error);
      showAlert({ text: "Sachivalayam Updation Failed" });
    }
  };

  return (
    <Page title="Sachivalayam">
      <Container maxWidth="xl">
        <Card sx={{ p: 3 }}>
          <Typography sx={{ pb: 2 }}>{isEditState ? "Edit Sachivalayam" : "Add Sachivalayam"}</Typography>
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
                  }));
                }}
                disabled
              >
                {fetchedData.states.map((state, index) => {
                  return (
                    <MenuItem key={index} value={state.state_pk}>
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
                value={formValues.district_id}
                onChange={(e) => {
                  setFormValues((prevState) => ({
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
                label="Sachivalayam Name"
                fullWidth
                value={formValues.sachivalayam_name}
                onChange={(e) => {
                  setFormValues((prevState) => ({
                    ...prevState,
                    sachivalayam_name: e.target.value,
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

        <SachivalayamList loading={fetchLoading} sachivalayamList={fetchedData.sachivalayam} handleEdit={handleEdit} />
      </Container>
    </Page>
  );
};

const mapStateToProps = (state) => {
  return {
    account: state.auth,
  };
};

export default connect(mapStateToProps, { showAlert })(Sachivalayam);
