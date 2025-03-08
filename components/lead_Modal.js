import { useState } from "react";
import banner from "../public/girl 1.png";
import { useRouter } from 'next/router';
import Image from "next/image";
import { message, DatePicker } from 'antd';
import { useCookies } from 'react-cookie';

export default function LeadModal({ showModal, setShowModal, college, courses = [], navigateToCollege = true, onSuccess = () => { } }) {

	const router = useRouter();
	const indianStatesAndUTs = [
		'Andhra Pradesh',
		'Arunachal Pradesh',
		'Assam',
		'Bihar',
		'Chhattisgarh',
		'Goa',
		'Gujarat',
		'Haryana',
		'Himachal Pradesh',
		'Jharkhand',
		'Karnataka',
		'Kerala',
		'Madhya Pradesh',
		'Maharashtra',
		'Manipur',
		'Meghalaya',
		'Mizoram',
		'Nagaland',
		'Odisha',
		'Punjab',
		'Rajasthan',
		'Sikkim',
		'Tamil Nadu',
		'Telangana',
		'Tripura',
		'Uttar Pradesh',
		'Uttarakhand',
		'West Bengal',
		'Andaman and Nicobar Islands',
		'Chandigarh',
		'Dadra and Nagar Haveli and Daman and Diu',
		'Jammu and Kashmir',
		'Ladakh',
		'Lakshadweep',
		'Delhi',
		'Puducherry',
	];
	const [loading, setLoading] = useState(false);
	const [formdata, setFormdata] = useState({})
	const [cookies, setCookie,] = useCookies(['user']);
	const [error, setError] = useState({})
	const handleChange1 = (e) => {
		const { name, value } = e.target;
		setFormdata({
			...formdata,
			[name]: value
		})
	}
	const validate = (values) => {
		let isValid = true;
		var errors = {};
		if (!values.name) {
			errors.name = "Please Enter name";
			isValid = false;
		}
		if (!values.phone) {
			errors.phone = "Please Enter Phone no.";
			isValid = false;
		}
		if (!values.email) {
			errors.email = "Please Enter Email";
			isValid = false;
		}
		if (!values.dob) {
			errors.dob = "Please Enter DOB";
			isValid = false;
		}
		if (!values.state) {
			errors.state = "Please Enter State";
			isValid = false;
		}
		if (!values.course) {
			errors.course = "Please Select Course";
			isValid = false;
		}
		if (!values.gender) {
			errors.gender = "Please Select Gender";
			isValid = false;
		}
		const phoneRegex = /^(\+\d{1,4}\s?)?\d{10}$/;
		const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
		const dobRegex = /^(0[1-9]|[12]\d|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/;
		const courseChoiceRegex = /^[a-zA-Z. -]+$/;
		if (values.phone && !phoneRegex.test(values.phone)) {
			errors.phone = "Invalid Phone Number";
			isValid = false;
		}
		if (values.email && !emailRegex.test(values.email)) {
			errors.email = "Invalid Email Address";
			isValid = false;
		}
		if (values.dob && !dobRegex.test(values.dob)) {
			errors.dob = "Invalid DOB";
			isValid = false;
		}
		if (values.course && !courseChoiceRegex.test(values.course)) {
			errors.course = "Invalid Course Choice";
			isValid = false;
		}

		setError(errors)

		return isValid;
	}
	const handleSubmit = async () => {
		try {
			setLoading(true)
			if (!validate(formdata)) {
				return;
			}
			if (formdata.name && formdata.email && formdata.phone && formdata.dob && formdata.state && formdata.course && formdata.gender) {
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
				if (res.success) {
					message.success(res.response.message)
					setCookie('user', JSON.stringify(formdata), {
						path: '/',
						maxAge: 604800,
						sameSite: true,
					});
					setFormdata({})
					if (navigateToCollege) {
						if (college) {
							router.push(`/colleges/${college?.slug}`)
						}
					}
					onSuccess()
					setShowModal(false)
				} else {
					message.error("Something went wrong")
				}
			}
		} catch (error) {
			console.log(error)
			message.error("Something went wrong")
		} finally {
			setLoading(false)
		}
	}
	return (
		<div>
			{
				showModal ? (
					<>
						<div
							onClick={() => setShowModal(false)}
							className="mx-auto h-screen justify-center items-center flex overflow-x-hidden overflow-y-hidden fixed inset-0 z-50 outline-none focus:outline-none"
						>
							<div className="relative h-auto w-11/12 lg:w-8/12 xl:w-7/12 rounded-md overflow-hidden "
								style={{
									height: '90vh'
								}}
								onClick={(ev) => ev.stopPropagation()}
							>
								<div className="border-0 rounded-lg shadow-lg relative flex flex-col h-full w-full bg-white outline-none focus:outline-none">
									<div className="flex h-full w-full">
										<div className="hidden md:block lg:block h-auto w-1/3 px-6 relative" style={{ backgroundColor: "#F2ECFF" }}>
											<h1 style={{ fontFamily: "Poppins" }} className="text-3xl text-center font-semibold mt-12 gradientText">UpSchol</h1>
											<p style={{ fontFamily: "Poppins", color: "#101828" }} className="text-center font-semibold text-3xl">
												Your One Stop Solution</p>
											<Image
												className="pt-4 md:mt-20 lg:mt-14 self-center w-full object-contain absolute bottom-0 left-0"
												src={banner}
												alt="Lead Modal Banner"
											/>
										</div>
										<div className="relative flex flex-col h-auto w-full md:w-2/3 flex-auto px-4 py-3 justify-center bg-background_color">
											<div>
												<h2
													style={{ fontFamily: "Poppins", color: "white" }}
													className=" pt-8 text-2xl lg:text-3xl text-center font-bold "
												>
													Get Enroll with UpSchol
												</h2>
												<p
													style={{ fontFamily: "Poppins", color: "white" }}
													className="text-center pt-4 font-bold text-2xl lg:text-3xl px-1"
												>
													Choose 100+ Best Colleges and Universities for your higher studies
												</p>
											</div>
											<div className="flex flex-col justify-center h-full px-2 md:px-8">
												<input
													name="name"
													type="text"
													autoComplete="current-password"
													required
													className="mt-4 lg:mt-5 mx-auto block w-full appearance-none border border-slate-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
													placeholder="Full Name *"
													onChange={handleChange1}
												/>
												<p style={{ fontFamily: "Poppins" }} className="text-xs text-red-500 my-1">{error.name}</p>
												<input
													name="email"
													type="email"
													autoComplete="current-password"
													required
													className="mt-3 lg:mt-2 block w-full appearance-none border border-slate-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
													placeholder="Email *"
													onChange={handleChange1}

												/>
												<p style={{ fontFamily: "Poppins" }} className="text-xs text-red-500 my-1">{error.email}</p>
												<div className="flex flex-row w-full mt-3 lg:mt-2 gap-2">
													<div className="flex-1">
														<label htmlFor="email-address" className="sr-only">
															Phone Number
														</label>
														<input
															name="phone"
															type="tel"
															required
															minlength="10"
															maxlength="13"
															className="block w-full appearance-none rounded-none  border border-slate-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
															placeholder="Phone Number *"
															onChange={handleChange1}
														/>
														<p style={{ fontFamily: "Poppins" }} className="text-xs text-red-500 my-1">{error.phone}</p>
													</div>
													<div className="flex-1">
														<label htmlFor="email-address" className="sr-only">
															DOB
														</label>
														<DatePicker
															picker="date"
															placeholder="Choose DOB"
															style={{
																paddingTop: '7px',
																paddingBottom: '7px'
															}}
															format={"DD/MM/YYYY"}
															onChange={(date, dateString) => {
																setFormdata({
																	...formdata,
																	dob: dateString
																})
															}}
															showToday={false}
															className="w-full appearance-none rounded-none  border border-slate-300 hover:border-slate-300 px-2 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm shadow-none"
														/>
														<p style={{ fontFamily: "Poppins" }} className="text-xs text-red-500 my-1">{error.dob}</p>
													</div>
												</div>
												<select
													name="state"
													type="text"
													required
													className={`mt-3 lg:mt-2 w-full appearance-none border border-slate-300 px-3 py-2 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm ${formdata?.state ? 'text-gray-900' : 'text-zinc-400'}`}
													onChange={handleChange1}
													defaultValue={""}
												>
													<option value="" className="text-gray-500" disabled>
														Choose State *
													</option>
													{
														indianStatesAndUTs.map((state) => (
															<option key={state} value={state}>{state}</option>
														))
													}
												</select>
												<p style={{ fontFamily: "Poppins" }} className="text-xs text-red-500 my-1">{error.state}</p>
												<select
													name="course"
													type="text"
													required
													className={`mt-3 lg:mt-2 w-full appearance-none border border-slate-300 px-3 py-2 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm ${formdata?.course ? 'text-gray-900' : 'text-zinc-400'}`}
													onChange={handleChange1}
													defaultValue={""}
												>
													<option value="" className="text-gray-500" disabled>
														Course Choice *
													</option>
													{
														courses.map((course) => (
															<option key={course._id} value={course.tag_named}>{course.tag_name}</option>
														))
													}
												</select>
												<p style={{ fontFamily: "Poppins" }} className="text-xs text-red-500 my-1">{error.course}</p>
												<div onChange={handleChange1} className="mt-3 lg:mt-2 text-center"
													style={{ color: 'white' }}>
													<input type="radio" className="cursor-pointer color-white" value="Male" name="gender" /> Male
													<input className="ml-5 cursor-pointer" type="radio" value="Female" name="gender" /> Female
													<input className="ml-5 cursor-pointer" type="radio" value="Other" name="gender" /> Other
													<p style={{ fontFamily: "Poppins" }} className="text-xs my-1 text-red-500 color-white">{error.gender}</p>
												</div>
												<button
													style={{ backgroundColor: "#7F56D9" }}
													className="mt-8 text-center w-full bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-base px-4 py-2 shadow hover:shadow-lg outline-none focus:outline-none mb-1 ease-linear transition-all duration-150"
													type="button"
													onClick={handleSubmit}
												>
													{loading ? "Sending..." : "Send"}
												</button>
											</div>
											<button
												style={{ right: '20px', top: "20px", color: 'white' }}
												className="absolute text-lg  background-transparent font-bold uppercase text-sm outline-none color-white"
												type="button"
												onClick={() => {
													setShowModal(false)
													setFormdata({})
													setError({})
												}}
											>
												X
											</button>
										</div>
									</div>
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