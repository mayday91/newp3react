import ReviewForm from "../shared/ReviewForm";
import { createReview } from "../../api/reviews"
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { createReviewSuccess, createReviewFailure } from  '../shared/AutoDismissAlert/messages'

const CreateReview = (props) => {
  console.log('these are the props in Create Review\n', props)
  const { user, msgAlert } = props
  const navigate = useNavigate()
  const [review, setReview] = useState({
    title: '',
    body: ''
  })

  console.log('this is review in createReview', review)

 

  const handleChange = (e) => {
    setReview(prevReview => {
      let updatedValue = e.target.value
      let updatedTitle = e.target.title
      const updatedName = e.target.name

      console.log('this is the input type', e.target.type)


      const updatedReview = {
        [updatedName]: updatedValue,
        [updatedTitle]: updatedValue
      }
      return {
        ...prevReview,
        ...updatedReview
      }
    })
  }
  // add handleSubmit here that makes API request and handles the response
  const handleSubmit = (e) => {
    e.preventDefault()

    createReview(user, review)
    // if we're successful, navigate to show page for new pet
    // send success message to user
      .then(res => {navigate(`/reviews/${res.data.review.id}`)})
      .then(() => {
        msgAlert({
          heading: 'Oh Yeah!',
          message: createReviewSuccess,
          variant: 'success'
        })
      })
    // if error tell user
      .catch(() => 
        msgAlert({
          heading: 'Oh No!',
          message: createReviewFailure,
          variant: 'danger'
        })
      )
  }

  return <ReviewForm 
  review={ review } 
  handleChange={ handleChange }
  handleSubmit={ handleSubmit }
  heading='Add a new review!'
  />
}

export default CreateReview