import React from "react";

export default function Modal() {
	const [showModal, setShowModal] = React.useState(false);
	const [formdata, setFormdata] = React.useState({})
	const handleChange = (e) => {

		const { name, value } = e.target;

		setFormdata({
			...formdata,
			[name]: value
		})
	}

	const handleSubmit = async (e) => {
		await fetch("../api/admin/major", {
			method: "POST",
			headers: {
				"content-type": "application/json",
			},
			body: JSON.stringify(formdata)

		}).then((response) => response.json())
			.then((data) => {
				console.log(data);
			})

	}
	return (
		<>
			<button
				className="bg-pink-500 text-white active:bg-pink-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
				type="button"
				onClick={() => setShowModal(true)}
			>
				Open large modal
			</button>
			{showModal ? (
				<>
					<div
						className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
					>
						<div className="relative lg:w-1/3 my-6 mx-auto max-w-6xl">
							{/*content*/}
							<div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
								{/*header*/}
								<div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
									<h3 className="text-3xl font-semibold">
										Add Major
									</h3>
									<button
										className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
										onClick={() => setShowModal(false)}
									>
										<span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
											×
										</span>
									</button>
								</div>
								{/*body*/}
								<div className="relative p-6 flex-auto">
									<input
										id="password"
										name="Major"
										type="text"
										autoComplete="current-password"
										required
										className="relative block w-full appearance-none rounded-none rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
										placeholder="Major"
										onChange={handleChange}

									/>
									<input
										id="password"
										name="description"
										type="text"
										autoComplete="current-password"
										required
										className="relative block w-full appearance-none rounded-none rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
										placeholder="Description"
										onChange={handleChange}

									/>
									<input
										id="password"
										name="duration"
										type="text"
										autoComplete="current-password"
										required
										className="relative block w-full appearance-none rounded-none rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
										placeholder="Duration"
										onChange={handleChange}

									/>
									<h1>Fees Structure</h1>
									<input
										id="password"
										name="fee_structure.tution_fees"
										type="text"
										autoComplete="current-password"
										required
										className="relative block w-full appearance-none rounded-none rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
										placeholder="Tution Fees"
										onChange={handleChange}

									/>
									<input
										id="password"
										name="fee_structure.hostel_fees"
										type="text"
										autoComplete="current-password"
										required
										className="relative block w-full appearance-none rounded-none rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
										placeholder="Hostel Fees"
										onChange={handleChange}

									/>
								</div>
								{/*footer*/}
								<div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
									<button
										className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
										type="button"
										onClick={() => setShowModal(false)}
									>
										Close
									</button>
									<button
										className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
										type="button"
										onClick={() => {
											handleSubmit();
											// setShowModal(false)
										}}
									>
										Save Changes
									</button>
								</div>
							</div>
						</div>
					</div>
					<div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
				</>
			) : null}
		</>
	);
}