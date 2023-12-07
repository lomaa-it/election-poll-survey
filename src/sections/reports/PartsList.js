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
  FormControlLabel,
} from "@mui/material";
import { CheckBox } from "@mui/icons-material";
import MUIDataTable from "mui-datatables";
import { connect } from "react-redux";
import { showAlert } from "../../actions/alert";
import { LoadingButton } from "@mui/lab";
import ViewUserPage from "../../pages/ViewUserPage";
import Sachivalayam from "../../pages/Sachivalayam";
import EditNoteIcon from "@mui/icons-material/EditNote";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";

const PartsList = ({ showAlert, partsList }) => {
  useEffect(() => {}, []);

  const columns = [
    {
      label: "Part Number",
    },
    {
      label: "Male Votes",
    },
    {
      label: "Female Votes",
    },
    {
      label: "Tg Votes",
    },

    {
      label: "Totals Votes",
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
  const renderEditAndDelete = () => {
    return (
      <Box>
        <EditNoteIcon
          sx={{
            color: "#1976d2",
          }}
        />
        <DeleteForeverIcon
          sx={{
            color: "#f44336",
            marginLeft: "10px",
          }}
        />
      </Box>
    );
  };

  const formartedData = partsList.map((parts) => {
    const totalVotel =
      parts.male_votes + parts.female_votes + parts.other_votes;

    return [
      parts.part_no || "Part No",
      parts.male_votes || "Male Votes",
      parts.female_votes || "Female Votes",
      parts.other_votes || "Tg Votes",
      totalVotel || "Total Votes",
      renderEditAndDelete(),
    ];
  });

  return (
    <Card elevation={1}>
      <Stack>
        <Divider />

        <MUIDataTable
          title=""
          columns={columns}
          data={formartedData}
          options={options}
        />
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
})(PartsList);
