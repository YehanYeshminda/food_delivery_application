import { Header, MainContainer, LoadCreateContainer } from './components';
import { Route, Routes } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { useStateValue } from './context/StateProvider';
import { getAllFoodItems } from './utils/firebaseFunctions';
import { useEffect } from 'react';
import { actionType } from './context/Reducer';

function App() {
	const [{ foodItems }, dispatch] = useStateValue();

	const fetchFireStoreData = async () => {
		await getAllFoodItems().then((data) => {
			dispatch({
				type: actionType.SET_FOOD_ITEMS,
				foodItems: data,
			});
		});
	};

	// calling in the function when the page loads to get all the details from the firebase
	useEffect(() => {
		fetchFireStoreData();
	}, []);

	return (
		<AnimatePresence exitBeforeEnter>
			<div className="w-screen h-auto flex flex-col bg-primary">
				<Header />

				<main className="mt-14 md:mt-20 px-4 md:px-16 py-4 w-full">
					<Routes>
						<Route path="/*" element={<MainContainer />} />
						<Route path="/createItem" element={<LoadCreateContainer />} />
					</Routes>
				</main>
			</div>
		</AnimatePresence>
	);
}

export default App;
