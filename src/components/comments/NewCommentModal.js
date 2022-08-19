import React, { useState } from 'react'
import { Modal } from 'react-bootstrap'
import CommentForm from '../shared/CommentForm'
import { createComment } from  '../../api/comments'

const NewCommentModal = (props) => {
  const { user, review, show, handleClose, msgAlert, triggerRefresh } = props
  const [comment, setComment] = useState({})

  const handleChange = (e) => {
    setComment(prevComment => {
      let value = e.target.value
      const name = e.target.name

      console.log('this is the input type', e.target.type)

      const updatedComment = {
        [name]: value
      }
      return {
        ...prevComment,
        ...updatedComment
      }
    })
  }
 
  
  const handleSubmit = (e) => {
    e.preventDefault()

    createComment(user, review._id, comment)
    // if we're successful in modal we want modal to close
    .then(() => handleClose())
    .then(() => {
      msgAlert({
        heading: 'Oh Yeah!',
        message: 'Great! They love your comment!',
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
          message: 'Something went wrong. Please try again',
          variant: 'danger'
        })
      )
  }

  return (
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton />

        
        <Modal.Body>
          <CommentForm 
            comment={comment}
            handleChange={handleChange}
            handleSubmit={handleSubmit}
            heading='Give the review a comment!'
          />
        </Modal.Body>
      </Modal>
    )
}

export default NewCommentModal