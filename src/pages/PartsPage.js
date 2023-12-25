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

import ViewUsersList from "../sections/reports/ViewUsersList";
import Button from "@mui/material/Button";
import VoterAndVolunteerMappingList from "../sections/reports/VoterAndVolunteerMappingList";
import PartsList from "../sections/reports/PartsList";
import { useEffect, useState } from "react";
import instance from "../utils/axios";
import {
  getAllConstituenciesRoute,
  getAllDistrictsRoute,
  getAllDivisionRoute,
  getAllMandalRoute,
  getAllSachivalayamRoute,
  getAllStatesRoute,
  getAllPartsRoute,
  createPartsRoute,
  getallpartsbysachivalayamidRoute,
} from "../utils/apis";
import { set } from "date-fns";
import { showAlert } from "../actions/alert";
import SearchByFilter from "../sections/common/SearchByFilter";
import { searchFiltercolor } from "../constants";
import AddPartsCard from "../components/AddPartsCard";

const PartsPage = ({ dashboard, common }) => {
  const [fetchedData, setFetchedData] = useState([{}]);
  const [initialValues, setInitialValues] = useState({
    sachivalayam_id: null,
  });
  const [isFetching, setIsFetching] = useState(false);

  const reFecthData = async () => {
    console.log("HI Im Recalled");
    setIsFetching(true);
    try {
      const response = await instance.post(
        getallpartsbysachivalayamidRoute,
        initialValues
      );
      console.log("response", response.data.message);
      setFetchedData(response.data.message);
      setIsFetching(false);
    } catch (error) {
      console.log("error", error);
      setIsFetching(false);
    }
  };

  const handleSubmit = async (data) => {
    console.log("searchFiltersData", data);
    console.log("searchFiltersData sa", data.sachivalayam_id);
    setIsFetching(true);
    try {
      const response = await instance.post(
        getallpartsbysachivalayamidRoute,
        data
      );
      console.log("response", response.data.message);
      setFetchedData(response.data.message);
      setIsFetching(false);
    } catch (error) {
      console.log("error", error);
      setIsFetching(false);
    }
  };

  return (
    <Page title="Parts">
      <Container maxWidth="xl">
        {/* <Typography variant="h4" sx={{ mb: 1 }}>
          Parts
        </Typography> */}
        <Card sx={{ p: 3, backgroundColor: searchFiltercolor }}>
          <Grid container spacing={2} alignItems="center">
            <SearchByFilter
              showPartNo={false}
              showVillage={false}
              showOtherFilters={false}
              onSubmit={handleSubmit}
            />
          </Grid>
        </Card>
        <Box p={1} />
        {/* add part card section */}
        <AddPartsCard reFecthData={reFecthData} />

        <Box p={1} />
        <PartsList
          partsList={fetchedData}
          reFecthData={reFecthData}
          isFetching={isFetching}
        />
      </Container>
    </Page>
  );
};

const mapStateToProps = (state) => {
  return {
    dashboard: state.dashboard,
    common: state.common,
  };
};

export default connect(mapStateToProps, null)(PartsPage);
