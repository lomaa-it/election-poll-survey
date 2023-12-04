import { Grid, Container, Typography, Box, TextField, Card } from "@mui/material";
import Page from "../components/Page";
import { connect } from "react-redux";
import { LoadingButton } from "@mui/lab";

import ViewUsersList from "../sections/reports/ViewUsersList";
import Button from "@mui/material/Button";
import StatesList from "../sections/reports/StatesList";
import { useEffect, useState } from "react";
import instance from "../utils/axios";
import { createStatesRoute, getAllStatesRoute } from "../utils/apis";
import { set } from "date-fns";

const StatesPage = ({ dashboard }) => {
  const [stateList, setStateList] = useState([]);

  const [stateName, setStateName] = useState("");

  useEffect(() => {
    const fetchStates = async () => {
      const response = await instance.get(getAllStatesRoute);
      const responseData = response.data.message;
      setStateList(responseData);
    };
    fetchStates();
  }, []);

  const handleAddState = () => {
    if (stateName === "") {
      return;
    }
    const data = {
      state_name: stateName,
    };
    instance
      .post(createStatesRoute, data)
      .then((response) => {
        const responseData = response.data.message;
        console.log(responseData);
        setStateList([...stateList, responseData]);
        setStateName("");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleStateNameChange = (e) => {
    setStateName(e.target.value);
  };

  return (
    <Page title="States">
      <Container maxWidth="xl">
        <Typography variant="h4" sx={{ mb: 1 }}>
          States
        </Typography>

        <Card sx={{ p: 3 }}>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} md={6} lg={9}>
              <StatesList stateList={stateList} setStateList={setStateList} />
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
              <TextField size="small" label="State Name" fullWidth value={stateName} onChange={handleStateNameChange} />
              <LoadingButton
                variant="contained"
                sx={{
                  padding: "15px",
                }}
                onClick={handleAddState}
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

export default connect(mapStateToProps, null)(StatesPage);
