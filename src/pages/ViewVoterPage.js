import { Grid, Container, Typography, Box, TextField, Card, MenuItem, Stack } from "@mui/material";
import Page from "../components/Page";
import { connect } from "react-redux";
import { LoadingButton } from "@mui/lab";

import CircularProgress from "@mui/material/CircularProgress";
import ViewVotersList from "../sections/reports/ViewVotersList";
import Button from "@mui/material/Button";
import { useState, useEffect } from "react";
import SearchByFilter from "../sections/common/SearchByFilter";
import { searchFiltercolor } from "../constants";
import { clearVoterReducer, getAllVotersSurvey } from "../actions/voter";
import { UncontrolledTextField } from "../components/hook-form/RHFTextField";

const ViewVoterPage = ({ getAllVotersSurvey }) => {
  const [filterValues, setFilterValues] = useState(null);
  const [formValues, setFormValues] = useState({ part_slno: "", voter_id: "" });

  useEffect(() => {
    clearVoterReducer();
  }, []);

  const handleSubmit = async (filterValues) => {
    var values = {
      ...filterValues,
      intrested_party: null,
      is_resident: null,
      fieldname: null,
      fieldvalue: null,
    };

    await getAllVotersSurvey(values);
    setFilterValues(values);
  };

  const handleReset = () => {
    setFormValues({ part_slno: "", voter_id: "" });
  };

  return (
    <Page title="View Voter">
      <Container maxWidth="xl">
        <Card sx={{ p: 3, backgroundColor: searchFiltercolor }}>
          <Grid container spacing={2} alignItems="center">
            <SearchByFilter
              onReset={handleReset}
              onSubmit={handleSubmit}
              // children={
              //   <>
              //     <Grid item xs={12} md={6} lg={2}>
              //       <UncontrolledTextField name="part_slno" label="Part SLNO" value={formValues?.part_slno} onChange={handleChange} />
              //     </Grid>

              //     <Grid item xs={12} md={6} lg={2}>
              //       <UncontrolledTextField name="voter_id" label="Voter ID" value={formValues?.voter_id} onChange={handleChange} />
              //     </Grid>
              //   </>
              // }
            />
          </Grid>
        </Card>

        <Box p={1} />

        <ViewVotersList filterValues={filterValues} />

        <Card sx={{ p: 3, marginTop: "10px" }}>
          <Stack direction="row" spacing={2}>
            <Button variant="outlined">Add</Button>

            <Button variant="outlined">Upload</Button>
          </Stack>
        </Card>
      </Container>
    </Page>
  );
};

const mapStateToProps = (state) => {
  return {
    dashboard: state.dashboard,
  };
};

export default connect(mapStateToProps, { getAllVotersSurvey })(ViewVoterPage);
