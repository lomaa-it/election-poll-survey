import { useCallback, useEffect, useRef, useState } from "react";
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

import UserMappingList from "../sections/reports/UserMappingList";
import Button from "@mui/material/Button";
import SearchByFilter from "../sections/common/SearchByFilter";
import { searchFiltercolor } from "../constants";
import { getAllUsers, clearUserReducer } from "../actions/user";
import { RHFAutoComplete } from "../components/hook-form";
import { fi } from "date-fns/esm/locale";
import { useLocation } from "react-router-dom";

const UserMappingPage = ({ common, clearUserReducer, getAllUsers }) => {
  const [filterValues1, setFilterValues] = useState(null);
  const [isLoading, setLoading] = useState(false);
  const [reset, setReset] = useState(false);
  let location = useLocation();
  const buttonRef = useRef();
  const [designation, setDesignation] = useState([]);

  useEffect(() => {
    clearUserReducer();
  }, []);

  // const onSubmit = useCallback(async () => {
  //   setLoading(true);
  //   // console.log("filterValues232", filterValues);
  //   // console.log("HI im Here");

  //   await getAllUsers(filterValues);

  //   setLoading(false);
  // }, [filterValues, getAllUsers]);

  const handleSubmit = async (filterValues) => {
    var values = {
      designation_id: designation?.value ?? null,
      ...filterValues,
    };
    await getAllUsers(values);
  };

  return (
    <Page title="User Mapping">
      <Container maxWidth="xl">
        {/* <Typography variant="h4" sx={{ mb: 1 }}>
          User Mapping
        </Typography> */}

        <Card sx={{ p: 3, backgroundColor: searchFiltercolor }}>
          {/* <Typography sx={{ pb: 2 }}>Search by filter</Typography> */}

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
                key={reset} // add this line
                name="user_id"
                label="Select User"
                value={filterValues?.user_id}
                onChange={handleChange}
                options={[
                  { value: "1", label: "1" },
                  { value: "2", label: "2" },
                  { value: "3", label: "3" },
                ]}
              />
            </Grid> */}
          </Grid>
        </Card>

        <Box p={1} />

        <UserMappingList filterValues={filterValues1} />
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
  UserMappingPage
);
