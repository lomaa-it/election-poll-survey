import { useEffect, useState } from "react";
import { Grid, Container, Typography, Box, TextField, Card, MenuItem, CircularProgress } from "@mui/material";
import Page from "../components/Page";
import { connect } from "react-redux";
import { BarChartWidget, PieChartWidget } from "../sections/common";
import * as Colors from "../utils/constants";
import SearchByFilter from "../sections/common/SearchByFilter";
import { LoadingButton } from "@mui/lab";
import { ageDropdown } from "../utils/dropdownconstants";
import { getOpinionDashboard, clearDashboardReducer } from "../actions/dashboard";
import { casteList, searchFiltercolor } from "../constants";

const DashboardApp = ({ dashboard, getOpinionDashboard, clearDashboardReducer }) => {
  const [filterValues, setFilterValues] = useState(null);
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    clearDashboardReducer();
  }, []);

  const onSubmit = async () => {
    setLoading(true);

    await getOpinionDashboard(filterValues);

    setLoading(false);
  };

  return (
    <Page title="Dashboard">
      <Container maxWidth="xl">
        <Typography variant="h4" sx={{ mb: 1 }}>
          Opinion Dashboard
        </Typography>

        <Card sx={{ p: 3, backgroundColor: searchFiltercolor }}>
          <Typography sx={{ pb: 2 }}>Search by filter</Typography>

          <Grid container spacing={2} alignItems="center">
            <SearchByFilter onChanged={(value) => setFilterValues(value)} />

            <Grid item xs={12} md={6} lg={2}>
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
            </Grid>

            <Grid item xs={12} md={6} lg={2}>
              <LoadingButton loading={isLoading} variant="contained" onClick={onSubmit}>
                Search
              </LoadingButton>
            </Grid>
          </Grid>
        </Card>

        <Box p={1} />

        {dashboard.isLoading && (
          <Box minHeight={200} display="flex" justifyContent="center" alignItems="center">
            <CircularProgress />
          </Box>
        )}

        {!dashboard.isLoading && (
          <Grid container spacing={3}>
            <Grid item xs={12} md={6} lg={4}>
              <PieChartWidget
                title="Total Voters"
                chartData={[
                  {
                    label: "Male",
                    value: dashboard.opinion?.gender?.["male"] ?? 0,
                  },
                  {
                    label: "Female",
                    value: dashboard.opinion?.gender?.["female"] ?? 0,
                  },
                  {
                    label: "Transgender",
                    value: dashboard.opinion?.gender?.["tg"] ?? 0,
                  },
                ]}
                chartColors={[Colors.MaleColor, Colors.FemaleColor, Colors.TransgenderColor]}
              />
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <PieChartWidget
                title="Voters Pulse"
                chartData={[
                  {
                    label: "YSRCP",
                    value: dashboard.opinion?.opnion_votes?.["ysrcp"] ?? 0,
                  },
                  {
                    label: "NETURAL",
                    value: dashboard.opinion?.opnion_votes?.["neutral"] ?? 0,
                  },
                  {
                    label: "TDP",
                    value: dashboard.opinion?.opnion_votes?.["tdp"] ?? 0,
                  },
                  {
                    label: "JANASENA",
                    value: dashboard.opinion?.opnion_votes?.["janasena"] ?? 0,
                  },
                  {
                    label: "BJP",
                    value: dashboard.opinion?.opnion_votes?.["bjp"] ?? 0,
                  },
                  {
                    label: "CONGRESS",
                    value: dashboard.opinion?.opnion_votes?.["congress"] ?? 0,
                  },
                ]}
                chartColors={[Colors.YSRCPColor, Colors.NETURALColor, Colors.TDPColor, Colors.JSPColor, Colors.BJPColor, Colors.CONGRESSColor, Colors.OTHERColor]}
              />
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <PieChartWidget
                title="Survey Status"
                chartData={[
                  {
                    label: "Started",
                    value: dashboard.opinion?.survey?.["surveysDone"] ?? 0,
                  },
                  {
                    label: "Not Started",
                    value: dashboard.opinion?.survey?.["surveysNotDone"] ?? 0,
                  },
                ]}
                chartColors={[Colors.StartedColor, Colors.NotStartedColor]}
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
                chartColors={[Colors.OpenColor, Colors.ResolvedColor, Colors.CancelColor, Colors.EscalatedColor]}
              />
            </Grid>
            <Grid item xs={12} md={6} lg={8}>
              <BarChartWidget
                title="Ticktes"
                sx={{ height: "100%" }}
                chartLabels={["Pakala", "Ramchandrapuram", "Chinnagottigallu", "Chandragiri", "Yerravanipalem", "Tirupathi (Rural)"]}
                chartColors={[Colors.completedColor, Colors.pendingColor]}
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
              />
            </Grid>

            <Grid item xs={12} md={6} lg={4}>
              <PieChartWidget
                title="Age Wise Voters"
                chartData={[
                  {
                    label: "18-25",
                    value: dashboard.opinion?.age?.["18-25"] ?? 0,
                  },
                  {
                    label: "25-35",
                    value: dashboard.opinion?.age?.["26-35"] ?? 0,
                  },
                  {
                    label: "35-45",
                    value: dashboard.opinion?.age?.["36-45"] ?? 0,
                  },
                  {
                    label: "45-55",
                    value: dashboard.opinion?.age?.["46-55"] ?? 0,
                  },
                  {
                    label: "55-65",
                    value: dashboard.opinion?.age?.["56-65"] ?? 0,
                  },
                  {
                    label: "65-80",
                    value: dashboard.opinion?.age?.["65-80"] ?? 0,
                  },
                  {
                    label: "80+",
                    value: dashboard.opinion?.age?.["80-80+"] ?? 0,
                  },
                ]}
                chartColors={[Colors.Age1Color, Colors.Age2Color, Colors.Age3Color, Colors.Age4Color, Colors.Age5Color, Colors.Age6Color]}
              />
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <PieChartWidget
                title="Caste Wise"
                chartData={[
                  {
                    label: "Brahmin",
                    value: 58,
                  },
                  {
                    label: "Kshatriya",
                    value: 20,
                  },
                  {
                    label: "Vaishya",
                    value: 30,
                  },
                  {
                    label: "Reddy",
                    value: 70,
                  },
                  {
                    label: "Raju",
                    value: 20,
                  },
                  {
                    label: "Other",
                    value: 45,
                  },
                ]}
              />
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <PieChartWidget
                title="Differently-abled"
                chartData={[
                  {
                    label: "YES",
                    value: 45,
                  },
                  {
                    label: "NO",
                    value: 55,
                  },
                ]}
              />
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <PieChartWidget
                title="Govt Employee Status"
                chartData={[
                  {
                    label: "YES",
                    value: 30,
                  },
                  {
                    label: "NO",
                    value: 70,
                  },
                ]}
              />
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
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
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <PieChartWidget
                title="Residental Status"
                chartData={[
                  {
                    label: "Residental",
                    value: dashboard.opinion?.residential?.["residential"] ?? 0,
                  },
                  {
                    label: "Non Residental",
                    value: dashboard.opinion?.residential?.["nonresidential"] ?? 0,
                  },
                ]}
              />
            </Grid>
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
