import { BiMinus, BiPlus } from 'react-icons/bi';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { useStateValue } from '../context/StateProvider';
import { actionType } from '../context/Reducer';

const CartItemComp = ({ item, setFlag, flag }) => {
	let items = [];
	const [qty, setQty] = useState(item.qty);
	const [{ foodItems, cartItems }, dispatch] = useStateValue();

	const cartDipatch = () => {
		localStorage.setItem('cartItems', JSON.stringify(items));
		dispatch({
			type: actionType.SET_CART_ITEMS,
			cartItems: items,
		});
	};

	const updateQtyCart = (action, id) => {
		if (action === 'add') {
			setQty(qty + 1);
			cartItems.map((ele) => {
				if (ele.id === id) {
					ele.qty += 1;
					setFlag(flag + 1);
				}
			});
			cartDipatch();
		} else {
			if (qty === 1) {
				items = cartItems.filter((item) => item.id !== id);
				cartDipatch();
			} else {
				setQty(qty - 1);
				cartItems.map((item) => {
					if (item.id === id) {
						item.qty -= 1;
						setFlag(flag + 1);
					}
				});
				cartDipatch();
			}
		}
	};

	useEffect(() => {
		items = cartItems;
	}, [qty, items]);

	return (
		<div className="w-full p-1 px-2 rounded-lg bg-cartItem flex items-center gap-2">
			<img
				src={item.imageUrl}
				className="w-20 h-20 max-w-[60px] rounded-full object-contain"
				alt=""
			/>

			{/* items names section set */}
			<div className="flex flex-col gap-2">
				<p className="text-base text-gray-50">{item.title}</p>
				<p className="text-sm block text-gray-300 font-semibold">
					${item.price * qty}
				</p>
			</div>

			{/* button section */}

			<div className="group flex items-center gap-2 ml-auto cursor-pointer">
				<motion.div
					whileTap={{ scale: 0.75 }}
					onClick={() => updateQtyCart('remove', item.id)}
					className=""
				>
					<BiMinus />
				</motion.div>

				<p className="w-5 h-5 rounded-sm bg-cartBg text-gray-50 flex items-center justify-center">
					{qty}
				</p>

				<motion.div
					whileTap={{ scale: 0.75 }}
					onClick={() => updateQtyCart('add', item.id)}
					className=""
				>
					<BiPlus />
				</motion.div>
			</div>
		</div>
	);
};

export default CartItemComp;
