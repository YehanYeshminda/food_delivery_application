import { MdShoppingBasket } from 'react-icons/md';
import { motion } from 'framer-motion';
import { useEffect, useRef } from 'react';
import NotFoundImg from '../img/NotFound.svg';
import { useStateValue } from '../context/StateProvider';
import { actionType } from '../context/Reducer';
import { useState } from 'react';

const RowContainer = ({ flag, data, scrollValue }) => {
	const rowContainer = useRef();

	const [items, setItems] = useState([]);

	const [{ cartItems }, dispatch] = useStateValue();

	const addToCart = () => {
		dispatch({
			type: actionType.SET_CART_ITEMS,
			cartItems: items,
		});

		localStorage.setItem('cartItems', JSON.stringify(items));
	};

	useEffect(() => {
		rowContainer.current.scrollLeft += scrollValue;
	}, [scrollValue]);

	useEffect(() => {
		addToCart();
	}, [items]);

	return (
		<div
			ref={rowContainer}
			className={`w-full flex items-center gap-3  my-12 scroll-smooth ${
				flag
					? `overflow-x-scroll scrollbar-none`
					: `overflow-x-hidden flex-wrap justify-center`
			} `}
		>
			{data && data.length > 0 ? (
				data.map((item) => {
					const { id, calories, catergorie, imageUrl, price, qty, title } =
						item;

					return (
						<div
							className="w-275 h-[175px] min-w-[275px] md:w-300 md:min-w-[300px]  bg-cardOverlay rounded-lg py-2 px-4  my-12 backdrop-blur-lg hover:drop-shadow-lg flex flex-col items-center justify-evenly relative"
							key={id}
						>
							<div className="w-full flex items-center justify-between">
								<motion.div
									whileHover={{ scale: 1.2 }}
									className="w-40 h-40 -mt-8 drop-shadow-2xl"
								>
									<img
										src={imageUrl}
										alt="product"
										className="w-full h-full object-contain"
									/>
								</motion.div>

								<motion.div
									whileTap={{ scale: 0.75 }}
									className="w-8 h-8 rounded-full bg-red-700 flex items-center justify-center cursor-pointer hover:shadow-md"
									onClick={() => setItems([...cartItems, item])}
								>
									<MdShoppingBasket className="text-white" />
								</motion.div>
							</div>

							<div className="w-full flex flex-col items-end justify-end">
								<p className="text-textColor font-semibold text-base md:text-lg">
									{title}
								</p>
								<p className="mt-1 tetx-sm text-gray-500">
									{calories} Calories
								</p>
								<div className="flex items-center gap-8">
									<p className="text-lg text-headingColor font-semibold">
										<span className="text-sm text-red-500">$</span>
										{price}
									</p>
								</div>
							</div>
						</div>
					);
				})
			) : (
				<div className="w-full flex flex-col items-center justify-center">
					<img src={NotFoundImg} className="h-340" alt="not found" />
					<p className="text-xl text-headingColor font-semibold my-2">
						Items not Available
					</p>
				</div>
			)}
		</div>
	);
};

export default RowContainer;
