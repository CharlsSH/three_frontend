'use client'

// React Imports
import React from 'react'

// MUI Imports
import MuiBadge from '@mui/material/Badge'
import { styled } from '@mui/material/styles'

const Badge = styled(MuiBadge)(({ tonal, color }) => {
  return {
    '& .MuiBadge-badge.MuiBadge-standard': {
      ...(tonal === 'true' && {
        color: `var(--mui-palette-${color}-main)`,
        backgroundColor: `var(--mui-palette-${color}-lightOpacity)`
      })
    }
  }
})

const CustomBadge = props => <Badge {...props} />

export default CustomBadge
