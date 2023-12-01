import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "@fontsource/inter";
import { Typography, Card, Stack, Grid, Switch, Divider, Box, Chip, Radio, TextField, CircularProgress } from "@mui/material";
import { styled } from "@mui/system";
import { CheckBox } from "@mui/icons-material";
import Button from "@mui/material/Button";
import MUIDataTable from "mui-datatables";
import { connect } from "react-redux";
import { showAlert } from "../../actions/alert";
import { LoadingButton } from "@mui/lab";
import EditNoteIcon from "@mui/icons-material/EditNote";
import { PARTY_ID } from "../../constants";
import { changeOpinionPoll } from "../../actions/voter";

const OpinionPollSurveyList = ({ voter, showAlert, changeOpinionPoll }) => {
  useEffect(() => {}, []);

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
      name: "age",
      label: "Age",
    },
    {
      name: "phone_no",
      label: "Phone",
    },
    {
      name: "current_address",
      label: "Address",
    },
    {
      name: "intrested_party",
      label: "Survey Status",
      options: {
        customBodyRender: (value, tableMeta, updateValue) => {
          return <Chip label={value != null ? "Completed" : "Not Completed"} />;
        },
      },
    },
    {
      name: "intrested_party",
      label: "Neutral",
      options: {
        customBodyRender: (value, tableMeta, updateValue) => {
          var data = tableMeta.rowData;
          return <NeutralRadio checked={value == PARTY_ID.NEUTRAL} disabled={value != null} onChange={() => handleChange(data[0], PARTY_ID.NEUTRAL)} />;
        },
      },
    },
    {
      name: "intrested_party",
      label: "YCP",
      options: {
        customBodyRender: (value, tableMeta, updateValue) => {
          var data = tableMeta.rowData;

          return <YCPRadio checked={value == PARTY_ID.YSRCP} disabled={value != null} onChange={() => handleChange(data[0], PARTY_ID.YSRCP)} />;
        },
      },
    },

    {
      name: "intrested_party",
      label: "TDP",
      options: {
        customBodyRender: (value, tableMeta, updateValue) => {
          var data = tableMeta.rowData;

          return <TDPRadio checked={value == PARTY_ID.TDP} disabled={value != null} onChange={() => handleChange(data[0], PARTY_ID.TDP)} />;
        },
      },
    },
    {
      name: "intrested_party",
      label: "JSP",
      options: {
        customBodyRender: (value, tableMeta, updateValue) => {
          var data = tableMeta.rowData;

          return <JSPRadio checked={value == PARTY_ID.JANASENA} disabled={value != null} onChange={() => handleChange(data[0], PARTY_ID.JANASENA)} />;
        },
      },
    },
    {
      name: "intrested_party",
      label: "BJP",
      options: {
        customBodyRender: (value, tableMeta, updateValue) => {
          var data = tableMeta.rowData;

          return <BJPRadio checked={value == PARTY_ID.BJP} disabled={value != null} onChange={() => handleChange(data[0], PARTY_ID.BJP)} />;
        },
      },
    },
    {
      name: "intrested_party",
      label: "Congress",
      options: {
        customBodyRender: (value, tableMeta, updateValue) => {
          var data = tableMeta.rowData;

          return <CongressRadio checked={value == PARTY_ID.CONGRESS} disabled={value != null} onChange={() => handleChange(data[0], PARTY_ID.CONGRESS)} />;
        },
      },
    },
    // {
    //   name: "id",
    //   label: "Others",
    //   options: {
    //     customBodyRender: (value, tableMeta, updateValue) => {
    //       return <OthersRadio />;
    //     },
    //   },
    // },
    {
      name: "voter_pk",
      label: "Reason",
      options: {
        customBodyRender: (value, tableMeta, updateValue) => {
          return (
            <Link to="/add-ticket1">
              <EditNoteIcon />
            </Link>
          );
        },
      },
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
    }
  };

  return (
    <Card elevation={1}>
      {voter.isLoading && (
        <Box minHeight={200} display="flex" justifyContent="center" alignItems="center">
          <CircularProgress />
        </Box>
      )}

      {!voter.isLoading && <MUIDataTable title="Opinion Poll" columns={columns} data={voter.data} options={options} />}
    </Card>
  );
};

const mapStateToProps = (state) => {
  return {
    voter: state.voter,
  };
};

export default connect(mapStateToProps, { showAlert, changeOpinionPoll })(OpinionPollSurveyList);

const NeutralRadio = styled(Radio)({
  color: "grey",
  "&.Mui-checked": {
    color: "grey",
  },
  "& .MuiSvgIcon-root": {
    fontSize: 28,
  },
});

const YCPRadio = styled(Radio)({
  color: "green",
  fontSize: 28,
  "&.Mui-checked": {
    color: "green",
  },
  "& .MuiSvgIcon-root": {
    fontSize: 28,
  },
});

const TDPRadio = styled(Radio)({
  color: "yellow",
  "&.Mui-checked": {
    color: "yellow",
  },
  "& .MuiSvgIcon-root": {
    fontSize: 28,
  },
});

const JSPRadio = styled(Radio)({
  color: "red",
  "&.Mui-checked": {
    color: "red",
  },
  "& .MuiSvgIcon-root": {
    fontSize: 28,
  },
});

const BJPRadio = styled(Radio)({
  color: "orange",
  "&.Mui-checked": {
    color: "orange",
  },
  "& .MuiSvgIcon-root": {
    fontSize: 28,
  },
});

const CongressRadio = styled(Radio)({
  color: "violet",
  "&.Mui-checked": {
    color: "violet",
  },
  "& .MuiSvgIcon-root": {
    fontSize: 28,
  },
});

const OthersRadio = styled(Radio)({
  color: "black",
  "&.Mui-checked": {
    color: "black",
  },
  "& .MuiSvgIcon-root": {
    fontSize: 28,
  },
});
