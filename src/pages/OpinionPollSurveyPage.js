import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Grid, Container, Typography, Box, TextField, Card } from "@mui/material";
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

import Button from "@mui/material/Button";
import ViewTicketsList from "../sections/reports/ViewTicketsList";
import OpinionPollSurveyList from "../sections/reports/OpinionPollSurveyList";
import Autocomplete from "@mui/material/Autocomplete";
import { ageDropdown } from "../utils/dropdownconstants";
import SearchByFilter from "../sections/common/SearchByFilter";
import { getAllVotersSurvey } from "../actions/voter";
import { fi } from "date-fns/locale";

function totalStats(name, ofOpen, OfResolved, ofCancelled, ofEscalated) {
  return { name, ofOpen, OfResolved, ofCancelled, ofEscalated };
}

const statsRow = [totalStats("200", "100", "100")];

const OpinionPollSurveyPage = ({ voter, getAllVotersSurvey }) => {
  const [filterValues, setFilterValues] = useState(null);

  const onSubmit = async () => {
    console.log(filterValues);

    getAllVotersSurvey(filterValues);
  };

  return (
    <Page title="View Tickets">
      <Container maxWidth="xl">
        <Typography variant="h4" sx={{ mb: 1 }}>
          Opinion Survey
        </Typography>

        <Card sx={{ p: 3 }}>
          <Typography sx={{ pb: 2 }}>Search by filter</Typography>

          <Grid container spacing={2} alignItems="center">
            <SearchByFilter onChanged={(value) => setFilterValues(value)} />

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
              <LoadingButton variant="contained" onClick={onSubmit}>
                Search
              </LoadingButton>
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
                      <TableCell align="center" sx={{ fontSize: "1.2rem", fontWeight: "bold" }}>
                        Survey Completed
                      </TableCell>
                      <TableCell align="center" sx={{ fontSize: "1.2rem", fontWeight: "bold" }}>
                        Pending
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    <TableRow>
                      <TableCell
                        align="center"
                        component="th"
                        scope="row"
                        sx={{
                          color: "blue",
                          fontSize: "1.2rem",
                        }}
                      >
                        {voter.data.length}
                      </TableCell>
                      <TableCell
                        align="center"
                        sx={{
                          color: "blue",
                          fontSize: "1.2rem",
                        }}
                      >
                        {voter.data.filter((e) => e.intrested_party != null).length}
                      </TableCell>
                      <TableCell
                        align="center"
                        sx={{
                          color: "blue",
                          fontSize: "1.2rem",
                        }}
                      >
                        {voter.data.filter((e) => e.intrested_party == null).length}
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
            </Grid>
          </Grid>
        </Card>

        <Box p={1} />

        <Grid container spacing={3}>
          <Grid item xs={12} md={6} lg={12}>
            <OpinionPollSurveyList />
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
};

const mapStateToProps = (state) => {
  return {
    voter: state.voter,
  };
};

export default connect(mapStateToProps, { getAllVotersSurvey })(OpinionPollSurveyPage);
