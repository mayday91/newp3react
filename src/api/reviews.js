import apiUrl from '../apiConfig'
import axios from 'axios'

// READ - INDEX
export const getAllReviews = () => {
  return axios(`${apiUrl}/reviews`)
}

// READ - SHOW
export const getOneReview = (id) => {
  return axios(`${apiUrl}/reviews/${id}`)
}

// CREATE
export const createReview = (user, newReview) => {
	return axios({
		url: apiUrl + '/reviews',
		method: 'POST',
		headers: {
			Authorization: `Token token=${user.token}`,
		},
		data: {
			review: newReview,
		},
	})
}

// UPDATE
export const updateReview = (user, updatedReview) => {
	return axios({
		url: `${apiUrl}/reviews/${updatedReview.id}`,
		method: 'PATCH',
		headers: {
			Authorization: `Token token=${user.token}`,
		},
		data: {
			pet: updatedReview,
		},
	})
}

// DELETE
export const removeReview = (user, reviewId) => {
	return axios ({
		url: `${apiUrl}/reviews/${reviewId}`,
		method: 'DELETE',
		headers: {
			Authorization: `Token token=${user.token}`
		}
	})
}