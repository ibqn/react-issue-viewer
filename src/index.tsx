import React from 'react'
import ReactDOM from 'react-dom'

import { ApolloProvider } from '@apollo/client'

import App from './app'
import reportWebVitals from './reportWebVitals'

import GlobalStyles from './components/global-styles'

import { client } from './apollo/client'

import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline'

import { ThemeProvider } from 'styled-components'

// Required material-ui fonts weights: 300,400,500,700
// import "@fontsource/roboto/300.css";
// import "@fontsource/roboto/400.css";
// import "@fontsource/roboto/500.css";
// import "@fontsource/roboto/700.css";

import '@fontsource/roboto'

import { theme } from './theme'

ReactDOM.render(
  <React.StrictMode>
    <MuiThemeProvider theme={theme}>
      <ThemeProvider theme={theme}>
        <GlobalStyles />
        <CssBaseline />

        <ApolloProvider client={client}>
          <App />
        </ApolloProvider>
      </ThemeProvider>
    </MuiThemeProvider>
  </React.StrictMode>,
  document.getElementById('root')
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
