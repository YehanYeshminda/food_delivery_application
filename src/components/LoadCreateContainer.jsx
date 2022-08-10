import { useState } from 'react';
import { motion } from 'framer-motion';
import {
	MdFastfood,
	MdCloudUpload,
	MdDelete,
	MdFoodBank,
	MdAttachMoney,
} from 'react-icons/md';
import { categories } from '../utils/data';
import Loader from './Loader';
import {
	deleteObject,
	getDownloadURL,
	ref,
	uploadBytesResumable,
} from 'firebase/storage';
import { storage } from '../firebase.config';
import { getAllFoodItems, saveItem } from '../utils/firebaseFunctions';
import { useStateValue } from '../context/StateProvider';
import { actionType } from '../context/Reducer';

const LoadCreateContainer = () => {
	const [title, setTitle] = useState('');
	const [calories, setCalories] = useState('');
	const [price, setPrice] = useState('');
	const [catergorie, setCatergorie] = useState(null);
	const [fields, setFields] = useState(false);
	const [imageAsset, setImageAsset] = useState(null);
	const [alertStatus, setAlertStatus] = useState('danger');
	const [msg, setMsg] = useState(null);
	const [isLoading, setLoading] = useState();

	const [{ foodItems }, dispatch] = useStateValue();

	// getting the image for the input
	const uploadImage = (e) => {
		setLoading(true);

		// gettigng the file from the pc to a variable
		const imageFile = e.target.files[0];

		// uploading refernce to firebase
		const storageReference = ref(
			storage,
			`Images/${Date.now()}-${imageFile.name}`
		);

		// getting the uploading time using the bytes
		const uploadTask = uploadBytesResumable(storageReference, imageFile);

		uploadTask.on(
			'state_changed',
			(snapshot) => {
				const uploadProgress =
					(snapshot.bytesTransferred / snapshot.totalBytes) * 100;
			},
			(error) => {
				console.log(error);
				setFields(true);
				setMsg('Error while uploading Image 🔴! Try Uploading Again!');
				setAlertStatus('danger');
				setTimeout(() => {
					setFields(false);
					setLoading(false);
				}, 4000);
			},
			() => {
				getDownloadURL(uploadTask.snapshot.ref).then((downloadUrl) => {
					setImageAsset(downloadUrl);
					setLoading(false);
					setFields(true);
					setMsg('Image uploaded Sucesfully!😊');
					setAlertStatus('success');
					setTimeout(() => {
						setFields(false);
					}, 4000);
				});
			}
		);
	};

	const deleteImage = () => {
		setLoading(true);
		const deleteReference = ref(storage, imageAsset);

		deleteObject(deleteReference).then(() => {
			setImageAsset(null);
			setLoading(false);
			setFields(true);
			setMsg('Image Deleted Sucesfully!😊');
			setAlertStatus('success');
			setTimeout(() => {
				setFields(false);
			}, 4000);
		});
	};

	const saveDetails = () => {
		setLoading(true);

		try {
			if (!title || !calories || !imageAsset || !price || !catergorie) {
				setFields(true);
				setMsg(
					'Required Fields are Missing! 🔴! Please Fill All The Required Fields!'
				);
				setAlertStatus('danger');
				setTimeout(() => {
					setFields(false);
					setLoading(false);
				}, 4000);
			} else {
				// this is the item object itself
				const data = {
					id: `${Date.now()}`,
					title: title,
					imageUrl: imageAsset,
					catergorie: catergorie,
					calories: calories,
					qty: 1,
					price: price,
				};

				// calling the function to save the data into the firebase
				saveItem(data);
				setLoading(false);
				setFields(true);
				setMsg('Data Uploaded Sucesfully! Item Saved!👍');
				setAlertStatus('success');
				clearData();
				setTimeout(() => {
					setFields(false);
				}, 4000);
			}
		} catch (error) {
			console.log(error);
			setFields(true);
			setMsg('Error while Saving Informartion 🔴! Try Uploading Again!');
			setAlertStatus('danger');
			setTimeout(() => {
				setFields(false);
				setLoading(false);
			}, 4000);
		}

		fetchFireStoreData();
	};

	const clearData = () => {
		setTitle('');
		setImageAsset(null);
		setCalories('');
		setPrice('');
		setCatergorie('Select Catergory');
	};

	const fetchFireStoreData = async () => {
		await getAllFoodItems().then((data) => {
			dispatch({
				type: actionType.SET_FOOD_ITEMS,
				foodItems: data,
			});
		});
	};

	return (
		<div className="w-full min-h-screen flex items-center justify-center">
			<div className="w-[90%] md:w-[75%] mt-8 border border-gray-300 p-4 flex flex-col items-center justify-center gap-4">
				{fields && (
					<motion.p
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						className={`w-full p-2 rounded-lg text-center text-lg font-semibold ${
							alertStatus === 'danger'
								? 'bg-red-400 text-red-800'
								: 'bg-emerald-400 text-emerald-800'
						}`}
					>
						{msg}
					</motion.p>
				)}

				<div className="w-full py-2 border-b border-gray-300 flex items-center gap-2">
					<MdFastfood className="text-xl text-gray-700" />
					<input
						type="text"
						required
						value={title}
						onChange={(e) => setTitle(e.target.value)}
						placeholder="Give me a Title..."
						className="w-full h-full text-lg bg-transparent outline-none border-none placeholder:text-gray-400 text-textColor"
					/>
				</div>

				<div className="w-full">
					<select
						onChange={(e) => setCatergorie(e.target.value)}
						className="outline-none w-full text-base border-b-2 border-gray-200 p-2 rounded-md cursor-pointer"
					>
						<option value="other" className="bg-white">
							Select Catergory
						</option>

						{categories &&
							categories.map((ele) => {
								const { id, name, urlParamName } = ele;

								return (
									<option
										key={id}
										className="text-base border-0 outline-none capitalize bg-white text-headingColor"
										value={urlParamName}
									>
										{name}
									</option>
								);
							})}
					</select>
				</div>

				<div className="group flex justify-center items-center flex-col border-2 border-dotted border-gray-300 w-full h-225 md:h-420 cursor-pointer rounded-lg">
					{isLoading ? (
						<Loader />
					) : (
						<>
							{!imageAsset ? (
								<>
									<label className="w-full h-full flex flex-col items-center justify-center cursor-pointer">
										<div className="w-full h-full flex flex-col items-center justify-center gap-2">
											<MdCloudUpload className="text-gray-500 text-3xl hover:text-gray-700" />
											<p className="text-gray-500 hover:text-gray-700">
												Click here to Upload
											</p>
										</div>

										{/* accepts any type of file which is a image */}
										<input
											type="file"
											name="uploadImage"
											accept="image/*"
											onChange={uploadImage}
											className="w-0 h-0"
										/>
									</label>
								</>
							) : (
								<>
									<div className="relative h-full">
										<img
											src={imageAsset}
											alt="uploaded asset"
											className="w-full h-full object-cover"
										/>
										<button
											type="button"
											className="absolute bottom-3 right-3 p-3 rounded-full bg-red-500 text-xl cursor-pointer outline-none hover:shadow-md duration-500 transition-all ease-in-out"
											onClick={deleteImage}
										>
											<MdDelete className="text-white" />
										</button>
									</div>
								</>
							)}
						</>
					)}
				</div>
				<div className="w-full flex flex-col md:flex-row items-center gap-3">
					<div className="w-full py-2 border-b border-gray-300 flex items-center gap-2">
						<MdFoodBank className="text-gray-700 text-2xl" />
						<input
							type="text"
							required
							value={calories}
							onChange={(e) => setCalories(e.target.value)}
							placeholder="Calories"
							className="w-full h-full text-lg bg-transparent outline-none border-none placeholder:text-gray-400 text-textColor"
						/>
					</div>
					<div className="w-full py-2 border-b border-gray-300 flex items-center gap-2">
						<MdAttachMoney className="text-gray-700 text-2xl" />
						<input
							type="text"
							required
							value={price}
							onChange={(e) => setPrice(e.target.value)}
							placeholder="Price"
							className="w-full h-full text-lg bg-transparent outline-none border-none placeholder:text-gray-400 text-textColor"
						/>
					</div>
				</div>

				<div className="flex items-center w-full">
					<button
						type="button"
						className="ml-0 md:ml-auto w-full md:w-auto border-none outline-none bg-emerald-500 px-12 py-2 rounded-lg text-lg text-white font-semibold"
						onClick={saveDetails}
					>
						Save
					</button>
				</div>
			</div>
		</div>
	);
};

export default LoadCreateContainer;
