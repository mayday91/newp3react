import React, { useState } from 'react'
import { Modal } from 'react-bootstrap'
import CommentForm from '../shared/CommentForm'
import { updateComment } from '../../api/comments'


const EditCommentModal = (props) => {
    const { 
        user, review, show, handleClose, msgAlert, triggerRefresh
    } = props

    const [comment, setComment] = useState(props.comment)

    const handleChange = (e) => {
        setComment(prevComment => {
            let value = e.target.value
            const name = e.target.name

            // console.log('this is the input type', e.target.type)

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
        // e equals the event
        e.preventDefault()

        updateComment(user, review._id, comment)
            // if we're successful in the modal, we want the modal to close
            .then(() => handleClose())
            // send a success message to the user
            .then(() => {
                msgAlert({
                    heading: 'Oh Yeah!',
                    message: 'Great! The comment will be read!',
                    variant: 'success'
                })
            })
            .then(() => triggerRefresh())
            // if there is an error, tell the user about it
            .catch(() => 
                msgAlert({
                    heading: 'Oh No!',
                    message: 'Something went wrong, please try again',
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
                    heading="Update this comment!"
                />
            </Modal.Body>
        </Modal>
    )
}

export default EditCommentModal