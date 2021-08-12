interface IIssueQueryVars {
  searchQuery: string
}

interface IPageInfo {
  hasPreviousPage: boolean
  hasNextPage: boolean
  endCursor: string
}

interface IAuthor {
  login: string
}

interface IComment {
  id: string
  author: IAuthor
  bodyHTML: string
  createdAt: string
}

interface ICommentsData {
  pageInfo: IPageInfo
  nodes: Array<IComment>
  totalCount: number
}

interface IIssue {
  id: string
  number: number
  title: string
  state: 'OPEN' | 'CLOSED'
  bodyText: string
  createdAt: string
  author: IAuthor
  bodyHTML: string
  comments: ICommentsData
}

interface ISearchData {
  pageInfo: IPageInfo
  nodes: Array<IIssue>
  issueCount: number
}

interface IIssuesData {
  search: ISearchData
}

interface IRepositoryData {
  issue: IIssue
}

interface ISingleIssueQueryVars {
  issueNumber: number
}

interface ISingleIssueData {
  repository: IRepositoryData
}

export type {
  IIssueQueryVars,
  ISingleIssueData,
  ISingleIssueQueryVars,
  IIssuesData,
  IIssue,
  IAuthor,
}
