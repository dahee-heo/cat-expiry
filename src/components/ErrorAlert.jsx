import { Alert, AlertTitle } from '@mui/material'
import React from 'react'

export const ErrorAlert = ({ error }) => {
  return (
    <Alert severity="error">
      <AlertTitle>Error</AlertTitle>
      {error.message} <strong>check it out!</strong>
    </Alert>
  )
}
