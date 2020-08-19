import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { ThemeProvider } from 'styled-components'
import jwtDecode from 'jwt-decode'
import axios from 'axios'

import { logoutUser, getUserData, setUnauthed } from './redux/modules/user'
import theme from './theme'
import { GlobalStyles } from './theme/globals'
import { Home } from './pages/Home'
import { Login } from './pages/Login'
import { Signup } from './pages/Signup'
import Navbar from './components/Navbar'
import { Container } from './components/common/Container'
import AuthRoute from './components/common/AuthRoute'

const App = () => {
	const dispatch = useDispatch()

	const token = localStorage.FBIdToken
	if (token) {
		const decodedToken = jwtDecode<{ exp: number }>(token)
		if (decodedToken.exp * 1000 < Date.now()) {
			dispatch(logoutUser())
			window.location.href = '/login'
		} else {
			dispatch(setUnauthed())
			axios.defaults.headers.common['Authorization'] = token
			dispatch(getUserData())
		}
	}

	return (
		<ThemeProvider theme={theme}>
			<GlobalStyles />
			<Router>
				<Navbar />
				<Container>
					<Switch>
						<Route exact path="/" component={Home} />
						<AuthRoute exact path="/login" component={Login} />
						<AuthRoute exact path="/signup" component={Signup} />
					</Switch>
				</Container>
			</Router>
		</ThemeProvider>
	)
}

export default App
