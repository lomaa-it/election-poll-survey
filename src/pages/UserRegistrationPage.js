import {
  Grid,
  Container,
  Typography,
  Box,
  TextField,
  Card,
  FormControlLabel,
  MenuItem,
} from "@mui/material";
import Page from "../components/Page";
import { connect } from "react-redux";
import { LoadingButton } from "@mui/lab";

import { CheckBox } from "@mui/icons-material";
import {
  getAllDesignationsRoute,
  getAllStatesRoute,
  getAllDistrictsRoute,
  getAllConstituenciesRoute,
  getAllMandalRoute,
  getAllDivisionRoute,
  getAllSachivalayamRoute,
  getAllPartsRoute,
  getAllVillageRoute,
  createUsersRoute,
} from "../utils/apis";
import { useEffect, useState } from "react";
import instance from "../utils/axios";
import { set } from "date-fns";
import { showAlert } from "../actions/alert";

const UserRegistrationPage = ({ dashboard }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [fetchAssignAuthority, setFetchAssignAuthority] = useState({
    designation: [{}],
    state: [{}],
    district: [{}],
    constituency: [{}],
    mandal: [{}],
    division: [{}],
    sachivalayam: [{}],
    part: [{}],
    village: [{}],
    reporting_manager: [{}],
  });

  const [basicInfo, setBasicInfo] = useState({
    user_displayname: "",
    username: "",
    password: "",
    phone_no: "",
    office_phone_no: "",
    age: "",
    email: "",
  });

  const [filterValues, setFilterValues] = useState({
    designation_id: "",
    state_id: "",
    district_id: "",
    consistency_id: "",
    mandal_id: "",
    division_id: "",
    sachivalayam_id: "",
    part_no: "",
    village_id: "",
    reporting_manager: null,
  });

  useEffect(() => {
    const fetchAssignAuthorityData = async () => {
      ////// Designation
      const designationResponse = await instance.get(getAllDesignationsRoute);
      const designationResponseData = designationResponse.data.message;
      // console.log("designationResponseData", designationResponseData);

      //// States
      const statesResponse = await instance.get(getAllStatesRoute);
      const statesResponseData = statesResponse.data.message;
      // console.log("statesResponseData", statesResponseData);

      //// Districts
      const districtsResponse = await instance.get(getAllDistrictsRoute);
      const districtsResponseData = districtsResponse.data.message;
      // console.log("districtsResponseData", districtsResponseData);

      /// Constituencies
      const constituenciesResponse = await instance.get(
        getAllConstituenciesRoute
      );
      const constituenciesResponseData = constituenciesResponse.data.message;
      // console.log("constituenciesResponseData", constituenciesResponseData);

      // Mandals
      const mandalsResponse = await instance.get(getAllMandalRoute);
      const mandalsResponseData = mandalsResponse.data.message;
      // console.log("mandalsResponseData", mandalsResponseData);

      // Divisions
      const divisionsResponse = await instance.get(getAllDivisionRoute);
      const divisionsResponseData = divisionsResponse.data.message;
      // console.log("divisionsResponseData", divisionsResponseData);

      // Sachivalayam
      const sachivalayamResponse = await instance.get(getAllSachivalayamRoute);
      const sachivalayamResponseData = sachivalayamResponse.data.message;
      // console.log("sachivalayamResponseData", sachivalayamResponseData);

      // Parts
      const partsResponse = await instance.get(getAllPartsRoute);
      const partsResponseData = partsResponse.data.message;
      // console.log("partsResponseData", partsResponseData);

      // Village
      const villageResponse = await instance.get(getAllVillageRoute);
      const villageResponseData = villageResponse.data.message;
      // console.log("villageResponseData", villageResponseData);

      /// state updating
      setFetchAssignAuthority({
        ...fetchAssignAuthority,
        designation: designationResponseData,
        state: statesResponseData,
        district: districtsResponseData,
        constituency: constituenciesResponseData,
        mandal: mandalsResponseData,
        division: divisionsResponseData,
        sachivalayam: sachivalayamResponseData,
        part: partsResponseData,
        village: villageResponseData,
      });
    };
    fetchAssignAuthorityData();
  }, []);
  // console.log("basicInfo", basicInfo);

  const handleSubmit = () => {
    setIsLoading(true);
    const requestBody = {
      ...basicInfo,
      ...filterValues,
    };
    console.log("requestBody", requestBody);

    const response = instance.post(createUsersRoute, requestBody);
    console.log("response", response.data.message);
    showAlert("success", response.data.message);
  

    setBasicInfo({
      user_displayname: "",
      username: "",
      password: "",
      phone_no: "",
      office_phone_no: "",
      age: "",
      email: "",
    });

    setFilterValues({
      designation_id: "",
      state_id: "",
      district_id: "",
      consistency_id: "",
      mandal_id: "",
      division_id: "",
      sachivalayam_id: "",
      part_no: "",
      village_id: "",
      reporting_manager: null,
    });

    setIsLoading(false);
  };

  return (
    <Page title="User Registration - New">
      <Container maxWidth="xl">
        <Typography variant="h4" sx={{ mb: 1 }}>
          User Registration
        </Typography>

        <Card sx={{ p: 3 }}>
          <Typography sx={{ pb: 2 }}>Basic Info</Typography>

          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} md={6} lg={3}>
              <TextField
                size="small"
                label="User Display Name*"
                fullWidth
                value={basicInfo.user_displayname}
                onChange={(e) => {
                  setBasicInfo({
                    ...basicInfo,
                    user_displayname: e.target.value,
                  });
                }}
                required
              />
            </Grid>

            <Grid item xs={12} md={6} lg={3}>
              <TextField
                size="small"
                label="User Name"
                fullWidth
                value={basicInfo.username}
                onChange={(e) => {
                  setBasicInfo({
                    ...basicInfo,
                    username: e.target.value,
                  });
                }}
                required
              />
            </Grid>

            <Grid item xs={12} md={6} lg={3}>
              <TextField
                size="small"
                label="Password"
                fullWidth
                value={basicInfo.password}
                onChange={(e) => {
                  setBasicInfo({
                    ...basicInfo,
                    password: e.target.value,
                  });
                }}
                required
              />
            </Grid>

            <Grid item xs={12} md={6} lg={3}>
              <TextField
                size="small"
                label="Phone Number"
                fullWidth
                value={basicInfo.phone_no}
                onChange={(e) => {
                  setBasicInfo({
                    ...basicInfo,
                    phone_no: e.target.value,
                  });
                }}
                required
              />
            </Grid>

            <Grid item xs={12} md={6} lg={3}>
              <TextField
                size="small"
                label="Office Phone Number"
                fullWidth
                value={basicInfo.office_phone_no}
                onChange={(e) => {
                  setBasicInfo({
                    ...basicInfo,
                    office_phone_no: e.target.value,
                  });
                }}
              />
            </Grid>

            <Grid item xs={12} md={6} lg={3}>
              <TextField
                size="small"
                label="Age"
                fullWidth
                value={basicInfo.age}
                onChange={(e) => {
                  setBasicInfo({
                    ...basicInfo,
                    age: e.target.value,
                  });
                }}
                required
              />
            </Grid>

            <Grid item xs={12} md={6} lg={3}>
              <TextField
                type="email"
                size="small"
                label="Email"
                fullWidth
                value={basicInfo.email}
                onChange={(e) => {
                  setBasicInfo({
                    ...basicInfo,
                    email: e.target.value,
                  });
                }}
              />
            </Grid>
          </Grid>
        </Card>

        <Card sx={{ p: 3, mt: 1 }}>
          <Typography sx={{ pb: 2 }}>Assign Authority</Typography>

          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} md={6} lg={3}>
              <TextField
                size="small"
                label="Select Designation*"
                fullWidth
                select
              >
                {fetchAssignAuthority.designation.map((designation) => (
                  <MenuItem
                    key={designation.lookup_pk}
                    value={filterValues.designation_id}
                    onClick={() => {
                      setFilterValues({
                        ...filterValues,
                        designation_id: designation.lookup_pk,
                      });
                    }}
                  >
                    {designation.designation_name}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>

            <Grid item xs={12} md={6} lg={3}>
              <TextField size="small" label="Select State*" fullWidth select>
                {fetchAssignAuthority.state.map((state) => (
                  <MenuItem
                    key={state.state_pk}
                    value={filterValues.state_id}
                    onClick={() => {
                      setFilterValues({
                        ...filterValues,
                        state_id: state.state_pk,
                        district_id: "",
                        consistency_id: "",
                        mandal_id: "",
                        division_id: "",
                        sachivalayam_id: "",
                        part_no: "",
                        village_id: "",
                        reporting_manager: "",
                      });
                    }}
                  >
                    {state.state_name}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={12} md={6} lg={3}>
              <TextField size="small" label="Select District*" fullWidth select>
                {/*filter districts by state_id  */}
                {fetchAssignAuthority.district
                  .filter((district) => {
                    return district.state_id === filterValues.state_id;
                  })
                  .map((district) => (
                    <MenuItem
                      key={district.district_pk}
                      value={filterValues.district_id}
                      onClick={() => {
                        setFilterValues({
                          ...filterValues,
                          district_id: district.district_pk,
                          consistency_id: "",
                          mandal_id: "",
                          division_id: "",
                          sachivalayam_id: "",
                          part_no: "",
                          village_id: "",
                          reporting_manager: "",
                        });
                      }}
                    >
                      {district.district_name}
                    </MenuItem>
                  ))}
              </TextField>
            </Grid>

            <Grid item xs={12} md={6} lg={3}>
              <TextField
                size="small"
                label="Select Constistency*"
                fullWidth
                select
              >
                {/*filter constituencies by district_id  */}
                {fetchAssignAuthority.constituency
                  .filter((constituency) => {
                    return (
                      constituency.district_pk === filterValues.district_id
                    );
                  })
                  .map((constituency) => (
                    <MenuItem
                      key={constituency.consistency_pk}
                      value={filterValues.consistency_id}
                      onClick={() => {
                        setFilterValues({
                          ...filterValues,
                          consistency_id: constituency.consistency_pk,
                          mandal_id: "",
                          division_id: "",
                          sachivalayam_id: "",
                          part_no: "",
                          village_id: "",
                          reporting_manager: "",
                        });
                      }}
                    >
                      {constituency.consistency_name}
                    </MenuItem>
                  ))}
              </TextField>
            </Grid>

            <Grid item xs={12} md={6} lg={3}>
              <TextField size="small" label="Select Mandal*" fullWidth select>
                {/*filter mandals by consistency_id  */}

                {fetchAssignAuthority.mandal
                  .filter((mandal) => {
                    return (
                      mandal.consistency_id === filterValues.consistency_id
                    );
                  })
                  .map((mandal) => (
                    <MenuItem
                      key={mandal.mandal_pk}
                      value={filterValues.mandal_id}
                      onClick={() => {
                        setFilterValues({
                          ...filterValues,
                          mandal_id: mandal.mandal_pk,
                          division_id: "",
                          sachivalayam_id: "",
                          part_no: "",
                          village_id: "",
                          reporting_manager: "",
                        });
                      }}
                    >
                      {mandal.mandal_name}
                    </MenuItem>
                  ))}
              </TextField>
            </Grid>

            <Grid item xs={12} md={6} lg={3}>
              <TextField size="small" label="Select Division*" fullWidth select>
                {/*filter divisions by mandal_id  */}
                {fetchAssignAuthority.division
                  .filter((division) => {
                    return division.mandal_id === filterValues.mandal_id;
                  })
                  .map((division) => (
                    <MenuItem
                      key={division.division_pk}
                      value={filterValues.division_id}
                      onClick={() => {
                        setFilterValues({
                          ...filterValues,
                          division_id: division.division_pk,
                          sachivalayam_id: "",
                          part_no: "",
                          village_id: "",
                          reporting_manager: "",
                        });
                      }}
                    >
                      {division.division_name}
                    </MenuItem>
                  ))}
              </TextField>
            </Grid>

            <Grid item xs={12} md={6} lg={3}>
              <TextField
                size="small"
                label="Select Sachivalayam*"
                fullWidth
                select
              >
                {/*filter sachivalayam by division_id  */}
                {fetchAssignAuthority.sachivalayam
                  .filter((sachivalayam) => {
                    return (
                      sachivalayam.division_id === filterValues.division_id
                    );
                  })
                  .map((sachivalayam) => (
                    <MenuItem
                      key={sachivalayam.sachivalayam_pk}
                      value={sachivalayam.sachivalayam_pk}
                      onClick={() => {
                        setFilterValues({
                          ...filterValues,
                          sachivalayam_id: sachivalayam.sachivalayam_pk,
                          part_no: "",
                          village_id: "",
                          reporting_manager: "",
                        });
                      }}
                    >
                      {sachivalayam.sachivalayam_name}
                    </MenuItem>
                  ))}
              </TextField>
            </Grid>

            <Grid item xs={12} md={6} lg={3}>
              <TextField size="small" label="Part No*" fullWidth select>
                {/*filter parts by sachivalayam_id  */}
                {fetchAssignAuthority.part
                  .filter((part) => {
                    return (
                      part.sachivalayam_id === filterValues.sachivalayam_id
                    );
                  })
                  .map((part) => (
                    <MenuItem
                      key={part.part_no}
                      value={filterValues.part_no}
                      onClick={() => {
                        setFilterValues({
                          ...filterValues,
                          part_no: part.part_no,
                          village_id: "",
                          reporting_manager: "",
                        });
                      }}
                    >
                      {part.part_no}
                    </MenuItem>
                  ))}
              </TextField>
            </Grid>

            <Grid item xs={12} md={6} lg={3}>
              <TextField size="small" label="Select Village*" fullWidth select>
                {/*filter village by part_no  */}
                {fetchAssignAuthority.village
                  .filter((village) => {
                    return village.part_no === filterValues.part_no;
                  })
                  .map((village) => (
                    <MenuItem
                      key={village.village_pk}
                      value={filterValues.village_id}
                      onClick={() => {
                        setFilterValues({
                          ...filterValues,
                          village_id: village.village_pk,
                          reporting_manager: "",
                        });
                      }}
                    >
                      {village.village_name}
                    </MenuItem>
                  ))}
              </TextField>
            </Grid>

            <Grid item xs={12} md={6} lg={3}>
              <TextField
                size="small"
                label="Reporting Manager"
                fullWidth
                select
              />
            </Grid>

            <Grid item xs={12} md={6} lg={3}>
              <LoadingButton variant="contained">Search</LoadingButton>
            </Grid>
          </Grid>
        </Card>

        <Card sx={{ p: 3, mt: 1 }}>
          <Typography sx={{ pb: 2 }}>Assign Authority</Typography>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} md={6} lg={2}>
              <FormControlLabel control={<CheckBox />} label="View" />
            </Grid>
            <Grid item xs={12} md={6} lg={2}>
              <FormControlLabel control={<CheckBox />} label="Add" />
            </Grid>
            <Grid item xs={12} md={6} lg={2}>
              <FormControlLabel control={<CheckBox />} label="Update" />
            </Grid>
            <Grid item xs={12} md={6} lg={2}>
              <FormControlLabel control={<CheckBox />} label="Delete" />
            </Grid>

            <Grid
              item
              xs={12}
              md={6}
              lg={2}
              sx={{
                marginLeft: "auto",
              }}
            >
              <LoadingButton
                loading={isLoading}
                onClick={handleSubmit}
                variant="contained"
                sx={{
                  padding: "15px 40px",
                }}
              >
                Submit
              </LoadingButton>
            </Grid>
          </Grid>
        </Card>

        <Box p={1} />
      </Container>
    </Page>
  );
};

const mapStateToProps = (state) => {
  return {
    dashboard: state.dashboard,
  };
};

export default connect(mapStateToProps, null)(UserRegistrationPage);
