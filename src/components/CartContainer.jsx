import { MdOutlineKeyboardBackspace } from 'react-icons/md';
import { motion } from 'framer-motion';
import { RiRefreshFill } from 'react-icons/ri';
import { useStateValue } from '../context/StateProvider';
import { actionType } from '../context/Reducer';
import EmptyCart from '../img/emptyCart.svg';
import CartItemComp from './CartItemComp';
import { useEffect, useState } from 'react';

const CartContainer = () => {
	const [{ cartShow, cartItems, user }, dispatch] = useStateValue();
	const [flag, setFlag] = useState(1);
	const [tot, setTot] = useState(0);

	const showCart = () => {
		dispatch({
			type: actionType.SET_CART_SHOW,
			cartShow: !cartShow,
		});
	};

	useEffect(() => {
		let totalPrice = cartItems.reduce(function (accumulator, item) {
			return accumulator + item.qty * item.price;
		}, 0);
		setTot(totalPrice);
		console.log(tot);
	}, [tot, flag]);

	const clearCart = () => {
		dispatch({
			type: actionType.SET_CART_ITEMS,
			cartItems: [],
		});

		localStorage.setItem('cartItems', JSON.stringify([]));
	};

	return (
		<motion.div
			initial={{ opacity: 0, x: 200 }}
			animate={{ opacity: 1, x: 0 }}
			exit={{ opacity: 0, x: 200 }}
			className="fixed top-0 right-0 w-full md:w-375 h-[100vh] bg-white drop-shadow-md flex flex-col z-101"
		>
			<div className="w-full flex items-center justify-between p-4 cursor-pointer">
				<motion.div whileTap={{ scale: 0.75 }} className="">
					<MdOutlineKeyboardBackspace
						className="text-textColor text-3xl"
						onClick={showCart}
					/>
				</motion.div>
				<p className="text-textColor text-lg font-semibold">Cart</p>
				<motion.p
					whileTap={{ scale: 0.75 }}
					className="flex items-center gap-2 p-1 px-2 my-2 bg-gray-100 rounded-md hover:shadow-md  cursor-pointer text-textColor text-base"
					onClick={clearCart}
				>
					Clear Cart <RiRefreshFill />
				</motion.p>
			</div>

			{/* motion section */}
			<div className="w-full h-full bg-cartBg rounded-t-[2rem] flex flex-col">
				{/* cart item section */}
				<div className="w-full h-340 md:h-42 px-6 py-10 flex flex-col gap-3 overflow-y-scroll scrollbar-none">
					{/* cart Item */}
					{cartItems &&
						cartItems.map((item) => (
							<CartItemComp
								key={item.id}
								item={item}
								setFlag={setFlag}
								flag={flag}
							/>
						))}
				</div>

				{/* cart total section */}
				{cartItems && cartItems.length > 0 ? (
					<div className="w-full flex-1 bg-cartTotal rounded-t-[2rem] flex flex-col items-center justify-evenly px-8 py-2">
						<div className="w-full flex items-center justify-between">
							<p className="text-gray-400 text-lg">Sub Total</p>
							<p className="text-gray-400 text-lg">$ {tot}</p>
						</div>

						<div className="w-full flex items-center justify-between">
							<p className="text-gray-400 text-lg">Delivery</p>
							<p className="text-gray-400 text-lg">$ 2.3</p>
						</div>

						<div className="w-full border-b border-gray-600 my-2"></div>

						<div className="w-full flex items-center justify-between">
							<p className="text-gray-200 text-xl font-semibold">Total</p>
							<p className="text-gray-200 text-xl font-semibold">
								${tot + 2.3}
							</p>
						</div>

						{user ? (
							<motion.button
								whileTap={{ scale: 0.75 }}
								type="button"
								className="w-full p-2 rounded-full bg-orange-500 text-gray-50 text-lg my-2 hover:shadow-lg"
							>
								Check Out
							</motion.button>
						) : (
							<motion.button
								whileTap={{ scale: 0.75 }}
								type="button"
								className="w-full p-2 rounded-full bg-orange-500 text-gray-50 text-lg my-2 hover:shadow-lg"
							>
								Login to Check out
							</motion.button>
						)}
					</div>
				) : (
					<div className="w-full h-full flex flex-col items-center justify-center gap-6b bg-cartBg">
						<img src={EmptyCart} className="w-300" alt="" />
						<p className="text-xl text-white font-semibold mt-4">
							Add some items to your cart
						</p>
					</div>
				)}
			</div>
		</motion.div>
	);
};

export default CartContainer;
