import React, { useEffect, useState } from "react";
import CustomMuiDataTable from "../../components/CustomMuiDataTable";
import { Box, Card, Checkbox, CircularProgress, Divider, Stack, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import { connect } from "react-redux";
import { getAllAcessPermissions, clearOtherReducer } from "../../actions/other";
import { LoadingButton } from "@mui/lab";

const CustomCheckbox = styled(Checkbox)(({ theme }) => ({ padding: 0, "& .MuiSvgIcon-root": { fontSize: 17 } }));

const CustomCheckboxWithLabel = ({ label, labelPlacement, ...props }) => (
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
    labelPlacement={labelPlacement}
  />
);

const AccessMangementList = ({ common, other, getAllAcessPermissions, clearOtherReducer }) => {
  useEffect(() => {
    getAllAcessPermissions();

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
    ...common.designation.map((item) => {
      var desPk = item.value;

      return {
        name: `access_permissions_pk_${desPk}`,
        label: item.label,
        options: {
          customBodyRender: (value, tableMeta, updateValue) => {
            var rowIndex = other.data.findIndex((e) => e.page_id == tableMeta.rowData[0]);
            var accessData = other.data[rowIndex];

            return (
              <Box alignItems="center">
                {/* <CustomCheckboxWithLabel label="Access Menu" labelPlacement="top" /> */}

                <Stack direction="row" spacing={1}>
                  <CustomCheckboxWithLabel label="C" labelPlacement="top" checked={accessData[`add_perm_${desPk}`] == 1 ? true : false} />
                  <CustomCheckboxWithLabel label="R" labelPlacement="top" checked={accessData[`edit_perm_${desPk}`] == 1 ? true : false} />
                  <CustomCheckboxWithLabel label="U" labelPlacement="top" checked={accessData[`view_perm_${desPk}`] == 1 ? true : false} />
                  <CustomCheckboxWithLabel label="D" labelPlacement="top" checked={accessData[`delete_perm_${desPk}`] == 1 ? true : false} />
                  <CustomCheckboxWithLabel label="Approved" labelPlacement="top" checked={accessData[`approved_perm_${desPk}`] == 1 ? true : false} />
                  <hr />
                </Stack>
              </Box>
            );
          },
        },
      };
    }),
    // {
    //   name: "design_id",
    //   label: "CM",
    //   options: {
    //     customBodyRender: (value, tableMeta, updateValue) => {
    //       // console.log("sssssss", tableMeta);
    //       // const filterData = fetchData.filter((item) => item.design_id === value);
    //       // console.log("filterData", filterData);
    //       return (
    //         <Box alignItems="center">
    //           <CustomCheckboxWithLabel label="Access Menu" labelPlacement="top" />

    //           <Stack direction="row" spacing={1}>
    //             <CustomCheckboxWithLabel label="C" labelPlacement="top" />
    //             <CustomCheckboxWithLabel label="R" labelPlacement="top" />
    //             <CustomCheckboxWithLabel label="U" labelPlacement="top" />
    //             <CustomCheckboxWithLabel label="D" labelPlacement="top" />
    //             <CustomCheckboxWithLabel label="Approved" labelPlacement="top" />
    //             <hr />
    //           </Stack>
    //         </Box>
    //       );
    //     },
    //   },
    // },
    // {
    //   name: "name",
    //   label: "State Leader",
    //   options: {
    //     customBodyRender: (value, tableMeta, updateValue) => {
    //       return (
    //         <Box alignItems="center">
    //           <CustomCheckboxWithLabel label="Access Menu" labelPlacement="top" />

    //           <Stack direction="row" spacing={1}>
    //             <CustomCheckboxWithLabel label="C" labelPlacement="top" />
    //             <CustomCheckboxWithLabel label="R" labelPlacement="top" />
    //             <CustomCheckboxWithLabel label="U" labelPlacement="top" />
    //             <CustomCheckboxWithLabel label="D" labelPlacement="top" />
    //             <CustomCheckboxWithLabel label="Approved" labelPlacement="top" />
    //             <hr />
    //           </Stack>
    //         </Box>
    //       );
    //     },
    //   },
    // },
    // {
    //   name: "name",
    //   label: "MLA",
    //   options: {
    //     customBodyRender: (value, tableMeta, updateValue) => {
    //       return (
    //         <Box alignItems="center">
    //           <CustomCheckboxWithLabel label="Access Menu" labelPlacement="top" />

    //           <Stack direction="row" spacing={1}>
    //             <CustomCheckboxWithLabel label="C" labelPlacement="top" />
    //             <CustomCheckboxWithLabel label="R" labelPlacement="top" />
    //             <CustomCheckboxWithLabel label="U" labelPlacement="top" />
    //             <CustomCheckboxWithLabel label="D" labelPlacement="top" />
    //             <CustomCheckboxWithLabel label="Approved" labelPlacement="top" />
    //             <hr />
    //           </Stack>
    //         </Box>
    //       );
    //     },
    //   },
    // },
    // {
    //   name: "name",
    //   label: "MC-CPRO",
    //   options: {
    //     customBodyRender: (value, tableMeta, updateValue) => {
    //       return (
    //         <Box alignItems="center">
    //           <CustomCheckboxWithLabel label="Access Menu" labelPlacement="top" />

    //           <Stack direction="row" spacing={1}>
    //             <CustomCheckboxWithLabel label="C" labelPlacement="top" />
    //             <CustomCheckboxWithLabel label="R" labelPlacement="top" />
    //             <CustomCheckboxWithLabel label="U" labelPlacement="top" />
    //             <CustomCheckboxWithLabel label="D" labelPlacement="top" />
    //             <CustomCheckboxWithLabel label="Approved" labelPlacement="top" />
    //             <hr />
    //           </Stack>
    //         </Box>
    //       );
    //     },
    //   },
    // },
    // {
    //   name: "name",
    //   label: "PRO",
    //   options: {
    //     customBodyRender: (value, tableMeta, updateValue) => {
    //       return (
    //         <Box alignItems="center">
    //           <CustomCheckboxWithLabel label="Access Menu" labelPlacement="top" />

    //           <Stack direction="row" spacing={1}>
    //             <CustomCheckboxWithLabel label="C" labelPlacement="top" />
    //             <CustomCheckboxWithLabel label="R" labelPlacement="top" />
    //             <CustomCheckboxWithLabel label="U" labelPlacement="top" />
    //             <CustomCheckboxWithLabel label="D" labelPlacement="top" />
    //             <CustomCheckboxWithLabel label="Approved" labelPlacement="top" />
    //             <hr />
    //           </Stack>
    //         </Box>
    //       );
    //     },
    //   },
    // },
    // {
    //   name: "name",
    //   label: "APRO",
    //   options: {
    //     customBodyRender: (value, tableMeta, updateValue) => {
    //       return (
    //         <Box alignItems="center">
    //           <CustomCheckboxWithLabel label="Access Menu" labelPlacement="top" />

    //           <Stack direction="row" spacing={1}>
    //             <CustomCheckboxWithLabel label="C" labelPlacement="top" />
    //             <CustomCheckboxWithLabel label="R" labelPlacement="top" />
    //             <CustomCheckboxWithLabel label="U" labelPlacement="top" />
    //             <CustomCheckboxWithLabel label="D" labelPlacement="top" />
    //             <CustomCheckboxWithLabel label="Approved" labelPlacement="top" />
    //             <hr />
    //           </Stack>
    //         </Box>
    //       );
    //     },
    //   },
    // },
    // {
    //   name: "name",
    //   label: "BIC",
    //   options: {
    //     customBodyRender: (value, tableMeta, updateValue) => {
    //       return (
    //         <Box alignItems="center">
    //           <CustomCheckboxWithLabel label="Access Menu" labelPlacement="top" />

    //           <Stack direction="row" spacing={1}>
    //             <CustomCheckboxWithLabel label="C" labelPlacement="top" />
    //             <CustomCheckboxWithLabel label="R" labelPlacement="top" />
    //             <CustomCheckboxWithLabel label="U" labelPlacement="top" />
    //             <CustomCheckboxWithLabel label="D" labelPlacement="top" />
    //             <CustomCheckboxWithLabel label="Approved" labelPlacement="top" />
    //             <hr />
    //           </Stack>
    //         </Box>
    //       );
    //     },
    //   },
    // },
    // {
    //   name: "name",
    //   label: "GS",
    //   options: {
    //     customBodyRender: (value, tableMeta, updateValue) => {
    //       return (
    //         <Box alignItems="center">
    //           <CustomCheckboxWithLabel label="Access Menu" labelPlacement="top" />

    //           <Stack direction="row" spacing={1}>
    //             <CustomCheckboxWithLabel label="C" labelPlacement="top" />
    //             <CustomCheckboxWithLabel label="R" labelPlacement="top" />
    //             <CustomCheckboxWithLabel label="U" labelPlacement="top" />
    //             <CustomCheckboxWithLabel label="D" labelPlacement="top" />
    //             <CustomCheckboxWithLabel label="Approved" labelPlacement="top" />
    //             <hr />
    //           </Stack>
    //         </Box>
    //       );
    //     },
    //   },
    // },
    // {
    //   name: "name",
    //   label: "ADMIN",
    //   options: {
    //     customBodyRender: (value, tableMeta, updateValue) => {
    //       return (
    //         <Box alignItems="center">
    //           <CustomCheckboxWithLabel label="Access Menu" labelPlacement="top" />

    //           <Stack direction="row" spacing={1}>
    //             <CustomCheckboxWithLabel label="C" labelPlacement="top" />
    //             <CustomCheckboxWithLabel label="R" labelPlacement="top" />
    //             <CustomCheckboxWithLabel label="U" labelPlacement="top" />
    //             <CustomCheckboxWithLabel label="D" labelPlacement="top" />
    //             <CustomCheckboxWithLabel label="Approved" labelPlacement="top" />
    //             <hr />
    //           </Stack>
    //         </Box>
    //       );
    //     },
    //   },
    // },
    // {
    //   name: "name",
    //   label: "Operators",
    //   options: {
    //     customBodyRender: (value, tableMeta, updateValue) => {
    //       return (
    //         <Box alignItems="center">
    //           <CustomCheckboxWithLabel label="Access Menu" labelPlacement="top" />

    //           <Stack direction="row" spacing={1}>
    //             <CustomCheckboxWithLabel label="C" labelPlacement="top" />
    //             <CustomCheckboxWithLabel label="R" labelPlacement="top" />
    //             <CustomCheckboxWithLabel label="U" labelPlacement="top" />
    //             <CustomCheckboxWithLabel label="D" labelPlacement="top" />
    //             <CustomCheckboxWithLabel label="Approved" labelPlacement="top" />
    //             <hr />
    //           </Stack>
    //         </Box>
    //       );
    //     },
    //   },
    // },
  ];

  const options = {
    elevation: 0,
    selectableRows: "none",
    responsive: "standard",
    download: false,
    print: false,
    viewColumns: false,
    filter: false,
  };

  return (
    <Card>
      {other.isLoading && (
        <Box minHeight={200} display="flex" justifyContent="center" alignItems="center">
          <CircularProgress />
        </Box>
      )}

      {!other.isLoading && (
        <>
          <Stack direction="row" p={3} sx={{ alignItems: "center", justifyContent: "space-between" }}>
            <Typography variant="body1">Assign Authority</Typography>

            <LoadingButton variant="contained">Save</LoadingButton>
          </Stack>

          <Divider />

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

export default connect(mapStateToProps, { getAllAcessPermissions, clearOtherReducer })(AccessMangementList);
