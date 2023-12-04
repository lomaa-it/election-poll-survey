import React from "react";
import { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Grid, Container, Typography, Box, TextField, Card, MenuItem } from "@mui/material";
import { FormProvider, RHFAutoComplete } from "../../components/hook-form";
import { getAllCommonData } from "../../actions/common";
import { casteList } from "../../constants";
import { ageDropdown } from "../../utils/dropdownconstants";

const SearchByFilter = ({ account, common, getAllCommonData, onChanged }) => {
  const [formValues, setFormValues] = useState({
    mandal: null,
    division: null,
    sachivalayam: null,
    partno: null,
    village: null,
  });

  useEffect(() => {
    if (common.mandals.length == 0) {
      getAllCommonData(account.user);
    }
  }, []);

  useEffect(() => {
    if (common.mandals.length > 0 && account.user.mandal_pk != null) {
      setFormValues((state) => ({ ...state, mandal: common.mandals[0] }));
    }

    if (common.divisions.length > 0 && account.user.division_pk != null) {
      setFormValues((state) => ({ ...state, division: common.divisions[0] }));
    }

    if (common.sachivalayams.length > 0 && account.user.sachivalayam_pk != null) {
      setFormValues((state) => ({ ...state, sachivalayam: common.sachivalayams[0] }));
    }

    if (common.parts.length > 0 && account.user.part_no != null) {
      setFormValues((state) => ({ ...state, partno: common.parts[0] }));
    }

    if (common.villages.length > 0 && account.user.village_pk != null) {
      setFormValues((state) => ({ ...state, village: common.villages[0] }));
    }
  }, [common]);

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
        <RHFAutoComplete
          name="mandal"
          label="Select Mandal"
          value={formValues.mandal}
          options={common.mandals}
          getOptionLabel={(option) => option.mandal_name}
          onChange={handleChange}
          loading={common.isLoading}
          disabled={account.user.mandal_pk != null}
        />
      </Grid>
      <Grid item xs={12} md={6} lg={2}>
        <RHFAutoComplete
          name="division"
          label="Select Division"
          value={formValues.division}
          options={common.divisions.filter((e) => e.mandal_id == formValues?.mandal?.mandal_pk)}
          getOptionLabel={(option) => option.division_name}
          onChange={handleChange}
          disabled={account.user.division_pk != null}
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
          disabled={account.user.sachivalayam_pk != null}
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
          disabled={account.user.part_no != null}
        />
      </Grid>
      <Grid item xs={12} md={6} lg={2}>
        <RHFAutoComplete
          name="village"
          label="Select Village"
          value={formValues.village}
          options={common.villages.filter((e) => e.part_no == formValues?.partno?.part_no)}
          getOptionLabel={(option) => option.village_name}
          onChange={handleChange}
          disabled={account.user.village_pk != null}
        />
      </Grid>
      <Grid item xs={12} md={6} lg={2}>
        <RHFAutoComplete
          name="gender"
          label="Select Gender"
          options={[
            {
              label: "Male",
            },
            {
              label: "Female",
            },
            {
              label: "Transgender",
            },
          ]}
        />
      </Grid>{" "}
      <Grid item xs={12} md={6} lg={2}>
        <RHFAutoComplete name="religion" label="Select Religion" />
      </Grid>{" "}
      <Grid item xs={12} md={6} lg={2}>
        <RHFAutoComplete name="caste" label="Select Caste" options={casteList} />
      </Grid>
      <Grid item xs={12} md={6} lg={2}>
        <RHFAutoComplete
          name="Disable"
          label="Disability (40% or above)"
          options={[
            {
              label: "Yes",
            },
            {
              label: "No",
            },
          ]}
          onChange={handleChange} // Add this line
        />
      </Grid>
      <Grid item xs={12} md={6} lg={2}>
        <RHFAutoComplete
          name="Govt Employee"
          label="Govt Employee"
          options={[
            {
              label: "Yes",
            },
            {
              label: "No",
            },
          ]}
        />
      </Grid>{" "}
      <Grid item xs={12} md={6} lg={2}>
        <RHFAutoComplete name="age" label="Select Age" options={ageDropdown} />
      </Grid>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    account: state.auth,
    common: state.common,
  };
};

export default connect(mapStateToProps, { getAllCommonData })(SearchByFilter);
