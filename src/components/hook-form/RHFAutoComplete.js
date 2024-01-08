import React from "react";
import { Autocomplete, CircularProgress, TextField } from "@mui/material";

export default function RHFAutoComplete({ name, value, options, getOptionLabel, onChange, filterOptions, loading, disabled = false, multiple = false, freeSolo = false, isDialog = false, ...other }) {
  return (
    <Autocomplete
      fullWidth
      freeSolo={freeSolo}
      multiple={multiple}
      size="small"
      name={name}
      value={value}
      options={options ?? []}
      getOptionLabel={getOptionLabel}
      sx={{
        backgroundColor: "#fff",
        borderRadius: "5px",
      }}
      disabled={disabled}
      clearOnBlur
      renderInput={(params) => (
        <TextField
          {...params}
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <React.Fragment>
                {loading ? <CircularProgress color="inherit" size={20} /> : null}
                {params.InputProps.endAdornment}
              </React.Fragment>
            ),
          }}
          {...other}
        />
      )}
      slotProps={{
        popper: {
          sx: {
            zIndex: isDialog ? 1300 : 1000,
          },
        },
      }}
      onChange={(e, value) => onChange(name, value)}
      filterOptions={filterOptions}
    />
  );
}
