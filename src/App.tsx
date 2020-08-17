import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { ThemeProvider } from 'styled-components'
import jwtDecode from 'jwt-decode'
import { useDispatch } from 'react-redux'

import { logoutUser, getUserData, setUnauthed } from './redux/modules/user'
import theme from './theme'
import { GlobalStyles } from './theme/globals'
import { Home } from './pages/Home'
import { Login } from './pages/Login'
import { Signup } from './pages/Signup'
import Navbar from './components/Navbar'
import { Container } from './components/common/Container'
import axios from 'axios'

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
						<Route exact path="/login" component={Login} />
						<Route exact path="/signup" component={Signup} />
					</Switch>
				</Container>
			</Router>
		</ThemeProvider>
	)
}

export default App
