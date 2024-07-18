// React Imports
import https from 'https';

import { useState } from 'react'

import { useRouter, useSearchParams, useParams } from 'next/navigation'

import CryptoJS from 'crypto-js';

import Cookies from 'js-cookie';

// MUI Imports
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import { styled } from '@mui/material/styles'

// Component Imports
import axios from 'axios';

import CustomInputVertical from '@core/components/custom-inputs/Vertical'
import CustomTextField from '@core/components/mui/TextField'
import DirectionalIcon from '@components/DirectionalIcon'

import { getLocalizedUrl } from '@/utils/i18n'



const secretKey = `${process.env.AUTH_SECRET_CODE}`;

// Styled Components
const Content = styled(Typography, {
  name: 'MuiCustomInputVertical',
  slot: 'content'
})(({ theme }) => ({
  ...theme.typography.body2,
  textAlign: 'center'
}))

// Vars
const customInputData = [
  {
    title: 'Basic',
    value: 'basic',
    content: (
      <Content component='div' className='flex flex-col justify-center items-center bs-full gap-2'>
        <Typography>A simple start for start ups & Students</Typography>
        <div className='flex items-baseline'>
          <Typography component='sup' className='self-start' color='primary'>
            $
          </Typography>
          <Typography component='span' variant='h3' color='primary'>
            0
          </Typography>
          <Typography component='sub' className='self-baseline text-textDisabled'>
            /month
          </Typography>
        </div>
      </Content>
    )
  },
  {
    title: 'Standard',
    value: 'standard',
    content: (
      <Content component='div' className='flex flex-col justify-center items-center bs-full gap-2'>
        <Typography>For small to medium businesses</Typography>
        <div className='flex items-baseline'>
          <Typography component='sup' className='self-start' color='primary'>
            $
          </Typography>
          <Typography component='span' variant='h3' color='primary'>
            99
          </Typography>
          <Typography component='sub' className='self-baseline text-textDisabled'>
            /month
          </Typography>
        </div>
      </Content>
    ),
    isSelected: true
  },
  {
    title: 'Enterprise',
    value: 'enterprise',
    content: (
      <Content component='div' className='flex flex-col justify-center items-center bs-full gap-2'>
        <Typography>Solution for enterprise & organizations</Typography>
        <div className='flex items-baseline'>
          <Typography component='sup' className='self-start' color='primary'>
            $
          </Typography>
          <Typography component='span' variant='h3' color='primary'>
            499
          </Typography>
          <Typography component='sub' className='self-baseline text-textDisabled'>
            /month
          </Typography>
        </div>
      </Content>
    )
  }
]

const StepBillingDetails = ({ handlePrev, formData, setFormData }) => {
  const initialSelectedOption = customInputData.filter(item => item.isSelected)[
    customInputData.filter(item => item.isSelected).length - 1
  ].value

  // States
  const [selectedOption, setSelectedOption] = useState(initialSelectedOption);

  const [error, setError] = useState(null);

  const router = useRouter()
  const searchParams = useSearchParams()
  const params = useParams();
  const locale = params.lang // Assuming `lang` is the parameter in the URL


  const handleOptionChange = prop => {
    if (typeof prop === 'string') {
      setSelectedOption(prop)
    } else {
      setSelectedOption(prop.target.value)
    }
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target

    setFormData({
      ...formData,
      [name]: value
    })
  }


  const handleSubmitSubscription = async (e) => {
    e.preventDefault();

    try {
      const axiosInstance = axios.create({
        baseURL: process.env.NEXT_PUBLIC_API_URL,
        httpsAgent: new https.Agent({
          rejectUnauthorized: false, // Désactiver la vérification du certificat auto-signé
        })
      });

      const response = await axiosInstance.post('/Users/RegisterUser', {
        ...formData
      });

      if (response.status === 200 || response.status === 201) {

        // Chiffrer les données utilisateur
        const encryptedUser = CryptoJS.AES.encrypt(JSON.stringify(response.data), secretKey).toString();

        // Stocker les données chiffrées dans un cookie
        Cookies.set('provideData', encryptedUser, { expires: 2 }); // Le cookie expirera dans 2 jours

        const redirectURL = searchParams.get('redirectTo') ?? '/pages/auth/two-steps-v1'

        router.push(getLocalizedUrl(redirectURL, locale));
      } else {
        setError(response.data);
      }
    } catch (error) {
      setError('Login failed, please try again')
    }
  }

  return (
    <>
      {/* <div className='mbe-5'>
        <Typography variant='h4'>Select Plan</Typography>
        <Typography>Select plan as per your requirement</Typography>
      </div>
      <Grid container spacing={5}>
        {customInputData.map((item, index) => (
          <CustomInputVertical
            type='radio'
            key={index}
            data={item}
            gridProps={{ xs: 12, sm: 4 }}
            selected={selectedOption}
            name='custom-radios-basic'
            handleChange={handleOptionChange}
          />
        ))}
      </Grid> */}


      <div className='mbs-6 md:mbs-12 mbe-6'>
        <Typography variant='h4'>Company's s Information</Typography>
        <Typography>Enter your Company information</Typography>
      </div>
      <Grid container spacing={6}>
        <Grid item xs={12}>
          <CustomTextField fullWidth name='Licence' label='Licence' onChange={handleInputChange} placeholder='1356 3215 6548 7898' />
        </Grid>
        <Grid item xs={12} sm={6}>
          <CustomTextField fullWidth name='CompanyName' onChange={handleInputChange} label='Company name' placeholder='Company name' />
        </Grid>
        <Grid item xs={12} sm={6}>
          <CustomTextField fullWidth name='ExpiryDate' onChange={handleInputChange} label='Expiry Date' placeholder='MM/YY' />
        </Grid>
        <Grid item xs={12} className='flex justify-between'>
          <Button
            variant='tonal'
            color='secondary'
            onClick={handlePrev}
            startIcon={<DirectionalIcon ltrIconClass='tabler-arrow-left' rtlIconClass='tabler-arrow-right' />}
          >
            Previous
          </Button>
          <Button variant='contained' color='success' onClick={handleSubmitSubscription}>
            Submit
          </Button>
        </Grid>
      </Grid>
    </>
  )
}

export default StepBillingDetails
