import { useEffect, useState } from "react";
import { Typography, Card, Stack, Grid, Switch, Divider, Box, Chip, TextField, FormControlLabel } from "@mui/material";
import { CheckBox } from "@mui/icons-material";
import MUIDataTable from "mui-datatables";
import { connect } from "react-redux";
import { showAlert } from "../../actions/alert";
import { LoadingButton } from "@mui/lab";
import ViewUserPage from "../../pages/ViewUserPage";
import Sachivalayam from "../../pages/Sachivalayam";
import EditNoteIcon from "@mui/icons-material/EditNote";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import Button from "@mui/material/Button";
import instance from "../../utils/axios";
import { deleteStatesByIdRoute, updateStatesByIdRoute } from "../../utils/apis";
import Popper from "@mui/material/Popper";

const StatesList = ({ showAlert, stateList, setStateList }) => {
  const columns = [
    {
      label: "State Name",
    },

    {
      label: "Edit/Delete",
    },
  ];

  const options = {
    elevation: 0,
    selectableRows: "none",
    responsive: "standard",
  };
  const [editedStateName, setEditedStateName] = useState("");
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };

  const handleStateNameChange = (e) => {
    console.log(e.target.value);
    setEditedStateName(e.target.value);
  };

  const handleDeleteState = (state_pk) => {
    instance
      .delete(deleteStatesByIdRoute + state_pk)
      .then((response) => {
        const responseData = response.data.message;
        console.log(responseData);
        setStateList(stateList.filter((state) => state.state_pk !== state_pk));
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleEditState = async (state_pk) => {
    console.log(state_pk);

    const data = {
      state_name: editedStateName,
    };
    const response = await instance.put(updateStatesByIdRoute + state_pk, data);
    const responseData = response.data.message;
    console.log("updatedData", responseData);
    setStateList(stateList.map((state) => (state.state_pk === state_pk ? { ...state, state_name: responseData.state_name } : state)));

    setAnchorEl(null);
    setEditedStateName("");

    showAlert("success", "State Updated Successfully");
  };

  const stateListForTable = stateList.map((state) => {
    const pop_id = open ? `simple-popper-${state.state_pk}` : undefined;
    return [
      state.state_name,
      <Stack direction="row" spacing={2}>
        {/* button with popper */}
        <Button variant="contained" onClick={handleClick} id={pop_id}>
          <EditNoteIcon />
        </Button>
        <Popper id={pop_id} open={open} anchorEl={anchorEl}>
          <Box
            sx={{
              border: "3px solid #013157",
              p: 5,
              bgcolor: "background.paper",
              borderRadius: "10px",
              display: "flex",
              flexDirection: "column",
            }}
          >
            {/* inputfield already filled with state name with update and cancel button */}
            <TextField
              size="small"
              size="small"
              label="State Name"
              fullWidth
              onChange={handleStateNameChange}
              value={editedStateName}
              sx={{
                m: "10px",
              }}
            />
            <LoadingButton
              variant="contained"
              sx={{
                padding: "15px",
                mb: "10px",
              }}
              onClick={() => handleEditState(state.state_pk)}
            >
              Update
            </LoadingButton>
            <LoadingButton
              variant="contained"
              sx={{
                padding: "15px",
                backgroundColor: "red",
              }}
              onClick={handleClick}
            >
              Cancel
            </LoadingButton>
          </Box>
        </Popper>
        {/* button with popper */}
        <Button variant="contained" color="error" onClick={() => handleDeleteState(state.state_pk)}>
          <DeleteForeverIcon />
        </Button>
      </Stack>,
    ];
  });
  return (
    <Card elevation={1}>
      <Stack>
        <Divider />

        <MUIDataTable title="" columns={columns} data={stateListForTable} options={options} />
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
})(StatesList);
