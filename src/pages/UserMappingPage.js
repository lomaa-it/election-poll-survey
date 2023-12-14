import { useEffect, useState } from "react";
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

const UserMappingPage = ({ common, clearUserReducer, getAllUsers }) => {
  const [filterValues, setFilterValues] = useState(null);
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    clearUserReducer();
  }, []);

  const onSubmit = async () => {
    setLoading(true);

    await getAllUsers(filterValues);

    setLoading(false);
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
              showPartNo={false}
              showVillage={false}
              showOtherFilters={false}
              onChanged={(value) => setFilterValues(value)}
            />
            <Grid item xs={12} md={6} lg={2}>
              <TextField
                name="user_id"
                size="small"
                fullWidth
                label="Select User"
                select
                sx={{
                  backgroundColor: "white",
                  borderRadius: "5px",
                }}
              >
                {common.users?.map((item, index) => (
                  <MenuItem key={index} value={item.value}>
                    {item.label}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>

            <Grid item xs={12} md={6} lg={2}>
              <TextField
                name="designation_id"
                size="small"
                fullWidth
                label="Select Designation*"
                select
                sx={{
                  backgroundColor: "white",
                  borderRadius: "5px",
                }}
              >
                {common.designation?.map((item, index) => (
                  <MenuItem key={index} value={item.value}>
                    {item.label}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>

            <Grid item xs={12} md={6} lg={2}>
              <LoadingButton
                loading={isLoading}
                variant="contained"
                onClick={onSubmit}
              >
                Search
              </LoadingButton>
            </Grid>
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

export default connect(mapStateToProps, { clearUserReducer, getAllUsers })(
  UserMappingPage
);
