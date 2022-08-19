import { useState, useEffect } from 'react'
import Card from 'react-bootstrap/card'
import { Link } from 'react-router-dom'
import LoadingScreen from '../shared/LoadingScreen'
import { getAllReviews } from '../../api/reviews'
import { messages } from '../shared/AutoDismissAlert/messages'


//style for our card container
const cardContainerStyle = {
  display: 'flex',
  flexFlow: 'row wrap',
  justifyContent: 'center',
  padding: '10px'
}

// pets index should make a request to the API to get all pets and then display them 
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
      <Card style={{ width: '30%', margin: '10px'}} key={ review.id }>
        <Card.Header>{review.title}</Card.Header>
        <Card.Body>
          <Card.Text>
            <Link to={`/reviews/${review._id}`}>View {review.title} Review</Link>
          </Card.Text>
        </Card.Body>
      </Card>
    ))
  return (
      <div style={ cardContainerStyle }>
        { reviewCards }
      </div>
    )
}

export default ReviewsIndex 