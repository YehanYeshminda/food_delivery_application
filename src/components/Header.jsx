// images
import Logo from '../img/logo.png';
import Avatar from '../img/avatar.png';
import { MdShoppingBasket } from 'react-icons/md';

// google authentication
import { getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { app } from '../firebase.config';

// frameworks
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

import { useStateValue } from '../context/StateProvider';
import { actionType } from '../context/Reducer';

const Header = () => {
	const firebaseAuth = getAuth(app);
	const provider = new GoogleAuthProvider();

	const [{ user }, dispatch] = useStateValue();

	const login = async () => {
		if (!user) {
			const {
				user: { refreshToken, providerData },
			} = await signInWithPopup(firebaseAuth, provider);

			dispatch({
				type: actionType.SET_USER,
				user: providerData[0],
			});

			// pushing the user information into the local storage
			localStorage.setItem('user', JSON.stringify(providerData[0]));
		} else {
		}
	};

	return (
		<header className="fixed z-50 w-screen  p-6 px-16">
			{/* shows on : desktop and the tablet section */}
			<div className="hidden md:flex w-full h-full items-center justify-between">
				<Link to={'/'} className="flex items-center gap-2">
					<motion.img
						whileTap={{ scale: 0.6 }}
						src={Logo}
						alt="logo"
						className="w-8 object-cover"
					/>
					<p className="text-headingColor text-xl font-bold ">City</p>
				</Link>
				<div className="flex items-center gap-8">
					<ul className="flex items-center gap-8">
						<li className="text-base text-textColor hover:text-headingColor duration-100 transition-all ease-in-out cursor-pointer">
							Home
						</li>
						<li className="text-base text-textColor hover:text-headingColor duration-100 transition-all ease-in-out cursor-pointer">
							Menu
						</li>
						<li className="text-base text-textColor hover:text-headingColor duration-100 transition-all ease-in-out cursor-pointer">
							About us
						</li>
						<li className="text-base text-textColor hover:text-headingColor duration-100 transition-all ease-in-out cursor-pointer">
							Service
						</li>
					</ul>

					<div className="relative flex items-center justify-center">
						<MdShoppingBasket className="text-textColor text-2xl cursor-pointer" />
						<div className="absolute -top-2 -right-4 w-5 h-5 rounded-full bg-cartNumBg flex items-center justify-center">
							<p className="text-xs text-white font-semibold">2</p>
						</div>
					</div>

					{/* when we click on this the scale level will be dropped to 0.6 */}
					<div className="relative">
						<motion.img
							whileTap={{ scale: 0.6 }}
							src={user ? user.photoURL : Avatar}
							alt="use profile pic"
							className="w-10 min-w-[40px] min-h-[40px] drop-shadow-xl cursor-pointer rounded-full"
							onClick={login}
						/>

						{/* state menu for the profile */}
						<div className="w-40 bg-primary shadow-xl rounded-lg absolute flex flex-col"></div>
					</div>
				</div>
			</div>

			{/* shows on : mobile */}
			<div className="flex md:hidden w-full h-full"></div>
		</header>
	);
};

export default Header;
