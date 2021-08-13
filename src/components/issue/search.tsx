import { useState, useEffect, useMemo, ChangeEvent } from 'react'

import debounce from 'lodash/debounce'

import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'
import MenuItem from '@material-ui/core/MenuItem'
import ClearIcon from '@material-ui/icons/Clear'
import Paper from '@material-ui/core/Paper'
import IconButton from '@material-ui/core/IconButton'
import SearchIcon from '@material-ui/icons/Search'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      padding: theme.spacing(0.25, 0.5), // padding: '2px 4px'
      margin: theme.spacing(1, 0),
      display: 'flex',
      alignItems: 'center',
    },
    select: {
      margin: theme.spacing(1),
      width: '20ch',
    },
  })
)

const states = [
  {
    value: 'state:open state:closed',
    label: 'All',
  },
  {
    value: 'state:open',
    label: 'Open',
  },
  {
    value: 'state:closed',
    label: 'Closed',
  },
]

type TSearchIssue = { setSearchInput: (searchInput: string) => void }

const SearchIssue = ({ setSearchInput }: TSearchIssue) => {
  const classes = useStyles()

  const [search, setSearch] = useState('')
  const [state, setState] = useState('state:open state:closed')

  const handleChange = ({ target: { value } }: ChangeEvent<HTMLInputElement>) =>
    setState(value)

  const delayedSearch = useMemo(
    () => debounce(() => setSearchInput(`${state} ${search}`), 300),
    [search, state, setSearchInput]
  )

  const clearSearchInput = () => {
    setSearch('')
    setSearchInput('')
  }

  const handleSearchInput = ({
    target: { value },
  }: ChangeEvent<{ value: string }>) => setSearch(value)

  useEffect(() => {
    console.log('effect', search, state)
    if (search) {
      delayedSearch()
    }

    return delayedSearch.cancel
  }, [search, state, delayedSearch])

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
      <TextField
        id="outlined-select-state"
        select
        label="State"
        value={state}
        onChange={handleChange}
        className={classes.select}
        // helperText="Please select issue state"
        variant="outlined"
      >
        {states.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </TextField>
    </Paper>
  )
}

export default SearchIssue
