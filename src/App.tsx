import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { ThemeProvider } from 'styled-components'
// import jwtDecode from 'jwt-decode'

import theme from './theme'
import { GlobalStyles } from './theme/globals'
import { Home } from './pages/Home'
import { Login } from './pages/Login'
import { Signup } from './pages/Signup'
import Navbar from './components/Navbar'
import { Container } from './components/common/Container'

const App = () => {
	// const decodedToken = jwtDecode<{ exp: number }>(localStorage.FBIdToken)
	// const authenticated = decodedToken.exp * 1000 > Date.now()

	// console.log(authenticated)
	// useEffect(() => {
	// 	updateAuthed!(authenticated)
	// 	// eslint-disable-next-line react-hooks/exhaustive-deps
	// }, [])

	return (
		<ThemeProvider theme={theme}>
			<GlobalStyles />
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
		</ThemeProvider>
	)
}

export default App
