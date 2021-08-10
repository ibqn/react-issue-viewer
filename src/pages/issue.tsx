import { useState } from 'react'
import SearchIssue from '../components/issue/search'
import { Container } from '../components/layout'

const IssuePage = () => {
  const [searchResult, setSearchResult] = useState(null)

  const setResult = (data: Object | null) => {}

  return (
    <Container>
      <SearchIssue setSearchResult={setResult} />
    </Container>
  )
}

export default IssuePage
