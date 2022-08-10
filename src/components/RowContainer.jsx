import { MdShoppingBasket } from 'react-icons/md';
import { motion } from 'framer-motion';
import { useEffect, useRef } from 'react';

const RowContainer = ({ flag, data, scrollValue }) => {
	const rowContainer = useRef();

	useEffect(() => {
		rowContainer.current.scrollLeft += scrollValue;
	}, [scrollValue]);

	return (
		<div
			ref={rowContainer}
			className={`w-full my-12 flex items-center gap-3 scroll-smooth ${
				flag
					? `overflow-x-scroll scrollbar-none`
					: `overflow-x-hidden flex-wrap`
			} `}
		>
			{data &&
				data.map((item) => {
					const { id, calories, catergorie, imageUrl, price, qty, title } =
						item;

					return (
						<div
							className="w-300 h-[220px] min-w-[300px] md:min-w-340 md:w-340 bg-cardOverlay rounded-lg p-2 shadow-md backdrop-blur-lg my-12 hover:drop-shadow-lg flex flex-col items-center justify-between"
							key={id}
						>
							<div className="w-full flex items-center justify-between">
								<motion.img
									whileHover={{ scale: 1.2 }}
									src={imageUrl}
									alt=""
									className="w-40 h-40 -mt-8 drop-shadow-2xl"
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
				})}
		</div>
	);
};

export default RowContainer;
