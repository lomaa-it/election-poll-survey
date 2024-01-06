import React from "react";
import Page from "../components/Page";
import { Box, Container, Typography } from "@mui/material";
import AccessMangementList from "../sections/reports/AccessMangementList";
import { LoadingButton } from "@mui/lab";
const AccessManagementPage = () => {
  return (
    <Page title="Assign Authority">
      <Container maxWidth="xl">
        <AccessMangementList />
      </Container>
    </Page>
  );
};

export default AccessManagementPage;
