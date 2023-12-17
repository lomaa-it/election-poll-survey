import { useEffect, useState } from "react";
import {
  Card,
  Stack,
  Grid,
  Switch,
  Divider,
  Box,
  Chip,
  TextField,
  FormControlLabel,
  Typography,
  Checkbox,
  CircularProgress,
  Button,
  MenuItem,
} from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { CheckBox } from "@mui/icons-material";
import MUIDataTable from "mui-datatables";
import { connect } from "react-redux";
import { showAlert } from "../../actions/alert";
import { checkOrUncheckUser, clearUserReducer } from "../../actions/user";
import { getMuiTableTheme } from "../../constants";
import { RHFAutoComplete } from "../../components/hook-form";
import instance from "../../utils/axios";
import { designationMappingRoute } from "../../utils/apis";
import { LoadingButton } from "@mui/lab";
import { json } from "react-router-dom";

const UserMappingList = ({
  common,
  user,
  filterValues,
  showAlert,
  checkOrUncheckUser,
  clearUserReducer,
}) => {
  const [isLoading, setLoading] = useState(false);
  const [formValues, setFormValues] = useState({
    designation_id: "",
    partno: [],
  });

  useEffect(() => {
    if (user.isLoading) {
      resetFormValues();
    }
  }, [user.isLoading]);

  const columns = [
    {
      name: "isCheck",
      label: "Select",
      options: {
        customBodyRender: (value, tableMeta, updateValue) => {
          var data = tableMeta.rowData;
          return (
            <Checkbox
              checked={value ?? false}
              onChange={(e) => checkOrUncheckUser(data[1], e.target.checked)}
            />
          );
        },
      },
    },
    {
      name: "user_pk",
      label: "User Id",
    },
    { name: "user_displayname", label: "User Name" },
    { name: "phone_no", label: "Phone" },
    { name: "lookup_valuename", label: "Designation" },
    { name: "mandal_name", label: "Mandal Name" },
    { name: "division_name", label: "Division Name" },
    { name: "sachivalayam_name", label: "Sachivalyam Name" },
    {
      name: "parts",
      label: "Part/Booth No",
      options: {
        customBodyRender: (value, tableMeta, updateValue) => {
          return value ?? "-";
        },
      },
    },
    {
      name: "village_name",
      label: "Village",
      options: {
        customBodyRender: (value, tableMeta, updateValue) => {
          return value ?? "-";
        },
      },
    },
  ];

  const options = {
    elevation: 0,
    selectableRows: "none",
    responsive: "standard",
  };

  const handleChange = (name, value) => {
    console.log(value);
    setFormValues((state) => ({ ...state, [name]: value }));
  };

  const handleSubmit = async () => {
    var userList = user.data
      .filter((e) => e.isCheck == true)
      .map((e) => e.user_pk);
    if (!formValues["partno"]) {
      showAlert({ text: "Please select designation & partno" });
      return;
    }

    if (userList.length <= 0) {
      showAlert({ text: "No user selected" });
      return;
    }

    setLoading(true);
    try {
      // var jsonData = {
      //   designation_id: formValues.designation_id,
      //   part_no_List: formValues.partno.map((e) => e.part_no),
      //   usersPkList: userList,
      // };
      var jsonData = {
        part_no_List: formValues.partno.map((e) => e.part_no),
        usersPkList: userList,
      };

      await instance.post(designationMappingRoute, jsonData);

      resetFormValues();
      clearUserReducer();
      showAlert({
        text: "User mapping updated successfully",
        color: "success",
      });
      setLoading(false);
    } catch (error) {
      console.error(error);
      showAlert({ text: "Something went wrong" });
      setLoading(false);
    }
  };

  const resetFormValues = () => {
    setFormValues({ designation_id: "", partno: [] });
  };

  return (
    <Card elevation={1}>
      {user.isLoading && (
        <Box
          minHeight={200}
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          <CircularProgress />
        </Box>
      )}

      {!user.isLoading && (
        <>
          <Box p={4}>
            <Typography variant="body1" sx={{ mb: 2 }}>
              {user.data.filter((e) => e.isCheck == true).length} users selected
            </Typography>

            <Grid container spacing={2} alignItems="center">
              <Grid item xs={12} md={6} lg={3}>
                <RHFAutoComplete
                  name="partno"
                  multiple={true}
                  label="Select Part/Booth No"
                  value={formValues.partno}
                  options={common.parts.filter(
                    (e) =>
                      e.sachivalayam_id ==
                      filterValues?.sachivalayam?.sachivalayam_pk
                  )}
                  getOptionLabel={(option) => String(option.part_no)}
                  onChange={handleChange}
                />
              </Grid>

              {/* <Grid item xs={12} md={6} lg={3}>
                <TextField name="designation_id" value={formValues.designation_id} size="small" fullWidth label="Select Designation*" select onChange={(e) => handleChange(e.target.name, e.target.value)}>
                  {common.designation?.map((item, index) => (
                    <MenuItem key={index} value={item.value}>
                      {item.label}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid> */}

              <Grid item xs={12} md={6} lg={3}>
                <LoadingButton
                  loading={isLoading}
                  variant="outlined"
                  onClick={handleSubmit}
                >
                  Assign Part No
                </LoadingButton>
              </Grid>
            </Grid>
          </Box>

          <Divider />

          <ThemeProvider theme={getMuiTableTheme()}>
            <MUIDataTable
              title="Users List"
              columns={columns}
              data={user.data}
              options={options}
            />
          </ThemeProvider>
        </>
      )}
    </Card>
  );
};

const mapStateToProps = (state) => {
  return {
    common: state.common,
    user: state.user,
  };
};

export default connect(mapStateToProps, {
  showAlert,
  checkOrUncheckUser,
  clearUserReducer,
})(UserMappingList);
