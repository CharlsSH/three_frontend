// MUI Imports
import Grid from '@mui/material/Grid'

// Component Imports
import CurrentPlan from './CurrentPlan'
import PaymentMethod from './PaymentMethod'
import BillingAddress from './BillingAddress'

const BillingPlans = ({ data }) => {
  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <CurrentPlan data={data} />
      </Grid>
      <Grid item xs={12}>
        <PaymentMethod />
      </Grid>
      <Grid item xs={12}>
        <BillingAddress />
      </Grid>
    </Grid>
  )
}

export default BillingPlans
