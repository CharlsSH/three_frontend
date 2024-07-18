// MUI Imports
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import LinearProgress from '@mui/material/LinearProgress'

// Components Imports
import OptionMenu from '@core/components/option-menu'

// Vars
const data = [
  {
    title: 'SAMPLE consultant service opportunity',
    subtitle: 'client:  HanKunIndustryCo.Ltd',
    progressColor: 'error',
    imgSrc: '/images/logos/laravel.png'
  },
  {
    title: 'SAMPLE custom equipment',
    subtitle: 'Client:  SAMPLEmfgcompany',
    progressColor: 'primary',
    imgSrc: '/images/logos/figma.png'
  },
  {
    title: 'SAMPLE equipment opportunity',
    subtitle: 'Client:  Asiatradingcompany',
    progressColor: 'success',
    imgSrc: '/images/logos/vue.png'
  },
  {
    title: 'SAMPLE software opportunity',
    subtitle: 'Client:  SAMPLEinternationaltradingcompany',
    progressColor: 'info',
    imgSrc: '/images/logos/react.png'
  }
]

const ActiveProjects = () => {
  return (
    <Card>
      <CardHeader
        title='My Opportunities'
        subheader=''
        action={<OptionMenu options={['Refresh', 'Update', 'Share']} />}
      />
      <CardContent className='flex flex-col gap-4'>
        {data.map((item, index) => (
          <div key={index} className='flex items-center gap-4'>
            <img src={item.imgSrc} alt={item.title} width={32} />
            <div className='flex flex-wrap justify-between items-center gap-x-4 gap-y-1 is-full'>
              <div className='flex flex-col'>
                <Typography className='font-medium' color='text.primary'>
                  {item.title}
                </Typography>
                <Typography variant='body2'>{item.subtitle}</Typography>
              </div>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}

export default ActiveProjects
