import {
  ApolloClient,
  makeVar,
  InMemoryCache,
  gql,
  createHttpLink,
} from '@apollo/client'
import { setContext } from '@apollo/client/link/context'

const getToken = () => {
  return process.env.REACT_APP_ACCESS_TOKEN
}

const isLoggedInVar = makeVar(!!getToken())

const httpLink = createHttpLink({
  uri: 'https://api.github.com/graphql',
})

const authLink = setContext((_, { headers }) => {
  const token = getToken()

  console.log('token: ', token)

  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  }
})

const link = authLink.concat(httpLink)

const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        isLoggedIn: {
          read() {
            return isLoggedInVar()
          },
        },
      },
    },
  },
})

const typeDefs = gql`
  extend type Query {
    isLoggedIn: Boolean!
  }
`

const client = new ApolloClient({
  link,
  cache,
  typeDefs,
})

// Test query
const TEST_QUERY = gql`
  query {
    viewer {
      login
    }
  }
`

const testApollo = async () => {
  try {
    const result = await client.query({
      query: TEST_QUERY,
    })

    const { data } = result

    console.log(data)
  } catch (error) {
    console.log(`error occurred ${error}`)
  }
}

testApollo()

export { client, isLoggedInVar }
