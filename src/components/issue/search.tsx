import { useState, useEffect, useMemo, ChangeEvent } from 'react'

import debounce from 'lodash/debounce'

import { useApolloClient, gql } from '@apollo/client'

import { makeStyles } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'
import ClearIcon from '@material-ui/icons/Clear'
import Paper from '@material-ui/core/Paper'
import IconButton from '@material-ui/core/IconButton'
import SearchIcon from '@material-ui/icons/Search'

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(0.25, 0.5), // padding: '2px 4px'
    margin: theme.spacing(1, 0),
    display: 'flex',
    alignItems: 'center',
  },
}))

const SEARCH_ISSUE_QUERY = gql`
  query {
    search(
      query: "repo:facebook/react is:issue in:title test"
      type: ISSUE
      first: 100
      after: null
    ) {
      pageInfo {
        hasPreviousPage
        hasNextPage
        endCursor
      }
      issueCount
      nodes {
        ... on Issue {
          number
          title
          bodyText
        }
      }
    }
  }
`

type SearchIssueProps = { setSearchResult: (data: Object | null) => void }

const SearchIssue = ({ setSearchResult }: SearchIssueProps) => {
  const classes = useStyles()

  const [search, setSearch] = useState('')

  const client = useApolloClient()

  const delayedSearch = useMemo(
    () =>
      debounce(async () => {
        try {
          const { data } = await client.query({
            query: SEARCH_ISSUE_QUERY,
            variables: { search },
          })

          console.log('search data', data)
          setSearchResult(data)
        } catch (error) {
          console.error(error)
        }
      }, 300),
    [search, setSearchResult, client]
  )

  const clearSearchInput = () => {
    setSearch('')
    setSearchResult(null)
  }

  const handleSearchInput = ({
    target: { value },
  }: ChangeEvent<{ value: string }>) => setSearch(value)

  useEffect(() => {
    console.log('effect', search)
    if (search) {
      delayedSearch()
    }

    return delayedSearch.cancel
  }, [search, delayedSearch])

  return (
    <Paper className={classes.root} elevation={1}>
      <IconButton onClick={clearSearchInput}>
        <ClearIcon />
      </IconButton>
      <TextField
        fullWidth
        placeholder="Search All Tracks"
        InputProps={{
          disableUnderline: true,
        }}
        value={search}
        onChange={handleSearchInput}
      />
      <IconButton type="submit">
        <SearchIcon />
      </IconButton>
    </Paper>
  )
}

export default SearchIssue
