import { Grid, Container, Typography, Box, TextField, Card } from "@mui/material";
import Page from "../components/Page";
import { connect } from "react-redux";
import { LoadingButton } from "@mui/lab";

import ViewUsersList from "../sections/reports/ViewUsersList";
import Button from "@mui/material/Button";
import PartiesList from "../sections/reports/PartiesList";
import { createPartyRoute, getAllPartiesRoute } from "../utils/apis";
import { useEffect, useState } from "react";
import instance from "../utils/axios";
import { showAlert } from "../actions/alert";

const PartiesPage = ({ dashboard, showAlert }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [fetchedData, setFetchedData] = useState({
    parties: [{}],
  });

  const [selectedValues, setSelectedValues] = useState({
    lookup_name: "party_list",
    lookup_valuename: "",
    lookup_sequence: 0,
  });
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await instance.post(getAllPartiesRoute);
        console.log(response.data.message);
        setFetchedData({
          parties: response.data.message,
        });
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [refresh]);

  const handleSubmit = async () => {
    setIsLoading(true);
    try {
      const response = await instance.post(createPartyRoute, {
        lookup_sequence: selectedValues.lookup_sequence,
        lookup_name: selectedValues.lookup_name,
        lookup_valuename: selectedValues.lookup_valuename,
      });
      console.log(response.data.message);
      showAlert({ text: "Party Added", color: "success" });
      setSelectedValues({
        ...selectedValues,
        lookup_valuename: "",
        lookup_sequence: "",
      });

      setIsLoading(false);
      setRefresh((prev) => !prev);
    } catch (error) {
      console.log(error);
      showAlert({ text: "Party Not Added", color: "error" });
      setIsLoading(false);
      setRefresh((prev) => !prev);
    }
  };

  console.log(fetchedData);
  return (
    <Page title="Political Parties">
      <Container maxWidth="xl">
        {/* <Typography variant="h4" sx={{ mb: 1 }}>
          Parties
        </Typography> */}

        <Card sx={{ p: 3 }}>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} md={6} lg={9}>
              <PartiesList partiesList={fetchedData.parties} setRefresh={setRefresh} />
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
                type="number"
                label="Sequence Number"
                fullWidth
                value={selectedValues.lookup_sequence}
                onChange={(e) => {
                  setSelectedValues({
                    ...selectedValues,
                    lookup_sequence: e.target.value,
                  });
                }}
              />{" "}
              <TextField
                size="small"
                label="Party Name"
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

export default connect(mapStateToProps, { showAlert })(PartiesPage);
