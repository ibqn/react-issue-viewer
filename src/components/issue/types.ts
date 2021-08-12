interface IIssueQueryVars {
  searchQuery: string
}

interface IPageInfo {
  hasPreviousPage: boolean
  hasNextPage: boolean
  endCursor: string
}

interface IIssue {
  number: number
  title: string
  state: 'OPEN' | 'CLOSED'
  bodyText: string
}

interface ISearchData {
  pageInfo: IPageInfo
  nodes: Array<IIssue>
  issueCount: number
}

interface IIssuesData {
  search: ISearchData
}

export type { IIssueQueryVars, IIssuesData, IIssue }
