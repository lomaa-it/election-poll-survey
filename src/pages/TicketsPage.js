import { useState } from "react";
import { Grid, Container, Typography, Box, TextField, Card, MenuItem } from "@mui/material";
import Page from "../components/Page";
import { connect } from "react-redux";
import ViewTicketsList from "../sections/reports/ViewTicketsList";
import SearchByFilter from "../sections/common/SearchByFilter";
import { searchFiltercolor } from "../constants";
import { UncontrolledTextField } from "../components/hook-form/RHFTextField";
import { getAllTickets } from "../actions/ticket";

const TicketsPage = ({ common, getAllTickets }) => {
  const [navaratnaluId, setNavaratnaluId] = useState("");
  const [ticketStatus, setTicketStatus] = useState("");

  const handleSubmit = async (filterValues) => {
    var values = { status_id: ticketStatus != "" ? ticketStatus : null, navaratnalu_id: navaratnaluId != "" ? navaratnaluId : null, ...filterValues };
    await getAllTickets(values);
  };

  const handleReset = () => {
    setNavaratnaluId("");
    setTicketStatus("");
  };

  return (
    <Page title="View Tickets">
      <Container maxWidth="xl">
        <Card sx={{ p: 3, backgroundColor: searchFiltercolor }}>
          <Grid container spacing={2} alignItems="center">
            <SearchByFilter
              onSubmit={handleSubmit}
              onReset={handleReset}
              children={
                <>
                  <Grid item xs={12} md={6} lg={2}>
                    <UncontrolledTextField name="navaratnalu_id" label="Select Navaratnalu" value={navaratnaluId} onChange={(e) => setNavaratnaluId(e.target.value)} select>
                      {common.navaratnalu.map((item, index) => (
                        <MenuItem key={index} value={item.navaratnalu_pk}>
                          {item.navaratnalu_name}
                        </MenuItem>
                      ))}
                    </UncontrolledTextField>
                  </Grid>

                  <Grid item xs={12} md={6} lg={2}>
                    <UncontrolledTextField name="ticket_status" label="Ticket Status" value={ticketStatus} onChange={(e) => setTicketStatus(e.target.value)} select>
                      {common.ticket.map((item, index) => (
                        <MenuItem key={index} value={item.value}>
                          {item.label}
                        </MenuItem>
                      ))}
                    </UncontrolledTextField>
                  </Grid>
                </>
              }
            />
          </Grid>
        </Card>

        <Box p={1} />

        <ViewTicketsList />
      </Container>
    </Page>
  );
};

const mapStateToProps = (state) => {
  return {
    common: state.common,
  };
};

export default connect(mapStateToProps, { getAllTickets })(TicketsPage);
