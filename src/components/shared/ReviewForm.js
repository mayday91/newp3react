import { 
  Form,
  Button, 
  Container
} from 'react-bootstrap'

const ReviewForm = (props) => {
  const { review, handleChange, heading, handleSubmit } = props
  return (
    <Container className='justify-content-center'>
      <h3>{heading}</h3>
      <Form onSubmit={handleSubmit}>
        <Form.Label htmlFor="title">Title:</Form.Label>
        <Form.Control
          placeholder="What is the album's name?"
          name="name"
          id="name"
          value={ review.title }
          onChange={ handleChange }
        />
        <Form.Label htmlFor="body">Review:</Form.Label>
        <Form.Control
          placeholder="What did you think of this album?"
          name="body"
          id="body"
          value={ review.body }
          onChange={ handleChange }
        />
        <Button type="submit">Submit</Button>
      </Form>
    </Container>
  )
}

export default ReviewForm