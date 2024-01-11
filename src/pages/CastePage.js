import { Grid, Container, Typography, Box, TextField, Card, Stack } from "@mui/material";
import Page from "../components/Page";
import { connect } from "react-redux";
import { LoadingButton } from "@mui/lab";
import Tooltip from "@material-ui/core/Tooltip";

import CasteList from "../sections/reports/CasteList";
import { useEffect, useState, useRef } from "react";
import { getAllCastesRoute, createCasteRoute } from "../utils/apis";

import { showAlert } from "../actions/alert";
import ApiServices from "../services/apiservices";

import LsService from "../services/localstorage";

const CastePage = ({ dashboard, showAlert, account }) => {
  const userPermission = account.user && account.user.permissions ? account.user.permissions : [];
  const pageActions = userPermission.filter((p) => p.page_id === 174)[0];

  console.log("pageActions", pageActions);

  const [fetchLoading, setFetchLoading] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [isEditState, setEditState] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [fetchedData, setFetchedData] = useState({
    caste: [],
  });

  const [formValues, setFormValues] = useState({
    lookup_name: "caste_list",
    lookup_valuename: "",
  });

  const inputFieldRef = useRef();

  useEffect(() => {
    if (isEditState) {
      inputFieldRef.current.focus();
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [isFocused, isEditState]);

  useEffect(() => {
    fetchCasteData();
  }, []);

  const fetchCasteData = async () => {
    try {
      const response = await ApiServices.postRequest(getAllCastesRoute);
      console.log(response.data.message);
      setFetchedData({
        religion: response.data.message,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleEdit = async (data) => {
    setEditState(true);
    setIsFocused((prevState) => !prevState);
    console.log("data", data);
    setFormValues((prevState) => ({
      ...prevState,
      lookup_valuename: data.lookup_valuename,
      lookup_id: data.lookup_id,
    }));
  };

  const handleDelete = async (data) => {
    setLoading(true);
    console.log("data85282", data);
    try {
      await ApiServices.deleteRequest(createCasteRoute + data.lookup_id);
      showAlert({ text: "Caste Deleted", color: "success" });
      fetchCasteData();
      handleReset();
    } catch (error) {
      console.log(error);

      showAlert({ text: "Caste Not Deleted", color: "error" });
    }
    setLoading(false);
  };

  const handleSubmit = async () => {
    if (formValues.lookup_valuename === "") {
      showAlert({ text: "Please Enter Caste Name", color: "error" });
      return;
    }

    setLoading(true);

    var body = {
      lookup_name: "caste_list",
      lookup_valuename: formValues.lookup_valuename,
    };

    if (!isEditState) {
      await addCaste(body);
    } else {
      await updateCaste(formValues.lookup_id, body);
    }
    setLoading(false);
  };

  const handleReset = () => {
    setEditState(false);
    setFormValues({
      lookup_name: "caste_list",
      lookup_valuename: "",
    });
  };

  const addCaste = async (body) => {
    console.log("addme");
    try {
      await ApiServices.postRequest(createCasteRoute, body);

      showAlert({ text: "Caste Created Successfully", color: "success" });
      fetchCasteData();
      handleReset();
    } catch (error) {
      console.log(error);
      showAlert({ text: "Caste Created Failed", color: "error" });
    }
  };

  const updateCaste = async (id, body) => {
    console.log("updateme");
    try {
      await ApiServices.putRequest(`${createCasteRoute}${id}`, body);
      showAlert({ text: "Caste Updated Successfully", color: "success" });
      fetchCasteData();
      handleReset();
    } catch (error) {
      console.log(error);
      showAlert({ text: "Caste Updated Failed", color: "error" });
    }
  };

  return (
    <Page title="Caste">
      <Container maxWidth="xl">
        <Card sx={{ p: 3 }}>
          <Typography sx={{ pb: 2 }}>{isEditState ? "Edit Caste" : "Add Caste"}</Typography>
          <Grid container spacing={2} alignItems="center">
            <Grid
              item
              xs={12}
              md={6}
              lg={2}
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: "15px",
              }}
            >
              <TextField
                inputRef={inputFieldRef}
                size="small"
                label="Caste Name"
                fullWidth
                value={formValues.lookup_valuename}
                onChange={(e) => {
                  setFormValues({
                    ...formValues,
                    lookup_valuename: e.target.value,
                  });
                }}
              />
            </Grid>

            <Grid item xs={12} md={6} lg={2}>
              {!isEditState && (
                <Tooltip title={pageActions.add_perm != 1 ? "You don't have access to add" : ""}>
                  <span>
                    <LoadingButton loading={isLoading} onClick={handleSubmit} variant="contained" disabled={pageActions.add_perm != 1}>
                      Add
                    </LoadingButton>
                  </span>
                </Tooltip>
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
        <CasteList pageActions={pageActions} loading={fetchLoading} casteList={fetchedData.religion} handleEdit={handleEdit} handleDelete={handleDelete} />
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

export default connect(mapStateToProps, { showAlert })(CastePage);
