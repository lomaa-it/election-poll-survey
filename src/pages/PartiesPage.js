import { Grid, Container, Typography, Box, TextField, Card, Stack } from "@mui/material";
import Page from "../components/Page";
import { connect } from "react-redux";
import { LoadingButton } from "@mui/lab";

import ViewUsersList from "../sections/reports/ViewUsersList";
import Button from "@mui/material/Button";
import PartiesList from "../sections/reports/PartiesList";
import { createPartyRoute, getAllPartiesRoute } from "../utils/apis";
import { useEffect, useState, useRef } from "react";

import { showAlert } from "../actions/alert";
import ApiServices from "../services/apiservices";
import { add } from "date-fns";

const PartiesPage = ({ dashboard, showAlert }) => {
  const [fetchLoading, setFetchLoading] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [isEditState, setEditState] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [fetchedData, setFetchedData] = useState({
    parties: [],
  });

  const [formValues, setFormValues] = useState({
    lookup_name: "party_list",
    lookup_valuename: "",
    lookup_sequence: 0,
  });

  const inputFieldRef = useRef();

  useEffect(() => {
    if (isEditState) {
      inputFieldRef.current.focus();
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [isFocused, isEditState]);

  useEffect(() => {
    fetchPartiesData();
  }, []);

  const fetchPartiesData = async () => {
    try {
      const response = await ApiServices.postRequest(getAllPartiesRoute);
      console.log(response.data.message);
      setFetchedData({
        parties: response.data.message,
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
      lookup_sequence: data.lookup_sequence,
      lookup_valuename: data.lookup_valuename,
      lookup_id: data.lookup_id,
    }));
  };

  const handleSubmit = async () => {
    if (formValues.lookup_sequence === "") {
      showAlert({ text: "Please enter sequence number", color: "error" });
      return;
    }

    if (formValues.lookup_valuename === "") {
      showAlert({ text: "Please enter party name", color: "error" });
      return;
    }

    setLoading(true);

    var body = {
      lookup_name: "party_list",
      lookup_valuename: formValues.lookup_valuename,
      lookup_sequence: formValues.lookup_sequence,
    };

    if (!isEditState) {
      await addParty(body);
    } else {
      await updateParty(formValues.lookup_id, body);
    }
    setLoading(false);
  };

  const handleReset = () => {
    setEditState(false);
    setFormValues({
      lookup_name: "party_list",
      lookup_valuename: "",
      lookup_sequence: 0,
    });
  };

  const addParty = async (body) => {
    console.log("addme");
    try {
      await ApiServices.postRequest(createPartyRoute, body);

      showAlert({ text: "Party Created Successfully", color: "success" });
      fetchPartiesData();
      handleReset();
    } catch (error) {
      console.log(error);
      showAlert({ text: "Party Created Failed", color: "error" });
    }
  };

  const updateParty = async (id, body) => {
    console.log("addme");
    try {
      await ApiServices.putRequest(`${createPartyRoute}${id}`, body);

      showAlert({ text: "Party Updated Successfully", color: "success" });
      fetchPartiesData();
      handleReset();
    } catch (error) {
      console.log(error);
      showAlert({ text: "Party Updated Failed", color: "error" });
    }
  };

  console.log("formValues", formValues);

  return (
    <Page title="Political Parties">
      <Container maxWidth="xl">
        <Card sx={{ p: 3 }}>
          <Typography sx={{ pb: 2 }}>{isEditState ? "Edit Party" : "Add Party"}</Typography>
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
                size="small"
                type="number"
                label="Sequence Number"
                fullWidth
                value={formValues.lookup_sequence}
                onChange={(event) => {
                  console.log(event.target.value);
                  setFormValues({
                    ...formValues,
                    lookup_sequence: event.target.value,
                  });
                }}
              />
            </Grid>
            <Grid item xs={12} md={6} lg={2}>
              <TextField
                inputRef={inputFieldRef}
                size="small"
                label="Party Name"
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
        <PartiesList loading={fetchLoading} partiesList={fetchedData.parties} handleEdit={handleEdit} />
      </Container>
    </Page>
  );
};

const mapStateToProps = (state) => {
  return {
    dashboard: state.dashboard,
  };
};

export default connect(mapStateToProps, { showAlert })(PartiesPage);
