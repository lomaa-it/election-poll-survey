import React from "react";
import Page from "../components/Page";
import { Box, Container, Typography } from "@mui/material";
import AccessMangementList from "../sections/reports/AccessMangementList";
import { LoadingButton } from "@mui/lab";
const AccessManagementPage = () => {
  return (
    <Page title="Assign Authority">
      <Container maxWidth="xl">
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography variant="h4" sx={{ mb: 1 }}>
            Assign Authority
          </Typography>
          <LoadingButton variant="contained">Save</LoadingButton>
        </Box>

        <AccessMangementList />
      </Container>
    </Page>
  );
};

export default AccessManagementPage;
