import { fetchCartItems, fetchUser } from '../utils/fetchLocalStorageData';

const userInfo = fetchUser();
const cartInfo = fetchCartItems();

export const InitialState = {
	user: userInfo,
	foodItems: null,
	cartShow: false,
	cartItems: cartInfo,
};
