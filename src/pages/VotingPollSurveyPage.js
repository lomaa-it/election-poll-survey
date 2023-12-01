import { useEffect, useState } from "react";
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

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

import TablePagination from "@mui/material/TablePagination";
import Autocomplete from "@mui/material/Autocomplete";

import Button from "@mui/material/Button";

import VotingPollSurveyList from "../sections/reports/VotingPollSurveyList";

function totalStats(name, ofOpen, OfResolved, ofCancelled, ofEscalated) {
  return { name, ofOpen, OfResolved, ofCancelled, ofEscalated };
}

const statsRow = [totalStats("200", "100", "100")];

const VotingPollSurveyPage = ({ dashboard }) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const [searchFilters, setSearchFiltersData] = useState({
    mandal: [],
    division: [],
    sachivalayam: [],
    partNo: [],
    village: [],
    voterid: [],
    votername: [],
    phonenumber: [],

    user: [],

    nextLevelUser: [],
  });

  const [saveSearchFilters, setSaveSearchFilters] = useState({
    mandal_id: "",
    division_id: "",
    sachivalayam_id: "",
    part_no: "",
    village_id: "",
    voterid: "",
    votername: "",
    phonenumber: "",
    user_id: "",
    nextLevelUser_id: "",
  });

  // first call mandal api and get all mandals after user select mandal then call division api and get all divisions
  // after user select division then call sachivalayam api and get all sachivalayams
  // after user select sachivalayam then call partNo api and get all partNo
  // after user select partNo then call age api and get all age
  // after user select age then call user api and get all users
  // after user select user then call nextLevelUser api and get all nextLevelUsers
  // after user select nextLevelUser then call search api and get all data

  const filtersLocalData = localStorage.getItem("filtersData");
  const parseJson = JSON.parse(filtersLocalData);

  console.log("parseJson", parseJson);

  const getMandalData = () => {
    const filterData = parseJson.mandals.map((item) => {
      return {
        label: item.mandal_name,
        mandal_id: item.mandal_pk,
      };
    });
    setSearchFiltersData({ ...searchFilters, mandal: filterData });
  };

  const getDivisionData = async () => {
    const divisionData = parseJson.divisions.filter((item) => {
      return item.mandal_id === saveSearchFilters.mandal_id;
    });

    const filterData = divisionData.map((item) => {
      return {
        label: item.division_name,
        division_id: item.division_pk,
      };
    });
    setSearchFiltersData({ ...searchFilters, division: filterData });
  };

  const getSachivalayamData = async () => {
    const sachivalayamData = parseJson.sachivalayams.filter((item) => {
      // console.log("item", item);
      return item.division_pk === saveSearchFilters.division_id;
    });
    // console.log("sachivalayamDsssata", sachivalayamData);

    const filterData = sachivalayamData.map((item) => {
      return {
        label: item.sachivalayam_name,
        sachivalayam_id: item.sachivalayam_pk,
      };
    });
    setSearchFiltersData({ ...searchFilters, sachivalayam: filterData });
  };

  const getPartNoData = async () => {
    console.log("Partssdklsdk", parseJson.parts);
    const partNoData = parseJson.parts.filter((item) => {
      return item.sachivalayam_id === saveSearchFilters.sachivalayam_id;
    });

    const filterData = partNoData.map((item) => {
      return {
        label: item.part_no,
        part_no: item.part_no,
      };
    });
    setSearchFiltersData({ ...searchFilters, partNo: filterData });
  };

  const getVillageData = async () => {
    const villageData = parseJson.villages.filter((item) => {
      return item.part_no === saveSearchFilters.part_no;
    });

    const filterData = villageData.map((item) => {
      return {
        label: item.village_name,
        village_id: item.village_pk,
      };
    });
    setSearchFiltersData({ ...searchFilters, village: filterData });
  };

  useEffect(() => {
    if (saveSearchFilters.mandal_id === "") {
      getMandalData();
    }

    if (saveSearchFilters.mandal_id !== "") {
      getDivisionData();
    }

    if (saveSearchFilters.division_id !== "") {
      getSachivalayamData();
    }

    if (saveSearchFilters.sachivalayam_id !== "") {
      getPartNoData();
    }

    if (saveSearchFilters.part_no !== "") {
      getVillageData();
    }
  }, [saveSearchFilters]);

  return (
    <Page title="View Tickets">
      <Container maxWidth="xl">
        <Typography variant="h4" sx={{ mb: 1 }}>
          Voting Poll Survey
        </Typography>

        <Card sx={{ p: 3 }}>
          <Typography sx={{ pb: 2 }}>Search by filter</Typography>

          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} md={6} lg={2}>
              <Autocomplete
                id="mandal"
                options={searchFilters.mandal}
                renderInput={(params) => (
                  <TextField {...params} label="Select Mandal" />
                )}
                onChange={(event, value) => {
                  // console.log("event", event)
                  console.log("value", value);
                  setSaveSearchFilters((prevState) => ({
                    ...prevState,

                    mandal_id: value ? value.mandal_id : "",
                    division_id: "",
                    sachivalayam_id: "",
                    part_no: "",
                    village_id: "",
                    voterid: "",
                    votername: "",
                    phonenumber: "",
                    user_id: "",
                    nextLevelUser_id: "",
                  }));
                }}
              />
            </Grid>
            <Grid item xs={12} md={6} lg={2}>
              <Autocomplete
                disabled={saveSearchFilters.mandal_id === "" ? true : false}
                id="division"
                options={searchFilters.division}
                defaultValue={searchFilters.division[0]} // assuming the default value is the first option
                renderInput={(params) => (
                  <TextField {...params} label="Select Division" />
                )}
                onChange={(event, value) => {
                  // console.log("event", event)
                  console.log("value", value);
                  setSaveSearchFilters((prevState) => ({
                    ...prevState,

                    division_id: value ? value.division_id : "",
                    sachivalayam_id: "",
                    part_no: "",
                    village_id: "",
                    voterid: "",
                    votername: "",
                    phonenumber: "",
                    user_id: "",
                    nextLevelUser_id: "",
                  }));
                }}
              />
            </Grid>
            <Grid item xs={12} md={6} lg={2}>
              <Autocomplete
                disabled={saveSearchFilters.division_id === "" ? true : false}
                id="sachivalayam"
                options={searchFilters.sachivalayam}
                renderInput={(params) => (
                  <TextField {...params} label="Select Sachivalayam" />
                )}
                onChange={(event, value) => {
                  // console.log("event", event)

                  console.log("value", value);
                  setSaveSearchFilters({
                    ...saveSearchFilters,

                    sachivalayam_id: value ? value.sachivalayam_id : "",

                    part_no: "",
                    village_id: "",
                    voterid: "",
                    votername: "",
                    phonenumber: "",
                    user_id: "",
                    nextLevelUser_id: "",
                  });
                }}
              />
            </Grid>
            <Grid item xs={12} md={6} lg={2}>
              <Autocomplete
                disabled={
                  saveSearchFilters.sachivalayam_id === "" ? true : false
                }
                id="partNo"
                options={searchFilters.partNo}
                renderInput={(params) => (
                  <TextField {...params} label="Select Part/Booth No" />
                )}
                onChange={(event, value) => {
                  // console.log("event", event)
                  console.log("value", value);
                  setSaveSearchFilters({
                    ...saveSearchFilters,

                    part_no: value ? value.part_no : "",
                    village_id: "",

                    voterid: "",
                    votername: "",
                    phonenumber: "",
                    user_id: "",
                    nextLevelUser_id: "",
                  });
                }}
              />
            </Grid>
            <Grid item xs={12} md={6} lg={2}>
              <Autocomplete
                disabled={saveSearchFilters.part_no === "" ? true : false}
                id="village"
                options={searchFilters.village}
                renderInput={(params) => (
                  <TextField {...params} label="Select Village" />
                )}
                onChange={(event, value) => {
                  // console.log("event", event)
                  console.log("value", value);
                  setSaveSearchFilters({
                    ...saveSearchFilters,

                    village_id: value ? value.village_id : "",

                    voterid: "",
                    votername: "",
                    phonenumber: "",
                    user_id: "",
                    nextLevelUser_id: "", 
                  });
                }}
              />
            </Grid>
            <Grid item xs={12} md={6} lg={2}>
              <TextField label="Voter ID" fullWidth select />
            </Grid>
            <Grid item xs={12} md={6} lg={2}>
              <TextField label="Voter Name" fullWidth select />
            </Grid>
            <Grid item xs={12} md={6} lg={2}>
              <TextField label="Phone Number" fullWidth select />
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
            <Grid item xs={12} md={6} lg={6}>
              <TableContainer
                component={Paper}
                sx={{
                  mt: 4,
                }}
              >
                <Table sx={{ minWidth: 650 }} aria-label="caption table">
                  <TableHead>
                    <TableRow>
                      <TableCell
                        align="center"
                        sx={{
                          fontSize: "1.2rem",
                          fontWeight: "bold",
                        }}
                      >
                        Total Voters
                      </TableCell>
                      <TableCell
                        align="center"
                        sx={{ fontSize: "1.2rem", fontWeight: "bold" }}
                      >
                        Survey Completed
                      </TableCell>
                      <TableCell
                        align="center"
                        sx={{ fontSize: "1.2rem", fontWeight: "bold" }}
                      >
                        Pending
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {statsRow.map((row) => (
                      <TableRow key={row.name}>
                        <TableCell
                          align="center"
                          component="th"
                          scope="row"
                          sx={{
                            color: "blue",
                            fontSize: "1.2rem",
                          }}
                        >
                          {row.name}
                        </TableCell>
                        <TableCell
                          align="center"
                          sx={{
                            color: "blue",
                            fontSize: "1.2rem",
                          }}
                        >
                          {row.ofOpen}
                        </TableCell>
                        <TableCell
                          align="center"
                          sx={{
                            color: "blue",
                            fontSize: "1.2rem",
                          }}
                        >
                          {row.OfResolved}
                        </TableCell>
                        <TableCell
                          align="center"
                          sx={{
                            color: "blue",
                            fontSize: "1.2rem",
                          }}
                        >
                          {row.ofCancelled}
                        </TableCell>
                        <TableCell
                          align="center"
                          sx={{
                            color: "blue",
                            fontSize: "1.2rem",
                          }}
                        >
                          {row.ofEscalated}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Grid>
          </Grid>
        </Card>

        <Box p={1} />

        <Grid container spacing={3}>
          <Grid item xs={12} md={6} lg={12}>
            <VotingPollSurveyList />
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

export default connect(mapStateToProps, null)(VotingPollSurveyPage);
