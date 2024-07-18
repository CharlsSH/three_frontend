// MUI Imports
import Grid from '@mui/material/Grid'

// Component Imports
import ProjectListTable from './ProjectListTable'
import UserActivityTimeLine from './UserActivityTimeline'
import InvoiceListTable from './InvoiceListTable'
import axios from 'axios';
import https from 'https';

const axiosInstance = axios.create({
  baseURL: `${process.env.API_URL}`,
  httpsAgent: new https.Agent({
    rejectUnauthorized: false, // Désactiver la vérification du certificat auto-signé
  }),
});


const getUserData = async () => {
  try {
    const response = await axiosInstance.get('/Users/GetUsers');
    return response.data;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
};

const OverViewTab = async () => {
  // Vars
  const invoiceData = await getUserData()

  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <ProjectListTable />
      </Grid>
      <Grid item xs={12}>
        <UserActivityTimeLine />
      </Grid>
      <Grid item xs={12}>
        <InvoiceListTable invoiceData={invoiceData} />
      </Grid>
    </Grid>
  )
}

export default OverViewTab
