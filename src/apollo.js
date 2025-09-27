// src/apollo.js
import { ApolloClient, InMemoryCache } from '@apollo/client/core'

export const apolloClient = new ApolloClient({
	uri: 'https://countries.trevorblades.com/', // публичное GraphQL API
	cache: new InMemoryCache()
})
