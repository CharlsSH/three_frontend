'use client'

// Next Imports
import https from 'https';

import { useEffect, useState, useRef } from 'react';

import Link from 'next/link'

import { useRouter, useSearchParams, useParams } from 'next/navigation'

import CryptoJS from 'crypto-js';
import Cookies from 'js-cookie';

// MUI Imports
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'

// Component Imports
import axios from 'axios'

import Logo from '@components/layout/shared/Logo'
import CustomTextField from '@core/components/mui/TextField'

// Styled Component Imports
import AuthIllustrationWrapper from './AuthIllustrationWrapper'



import { getLocalizedUrl } from '@/utils/i18n'

const secretKey = `${process.env.AUTH_SECRET_CODE}`;

const axiosInstance = axios.create({
  baseURL: `${process.env.API_URL}`,
  httpsAgent: new https.Agent({
    rejectUnauthorized: false, // Désactiver la vérification du certificat auto-signé
  }),
});


const TwoStepsV1 = () => {

  const [user, setUser] = useState(null);
  const [code, setCode] = useState(Array(6).fill(''));
  const searchParams = useSearchParams();
  const [isCodeValid, setIsCodeValid] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();
  const params = useParams();
  const locale = params.lang;

  // Références aux champs d'entrée
  const inputRefs = useRef(Array(6).fill(null));

  useEffect(() => {
    // Récupérer les données chiffrées depuis le cookie
    const encryptedUser = Cookies.get('provideData');

    if (encryptedUser) {
      // Déchiffrer les données utilisateur
      const bytes = CryptoJS.AES.decrypt(encryptedUser, secretKey);
      const decryptedUser = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));

      // Mettre à jour l'état utilisateur avec les données déchiffrées
      setUser(decryptedUser);
    }
  }, []);

  const onSubmit = async (e) => {
    e.preventDefault();
    const verificationCode = code.join('');

    try {
      const response = await axiosInstance.post('/Users/CheckOTP', {
        OTP: verificationCode,
        Email: user.Email
      });

      if (response.status === 200) {

        // Chiffrer les données utilisateur
        const encryptedUser = CryptoJS.AES.encrypt(JSON.stringify("alreadyLogin"), secretKey).toString();

        // Stocker les données chiffrées dans un cookie
        Cookies.set('sessionLogin', encryptedUser, { expires: 2 }); // Le cookie expirera dans 2 jours

        const redirectURL = searchParams.get('redirectTo') ?? '/';

        router.push(getLocalizedUrl(redirectURL, locale));
        setIsCodeValid(true);
      } else {
        setIsCodeValid(false);
        setError('Incorrect verification code. Please try again.');
      }

    } catch (error) {
      console.error('Error fetching Show Room:', error);
      setIsCodeValid(false);
      setError('Incorrect verification code. Please try again.');
    }
  }

  const handleCodeChange = (value, index) => {
    const newCode = [...code];

    newCode[index] = value;
    setCode(newCode);

    // Passer automatiquement au champ suivant si ce n'est pas le dernier
    if (index < code.length - 1 && value !== '') {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const getInputClassName = (index) => {
    if (isCodeValid) {
      return 'border-green-500'; // Bordure verte si le code est valide
    } else if (isCodeValid === false) {
      return 'border-red-500'; // Bordure rouge si le code est invalide
    } else {
      return ''; // Aucune classe de bordure par défaut
    }
  };


  return (
    <AuthIllustrationWrapper>
      <Card className='flex flex-col sm:is-[450px]'>
        <CardContent className='sm:!p-12'>
          <div className='flex justify-center mbe-6'>
            <Logo />
          </div>
          <div className='flex flex-col gap-1 mbe-6'>
            <Typography variant='h4'>Two Step Verification 💬</Typography>
            <Typography>
              We sent a verification code to your mobile. Enter the code from the mobile in the field below.
            </Typography>
            <Typography className='font-medium' color='text.primary'>
              ******1234
            </Typography>
          </div>
          <form noValidate autoComplete='off' onSubmit={onSubmit} className='flex flex-col gap-6'>
            <div className='flex flex-col gap-2'>
              <Typography>Type your 6 digit security code</Typography>
              <div className='flex items-center justify-between gap-4'>
                {code.map((digit, index) => (
                  <CustomTextField
                    key={index}
                    size='medium'
                    autoFocus={index === 0}
                    className={`text-center ${getInputClassName(index)}`}
                    value={digit}
                    inputProps={{ maxLength: 1, pattern: '[0-9]*' }}
                    onChange={(e) => handleCodeChange(e.target.value, index)}
                    ref={(el) => (inputRefs.current[index] = el)}
                  />
                ))}
              </div>
            </div>
            <Button fullWidth variant='contained' type='submit'>
              Send
            </Button>
            {error && <Typography color='error'>{error}</Typography>}
            <div className='flex justify-center items-center flex-wrap gap-2'>
              <Typography>Didn&#39;t get the code?</Typography>
              <Typography color='primary' component={Link} href='/' onClick={e => e.preventDefault()}>
                Resend
              </Typography>
            </div>
          </form>
        </CardContent>
      </Card>
    </AuthIllustrationWrapper>
  )
}

export default TwoStepsV1
