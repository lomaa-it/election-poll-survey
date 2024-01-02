import React from "react";
import CustomMuiDataTable from "../../components/CustomMuiDataTable";
import { Box, Checkbox, Stack } from "@mui/material";
import { styled } from "@mui/material/styles";

const CustomCheckbox = styled(Checkbox)(({ theme }) => ({ padding: 0, "& .MuiSvgIcon-root": { fontSize: 20 } }));

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
            <Stack direction="row" spacing={1}>
              <CustomCheckbox size="small" />
            </Stack>
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
            <Stack direction="row" spacing={1}>
              <CustomCheckbox />
            </Stack>
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
            <Stack direction="row" spacing={1}>
              <CustomCheckbox />
            </Stack>
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
            <Stack direction="row" spacing={1}>
              <CustomCheckbox />
            </Stack>
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
            <Stack direction="row" spacing={1}>
              <CustomCheckbox />
            </Stack>
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
            <Stack direction="row" spacing={1}>
              <CustomCheckbox />
            </Stack>
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
            <Stack direction="row" spacing={1}>
              <CustomCheckbox />
            </Stack>
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
              <CustomCheckbox />

              <Stack direction="row" spacing={1}>
                <CustomCheckbox />
                <CustomCheckbox />
                <CustomCheckbox />
                <CustomCheckbox />
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
            <Stack direction="row" spacing={1}>
              <CustomCheckbox />
            </Stack>
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
            <Stack direction="row" spacing={1}>
              <CustomCheckbox />
            </Stack>
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

  return (
    <CustomMuiDataTable
      title="Opinion Poll"
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
