import { useEffect, useState, useRef, useCallback } from "react";
import {
  Typography,
  Card,
  Stack,
  Grid,
  Switch,
  Divider,
  Box,
  CircularProgress,
  TextField,
} from "@mui/material";
import MUIDataTable from "mui-datatables";
import { connect } from "react-redux";
import { showAlert } from "../../actions/alert";
import { LoadingButton } from "@mui/lab";
import SearchByFilter from "../common/SearchByFilter";
import {
  getOpinionResults,
  clearDashboardReducer,
} from "../../actions/dashboard";
import { BarChartWidget } from "../common";
import {
  BJPColor,
  CONGRESSColor,
  JSPColor,
  NETURALColor,
  OTHERColor,
  TDPColor,
  YSRCPColor,
} from "../../utils/constants";
import { searchFiltercolor } from "../../constants";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useLocation } from "react-router-dom";
const SurveyReportsList = ({
  dashboard,
  getOpinionResults,
  clearDashboardReducer,
  account,
}) => {
  const [filterValues, setFilterValues] = useState(null);
  const [isLoading, setLoading] = useState(false);
  const [reset, setReset] = useState(false);
  let location = useLocation();
  const buttonRef = useRef();

  useEffect(() => {
    clearDashboardReducer();
  }, []);

  const handleSubmit = async (filterValues) => {
    await getOpinionResults(filterValues);
  };

  const columns = [
    {
      name: "mandal_name",
      label: "Mandal",
    },
    {
      name: "division_name",
      label: "Division",
    },
    {
      name: "sachivalayam_name",
      label: "Sachivalayam",
    },
    {
      name: "part_no",
      label: "Part No",
    },
    {
      name: "village_name",
      label: "Village",
    },
    {
      name: "totalvoters",
      label: "Total Votes",
    },
    {
      name: "neutral",
      label: "Neutral (Votes)",
    },
    {
      name: "pneutral",
      label: "Neutral (%)",
      options: {
        customBodyRender: (value, tableMeta, updateValue) => {
          return value + "%";
        },
      },
    },
    {
      name: "ysrcp",
      label: "YCP (Votes)",
    },
    {
      name: "pysrcp",
      label: "YCP (%)",
      options: {
        customBodyRender: (value, tableMeta, updateValue) => {
          return value + "%";
        },
      },
    },
    {
      name: "tdp",
      label: "TDP (Votes)",
    },
    {
      name: "ptdp",
      label: "TDP (%)",
      options: {
        customBodyRender: (value, tableMeta, updateValue) => {
          return value + "%";
        },
      },
    },
    {
      name: "janasena",
      label: "JSP (Votes)",
    },
    {
      name: "pjanasena",
      label: "JSP (%)",
      options: {
        customBodyRender: (value, tableMeta, updateValue) => {
          return value + "%";
        },
      },
    },
    {
      name: "congress",
      label: "Congress (Votes)",
    },
    {
      name: "pcongress",
      label: "Congress (%)",
      options: {
        customBodyRender: (value, tableMeta, updateValue) => {
          return value + "%";
        },
      },
    },
    {
      name: "bjp",
      label: "BJP (Votes)",
    },
    {
      name: "pbjp",
      label: "BJP (%)",
      options: {
        customBodyRender: (value, tableMeta, updateValue) => {
          return value + "%";
        },
      },
    },
    {
      name: "otherss",
      label: "Others (Votes)",
    },
    {
      name: "pothers",
      label: "Others (%)",
      options: {
        customBodyRender: (value, tableMeta, updateValue) => {
          return value + "%";
        },
      },
    },
  ];
  let options = {};

  if (account.user?.desgination_name === "MLA") {
    options = {
      elevation: 0,
      selectableRows: "none",
      responsive: "standard",
    };
  } else {
    options = {
      elevation: 0,
      selectableRows: "none",
      responsive: "standard",
      filter: false,
      search: false,
      download: false,
      print: false,
      viewColumns: false,
    };
  }

  const getMuiTheme = () =>
    createTheme({
      components: {
        MUIDataTableHeadCell: {
          styleOverrides: {
            root: {
              backgroundColor: searchFiltercolor,
            },
          },
        },
      },
    });

  return (
    <>
      <Card sx={{ p: 3, backgroundColor: searchFiltercolor }}>
        <Grid container spacing={2} alignItems="center">
          <SearchByFilter onSubmit={handleSubmit} />

          {/* <Grid item xs={12} md={6} lg={2}>
            <TextField
              size="small"
              label="Select User"
              fullWidth
              select
              sx={{
                backgroundColor: "#fff",
                borderRadius: "5px",
              }}
            />
          </Grid>

          <Grid item xs={12} md={6} lg={2}>
            <TextField
              size="small"
              label="Select Next Level User"
              fullWidth
              select
              sx={{
                backgroundColor: "#fff",
                borderRadius: "5px",
              }}
            />
          </Grid> */}
        </Grid>
      </Card>

      <Box p={1} />

      <Card elevation={1}>
        {dashboard.isLoading && (
          <Box
            minHeight={200}
            display="flex"
            justifyContent="center"
            alignItems="center"
          >
            <CircularProgress />
          </Box>
        )}

        {!dashboard.isLoading && (
          <>
            <Box p={2}>
              <BarChartWidget
                distributed={true}
                withCard={false}
                chartLabels={[
                  "Neutral",
                  "YCP",
                  "TDP",
                  "JSP",
                  "Congress",
                  "BJP",
                  "Others",
                ]}
                chartData={[
                  {
                    name: "Total",
                    data: [
                      dashboard.opinionResults.reduce(
                        (sum, e) => sum + e.neutral,
                        0
                      ),
                      dashboard.opinionResults.reduce(
                        (sum, e) => sum + e.ysrcp,
                        0
                      ),
                      dashboard.opinionResults.reduce(
                        (sum, e) => sum + e.tdp,
                        0
                      ),
                      dashboard.opinionResults.reduce(
                        (sum, e) => sum + e.janasena,
                        0
                      ),
                      dashboard.opinionResults.reduce(
                        (sum, e) => sum + e.congress,
                        0
                      ),
                      dashboard.opinionResults.reduce(
                        (sum, e) => sum + e.bjp,
                        0
                      ),
                      dashboard.opinionResults.reduce(
                        (sum, e) => sum + e.otherss,
                        0
                      ),
                    ],
                  },
                ]}
                chartColors={[
                  NETURALColor,
                  YSRCPColor,
                  TDPColor,
                  JSPColor,
                  CONGRESSColor,
                  BJPColor,
                  OTHERColor,
                ]}
              />
            </Box>

            <Divider />
            <ThemeProvider theme={getMuiTheme()}>
              <MUIDataTable
                title="Opinion Reports"
                columns={columns}
                data={dashboard.opinionResults}
                options={options}
              />
            </ThemeProvider>
          </>
        )}
      </Card>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    dashboard: state.dashboard,
    account: state.auth,
  };
};

export default connect(mapStateToProps, {
  getOpinionResults,
  clearDashboardReducer,
})(SurveyReportsList);
