import React, { forwardRef, useImperativeHandle } from "react";
import { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Grid, Container, Typography, Box, TextField, Card, MenuItem, Stack } from "@mui/material";
import { FormProvider, RHFAutoComplete } from "../../components/hook-form";
import { LoadingButton } from "@mui/lab";
import { getAllCommonData } from "../../actions/common";

import { ageDropdown } from "../../utils/dropdownconstants";

const SearchByFilter = forwardRef(
  (
    {
      account,
      common,
      defaultValues,
      getAllCommonData,
      onChanged,
      onSubmit,
      onReset,
      lg = 2,
      showMandal = true,
      showDivision = true,
      showSachivalayam = true,
      showPartNo = true,
      showVillage = true,
      showOtherFilters = true,
      showSearchButton = true,
      children,
    },
    ref
  ) => {
    const [formValues, setFormValues] = useState({
      mandal: null,
      division: null,
      sachivalayam: null,
      partno: null,
      village: null,
      gender: null,
      religion: null,
      caste: null,
      disability: null,
      govt_employee: null,
      age: null,
    });
    const [errors, setErrors] = useState({
      mandal: null,
      division: null,
      sachivalayam: null,
      partno: null,
      village: null,
    });
    const [isLoading, setLoading] = useState(false);
    const [submitFlag, setSubmitFlag] = useState(false);

    useEffect(() => {
      if (common?.mandals.length == 0) {
        getAllCommonData(account?.user);
      }
    }, []);

    useEffect(() => {
      setIntialDefaultValues(true);
    }, [common]);

    const setIntialDefaultValues = (allowSubmit) => {
      if (common?.mandals.length > 0) {
        if (account?.user.mandal_pk != null) {
          var initialMandal = common?.mandals[0];
          if (common?.mandals.length > 0) {
            setFormValues((state) => ({ ...state, mandal: initialMandal }));
          }
        }

        if (account?.user.division_pk != null) {
          var initialDivision = common?.divisions.filter((e) => e.mandal_id == initialMandal?.mandal_pk)[0];
          if (common?.divisions.length > 0) {
            setFormValues((state) => ({
              ...state,
              division: initialDivision ?? null,
            }));
          }
        }

        if (account?.user.sachivalayam_pk != null) {
          var initialSachivalayam = common?.sachivalayams.filter((e) => e.division_id == initialDivision?.division_pk)[0];
          console.log("initialSachivalayam", initialSachivalayam)
          if (common?.sachivalayams.length > 0) {
            setFormValues((state) => ({
              ...state,
              sachivalayam: initialSachivalayam ?? null,
            }));
          }
        }

        var initialPart = common?.parts.filter((e) => e.sachivalayam_id == initialSachivalayam?.sachivalayam_pk)[0];
        console.log("initialPart", initialPart)
        if (account?.user.part_no == null) {
          setFormValues((state) => ({ ...state, partno:  account?.user.part_no } ));
        }else{
         
          if (common?.parts.length > 0) {
            setFormValues((state) => ({ ...state, partno: initialPart ?? null }));
          }
        }

        // var initialVillage = common?.villages.filter(
        //   (e) => e.part_no == initialPart?.part_no
        // )[0];
        // if (common?.villages.length > 0) {
        //   setFormValues((state) => ({
        //     ...state,
        //     village: initialVillage ?? null,
        //   }));
        // }

        if (defaultValues) {
          console.log(defaultValues);
          setFormValues((state) => ({
            ...state,
            mandal: defaultValues.mandal_pk ? common?.mandals.find((e) => e.mandal_pk === defaultValues.mandal_pk) : state.mandal,
            division: defaultValues.division_pk ? common?.divisions.find((e) => e.division_pk === defaultValues.division_pk) : state.division,
            sachivalayam: defaultValues.sachivalayam_pk ? common?.sachivalayams.find((e) => e.sachivalayam_pk === defaultValues.sachivalayam_pk) : state.sachivalayam,
            partno: defaultValues.part_no ? common?.parts.find((e) => e.part_no === defaultValues.part_no) : state.partno,
          }));
        }

        if (allowSubmit) {
          setSubmitFlag(true);
        }
      }
    };

    const handleSubmit = async () => {
      if (onSubmit == null) return;

      const jsonData = {
        state_id: 5,
        district_id: 6,
        consistency_id: 3,
        mandal_id: formValues.mandal?.mandal_pk ?? null,
        division_id: formValues.division?.division_pk ?? null,
        sachivalayam_id: formValues.sachivalayam?.sachivalayam_pk ?? null,
        part_no: formValues.partno?.part_no ?? null,
        village_id: formValues.village?.village_pk ?? null,
        gender: formValues.gender?.value ?? null,
        religion_id: formValues.religion?.value ?? null,
        caste_id: formValues.caste?.value ?? null,
        disability: formValues.disability?.value ?? null,
        govt_employee: formValues.govt_employee?.value ?? null,
        age: formValues.age?.value ?? "",
      };

      setLoading(true);
      await onSubmit(jsonData);
      setLoading(false);
    };

    const handleChange = (name, value) => {
      const values = {};
      values[name] = value;

      if (name == "mandal") {
        values["division"] = null;
        values["sachivalayam"] = null;
        values["partno"] = null;
        values["village"] = null;
      }

      if (name == "division") {
        values["sachivalayam"] = null;
        values["partno"] = null;
        values["village"] = null;
      }

      if (name == "sachivalayam") {
        values["partno"] = null;
        values["village"] = null;
      }

      if (name == "partno") {
        values["village"] = null;
      }

      setFormValues((state) => ({ ...state, ...values }));
    };

    useEffect(() => {
      if (onChanged != null) onChanged(formValues);

      if (submitFlag) {
        handleSubmit();
        setSubmitFlag(false);
      }
    }, [formValues]);

    const handleReset = () => {
      setFormValues((state) => ({
        ...state,
        mandal: null,
        division: null,
        sachivalayam: null,
        partno: null,
        village: null,
        gender: null,
        religion: null,
        caste: null,
        disability: null,
        govt_employee: null,
        age: null,
      }));

      if (onReset != null) onReset();

      setIntialDefaultValues(true);
    };

    useImperativeHandle(ref, () => ({
      setErrors: (newErrors) => {
        setErrors((prevErrors) => ({
          ...prevErrors,
          ...newErrors,
        }));
      },
      submit: handleSubmit,
      reset: handleReset,
    }));

    return (
      <>
        {showMandal && (
          <Grid item xs={12} md={6} lg={lg}>
            <RHFAutoComplete
              name="mandal"
              label="Select Mandal"
              value={formValues.mandal}
              options={common?.mandals}
              getOptionLabel={(option) => option.mandal_name}
              onChange={handleChange}
              loading={common?.isLoading}
              disabled={account?.user.mandal_pk != null}
              error={!!errors.mandal}
              helperText={errors.mandal}
            />
          </Grid>
        )}

        {showDivision && (
          <Grid item xs={12} md={6} lg={lg}>
            <RHFAutoComplete
              name="division"
              label="Select Division"
              value={formValues.division}
              options={common?.divisions.filter((e) => e.mandal_id == formValues?.mandal?.mandal_pk)}
              getOptionLabel={(option) => option.division_name}
              onChange={handleChange}
              disabled={account?.user.division_pk != null}
              error={!!errors.division}
              helperText={errors.division}
            />
          </Grid>
        )}

        {showSachivalayam && (
          <Grid item xs={12} md={6} lg={lg}>
            <RHFAutoComplete
              name="sachivalayam"
              label="Select Sachivalayam"
              value={formValues.sachivalayam}
              options={common?.sachivalayams.filter((e) => e.division_id == formValues?.division?.division_pk)}
              getOptionLabel={(option) => option.sachivalayam_name}
              onChange={handleChange}
              disabled={account?.user.sachivalayam_pk != null}
              error={!!errors.sachivalayam}
              helperText={errors.sachivalayam}
            />
          </Grid>
        )}

        {showPartNo && account?.user?.desgination_name != "MLA" && (
          <Grid item xs={12} md={6} lg={lg}>
            <RHFAutoComplete
              name="partno"
              label="Select Part/Booth No"
              value={formValues.partno}
              options={common?.parts.filter((e) => e.sachivalayam_id == formValues?.sachivalayam?.sachivalayam_pk)}
              getOptionLabel={(option) => String(option.part_no)}
              onChange={handleChange}
              disabled={account.user.part_no != null}
              error={!!errors.partno}
              helperText={errors.partno}
            />
          </Grid>
        )}

        {showPartNo && formValues?.mandal !== null && account?.user?.desgination_name == "MLA" && (
          <Grid item xs={12} md={6} lg={lg}>
            <RHFAutoComplete
              name="partno"
              label="Select Part/Booth No"
              value={formValues.partno}
              options={common?.parts.filter((e) => e.sachivalayam_id == formValues?.sachivalayam?.sachivalayam_pk)}
              getOptionLabel={(option) => String(option.part_no)}
              onChange={handleChange}
              disabled={account.user.part_no != null}
              error={!!errors.partno}
              helperText={errors.partno}
            />
          </Grid>
        )}

        {/* /// show in mla login and it shoukd display all part no's */}
        {showPartNo && account?.user?.desgination_name == "MLA" && formValues?.mandal === null && (
          <Grid item xs={12} md={6} lg={lg}>
            <RHFAutoComplete
              name="partno"
              label="Select Part/Booth No"
              value={formValues.partno}
              options={common?.parts}
              getOptionLabel={(option) => String(option.part_no)}
              onChange={handleChange}
              error={!!errors.partno}
              helperText={errors.partno}
            />
          </Grid>
        )}

        {showVillage && (
          <Grid item xs={12} md={6} lg={lg}>
            <RHFAutoComplete
              name="village"
              label="Select Village"
              value={formValues.village}
              options={common?.villages.filter((e) => e.part_no == formValues?.partno?.part_no)}
              getOptionLabel={(option) => option.village_name}
              onChange={handleChange}
              error={!!errors.village}
              helperText={errors.village}
              // disabled={account.user.village_pk != null}
            />
          </Grid>
        )}

        {showOtherFilters && (
          <>
            <Grid item xs={12} md={6} lg={lg}>
              <RHFAutoComplete
                name="gender"
                label="Select Gender"
                value={formValues.gender}
                options={[
                  {
                    label: "Male",
                    value: 13,
                  },
                  {
                    label: "Female",
                    value: 14,
                  },
                  {
                    label: "Transgender",
                    value: 15,
                  },
                ]}
                onChange={handleChange}
              />
            </Grid>{" "}
            <Grid item xs={12} md={6} lg={lg}>
              <RHFAutoComplete name="religion" label="Select Religion" value={formValues.religion} options={common?.religion} onChange={handleChange} />
            </Grid>
            <Grid item xs={12} md={6} lg={lg}>
              <RHFAutoComplete name="caste" label="Select Caste" value={formValues.caste} options={common?.caste} onChange={handleChange} />
            </Grid>
            <Grid item xs={12} md={6} lg={lg}>
              <RHFAutoComplete
                name="disability"
                label="Disability (40% or above)"
                value={formValues.disability}
                options={[
                  {
                    label: "Yes",
                    value: true,
                  },
                  {
                    label: "No",
                    value: false,
                  },
                ]}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} md={6} lg={lg}>
              <RHFAutoComplete
                name="govt_employee"
                label="Govt Employee"
                value={formValues.govt_employee}
                options={[
                  {
                    label: "Yes",
                    value: true,
                  },
                  {
                    label: "No",
                    value: false,
                  },
                ]}
                onChange={handleChange}
              />
            </Grid>{" "}
            <Grid item xs={12} md={6} lg={lg}>
              <RHFAutoComplete name="age" label="Select Age" value={formValues.age} options={ageDropdown} onChange={handleChange} />
            </Grid>
          </>
        )}

        {children}

        {showSearchButton && (
          <>
            <Grid item xs={12} md={6} lg={2}>
              <Stack direction="row" spacing={1}>
                <LoadingButton loading={isLoading} variant="contained" onClick={handleSubmit}>
                  Search
                </LoadingButton>
                <LoadingButton loading={isLoading} variant="contained" color="error" onClick={handleReset}>
                  Clear
                </LoadingButton>
              </Stack>
            </Grid>
          </>
        )}
      </>
    );
  }
);

const mapStateToProps = (state) => {
  return {
    account: state.auth,
    common: state.common,
  };
};

export default connect(
  mapStateToProps,
  {
    getAllCommonData,
  },
  null,
  { forwardRef: true }
)(SearchByFilter);
