// React Imports

import https from 'https';

import { useState, useEffect } from 'react'

// MUI Imports
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import MenuItem from '@mui/material/MenuItem'
import InputAdornment from '@mui/material/InputAdornment'

import axios from 'axios'

// Component Imports
import CustomTextField from '@core/components/mui/TextField'
import DirectionalIcon from '@/components/DirectionalIcon'

const StepPersonalInfo = ({ handleNext, handlePrev, formData, setFormData }) => {

  console.log(formData)

  const [showRooms, setShowRoom] = useState([]) // State pour les rôles
  const [error, setError] = useState(null);

  // Handlers for input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target

    setFormData({
      ...formData,
      [name]: value
    })
  }

  const axiosInstance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    httpsAgent: new https.Agent({
      rejectUnauthorized: false, // Désactiver la vérification du certificat auto-signé
    })
  });


  // Fetch roles from API
  useEffect(() => {
    const fetchShowRoom = async () => {
      try {
        const response = await axiosInstance.post('/ShowRoomMaster/GetShowRoom');

        const roomData = response.data.map(role => ({
          value: (role.show_Room_Short_Desc != '') ? role.show_Room_Short_Desc : role.show_Room_Name,
          label: role.show_Room_Name
        }))

        setShowRoom(roomData)
      } catch (error) {
        console.error('Error fetching Show Room:', error)
        setError('Failed to fetch Show Room')
      }
    }

    fetchShowRoom()
  }, []);

  const handleShowRoomChange = (e) => {
    setFormData({
      ...formData,
      ShowRoom: e.target.value
    })
  }


  return (
    <>
      <div className='mbe-5'>
        <Typography variant='h4'>Personal Information</Typography>
        <Typography>Enter Your Personal Information</Typography>
      </div>
      <Grid container spacing={6}>
        <Grid item xs={12} sm={6}>
          <CustomTextField
            fullWidth
            label='First Name'
            name='FirstName'
            value={formData.FirstName || ''}
            onChange={handleInputChange}
            placeholder='John'
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <CustomTextField
            fullWidth
            label='Last Name'
            name='LastName'
            value={formData.LastName || ''}
            onChange={handleInputChange}
            placeholder='Doe'
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <CustomTextField
            fullWidth
            type='number'
            label='Mobile'
            name='Mobile'
            value={formData.Mobile || ''}
            onChange={handleInputChange}
            placeholder='202 555 0111'
            InputProps={{
              startAdornment: <InputAdornment position='start'>US (+1)</InputAdornment>
            }}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <CustomTextField
            fullWidth
            type='text'
            label='Company Code'
            name='CompanyCode'
            value={formData.CompanyCode || ''}
            onChange={handleInputChange}
            placeholder='689421'
          />
        </Grid>
        <Grid item xs={12}>
          <CustomTextField
            fullWidth
            label='Address'
            name='Address'
            value={formData.Address || ''}
            onChange={handleInputChange}
            placeholder='1456, Liberty Street'
          />
        </Grid>
        {
          formData.roleName == "Sales Manager" || formData.roleName == "Sales Representative" ?
            <Grid item xs={12}>
              <CustomTextField
                select
                fullWidth
                label='Show Room'
                name='ShowRoom'
                value={formData.ShowRoom || ''}
                onChange={handleShowRoomChange}
                error={!!error}
                helperText={error || ''}
              >
                {showRooms.map((showRoom, index) => (
                  <MenuItem key={index} value={showRoom.value}>
                    {showRoom.label}
                  </MenuItem>
                ))}
              </CustomTextField>
            </Grid> : ''
        }
        <Grid item xs={12} className='flex justify-between'>
          <Button
            variant='tonal'
            color='secondary'
            onClick={handlePrev}
            startIcon={<DirectionalIcon ltrIconClass='tabler-arrow-left' rtlIconClass='tabler-arrow-right' />}
          >
            Previous
          </Button>
          <Button
            variant='contained'
            onClick={handleNext}
            endIcon={<DirectionalIcon ltrIconClass='tabler-arrow-right' rtlIconClass='tabler-arrow-left' />}
          >
            Next
          </Button>
        </Grid>
      </Grid>
    </>
  )
}

export default StepPersonalInfo
