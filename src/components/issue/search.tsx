import { useState, useEffect, useMemo, ChangeEvent } from 'react'

import debounce from 'lodash/debounce'

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

type TSearchIssue = { setSearchInput: (searchInput: string) => void }

const SearchIssue = ({ setSearchInput }: TSearchIssue) => {
  const classes = useStyles()

  const [search, setSearch] = useState('')

  const delayedSearch = useMemo(
    () => debounce(() => setSearchInput(search), 300),
    [search, setSearchInput]
  )

  const clearSearchInput = () => {
    setSearch('')
    setSearchInput('')
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
