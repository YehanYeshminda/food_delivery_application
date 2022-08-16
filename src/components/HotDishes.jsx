import { IoFastFood } from 'react-icons/io5';
import { useState } from 'react';
import { categories } from '../utils/data';
import { motion } from 'framer-motion';
import RowContainer from './RowContainer';
import { useStateValue } from '../context/StateProvider';

const HotDishes = () => {
	const [filter, setFilter] = useState('fruits');
	const [{ foodItems }, dispatch] = useStateValue();

	return (
		<section className="w-full my-6" id="menu">
			<div className="w-full flex flex-col items-center justify-center">
				<p className="text-2xl font-semibold capitalize relative text-headingColor before:absolute before:rounded-lg before:w-16 before:h-1 before:-bottom-2 before:left-6 before:bg-gradient-to-tr from-orange-400 to-orange-600 transition-all ease-in-out duration-100 mr-auto">
					Our Hot Dishes
				</p>

				<div className="w-full flex items-center justify-center lg:justify-center gap-8 py-6 overflow-x-scroll scrollbar-none">
					{categories &&
						categories.map((ele) => {
							const { id, name, urlParamName } = ele;

							return (
								<motion.div
									whileTap={{ scale: 0.75 }}
									key={id}
									className={`group ${
										filter === urlParamName ? 'bg-cartNumBg' : 'bg-card'
									} w-24 min-w-[94px] h-28 cursor-pointer rounded-lg drop-shadow-xl flex flex-col gap-3 items-center justify-center hover:bg-cartNumBg`}
									onClick={() => setFilter(urlParamName)}
								>
									<div
										className={`w-10 h-10 rounded-full ${
											filter === urlParamName ? 'bg-white' : 'bg-cartNumBg'
										} group-hover:bg-white flex items-center justify-center`}
									>
										<IoFastFood
											className={`${
												filter === urlParamName
													? 'text-textColor'
													: 'text-white'
											} group-hover:text-textColor text-lg drop-shadow-lg`}
										/>
									</div>

									<p
										className={`text-sm ${
											filter === urlParamName ? 'text-card' : 'text-textColor'
										} group-hover:text-white`}
									>
										{name}
									</p>
								</motion.div>
							);
						})}
				</div>

				<div className="w-full">
					<RowContainer
						flag={false}
						data={foodItems?.filter((n) => n.catergorie === filter)}
					/>
				</div>
			</div>
		</section>
	);
};

export default HotDishes;
