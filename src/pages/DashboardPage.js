import { useEffect, useState } from "react";
import { Grid, Container, Typography, Box, TextField, Card } from "@mui/material";
import Autocomplete from "@mui/material/Autocomplete";
import makeStyles from "@mui/styles/makeStyles";
import Page from "../components/Page";
import { connect } from "react-redux";
import { LoadingButton } from "@mui/lab";
import { PieChartWidget } from "../sections/dashboard";
import BarChartWidget from "../sections/dashboard/BarChartWidget";
import {
  Age1Color,
  Age2Color,
  Age3Color,
  Age4Color,
  Age5Color,
  Age6Color,
  BJPColor,
  CONGRESSColor,
  CancelColor,
  EscalatedColor,
  FemaleColor,
  JSPColor,
  MaleColor,
  NETURALColor,
  NotStartedColor,
  OTHERColor,
  OpenColor,
  ResolvedColor,
  StartedColor,
  TDPColor,
  TransgenderColor,
  YSRCPColor,
  completedColor,
  pendingColor,
} from "../utils/constants";
import instance from "../utils/axios";
import { getAllMandalRoute, getDivisionsById, getSachivalayamById, getPartsById, getVillageById } from "../utils/apis";
import { ageDropdown } from "../utils/dropdownconstants";

// Define custom styles
const useStyles = makeStyles({
  textField: {
    "& .MuiInputBase-input": {
      height: "10px", // Adjust the height as per your requirement
      fontSize: "3px",
      width: "110px",
    },
  },
});

const DashboardApp = ({ dashboard }) => {
  const [searchFilters, setSearchFiltersData] = useState({
    mandal: [],
    division: [],
    sachivalayam: [],
    partNo: [],
    village: [],
    age: ageDropdown,
    user: [],
    nextLevelUser: [],
  });

  const [saveSearchFilters, setSaveSearchFilters] = useState({
    mandal_id: "",
    division_id: "",
    sachivalayam_id: "",
    part_no: "",
    age: "",
    user_id: "",
    next_level_user_id: "",
  });
  const [selectedDivision, setSelectedDivision] = useState(null);

  // first call mandal api and get all mandals after user select mandal then call division api and get all divisions
  // after user select division then call sachivalayam api and get all sachivalayams
  // after user select sachivalayam then call partNo api and get all partNo
  // after user select partNo then call age api and get all age
  // after user select age then call user api and get all users
  // after user select user then call nextLevelUser api and get all nextLevelUsers
  // after user select nextLevelUser then call search api and get all data
  const getMandalData = async () => {
    try {
      const response = await instance.get(getAllMandalRoute);
      const responseData = response.data.message;

      const filterData = responseData.map((item) => {
        return {
          label: item.mandal_name,
          mandal_id: item.mandal_pk,
        };
      });

      setSearchFiltersData({ ...searchFilters, mandal: filterData });
    } catch (error) {
      console.log("error", error);
    }
  };

  const getDivisionData = async () => {
    try {
      const response = await instance.get(getDivisionsById + saveSearchFilters.mandal_id);
      const responseData = response.data.message;

      const filterData = responseData.map((item) => {
        return {
          label: item.division_name,
          division_id: item.division_pk,
        };
      });

      setSearchFiltersData({ ...searchFilters, division: filterData });
    } catch (error) {
      console.log("error", error);
    }
  };

  const getSachivalayamData = async () => {
    try {
      const response = await instance.get(getSachivalayamById + saveSearchFilters.division_id);

      const responseData = response.data.message;

      const filterData = responseData.map((item) => {
        return {
          label: item.sachivalayam_name,
          sachivalayam_id: item.sachivalayam_pk,
        };
      });

      setSearchFiltersData({ ...searchFilters, sachivalayam: filterData });
    } catch (error) {
      console.log("error", error);
    }
  };

  const getPartNoData = async () => {
    try {
      console.log("route", "getPartNoData");
      const response = await instance.get(getPartsById + saveSearchFilters.sachivalayam_id);
      console.log("part fecthing is done");
      const responseData = response.data.message;
      console.log("partNo-data", responseData);
      const filterData = responseData.map((item) => {
        return {
          label: item.part_no,
          part_no: item.part_pk,
        };
      });
      console.log("partNo-filterData", filterData);

      setSearchFiltersData({ ...searchFilters, partNo: filterData });
    } catch (error) {
      console.log("error", error);
    }
  };

  const getVillageData = async () => {
    try {
      console.log("route", "getVillageData");
      const response = await instance.get(getVillageById + saveSearchFilters.part_no);
      console.log("village fecthing is done");
      const responseData = response.data.message;
      console.log("village-data", responseData);
      const filterData = responseData.map((item) => {
        return {
          label: item.village_name,
          village_id: item.village_pk,
        };
      });
      console.log("village-filterData", filterData);

      setSearchFiltersData({ ...searchFilters, village: filterData });
    } catch (error) {
      console.log("error", error);
    }
  };

  useEffect(() => {
    if (searchFilters.mandal.length === 0) {
      getMandalData();
    }
    if (saveSearchFilters.mandal_id !== "") {
      getDivisionData();
    }
    if (saveSearchFilters.division_id !== "") {
      getSachivalayamData();
    }
    if (saveSearchFilters.sachivalayam_id !== "") {
      console.log("Hi IM here in partNo");
      getPartNoData();
    }
    if (saveSearchFilters.part_no !== "") {
      console.log("Hi IM here in village");
      getVillageData();
    }
  }, [saveSearchFilters]);

  console.log("saveSearchFilters", saveSearchFilters);

  const classes = useStyles();
  return (
    <Page title="Dashboard">
      <Container maxWidth="xl">
        <Typography variant="h4" sx={{ mb: 1 }}>
          Opinion Dashboard
        </Typography>

        <Card sx={{ p: 3 }}>
          <Typography sx={{ pb: 2 }}>Search by filter</Typography>

          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} md={6} lg={2}>
              <Autocomplete
                id="mandal"
                options={searchFilters.mandal}
                renderInput={(params) => <TextField {...params} label="Select Mandal" />}
                onChange={(event, value) => {
                  // console.log("event", event)
                  console.log("value", value);
                  setSaveSearchFilters((prevState) => ({
                    ...prevState,

                    mandal_id: value ? value.mandal_id : "",
                    division_id: "",
                    sachivalayam_id: "",
                    part_no: "",
                    age: "",
                    user_id: "",
                    next_level_user_id: "",
                  }));
                  setSearchFiltersData({
                    ...searchFilters,
                    division: [],
                    sachivalayam: [],
                    partNo: [],
                    age: [],
                    user: [],
                    nextLevelUser: [],
                  });
                }}
              />
            </Grid>
            <Grid item xs={12} md={6} lg={2}>
              <Autocomplete
                disabled={searchFilters.division.length === 0}
                id="division"
                options={searchFilters.division}
                defaultValue={searchFilters.division[0]} // assuming the default value is the first option
                renderInput={(params) => <TextField {...params} label="Select Division" />}
                onChange={(event, value) => {
                  // console.log("event", event)
                  console.log("value", value);
                  setSaveSearchFilters((prevState) => ({
                    ...prevState,

                    division_id: value ? value.division_id : "",
                  }));
                }}
              />
            </Grid>
            <Grid item xs={12} md={6} lg={2}>
              <Autocomplete
                disabled={searchFilters.sachivalayam.length === 0}
                id="sachivalayam"
                options={searchFilters.sachivalayam}
                renderInput={(params) => <TextField {...params} label="Select Sachivalayam" />}
                onChange={(event, value) => {
                  // console.log("event", event)
                  console.log("value", value);
                  setSaveSearchFilters((prevSate) => ({
                    ...prevSate,

                    sachivalayam_id: value ? value.sachivalayam_id : "",
                  }));
                }}
              />
            </Grid>
            <Grid item xs={12} md={6} lg={2}>
              <Autocomplete
                disabled={searchFilters.partNo.length === 0}
                id="partNo"
                options={searchFilters.partNo}
                renderInput={(params) => <TextField {...params} label="Select Part/Booth No" />}
                onChange={(event, value) => {
                  // console.log("event", event)
                  console.log("value", value);
                  setSaveSearchFilters({
                    ...saveSearchFilters,

                    part_no: value ? value.part_no : "",
                  });
                }}
              />
            </Grid>
            <Grid item xs={12} md={6} lg={2}>
              <TextField label="Select Village" fullWidth select />
            </Grid>
            <Grid item xs={12} md={6} lg={2}>
              <Autocomplete
                id="age"
                options={searchFilters.age}
                renderInput={(params) => <TextField {...params} label="Select Age" />}
                onChange={(event, value) => {
                  // console.log("event", event)
                  console.log("value", value);
                  setSaveSearchFilters({
                    ...saveSearchFilters,

                    age: value ? value.age : "",
                  });
                }}
              />
            </Grid>
            <Grid item xs={12} md={6} lg={2}>
              <TextField label="Select User" fullWidth select />
            </Grid>
            <Grid item xs={12} md={6} lg={2}>
              <TextField label="Select Next Level User" fullWidth select />
            </Grid>
            <Grid item xs={12} md={6} lg={2}>
              <LoadingButton variant="contained">Search</LoadingButton>
            </Grid>
          </Grid>
        </Card>

        <Box p={1} />

        <Grid container spacing={3}>
          <Grid item xs={12} md={6} lg={4}>
            <PieChartWidget
              title="Total Voters"
              chartData={[
                { label: "Male", value: 4344 },
                { label: "Female", value: 5435 },
                { label: "Transgender", value: 1443 },
              ]}
              chartColors={[MaleColor, FemaleColor, TransgenderColor]}
            />
          </Grid>

          <Grid item xs={12} md={6} lg={4}>
            <PieChartWidget
              title="Voters Pulse"
              chartData={[
                { label: "YSRCP", value: 4344 },
                { label: "NETURAL", value: 5435 },
                { label: "TDP", value: 1443 },
                { label: "JANASENA", value: 1443 },
                { label: "BJP", value: 1443 },
                { label: "CONGRESS", value: 1443 },
              ]}
              chartColors={[YSRCPColor, NETURALColor, TDPColor, JSPColor, BJPColor, CONGRESSColor, OTHERColor]}
            />
          </Grid>

          <Grid item xs={12} md={6} lg={4}>
            <PieChartWidget
              title="Survey Status"
              chartData={[
                { label: "Started", value: 6966 },
                { label: "Not Started", value: 2542 },
              ]}
              chartColors={[StartedColor, NotStartedColor]}
            />
          </Grid>

          <Grid item xs={12} md={6} lg={4}>
            <PieChartWidget
              title="Ticket Status"
              type="donut"
              chartData={[
                { label: "Open", value: 6966 },
                { label: "Resolved", value: 456 },
                { label: "Cancel", value: 876 },
                { label: "Escalated", value: 2542 },
              ]}
              chartColors={[OpenColor, ResolvedColor, CancelColor, EscalatedColor]}
            />
          </Grid>

          <Grid item xs={12} md={6} lg={8}>
            <BarChartWidget
              title="Ticktes"
              sx={{ height: "100%" }}
              chartLabels={["Pakala", "Ramchandrapuram", "Chinnagottigallu", "Chandragiri", "Yerravanipalem", "Tirupathi (Rural)"]}
              chartColors={[completedColor, pendingColor]}
              chartData={[
                {
                  name: "Completed",
                  data: [21, 7, 25, 13, 22, 8],
                },
                {
                  name: "Pending",
                  data: [7, 7, 5, 13, 7, 3],
                },
              ]}
            />{" "}
          </Grid>

          <Grid item xs={12} md={6} lg={4}>
            <PieChartWidget
              title="Age Wise Voters"
              chartData={[
                { label: "18-25", value: 4344 },
                { label: "25-35", value: 5435 },
                { label: "35-45", value: 2452 },
                { label: "45-55", value: 1443 },
                { label: "55-65", value: 2415 },
                { label: "65+", value: 1443 },
              ]}
              chartColors={[Age1Color, Age2Color, Age3Color, Age4Color, Age5Color, Age6Color]}
            />
          </Grid>

          <Grid item xs={12} md={6} lg={4}>
            <PieChartWidget
              title="New Voter Registrations"
              chartData={[
                { label: "New Registrations", value: 9582 },
                { label: "Pending", value: 2542 },
                { label: "Resolved", value: 3698 },
              ]}
            />
          </Grid>

          <Grid item xs={12} md={6} lg={4}>
            <PieChartWidget
              title="Residental Status"
              chartData={[
                { label: "Residental", value: 9582 },
                { label: "Non Residental", value: 2542 },
              ]}
            />
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
};

const mapStateToProps = (state) => {
  return {
    dashboard: state.dashboard,
  };
};

export default connect(mapStateToProps, null)(DashboardApp);
