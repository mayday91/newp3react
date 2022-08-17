import React, { useState } from 'react'
import { Form, Container, Button } from 'react-bootstrap'

const CommentForm = (props) => {
  const {comment, handleChange, handleSubmit, heading} = props

  return(
    <Container className='justify-content-center'>
    <h3>{heading}</h3>
    <Form onSubmit={handleSubmit}>
      <Form.Label htmlFor="body">Comment:</Form.Label>
      <Form.Control
        placeholder="What is your opinion?"
        name="body"
        id="body"
        value={ comment.body }
        onChange={ handleChange }
      />
      <Button type="submit">Submit</Button>
    </Form>
  </Container>
    )
}

export default CommentForm