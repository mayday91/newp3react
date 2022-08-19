import React, { useState } from 'react'
import { Card, Button } from 'react-bootstrap'
import EditCommentModal from './EditCommentModal'
import { deleteComment } from '../../api/comments'

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
            <Card className="m-2">
                <Card.Header>{comment.userName}</Card.Header>
                <Card.Body>
                    <small>{comment.body}</small><br/>

                </Card.Body>
                <Card.Footer>
                    {
                        user && user.email === comment.userName
                        ?
                        <>
                            <Button 
                                variant="warning"
                                onClick={() => setEditModalShow(true)}
                            >
                                Edit Comment
                            </Button>
                            <Button 
                                onClick={() => destroyComment()} 
                                variant="danger"
                            >
                                Delete Comment
                            </Button>
                        </>
                        :
                        null
                    }
                </Card.Footer>
            </Card>
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