export const actionType = {
	SET_USER: 'SET_USER',
	SET_FOOD_ITEMS: 'SET_FOOD_ITEMS',
};

const reducer = (state, action) => {
	// setting the user gotten from the firestore / google
	switch (action.type) {
		case actionType.SET_USER:
			return {
				...state,
				user: action.user,
			};
		// setting the context for the food items gotten from the firestore
		case actionType.SET_FOOD_ITEMS:
			return {
				...state,
				foodItems: action.foodItems,
			};

		default:
			return state;
	}
};

export default reducer;
