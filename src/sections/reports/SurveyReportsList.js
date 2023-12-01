import { useEffect, useState } from "react";
import {
  Typography,
  Card,
  Stack,
  Grid,
  Switch,
  Divider,
  Box,
  Chip,
  TextField,
} from "@mui/material";
import MUIDataTable from "mui-datatables";
import { connect } from "react-redux";
import { showAlert } from "../../actions/alert";
import { LoadingButton } from "@mui/lab";
import PollResultsBarChartWidget from "../opinionPollSurveyResults/PollResultsBarChartWidget";
import Autocomplete from "@mui/material/Autocomplete";

const SurveyReportsList = ({ showAlert }) => {
  const [searchFilters, setSearchFiltersData] = useState({
    mandal: [],
    division: [],
    sachivalayam: [],
    partNo: [],
    village: [],
    user: [],
    nextLevelUser: [],
  });

  const [saveSearchFilters, setSaveSearchFilters] = useState({
    mandal_id: "",
    division_id: "",
    sachivalayam_id: "",
    part_no: "",
    village_id: "",
    user_id: "",
    next_level_user_id: "",
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

  const columns = [
    {
      label: "Mandal Name",
    },
    {
      label: "Divsion Name",
    },
    {
      label: "Sachivalayam Name",
    },
    {
      label: "Part No",
    },
    {
      label: "Village Name",
    },
    {
      label: "Total Votes",
    },
    {
      label: "YCP (Votes)",
    },
    {
      label: "YCP (%)",
    },
    {
      label: "TDP (Votes)",
    },
    {
      label: "TDP (%)",
    },

    {
      label: "JSP (Votes)",
    },
    {
      label: "JSP (%)",
    },
    {
      label: "BJP (Votes)",
    },
    {
      label: "BJP (%)",
    },
    {
      label: "Others (Votes)",
    },
    {
      label: "Others (%)",
    },
  ];

  const options = {
    elevation: 0,
    selectableRows: "none",
    responsive: "standard",
  };

  return (
    <Card elevation={1}>
      <Stack>
        <Box
          p={3}
          sx={{
            mb: 2,
          }}
        >
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
                    age: "",
                    user_id: "",
                    next_level_user_id: "",
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
                    age: "",
                    user_id: "",
                    next_level_user_id: "",
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
                    age: "",
                    user_id: "",
                    next_level_user_id: "",
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
                    age: "",
                    user_id: "",
                    next_level_user_id: "",
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
                    age: "",
                    user_id: "",
                    next_level_user_id: "",
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
        </Box>

        <Divider />
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} md={6} lg={8}>
            <PollResultsBarChartWidget
              title=""
              sx={{ height: "100%" }}
              chartLabels={["YCP", "TDP", "JSP", "BJP", "Others"]}
              chartData={[
                {
                  name: "Total",
                  data: ["150", 120, 100, 80, 50],
                },
              ]}
            />
          </Grid>
        </Grid>

        <MUIDataTable
          title="Survey Analysis"
          columns={columns}
          data={[
            [
              "Mandal 1",
              "Divsion 1",
              "Sachivalayam 1",
              "6",
              "Village 1",
              "25000",
              "2522",
              "69%",
              "888",
              "24%",
              "699",
              "5%",
              "455",
              "4%",
              "230",
              "2%",
            ],
            [
              "Mandal 2",
              "Divsion 1",
              "Sachivalayam 1",
              "1",
              "Village 1",
              "25000",
              "2522",
              "69%",
              "888",
              "24%",
              "699",
              "5%",
              "455",
              "4%",
              "230",
              "2%",
            ],
            [
              "Mandal 3",
              "Divsion 1",
              "Sachivalayam 1",
              "2",
              "Village 1",
              "25000",
              "2522",
              "69%",
              "888",
              "24%",
              "699",
              "5%",
              "455",
              "4%",
              "230",
              "2%",
            ],
            [
              "Mandal 4",
              "Divsion 1",
              "Sachivalayam 1",
              "3",
              "Village 1",
              "25000",
              "2522",
              "69%",
              "888",
              "24%",
              "699",
              "5%",
              "455",
              "4%",
              "230",
              "2%",
            ],
          ]}
          options={options}
        />
      </Stack>
    </Card>
  );
};

const mapStateToProps = (state) => {
  return {
    batches: state.common,
    students: state.management,
  };
};

export default connect(mapStateToProps, {
  showAlert,
})(SurveyReportsList);
