'use client'

// React Imports
import { useEffect } from 'react'

// MUI Imports
import {
  Experimental_CssVarsProvider as CssVarsProvider,
  experimental_extendTheme as extendTheme
} from '@mui/material/styles'
import { AppRouterCacheProvider } from '@mui/material-nextjs/v14-appRouter'
import CssBaseline from '@mui/material/CssBaseline'

// Third-party Imports
import stylisRTLPlugin from 'stylis-plugin-rtl'

// Core Theme Imports
import defaultCoreTheme from '@core/theme'

const ThemeProvider = props => {
  // Props
  const { children, direction } = props

  const settings = {
    skin: 'default'
  }

  const theme = extendTheme(defaultCoreTheme(settings, 'light', direction))

  useEffect(() => {
    document.body.setAttribute('data-mui-color-scheme', 'light')
  }, [])

  return (
    <AppRouterCacheProvider
      options={{
        prepend: true,
        ...(direction === 'rtl' && {
          key: 'rtl',
          stylisPlugins: [stylisRTLPlugin]
        })
      }}
    >
      <CssVarsProvider theme={theme} defaultMode='light'>
        <>
          <CssBaseline />
          {children}
        </>
      </CssVarsProvider>
    </AppRouterCacheProvider>
  )
}

export default ThemeProvider
