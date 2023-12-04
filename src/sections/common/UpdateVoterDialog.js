import React, { useState } from "react";
import { IconButton, Dialog, MenuItem, Grid, TextField, FormGroup, FormControl, RadioGroup, Radio, DialogContent, DialogTitle, FormControlLabel, DialogActions, Button } from "@mui/material";
import { casteList, religionList } from "../../constants";
import { LoadingButton } from "@mui/lab";
import EditIcon from "@mui/icons-material/Edit";

const UpdateVoterDialog = () => {
  const [open, setOpen] = useState(false);
  const [isLoading, setLoading] = useState(false);

  const [selectedParties, setSelectedParties] = useState({});
  const [isResidential, setIsResidential] = useState(true);

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <IconButton onClick={() => setOpen(true)}>
        <EditIcon />
      </IconButton>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Update Details</DialogTitle>
        <DialogContent>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} md={12} lg={12}>
              <TextField size="small" label="Phone Number" fullWidth />
            </Grid>
            <Grid item xs={12} md={12} lg={12}>
              <FormGroup>
                <FormControl>
                  <RadioGroup
                    row
                    aria-labelledby="demo-radio-buttons-group-label"
                    defaultValue="isResidential"
                    name="radio-buttons-group"
                    onChange={(e) => {
                      console.log("e.target.value", e.target.value);
                      if (e.target.value == "isResidential") {
                        setIsResidential(true);
                      } else {
                        setIsResidential(false);
                      }
                    }}
                  >
                    <FormControlLabel value="isResidential" control={<Radio />} label="Is Residential" />
                    <FormControlLabel value="non-residential" control={<Radio />} label="Non-Residential" />
                  </RadioGroup>
                </FormControl>
              </FormGroup>
            </Grid>
            {isResidential ? (
              <>
                <Grid item xs={12} md={12} lg={12}>
                  <TextField size="small" label="Current Address" fullWidth />
                </Grid>{" "}
                <Grid item xs={12} md={12} lg={12}>
                  <TextField size="small" label="Permanent Address" fullWidth />
                </Grid>
              </>
            ) : (
              <Grid item xs={12} md={12} lg={12}>
                <TextField size="small" label="Current Address" fullWidth />
              </Grid>
            )}
            <Grid item xs={12} md={6} lg={6}>
              <TextField size="small" label="Religion" fullWidth select>
                {religionList.map((item, index) => (
                  <MenuItem key={index} value={item.label}>
                    {item.label}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>{" "}
            <Grid item xs={12} md={6} lg={6}>
              <TextField size="small" label="Caste" fullWidth select>
                {casteList.map((item, index) => (
                  <MenuItem key={index} value={item.label}>
                    {item.label}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={12} md={6} lg={6}>
              <TextField size="small" label="Disability (40% or above)" fullWidth select>
                <MenuItem value="YES">YES</MenuItem>
                <MenuItem value="NO">NO</MenuItem>
              </TextField>
            </Grid>
            <Grid item xs={12} md={6} lg={6}>
              <TextField size="small" label="Govt Employee" fullWidth select>
                <MenuItem value="YES">YES</MenuItem>
                <MenuItem value="NO">NO</MenuItem>
              </TextField>
            </Grid>
            <Grid item xs={12} md={6} lg={6}>
              <TextField size="small" label="Select Party" fullWidth select>
                <MenuItem value="Neutral">Neutral</MenuItem>
                <MenuItem value="YCP">YCP</MenuItem>
                <MenuItem value="TDP">TDP</MenuItem>
                <MenuItem value="JSP">JSP</MenuItem>
                <MenuItem value="BJP">BJP</MenuItem>
                <MenuItem value="JSP">JSP</MenuItem>
                <MenuItem value="BJP">BJP</MenuItem>
                <MenuItem value="CONGRESS">CONGRESS</MenuItem>
                <MenuItem value="Others">Others</MenuItem>
              </TextField>
            </Grid>
          </Grid>
        </DialogContent>

        <DialogActions sx={{ p: 3 }}>
          <Button onClick={handleClose} variant="contained" color="error">
            Cancel
          </Button>

          <LoadingButton onClick={handleClose} variant="contained">
            Submit
          </LoadingButton>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default UpdateVoterDialog;
