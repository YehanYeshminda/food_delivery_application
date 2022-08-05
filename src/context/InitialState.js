import { fetchUser } from '../utils/fethchLocalStorageData';

const userInfo = fetchUser();

export const InitialState = {
	user: userInfo,
};
