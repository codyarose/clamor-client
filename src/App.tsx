import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { ThemeProvider } from 'styled-components'

import theme from './theme'
import { GlobalStyles } from './theme/globals'
import { Home } from './pages/Home'
import { Login } from './pages/Login'
import { Signup } from './pages/Signup'
import Navbar from './components/Navbar'
import { Container } from './components/common/Container'

function App() {
	return (
		<ThemeProvider theme={theme}>
			<GlobalStyles />
			<div className="App">
				<Router>
					<Navbar />
					<Container>
						<Switch>
							<Route exact path="/" component={Home} />
							<Route exact path="/login" component={Login} />
							<Route exact path="/signup" component={Signup} />
						</Switch>
					</Container>
				</Router>
			</div>
		</ThemeProvider>
	)
}

export default App
