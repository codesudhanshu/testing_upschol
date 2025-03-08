import { useState } from "react"
import { message } from "antd"
import Image from "next/image"
import useFetch from "../../_fetch"
import banner8 from "../../public/Component 6.png"
import banner7 from "../../public/fax.png"
import banner9 from "../../public/phone.png"
import banneremail from "../../public/email.png"
import Link from "next/link"
import { FaInstagram } from "react-icons/fa"
import { IoMailOutline } from "react-icons/io5";
import { MdOutlinePhone } from "react-icons/md";
export default function GetinTouch() {
	const _fetch = useFetch();
	const initialState = {
		name: "",
		email: "",
		phoneNumber: "",
	};
	const [contactData, setContactData] = useState(initialState);
	const [loading, setLoading] = useState(false);

	const handleSubmit = async () => {
		const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
		const phoneRegex = /^(\+\d{1,4}\s?)?\d{10}$/;
		if (!contactData.name || !contactData.email || !contactData.phoneNumber) {
			message.error("Please fill all the fields");
			return;
		}
		if (!emailRegex.test(contactData.email)) {
			message.error("Please enter a valid email address");
			return;
		}
		if (!phoneRegex.test(contactData.phoneNumber)) {
			message.error("Please enter a valid phone number");
			return;
		}
		try {
			setLoading(true);
			let res = await _fetch('/api/contactUs', {
				method: "POST",
				body: {
					...contactData
				}
			});
			res = await res.json();
			if (res.success) {
				message.success(res.message)
				setContactData(initialState);
			} else {
				message.error(res.message)
			}
		} catch (error) {
			console.log(error);
			message.error("Some error occurred");
		} finally {
			setLoading(false);
		}
	}

	return (
		<div
			id="contact-us"
			style={{ height: 'auto', minHeight: "92vh" }}
			className="flex flex-col justify-around w-full overflow-hidden bg-[#1E1E1E]"
		>
			<div className="lg:flex justify-between  lg:w-10/12  mt-4 mx-auto">
				<div className="px-6 pt-16 lg:w-5/12 ">
					<h1 style={{ fontWeight: 700 }} className="text-2xl md:text-6xl text-white">Get Set, <span className="gradientText">Connect!</span></h1>
					<p style={{ fontFamily: "Poppins" }} className="text-sm font-normal text-white leading-6 mt-6 lg:mt-7">Learn without limits! Partnering with 100+ Top Universities and Companies for Accelerated Career Launch in Just 6 Months! Call to start your journey or Simply Enroll!</p>
					<div className="mt-4">
						<input
							name="name"
							type="text"
							value={contactData.name}
							required
							className="relative lg:h-5 block w-full appearance-none px-5 py-5 text-gray-900 placeholder-gray-500 border border-slate-300 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
							placeholder="Name"
							onChange={(e) =>
								setContactData({
									...contactData,
									name: e.target.value,
								})
							}
						/>
					</div>
					<div className="mt-4">
						<input
							id="email-address"
							name="email"
							type="email"
							autoComplete="email"
							value={contactData.email}
							required
							className="relative lg:h-5 block w-full appearance-none   border border-slate-300 px-5 py-5 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
							placeholder="Email"
							onChange={(e) =>
								setContactData({
									...contactData,
									email: e.target.value,
								})
							}
						/>
					</div>
					<div className="mt-4">
						<input
							value={contactData.phoneNumber}
							id="email-address"
							name="phone"
							type="tel"
							autoComplete="phone"
							required
							className="relative lg:h-5 block w-full appearance-none rounded-none  border border-slate-300 px-5 py-5 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
							placeholder="Phone number"
							onChange={(e) =>
								setContactData({
									...contactData,
									phoneNumber: e.target.value,
								})
							}
						/>
					</div>
					<button disabled={loading} onClick={handleSubmit} className="bg-primary mt-10 mb-8 text-base text-white font-bold py-4 w-full ">
						{loading ? "Sending..." : "Send"}
					</button>

				</div>
				<div className="mt-8 lg:mt-0 lg:w-6/12 p-2">
					<div
						className="flex justify-center items-center lg:justify-start"
					>
						<iframe src="https://maps.google.com/maps?width=100%25&amp;height=600&amp;hl=en&amp;q=212%20A,%20214%20A%202nd%20Floor,%20Jyoti%20Shikhar%20Building,%20Janakpuri%20District%20Center,%20Janakpuri,%20Delhi,%20110058+(My%20Business%20Name)&amp;t=&amp;z=14&amp;ie=UTF8&amp;iwloc=B&amp;output=embed" width="600" height="450" style={{
							border: 0,
							maxWidth: "90%",
							borderRadius: "10px",
							height: '50vh',
							filter: 'invert(90%)',
						}} allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
					</div>

					<div className="flex flex-wrap items-center justify-center lg:justify-between gap-x-6 mt-16 mb-8 gap-y-4">
						<div className="flex gap-x-3 items-center">
							<MdOutlinePhone
								size={30}
								color="white"
							/>
							<div>
								<p className="font-semibold text-white">PHONE</p>
								<Link href="tel:82848482">
									<p className="text-[#ebdcf7]">9810102541/9810800119/9810800221</p>
								</Link>
							</div>
						</div>
						<div className="flex gap-x-3 items-center">
							<IoMailOutline
								size={30}
								color="white"
							/>
							<div>
								<p className="font-semibold text-white">EMAIL</p>
								<Link
									href="mailto:info@upschol.com"
								>
									<p className="text-[#ebdcf7]">info@upschol.com</p>
								</Link>
							</div>
						</div>
						<div className="flex gap-x-3 items-center">
							<FaInstagram
								size={30}
								color="white"
							/>
							<div>
								<p className="font-semibold text-white">INSTAGRAM</p>
								<Link
									href="https://www.instagram.com/upschol/"
								>
									<p className="text-[#ebdcf7]">@upschol</p>
								</Link>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}