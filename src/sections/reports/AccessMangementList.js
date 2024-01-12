import React, { useEffect, useState } from "react";
import CustomMuiDataTable from "../../components/CustomMuiDataTable";
import { Box, Card, Checkbox, CircularProgress, Divider, Grid, MenuItem, Stack, TextField, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import { connect } from "react-redux";
import { getAllAccessPermissions, clearOtherReducer, updateAccessPermission, saveAccessPermission } from "../../actions/other";
import { LoadingButton } from "@mui/lab";
import { ROWS_PER_PAGE_OPTION } from "../../constants";
import { showAlert } from "../../actions/alert";
import { UncontrolledTextField } from "../../components/hook-form/RHFTextField";

const CustomCheckbox = styled(Checkbox)(({ theme }) => ({ padding: 0, "& .MuiSvgIcon-root": { fontSize: 17 } }));

const CustomCheckboxWithLabel = ({ label, ...props }) => (
  <FormControlLabel
    control={<CustomCheckbox {...props} />}
    label={
      <Typography
        variant="p"
        sx={{
          fontSize: "12px",
        }}
      >
        {label}
      </Typography>
    }
    labelPlacement="top"
  />
);

const AccessMangementList = ({ common, other, showAlert, getAllAccessPermissions, updateAccessPermission, clearOtherReducer }) => {
  const [loading, setLoading] = useState(false);
  const [designation, setDesignation] = useState(common.designation[0]?.value || "");
  const [searchedDes, setSearchedDes] = useState("");

  useEffect(() => {
    handleSearch();

    return () => {
      clearOtherReducer();
    };
  }, []);

  const columns = [
    {
      name: "page_id",
      label: "Page Id",
    },
    {
      name: "page_name",
      label: "Page Name",
    },
    // ...common.designation.map((item) => {
    //   var desPk = item.value;

    //   return {
    //     name: `access_permissions_pk_${desPk}`,
    //     label: item.label,
    //     options: {
    //       customBodyRender: (value, tableMeta, updateValue) => {
    //         var pageId = tableMeta.rowData[0];
    //         var rowIndex = other.data.findIndex((e) => e.page_id == pageId);
    //         var accessData = other.data[rowIndex];

    //         var data = {
    //           page_id: pageId,
    //           design_id: desPk,
    //           access_permissions_pk: accessData[`access_permissions_pk_${desPk}`],
    //           page_access: accessData[`page_access_${desPk}`],
    //           add_perm: accessData[`add_perm_${desPk}`],
    //           edit_perm: accessData[`edit_perm_${desPk}`],
    //           view_perm: accessData[`view_perm_${desPk}`],
    //           delete_perm: accessData[`delete_perm_${desPk}`],
    //           approved_perm: accessData[`approved_perm_${desPk}`],
    //         };

    //         return (
    //           <Box alignItems="center">
    //             {/* <CustomCheckboxWithLabel label="Access Menu" labelPlacement="top" /> */}

    //             <Stack direction="row" spacing={1}>
    //               <CustomCheckboxWithLabel label="PA" checked={accessData[`page_access_${desPk}`] == 1 ? true : false} onChange={(e) => updateAccessPermission(`page_access`, e.target.checked, data)} />
    //               <CustomCheckboxWithLabel label="C" checked={accessData[`add_perm_${desPk}`] == 1 ? true : false} onChange={(e) => updateAccessPermission(`add_perm`, e.target.checked, data)} />
    //               <CustomCheckboxWithLabel label="R" checked={accessData[`view_perm_${desPk}`] == 1 ? true : false} onChange={(e) => updateAccessPermission(`view_perm`, e.target.checked, data)} />
    //               <CustomCheckboxWithLabel label="U" checked={accessData[`edit_perm_${desPk}`] == 1 ? true : false} onChange={(e) => updateAccessPermission(`edit_perm`, e.target.checked, data)} />
    //               <CustomCheckboxWithLabel label="D" checked={accessData[`delete_perm_${desPk}`] == 1 ? true : false} onChange={(e) => updateAccessPermission(`delete_perm`, e.target.checked, data)} />
    //               <CustomCheckboxWithLabel label="AP" checked={accessData[`approved_perm_${desPk}`] == 1 ? true : false} onChange={(e) => updateAccessPermission(`approved_perm`, e.target.checked, data)} />
    //               <hr />
    //             </Stack>
    //           </Box>
    //         );
    //       },
    //     },
    //   };
    // }),

    {
      name: `access_permissions_pk`,
      label: common.designation?.find((e) => e.value == searchedDes)?.label || "Designation",
      options: {
        customBodyRender: (value, tableMeta, updateValue) => {
          var pageId = tableMeta.rowData[0];
          var rowIndex = other.data.findIndex((e) => e.page_id == pageId);
          var accessData = other.data[rowIndex];

          var data = {
            page_id: pageId,
            design_id: searchedDes,
            ...accessData,
          };

          return (
            <Box alignItems="center">
              {/* <CustomCheckboxWithLabel label="Access Menu" labelPlacement="top" /> */}
              <Stack direction="row" spacing={1}>
                <CustomCheckboxWithLabel label="PA" checked={accessData[`page_access`] == 1 ? true : false} onChange={(e) => updateAccessPermission(`page_access`, e.target.checked, data)} />
                <CustomCheckboxWithLabel label="C" checked={accessData[`add_perm`] == 1 ? true : false} onChange={(e) => updateAccessPermission(`add_perm`, e.target.checked, data)} />
                <CustomCheckboxWithLabel label="R" checked={accessData[`view_perm`] == 1 ? true : false} onChange={(e) => updateAccessPermission(`view_perm`, e.target.checked, data)} />
                <CustomCheckboxWithLabel label="U" checked={accessData[`edit_perm`] == 1 ? true : false} onChange={(e) => updateAccessPermission(`edit_perm`, e.target.checked, data)} />
                <CustomCheckboxWithLabel label="D" checked={accessData[`delete_perm`] == 1 ? true : false} onChange={(e) => updateAccessPermission(`delete_perm`, e.target.checked, data)} />
                <CustomCheckboxWithLabel label="AP" checked={accessData[`approved_perm`] == 1 ? true : false} onChange={(e) => updateAccessPermission(`approved_perm`, e.target.checked, data)} />
                {/* <hr /> */}
              </Stack>
            </Box>
          );
        },
      },
    },
  ];

  const options = {
    elevation: 0,
    selectableRows: "none",
    responsive: "standard",
    rowsPerPage: 200,
    rowsPerPageOptions: ROWS_PER_PAGE_OPTION,
    download: false,
    print: false,
    viewColumns: false,
    filter: false,
  };

  const handleSearch = async () => {
    if (!designation) {
      return;
    }

    setLoading(true);
    setSearchedDes(designation);
    await getAllAccessPermissions(designation);
    setLoading(false);
  };

  const handleSavePermissions = async () => {
    setLoading(true);
    const response = await saveAccessPermission(other.changes);
    if (response == true) {
      showAlert({ text: "Permissions updated successfully", color: "success" });

      handleSearch();
    } else {
      showAlert({ text: "Something went wrong" });
    }
    setLoading(false);
  };

  return (
    <Card>
      <Box p={3}>
        <Typography variant="body1">Assign Authority</Typography>

        <Box p={1} />

        <Grid container spacing={2} sx={{ alignItems: "center" }}>
          <Grid item xs={3}>
            <UncontrolledTextField label="Select designation" value={designation} onChange={(e) => setDesignation(e.target.value)} select>
              {common.designation.map((item, index) => (
                <MenuItem key={index} value={item.value}>
                  {item.label}
                </MenuItem>
              ))}
            </UncontrolledTextField>
          </Grid>

          <Grid item xs={3}>
            <LoadingButton loading={loading} variant="contained" onClick={handleSearch}>
              Search
            </LoadingButton>
          </Grid>

          <Grid item xs={6} sx={{ textAlign: "end" }}>
            <LoadingButton loading={loading} variant="contained" onClick={handleSavePermissions}>
              Save
            </LoadingButton>
          </Grid>
        </Grid>
      </Box>

      <Divider />

      {other.isLoading && (
        <Box minHeight={200} display="flex" justifyContent="center" alignItems="center">
          <CircularProgress />
        </Box>
      )}

      {!other.isLoading && (
        <>
          <CustomMuiDataTable title="" columns={columns} data={other.data} options={options} />
        </>
      )}
    </Card>
  );
};

const mapStateToProps = (state) => {
  return {
    common: state.common,
    other: state.other,
  };
};

export default connect(mapStateToProps, { showAlert, getAllAccessPermissions, updateAccessPermission, clearOtherReducer })(AccessMangementList);
