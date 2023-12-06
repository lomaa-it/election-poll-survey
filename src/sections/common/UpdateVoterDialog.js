import React, { useEffect, useState } from "react";
import {
  Box,
  IconButton,
  Dialog,
  MenuItem,
  Grid,
  TextField,
  FormGroup,
  FormControl,
  RadioGroup,
  Radio,
  DialogContent,
  DialogTitle,
  FormControlLabel,
  DialogActions,
  Button,
  Typography,
  FormLabel,
} from "@mui/material";
import { PARTY_ID, casteList, religionList } from "../../constants";
import { LoadingButton } from "@mui/lab";
import EditIcon from "@mui/icons-material/Edit";
import {
  BJPRadio,
  CongressRadio,
  JSPRadio,
  NeutralRadio,
  OthersRadio,
  TDPRadio,
  YCPRadio,
} from "./PartyRadioButtons";
import { changeOpinionPoll, getAllVotersSurvey } from "../../actions/voter";
import { showAlert } from "../../actions/alert";
import { set } from "date-fns";
import {
  getAllCastesRoute,
  getAllReligionRoute,
  saveOrupdatedSurvey,
} from "../../utils/apis";
import instance from "../../utils/axios";

const UpdateVoterDialog = ({ data }) => {
  // console.log("see here", data);
  const [fetchedCasteList, setFetchedCasteList] = useState(casteList);
  const [fetchedReligionList, setFetchedReligionList] = useState(religionList);

  const [open, setOpen] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [fillerValues, setFilterValues] = useState({
    phone_no: data[10],
    voter_pk: data[0],
    volunteer_id: data[1] === null ? 1 : data[1],
    residential: true,
    religion_id: data[24],
    religion: data[18],
    caste_id: data[25],
    caste: data[19],
    disability: data[3] || false,
    govt_employee: data[4],
    current_address: data[23],
    permenent_address: data[2],
    intrested_party: data[11],
  });

  useEffect(() => {
    const fetchCasteData = async () => {
      const response = await instance.get(getAllCastesRoute);
      const responseData = response.data?.message ?? [];
      // console.log(responseData);
      const filterList = responseData.map((item) => ({
        label: item.caste_name,
        value: item.lookup_pk,
      }));
      setFetchedCasteList(filterList);
    };
    fetchCasteData();

    const fetchReligionData = async () => {
      const response = await instance.get(getAllReligionRoute);
      const responseData = response.data?.message ?? [];
      // console.log(responseData);
      const filterList = responseData.map((item) => ({
        label: item.religion_name,
        value: item.lookup_pk,
      }));
      setFetchedReligionList(filterList);
    };
    fetchReligionData();
  }, []);

  const handleChange = async (id, value) => {
    // var result = await changeOpinionPoll(id, value);
    // if (result) {
    //   showAlert({ text: "Opinion Submitted", color: "success" });
    // }
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("hi submited ");
    setLoading(true);
    const { caste, religion, ...submitBody } = fillerValues;
    console.log("submitBody", submitBody);

    const response = await instance.post(saveOrupdatedSurvey, submitBody);
    console.log("response", response);

    setLoading(false);
    // close pop after submit completed
    handleClose();
  };

  // console.log("fillerValues", fillerValues);
  // console.log("fetchedCasteList", fetchedCasteList);
  // console.log("fetchedReligionList", fetchedReligionList);

  return (
    <>
      <IconButton onClick={() => setOpen(true)}>
        <EditIcon />
      </IconButton>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Update Details</DialogTitle>
        <DialogContent>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} md={6} lg={6}>
              {/* <TextField size="small" label="Select Party" fullWidth select>
                <MenuItem value="Neutral">Neutral</MenuItem>
                <MenuItem value="YCP">YCP</MenuItem>
                <MenuItem value="TDP">TDP</MenuItem>
                <MenuItem value="JSP">JSP</MenuItem>
                <MenuItem value="BJP">BJP</MenuItem>
                <MenuItem value="JSP">JSP</MenuItem>
                <MenuItem value="BJP">BJP</MenuItem>
                <MenuItem value="CONGRESS">CONGRESS</MenuItem>
                <MenuItem value="Others">Others</MenuItem>
              </TextField> */}

              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  padding: 0,
                  marginBottom: 1,
                  marginTop: 3,
                  width: "500",
                }}
              >
                <FormControlLabel
                  value={PARTY_ID.NEUTRAL}
                  label={
                    <Typography sx={{ fontSize: "10px", fontWeight: "bold" }}>
                      Neutral
                    </Typography>
                  }
                  labelPlacement="top"
                  sx={{
                    fontSize: "10px",
                  }}
                  control={<NeutralRadio />}
                  checked={fillerValues.intrested_party == PARTY_ID.NEUTRAL}
                  onChange={() => {
                    handleChange(PARTY_ID.NEUTRAL);
                    setFilterValues({
                      ...fillerValues,
                      intrested_party: PARTY_ID.NEUTRAL,
                    });
                  }}
                />
                <FormControlLabel
                  value={PARTY_ID.YSRCP}
                  label={
                    <Typography sx={{ fontSize: "10px", fontWeight: "bold" }}>
                      YSRCP
                    </Typography>
                  }
                  labelPlacement="top"
                  control={<YCPRadio />}
                  checked={fillerValues.intrested_party == PARTY_ID.YSRCP}
                  onChange={() => {
                    handleChange(PARTY_ID.YSRCP);
                    setFilterValues({
                      ...fillerValues,
                      intrested_party: PARTY_ID.YSRCP,
                    });
                  }}
                />
                <FormControlLabel
                  value={PARTY_ID.TDP}
                  label={
                    <Typography sx={{ fontSize: "10px", fontWeight: "bold" }}>
                      TDP
                    </Typography>
                  }
                  labelPlacement="top"
                  control={<TDPRadio />}
                  checked={fillerValues.intrested_party == PARTY_ID.TDP}
                  onChange={() => {
                    handleChange(PARTY_ID.TDP);
                    setFilterValues({
                      ...fillerValues,
                      intrested_party: PARTY_ID.TDP,
                    });
                  }}
                />
                <FormControlLabel
                  value={PARTY_ID.JANASENA}
                  label={
                    <Typography sx={{ fontSize: "10px", fontWeight: "bold" }}>
                      JSP
                    </Typography>
                  }
                  labelPlacement="top"
                  control={<JSPRadio />}
                  checked={fillerValues.intrested_party == PARTY_ID.JANASENA}
                  onChange={() => {
                    handleChange(PARTY_ID.JANASENA);
                    setFilterValues({
                      ...fillerValues,
                      intrested_party: PARTY_ID.JANASENA,
                    });
                  }}
                />
                <FormControlLabel
                  value={PARTY_ID.BJP}
                  label={
                    <Typography sx={{ fontSize: "10px", fontWeight: "bold" }}>
                      BJP
                    </Typography>
                  }
                  labelPlacement="top"
                  control={<BJPRadio />}
                  checked={fillerValues.intrested_party == PARTY_ID.BJP}
                  onChange={() => {
                    handleChange(PARTY_ID.BJP);
                    setFilterValues({
                      ...fillerValues,
                      intrested_party: PARTY_ID.BJP,
                    });
                  }}
                />
                <FormControlLabel
                  value={PARTY_ID.CONGRESS}
                  label={
                    <Typography sx={{ fontSize: "10px", fontWeight: "bold" }}>
                      CONGRESS
                    </Typography>
                  }
                  labelPlacement="top"
                  control={<CongressRadio />}
                  checked={fillerValues.intrested_party == PARTY_ID.CONGRESS}
                  onChange={() => {
                    handleChange(PARTY_ID.CONGRESS);
                    setFilterValues({
                      ...fillerValues,
                      intrested_party: PARTY_ID.CONGRESS,
                    });
                  }}
                />
                <FormControlLabel
                  value={PARTY_ID.OTHERS}
                  label={
                    <Typography sx={{ fontSize: "10px", fontWeight: "bold" }}>
                      OTHERS
                    </Typography>
                  }
                  labelPlacement="top"
                  control={<OthersRadio />}
                  checked={fillerValues.intrested_party == PARTY_ID.OTHERS}
                  onChange={() => {
                    handleChange(PARTY_ID.OTHERS);
                    setFilterValues({
                      ...fillerValues,
                      intrested_party: PARTY_ID.OTHERS,
                    });
                  }}
                />
              </Box>
            </Grid>
            <Grid item xs={12} md={12} lg={12}>
              <TextField
                size="small"
                label="Phone Number"
                fullWidth
                required
                value={fillerValues.phone_no}
                onChange={(e) => {
                  // console.log(e);
                  setFilterValues({
                    ...fillerValues,
                    phone_no: e.target.value,
                  });
                }}
              />
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
                      // console.log("e.target.value", e.target.value);
                      if (e.target.value == "isResidential") {
                        setFilterValues({
                          ...fillerValues,
                          residential: true,
                        });
                      } else {
                        setFilterValues({
                          ...fillerValues,
                          residential: false,
                        });
                      }
                    }}
                  >
                    <FormControlLabel
                      value="isResidential"
                      control={<Radio />}
                      label="Is Residential"
                    />
                    <FormControlLabel
                      value="non-residential"
                      control={<Radio />}
                      label="Non-Residential"
                    />
                  </RadioGroup>
                </FormControl>
              </FormGroup>
            </Grid>
            {!fillerValues.residential ? (
              <>
                <Grid item xs={12} md={12} lg={12}>
                  <TextField
                    size="small"
                    label="Current Address"
                    fullWidth
                    value={fillerValues.current_address}
                    onChange={(e) => {
                      setFilterValues({
                        ...fillerValues,
                        current_address: e.target.value,
                      });
                    }}
                  />
                </Grid>
                <Grid item xs={12} md={12} lg={12}>
                  <TextField
                    size="small"
                    label="Permanent Address"
                    fullWidth
                    value={fillerValues.permenent_address}
                    onChange={(e) => {
                      setFilterValues({
                        ...fillerValues,
                        permenent_address: e.target.value,
                      });
                    }}
                  />
                </Grid>
              </>
            ) : (
              <Grid item xs={12} md={12} lg={12}>
                <TextField
                  size="small"
                  label="Permanent Address"
                  fullWidth
                  value={fillerValues.permenent_address}
                  onChange={(e) => {
                    setFilterValues({
                      ...fillerValues,
                      permenent_address: e.target.value,
                    });
                  }}
                />
              </Grid>
            )}
            <Grid item xs={12} md={6} lg={6}>
              <TextField
                size="small"
                label="Religion"
                fullWidth
                select
                value={
                  fetchedReligionList.filter(
                    (item) => item.label == fillerValues.religion
                  )[0]?.label
                }
                onChange={(e) => {
                  const religion_id = fetchedReligionList.filter(
                    (item) => item.label == e.target.value
                  );
                  // console.log("religion_id", religion_id);
                  setFilterValues({
                    ...fillerValues,
                    religion: e.target.value,
                    religion_id: religion_id[0]?.value,
                  });
                }}
              >
                {fetchedReligionList.map((item, index) => (
                  <MenuItem key={index} value={item.label}>
                    {item.label}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>{" "}
            <Grid item xs={12} md={6} lg={6}>
              <TextField
                size="small"
                label="Caste"
                fullWidth
                select
                value={
                  fetchedCasteList.filter(
                    (item) => item.label == fillerValues.caste
                  )[0]?.label
                }
                onChange={(e) => {
                  const caste_id = fetchedCasteList.filter(
                    (item) => item.label == e.target.value
                  );
                  // console.log("caste_id", caste_id);

                  setFilterValues({
                    ...fillerValues,
                    caste: e.target.value,
                    caste_id: caste_id[0]?.value,
                  });
                }}
              >
                {fetchedCasteList.map((item, index) => (
                  <MenuItem key={index} value={item.label}>
                    {item.label}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={12} md={6} lg={6}>
              <FormLabel component="legend">Disability</FormLabel>
              <RadioGroup
                row
                onChange={(e) => {
                  setFilterValues({
                    ...fillerValues,
                    disability: e.target.value == "YES" ? true : false,
                  });
                }}
              >
                <FormControlLabel
                  value="YES"
                  control={<Radio />}
                  label="YES"
                  checked={fillerValues.disability}
                />

                <FormControlLabel
                  value="NO"
                  control={<Radio />}
                  label="NO"
                  checked={!fillerValues.disability}
                />
              </RadioGroup>
              {/* <TextField
                size="small"
                label="Disability (40% or above)"
                fullWidth
                select
              >
                <MenuItem value="YES">YES</MenuItem>
                <MenuItem value="NO">NO</MenuItem>
              </TextField> */}
            </Grid>
            <Grid item xs={12} md={6} lg={6}>
              <FormLabel component="legend">Govt Employee</FormLabel>
              <RadioGroup
                row
                onChange={(e) => {
                  setFilterValues({
                    ...fillerValues,
                    govt_employee: e.target.value == "YES" ? true : false,
                  });
                }}
              >
                <FormControlLabel value="YES" control={<Radio />} label="YES" />

                <FormControlLabel value="NO" control={<Radio />} label="NO" />
              </RadioGroup>
              {/* <TextField size="small" label="Govt Employee" fullWidth select>
                <MenuItem value="YES">YES</MenuItem>
                <MenuItem value="NO">NO</MenuItem>
              </TextField> */}
            </Grid>
          </Grid>
        </DialogContent>

        <DialogActions sx={{ p: 3 }}>
          <Button onClick={handleClose} variant="contained" color="error">
            Cancel
          </Button>

          <LoadingButton
            loading={isLoading}
            onClick={handleSubmit}
            variant="contained"
          >
            Submit
          </LoadingButton>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default UpdateVoterDialog;
