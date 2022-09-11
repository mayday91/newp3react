import React, { useState } from 'react'
import Button from '@mui/material/Button'
import EditCommentModal from './EditCommentModal'
import { deleteComment } from '../../api/comments'
import './ShowComment.css'

const ShowComment = (props) => {
    // destructure some props
    const { comment, review, user, msgAlert, triggerRefresh } = props

    // here's where we'll put a hook to open the edit toy modal when we get there
    const [editModalShow, setEditModalShow] = useState(false)

    // calls this to destroy a toy
    const destroyComment = () => {
        deleteComment(user, review._id, comment._id)
            .then(() => 
                msgAlert({
                    heading: 'Comment Deleted',
                    message: 'Bye bye comment!',
                    variant: 'success'
                }))
            .then(() => triggerRefresh())
            .catch(() => 
                msgAlert({
                    heading: 'Oh no!',
                    message: 'Something went wrong!',
                    variant: 'danger'
                }))
    }

    return (
        <>
            <div className="commentCard">
                <div className="commentBody">
                    <h4>{comment.userName}</h4>
                    <br></br>
                        <p>{comment.body}</p><br/>

                </div>
                <div className='buttons'>
                    {
                        user && user.email === comment.userName
                        ?
                        <>
                            <Button 
                                onClick={() => setEditModalShow(true)}
                            >
                                Edit
                            </Button>
                            <Button 
                                onClick={() => destroyComment()} 
                            >
                                Delete
                            </Button>
                        </>
                        :
                        null
                    }
                </div>
            </div>
            
            <EditCommentModal
                user={user}
                review={review}
                comment={comment}
                show={editModalShow}
                handleClose={() => setEditModalShow(false)}
                msgAlert={msgAlert}
                triggerRefresh={triggerRefresh}
            />
        </>
    )
}

export default ShowComment