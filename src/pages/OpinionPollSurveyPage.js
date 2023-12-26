import { useCallback, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
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

import OpinionPollSurveyList from "../sections/reports/OpinionPollSurveyList";
import SearchByFilter from "../sections/common/SearchByFilter";
import { getAllVotersSurvey, clearVoterReducer } from "../actions/voter";
import { searchFiltercolor } from "../constants";
import { useLocation } from "react-router-dom";
import { RHFAutoComplete } from "../components/hook-form";
import { UncontrolledTextField } from "../components/hook-form/RHFTextField";

const OpinionPollSurveyPage = ({
  isUser,
  getAllVotersSurvey,
  clearVoterReducer,
  common,
}) => {
  const [filterValues, setFilterValues] = useState(null);
  const [otherFilterValues, setOtherFilterValues] = useState({
    interested_party: "",
    residence: "",
  });

  useEffect(() => {
    return () => {
      clearVoterReducer();
    };
  }, []);

  const handleSubmit = async (filterValues) => {
    await getAllVotersSurvey({
      ...filterValues,
      fieldname: null,
      fieldvalue: null,
    });
    setFilterValues(filterValues);
  };
  const handleReset = () => {
    setOtherFilterValues({
      interested_party: "",
      residence: "",
    });
  };

  console.log("otherFilterValues", otherFilterValues);
  
  return (
    <Page title="Opinion Survey">
      <Container maxWidth="xl">
        {/* <Typography variant="h4" sx={{ mb: 1 }}>
          Opinion Survey
        </Typography> */}

        <Card sx={{ p: 3, backgroundColor: searchFiltercolor }}>
          <Grid container spacing={2} alignItems="center">
            <SearchByFilter
              onSubmit={handleSubmit}
              onReset={handleReset}
              children={
                <>
                  <Grid item xs={12} md={6} lg={2}>
                    <UncontrolledTextField
                      name="interested_party"
                      label="Select Party"
                      value={otherFilterValues.interested_party}
                      onChange={(e) =>
                        setOtherFilterValues({
                          ...otherFilterValues,
                          interested_party: e.target.value,
                        })
                      }
                      select
                    >
                      {common?.parties?.map((item, index) => (
                        <MenuItem key={index} value={item.value}>
                          {item.label}
                        </MenuItem>
                      )) || null}
                    </UncontrolledTextField>
                  </Grid>

                  <Grid item xs={12} md={6} lg={2}>
                    <UncontrolledTextField
                      name="residence"
                      label="Select Residence"
                      value={otherFilterValues.residence}
                      onChange={(e) =>
                        setOtherFilterValues({
                          ...otherFilterValues,
                          residence: e.target.value,
                        })
                      }
                      select
                    >
                      {[
                        {
                          label: "Resident",
                          value: 1,
                        },
                        {
                          label: "Non-Resident",
                          value: 0,
                        },
                      ].map((item, index) => (
                        <MenuItem key={index} value={item.value}>
                          {item.label}
                        </MenuItem>
                      ))}
                    </UncontrolledTextField>
                  </Grid>
                </>
              }
            />
            {/* <Grid item xs={12} md={6} lg={2}>
              <TextField
                size="small"
                label="Voter ID"
                fullWidth
                select
                sx={{
                  backgroundColor: "#fff",
                  borderRadius: "5px",
                }}
              />
            </Grid>
            <Grid item xs={12} md={6} lg={2}>
              <TextField
                size="small"
                label="Voter Name"
                fullWidth
                select
                sx={{
                  backgroundColor: "#fff",
                  borderRadius: "5px",
                }}
              />
            </Grid>
            <Grid item xs={12} md={6} lg={2}>
              <TextField
                size="small"
                label="Phone Number"
                fullWidth
                select
                sx={{
                  backgroundColor: "#fff",
                  borderRadius: "5px",
                }}
              />
            </Grid>
            <Grid item xs={12} md={6} lg={2}>
              <TextField
                size="small"
                label="Select User"
                fullWidth
                select
                sx={{
                  backgroundColor: "#fff",
                  borderRadius: "5px",
                }}
              />
            </Grid>
            <Grid item xs={12} md={6} lg={2}>
              <TextField
                size="small"
                label="Select Next Level User"
                fullWidth
                select
                sx={{
                  backgroundColor: "#fff",
                  borderRadius: "5px",
                }}
              />
            </Grid> */}
          </Grid>
        </Card>

        <Box p={1} />

        <OpinionPollSurveyList isUser={isUser} filterValues={filterValues} />
      </Container>
    </Page>
  );
};
const mapStateToProps = (state) => {
  return {
    common: state.common,
  };
};

export default connect(mapStateToProps, {
  getAllVotersSurvey,
  clearVoterReducer,
})(OpinionPollSurveyPage);
