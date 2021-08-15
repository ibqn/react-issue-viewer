import { IIssuesData } from './types'
import { useState } from 'react'

import clsx from 'clsx'
import moment from 'moment'

import { makeStyles, Theme, createStyles } from '@material-ui/core/styles'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import Divider from '@material-ui/core/Divider'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'

import { ReactComponent as OpenIcon } from './open-icon.svg'
import { ReactComponent as CloseIcon } from './close-icon.svg'

import { Link } from 'react-router-dom'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
      backgroundColor: theme.palette.background.paper,
    },
    hint: {
      padding: theme.spacing(2),
    },
    icon: {
      marginRight: theme.spacing(2),
      width: 'auto',
      height: 20,
    },
    openIcon: {
      fill: '#1a7f37',
    },
    closeIcon: {
      fill: '#cf222e',
    },
  })
)

type IListIssues = {
  issueData: IIssuesData | undefined
}

const ListIssues = ({ issueData }: IListIssues) => {
  const classes = useStyles()
  const [selectedIndex, setSelectedIndex] = useState<number | undefined>(
    undefined
  )

  const handleListItemClick = (index: number) => setSelectedIndex(index)

  const { search: issues } = issueData || {}
  console.log('issues', issues)
  return (
    <div className={classes.root}>
      <Paper>
        <List component="nav" aria-label="main mailbox folders">
          {issues?.nodes.map((issue, index) => {
            const { id, number, title, state, createdAt } = issue

            return (
              <div key={id}>
                {index !== 0 && <Divider />}
                <ListItem
                  button
                  selected={selectedIndex === 0}
                  onClick={() => handleListItemClick(number)}
                  component={Link}
                  to={`/issue/${number}`}
                >
                  <ListItemIcon>
                    {state === 'OPEN' ? (
                      <OpenIcon
                        className={clsx(classes.icon, classes.openIcon)}
                      />
                    ) : (
                      <CloseIcon
                        className={clsx(classes.icon, classes.closeIcon)}
                      />
                    )}
                  </ListItemIcon>
                  <ListItemText
                    primary={title}
                    secondary={`#${number} · created ${moment(
                      createdAt
                    ).fromNow()}`}
                  />
                </ListItem>
              </div>
            )
          })}
        </List>

        {(!issues || issues?.nodes.length === 0) && (
          <Typography className={classes.hint}>
            Try to search for issues
          </Typography>
        )}
      </Paper>
    </div>
  )
}

export default ListIssues
