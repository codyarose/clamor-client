import React, { FC } from 'react'
import styled from 'styled-components'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Button from '@material-ui/core/Button'
import HomeIcon from '@material-ui/icons/Home'
import Notifications from '@material-ui/icons/Notifications'
import LogoutIcon from '@material-ui/icons/PowerSettingsNew'

import { RootState } from '../../redux/store'
import { logoutUser } from '../../redux/modules/user'
import TooltipButton from '../common/TooltipButton'
import AddPost from '../AddPost'

const Navbar: FC = () => {
	const { authenticated } = useSelector((state: RootState) => state.user)
	const dispatch = useDispatch()

	return (
		<AppBar position="sticky">
			<StyledToolbar>
				{authenticated ? (
					<>
						<StyledToolbarSection>
							<Link to="/">
								<TooltipButton title="Home">
									<HomeIcon />
								</TooltipButton>
							</Link>
							<AddPost />
						</StyledToolbarSection>
						<StyledToolbarSection>
							<TooltipButton
								title="Notifications"
								onClick={() => console.log('clicked')}
							>
								<Notifications />
							</TooltipButton>
							<TooltipButton
								title="Logout"
								onClick={() => dispatch(logoutUser())}
							>
								<LogoutIcon />
							</TooltipButton>
						</StyledToolbarSection>
					</>
				) : (
					<>
						<StyledToolbarSection>
							<Button
								color="inherit"
								component={Link}
								to="/login"
							>
								Login
							</Button>
							<Button
								color="inherit"
								component={Link}
								to="/signup"
							>
								Signup
							</Button>
						</StyledToolbarSection>
					</>
				)}
			</StyledToolbar>
		</AppBar>
	)
}

export default Navbar

const StyledToolbar = styled(Toolbar)`
	justify-content: space-between;
	a {
		color: inherit;
	}
`

const StyledToolbarSection = styled.div`
	/*  */
`
