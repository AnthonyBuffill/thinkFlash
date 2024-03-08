// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client'
import './App.css'
import AIPlayground from './pages/AIPlayground'
const client = new ApolloClient({
  uri: '/graphql',
  cache: new InMemoryCache(),
});
function App() {

  return (
    <ApolloProvider client={client}>
      <AIPlayground></AIPlayground>
    </ApolloProvider>
  )
}

export default App
