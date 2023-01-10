import { useState, useEffect } from 'react'
import { Card } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import LoadingScreen from '../shared/LoadingScreen'
import { getAllReviews } from '../../api/reviews'
import Layout from './../shared/layout'
import './ReviewsIndex.css'

//style for our card container
const cardContainerStyle = {
  display: 'flex',
  flexWrap: 'wrap',
  flexDirection: 'row',
  justifyContent: 'space-around',
  padding: '10px',
  margin: '20px'
}

const reviewCard = {
  textAlign: "center",
  backgroundColor: "white",
  color:'darkGrey',
  width: '300px', 
  margin: '10px',
  border: '5px solid skyBlue',
  borderRadius: '2px',
}

const ReviewsIndex = (props) => {
  const [reviews, setReviews] = useState(null)
  const [error] = useState(false)
  
useEffect(() => {
  getAllReviews()
  .then(res => setReviews(res.data.reviews))
  .catch('error in useeffect reviews index', console.log(error))
})

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
      <Card style={reviewCard} key={ review._id }>
        <Card.Body>
        {review.title}
        <br></br>
        {review.artist}
          <Card.Text>
            <Link to={`/reviews/${review._id}`}>Read it!</Link><br></br>
            {review.userName}
          </Card.Text>
        </Card.Body>
      </Card>
    ))
  return (
    <Layout>
      <div style={cardContainerStyle} >
        { reviewCards }
      </div>
    </Layout>
    )
}

export default ReviewsIndex 