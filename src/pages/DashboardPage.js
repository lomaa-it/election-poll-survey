import { useCallback, useEffect, useRef, useState } from "react";
import {
  Grid,
  Container,
  Typography,
  Box,
  TextField,
  Card,
  MenuItem,
  CircularProgress,
} from "@mui/material";
import Page from "../components/Page";
import { connect } from "react-redux";
import { BarChartWidget, PieChartWidget } from "../sections/common";
import * as Colors from "../utils/constants";
import SearchByFilter from "../sections/common/SearchByFilter";
import { LoadingButton } from "@mui/lab";
import { ageDropdown } from "../utils/dropdownconstants";
import {
  getOpinionDashboard,
  clearDashboardReducer,
} from "../actions/dashboard";
import { casteList, searchFiltercolor } from "../constants";
import { useLocation } from "react-router-dom";
import { da } from "date-fns/locale";
import { Label } from "@mui/icons-material";

const DashboardApp = ({
  dashboard,
  getOpinionDashboard,
  clearDashboardReducer,
}) => {
  useEffect(() => {
    clearDashboardReducer();
  }, []);

  const handleSubmit = async (filterValues) => {
    await getOpinionDashboard(filterValues);
  };

  console.log("dashboard.opinion", dashboard.opinion);

  return (
    <Page title="Survey Dashboard">
      <Container maxWidth="xl">
        {/* <Typography variant="h4" sx={{ mb: 1 }}>
          Opinion Dashboard
        </Typography> */}

        <Card sx={{ p: 3, backgroundColor: searchFiltercolor }}>
          <Grid container spacing={2} alignItems="center">
            <SearchByFilter onSubmit={handleSubmit} />
            {/* <Grid item xs={12} md={6} lg={2}>
              <TextField
                size="small"
                sx={{
                  backgroundColor: "#fff",
                  borderRadius: "5px",
                }}
                label="Select User"
                fullWidth
                select
              />
            </Grid>

            <Grid item xs={12} md={6} lg={2}>
              <TextField
                size="small"
                sx={{
                  backgroundColor: "#fff",
                  borderRadius: "5px",
                }}
                label="Select Next Level User"
                fullWidth
                select
              />
            </Grid> */}
          </Grid>
        </Card>

        <Box p={1} />

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
          <Grid container spacing={3}>
            <Grid item xs={12} md={6} lg={4}>
              <PieChartWidget
                title={`Total Voters-${dashboard.opinion?.totalVoters ?? 0}`}
                chartData={[
                  {
                    label: "Male",
                    value: dashboard.opinion?.gender?.["MALE"] ?? 0,
                  },
                  {
                    label: "Female",
                    value: dashboard.opinion?.gender?.["FEMALE"] ?? 0,
                  },
                  {
                    label: "Transgender",
                    value: dashboard.opinion?.gender?.["THIRD"] ?? 0,
                  },
                ]}
                chartColors={[
                  Colors.MaleColor,
                  Colors.FemaleColor,
                  Colors.TransgenderColor,
                ]}
              />
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <PieChartWidget
                title={`Survey Status -${dashboard.opinion?.totalVoters ?? 0}`}
                chartData={[
                  {
                    label: "Completed",
                    value: dashboard.opinion?.survey_completed ?? 0,
                    // value: 100,
                  },
                  {
                    label: "Not Completed",
                    value: dashboard.opinion?.survey_not_completed ?? 0,
                  },
                ]}
                chartColors={[Colors.StartedColor, Colors.NotStartedColor]}
              />
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <PieChartWidget
                title={`Voters Pulse -${
                  dashboard.opinion?.survey_completed ?? 0
                }`}
                chartData={[
                  {
                    label: "YSRCP",
                    value: dashboard.opinion?.voter_pulse?.[1]?.count ?? 0,
                  },
                  {
                    label: "NETURAL",
                    value: dashboard.opinion?.voter_pulse?.[0]?.count ?? 0,
                  },
                  {
                    label: "TDP",
                    value: dashboard.opinion?.voter_pulse?.[2]?.count ?? 0,
                  },
                  {
                    label: "JANASENA",
                    value: dashboard.opinion?.voter_pulse?.[5]?.count ?? 0,
                  },
                  {
                    label: "BJP",
                    value: dashboard.opinion?.voter_pulse?.[4]?.count ?? 0,
                  },
                  {
                    label: "CONGRESS",
                    value: dashboard.opinion?.voter_pulse?.[3]?.count ?? 0,
                  },
                  {
                    label: "OTHERS",
                    value: dashboard.opinion?.voter_pulse?.[6]?.count ?? 0,
                  },
                ]}
                chartColors={[
                  Colors.YSRCPColor,
                  Colors.NETURALColor,
                  Colors.TDPColor,
                  Colors.JSPColor,
                  Colors.BJPColor,
                  Colors.CONGRESSColor,
                  Colors.OTHERColor,
                ]}
              />
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <PieChartWidget
                title="Ticket Status"
                type="donut"
                chartData={[
                  {
                    label: "Open",
                    value: dashboard.opinion?.ticket_status?.[0]?.count ?? 0,
                  },
                  {
                    label: "Resolved",
                    value: dashboard.opinion?.ticket_status?.[1]?.count ?? 0,
                  },
                  {
                    label: "Cancel",
                    value: dashboard.opinion?.ticket_status?.[2]?.count ?? 0,
                  },
                  {
                    label: "Escalated",
                    value: dashboard.opinion?.ticket_status?.[3]?.count ?? 0,
                  },
                ]}
                chartColors={[
                  Colors.OpenColor,
                  Colors.ResolvedColor,
                  Colors.CancelColor,
                  Colors.EscalatedColor,
                ]}
              />
            </Grid>
            <Grid item xs={12} md={6} lg={8}>
              <BarChartWidget
                title="Tickets"
                sx={{ height: "100%" }}
                // chartLabels={[
                //   dashboard.opinion?.ticket_status_by_mandal?.[0]
                //     ?.mandal_name ?? "Mandal 1",
                //   dashboard.opinion?.ticket_status_by_mandal?.[1]
                //     ?.mandal_name ?? "Mandal 2",
                //   dashboard.opinion?.ticket_status_by_mandal?.[2]
                //     ?.mandal_name ?? "Mandal 3",
                //   dashboard.opinion?.ticket_status_by_mandal?.[3]
                //     ?.mandal_name ?? "Mandal 4",
                //   dashboard.opinion?.ticket_status_by_mandal?.[4]
                //     ?.mandal_name ?? "Mandal 5",
                //   dashboard.opinion?.ticket_status_by_mandal?.[5]
                //     ?.mandal_name ?? "Mandal 6",
                // ]}

                chartLabels={(
                  dashboard.opinion?.ticket_status_by_mandal || []
                ).map((item) => item.mandal_name ?? "Mandal")}
                chartColors={[
                  Colors.OpenColor,
                  Colors.ResolvedColor,
                  Colors.CancelColor,
                  Colors.EscalatedColor,
                ]}
                chartData={[
                  {
                    name: "Open",
                    data: dashboard.opinion?.ticket_status_by_mandal?.map(
                      (item) =>
                        item.open !== null && item.open !== undefined
                          ? parseInt(item.open)
                          : 0
                    ),
                  },
                  {
                    name: "Resolved",
                    data: dashboard.opinion?.ticket_status_by_mandal?.map(
                      (item) => parseInt(item.resolved) ?? 0
                    ),
                  },
                  {
                    name: "Cancel",
                    data: dashboard.opinion?.ticket_status_by_mandal?.map(
                      (item) => parseInt(item.canceled) ?? 0
                    ),
                  },
                  {
                    name: "Escalated",
                    data: dashboard.opinion?.ticket_status_by_mandal?.map(
                      (item) => parseInt(item.escalated) ?? 0
                    ),
                  },
                ]}
              />
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <PieChartWidget
                title={`Age Wise Voters -${
                  dashboard.opinion?.survey_completed ?? 0
                }`}
                chartData={[
                  {
                    label: "18-25",
                    value: dashboard.opinion?.age_wise?.[0].survey_count ?? 0,
                  },
                  {
                    label: "25-35",
                    value: dashboard.opinion?.age_wise?.[1].survey_count ?? 0,
                  },
                  {
                    label: "35-45",
                    value: dashboard.opinion?.age_wise?.[2].survey_count ?? 0,
                  },
                  {
                    label: "45-55",
                    value: dashboard.opinion?.age_wise?.[3].survey_count ?? 0,
                  },
                  {
                    label: "55-65",
                    value: dashboard.opinion?.age_wise?.[4].survey_count ?? 0,
                  },
                  {
                    label: "65-80",
                    value: dashboard.opinion?.age_wise?.[5].survey_count ?? 0,
                  },
                  {
                    label: "80+",
                    value: dashboard.opinion?.age_wise?.[6].survey_count ?? 0,
                  },
                ]}
                chartColors={[
                  Colors.Age1Color,
                  Colors.Age2Color,
                  Colors.Age3Color,
                  Colors.Age4Color,
                  Colors.Age5Color,
                  Colors.Age6Color,
                ]}
              />
            </Grid>{" "}
            <Grid item xs={12} md={6} lg={4}>
              <PieChartWidget
                title={`Disability (40% or above) -${
                  dashboard.opinion?.survey_completed ?? 0
                }`}
                chartData={[
                  {
                    label: "YES",
                    value:
                      dashboard.opinion?.disability_status?.[0]?.count ?? 0,
                  },
                  {
                    label: "NO",
                    value:
                      dashboard.opinion?.disability_status?.[1]?.count ?? 0,
                  },
                ]}
                chartColors={[Colors.OpenColor, Colors.CancelColor]}
              />
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <PieChartWidget
                title={`Govt. Employees -${
                  dashboard.opinion?.survey_completed ?? 0
                }`}
                chartData={[
                  {
                    label: "YES",
                    value:
                      dashboard.opinion?.govt_employee_status?.[0]?.count ?? 0,
                  },
                  {
                    label: "NO",
                    value:
                      dashboard.opinion?.govt_employee_status?.[1]?.count ?? 0,
                  },
                ]}
                chartColors={[Colors.OpenColor, Colors.CancelColor]}
              />
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <PieChartWidget
                title={`Residential Status -${
                  dashboard.opinion?.survey_completed ?? 0
                }`}
                chartData={[
                  {
                    label: "Residental",
                    value:
                      dashboard.opinion?.residential_status?.[1]?.count ?? 0,
                  },
                  {
                    label: "Non Residental",
                    value:
                      dashboard.opinion?.residential_status?.[0]?.count ?? 0,
                  },
                ]}
                chartColors={[Colors.OpenColor, Colors.CancelColor]}
              />
            </Grid>{" "}
            <Grid item xs={12} md={6} lg={4}>
              <PieChartWidget
                title={`Religion Wise -${
                  dashboard.opinion?.survey_completed ?? 0
                }`}
                chartData={(dashboard.opinion?.religion_wise ?? []).map(
                  (item) => ({
                    label: item.religion,
                    value: item.count,
                  })
                )}
              />
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <PieChartWidget
                title={`Caste Wise -${
                  dashboard.opinion?.survey_completed ?? 0
                }`}
                chartData={(dashboard.opinion?.caste_wise ?? []).map(
                  (item) => ({
                    label: item.caste,
                    value: item.count,
                  })
                )}
              />
            </Grid>
            {/* <Grid item xs={12} md={6} lg={4}>
              <PieChartWidget
                title="New Voter Registrations"
                chartData={[
                  {
                    label: "New Registrations",
                    value: dashboard.opinion?.registrations?.["new"] ?? 0,
                  },
                  {
                    label: "Pending",
                    value: dashboard.opinion?.registrations?.["pending"] ?? 0,
                  },
                  {
                    label: "Resolved",
                    value: dashboard.opinion?.registrations?.["resolved"] ?? 0,
                  },
                ]}
              />
            </Grid> */}
          </Grid>
        )}
      </Container>
    </Page>
  );
};

const mapStateToProps = (state) => {
  return {
    dashboard: state.dashboard,
  };
};

export default connect(mapStateToProps, {
  getOpinionDashboard,
  clearDashboardReducer,
})(DashboardApp);
