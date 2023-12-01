import { Autocomplete, TextField } from "@mui/material";

export default function RHFAutoComplete({ name, value, options, getOptionLabel, onChange, ...other }) {
  return <Autocomplete fullWidth name={name} value={value} options={options ?? []} getOptionLabel={getOptionLabel} renderInput={(params) => <TextField {...params} {...other} />} onChange={(e, value) => onChange(name, value)} />;
}
