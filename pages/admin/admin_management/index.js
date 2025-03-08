
import { useEffect, useState } from "react";
import { Spin } from "antd"
import { LoadingOutlined } from '@ant-design/icons';
import Link from 'next/link';
import { Button, message, Space } from 'antd';
import { useRouter } from "next/router";
import userModel from "../../../model/userModel";
import dbConnect from "../../../dbConnect";
import { AdminNavigation } from "../../../components/Navigation";
import { get } from "cookie-cutter";

export async function getServerSideProps(context) {

	await dbConnect();
	const user = await userModel.find({}).lean();
	return {
		props: {
			user: JSON.parse(JSON.stringify(user))
		}, // will be passed to the page component as props
	}
}

export default function Pages(props) {

	const check = props.user;
	const antIcon = <LoadingOutlined style={{ color: "white", fontSize: 18 }} spin />;

	const [data, setData] = useState([]);
	const [updatedata, setUpdatedata] = useState(null);
	const [updateid, setUpdateid] = useState()
	const [showModal, setShowModal] = useState(false);
	const [updatemodal, setUpdatemodal] = useState(false)
	const [formdata, setFormData] = useState([{}]);
	const [loader, setLoader] = useState(false);

	const router = useRouter();

	const handleUpdate = async (e) => {
		setLoader(true)
		let res = await fetch(`../../../api/createAdmin/${updateid}`, {
			method: "PATCH",
			headers: {
				"content-type": "application/json",
			},
			body: JSON.stringify(formdata)

		})

		if (res.status == 200) {
			let response = await res.json();
			let newdata = [...data];
			let check3 = newdata.map((e) => {
				if (e._id === response.data._id) {
					return e = response.data
				}
				return e;
			})
			setData(check3)
			message.success("Admin Updated")
		}
		setLoader(false)
		setUpdatedata(null);
		setUpdatemodal(false);
	}

	const handleChange = (e) => {
		const { name, value } = e.target;


		setFormData({
			...formdata,
			[name]: value
		})

	}

	useEffect(() => {
		setData(check)
	}, []);

	const handleSubmit = async () => {
		setLoader(true)
		try {
			let res = await fetch("../api/createAdmin", {
				method: "POST",
				headers: {
					"content-type": "application/json",
				},
				body: JSON.stringify(formdata)

			});
			res = await res.json();
			if (res.success) {
				let newdata = [...data, res.data];
				setData(newdata)
				setLoader(false);
				setFormData({});
				setShowModal(false);
				message.success("New Admin Added")
			}

		} catch (error) {
			console.log(error)
		}
	}

	return (
		<>
			<AdminNavigation />
			<div className="container mx-auto relative overflow-x-auto">

				<div className="mt-8 mb-4 flex justify-between items-center">
					<h1 className="text-3xl font-semibold lg:text-4xl" style={{ color: "#4f46e5" }}>All Admin</h1>
					<button style={{ backgroundColor: "#4f46e5" }} className="hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={() => {
						// router.push("/admin/createAdmin")
						setShowModal(true)
					}}>
						Add Admin
					</button>
					{
						showModal ? (
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
													Add  Admin
												</h3>
												<button
													className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
												// onClick={() => setShowModal(false)}
												>
													<span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
														×
													</span>
												</button>
											</div>
											{/*body*/}
											<div className=" lg:w-5/5 m-auto" >
												{/* <div>
													<h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
														Create Admin
													</h2>
												</div> */}

												<input type="hidden" name="remember" defaultValue="true" />
												<div className="space-y-px py-6 rounded-md shadow-sm justify-center flex flex-col">
													<div className="flex w-3/4 lg:w-full m-auto">
														<div className=" w-2/4 lg:w-6/12">
															<label htmlFor="email-address" className="sr-only">
																First Name
															</label>
															<input
																name="first_name"
																type="text"
																required
																className="relative   block lg:w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
																placeholder="First Name"
																onChange={handleChange}

															/>
														</div>
														<div className="w-2/4 lg:w-6/12">
															<label htmlFor="email-address" className="sr-only">
																Last Name
															</label>
															<input
																name="last_name"
																type="text"
																required
																className="relative  lg:ml-1  lg:ml-px block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
																placeholder="Last Name"
																onChange={handleChange}

															/>
														</div>
													</div>
													<div  >
														<label htmlFor="email-address" className="sr-only">
															Email address
														</label>
														<input
															name="email"
															type="email"
															autoComplete="email"
															required
															className="relative   m-auto mt-4 block lg:w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm "
															placeholder="Email address"
															onChange={handleChange}

														/>
													</div>
													<div>
														<label htmlFor="password" className="sr-only">
															Password
														</label>
														<input
															id="password"
															name="password"
															type="password"
															autoComplete="current-password"
															required
															className="relative w-3/4 m-auto mt-4 block lg:w-full appearance-none rounded-none rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
															placeholder="Password"
															onChange={handleChange}

														/>
													</div>
												</div>


												{/* <div style={{ margin: "auto" }}>{check?.message ? <h3 style={{ color: "red", paddingLeft: 200, paddingTop: 10 }}>{check.message}</h3> : null}</div> */}
												{/* <div>
													<button
														type="submit"
														className="group relative flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
													>
														<span className="absolute inset-y-0 left-0 flex items-center pl-3">
														</span>
														Create Admin
													</button>
												</div> */}

											</div>
											{/*footer*/}
											<div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
												<button
													className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
													type="button"
													onClick={() => {
														setShowModal(false)
														setFormData({})
													}}
												>
													Close
												</button>
												<button
													style={{ backgroundColor: "#4f46e5" }}
													className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150 flex items-center justify-center"
													type="submit"
													onClick={() => {
														handleSubmit()

														// setShowModal(false)

													}}
												>
													{loader ? <Spin indicator={antIcon} className='mr-2' /> : "ADD"}
												</button>
											</div>
										</div>
									</div>
								</div>
								<div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
							</>
						) : null
					}
					{
						updatemodal ? (
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
													Update Admin
												</h3>
												<button
													className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
												// onClick={() => setShowModal(false)}
												>
													<span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
														×
													</span>
												</button>
											</div>
											{/*body*/}
											<div className=" lg:w-5/5 m-auto" >
												{/* <div>
													<h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
														Create Admin
													</h2>
												</div> */}

												<input type="hidden" name="remember" defaultValue="true" />
												<div className="space-y-px py-6 rounded-md shadow-sm justify-center flex flex-col">
													<div className="flex m-auto">
														<div className="grow mr-2">
															<label htmlFor="email-address" className="sr-only">
																First Name
															</label>
															<input
																defaultValue={updatedata.first_name}
																name="first_name"
																type="text"
																required
																className="lg:w-full appearance-none rounded border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
																placeholder="First Name"
																onChange={handleChange}

															/>
														</div>
														<div className="grow ml-2">
															<label htmlFor="email-address" className="sr-only">
																Last Name
															</label>
															<input
																defaultValue={updatedata.last_name}
																name="last_name"
																type="text"
																required
																className="w-full appearance-none rounded border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
																placeholder="Last Name"
																onChange={handleChange}

															/>
														</div>
													</div>
													<div>
														<label htmlFor="email-address" className="sr-only">
															Email address
														</label>
														<input
															defaultValue={updatedata.email}
															name="email"
															type="email"
															autoComplete="email"
															required
															className="mt-4 lg:w-full appearance-none rounded border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm "
															placeholder="Email address"
															onChange={handleChange}

														/>
													</div>

												</div>


												{/* <div style={{ margin: "auto" }}>{check?.message ? <h3 style={{ color: "red", paddingLeft: 200, paddingTop: 10 }}>{check.message}</h3> : null}</div> */}
												{/* <div>
													<button
														type="submit"
														className="group relative flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
													>
														<span className="absolute inset-y-0 left-0 flex items-center pl-3">
														</span>
														Create Admin
													</button>
												</div> */}

											</div>
											{/*footer*/}
											<div className="flex items-center justify-end p-3 border-t border-solid border-slate-200 rounded-b">
												<button
													className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
													type="button"
													onClick={() => {
														setUpdatemodal(false)
														setUpdatedata({})
													}}
												>
													Close
												</button>
												<button
													style={{ backgroundColor: "#4f46e5" }}
													className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none ease-linear transition-all duration-150 flex items-center justify-center"
													type="submit"
													onClick={() => handleUpdate()}
												>

													{loader ? <Spin indicator={antIcon} className='mr-2' /> : "Update"}
												</button>
											</div>
										</div>
									</div>
								</div>
								<div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
							</>
						) : null
					}
				</div>

				<table className="w-full text-sm text-left text-gray-500 lg:mt-6">
					<thead style={{ backgroundColor: "#4f46e5" }} className="text-xs text-white uppercase bg-gray-300">
						<tr>
							<th scope="col" className="px-6 py-3 ">First Name</th>
							<th scope="col" className="px-6 py-3">Last Name</th>
							<th scope="col" className="px-6 py-3">Email</th>
							<th scope="col" className="px-6 py-3">Role</th>
							<th scope="col" className="px-6 py-3">Action</th>

						</tr>
					</thead>
					<tbody className="tbody">
						{data.map((e) => {
							return (
								<tr className="bg-white border-b" key={e._id}>
									<td className="px-6 py-4">{e.first_name}</td>
									<td className="px-6 py-4">{e.last_name}</td>
									<td className="px-6 py-4">{e.email}</td>
									<td className="px-6 py-4">{e.role}</td>

									<button onClick={() => {
										console.log(e);
										setUpdateid(e._id);
										setUpdatedata(e);
										setUpdatemodal(true);
										// setId(e._id)
										// getdata(e._id)
									}} style={{ backgroundColor: "#4f46e5" }} className="hover:bg-lime-500 text-white font-bold py-2 px-4 rounded mt-2">
										Edit
									</button>
								</tr>)
						})}
					</tbody>
				</table>
			</div>
		</>

	)
}