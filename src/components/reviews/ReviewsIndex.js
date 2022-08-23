import { useState, useEffect } from 'react'
import Card from 'react-bootstrap/card'
import { Link } from 'react-router-dom'
import LoadingScreen from '../shared/LoadingScreen'
import { getAllReviews } from '../../api/reviews'
import { messages } from '../shared/AutoDismissAlert/messages'
import Layout from './../shared/layout'

//style for our card container
const cardContainerStyle = {
  display: 'flex',
  flexFlow: 'row wrap',
  justifyContent: 'center',
  padding: '10px'
}

const reviewCard = {
  textAlign: "center",
  backgroundColor: "darkblue",
  color:'grey',
  width: '30%', 
  margin: '10px',
  border: '20px solid skyBlue',
  borderRadius: '200px',
}

const ReviewsIndex = (props) => {
  const [reviews, setReviews] = useState(null)
  const [error, setError] = useState(false)
  const { msgAlert } = props
  
useEffect(() => {
  getAllReviews()
    .then(res => setReviews(res.data.reviews))
    .catch(err => {msgAlert ({
      heading: 'error getting reviews',
      message: messages.getReviewsFailure,
      variant: 'danger',
      })
    setError(true)
    })
}, [msgAlert])

  if (error) {
    return <p>Error!</p>
  }

  // if reviews havent been loaded yet, show loading message
  if (!reviews) {
    return <LoadingScreen />
  } else if (reviews.length === 0) {
    return <p>No reviews yet.</p>
  }

  const reviewCards = reviews.map(review => (
      <Card style={reviewCard} key={ review.id }>
        <Card.Header>{review.title}</Card.Header>
        <Card.Body>
        {review.artist}
          <Card.Text>
            <Link to={`/reviews/${review._id}`}>Read it!</Link><br></br>
            {review.userName} wrote it ;)
          </Card.Text>
        </Card.Body>
      </Card>
    ))
  return (
    <Layout>
      <div style={ cardContainerStyle }>
        { reviewCards }
      </div>
    </Layout>
    )
}

export default ReviewsIndex 