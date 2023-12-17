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
  const [designation, setDesignation] = useState([]);

  useEffect(() => {
    clearUserReducer();
  }, []);

  const handleSubmit = async (filterValues) => {
    var values = {
      designation_id: designation?.value ?? null,
      ...filterValues,
    };
    await getAllUsers(values);
  };

  return (
    <Page title="User List">
      <Container maxWidth="xl">
        <Card sx={{ p: 3, backgroundColor: searchFiltercolor }}>
          <Grid container spacing={2} alignItems="center">
            <SearchByFilter
              onSubmit={handleSubmit}
              children={
                <Grid item xs={12} md={6} lg={2}>
                  <RHFAutoComplete
                    name="designation"
                    label="Select Designation"
                    value={designation}
                    onChange={(name, value) => setDesignation(value)}
                    options={common.designation}
                  />
                </Grid>
              }
            />

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
