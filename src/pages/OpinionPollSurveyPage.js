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
    intrested_party: "",
    is_resident: "",
  });

  const [radioValue, setRadioValue] = useState("null");

  useEffect(() => {
    return () => {
      clearVoterReducer();
    };
  }, []);

  const handleSubmit = async (filterValues) => {
    var values = {
      ...filterValues,
      intrested_party:
        otherFilterValues.intrested_party == ""
          ? null
          : otherFilterValues.intrested_party,
      is_resident:
        otherFilterValues.is_resident == ""
          ? null
          : otherFilterValues.is_resident,
      fieldname: null,
      fieldvalue: null,
      isSurveyed: radioValue == "null" ? null : radioValue,
    };

    await getAllVotersSurvey(values);
    setFilterValues(values);
  };

  const handleReset = () => {
    setOtherFilterValues({
      intrested_party: "",
      is_resident: "",
    });
  };

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
                      name="intrested_party"
                      label="Select Party"
                      value={otherFilterValues.intrested_party}
                      onChange={(e) =>
                        setOtherFilterValues({
                          ...otherFilterValues,
                          intrested_party: e.target.value,
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
                      name="is_resident"
                      label="Select Residence"
                      value={otherFilterValues.is_resident}
                      onChange={(e) =>
                        setOtherFilterValues({
                          ...otherFilterValues,
                          is_resident: e.target.value,
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

        <OpinionPollSurveyList
          isUser={isUser}
          filterValues={filterValues}
          radioValue={radioValue}
          setRadioValue={setRadioValue}
        />
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
