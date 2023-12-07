import {
  Grid,
  Container,
  Typography,
  Box,
  TextField,
  Card,
} from "@mui/material";
import Page from "../components/Page";
import { connect } from "react-redux";
import { LoadingButton } from "@mui/lab";

import ViewUsersList from "../sections/reports/ViewUsersList";
import Button from "@mui/material/Button";
import DesignationList from "../sections/reports/DesignationList";
import { useEffect, useState } from "react";
import {
  getAllDesignationsRoute,
  createDesignationsRoute,
} from "../utils/apis";
import instance from "../utils/axios";
import { set } from "date-fns";

const DesignationPage = ({ dashboard }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [refresh, setRefresh] = useState(false);

  const [fetchedData, setFetchedData] = useState({
    designation: [{}],
  });

  const [selectedValues, setSelectedValues] = useState({
    lookup_name: "designationlist",
    lookup_valuename: "",
  });

  useEffect(() => {
    const fetchDesignations = async () => {
      try {
        const response = await instance.post(getAllDesignationsRoute);
        console.log(response.data.message);
        setFetchedData({
          designation: response.data.message,
        });
      } catch (error) {
        console.log(error);
      }
    };
    fetchDesignations();
  }, [refresh]);

  const handleSubmit = async () => {
    setIsLoading(true);
    try {
      const response = await instance.post(createDesignationsRoute, {
        lookup_name: selectedValues.lookup_name,
        lookup_valuename: selectedValues.lookup_valuename,
      });
      console.log(response.data.message);
      setSelectedValues({
        ...selectedValues,
        lookup_valuename: "",
      });

      setIsLoading(false);
      setRefresh((prev) => !prev);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
      setRefresh((prev) => !prev);
    }
  };

  return (
    <Page title="View User">
      <Container maxWidth="xl">
        <Typography variant="h4" sx={{ mb: 1 }}>
          Designations
        </Typography>

        <Card sx={{ p: 3 }}>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} md={6} lg={9}>
              <DesignationList
                designationlist={fetchedData.designation}
                setRefresh={setRefresh}
              />
            </Grid>
            <Grid
              item
              xs={12}
              md={6}
              lg={3}
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: "15px",
              }}
            >
              <TextField
                size="small"
                label="Designation Name"
                fullWidth
                value={selectedValues.lookup_valuename}
                onChange={(e) => {
                  setSelectedValues({
                    ...selectedValues,
                    lookup_valuename: e.target.value,
                  });
                }}
              />
              <LoadingButton
                loading={isLoading}
                onClick={handleSubmit}
                variant="contained"
                sx={{
                  padding: "15px",
                }}
              >
                Add
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

export default connect(mapStateToProps, null)(DesignationPage);
