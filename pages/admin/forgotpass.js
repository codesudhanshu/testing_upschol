import { useState } from "react";
import Link from 'next/link'


export default function Forgotscreen() {

	const [formdata, setFormadata] = useState({});
	const [updateStatus, setUpdateStatus] = useState()
	const [message, setMessage] = useState(false);
	const [dynamicColor, setDynamicColor] = useState(false)
	const [show, setShow] = useState(false);


	const handleEmailChange = (e) => {

		const { name, value } = e.target;
		setFormadata({
			...formdata,
			[name]: value
		})
	}
	const handleOtherdata = (e) => {

		const { name, value } = e.target;
		setFormadata({
			...formdata,
			[name]: value
		})
	}
	const sendOTP = async (e) => {
		e.preventDefault();
		let res = await fetch("../api/sendOTP", {
			method: "POST",
			headers: {
				"content-type": "application/json",
			},
			body: JSON.stringify(formdata)

		})
		let data = await res.json();
		if (data.success) {
			setShow(true);
			setUpdateStatus(data)
			setMessage(true)
			setDynamicColor(false)
			console.log(data)
		} else {
			setUpdateStatus(data)
			setDynamicColor(true)
		}
	}

	const handlePasswordChange = async (e) => {
		e.preventDefault();
		let res = await fetch("../api/forgotpass", {
			method: "POST",
			headers: {
				"content-type": "application/json",
			},
			body: JSON.stringify(formdata)

		})
		let data = await res.json();
		if (data.success) {
			setShow(true);
			setUpdateStatus(data)
			setMessage(true)
			setDynamicColor(false)
			console.log(data)
		} else {
			setUpdateStatus(data)
			setDynamicColor(true)
		}
	}



	return (
		<div className="-space-y-px rounded-md shadow-sm w-4/5 lg:w-3/12  mt-32 m-auto ">
			<div>
				<h2 className="mb-10 text-center text-3xl font-bold tracking-tight text-gray-900">
					Forgot Password
				</h2>
			</div>

			<div>
				<label htmlFor="email-address" className="sr-only">
					Email address
				</label>
				<input
					id="email-address"
					name="email"
					type="email"
					onChange={handleEmailChange}
					autoComplete="email"
					required
					className="relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
					placeholder="Email address"
				/>
			</div>
			<div>
				{show ? <div>
					<div className="pt-3">
						<label htmlFor="email-address" className="sr-only">
							New Password
						</label>
						<input
							name="new_password"
							type="password"
							onChange={handleOtherdata}
							required
							className="relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
							placeholder="Enter New Password" />
					</div>
					<div className="pt-3">
						<label htmlFor="email-address" className="sr-only">
							OTP
						</label>
						<input
							id="email-address"
							name="otp"
							type="number"
							onChange={handleOtherdata}
							autoComplete="email"
							required
							className="relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
							placeholder="Enter OTP" />
					</div>
					<span >{message ? <h3 style={{ color: dynamicColor ? "red" : "#4f46e5" }} className=" ml-14 text-lime-500 lg:ml-16 mt-2">{updateStatus?.response?.message}</h3> : null}</span>{
						updateStatus?.response?.message == "Your password has been Successfully Updated" ? <Link style={{ color: "#4f46e5", marginLeft: 400, fontSize: 20, textDecorationLine: "underline" }} href="./Login">Login</Link> : null
					}
					<div>
						<button
							onClick={handlePasswordChange}
							type="button"
							className="group relative flex m-auto w-5/12 mt-9  justify-center rounded-md   bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
						>
							Update Password
						</button>
					</div>
				</div> : null}
			</div>
			{!show ? <div>
				<button
					onClick={sendOTP}
					type="button"
					className="group relative flex m-auto w-5/12 mt-9  justify-center rounded-md   bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
				>
					Forgot Password
				</button>
			</div>
				: null}


		</div>
	)
}





