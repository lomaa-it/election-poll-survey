import {
  Grid,
  Container,
  Typography,
  Box,
  TextField,
  Card,
} from "@mui/material";
import Page from "../components/Page";
import { connect } from "react-redux";
import { LoadingButton } from "@mui/lab";
import ViewUsersList from "../sections/reports/ViewUsersList";
import Button from "@mui/material/Button";
import { useCallback, useEffect, useRef, useState } from "react";
import SearchByFilter from "../sections/common/SearchByFilter";
import { searchFiltercolor } from "../constants";
import { clearUserReducer, getAllUsers } from "../actions/user";
import { RHFAutoComplete } from "../components/hook-form";
import { useLocation } from "react-router-dom";

const ViewUserPage = ({ common, clearUserReducer, getAllUsers }) => {
  const [filterValues, setFilterValues] = useState(null);
  const [isLoading, setLoading] = useState(false);
  const [reset, setReset] = useState(false);
  let location = useLocation();
  const buttonRef = useRef();

  useEffect(() => {
    clearUserReducer();
  }, []);

  useEffect(() => {
    setFilterValues(null);
  }, [reset]);

  const onSubmit = useCallback(async () => {
    setLoading(true);
    console.log("filterValues232", filterValues);
    console.log("HI im Here");

    await getAllUsers(filterValues);

    setLoading(false);
  }, [filterValues, getAllUsers]);

  useEffect(() => {
    onSubmit();
  }, [location, onSubmit]);

  const handleChange = (name, value) => {
    const values = {};

    values[name] = value;

    setFilterValues((state) => ({ ...state, ...values }));
  };

  return (
    <Page title="User List">
      <Container maxWidth="xl">
        {/* <Typography variant="h4" sx={{ mb: 1 }}>
          User List
        </Typography> */}

        <Card sx={{ p: 3, backgroundColor: searchFiltercolor }}>
          {/* <Typography sx={{ pb: 2 }}>Search by filter</Typography> */}

          <Grid container spacing={2} alignItems="center">
            <SearchByFilter
              reset={reset}
              onChanged={(value) => setFilterValues(value)}
            />

            <Grid item xs={12} md={6} lg={2}>
              <RHFAutoComplete
                key={reset} // add this line
                name="designation"
                label="Select Designation"
                value={filterValues?.designation}
                onChange={handleChange}
                options={common.designation}
              />
            </Grid>

            {/* <Grid item xs={12} md={6} lg={2}>
              <RHFAutoComplete
                name="voter_id"
                label="Voter ID"

                // disabled={account.user.part_no != null}
              />
            </Grid> */}

            {/* <Grid item xs={12} md={6} lg={2}>
              <RHFAutoComplete
                name="voter_name"
                label="Voter Name"

                // disabled={account.user.part_no != null}
              />
            </Grid> */}

            <Grid item xs={12} md={6} lg={2}>
              <LoadingButton
                ref={buttonRef}
                loading={isLoading}
                variant="contained"
                onClick={onSubmit}
              >
                Search
              </LoadingButton>
              <LoadingButton
                loading={isLoading}
                variant="contained"
                sx={{
                  backgroundColor: "red",
                  marginLeft: "15px",
                }}
                onClick={() => {
                  setReset(!reset);
                }}
              >
                Clear
              </LoadingButton>
            </Grid>
          </Grid>
        </Card>

        <Box p={1} />

        <ViewUsersList />
      </Container>
    </Page>
  );
};

const mapStateToProps = (state) => {
  return {
    common: state.common,
  };
};

export default connect(mapStateToProps, { clearUserReducer, getAllUsers })(
  ViewUserPage
);
