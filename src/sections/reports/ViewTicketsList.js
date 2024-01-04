import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Typography, Card, Stack, Grid, Switch, Divider, Box, Chip, TextField, MenuItem, IconButton, CircularProgress } from "@mui/material";
import Checkbox from "@mui/material/Checkbox";
import { connect } from "react-redux";
import { showAlert } from "../../actions/alert";
import EditNoteIcon from "@mui/icons-material/EditNote";
import { ThemeProvider } from "@mui/material/styles";
import { getTicketStatusById } from "../../constants";

import { checkOrUncheckTicket } from "../../actions/ticket";
import AnalyticsCard from "../common/AnalyticsCard";
import { fToNow } from "../../utils/formatTime";
import CustomMuiDataTable from "../../components/CustomMuiDataTable";
import ApiServices from "../../services/apiservices";

const ViewTicketsList = ({ isUser, common, ticket, showAlert, checkOrUncheckTicket, account }) => {
  const navigate = useNavigate();
  const [isLoading, setLoading] = useState(false);
  const [formValues, setFormValues] = useState({
    status_id: "",
    next_level_user: "",
  });

  const columns = [
    {
      name: "isCheck",
      label: "Select",
      options: {
        customBodyRender: (value, tableMeta, updateValue) => {
          var data = tableMeta.rowData;
          return <Checkbox checked={value ?? false} onChange={(e) => checkOrUncheckTicket(data[1], e.target.checked)} />;
        },
      },
    },
    {
      name: "ticket_master_pk",
      label: "Ticket ID",
    },

    { name: "voter_id", label: "Voter ID" },
    {
      name: "voter_name",
      label: "Voter Name",
    },
    {
      name: "navaratnalu_name",
      label: "Navaratnalu Name",
    },
    {
      name: "reason",
      label: "Description/Reason",
    },
    {
      name: "status_id",
      label: "Status",
      options: {
        customBodyRender: (value, tableMeta, updateValue) => {
          return getTicketStatusById(value);
        },
      },
    },
    {
      name: "createdon",
      label: "Pending",
      options: {
        customBodyRender: (value, tableMeta, updateValue) => {
          var data = tableMeta.rowData;
          return data[6] == 1 ? fToNow(value) : "-";
        },
      },
    },
    {
      name: "ticket_master_pk",
      label: "Action",
      options: {
        customBodyRender: (value, tableMeta, updateValue) => {
          var index = ticket.data.findIndex((e) => e.ticket_master_pk == value);

          return (
            <IconButton onClick={() => handleEdit(ticket.data[index])}>
              <EditNoteIcon />
            </IconButton>
          );
        },
      },
    },
  ];

  const options = {
    elevation: 0,
    selectableRows: "none",
    responsive: "standard",
    ...(account.user?.desgination_name != "MLA" && {
      filter: false,
      search: false,
      download: false,
      print: false,
      viewColumns: false,
    }),
  };

  const handleEdit = (data) => {
    if (isUser) {
      navigate(`/user/view-ticket-history`, {
        state: {
          data: data,
        },
      });
    } else {
      navigate(`/view-ticket-history`, {
        state: {
          data: data,
        },
      });
    }
  };

  // const handleSubmit = async () => {
  //   const requestBody = {
  //     ticketMasterPKList: selectedValues.ticketList,
  //     status_id: selectedValues.status_id,
  //   };
  //   console.log("requestBody", requestBody);
  //   try {
  //     setLoading(true);
      // await ApiServices.putRequest(updateTicketStatusRoute, requestBody);
  //     showAlert({
  //       text: "Ticket status updated successfully",
  //       color: "success",
  //     });
  //     setLoading(false);
  //     setSelectedValues((state) => ({
  //       ...state,
  //       ticketList: [],
  //       status_id: "",
  //     }));
  //     setRefresh((state) => !state);
  //   } catch (error) {
  //     console.log(error);
  //     showAlert({ text: "Something went wrong" });
  //     setLoading(false);
  //     setRefresh((state) => !state);
  //   }
  // };

  return (
    <>
      <AnalyticsCard names={["Total", "Open", "Resolved", "Cancelled", "Escalated"]} values={[ticket.analytics?.count, ticket.analytics?.open, ticket.analytics?.resolved, ticket.analytics?.cancelled, ticket.analytics?.escalated]} />

      <Box p={1} />

      <Card elevation={1}>
        {ticket.isLoading && (
          <Box minHeight={200} display="flex" justifyContent="center" alignItems="center">
            <CircularProgress />
          </Box>
        )}

        {!ticket.isLoading && (
          <>
            {/* <Box p={4}>
              <Grid container spacing={2} sx={{ justifyContent: "space-between" }}>
                <Grid item xs={12} md={6} lg={3}>
                  <Stack direction="row" spacing={2}>
                    <UncontrolledTextField
                      name="status_id"
                      label="Ticket Status"
                      select
                      value={formValues.status_id}
                      onChange={(e) => {
                        setFormValues((state) => ({
                          ...state,
                          status_id: e.target.value,
                        }));
                      }}
                    >
                      {common.ticket.map((item, index) => (
                        <MenuItem key={index} value={item.value}>
                          {item.label}
                        </MenuItem>
                      ))}
                    </UncontrolledTextField>

                    <LoadingButton
                      variant="contained"
                      isLoading={isLoading}
                      // onClick={handleSubmit}
                      disabled={ticket.data.filter((e) => e.isCheck == true).length <= 0}
                    >
                      Submit
                    </LoadingButton>
                  </Stack>
                </Grid>

                <Grid item xs={12} md={6} lg={3}>
                  <Stack direction="row" spacing={2}>
                    <UncontrolledTextField name="next_level_user" label="Next Level User" fullWidth select>
                      {[].map((item, index) => (
                        <MenuItem key={index} value={item.user_pk}>
                          {item.user_displayname}
                        </MenuItem>
                      ))}
                    </UncontrolledTextField>

                    <LoadingButton variant="contained">Escalate</LoadingButton>
                  </Stack>
                </Grid>
              </Grid>
            </Box>

            <Divider /> */}

            <CustomMuiDataTable title="Tickets List" columns={columns} data={ticket.data ?? []} options={options} />
          </>
        )}
      </Card>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    common: state.common,
    ticket: state.ticket,
    account: state.auth,
  };
};

export default connect(mapStateToProps, {
  showAlert,
  checkOrUncheckTicket,
})(ViewTicketsList);
