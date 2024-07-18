// StepAccountDetails.js

// React Imports
import https from 'https';

import { useState, useEffect } from 'react'

// MUI Imports
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import MenuItem from '@mui/material/MenuItem'
import InputAdornment from '@mui/material/InputAdornment'
import axios from 'axios'


// Component Imports
import DirectionalIcon from '@components/DirectionalIcon'
import CustomTextField from '@core/components/mui/TextField'

const StepAccountDetails = ({ handleNext, formData, setFormData }) => {
  // States
  const [isPasswordShown, setIsPasswordShown] = useState(false)
  const [isConfirmPasswordShown, setIsConfirmPasswordShown] = useState(false)
  const [error, setError] = useState(null)
  const [roles, setRoles] = useState([]) // State pour les rôles

  const axiosInstance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    httpsAgent: new https.Agent({
      rejectUnauthorized: false, // Désactiver la vérification du certificat auto-signé
    })
  });

  // Fetch roles from API
  useEffect(() => {
    const fetchRoles = async () => {
      try {
        const response = await axiosInstance.post('/UsersRoles/GetUserRoles');

        const rolesData = response.data.map(role => ({
          value: role.userRoleId,
          label: role.roleName
        }))

        setRoles(rolesData)
      } catch (error) {
        console.error('Error fetching roles:', error)
        setError('Failed to fetch roles')
      }
    }

    fetchRoles()
  }, []) // Effect hook pour récupérer les rôles au chargement du composant

  const handleClickShowPassword = () => {
    setIsPasswordShown(!isPasswordShown)
  }

  const handleClickShowConfirmPassword = () => {
    setIsConfirmPasswordShown(!isConfirmPasswordShown)
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target

    setFormData({
      ...formData,
      [name]: value
    })
  }

  const handleRoleChange = (e) => {
    const selectedRole = roles.find(role => role.value === e.target.value);

    setFormData({
      ...formData,
      role: e.target.value,
      roleName: selectedRole ? selectedRole.label : '',
    })
  }

  return (
    <>
      <div className='mbe-5'>
        <Typography variant='h4'>Account Information</Typography>
        <Typography>Enter Your Account Details</Typography>
      </div>
      <Grid container spacing={6}>
        <Grid item xs={12} sm={6}>
          <CustomTextField
            fullWidth
            label='Username'
            name='Username'
            value={formData.Username || ''}
            onChange={handleInputChange}
            placeholder='johnDoe'
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <CustomTextField
            fullWidth
            type='email'
            label='Email'
            name='Email'
            value={formData.Email || ''}
            onChange={handleInputChange}
            placeholder='john.doe@gmail.com'
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <CustomTextField
            fullWidth
            label='Password'
            name='Password'
            value={formData.Password || ''}
            onChange={handleInputChange}
            placeholder='············'
            type={isPasswordShown ? 'text' : 'password'}
            InputProps={{
              endAdornment: (
                <InputAdornment position='end'>
                  <IconButton
                    edge='end'
                    onClick={handleClickShowPassword}
                    onMouseDown={e => e.preventDefault()}
                    aria-label='toggle password visibility'
                  >
                    <i className={isPasswordShown ? 'tabler-eye-off' : 'tabler-eye'} />
                  </IconButton>
                </InputAdornment>
              )
            }}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <CustomTextField
            fullWidth
            label='Confirm Password'
            name='ConfirmPassword'
            value={formData.ConfirmPassword || ''}
            onChange={handleInputChange}
            placeholder='············'
            type={isConfirmPasswordShown ? 'text' : 'password'}
            InputProps={{
              endAdornment: (
                <InputAdornment position='end'>
                  <IconButton
                    edge='end'
                    onClick={handleClickShowConfirmPassword}
                    onMouseDown={e => e.preventDefault()}
                    aria-label='toggle confirm password visibility'
                  >
                    <i className={isConfirmPasswordShown ? 'tabler-eye-off' : 'tabler-eye'} />
                  </IconButton>
                </InputAdornment>
              )
            }}
          />
        </Grid>
        <Grid item xs={12}>
          <CustomTextField
            select
            fullWidth
            label='Role'
            name='UserRoleId'
            value={formData.role || ''}
            onChange={handleRoleChange}
            error={!!error}
            helperText={error || ''}
          >
            {roles.map((role, index) => (
              <MenuItem key={index} value={role.value}>
                {role.label}
              </MenuItem>
            ))}
          </CustomTextField>
        </Grid>
        <Grid item xs={12} className='flex justify-between'>
          <Button
            disabled
            variant='tonal'
            color='secondary'
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

export default StepAccountDetails
