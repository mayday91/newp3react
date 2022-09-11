import { useState, useEffect } from 'react'

import { useParams, useNavigate } from 'react-router-dom'
// useParams will allow us to see our parameters
// useNavigate will allow us to navigate to a specific page

import { Container, Card } from 'react-bootstrap'
import Button from '@mui/material/Button'

import LoadingScreen from '../shared/LoadingScreen'
import { getOneReview, updateReview, removeReview } from '../../api/reviews'
import messages from '../shared/AutoDismissAlert/messages'
import EditReviewModal from './EditReviewModal'
import NewCommentModal from '../comments/NewCommentModal'
import ShowComment from '../comments/ShowComment'
import Layout from '../shared/layout'
import './ReviewsShow.css'

// We need to get the pet's id from the parameters
// Then we need to make a request to the api
// Then we need to display the results in this component

// we'll use a style object to lay out the toy cards
const cardContainerLayout = {
    display: 'flex',
    justifyContent: 'center',
    textAlign: 'center',
    flexFlow: 'row wrap',
    margin: '10px',
    padding: '20px',
    // border: '5px solid darkgrey'
}

const reviewCard = {
    textAlign: "center",
    backgroundColor: "black",
    fontSize: "30px",
    fontFamily: "Times",
    width: "fit-content",
    color: "skyblue"
}


const ShowReview = (props) => {
    const [review, setReview] = useState(null)
    const [editModalShow, setEditModalShow] = useState(false)
    const [commentModalShow, setCommentModalShow] = useState(false)
    const [updated, setUpdated] = useState(false)

    const { id } = useParams()
    const navigate = useNavigate()
    // useNavigate returns a function
    // we can call that function to redirect the user wherever we want to

    const { user, msgAlert } = props
    console.log('user in props', user)
    console.log('the review in showReview', review)
    // destructuring to get the id value from our route parameters

    useEffect(() => {
        getOneReview(id)
            .then(res => setReview(res.data.review))
            .catch(err => console.log(err))
    }, [updated, id])

    
    const removeTheReview = () => {
        console.log('in removeTheReview', review)
        console.log('is this the id I need?', id)
        removeReview(user, review._id)
            // on success send a success message
            .then(() => {
                msgAlert({
                    heading: 'Success',
                    message: messages.removeReviewSuccess,
                    variant: 'success'
                })
            })
            .then(() => {navigate('/')})
            .catch(err => {                   
                msgAlert({
                    heading: 'Error removing review',
                    message: messages.removeReviewFailure,
                    variant: 'danger'
                })
            })
    }
    let commentCards
    if (review) {
        if (review.comments.length > 0) {
            commentCards = review.comments.map(comment => (
                <ShowComment 
                    key={comment._id}
                    comment={comment}
                    review={review}
                    user={user}
                    msgAlert={msgAlert}
                    triggerRefresh={() => setUpdated(prev => !prev)}
                />
            ))
        }
    }

    if (!review) {
        return <LoadingScreen />
    }

    return (
        <Layout>
            <div class="showExpenses">
                <div class="reviewCard">
            <Container style={cardContainerLayout}>
                <Card style={reviewCard}>
                    <Card.Header>{ review.title }<br></br>{ review.artist }</Card.Header>
                    <Card.Body>
                        <Card.Text>
                            <div><small>{ review.body }</small><br></br>by: { review.userName }</div>
                        </Card.Text>
                    </Card.Body>
                    <Card.Footer>
                        <Button onClick={() => setCommentModalShow(true)}
                            
                        >
                            Leave a comment on {review.title} !
                        </Button>
                        {
                            review.owner && user && review.owner._id === user.id 
                            ?
                            <>
                                <Button onClick={() => setEditModalShow(true)} 
                                    
                                >
                                    Edit Review
                                </Button>
                                
                                <Button onClick={() => removeTheReview()}
                                    
                                >
                                    Delete Review
                                </Button>
                            </>
                            :
                            null
                        }
                    </Card.Footer>
                </Card>
            </Container>
            </div>
            <Container >
            
                {commentCards}
            
            </Container>
            <EditReviewModal 
                user={user}
                review={review} 
                show={editModalShow} 
                updateReview={updateReview}
                msgAlert={msgAlert}
                triggerRefresh={() => setUpdated(prev => !prev)}
                handleClose={() => setEditModalShow(false)} 
            />
            <NewCommentModal 
                review={review}
                show={commentModalShow}
                user={user}
                msgAlert={msgAlert}
                triggerRefresh={() => setUpdated(prev => !prev)}
                handleClose={() => setCommentModalShow(false)} 
            />
            </div>
        </Layout>
    )
}

export default ShowReview