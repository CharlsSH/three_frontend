// MUI Imports
import Grid from "@mui/material/Grid";

// Components Imports
import CongratulationsJohn from "@/views/dashboards/sales/CongratulationsJohn";
import CongratulationsJenny from "@/views/dashboards/sales/CongratulationsJenny";
import LineChartProfit from "@/views/dashboards/sales/LineChartProfit";
import RadialBarChart from "@/views/dashboards/sales/RadialBarChart";
import RevenueReport from "@/views/dashboards/sales/RevenueReport";
import PopularProducts from "@/views/dashboards/sales/PopularProducts";
import Orders from "@/views/dashboards/sales/Orders";
import Transactions from "@/views/dashboards/sales/Transactions";

// Server Action Imports
import { getServerMode } from "@core/utils/serverHelpers";

const DashboardSales = async () => {
  // Vars
  const serverMode = getServerMode();

  return (
    <Grid container spacing={6}>
      <Grid item xs={12} xl={12}>
        <RevenueReport serverMode={serverMode} />
      </Grid>
      <Grid item xs={4} xl={4}>
        <CongratulationsJohn />
      </Grid>
      <Grid item xs={4} xl={4}>
        <Grid container spacing={6}>
          <Grid item xs={6} sm={6} md={6} xl={6}>
            <LineChartProfit serverMode={serverMode} />
          </Grid>
          <Grid item xs={6} sm={6} md={6} xl={6}>
            <RadialBarChart serverMode={serverMode} />
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={4} md={4}>
        <CongratulationsJenny />
      </Grid>
      <Grid item xs={12} sm={6} lg={4}>
        <PopularProducts />
      </Grid>
      <Grid item xs={12} sm={6} lg={4}>
        <Orders />
      </Grid>
      <Grid item xs={12} sm={6} lg={4}>
        <Transactions />
      </Grid>
    </Grid>
  );
};

export default DashboardSales;
