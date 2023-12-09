import { Box, Container, Typography, Breadcrumbs, Link } from "@mui/material";
import Page from "../components/Page";
import Iconify from "../components/Iconify";
import SurveyReportsList from "../sections/reports/SurveyReportsList";

export default function SurveyReportsPage() {
  return (
    <Page title="Opinion Survey Reports">
      <Container maxWidth="xl">
        <Box mb={1}>
          {/* <Typography variant="h4" gutterBottom>
            Opinion Survey Reports
          </Typography> */}
        </Box>

        <SurveyReportsList />
      </Container>
    </Page>
  );
}
