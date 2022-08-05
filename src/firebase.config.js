import { getApp, getApps, initializeApp } from 'firebase/app';
import { Firestore, getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

// Your web app's Firebase configuration
const firebaseConfig = {
	apiKey: 'AIzaSyBvfeIgclaehhVJvUKRvIsxQwDkRz5K_II',
	authDomain: 'food-delivery-applicatio-16952.firebaseapp.com',
	databaseURL:
		'https://food-delivery-applicatio-16952-default-rtdb.firebaseio.com',
	projectId: 'food-delivery-applicatio-16952',
	storageBucket: 'food-delivery-applicatio-16952.appspot.com',
	messagingSenderId: '366919523429',
	appId: '1:366919523429:web:ff785d44f2038ef2deba8c',
};

const app = getApps.length > 0 ? getApp() : initializeApp(firebaseConfig);

const fireStoreDb = getFirestore(app);

const storage = getStorage(app);

export { app, fireStoreDb, storage };
