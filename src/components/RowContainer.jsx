import { MdShoppingBasket } from 'react-icons/md';
import { motion } from 'framer-motion';

const RowContainer = ({ flag }) => {
	return (
		<div
			className={`w-full my-12 ${
				flag ? `overflow-x-scroll` : `overflow-x-hidden`
			} `}
		>
			<div className="w-300 md:w-340 h-auto bg-cardOverlay rounded-lg p-2 shadow-md backdrop-blur-lg my-12 hover:drop-shadow-lg">
				<div className="w-full flex items-center justify-between">
					<motion.img
						whileHover={{ scale: 1.2 }}
						src="https://firebasestorage.googleapis.com/v0/b/food-delivery-applicatio-16952.appspot.com/o/Images%2F1660105964098-f4.png?alt=media&token=517efe7c-a46f-4c12-91b3-28fd06dc81f7"
						alt=""
						className="w-40 -mt-8 drop-shadow-2xl"
					/>
					<motion.div
						whileTap={{ scale: 0.75 }}
						className="w-8 h-8 rounded-full bg-red-700 flex items-center justify-center cursor-pointer hover:shadow-md"
					>
						<MdShoppingBasket className="text-white" />
					</motion.div>
				</div>

				<div className="w-full flex flex-col items-end justify-end">
					<p className="text-textColor font-semibold text-base md:text-lg">
						Grapes
					</p>
					<p className="mt-1 tetx-sm text-gray-500">45 Calories</p>
					<div className="flex items-center gap-8">
						<p className="text-lg text-headingColor font-semibold">
							<span className="text-sm text-red-500">$</span>5.25
						</p>
					</div>
				</div>
			</div>
		</div>
	);
};

export default RowContainer;
