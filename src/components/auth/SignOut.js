import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import { signOut } from '../../api/auth'
import messages from '../shared/AutoDismissAlert/messages'

const SignOut = (props) => {
	// componentDidMount() {
	const { msgAlert, clearUser, user } = props

    const navigate = useNavigate()
	// 	signOut(user)
	// 		.finally(() =>
	// 			msgAlert({
	// 				heading: 'Signed Out Successfully',
	// 				message: messages.signOutSuccess,
	// 				variant: 'success',
	// 			})
	// 		)
	// 		.finally(() => history.push('/'))
	// 		.finally(() => clearUser())
	// }
    useEffect(() => {
		signOut(user)
			.finally(() =>
				msgAlert({
					heading: 'Signed Out Successfully',
					message: messages.signOutSuccess,
					variant: 'success',
				})
			)
			.finally(() => navigate('/'))
			.finally(() => clearUser())
    }, [])

	return ''
}

export default SignOut
