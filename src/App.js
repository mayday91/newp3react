// import React, { Component, Fragment } from 'react'
import React, { useState, Fragment } from 'react'
import { Route, Routes } from 'react-router-dom'
import { v4 as uuid } from 'uuid'

// import AuthenticatedRoute from './components/shared/AuthenticatedRoute'
import AutoDismissAlert from './components/shared/AutoDismissAlert/AutoDismissAlert'
import Header from './components/shared/Header'
import SignUp from './components/auth/SignUp'
import SignIn from './components/auth/SignIn'
import SignOut from './components/auth/SignOut'
import ChangePassword from './components/auth/ChangePassword'

const App = (props) => {

	// constructor(props) {
	// 	super(props)
	// 	this.state = {
	// 		user: null,
	// 		msgAlerts: [],
	// 	}
	// }
  const [user, setUser] = useState(null)
  const [msgAlerts, setMsgAlerts] = useState([])
	// setUser = (user) => this.setState({ user })

	// clearUser = () => this.setState({ user: null })
  const clearUser = () => setUser(null)

	const deleteAlert = (id) => {
		setMsgAlerts((prevState) => {
			return (prevState.filter((msg) => msg.id !== id) )
		})
	}

	const msgAlert = ({ heading, message, variant }) => {
		const id = uuid()
		setMsgAlerts((prevState) => {
			return (
				[{...prevState}, { heading, message, variant, id }]
      )
		})
	}

		return (
			<Fragment>
				<Header user={user} />
				{msgAlerts.map((msgAlert) => (
					<AutoDismissAlert
						key={msgAlert.id}
						heading={msgAlert.heading}
						variant={msgAlert.variant}
						message={msgAlert.message}
						id={msgAlert.id}
						deleteAlert={deleteAlert}
					/>
				))}
				<Routes>
					<Route
						path='/sign-up'
						element={
							<SignUp msgAlert={msgAlert} setUser={setUser} />
            }
					/>
					<Route
						path='/sign-in'
						element={
							<SignIn msgAlert={msgAlert} setUser={setUser} />
            }
					/>
					<Route
						user={user}
						path='/sign-out'
						element={
							<SignOut
								msgAlert={msgAlert}
								clearUser={clearUser}
								user={user}
							/>
						}
					/>
					<Route
						user={user}
						path='/change-password'
						element={
							<ChangePassword msgAlert={msgAlert} user={user} />
						}
					/>
				</Routes>
			</Fragment>
		)
}

export default App
