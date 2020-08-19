import React from 'react'
import { Redirect, Route } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { RootState } from '../../redux/store'

const AuthRoute = (props: any) => {
	const { authenticated } = useSelector((state: RootState) => state.user)

	if (authenticated) return <Redirect to="/" />

	return <Route {...props} />
}

export default AuthRoute
