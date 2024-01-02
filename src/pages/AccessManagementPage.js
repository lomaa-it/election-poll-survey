import React from "react";
import Page from "../components/Page";
import { Box, Container, Typography } from "@mui/material";
import AccessMangementList from "../sections/reports/AccessMangementList";

const AccessManagementPage = () => {
  return (
    <Page title="Voter Registration">
      <Container maxWidth="xl">
        <Typography variant="h4" sx={{ mb: 1 }}>
          Add Poll Survey
        </Typography>

        <Box p={1} />

        <AccessMangementList />
      </Container>
    </Page>
  );
};

export default AccessManagementPage;
