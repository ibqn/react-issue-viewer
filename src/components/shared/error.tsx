import { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import Snackbar from '@material-ui/core/Snackbar'
// import { ApolloError } from '@apollo/client'

const useStyles = makeStyles((theme) => ({
  snackbar: {
    margin: theme.spacing(),
  },
}))

export type TErrorMessage = { message: string }

export type TError = { error: TErrorMessage }

const Error = ({ error }: TError) => {
  const classes = useStyles()
  const [open, setOpen] = useState(true)

  return (
    <Snackbar
      open={open}
      className={classes.snackbar}
      message={error.message}
      action={
        <Button onClick={() => setOpen(false)} color="secondary" size="small">
          Close
        </Button>
      }
    />
  )
}

export default Error
