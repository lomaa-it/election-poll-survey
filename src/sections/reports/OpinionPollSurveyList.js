import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Card,
  Grid,
  TextField,
  Box,
  CircularProgress,
  IconButton,
  TableRow,
  TableCell,
  TableContainer,
  Table,
  TableHead,
  TableBody,
  Paper,
  Typography,
  MenuItem,
} from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import DynamicFeedIcon from "@mui/icons-material/DynamicFeed";
import MUIDataTable from "mui-datatables";
import { connect } from "react-redux";
import { showAlert } from "../../actions/alert";
import Button from "@mui/material/Button";
import { LoadingButton } from "@mui/lab";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import EditNoteIcon from "@mui/icons-material/EditNote";
import { PARTY_ID, casteList, religionList, searchFiltercolor } from "../../constants";
import { changeOpinionPoll } from "../../actions/voter";
import {
  BJPRadio,
  CongressRadio,
  JSPRadio,
  NeutralRadio,
  OthersRadio,
  TDPRadio,
  YCPRadio,
} from "../common/PartyRadioButtons";

const OpinionPollSurveyList = ({ voter, showAlert, changeOpinionPoll }) => {
  const [isLoading, setLoading] = useState(false);
  const [selectedParties, setSelectedParties] = useState({});

  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const columns = [
    {
      name: "voter_pkk",
      label: "Voter PK",
      options: {
        display: false,
      },
    },
    {
      name: "part_slno",
      label: "Part SL NO",
    },
    {
      name: "voter_id",
      label: "Voter ID",
    },
    {
      name: "voter_name",
      label: "Voter Name",
    },
    {
      name: "guardian_name",
      label: "Guardian Name",
    },
    {
      name: "voter_age",
      label: "Age",
    },
    {
      name: "voter_phone_no",
      label: "Phone",
      options: {
        customBodyRender: (value, tableMeta, updateValue) => {
          return (
            <Typography
              sx={{
                display: "flex",
                alignItems: "center",
              }}
            >
              {value}{" "}
              <>
                <Button
                  onClick={handleClickOpen}
                  sx={{
                    padding: "0px",
                  }}
                >
                  {" "}
                  <DynamicFeedIcon
                    sx={{
                      margin: "0px",
                    }}
                  />
                </Button>
                <Dialog
                  open={open}
                  onClose={handleClose}
                  sx={{
                    opacity: 0.2,
                  }}
                >
                  <DialogTitle>Update Details</DialogTitle>
                  <DialogContent>
                    {/* <DialogContentText>
                      To subscribe to this website, please enter your email
                      address here. We will send updates occasionally.
                    </DialogContentText> */}
                    <Grid
                      container
                      spacing={2}
                      alignItems="center"
                      sx={{
                        opacity: 2,
                        marginTop: "10px",
                      }}
                    >
                      <Grid item xs={12} md={12} lg={12}>
                        <TextField label="Phone Number" fullWidth />
                      </Grid>
                      <Grid item xs={12} md={12} lg={12}>
                        <FormGroup>
                          <FormControlLabel
                            control={<Checkbox defaultChecked />}
                            label="Is Residential"
                          />
                        </FormGroup>
                      </Grid>
                      <Grid item xs={12} md={12} lg={12}>
                        <TextField label="Current Address" fullWidth />
                      </Grid>
                      <Grid item xs={12} md={12} lg={12}>
                        <TextField label="Permanent Address" fullWidth />
                      </Grid>
                      <Grid item xs={12} md={6} lg={6}>
                        <TextField label="Religion" fullWidth select>
                          {religionList.map((item, index) => (
                            <MenuItem key={index} value={item.label}>
                              {item.label}
                            </MenuItem>
                          ))}
                        </TextField>
                      </Grid>{" "}
                      <Grid item xs={12} md={6} lg={6}>
                        <TextField label="Caste" fullWidth select>
                          {casteList.map((item, index) => (
                            <MenuItem key={index} value={item.label}>
                              {item.label}
                            </MenuItem>
                          ))}
                        </TextField>
                      </Grid>
                      <Grid item xs={12} md={6} lg={6}>
                        <TextField label="Disable" fullWidth select>
                          <MenuItem value="YES">YES</MenuItem>
                          <MenuItem value="NO">NO</MenuItem>
                        </TextField>
                      </Grid>
                      <Grid item xs={12} md={6} lg={6}>
                        <TextField label="Disability(%)" fullWidth select>
                          <MenuItem value="40">40%</MenuItem>
                          <MenuItem value="50">50%</MenuItem>
                          <MenuItem value="60">60%</MenuItem>
                          <MenuItem value="70">70%</MenuItem>
                          <MenuItem value="80">80%</MenuItem>
                          <MenuItem value="90">90%</MenuItem>
                          <MenuItem value="100">100%</MenuItem>
                        </TextField>
                      </Grid>
                      <Grid item xs={12} md={6} lg={6}>
                        <TextField label="Govt Employee" fullWidth select>
                          <MenuItem value="YES">YES</MenuItem>
                          <MenuItem value="NO">NO</MenuItem>
                        </TextField>
                      </Grid>
                      <Grid item xs={12} md={6} lg={6}>
                        <TextField label="Select Party" fullWidth select>
                          <MenuItem value="Neutral">Neutral</MenuItem>
                          <MenuItem value="YCP">YCP</MenuItem>
                          <MenuItem value="TDP">TDP</MenuItem>
                          <MenuItem value="JSP">JSP</MenuItem>
                          <MenuItem value="BJP">BJP</MenuItem>
                          <MenuItem value="JSP">JSP</MenuItem>
                          <MenuItem value="BJP">BJP</MenuItem>
                          <MenuItem value="CONGRESS">CONGRESS</MenuItem>
                          <MenuItem value="Others">Others</MenuItem>
                        </TextField>
                      </Grid>
                      <Grid item xs={12} md={12} lg={12}>
                        <LoadingButton
                          onClick={handleClose}
                          loading={isLoading}
                          variant="contained"
                        >
                          Submit
                        </LoadingButton>{" "}
                        <LoadingButton
                          onClick={handleClose}
                          loading={isLoading}
                          variant="contained"
                          sx={{
                            backgroundColor: "red",
                          }}
                        >
                          Cancel
                        </LoadingButton>
                      </Grid>
                    </Grid>
                  </DialogContent>
                </Dialog>
              </>
            </Typography>
          );
        },
      },
    },
    {
      name: "religion",
      label: "Religion",
    },
    {
      name: "caste",
      label: "Caste",
    },
    {
      name: "disable",
      label: "Disable%",
    },
    {
      name: "govtemp",
      label: "Govt Employee",
    },
    {
      name: "residentialFlag",
      label: "Residential Flag",
    },
    {
      name: "current_address",
      label: "Address",
    },
    {
      name: "intrested_party",
      label: "Neutral",
      options: {
        customBodyRender: (value, tableMeta, updateValue) => {
          var data = tableMeta.rowData;
          var partyId = PARTY_ID.NEUTRAL;
          // if (partyId == value) {
          //   setSelectedParties((prevSelectedParties) => ({
          //     ...prevSelectedParties,
          //     [data[0]]: value,
          //   }));
          // }
          return (
            <NeutralRadio
              checked={value == partyId}
              onChange={() => {
                console.log("data555", data[0], partyId);
                handleChange(data[0], partyId);
              }}
            />
          );
        },
      },
    },
    {
      name: "intrested_party",
      label: "YCP",
      options: {
        customBodyRender: (value, tableMeta, updateValue) => {
          var data = tableMeta.rowData;
          var partyId = PARTY_ID.YSRCP;

          return (
            <YCPRadio
              checked={value == partyId}
              onChange={() => handleChange(data[0], partyId)}
            />
          );
        },
      },
    },

    {
      name: "intrested_party",
      label: "TDP",
      options: {
        customBodyRender: (value, tableMeta, updateValue) => {
          var data = tableMeta.rowData;
          var partyId = PARTY_ID.TDP;
          return (
            <TDPRadio
              checked={value == partyId}
              onChange={() => handleChange(data[0], partyId)}
            />
          );
        },
      },
    },
    {
      name: "intrested_party",
      label: "JSP",
      options: {
        customBodyRender: (value, tableMeta, updateValue) => {
          var data = tableMeta.rowData;
          var partyId = PARTY_ID.JANASENA;
          return (
            <JSPRadio
              checked={value == partyId}
              onChange={() => handleChange(data[0], partyId)}
            />
          );
        },
      },
    },
    {
      name: "intrested_party",
      label: "BJP",
      options: {
        customBodyRender: (value, tableMeta, updateValue) => {
          var data = tableMeta.rowData;
          var partyId = PARTY_ID.BJP;
          return (
            <BJPRadio
              checked={value == partyId}
              onChange={() => handleChange(data[0], partyId)}
            />
          );
        },
      },
    },
    {
      name: "intrested_party",
      label: "Congress",
      options: {
        customBodyRender: (value, tableMeta, updateValue) => {
          var data = tableMeta.rowData;
          var partyId = PARTY_ID.CONGRESS;
          return (
            <CongressRadio
              checked={value == partyId}
              onChange={() => handleChange(data[0], partyId)}
            />
          );
        },
      },
    },
    {
      name: "intrested_party",
      label: "Others",
      options: {
        customBodyRender: (value, tableMeta, updateValue) => {
          var data = tableMeta.rowData;
          var partyId = PARTY_ID.OTHERS;

          return (
            <OthersRadio
              checked={value == partyId}
              onChange={() => handleChange(data[0], partyId)}
            />
          );
        },
      },
    },
    {
      name: "intrested_party",
      label: "Reason",
      options: {
        customBodyRender: (value, tableMeta, updateValue) => {
          var data = tableMeta.rowData;

          //  Check if the selected party is "Neutral"
          if (value !== PARTY_ID.NEUTRAL) {
            return null; // Return null to hide the button
          }
          return (
            <IconButton onClick={() => handleEdit(data)}>
              <EditNoteIcon />
            </IconButton>
          );
        },
      },
      // options: {
      //   customBodyRender: (value, tableMeta, updateValue) => {
      //     var data = tableMeta.rowData;

      //     const selectedParty = selectedParties[data[0]];

      //     // Check if the selected party is "Neutral"
      //     if (selectedParty !== PARTY_ID.NEUTRAL) {
      //       return null; // Return null to hide the button
      //     }

      //     return (
      //       <IconButton onClick={() => handleEdit(data)}>
      //         <EditNoteIcon />
      //       </IconButton>
      //     );
      //   },
      // },
    },
  ];

  const options = {
    elevation: 0,
    selectableRows: "none",
    responsive: "standard",
  };

  const handleChange = async (id, value) => {
    var result = await changeOpinionPoll(id, value);
    if (result) {
      showAlert({ text: "Opinion Submitted", color: "success" });
      setSelectedParties((prevSelectedParties) => ({
        ...prevSelectedParties,
        [id]: value,
      }));
    }
  };

  const handleEdit = (data) => {
    navigate("/add-ticket1", { state: { ...data } });
  };

  const formatData = voter.data.map((item) => {
    return {
      ...item,
      religion: "Hindu",
      caste: "Reddy",
      disable: "10%",
      govtemp: "Yes",
      residentialFlag: "Yes",
      current_address: "current_address",
    };
  });

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
      <TableContainer component={Paper} elevation={1}>
        <Table
          sx={{
            "& .MuiTableCell-head": {
              fontSize: "1.2rem",
              fontWeight: "bold",
              textAlign: "center",
            },
            "& .MuiTableCell-body": {
              fontSize: "1.2rem",
              fontWeight: "bold",
              textAlign: "center",
              color: "blue",
            },
          }}
        >
          <TableHead>
            <TableRow>
              <TableCell>Total Voters</TableCell>
              <TableCell>Survey Completed</TableCell>
              <TableCell>Pending</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell>{voter.data.length}</TableCell>
              <TableCell>
                {voter.data.filter((e) => e.intrested_party != null).length}
              </TableCell>
              <TableCell>
                {voter.data.filter((e) => e.intrested_party == null).length}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>

      <Box p={1} />

      <Card elevation={1}>
        {voter.isLoading && (
          <Box
            minHeight={200}
            display="flex"
            justifyContent="center"
            alignItems="center"
          >
            <CircularProgress />
          </Box>
        )}

        {!voter.isLoading && (
          <ThemeProvider  theme={getMuiTheme()}>
          <MUIDataTable
            // sx={{
            //   "& .MuiTableCell-head": {
            //     backgroundColor: "red !important",
            //   },
            // }}
            title="Opinion Poll"
            columns={columns}
            data={formatData}
            options={options}
          />
           </ThemeProvider>
        )}
      </Card>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    voter: state.voter,
  };
};

export default connect(mapStateToProps, { showAlert, changeOpinionPoll })(
  OpinionPollSurveyList
);
