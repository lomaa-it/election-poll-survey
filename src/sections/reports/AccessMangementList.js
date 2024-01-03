import React from "react";
import CustomMuiDataTable from "../../components/CustomMuiDataTable";
import { Box, Checkbox, Stack, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import FormControlLabel from "@material-ui/core/FormControlLabel";

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

const AccessMangementList = () => {
  const columns = [
    {
      name: "page_id",
      label: "Page Id",
    },
    {
      name: "page_name",
      label: "Page Name",
    },
    {
      name: "name",
      label: "CM",
      options: {
        customBodyRender: (value, tableMeta, updateValue) => {
          return (
            <Box alignItems="center">
              <CustomCheckboxWithLabel label="Access Menu" labelPlacement="top" />

              <Stack direction="row" spacing={1}>
                <CustomCheckboxWithLabel label="C" labelPlacement="top" />
                <CustomCheckboxWithLabel label="R" labelPlacement="top" />
                <CustomCheckboxWithLabel label="U" labelPlacement="top" />
                <CustomCheckboxWithLabel label="D" labelPlacement="top" />
                <CustomCheckboxWithLabel label="Approved" labelPlacement="top" />
                <hr />
              </Stack>
            </Box>
          );
        },
      },
    },
    {
      name: "name",
      label: "State Leader",
      options: {
        customBodyRender: (value, tableMeta, updateValue) => {
          return (
            <Box alignItems="center">
              <CustomCheckboxWithLabel label="Access Menu" labelPlacement="top" />

              <Stack direction="row" spacing={1}>
                <CustomCheckboxWithLabel label="C" labelPlacement="top" />
                <CustomCheckboxWithLabel label="R" labelPlacement="top" />
                <CustomCheckboxWithLabel label="U" labelPlacement="top" />
                <CustomCheckboxWithLabel label="D" labelPlacement="top" />
                <CustomCheckboxWithLabel label="Approved" labelPlacement="top" />
                <hr />
              </Stack>
            </Box>
          );
        },
      },
    },
    {
      name: "name",
      label: "MLA",
      options: {
        customBodyRender: (value, tableMeta, updateValue) => {
          return (
            <Box alignItems="center">
              <CustomCheckboxWithLabel label="Access Menu" labelPlacement="top" />

              <Stack direction="row" spacing={1}>
                <CustomCheckboxWithLabel label="C" labelPlacement="top" />
                <CustomCheckboxWithLabel label="R" labelPlacement="top" />
                <CustomCheckboxWithLabel label="U" labelPlacement="top" />
                <CustomCheckboxWithLabel label="D" labelPlacement="top" />
                <CustomCheckboxWithLabel label="Approved" labelPlacement="top" />
                <hr />
              </Stack>
            </Box>
          );
        },
      },
    },
    {
      name: "name",
      label: "MC-CPRO",
      options: {
        customBodyRender: (value, tableMeta, updateValue) => {
          return (
            <Box alignItems="center">
              <CustomCheckboxWithLabel label="Access Menu" labelPlacement="top" />

              <Stack direction="row" spacing={1}>
                <CustomCheckboxWithLabel label="C" labelPlacement="top" />
                <CustomCheckboxWithLabel label="R" labelPlacement="top" />
                <CustomCheckboxWithLabel label="U" labelPlacement="top" />
                <CustomCheckboxWithLabel label="D" labelPlacement="top" />
                <CustomCheckboxWithLabel label="Approved" labelPlacement="top" />
                <hr />
              </Stack>
            </Box>
          );
        },
      },
    },
    {
      name: "name",
      label: "PRO",
      options: {
        customBodyRender: (value, tableMeta, updateValue) => {
          return (
            <Box alignItems="center">
              <CustomCheckboxWithLabel label="Access Menu" labelPlacement="top" />

              <Stack direction="row" spacing={1}>
                <CustomCheckboxWithLabel label="C" labelPlacement="top" />
                <CustomCheckboxWithLabel label="R" labelPlacement="top" />
                <CustomCheckboxWithLabel label="U" labelPlacement="top" />
                <CustomCheckboxWithLabel label="D" labelPlacement="top" />
                <CustomCheckboxWithLabel label="Approved" labelPlacement="top" />
                <hr />
              </Stack>
            </Box>
          );
        },
      },
    },
    {
      name: "name",
      label: "APRO",
      options: {
        customBodyRender: (value, tableMeta, updateValue) => {
          return (
            <Box alignItems="center">
              <CustomCheckboxWithLabel label="Access Menu" labelPlacement="top" />

              <Stack direction="row" spacing={1}>
                <CustomCheckboxWithLabel label="C" labelPlacement="top" />
                <CustomCheckboxWithLabel label="R" labelPlacement="top" />
                <CustomCheckboxWithLabel label="U" labelPlacement="top" />
                <CustomCheckboxWithLabel label="D" labelPlacement="top" />
                <CustomCheckboxWithLabel label="Approved" labelPlacement="top" />
                <hr />
              </Stack>
            </Box>
          );
        },
      },
    },
    {
      name: "name",
      label: "BIC",
      options: {
        customBodyRender: (value, tableMeta, updateValue) => {
          return (
            <Box alignItems="center">
              <CustomCheckboxWithLabel label="Access Menu" labelPlacement="top" />

              <Stack direction="row" spacing={1}>
                <CustomCheckboxWithLabel label="C" labelPlacement="top" />
                <CustomCheckboxWithLabel label="R" labelPlacement="top" />
                <CustomCheckboxWithLabel label="U" labelPlacement="top" />
                <CustomCheckboxWithLabel label="D" labelPlacement="top" />
                <CustomCheckboxWithLabel label="Approved" labelPlacement="top" />
                <hr />
              </Stack>
            </Box>
          );
        },
      },
    },
    {
      name: "name",
      label: "GS",
      options: {
        customBodyRender: (value, tableMeta, updateValue) => {
          return (
            <Box alignItems="center">
              <CustomCheckboxWithLabel label="Access Menu" labelPlacement="top" />

              <Stack direction="row" spacing={1}>
                <CustomCheckboxWithLabel label="C" labelPlacement="top" />
                <CustomCheckboxWithLabel label="R" labelPlacement="top" />
                <CustomCheckboxWithLabel label="U" labelPlacement="top" />
                <CustomCheckboxWithLabel label="D" labelPlacement="top" />
                <CustomCheckboxWithLabel label="Approved" labelPlacement="top" />
                <hr />
              </Stack>
            </Box>
          );
        },
      },
    },
    {
      name: "name",
      label: "ADMIN",
      options: {
        customBodyRender: (value, tableMeta, updateValue) => {
          return (
            <Box alignItems="center">
              <CustomCheckboxWithLabel label="Access Menu" labelPlacement="top" />

              <Stack direction="row" spacing={1}>
                <CustomCheckboxWithLabel label="C" labelPlacement="top" />
                <CustomCheckboxWithLabel label="R" labelPlacement="top" />
                <CustomCheckboxWithLabel label="U" labelPlacement="top" />
                <CustomCheckboxWithLabel label="D" labelPlacement="top" />
                <CustomCheckboxWithLabel label="Approved" labelPlacement="top" />
                <hr />
              </Stack>
            </Box>
          );
        },
      },
    },
    {
      name: "name",
      label: "Operators",
      options: {
        customBodyRender: (value, tableMeta, updateValue) => {
          return (
            <Box alignItems="center">
              <CustomCheckboxWithLabel label="Access Menu" labelPlacement="top" />

              <Stack direction="row" spacing={1}>
                <CustomCheckboxWithLabel label="C" labelPlacement="top" />
                <CustomCheckboxWithLabel label="R" labelPlacement="top" />
                <CustomCheckboxWithLabel label="U" labelPlacement="top" />
                <CustomCheckboxWithLabel label="D" labelPlacement="top" />
                <CustomCheckboxWithLabel label="Approved" labelPlacement="top" />
                <hr />
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
    download: false,
    print: false,
    viewColumns: false,
    filter: false,
  };

  return (
    <CustomMuiDataTable
      title=""
      columns={columns}
      data={[
        ["ID0", "Survey Dashboard"],
        ["ID1", "Survey Page"],
        ["ID2", "Add Voter"],
      ]}
      options={options}
    />
  );
};

export default AccessMangementList;
