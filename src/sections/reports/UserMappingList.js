import { useEffect, useState } from "react";
import { Card, Stack, Grid, Switch, Divider, Box, Chip, TextField, FormControlLabel, Typography, Checkbox, CircularProgress, Button, MenuItem } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { CheckBox } from "@mui/icons-material";
import { connect } from "react-redux";
import { showAlert } from "../../actions/alert";
import { checkOrUncheckUser, clearUserReducer } from "../../actions/user";
import instance from "../../utils/axios";
import { designationMappingRoute } from "../../utils/apis";
import { LoadingButton } from "@mui/lab";
import CustomMuiDataTable from "../../components/CustomMuiDataTable";
import ApiServices from "../../services/apiservices";

const UserMappingList = ({ common, user, filterValues, showAlert, checkOrUncheckUser, clearUserReducer, account }) => {
  const [isLoading, setLoading] = useState(false);
  const [formValues, setFormValues] = useState({
    partno: "",
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
          if (data[2] == 37 || data[2] == 38) {
            return <Checkbox checked={value ?? false} onChange={(e) => checkOrUncheckUser(data[1], e.target.checked)} />;
          }
          return null;
        },
      },
    },
    {
      name: "user_pk",
      label: "User Id",
    },
    {
      name: "designation_id",
      label: "Designation Id",
      options: { display: false },
    },
    { name: "user_displayname", label: "Full Name" },
    { name: "phone_no", label: "Phone" },
    { name: "lookup_valuename", label: "Designation" },
    {
      name: "mandal_name",
      label: "Mandal Name",
      options: {
        customBodyRender: (value, tableMeta, updateValue) => {
          return value ?? "-";
        },
      },
    },
    {
      name: "division_name",
      label: "Division Name",
      options: {
        customBodyRender: (value, tableMeta, updateValue) => {
          return value ?? "-";
        },
      },
    },
    {
      name: "sachivalayam_name",
      label: "Sachivalyam Name",
      options: {
        customBodyRender: (value, tableMeta, updateValue) => {
          return value ?? "-";
        },
      },
    },
    {
      name: "part_no",
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
    ...(account.user?.desgination_name != "MLA" && {
      filter: false,
      search: false,
      download: false,
      print: false,
      viewColumns: false,
    }),
  };

  const handleChange = (name, value) => {
    setFormValues((state) => ({ ...state, [name]: value }));
  };

  const handleSubmit = async () => {
    var userList = user.data.filter((e) => e.isCheck == true).map((e) => e.user_pk);
    if (!formValues["partno"]) {
      showAlert({ text: "Please select partno" });
      return;
    }

    if (userList.length <= 0) {
      showAlert({ text: "No user selected" });
      return;
    }

    setLoading(true);
    try {
      var jsonData = {
        part_no_List: [formValues.partno],
        usersPkList: userList,
      };

      await ApiServices.postRequest(designationMappingRoute, jsonData);

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
    setFormValues({ partno: "" });
  };

  return (
    <Card elevation={1}>
      {user.isLoading && (
        <Box minHeight={200} display="flex" justifyContent="center" alignItems="center">
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
                <TextField name="partno" value={formValues.partno} size="small" fullWidth label="Select Part/Booth No" select onChange={(e) => handleChange(e.target.name, e.target.value)}>
                  {common.parts
                    .filter((e) => e.sachivalayam_id == filterValues?.sachivalayam_id)
                    ?.map((item, index) => (
                      <MenuItem key={index} value={item.part_no}>
                        {item.part_no}
                      </MenuItem>
                    ))}
                </TextField>
              </Grid>

              <Grid item xs={12} md={6} lg={3}>
                <LoadingButton loading={isLoading} variant="outlined" onClick={handleSubmit}>
                  Assign Part No
                </LoadingButton>
              </Grid>
            </Grid>
          </Box>

          <Divider />

          <CustomMuiDataTable title="Users List" columns={columns} data={user.data} options={options} />
        </>
      )}
    </Card>
  );
};

const mapStateToProps = (state) => {
  return {
    common: state.common,
    user: state.user,
    account: state.auth,
  };
};

export default connect(mapStateToProps, {
  showAlert,
  checkOrUncheckUser,
  clearUserReducer,
})(UserMappingList);
