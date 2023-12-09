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
import { CheckBox } from "@mui/icons-material";
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
import { getAllNavaratnaluRoute, getAllTicketsRoute } from "../../utils/apis";

const ViewTicketsList = ({ showAlert }) => {
  const [isLoading, setLoading] = useState(false);
  const [fechtedData, setFechtedData] = useState({
    navaratnalu: [],
    tickets: [],
  });

  useEffect(() => {
    const fetchData = async () => {
      const navaratnaluResponse = await instance.post(getAllNavaratnaluRoute);
      const navaratanaluResponseData = navaratnaluResponse.data?.message ?? [];
      const ticketsResponse = await instance.post(getAllTicketsRoute);
      const ticketsResponseData = ticketsResponse.data?.message ?? [];
      console.log("ticketsResponseData", ticketsResponseData);
      console.log("navaratanaluResponseData", navaratanaluResponseData);
      setFechtedData({
        navaratnalu: navaratanaluResponseData,
        tickets: ticketsResponseData,
      });
    };
    fetchData();
  }, []);

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

  console.log("fechtedData", fechtedData);

  const renderCheckBox = () => {
    return <CheckBox />;
  };
  const renderSubmitButton = () => {
    return <Button variant="outlined">Submit</Button>;
  };

  const renderStatusButton = () => {
    return (
      <TextField
        size="small"
        sx={{
          border: "none",
        }}
        id="Open"
        label="Open"
        variant="standard"
        InputProps={{
          disableUnderline: true,
        }}
        select
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
    return [
      renderCheckBox(),
      // ticket.volunteer_id || "-",
      // ticket.volunteer_name || "-",
      // ticket.voter_pk || "-",
      // ticket.voter_name || "-",
      // ticket.phone || "-",
      navaratnalu.navaratnalu_name || "-",
      ticket.reason || "-",
      renderStatusButton(),
    ];
  });

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
            <TextField size="small" label="Ticket Status" fullWidth select />{" "}
            <LoadingButton
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
            <TextField size="small" label="Next Level User" fullWidth select />{" "}
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
  };
};

export default connect(mapStateToProps, {
  showAlert,
})(ViewTicketsList);
