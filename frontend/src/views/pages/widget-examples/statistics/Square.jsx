// MUI Imports
import Grid from '@mui/material/Grid'

// Component Imports
import CardStatsSquare from '@components/card-statistics/CardStatsSquare'

const Square = ({ data }) => {
  if (data) {
    return (
      <Grid container spacing={6}>
        {data.map((item, index) => (
          <Grid item xs={6} key={index}>
            <CardStatsSquare {...item} />
          </Grid>
        ))}
      </Grid>
    )
  }
}

export default Square
