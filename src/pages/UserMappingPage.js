import { useCallback, useEffect, useRef, useState } from "react";
import { Grid, Container, Typography, Box, TextField, Card, MenuItem } from "@mui/material";
import Page from "../components/Page";
import { connect } from "react-redux";
import { LoadingButton } from "@mui/lab";

import UserMappingList from "../sections/reports/UserMappingList";
import Button from "@mui/material/Button";
import SearchByFilter from "../sections/common/SearchByFilter";
import { searchFiltercolor } from "../constants";
import { getAllUsers, clearUserReducer } from "../actions/user";
import { RHFAutoComplete } from "../components/hook-form";
import { fi } from "date-fns/esm/locale";
import { useLocation } from "react-router-dom";
import { UncontrolledTextField } from "../components/hook-form/RHFTextField";

const UserMappingPage = ({ common, clearUserReducer, getAllUsers }) => {
  const [designation, setDesignation] = useState("");
  const [filterValues, setFilterValues] = useState(null);

  useEffect(() => {
    clearUserReducer();
  }, []);

  useEffect(() => {
    clearUserReducer();
  }, []);

  const handleSubmit = async (data) => {
    var values = { designation_id: designation, ...data };
    await getAllUsers(values);
    setFilterValues(data);
  };

  return (
    <Page title="User Mapping">
      <Container maxWidth="xl">
        <Card sx={{ p: 3, backgroundColor: searchFiltercolor }}>
          <Grid container spacing={2} alignItems="center">
            <SearchByFilter
              showPartNo={false}
              showVillage={false}
              showOtherFilters={false}
              // onChange={handleChange}
              onSubmit={handleSubmit}
              children={
                <Grid item xs={12} md={6} lg={2}>
                  <UncontrolledTextField name="designation_id" label="Select Designation*" select value={designation} onChange={(e) => setDesignation(e.target.value)}>
                    {common.designation?.map((item, index) => (
                      <MenuItem key={index} value={item.value}>
                        {item.label}
                      </MenuItem>
                    ))}
                  </UncontrolledTextField>
                </Grid>
              }
            />
          </Grid>
        </Card>

        <Box p={1} />

        <UserMappingList filterValues={filterValues} />
      </Container>
    </Page>
  );
};

const mapStateToProps = (state) => {
  return {
    common: state.common,
  };
};

export default connect(mapStateToProps, { clearUserReducer, getAllUsers })(UserMappingPage);
