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
import { RHFAutoComplete } from "../../components/hook-form";

const SurveyReportsList = ({ dashboard, getOpinionResults, clearDashboardReducer, account, common }) => {
  const [filterValues, setFilterValues] = useState(null);
  const [isLoading, setLoading] = useState(false);
  const [reset, setReset] = useState(false);

  const [otherFilterValues, setOtherFilterValues] = useState({
    intrested_party: null,
    is_resident: null,
  });
  let location = useLocation();
  const buttonRef = useRef();

  useEffect(() => {
    clearDashboardReducer();
  }, []);

  const handleSubmit = async (filterValues) => {
    const jsonData = {
      ...filterValues,
      intrested_party: otherFilterValues.intrested_party?.value ?? null,
      is_resident: otherFilterValues.is_resident?.value ?? null,
    };

    await getOpinionResults(jsonData);
  };

  return (
    <>
      <Card sx={{ p: 3, backgroundColor: searchFiltercolor }}>
        <Grid container spacing={2} alignItems="center">
          <SearchByFilter
            onSubmit={handleSubmit}
            children={
              <>
                <Grid item xs={12} md={6} lg={2}>
                  <RHFAutoComplete
                    name="intrested_party"
                    label="Select Party"
                    value={otherFilterValues.intrested_party}
                    options={common?.parties}
                    getOptionLabel={(option) => option.label}
                    onChange={(name, value) =>
                      setOtherFilterValues((state) => ({
                        ...state,
                        [name]: value,
                      }))
                    }
                  />
                </Grid>

                <Grid item xs={12} md={6} lg={2}>
                  <RHFAutoComplete
                    name="is_resident"
                    label="Select Residence"
                    value={otherFilterValues.is_resident}
                    options={[
                      {
                        label: "Resident",
                        value: 1,
                      },
                      {
                        label: "Non-Resident",
                        value: 0,
                      },
                    ]}
                    getOptionLabel={(option) => option.label}
                    onChange={(name, value) =>
                      setOtherFilterValues((state) => ({
                        ...state,
                        [name]: value,
                      }))
                    }
                  />
                </Grid>
              </>
            }
          />
        </Grid>
      </Card>

      <Box p={1} />

      {dashboard.isLoading && (
        <Box minHeight={200} display="flex" justifyContent="center" alignItems="center">
          <CircularProgress />
        </Box>
      )}

      {!dashboard.isLoading && dashboard.surveyReports1 && (
        <Grid container spacing={1}>
          <Grid item xs={12} md={6}>
            <CustomizedTables
              labels={["S.No", "Mandal Name", "#Polling Stations", "Male", "Female", "TG", "Total"]}
              rows={dashboard.surveyReports1.survey_summary_by_constituency.map((item, index) => [index + 1, item.mandal_name, item.parts_count, item.male_voters, item.female_voters, item.other_voters, item.total_voters])}
              total={[
                "",
                "Total",
                dashboard.surveyReports1?.all_totals?.final_polling_totals ?? 0,
                dashboard.surveyReports1?.all_totals?.final_male_total ?? 0,
                dashboard.surveyReports1?.all_totals?.final_female_total ?? 0,
                dashboard.surveyReports1?.all_totals?.final_others_total ?? 0,
                dashboard.surveyReports1?.all_totals?.final_total ?? 0,
              ]}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <CustomizedTables
              labels={["Neutral", "YCP", "TDP", "JSP", "Others", "Not Traced"]}
              rows={dashboard.surveyReports2?.survey_results_by_constituency.map((item, index) => [item.neutral, item.ysrcp, item.tdp, item.janasena, item.others, item.not_traced])}
              total={[
                dashboard.surveyReports2?.all_totals?.neutral_count ?? 0,
                dashboard.surveyReports2?.all_totals?.ycp_count ?? 0,
                dashboard.surveyReports2?.all_totals?.tdp_count ?? 0,
                dashboard.surveyReports2?.all_totals?.jsp_count ?? 0,
                dashboard.surveyReports2?.all_totals?.others_count ?? 0,
                dashboard.surveyReports2?.all_totals?.not_traced_count ?? 0,
              ]}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <Card elevation={1}>
              <Box p={2}>
                <BarChartWidget
                  distributed={true}
                  withCard={false}
                  chartLabels={["Neutral", "YCP", "TDP", "JSP", "Others", "Not Traced"]}
                  chartData={[
                    {
                      name: "Total",
                      data: [
                        dashboard.surveyReports2?.survey_results_by_constituency.map((item) => (item.neutral == null || Number.isNaN(Number(item.neutral)) ? 0 : parseInt(item.neutral))).reduce((a, b) => a + b, 0),
                        dashboard.surveyReports2?.survey_results_by_constituency.map((item) => (item.ysrcp == null || Number.isNaN(Number(item.ysrcp)) ? 0 : parseInt(item.ysrcp))).reduce((a, b) => a + b, 0),
                        dashboard.surveyReports2?.survey_results_by_constituency.map((item) => (item.tdp == null || Number.isNaN(Number(item.tdp)) ? 0 : parseInt(item.tdp))).reduce((a, b) => a + b, 0),
                        dashboard.surveyReports2?.survey_results_by_constituency.map((item) => (item.janasena == null || Number.isNaN(Number(item.janasena)) ? 0 : parseInt(item.janasena))).reduce((a, b) => a + b, 0),
                        dashboard.surveyReports2?.survey_results_by_constituency.map((item) => (item.others == null || Number.isNaN(Number(item.others)) ? 0 : parseInt(item.others))).reduce((a, b) => a + b, 0),
                        dashboard.surveyReports2?.survey_results_by_constituency.map((item) => (item.not_traced == null || Number.isNaN(Number(item.not_traced)) ? 0 : parseInt(item.not_traced))).reduce((a, b) => a + b, 0),
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
              labels={["Neutral", "YCP", "TDP", "JSP", "Others", "Not Traced"]}
              rows={dashboard.surveyReports2?.survey_results_by_constituency.map((item, index) => [item.neutral_percent, item.ysrcp_percent, item.tdp_percent, item.janasena_percent, item.others_percent, item.not_traced_percent])}
              total={[
                dashboard.surveyReports2?.all_percentage_totals?.neutral_percentage_count ?? 0,
                dashboard.surveyReports2?.all_percentage_totals?.ycp_percentage_count ?? 0,
                dashboard.surveyReports2?.all_percentage_totals?.tdp_percentage_count ?? 0,
                dashboard.surveyReports2?.all_percentage_totals?.jsp_percentage_count ?? 0,
                dashboard.surveyReports2?.all_percentage_totals?.others_percentage_count ?? 0,
                dashboard.surveyReports2?.all_percentage_totals?.not_traced_percentage_count ?? 0,
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
              <TableCell key={index} sx={{ backgroundColor: searchFiltercolor, textAlign: "right" }}>
                {item}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row, index) => (
            <TableRow key={index}>
              {row?.map((item, index2) => (
                <TableCell
                  key={index2}
                  sx={{
                    textAlign: "right",
                  }}
                >
                  {item}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
        <TableHead>
          <TableRow>
            {total?.map((item, index) => (
              <TableCell key={index} sx={{ backgroundColor: searchFiltercolor, textAlign: "right" }}>
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
    common: state.common,
  };
};

export default connect(mapStateToProps, {
  getOpinionResults,
  clearDashboardReducer,
})(SurveyReportsList);
