export const actionType = {
	SET_USER: 'SET_USER',
	SET_FOOD_ITEMS: 'SET_FOOD_ITEMS',
	SET_CART_SHOW: 'SET_CART_SHOW',
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

		// toggling the cart to be shown and to be now shown
		case actionType.SET_CART_SHOW:
			return {
				...state,
				cartShow: action.cartShow,
			};

		default:
			return state;
	}
};

export default reducer;
