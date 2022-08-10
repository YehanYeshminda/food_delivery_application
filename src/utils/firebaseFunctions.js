// saving new items into firebase

import {
	collection,
	doc,
	getDocs,
	orderBy,
	query,
	setDoc,
} from 'firebase/firestore';
import { fireStoreDb } from '../firebase.config';

export const saveItem = async (data) => {
	// if the value is already there it will update it else it will save it with the data provided
	await setDoc(doc(fireStoreDb, 'foodItems', `${Date.now()}`), data, {
		merge: true,
	});
};

// get all the food data from the firebase
export const getAllFoodItems = async () => {
	const items = await getDocs(
		query(collection(fireStoreDb, 'foodItems'), orderBy('id', 'desc'))
	);

	return items.docs.map((doc) => doc.data());
};
