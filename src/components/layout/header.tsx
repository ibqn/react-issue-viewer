import { Link } from 'react-router-dom'

import { makeStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'

import GitHubIcon from '@material-ui/icons/GitHub'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    margin: 0,
    padding: 0,
  },
  grow: {
    flexGrow: 1,
    display: 'flex',
    alignItems: 'center',
    textDecoration: 'none',
  },
  logo: {
    marginRight: theme.spacing(2),
    width: 'auto',
    height: 24,
    color: '#fff',
  },
  logoLink: {
    color: 'white',
    fontSize: 18,
  },
  button: {
    fontSize: '11px',
  },
  link: {
    color: 'white',
    fontSize: 14,
  },
}))

const Header = () => {
  const classes = useStyles()

  return (
    <AppBar position="static" className={classes.root}>
      <Toolbar>
        <Grid className={classes.grow}>
          <Link to="/" className={classes.grow}>
            <GitHubIcon className={classes.logo} />
            <Typography variant="caption" className={classes.logoLink} noWrap>
              Issues
            </Typography>
          </Link>
        </Grid>
        <Button component={Link} to="/" className={classes.button}>
          <Typography variant="caption" className={classes.link} noWrap>
            issues
          </Typography>
        </Button>
      </Toolbar>
    </AppBar>
  )
}

export default Header
