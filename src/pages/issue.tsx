import { useState } from 'react'
import SearchIssue from '../components/issue/search'
import { Container } from '../components/layout'
import { useQuery, gql } from '@apollo/client'
import { Error, Loading } from '../components/shared'
import { IIssueQueryVars, IIssuesData, ListIssues } from '../components/issue'

const SEARCH_ISSUE_QUERY = gql`
  query GetIssues($searchQuery: String!) {
    search(query: $searchQuery, type: ISSUE, first: 100, after: null) {
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
          state
          bodyText
        }
      }
    }
  }
`

const IssuePage = () => {
  const [search, setSearch] = useState('')

  const { data, loading, error } = useQuery<IIssuesData, IIssueQueryVars>(
    SEARCH_ISSUE_QUERY,
    {
      variables: {
        searchQuery: `repo:facebook/react is:issue in:title ${search}`,
      },
      skip: !!!search,
    }
  )

  const setSearchInput = (searchInput: string) => setSearch(searchInput)

  let listIssues = <ListIssues issueData={data} />

  if (loading) {
    listIssues = <Loading />
  }

  if (error) {
    listIssues = <Error error={error} />
  }

  console.log('search input:', `'${search}'`, 'query data', data)

  return (
    <Container>
      <SearchIssue setSearchInput={setSearchInput} />
      {listIssues}
    </Container>
  )
}

export default IssuePage
