import { useEffect, useState } from "react";
import { Typography, Card, Stack, Grid, Switch, Divider, Box, Chip, TextField, FormControlLabel, Popover, Button, MenuItem } from "@mui/material";
import { CheckBox } from "@mui/icons-material";
import MUIDataTable from "mui-datatables";
import { connect } from "react-redux";
import { showAlert } from "../../actions/alert";
import { LoadingButton } from "@mui/lab";
import ViewUserPage from "../../pages/ViewUserPage";
import Sachivalayam from "../../pages/Sachivalayam";
import EditNoteIcon from "@mui/icons-material/EditNote";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import CustomMuiDataTable from "../../components/CustomMuiDataTable";
import CircularProgress from "@mui/material/CircularProgress";
import { set } from "date-fns";
import { createPartyRoute } from "../../utils/apis";
import ApiServices from "../../services/apiservices";

const PartiesList = ({ showAlert, partiesList, fetchedData, setFetchedData, refresh, setRefresh }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedValues, setSelectedValues] = useState({
    lookup_name: "party_list",
    lookup_valuename: "",
    lookup_sequence: 0,
  });

  const columns = [
    {
      label: "Sequence Number",
    },
    {
      label: "Party Name",
    },

    {
      label: "Edit/Delete",
    },
  ];

  const options = {
    elevation: 0,
    selectableRows: "none",
    responsive: "standard",
    rowsPerPageOptions: [100, 150, 200],
    rowsPerPage: 100,
  };

  const handleClick = (event, data) => {
    setAnchorEl(event.currentTarget);

    setSelectedValues((prevState) => ({
      ...prevState,
      lookup_valuename: data.party_name,
      lookup_sequence: data.lookup_sequence,
      lookup_pk: data.lookup_pk,
    }));
  };

  const handleClose = () => {
    setAnchorEl(null);

    setSelectedValues((prevState) => ({
      ...prevState,
      lookup_valuename: "",
      lookup_sequence: "",
    }));
  };

  const onCancel = () => {
    setAnchorEl(null);
    setSelectedValues((prevState) => ({
      ...prevState,
      lookup_valuename: "",
      lookup_sequence: "",
    }));
  };

  const handleSubmit = async () => {
    setIsLoading(true);

    if (selectedValues.lookup_valuename === "") {
      showAlert({ text: "Please enter party name", color: "error" });
      setIsLoading(false);
      return;
    }

    if (selectedValues.lookup_sequence === "") {
      showAlert({ text: "Please enter sequence number", color: "error" });
      setIsLoading(false);
      return;
    }

    try {
      const response = await ApiServices.putRequest(createPartyRoute + selectedValues.lookup_pk, {
        lookup_sequence: selectedValues.lookup_sequence,
        lookup_name: selectedValues.lookup_name,
        lookup_valuename: selectedValues.lookup_valuename,
      });
      console.log(response.data.message);
      showAlert({ text: "Party Added", color: "success" });
      setSelectedValues({
        ...selectedValues,
        lookup_valuename: "",
        lookup_sequence: "",
      });
      setAnchorEl(null);

      setIsLoading(false);
      setRefresh((prev) => !prev);
    } catch (error) {
      console.log(error);
      showAlert({ text: "Party Not Added", color: "error" });
      setIsLoading(false);
      setRefresh((prev) => !prev);
      setAnchorEl(null);
    }
  };

  const handleDelete = async (id) => {
    setIsLoading(true);
    try {
      const response = await ApiServices.deleteRequest(createPartyRoute + id);
      console.log(response.data.message);
      showAlert({ text: "Party Deleted Successfully", color: "success" });
      setIsLoading(false);
      setRefresh((prev) => !prev);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
      showAlert({ text: "Party Not Deleted", color: "error" });
      setRefresh((prev) => !prev);
    }
  };

  const renderEditAndDelete = (data) => {
    const open = Boolean(anchorEl);
    const id = open ? `simple-popover-${data.district_pk}` : undefined;

    return (
      <Box>
        <Button
          aria-describedby={id}
          onClick={(e) => {
            handleClick(e, data);
          }}
          sx={{
            marginRight: "10px",
          }}
        >
          <EditNoteIcon />
        </Button>
        {/* <Button
          sx={{
            color: "red",
          }}
        
          onClick={() => {
            handleDelete(data.lookup_pk);
          }}
        >
          {isLoading ? <CircularProgress size={20} /> : <DeleteForeverIcon />}
        </Button> */}
        <Popover
          id={id}
          open={open}
          anchorEl={anchorEl}
          onClose={handleClose}
          anchorOrigin={{
            vertical: "center",
            horizontal: "left",
          }}
          transformOrigin={{
            vertical: "center",
            horizontal: "center",
          }}
        >
          <Card sx={{ p: 3 }}>
            <Grid container spacing={2} alignItems="center">
              <Grid
                item
                xs={12}
                md={6}
                lg={12}
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "15px",
                }}
              >
                <TextField
                  size="small"
                  label="Sequence Number"
                  fullWidth
                  value={selectedValues.lookup_sequence}
                  onChange={(e) => {
                    setSelectedValues((prevState) => ({
                      ...prevState,
                      lookup_sequence: e.target.value,
                    }));
                  }}
                />
                <TextField
                  size="small"
                  label="Party Name"
                  fullWidth
                  value={selectedValues.lookup_valuename}
                  onChange={(e) => {
                    setSelectedValues((prevState) => ({
                      ...prevState,
                      lookup_valuename: e.target.value,
                    }));
                  }}
                />
                <LoadingButton
                  loading={isLoading}
                  onClick={handleSubmit}
                  variant="contained"
                  sx={{
                    padding: "15px",
                  }}
                >
                  Update
                </LoadingButton>
                <LoadingButton
                  onClick={onCancel}
                  variant="contained"
                  sx={{
                    padding: "10px",
                    backgroundColor: "#f44336",
                  }}
                >
                  Cancel
                </LoadingButton>
              </Grid>
            </Grid>
          </Card>
        </Popover>
        {/* <DeleteForeverIcon
          sx={{
            color: "#f44336",
            marginLeft: "10px",
          }}
        /> */}
      </Box>
    );
  };

  const formartedData = fetchedData.parties.map((party) => {
    return [party.lookup_sequence, party.party_name, renderEditAndDelete(party)];
  });

  console.log("fetch", fetchedData.parties);

  return (
    <Card elevation={1}>
      <Stack>
        <Divider />

        <CustomMuiDataTable title="" columns={columns} data={formartedData} options={options} />
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
})(PartiesList);
