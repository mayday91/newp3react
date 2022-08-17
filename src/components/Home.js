import ReviewsIndex from './reviews/ReviewsIndex'

const Home = (props) => {
	// const { msgAlert, user } = props
	console.log('props in home', props)

	const { msgAlert } = props
	return (
		<>
			<ReviewsIndex msgAlert={ msgAlert }/>
		</>
	)
}

export default Home
