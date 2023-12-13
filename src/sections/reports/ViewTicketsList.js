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
  MenuItem,
} from "@mui/material";
import Checkbox from "@mui/material/Checkbox";
import Button from "@mui/material/Button";
import MUIDataTable from "mui-datatables";
import { connect } from "react-redux";
import { showAlert } from "../../actions/alert";
import { LoadingButton } from "@mui/lab";
import EditNoteIcon from "@mui/icons-material/EditNote";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { searchFiltercolor } from "../../constants";
import instance from "../../utils/axios";
import {
  getAllNavaratnaluRoute,
  getAllTicketsRoute,
  getNextLevelUserRoute,
  getTicketStatusRoute,
  updateTicketStatusRoute,
} from "../../utils/apis";
import { set } from "date-fns";

const ViewTicketsList = ({ showAlert, account }) => {
  const [isLoading, setLoading] = useState(false);
  const [fechtedData, setFechtedData] = useState({
    navaratnalu: [],
    tickets: [],
    status: [],
    nextLevelUser: [],
  });

  const [refresh, setRefresh] = useState(false);
  console.log("account", account);

  const [selectedValues, setSelectedValues] = useState({
    ticketList: [],
    status_id: "",
  });

  useEffect(() => {
    //next level users api call based on account.user.desgination_name
    if (account.user.desgination_name === "VOLUNTEER") {
      const fetchNextLevelUser = async () => {
        const requestBody = {
          designation_name: "VOLUNTEER",
          part_no: account.user.part_no,
        };
        console.log("1requestBody", requestBody);

        const nextLevelUserResponse = await instance.post(
          getNextLevelUserRoute,
          requestBody
        );
        const nextLevelUserResponseData =
          nextLevelUserResponse.data?.message ?? [];
        console.log("nextLevelUserResponseData", nextLevelUserResponseData);
        setFechtedData((prevState) => ({
          ...prevState,
          nextLevelUser: nextLevelUserResponseData,
        }));
      };
      fetchNextLevelUser();
    } else if (account.user.desgination_name === "BOOTH_INCHARGE") {
      const fetchNextLevelUser = async () => {
  try {
    const requestBody = {
      designation_name: "BOOTH_INCHARGE",
      sachivalayam_id: account.user.sachivalayam_pk,
    };
    console.log("2requestBody", requestBody);
    const nextLevelUserResponse = await instance.post(
      getNextLevelUserRoute,
      requestBody
    );
    console.log("nextLevelUserResponse", nextLevelUserResponse);
    const nextLevelUserResponseData =
      nextLevelUserResponse.data?.message ?? [];
    console.log("nextLevelUserResponseData", nextLevelUserResponseData);
    setFechtedData((prevState) => ({
      ...prevState,
      nextLevelUser: nextLevelUserResponseData,
    }));
  } catch (error) {
    console.error("An error occurred while fetching the next level user:", error);
  }
};
fetchNextLevelUser();
    }

    const fetchData = async () => {
      const statusResponse = await instance.post(getTicketStatusRoute);
      const statusResponseData = statusResponse.data?.message ?? [];

      // console.log("statusResponseData", statusResponseData);

      setFechtedData((prevState) => ({
        ...prevState,
        status: statusResponseData,
      }));
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const navaratnaluResponse = await instance.post(getAllNavaratnaluRoute);
      const navaratanaluResponseData = navaratnaluResponse.data?.message ?? [];
      const ticketsResponse = await instance.post(getAllTicketsRoute);
      const ticketsResponseData = ticketsResponse.data?.message ?? [];

      // console.log("ticketsResponseData", ticketsResponseData);
      // console.log("nvaratanaluResponseData", navaratanaluResponseData);
      setFechtedData((prevState) => ({
        ...prevState,
        navaratnalu: navaratanaluResponseData,
        tickets: ticketsResponseData,
      }));
    };
    fetchData();
  }, [refresh]);

  const columns = [
    {
      label: "Select",
    },
    // {
    //   label: "Volunteer ID",
    // },
    // {
    //   label: "Volunteer Name",
    // },
    // {
    //   label: "Voter ID",
    // },
    // {
    //   label: "Voter Name",
    // },
    // {
    //   label: "Phone",
    // },
    {
      label: "Navaratnalu Name",
    },
    {
      label: "Description/Reason",
    },
    {
      label: "Status",
    },
  ];

  const options = {
    elevation: 0,
    selectableRows: "none",
    responsive: "standard",
  };

  // console.log("fechtedData", fechtedData);
  console.log("selectedValues", selectedValues);

  const renderCheckBox = (ticket) => {
    return (
      <Checkbox
        onClick={() => {
          // if same ticket is clicked again then remove it from the list
          if (selectedValues.ticketList.includes(ticket.ticket_master_pk)) {
            setSelectedValues((state) => ({
              ...state,
              ticketList: state.ticketList.filter(
                (ticketId) => ticketId !== ticket.ticket_master_pk
              ),
            }));
          } else {
            setSelectedValues((state) => ({
              ...state,
              ticketList: [...state.ticketList, ticket.ticket_master_pk],
            }));
          }
        }}
        checked={selectedValues.ticketList.includes(ticket.ticket_master_pk)}
        sx={{
          color: "primary.main",
        }}
      />
    );
  };

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

  /// formatdata for MUIDataTable using fechtedData and filter navaratnalu_name in navaratnalu with   navaratnalu_pk in tickets
  const formatData = fechtedData.tickets.map((ticket) => {
    const navaratnalu = fechtedData.navaratnalu.find(
      (navaratnalu) => navaratnalu.navaratnalu_pk === ticket.navaratnalu_id
    );
    const tickets = fechtedData.tickets.find(
      (tickets) => tickets.navaratnalu_id === navaratnalu.navaratnalu_pk
    );

    if (tickets.status_id === 1) {
      tickets.status_id = "Open";
    }
    if (tickets.status_id === 2) {
      tickets.status_id = "Resolved";
    }
    if (tickets.status_id === 3) {
      tickets.status_id = "Cancelled";
    }
    if (tickets.status_id === 4) {
      tickets.status_id = "Escalated";
    }

    return [
      renderCheckBox(ticket),
      // ticket.volunteer_id || "-",
      // ticket.volunteer_name || "-",
      // ticket.voter_pk || "-",
      // ticket.voter_name || "-",
      // ticket.phone || "-",
      navaratnalu.navaratnalu_name || "-",
      ticket.reason || "-",
      tickets.status_id || "-",
    ];
  });

  const handleSubmit = async () => {
    const requestBody = {
      ticketMasterPKList: selectedValues.ticketList,
      status_id: selectedValues.status_id,
    };
    console.log("requestBody", requestBody);
    try {
      setLoading(true);
      await instance.put(updateTicketStatusRoute, requestBody);
      showAlert({
        text: "Ticket status updated successfully",
        color: "success",
      });
      setLoading(false);
      setSelectedValues((state) => ({
        ...state,
        ticketList: [],
        status_id: "",
      }));
      setRefresh((state) => !state);
    } catch (error) {
      console.log(error);
      showAlert({ text: "Something went wrong" });
      setLoading(false);
      setRefresh((state) => !state);
    }
  };

  return (
    <Card elevation={1}>
      <Stack>
        <Divider />
        <Grid
          container
          spacing={2}
          sx={{
            display: "flex",
            alignItems: "center",
            margin: "10px 0px",
          }}
        >
          <Grid
            item
            xs={12}
            md={6}
            lg={3}
            sx={{
              display: "flex",
              alignItems: "center",
            }}
          >
            <TextField
              size="small"
              label="Ticket Status"
              fullWidth
              select
              value={selectedValues.status_id}
              onChange={(e) => {
                setSelectedValues((state) => ({
                  ...state,
                  status_id: e.target.value,
                }));
              }}
            >
              {fechtedData.status.map((status) => (
                <MenuItem key={status.lookup_pk} value={status.lookup_pk}>
                  {status.ticket_status}
                </MenuItem>
              ))}
            </TextField>
            <LoadingButton
              isLoading={isLoading}
              onClick={handleSubmit}
              disabled={
                selectedValues.ticketList.length === 0 ||
                !selectedValues.status_id
              }
              variant="contained"
              sx={{
                marginLeft: "10px",
              }}
            >
              Submit
            </LoadingButton>
          </Grid>

          <Grid
            item
            xs={12}
            md={6}
            lg={3}
            sx={{
              display: "flex",
              alignItems: "center",
              marginLeft: "auto",
              marginRight: "50px",
            }}
          >
            <TextField size="small" label="Next Level User" fullWidth select>
              {fechtedData.nextLevelUser.map((nextLevelUser) => (
                <MenuItem
                  key={nextLevelUser.user_pk}
                  value={nextLevelUser.user_pk}
                >
                  {nextLevelUser.user_displayname}
                </MenuItem>
              ))}
            </TextField>
            <LoadingButton
              variant="contained"
              sx={{
                marginLeft: "10px",
              }}
            >
              Escalate
            </LoadingButton>
          </Grid>
        </Grid>
        <ThemeProvider theme={getMuiTheme()}>
          <MUIDataTable
            title="Tickets List"
            columns={columns}
            data={formatData}
            options={options}
          />
        </ThemeProvider>
      </Stack>
    </Card>
  );
};

const mapStateToProps = (state) => {
  return {
    batches: state.common,
    students: state.management,
    account: state.auth,
  };
};

export default connect(mapStateToProps, {
  showAlert,
})(ViewTicketsList);
