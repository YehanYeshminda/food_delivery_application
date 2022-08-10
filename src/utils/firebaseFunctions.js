// saving new items into firebase

import { doc, setDoc } from 'firebase/firestore';
import { fireStoreDb } from '../firebase.config';

export const saveItem = async (data) => {
	// if the value is already there it will update it else it will save it
	await setDoc(
		doc(fireStoreDb, 'foodItems', `${Date.now()}`, data, { merge: true })
	);
};
