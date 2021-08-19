import { useParams } from 'react-router-dom'

import styled from 'styled-components'

import { gql, useQuery } from '@apollo/client'

import moment from 'moment'
import clsx from 'clsx'

import { makeStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardHeader from '@material-ui/core/CardHeader'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'

import Divider from '@material-ui/core/Divider'

import { Error, Loading } from 'components/shared'
import { Container } from '../components/layout'
import { ISingleIssueData, ISingleIssueQueryVars } from '../components/issue'

import { ReactComponent as OpenIcon } from '../components/issue/open-icon.svg'
import { ReactComponent as CloseIcon } from '../components/issue/close-icon.svg'

const useStyles = makeStyles((theme) => ({
  paper: {
    width: 'auto',
    display: 'block',
    padding: theme.spacing(2),
    marginLeft: theme.spacing(3),
    marginRight: theme.spacing(3),
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
    // [theme.breakpoints.up('md')]: {
    //   width: 650,
    //   marginLeft: 'auto',
    //   marginRight: 'auto',
    // },
  },
  card: {
    display: 'flex',
    justifyContent: 'center',
  },
  title: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: theme.spacing(2),
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
  divider: {
    marginTop: theme.spacing(),
    marginBottom: theme.spacing(),
  },
}))

const SINGLE_ISSUE_QUERY = gql`
  query GetSingleIssue($issueNumber: Int!) {
    repository(name: "react", owner: "facebook") {
      issue(number: $issueNumber) {
        id
        author {
          login
        }
        number
        title
        createdAt
        state
        bodyHTML
        comments(first: 100, after: null) {
          pageInfo {
            endCursor
            hasNextPage
            hasPreviousPage
          }
          totalCount
          nodes {
            id
            author {
              login
            }
            bodyHTML
            createdAt
          }
        }
      }
    }
  }
`

const Content = styled.div`
  pre {
    overflow: auto;
  }
`

const SingleIssuePage = () => {
  const { issueNumber } = useParams<{ issueNumber: string }>()
  const classes = useStyles()

  const { data, loading, error } = useQuery<
    ISingleIssueData,
    ISingleIssueQueryVars
  >(SINGLE_ISSUE_QUERY, {
    variables: { issueNumber: +issueNumber },
  })

  if (loading) return <Loading />
  if (error) return <Error error={error} />

  console.log('single data', data)
  const { author, title, createdAt, state, bodyHTML, comments } =
    data?.repository?.issue || {}

  const { login } = author || {}

  console.log('comments', comments)

  return (
    <>
      <Card className={classes.card}>
        <CardHeader
          avatar={
            state === 'OPEN' ? (
              <OpenIcon className={clsx(classes.icon, classes.openIcon)} />
            ) : (
              <CloseIcon className={clsx(classes.icon, classes.closeIcon)} />
            )
          }
          title={title}
          subheader={`#${issueNumber} · ${login} opened this issue on ${moment(
            createdAt
          ).format('MMM Do, yyyy')}`}
        />
      </Card>
      <Container>
        <Paper elevation={1} className={classes.paper}>
          <Typography variant="h6" className={classes.title}>
            {login} commented {moment(createdAt).fromNow()}
          </Typography>
          <Divider className={classes.divider} />
          <Content
            dangerouslySetInnerHTML={{
              __html: bodyHTML || 'No description provided.',
            }}
          />
        </Paper>
        {comments?.nodes.map((comment) => {
          const { id, author, createdAt, bodyHTML } = comment
          const { login } = author || {}
          return (
            <Paper key={id} elevation={1} className={classes.paper}>
              <Typography variant="h6" className={classes.title}>
                {login} commented {moment(createdAt).fromNow()}
              </Typography>
              <Divider className={classes.divider} />
              <Content
                dangerouslySetInnerHTML={{
                  __html: bodyHTML || 'No description provided.',
                }}
              />
            </Paper>
          )
        })}
      </Container>
    </>
  )
}

export default SingleIssuePage
