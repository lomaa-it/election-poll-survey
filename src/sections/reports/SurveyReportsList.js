import { useEffect, useState, useRef, useCallback } from "react";
import { Typography, Card, Stack, Grid, Switch, Divider, Box, CircularProgress, TextField, TableContainer, Table, TableRow, TableBody, TableHead, TableCell, TableFooter, Paper } from "@mui/material";
import { connect } from "react-redux";
import { showAlert } from "../../actions/alert";
import { LoadingButton } from "@mui/lab";
import SearchByFilter from "../common/SearchByFilter";
import { getOpinionResults, clearDashboardReducer } from "../../actions/dashboard";
import { BarChartWidget } from "../common";
import { BJPColor, CONGRESSColor, JSPColor, NETURALColor, OTHERColor, TDPColor, YSRCPColor } from "../../utils/constants";
import { searchFiltercolor } from "../../constants";
import { useLocation } from "react-router-dom";

const SurveyReportsList = ({ dashboard, getOpinionResults, clearDashboardReducer, account }) => {
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

  return (
    <>
      <Card sx={{ p: 3, backgroundColor: searchFiltercolor }}>
        <Grid container spacing={2} alignItems="center">
          <SearchByFilter onSubmit={handleSubmit} />
        </Grid>
      </Card>

      <Box p={1} />

      {dashboard.isLoading && (
        <Box minHeight={200} display="flex" justifyContent="center" alignItems="center">
          <CircularProgress />
        </Box>
      )}

      {!dashboard.isLoading && (
        <Grid container spacing={1}>
          <Grid item xs={12} md={6}>
            <CustomizedTables
              labels={["S.No", "Mandal Name", "No of Polling Stations", "Male", "Female", "TG", "Total"]}
              rows={[
                ["1", "Yerravanipalem", "29", "11,398", "11,360", "2", "22,600"],
                ["2", "Yerravanipalem", "29", "11,398", "11,360", "2", "22,600"],
                ["3", "Yerravanipalem", "29", "11,398", "11,360", "2", "22,600"],
                ["3", "Yerravanipalem", "29", "11,398", "11,360", "2", "22,600"],
                ["3", "Yerravanipalem", "29", "11,398", "11,360", "2", "22,600"],
                ["3", "Yerravanipalem", "29", "11,398", "11,360", "2", "22,600"],
              ]}
              total={["", "Total", "29", "11,398", "11,360", "2", "22,600"]}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <CustomizedTables
              labels={["Neutral", "YCP", "TDP", "JSP", "Congress"]}
              rows={[
                ["999", "888", "111", "112", "111"],
                ["999", "888", "111", "112", "111"],
                ["999", "888", "111", "112", "111"],
                ["999", "888", "111", "112", "111"],
                ["999", "888", "111", "112", "111"],
                ["999", "888", "111", "112", "111"],
                ["999", "888", "111", "112", "111"],
              ]}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <Card elevation={1}>
              <Box p={2}>
                <BarChartWidget
                  distributed={true}
                  withCard={false}
                  chartLabels={["Neutral", "YCP", "TDP", "JSP", "Congress", "BJP", "Others"]}
                  chartData={[
                    {
                      name: "Total",
                      data: [
                        dashboard.opinionResults.reduce((sum, e) => sum + e.neutral, 0),
                        dashboard.opinionResults.reduce((sum, e) => sum + e.ysrcp, 0),
                        dashboard.opinionResults.reduce((sum, e) => sum + e.tdp, 0),
                        dashboard.opinionResults.reduce((sum, e) => sum + e.janasena, 0),
                        dashboard.opinionResults.reduce((sum, e) => sum + e.congress, 0),
                        dashboard.opinionResults.reduce((sum, e) => sum + e.bjp, 0),
                        dashboard.opinionResults.reduce((sum, e) => sum + e.otherss, 0),
                      ],
                    },
                  ]}
                  chartColors={[NETURALColor, YSRCPColor, TDPColor, JSPColor, CONGRESSColor, BJPColor, OTHERColor]}
                />
              </Box>
            </Card>
          </Grid>

          <Grid item xs={12} md={6}>
            <CustomizedTables
              labels={["Neutral", "YCP", "TDP", "JSP", "Congress"]}
              rows={[
                ["10%", "20%", "50%", "3%", "2%"],
                ["10%", "20%", "50%", "3%", "2%"],
                ["10%", "20%", "50%", "3%", "2%"],
                ["10%", "20%", "50%", "3%", "2%"],
                ["10%", "20%", "50%", "3%", "2%"],
                ["10%", "20%", "50%", "3%", "2%"],
                ["10%", "20%", "50%", "3%", "2%"],
              ]}
            />
          </Grid>
        </Grid>
      )}
    </>
  );
};

function CustomizedTables({ labels, rows, total }) {
  return (
    <TableContainer component={Paper}>
      <Table size="small">
        <TableHead>
          <TableRow>
            {labels?.map((item, index) => (
              <TableCell key={index} sx={{ backgroundColor: searchFiltercolor }}>
                {item}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row, index) => (
            <TableRow key={index}>
              {row?.map((item, index2) => (
                <TableCell key={index2}>{item}</TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
        <TableHead>
          <TableRow>
            {total?.map((item, index) => (
              <TableCell key={index} sx={{ backgroundColor: searchFiltercolor }}>
                {item}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
      </Table>
    </TableContainer>
  );
}

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
