import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const getRecommendation = (ingredients, filter) => {
	return async dispatch => {
		fetch("/recipes/recommendation", {
			method: 'POST',
			body: JSON.stringify({ingredients: ingredients, filter: filter}),
			headers: {'Content-Type': 'application/json'},
		})
			.then((res) => res.json())
			.then((res) => {
				if (res.count === 0 || res.status === "error") {
					toast.info("No recipe found with the selected filters and ingredients. Try again!", {
						position: toast.POSITION.TOP_CENTER,
						autoClose: 4000,
					});
				}
				dispatch(newRecommendation(res));
			})
	}
};

export const newRecommendation = (recommendation) => {
	return {
		type: 'NEW_RECOMMENDATION',
		payload: recommendation
	};
};

export const clearRecommendation = () => {
	return {
		type: 'CLEAR_RECOMMENDATION',
	};
};
