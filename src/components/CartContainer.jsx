import { MdOutlineKeyboardBackspace } from 'react-icons/md';
import { motion } from 'framer-motion';
import { RiRefreshFill } from 'react-icons/ri';
import { BiMinus, BiPlus } from 'react-icons/bi';
import { useStateValue } from '../context/StateProvider';
import { actionType } from '../context/Reducer';
import EmptyCart from '../img/emptyCart.svg';

const CartContainer = () => {
	const [{ cartShow, cartItems, user }, dispatch] = useStateValue();

	const showCart = () => {
		dispatch({
			type: actionType.SET_CART_SHOW,
			cartShow: !cartShow,
		});
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
						cartItems.map((item) => {
							const { id, title, imageUrl, price, qty } = item;

							return (
								<div
									className="w-full p-1 px-2 rounded-lg bg-cartItem flex items-center gap-2"
									key={id}
								>
									<img
										src={imageUrl}
										className="w-20 h-20 max-w-[60px] rounded-full object-contain"
										alt=""
									/>

									{/* items names section set */}
									<div className="flex flex-col gap-2">
										<p className="text-base text-gray-50">{title}</p>
										<p className="text-sm block text-gray-300 font-semibold">
											${price}
										</p>
									</div>

									{/* button section */}

									<div className="group flex items-center gap-2 ml-auto cursor-pointer">
										<motion.div whileTap={{ scale: 0.75 }} className="">
											<BiMinus />
										</motion.div>

										<p className="w-5 h-5 rounded-sm bg-cartBg text-gray-50 flex items-center justify-center">
											{qty}
										</p>

										<motion.div whileTap={{ scale: 0.75 }} className="">
											<BiPlus />
										</motion.div>
									</div>
								</div>
							);
						})}
				</div>

				{/* cart total section */}
				{cartItems && cartItems.length > 0 ? (
					<div className="w-full flex-1 bg-cartTotal rounded-t-[2rem] flex flex-col items-center justify-evenly px-8 py-2">
						<div className="w-full flex items-center justify-between">
							<p className="text-gray-400 text-lg">Sub Total</p>
							<p className="text-gray-400 text-lg">$ 3.3</p>
						</div>

						<div className="w-full flex items-center justify-between">
							<p className="text-gray-400 text-lg">Delivery</p>
							<p className="text-gray-400 text-lg">$ 2.3</p>
						</div>

						<div className="w-full border-b border-gray-600 my-2"></div>

						<div className="w-full flex items-center justify-between">
							<p className="text-gray-200 text-xl font-semibold">Total</p>
							<p className="text-gray-200 text-xl font-semibold">$ 2.5</p>
						</div>

						{user && (
							<motion.button
								whileTap={{ scale: 0.75 }}
								type="button"
								className="w-full p-2 rounded-full bg-orange-500 text-gray-50 text-lg my-2 hover:shadow-lg"
							>
								Check Out
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
