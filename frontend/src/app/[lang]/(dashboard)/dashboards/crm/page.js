// MUI Imports
import Grid from "@mui/material/Grid";

// Component Imports
import CustomerProfit from "@/views/dashboards/crm/CustomerProfit";
import LeadGeneration from "@/views/dashboards/crm/LeadGeneration";
import SalesOperations from "@/views/dashboards/crm/SalesOperations";
import EarningReportsWithTabs from "@/views/dashboards/crm/EarningReportsWithTabs";
import SalesChart from "@/views/dashboards/crm/SalesChart";
import NewCustomerProfit from "@/views/dashboards/crm/NewCustomerProfit";
import RecurringProfit from "@/views/dashboards/crm/RecurringProfit";
import ProjectStatus from "@/views/dashboards/crm/ProjectStatus";
import ActiveProjects from "@/views/dashboards/crm/ActiveProjects";
import LastTransaction from "@/views/dashboards/crm/LastTransaction";
import ActivityTimeline from "@/views/dashboards/crm/ActivityTimeline";

// Server Action Imports
import { getServerMode } from "@core/utils/serverHelpers";

const DashboardCRM = () => {
  // Vars
  const serverMode = getServerMode();

  return (
    <Grid container spacing={6}>
      <Grid item xs={12} sm={6} md={3} lg={3}>
        <Grid item>
          <CustomerProfit />
        </Grid>
        <Grid item className="mt-4">
          <NewCustomerProfit />
        </Grid>
        <Grid item className="mt-4">
          <RecurringProfit />
        </Grid>
      </Grid>
      <Grid item xs={12} sm={6} md={5} lg={5}>
        <Grid item>
          <LeadGeneration />
        </Grid>
        <Grid item className="mt-4">
          <EarningReportsWithTabs />
        </Grid>
        <Grid item className="mt-4">
          <ProjectStatus />
        </Grid>
        <Grid item className="mt-4">
          <SalesChart serverMode={serverMode} />
        </Grid>
      </Grid>
      <Grid item xs={12} sm={6} md={4} lg={4}>
        <Grid item>
          <SalesOperations />
        </Grid>
        <Grid item className="mt-4">
          <ActivityTimeline />
        </Grid>
        <Grid item className="mt-4">
          <ActiveProjects />
        </Grid>
        <Grid item className="mt-4">
          <LastTransaction />
        </Grid>
      </Grid>
    </Grid>
  );
};

export default DashboardCRM;
