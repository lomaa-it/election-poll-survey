import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Typography, Card, Stack, Grid, Divider, Box, CircularProgress, IconButton, MenuItem, Button, Checkbox } from "@mui/material";
import { connect } from "react-redux";
import { showAlert } from "../../actions/alert";
import { LoadingButton } from "@mui/lab";
import EditNoteIcon from "@mui/icons-material/EditNote";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { ROWS_PER_PAGE_OPTION } from "../../constants";
import { getAllVotersSurvey } from "../../actions/voter";
import { UncontrolledTextField } from "../../components/hook-form/RHFTextField";
import SearchIcon from "@mui/icons-material/Search";
import SearchByFilter from "../common/SearchByFilter";
import { sachivalayamMappingtoVotersRoute } from "../../utils/apis";
import instance from "../../utils/axios";
import CustomMuiDataTable from "../../components/CustomMuiDataTable";

const ViewVotersList = ({ voter, filterValues, showAlert, getAllVotersSurvey, account }) => {
  const fieldname = useRef();
  const fieldvalue = useRef();
  const filterRef = useRef(null);
  const navigate = useNavigate();

  const [isLoading, setLoading] = useState(false);
  const [checkedValues, setCheckedValues] = useState([]);

  const [assignValues, setAssignValues] = useState({
    mandal: null,
    division: null,
    sachivalayam: null,
    partno: null,
    village: null,
  });

  const columns = [
    { name: "voter_pkk", label: "Voter Pk", options: { display: false } },
    {
      name: "isCheck",
      label: "Select",
      options: {
        customBodyRender: (value, tableMeta, updateValue) => {
          const isChecked = checkedValues.includes(tableMeta.rowData[0]);
          return (
            <Checkbox
              checked={isChecked}
              onChange={(e) => {
                if (e.target.checked) {
                  setCheckedValues([...checkedValues, tableMeta.rowData[0]]);
                } else {
                  setCheckedValues(checkedValues.filter((item) => item != tableMeta.rowData[0]));
                }
              }}
            />
          );
        },
      },
    },
    {
      name: "part_no",
      label: "Part No",
    },
    {
      name: "part_slno",
      label: "Part Slno",
    },
    { name: "voter_id", label: "Voter ID" },
    {
      name: "voter_name",
      label: "Voter Name",
      options: {
        setCellProps: () => ({ style: { minWidth: "200px" } }),
      },
    },
    {
      name: "guardian_name",
      label: "Guardian Name",
      options: {
        setCellProps: () => ({ style: { minWidth: "200px" } }),
      },
    },
    { name: "guardian_type", label: "Guardian" },
    {
      name: "gender_type",
      label: "Gender",
    },
    {
      name: "age",
      label: "Age",
    },
    {
      name: "voter_phone_no",
      label: "Phone",
    },
    {
      name: "is_resident",
      label: "Residential",
      options: {
        customBodyRender: (value, tableMeta, updateValue) => {
          return value == 1 ? "Yes" : value == 0 ? "No" : "-";
        },
      },
    },
    {
      name: "current_address",
      label: "Current Address",
      options: {
        setCellProps: () => ({ style: { minWidth: "200px" } }),
      },
    },
    {
      name: "permenent_address",
      label: "Permanent Address",
      options: {
        setCellProps: () => ({ style: { minWidth: "200px" } }),
      },
    },
    {
      name: "voter_pkk",
      label: "Edit/Delete",
      options: {
        customBodyRender: (value, tableMeta, updateValue) => {
          return (
            <Stack direction="row">
              <IconButton color="primary">
                <EditNoteIcon />
              </IconButton>

              <IconButton color="error">
                <DeleteForeverIcon />
              </IconButton>
            </Stack>
          );
        },
      },
    },
  ];

  const searchFields = [
    {
      name: "part_slno",
      label: "Part Slno",
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
      name: "current_address",
      label: "Current Address",
    },
    {
      name: "phone_no",
      label: "Phone",
    },
  ];

  const options = {
    elevation: 0,
    selectableRows: "none",
    responsive: "standard",
    serverSide: true,
    filter: false,
    search: false,
    ...(account.user?.desgination_name != "MLA" && {
      download: false,
      print: false,
      viewColumns: false,
    }),
    count: voter.count,
    page: voter.page,
    rowsPerPage: voter.limit,
    rowsPerPageOptions: ROWS_PER_PAGE_OPTION,
    onTableChange: (action, tableState) => {
      switch (action) {
        case "changePage":
          handleRetrieveData(tableState);
          break;
        case "changeRowsPerPage":
          handleRetrieveData(tableState);
          break;
        default:
        // console.log("action not handled.");
        // console.log(action, tableState);
      }
    },
  };

  const handleRetrieveData = (tableState) => {
    var searchForm = {
      fieldname: fieldname.current.value,
      fieldvalue: fieldvalue.current.value,
    };

    getAllVotersSurvey({ ...filterValues, ...searchForm }, tableState.page, tableState.rowsPerPage);
  };

  const handleEdit = (id) => {
    var index = voter.data.findIndex((e) => e.voter_pkk == id);
    if (index != -1) {
      navigate("/voter-registration", {
        state: { voterData: voter.data[index] },
      });
    }
  };

  const handleSubmit = async () => {
    setLoading(true);
    if (checkedValues.length === 0) {
      showAlert({ text: "Please select atleast one voter", color: "error" });
      setLoading(false);
      return;
    }

    if (!assignValues.mandal) {
      showAlert({ text: "Please select mandal", color: "error" });
      setLoading(false);
      return;
    }

    if (!assignValues.division) {
      showAlert({ text: "Please select division", color: "error" });
      setLoading(false);
      return;
    }

    if (!assignValues.sachivalayam) {
      showAlert({ text: "Please select sachivalayam", color: "error" });
      setLoading(false);
      return;
    }

    try {
      var jsonData = {
        votersPkList: checkedValues,
        new_sachivalayam_id: assignValues.sachivalayam.sachivalayam_pk,
        new_mandal_id: assignValues.mandal.mandal_pk,
        new_division_id: assignValues.division.division_pk,
      };
      console.log("jsonData", jsonData);
      await instance.post(sachivalayamMappingtoVotersRoute, jsonData);
      console.log("Hi ");
      showAlert({
        text: "Voter assigned successfully",
        color: "success",
      });
      setCheckedValues([]);
      filterRef.current.reset();
      // reFecthData();
      setLoading(false);
    } catch (error) {
      console.error(error);
      showAlert({ text: "Something went wrong" });
      setCheckedValues([]);
      filterRef.current.reset();
      setLoading(false);
    }
  };
  console.log("checkedValues", checkedValues);

  return (
    <Card elevation={1}>
      <Box p={3}>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={2}>
            <UncontrolledTextField inputRef={fieldname} label="Search by" select>
              {searchFields.map((item, index) => (
                <MenuItem key={index} value={item.name}>
                  {item.label}
                </MenuItem>
              ))}
            </UncontrolledTextField>
          </Grid>

          <Grid item xs={3}>
            <UncontrolledTextField inputRef={fieldvalue} label="Search..." />
          </Grid>

          <Grid item xs={3}>
            <Button disabled={voter.isLoading} variant="contained" onClick={handleRetrieveData}>
              <SearchIcon />
            </Button>
          </Grid>
        </Grid>
      </Box>

      <Divider />

      {voter.isLoading && (
        <Box minHeight={200} display="flex" justifyContent="center" alignItems="center">
          <CircularProgress />
        </Box>
      )}

      {!voter.isLoading && (
        <>
          <Box p={3}>
            <Typography variant="body1" sx={{ mb: 2 }}>
              {checkedValues.length} voters selected
            </Typography>

            <Grid container spacing={2} alignItems="center">
              <SearchByFilter ref={filterRef} showPartNo={false} showVillage={false} showOtherFilters={false} onChanged={(value) => setAssignValues(value)} showSearchButton={false} />

              <Grid item xs={12} md={6} lg={3}>
                <LoadingButton type="submit" loading={isLoading} onClick={handleSubmit} variant="contained">
                  Assign Sachivalayam
                </LoadingButton>
              </Grid>
            </Grid>
          </Box>

          <CustomMuiDataTable columns={columns} data={voter.data} options={options} />
        </>
      )}
    </Card>
  );
};

const mapStateToProps = (state) => {
  return {
    voter: state.voter,
    account: state.auth,
  };
};

export default connect(mapStateToProps, {
  showAlert,
  getAllVotersSurvey,
})(ViewVotersList);
