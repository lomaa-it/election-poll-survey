import React from "react";
import { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Grid, Container, Typography, Box, TextField, Card, MenuItem } from "@mui/material";
import { FormProvider, RHFAutoComplete } from "../../components/hook-form";
import { getAllCommonData } from "../../actions/common";

const SearchByFilter = ({ common, getAllCommonData, onChanged }) => {
  const [formValues, setFormValues] = useState({ mandal: null, division: null, sachivalayam: null, partno: null, village: null });

  useEffect(() => {
    if (common.mandals.length == 0) {
      getAllCommonData();
    }
  }, []);

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
  }, [formValues]);

  return (
    <>
      <Grid item xs={12} md={6} lg={2}>
        <RHFAutoComplete name="mandal" label="Select Mandal" value={formValues.mandal} options={common.mandals} getOptionLabel={(option) => option.mandal_name} onChange={handleChange} loading={common.isLoading} />
      </Grid>

      <Grid item xs={12} md={6} lg={2}>
        <RHFAutoComplete
          name="division"
          label="Select Division"
          value={formValues.division}
          options={common.divisions.filter((e) => e.mandal_id == formValues?.mandal?.mandal_pk)}
          getOptionLabel={(option) => option.division_name}
          onChange={handleChange}
        />
      </Grid>

      <Grid item xs={12} md={6} lg={2}>
        <RHFAutoComplete
          name="sachivalayam"
          label="Select Sachivalayam"
          value={formValues.sachivalayam}
          options={common.sachivalayams.filter((e) => e.division_pk == formValues?.division?.division_pk)}
          getOptionLabel={(option) => option.sachivalayam_name}
          onChange={handleChange}
        />
      </Grid>

      <Grid item xs={12} md={6} lg={2}>
        <RHFAutoComplete
          name="partno"
          label="Select Part/Booth No"
          value={formValues.partno}
          options={common.parts.filter((e) => e.sachivalayam_id == formValues?.sachivalayam?.sachivalayam_pk)}
          getOptionLabel={(option) => String(option.part_no)}
          onChange={handleChange}
        />
      </Grid>

      <Grid item xs={12} md={6} lg={2}>
        <RHFAutoComplete name="village" label="Select Village" value={formValues.village} options={common.villages.filter((e) => e.part_no == formValues?.partno?.part_no)} getOptionLabel={(option) => option.village_name} onChange={handleChange} />
      </Grid>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    common: state.common,
  };
};

export default connect(mapStateToProps, { getAllCommonData })(SearchByFilter);
