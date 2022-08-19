import apiUrl from '../apiConfig'
import axios from 'axios'

// CREATE
export const createComment = (user, reviewId, newComment) => {
  console.log('this is the new toy in createComment', newComment)
  console.log('this is user in createComment', user)
	return axios({
		url: `${apiUrl}/comments/${reviewId}`,
		method: 'POST',
		headers: {
			Authorization: `Token token=${user.token}`,
		},
		data: {
			comment: newComment,
		},
	})
}

// UPDATE
export const updateComment = (user, reviewId, updatedComment) => {
  console.log('this is updatedComment', updatedComment)
  console.log('this is user in updatedComment', user)
	return axios({
		url: `${apiUrl}/comments/${reviewId}/${updatedComment.id}`,
		method: 'PATCH',
		headers: {
			Authorization: `Token token=${user.token}`,
		},
		data: {
			comment: updatedComment,
		},
	})
}

// DELETE
export const deleteComment = (user, reviewId, commentId) => {
	return axios({
		url: `${apiUrl}/comments/${reviewId}/${commentId}`,
		method: 'DELETE',
		headers: {
			Authorization: `Token token=${user.token}`,
		}
	})
}