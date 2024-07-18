'use client'

// React Imports
import https from 'https';

import { useState } from 'react'

import Link from 'next/link'

import { useRouter, useSearchParams, useParams } from 'next/navigation'

import axios from 'axios';

import CryptoJS from 'crypto-js';
import Cookies from 'js-cookie';

// Next Imports

// MUI Imports
import useMediaQuery from '@mui/material/useMediaQuery'
import { styled, useTheme } from '@mui/material/styles'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import InputAdornment from '@mui/material/InputAdornment'
import Checkbox from '@mui/material/Checkbox'
import Button from '@mui/material/Button'
import FormControlLabel from '@mui/material/FormControlLabel'
import TextField from '@mui/material/TextField'

// Third-party Imports
import classnames from 'classnames'
import { useForm } from 'react-hook-form'

// Component Imports
import Logo from '@components/layout/shared/Logo'

// Config Imports
import themeConfig from '@configs/themeConfig'

// Hook Imports
import { useImageVariant } from '@core/hooks/useImageVariant'
import { useSettings } from '@core/hooks/useSettings'

// Util Imports
import { getLocalizedUrl } from '@/utils/i18n'

const secretKey = `${process.env.AUTH_SECRET_CODE}`;

// Styled Custom Components
const LoginIllustration = styled('img')(({ theme }) => ({
  zIndex: 2,
  blockSize: 'auto',
  maxBlockSize: 680,
  maxInlineSize: '100%',
  margin: theme.spacing(12),
  [theme.breakpoints.down(1536)]: {
    maxBlockSize: 550
  },
  [theme.breakpoints.down('lg')]: {
    maxBlockSize: 450
  }
}))

const MaskImg = styled('img')({
  blockSize: 'auto',
  maxBlockSize: 355,
  inlineSize: '100%',
  position: 'absolute',
  insetBlockEnd: 0,
  zIndex: -1
})

const LoginV2 = ({ mode }) => {
  // States
  const [isPasswordShown, setIsPasswordShown] = useState(false)
  const [errorState, setErrorState] = useState(null)
  const [userMail, setUserMail] = useState(null);
  const [userPass, setUserPass] = useState(null);

  // Vars
  const darkImg = '/images/pages/auth-mask-dark.png'
  const lightImg = '/images/pages/auth-mask-light.png'
  const darkIllustration = '/images/illustrations/auth/v2-login-dark.png'
  const lightIllustration = '/images/illustrations/auth/v2-login-light.png'
  const borderedDarkIllustration = '/images/illustrations/auth/v2-login-dark-border.png'
  const borderedLightIllustration = '/images/illustrations/auth/v2-login-light-border.png'
  const logo = '/images/illustrations/auth/logo.jpg'

  // Hooks
  const router = useRouter()
  const searchParams = useSearchParams()
  const params = useParams();
  const locale = params.lang // Assuming `lang` is the parameter in the URL
  const { settings } = useSettings()
  const theme = useTheme()
  const hidden = useMediaQuery(theme.breakpoints.down('md'))
  const authBackground = useImageVariant(mode, lightImg, darkImg)

  const characterIllustration = useImageVariant(
    mode,
    lightIllustration,
    darkIllustration,
    borderedLightIllustration,
    borderedDarkIllustration
  )

  const handleClickShowPassword = () => setIsPasswordShown(show => !show)

  const { control, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      email: 'admin@sales.com',
      password: 'admin'
    }
  })



  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      const axiosInstance = axios.create({
        baseURL: process.env.NEXT_PUBLIC_API_URL,
        httpsAgent: new https.Agent({
          rejectUnauthorized: false, // Désactiver la vérification du certificat auto-signé
        })
      });

      const response = await axiosInstance.post('/Users/CheckLogin', {
        Email: userMail,
        Password: userPass
      });

      if (response.status === 200) {

        // Chiffrer les données utilisateur
        const encryptedUser = CryptoJS.AES.encrypt(JSON.stringify(response.data), secretKey).toString();

        // Stocker les données chiffrées dans un cookie
        Cookies.set('provideData', encryptedUser, { expires: 2 }); // Le cookie expirera dans 2 jours

        const redirectURL = searchParams.get('redirectTo') ?? '/pages/auth/two-steps-v1'

        router.push(getLocalizedUrl(redirectURL, locale));
      } else {
        setErrorState('Login failed, please try again')
      }
    } catch (error) {
      setErrorState('Login failed, please try again')
    }
  }

  return (
    <div className='flex bs-full justify-center'>
      <div
        className={classnames(
          'flex bs-full items-center justify-center flex-1 min-bs-[100dvh] relative p-6 max-md:hidden',
          {
            'border-ie': settings.skin === 'bordered'
          }
        )}
      >
        <LoginIllustration src={logo} alt='character-illustration' />
        {!hidden && (
          <MaskImg
            alt='mask'
            src={authBackground}
            className={classnames({ 'scale-x-[-1]': theme.direction === 'rtl' })}
          />
        )}
      </div>
      <div className='flex justify-center items-center bs-full bg-backgroundPaper !min-is-full p-6 md:!min-is-[unset] md:p-12 md:is-[480px]'>
        <div className='flex flex-col gap-6 is-full sm:is-auto md:is-full sm:max-is-[400px] md:max-is-[unset] mbs-11 sm:mbs-14 md:mbs-0'>
          <div className='flex flex-col gap-1'>
            <Typography variant='h4'>{`Welcome to ${themeConfig.templateName}! 👋🏻`}</Typography>
            <Typography>Please sign-in to your account and start sales</Typography>
          </div>
          <form noValidate autoComplete='off' onSubmit={onSubmit} className='flex flex-col gap-6'>
            <TextField
              control={control}
              name='email'
              autoFocus
              fullWidth
              label='Email or Username'
              placeholder='Enter your email or username'
              error={!!errors.email}
              helperText={errors.email ? errors.email.message : ''}
              onChange={(e) => setUserMail(e.target.value)}
            />
            <TextField
              control={control}
              name='password'
              fullWidth
              label='Password'
              placeholder='············'
              id='outlined-adornment-password'
              type={isPasswordShown ? 'text' : 'password'}
              error={!!errors.password}
              helperText={errors.password ? errors.password.message : ''}
              onChange={(e) => setUserPass(e.target.value)}
              InputProps={{
                endAdornment: (
                  <InputAdornment position='end'>
                    <IconButton edge='end' onClick={handleClickShowPassword} onMouseDown={e => e.preventDefault()}>
                      <i className={isPasswordShown ? 'tabler-eye-off' : 'tabler-eye'} />
                    </IconButton>
                  </InputAdornment>
                )
              }}
            />
            <div className='flex justify-between items-center gap-x-3 gap-y-1 flex-wrap'>
              <FormControlLabel control={<Checkbox />} label='Remember me' />
              <Typography
                className='text-end'
                color='primary'
                component={Link}
                href={getLocalizedUrl('forgot-password', locale)}
              >
                Forgot password?
              </Typography>
            </div>
            {errorState && <Typography color='error'>{errorState}</Typography>}
            <Button fullWidth variant='contained' type='submit'>
              Login
            </Button>
            <div className='flex justify-center items-center flex-wrap gap-2'>
              <Typography>New on our platform?</Typography>
              <Typography component={Link} href={getLocalizedUrl('/register', locale)} color='primary'>
                Create an account
              </Typography>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default LoginV2
