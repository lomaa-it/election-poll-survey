import { Grid, Container, Typography, Box, TextField, Card, MenuItem } from "@mui/material";
import Page from "../components/Page";
import { connect } from "react-redux";
import { LoadingButton } from "@mui/lab";

import ViewUsersList from "../sections/reports/ViewUsersList";
import Button from "@mui/material/Button";
import VoterAndVolunteerMappingList from "../sections/reports/VoterAndVolunteerMappingList";
import PartsList from "../sections/reports/PartsList";
import { useEffect, useState } from "react";
import { getAllConstituenciesRoute, getAllDistrictsRoute, getAllDivisionRoute, getAllMandalRoute, getAllSachivalayamRoute, getAllStatesRoute, getAllPartsRoute, createPartsRoute, getallpartsbysachivalayamidRoute } from "../utils/apis";
import { set } from "date-fns";
import { showAlert } from "../actions/alert";
import SearchByFilter from "../sections/common/SearchByFilter";
import { searchFiltercolor } from "../constants";
import AddPartsCard from "../components/AddPartsCard";
import ApiServices from "../services/apiservices";

const PartsPage = ({ dashboard, common, account }) => {
  const userPermission = account.user && account.user.permissions ? account.user.permissions : [];
  const pageActions = userPermission.filter((p) => p.page_id === 148)[0];
  console.log("pageActions1", pageActions);

  const [fetchedData, setFetchedData] = useState([{}]);
  const [initialValues, setInitialValues] = useState({
    sachivalayam_id: null,
  });
  const [isFetching, setIsFetching] = useState(false);

  const reFecthData = async () => {
    console.log("HI Im Recalled");
    setIsFetching(true);
    try {
      const response = await ApiServices.postRequest(getallpartsbysachivalayamidRoute, initialValues);
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
      const response = await ApiServices.postRequest(getallpartsbysachivalayamidRoute, data);
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
            <SearchByFilter showPartNo={false} showVillage={false} showOtherFilters={false} onSubmit={handleSubmit} />
          </Grid>
        </Card>

        <Box p={1} />
        {/* add part card section */}
        <AddPartsCard pageActions={pageActions} reFecthData={reFecthData} />

        <Box p={1} />

        <PartsList partsList={fetchedData} reFecthData={reFecthData} isFetching={isFetching} pageActions={pageActions} />
      </Container>
    </Page>
  );
};

const mapStateToProps = (state) => {
  return {
    dashboard: state.dashboard,
    common: state.common,
    account: state.auth,
  };
};

export default connect(mapStateToProps, null)(PartsPage);
