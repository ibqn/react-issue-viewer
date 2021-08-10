import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import { IssuePage } from './pages'

import { Header } from './components/layout'

const App = () => (
  <Router>
    <Header />

    <Switch>
      <Route path="/">
        <IssuePage />
      </Route>
    </Switch>
  </Router>
)

export default App
