import { useEffect, useRef, useState } from "react";
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
  CircularProgress,
  Checkbox,
} from "@mui/material";
import * as Yup from "yup";
import { CheckBox } from "@mui/icons-material";
import MUIDataTable from "mui-datatables";
import { connect } from "react-redux";
import { showAlert } from "../../actions/alert";
import { LoadingButton } from "@mui/lab";
import ViewUserPage from "../../pages/ViewUserPage";
import Sachivalayam from "../../pages/Sachivalayam";
import EditNoteIcon from "@mui/icons-material/EditNote";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import instance from "../../utils/axios";

import { RHFTextField } from "../../components/hook-form";
import SearchByFilter from "../common/SearchByFilter";
import { checkOrUncheckUser } from "../../actions/user";
import { set } from "date-fns";
import { sachivalayammappingtopartsRoute } from "../../utils/apis";

const PartsList = ({
  showAlert,
  partsList,
  common,
  account,
  checkOrUncheckUser,
  reFecthData,
  isFetching,
}) => {
  const filterRef = useRef(null);
  const [isLoading, setLoading] = useState(false);
  const [filterValues, setFilterValues] = useState({
    mandal: null,
    division: null,
    sachivalayam: null,
    partno: null,
    village: null,
  });

  const [checkedValues, setCheckedValues] = useState([]);

  const columns = [
    {
      name: "isCheck",
      label: "Select",
      options: {
        customBodyRender: (value, tableMeta, updateValue) => {
          const isChecked = checkedValues.includes(tableMeta.rowData[1]);

          return (
            <Checkbox
              checked={isChecked}
              onChange={(e) => {
                if (e.target.checked) {
                  setCheckedValues([...checkedValues, tableMeta.rowData[1]]);
                } else {
                  setCheckedValues(
                    checkedValues.filter((item) => item != tableMeta.rowData[1])
                  );
                }
              }}
            />
          );
        },
      },
    },
    { name: "part_no", label: "Part Number" },

    { name: "male_votes", label: "Male Votes" },
    { name: "female_votes", label: "Female Votes" },
    {
      name: "other_votes",
      label: "Tg Votes",
    },

    {
      name: "total_votes",
      label: "Totals Votes",
      options: {
        customBodyRender: (value, tableMeta, updateValue) => {
          // console.log("tableMeta", tableMeta.rowData);
          const totalVotel =
            tableMeta.rowData[2] + tableMeta.rowData[3] + tableMeta.rowData[4];
          return totalVotel;
        },
      },
    },

    // {
    //   name: "edit_delete",
    //   label: "Edit/Delete",
    //   options: {
    //     customBodyRender: (value, tableMeta, updateValue) => {
    //       return renderEditAndDelete();
    //     },
    //   },
    // },
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

  const handleSubmit = async () => {
    setLoading(true);
    console.log("filterValues11111", filterValues);

    if (checkedValues.length === 0) {
      showAlert({ text: "Please select atleast one part", color: "error" });
      setLoading(false);
      return;
    }

    if (!filterValues.mandal) {
      showAlert({ text: "Please select mandal", color: "error" });
      setLoading(false);
      return;
    }

    if (!filterValues.division) {
      showAlert({ text: "Please select division", color: "error" });
      setLoading(false);
      return;
    }

    if (!filterValues.sachivalayam) {
      showAlert({ text: "Please select sachivalayam", color: "error" });
      setLoading(false);
      return;
    }
    // setCheckedValues([]);
    // filterRef.current.reset();
    // setLoading(false);

    try {
      var jsonData = {
        partsPkList: checkedValues,
        sachivalayam_id: filterValues.sachivalayam.sachivalayam_pk,
      };
      console.log("jsonData", jsonData);
      await instance.post(sachivalayammappingtopartsRoute, jsonData);
      showAlert({
        text: "Part assigned successfully",
        color: "success",
      });
      setCheckedValues([]);
      filterRef.current.reset();
      reFecthData();
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
      <>
        <Stack>
          <Divider />
          <Card
            sx={{
              p: 3,
              backgroundColor: "#f5f5f5",
              border: "1px solid #e0e0e0",
              borderRadius: "5px",
            }}
          >
            <Typography variant="body1" sx={{ mb: 2 }}>
              {checkedValues.length} parts selected
            </Typography>

            <Grid container spacing={2} alignItems="center">
              <SearchByFilter
                ref={filterRef}
                showPartNo={false}
                showVillage={false}
                showOtherFilters={false}
                onChanged={(value) => setFilterValues(value)}
                showSearchButton={false}
              />

              <Grid item xs={12} md={6} lg={2}>
                <LoadingButton
                  type="submit"
                  loading={isLoading}
                  onClick={handleSubmit}
                  variant="contained"
                >
                  Assign Part
                </LoadingButton>
              </Grid>
            </Grid>
          </Card>
          {isFetching && (
            <Box
              minHeight={200}
              display="flex"
              justifyContent="center"
              alignItems="center"
            >
              <CircularProgress />
            </Box>
          )}

          {!isFetching && (
            <MUIDataTable
              title=""
              columns={columns}
              data={partsList}
              options={options}
            />
          )}
        </Stack>
      </>
    </Card>
  );
};

const mapStateToProps = (state) => {
  return {
    common: state.common,
    students: state.management,
    account: state.auth,
  };
};

export default connect(mapStateToProps, {
  showAlert,
  checkOrUncheckUser,
})(PartsList);
