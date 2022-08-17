import React, { useState } from 'react'
import { Modal } from 'react-bootstrap'
import ReviewForm from '../shared/ReviewForm'
import { updateReviewSuccess, updateReviewFailure } from  '../shared/AutoDismissAlert/messages'

const EditReviewModal = (props) => {
  const { user, show, handleClose, updateReview, msgAlert, triggerRefresh } = props
  const [review, setReview] = useState(props.review)

  const handleChange = (e) => {
    setReview(prevReview => {
      let updatedValue = e.target.value
      const updatedName = e.target.name

      console.log('this is the input type', e.target.type)

      if(e.target.type === 'number'){
        // this is looking at input type and changing it from default, which is a string, into an actual number
        updatedValue = parseInt(e.target.value)
      }

      const updatedReview = {
        [updatedName]: updatedValue
      }
      return {
        ...prevReview,
        ...updatedReview
      }
    })
  }
 
  
  const handleSubmit = (e) => {
    e.preventDefault()

    updateReview(user, review)
    // if we're successful in modal we want modal to close
    .then(() => handleClose())
    .then(() => {
      msgAlert({
        heading: 'Oh Yeah!',
        message: updateReviewSuccess,
        variant: 'success'
      })
    })
    // if everything successful we need to trigger refresh for show page
    // this is that setUpdated function in showPet component
    // updated is in ShowPet's useEffect's dependancy array
    // changes to the updated boolean cause ShowPet's useEffect to run again
    .then(() => triggerRefresh())
    // if error tell user
      .catch(() => 
        msgAlert({
          heading: 'Oh No!',
          message: updateReviewFailure,
          variant: 'danger'
        })
      )
  }

  return (
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton />

        
        <Modal.Body>
          <ReviewForm 
            review={review}
            handleChange={handleChange}
            handleSubmit={handleSubmit}
            heading='Update Review'
          />
        </Modal.Body>
      </Modal>
    )
}

export default EditReviewModal