import { useState } from "react";
import { AiFillStar } from "react-icons/ai";
import Image from "next/image";
import { Button } from "antd";
import banner from "../public/girl 1.png";
import { Check } from "../pages/api/lead"



function getStars(rating) {
	let arr = [];
	for (let i = 0; i < rating; i++) {
		arr.push(<AiFillStar style={{ color: '#ffc107' }} />)
	}

	for (let i = 0; i < 5 - rating; i++) {
		arr.push(<AiFillStar />)
	}

	return arr;

}

export default function CollegeCard({ college }) {
	const [showModal, setShowModal] = useState(false);
	const [formdata, setFormdata] = useState({})
	const handleChange = (e) => {

		const { name, value } = e.target;

		setFormdata({
			...formdata,
			[name]: value
		})
	}
	const handleSubmit = async () => {

		let lead_modal_post = await fetch("../api/lead", {
			method: "POST",
			headers: {
				"content-type": "application/json",
			},
			body: JSON.stringify(
				formdata
			),

		});
		let res = await lead_modal_post.json();
	}

	return (
		<div className="w-full h-full">
			<div className="w-full h-full flex flex-col rounded-2xl overflow-hidden drop-shadow-md college-card">
				{college?.banner_image &&
					<Image
						className="w-96 h-80"
						loader={({ src }) => `https://upschol.s3.ap-south-1.amazonaws.com/${src}`}
						src={`${college.banner_image.path}`}
						alt={college.college_name}
						width={100}
						height={100} />}
				<div className="p-4 flex-grow flex flex-col justify-between">
					<div>
						<h3>{college?.college_name}</h3>
						<p className='mt-2 font-bold'>{college?.university}</p>
						<div className="flex mt-2">
							{getStars(college?.rating)}
						</div>
					</div>
					<Button className="w-full mt-4" onClick={() => setShowModal(true)}>
						View Details
					</Button>
				</div>

			</div>
			{
				showModal ? (
					<>
						<div
							className=" mx-auto justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
						>
							<div className="relative lg:h-4/5 lg:w-11/12 my-6 mx-auto ">
								{/*content*/}
								<div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
									{/*header*/}

									{/*body*/}
									<div className="flex">

										<div className="hidden md:block lg:block " style={{ backgroundColor: "#F2ECFF" }}>

											<h1 style={{ fontFamily: "Poppins", color: "#7F56D9" }} className="text-3xl text-center font-semibold pt-8">UpSchol</h1>
											<p style={{ fontFamily: "Poppins", color: "#101828" }} className="text-center font-semibold text-3xl">
												Your One Stop Solution</p>

											<Image
												style={{ alignSelf: 'center' }}
												className="pt-24  "
												src={banner}
												alt="banner"
											/>
										</div>
										<div className="relative   flex-auto    justify-content">
											<button
												className=" text-lg float-right  background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
												type="button"
												onClick={() => setShowModal(false)}
											>
												X
											</button>
											<h1 style={{ fontFamily: "Poppins", color: "#7F56D9" }} className=" pt-8 text-2xl lg:ext-3xl text-center font-bold ">Get Enroll with UpSchol</h1>
											<p style={{ fontFamily: "Poppins", color: "#101828" }} className="text-center pt-4 font-bold text-2xl lg:text-3xl">
												Choose 100+ Best Colleges and Universities<br />
												for your higher studies</p>
											<input
												id="password"
												name="name"
												type="text"
												autoComplete="current-password"
												required
												className="relative lg:pt-4 mt-4 lg:mt-5 lg:ml-40 block w-full lg:w-8/12 appearance-none  border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
												placeholder="Full Name"
												onChange={handleChange}

											/>
											<input
												id="password"
												name="email"
												type="text"
												autoComplete="current-password"
												required
												className="mt-3 lg:pt-4 lg:mt-5 lg:ml-40 lg:w-8/12 relative block w-full appearance-none rounded border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
												placeholder="Email"
												onChange={handleChange}

											/>
											<div className="flex  pt-4   lg:pl-40 ">
												<div className=" w-2/4 lg:w-5/12">
													<label htmlFor="email-address" className="sr-only">
														First Name
													</label>
													<input
														name="phone"
														type="text"
														required
														className="relative   block lg:w-full appearance-none rounded-none  border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
														placeholder="Phone Number"
														onChange={handleChange}
													/>
												</div>
												<div className="w-2/4  lg:ml-3 lg:w-5/12 ">
													<label htmlFor="email-address" className="sr-only">
														Last Name
													</label>
													<input
														name="dob"
														type="text"
														required
														className="relative     w-10/12 appearance-none rounded-none  border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
														placeholder="Date of Birth"
														onChange={handleChange}
													/>
												</div>
											</div>

											<input
												id="password"
												name="state"
												type="text"
												autoComplete="current-password"
												required
												className=" mt-4  lg:pt-4 lg:mt-5 lg:ml-40 lg:w-8/12  relative block w-full appearance-none rounded border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
												placeholder="State"
												onChange={handleChange}

											/>
											<input
												id="password"
												name="course"
												type="text"
												autoComplete="current-password"
												required
												className="mt-2 lg:pt-4 lg:mt-5 lg:ml-40 lg:w-8/12  relative block w-full appearance-none rounded border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
												placeholder="Course Choice"
												onChange={handleChange}


											/>
											<div onChange={handleChange} className="lg:pt-12 pt-6 pl-[10vw]  lg:pl-[20vw] justify-around">
												<input type="radio" className="" value="Male" name="gender" /> Male
												<input className="lg:ml-5" type="radio" value="Female" name="gender" /> Female

												<input className="lg:ml-5" type="radio" value="Other" name="gender" /> Other
											</div>

											<div className="">
												<button
													style={{ backgroundColor: "#7F56D9" }}
													className="text-center w-8/12 lg:w-8/12 ml-16 mt-10 lg:ml-40    mx-auto  lg:pr-40   lg:mt-14 bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-base lg:px-40 py-2 shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
													type="button"
													onClick={() => {
														handleSubmit();
														setShowModal(false)
													}}
												>
													Send
												</button>
											</div>



											{/* <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
												<button
													className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
													type="button"
													onClick={() => setShowModal(false)}
												>
													Close
												</button>
												<button
													style={{ backgroundColor: "#4f46e5" }}
													className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
													type="button"
													onClick={() => {
														// handleSubmit();
														setShowModal(false)
													}}
												>
													Add
												</button>
											</div> */}
											{/* <Select
											className="mt-3"
											// mode="multiple"
											placeholder="Select Course"
											onChange={(e) => {
												update(e)
											}}
											style={{
												width: '100%',
											}}
											options={latest.map((item) => ({
												value: item._id,
												label: item.name,
											}))}
										/> */}
										</div>
									</div>

									{/*footer*/}

								</div>
							</div>
						</div>
						<div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
					</>
				) : null
			}
		</div>







	)
}