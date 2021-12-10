import React, { Component, Fragment } from 'react'
import { Route, Routes } from 'react-router-dom'
import { v4 as uuid } from 'uuid'

// import AuthenticatedRoute from './components/shared/AuthenticatedRoute'
import AutoDismissAlert from './components/shared/AutoDismissAlert/AutoDismissAlert'
import Header from './components/shared/Header'
import SignUp from './components/auth/SignUp'
import SignIn from './components/auth/SignIn'
import SignOut from './components/auth/SignOut'
import ChangePassword from './components/auth/ChangePassword'

class App extends Component {
	constructor(props) {
		super(props)
		this.state = {
			user: null,
			msgAlerts: [],
		}
	}

	setUser = (user) => this.setState({ user })

	clearUser = () => this.setState({ user: null })

	deleteAlert = (id) => {
		this.setState((state) => {
			return { msgAlerts: state.msgAlerts.filter((msg) => msg.id !== id) }
		})
	}

	msgAlert = ({ heading, message, variant }) => {
		const id = uuid()
		this.setState((state) => {
			return {
				msgAlerts: [...state.msgAlerts, { heading, message, variant, id }],
			}
		})
	}

	render() {
		const { msgAlerts, user } = this.state

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
						deleteAlert={this.deleteAlert}
					/>
				))}
				<Routes>
					<Route
						path='/sign-up'
						element={
							<SignUp msgAlert={this.msgAlert} setUser={this.setUser} />
            }
					/>
					<Route
						path='/sign-in'
						element={
							<SignIn msgAlert={this.msgAlert} setUser={this.setUser} />
            }
					/>
					<Route
						user={user}
						path='/sign-out'
						render={() => (
							<SignOut
								msgAlert={this.msgAlert}
								clearUser={this.clearUser}
								user={user}
							/>
						)}
					/>
					<Route
						user={user}
						path='/change-password'
						render={() => (
							<ChangePassword msgAlert={this.msgAlert} user={user} />
						)}
					/>
				</Routes>
			</Fragment>
		)
	}
}

export default App
