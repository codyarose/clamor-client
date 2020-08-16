import React, { FC } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Button from '@material-ui/core/Button'

import { RootState } from '../../redux/reducers/rootReducer'

const Navbar: FC = () => {
	const { authenticated } = useSelector((state: RootState) => state.user)

	return (
		<AppBar position="sticky">
			<Toolbar>
				<Button color="inherit" component={Link} to="/">
					Home
				</Button>
				{!authenticated && (
					<>
						<Button color="inherit" component={Link} to="/login">
							Login
						</Button>
						<Button color="inherit" component={Link} to="/signup">
							Signup
						</Button>
					</>
				)}
			</Toolbar>
		</AppBar>
	)
}

export default Navbar
