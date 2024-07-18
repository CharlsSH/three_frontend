// MUI Imports
import Grid from "@mui/material/Grid";

// Components Imports
import WebsiteAnalyticsSlider from "@/views/dashboards/orders/WebsiteAnalyticsSlider";
import LineAreaDailySalesChart from "@/views/dashboards/orders/LineAreaDailySalesChart";
import SalesOverview from "@/views/dashboards/orders/SalesOverview";
import EarningReports from "@/views/dashboards/orders/EarningReports";
import SupportTracker from "@/views/dashboards/orders/SupportTracker";
import TotalEarning from "@/views/dashboards/orders/TotalEarning";
import MonthlyCampaignState from "@/views/dashboards/orders/MonthlyCampaignState";
import SourceVisits from "@/views/dashboards/orders/SourceVisits";

// Server Action Imports
import { getServerMode } from "@core/utils/serverHelpers";

const DashboardAnalytics = async () => {
  // Vars
  const serverMode = getServerMode();

  return (
    <Grid container spacing={6}>
      <Grid item xs={12} lg={12}>
        <WebsiteAnalyticsSlider />
      </Grid>
      <Grid item xs={4} sm={4} lg={4}>
        <LineAreaDailySalesChart />
      </Grid>
      <Grid item xs={4} sm={4} lg={4}>
      </Grid>
      <Grid item xs={4} sm={4} lg={4}>
        <SalesOverview />
      </Grid>
      <Grid item xs={12} md={12}>
        <Grid container spacing={6}>
          <Grid item xs={12} md={6}>
            <EarningReports serverMode={serverMode} />
          </Grid>
          <Grid item xs={12} md={6}>
            <SupportTracker serverMode={serverMode} />
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12} md={6} lg={4}>
        <TotalEarning serverMode={serverMode} />
      </Grid>
      <Grid item xs={12} md={6} lg={4}>
        <SourceVisits />
      </Grid>
      <Grid item xs={12} md={6} lg={4}>
        <MonthlyCampaignState />
      </Grid>
    </Grid>
  );
};

export default DashboardAnalytics;
