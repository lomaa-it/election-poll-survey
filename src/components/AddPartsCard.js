import {
  Grid,
  Container,
  Typography,
  Box,
  TextField,
  Card,
  MenuItem,
} from "@mui/material";
import Page from "../components/Page";
import { connect } from "react-redux";
import { LoadingButton } from "@mui/lab";
import * as Yup from "yup";

import { useEffect, useRef, useState } from "react";
import instance from "../utils/axios";

import { showAlert } from "../actions/alert";
import SearchByFilter from "../sections/common/SearchByFilter";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import {
  FormProvider,
  RHFCheckbox,
  RHFRadio,
  RHFTextField,
} from "../components/hook-form";
import { createPartsRoute } from "../utils/apis";

const AddPartsCard = ({ dashboard, common, showAlert, reFecthData }) => {
  const filterRef = useRef(null);
  const [isLoading, setLoading] = useState(false);
  const [filterValues, setFilterValues] = useState({
    mandal: null,
    division: null,
    sachivalayam: null,
    partno: null,
    village: null,
  });

  const schema = Yup.object().shape({
    part_no: Yup.string().required("Part No is required"),
    male_votes: Yup.string().required("Male Votes is required"),
    female_votes: Yup.string().required("Female  Votes is required"),
    other_votes: Yup.string().required("TG Votes is required"),
  });
  const defaultValues = {
    part_no: "",
    male_votes: "",
    female_votes: "",
    other_votes: "",
  };

  const methods = useForm({
    resolver: yupResolver(schema),
    defaultValues,
  });

  const { handleSubmit, reset, watch, setError, clearErrors } = methods;

  const onSubmit = async (data) => {
    var hasErrors = false;
    filterRef.current.setErrors({
      mandal: null,
      division: null,
      sachivalayam: null,
      partno: null,
    });

    if (!filterValues["mandal"]) {
      filterRef.current.setErrors({ mandal: "Mandal is required" });
      hasErrors = true;
    }

    if (!filterValues["division"]) {
      filterRef.current.setErrors({ division: "Division is required" });
      hasErrors = true;
    }

    if (!filterValues["sachivalayam"]) {
      filterRef.current.setErrors({ sachivalayam: "Sachivalayam is required" });
      hasErrors = true;
    }

    if (hasErrors) return;
    console.log(data);
    console.log("filterValues", filterValues);
    setLoading(true);

    try {
      const jsonData = {
        ...data,
        sachivalayam_id: filterValues.sachivalayam?.sachivalayam_pk ?? null,
      };
      console.log("jsonData", jsonData);
      await instance.post(createPartsRoute, jsonData);
      showAlert({ text: "Part added successfully", color: "success" });
      reset();
      filterRef.current.reset();
      reFecthData();

      setLoading(false);
    } catch (error) {
      showAlert({
        text: error.response?.data?.error ?? "Something went wrong",
      });
      setLoading(false);
    }
  };
  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Card sx={{ p: 3, mb: 3 }}>
        <Typography sx={{ pb: 2 }}>Add Parts</Typography>

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
            <RHFTextField name="part_no" label="Part No" type="number" />
          </Grid>
          <Grid item xs={12} md={6} lg={2}>
            <RHFTextField name="male_votes" label="Male Votes" type="number" />
          </Grid>
          <Grid item xs={12} md={6} lg={2}>
            <RHFTextField
              name="female_votes"
              label="Female Votes"
              type="number"
            />
          </Grid>
          <Grid item xs={12} md={6} lg={2}>
            <RHFTextField name="other_votes" label="Tg Votes" type="number" />
          </Grid>
          <Grid item xs={12} md={6} lg={2}>
            <LoadingButton
              type="submit"
              loading={isLoading}
              onClick={handleSubmit}
              variant="contained"
            >
              Add
            </LoadingButton>
          </Grid>
        </Grid>
      </Card>
    </FormProvider>
  );
};

const mapStateToProps = (state) => {
  return {
    dashboard: state.dashboard,
    common: state.common,
  };
};

export default connect(mapStateToProps, { showAlert })(AddPartsCard);
