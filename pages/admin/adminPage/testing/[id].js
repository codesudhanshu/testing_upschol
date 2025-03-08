
import { useRouter } from 'next/router'
import userModel from "../../../../model/userModel";
import dbConnect from "../../../../dbConnect";
import { useEffect, useState } from "react";
export async function getServerSideProps(context) {
	await dbConnect();
	const user = await userModel.findById(context.params.id).lean();
	return {
		props: {
			user: JSON.parse(JSON.stringify(user))
		}, // will be passed to the page component as props
	}
}

export default function Edit(props) {
	const [formdata, setFormadata] = useState({});
	const router = useRouter();
	const { id } = router.query;
	const check = props.user;

	const handleOtherdata = (e) => {

		const { name, value } = e.target;
		setFormadata({
			...formdata,
			[name]: value
		})
	}
	const [data, setData] = useState([]);
	useEffect(() => {
		setData(check)

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	const getdata = async () => {
		let response = await fetch(`../../../api/createAdmin/${id}`);
		let newresponse = await response.json();
		setData(newresponse);
		// const getdata = async () => {
		// 	let response = await fetch(`../../../api/createAdmin/${id}`);
		// 	let newresponse = await response.json();
		// 	setData(newresponse);

	}
	// }
	const handleUpdate = async (e) => {
		await fetch(`../../../api/createAdmin/${id}`, {
			method: "PATCH",
			headers: {
				"content-type": "application/json",
			},
			body: JSON.stringify(formdata)

		})
		alert("College Details Updated")

	}


	return (
		<> <div className="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
			<div className="w-full max-w-md space-y-8">
				<div>
					<h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
						Update Admin
					</h2>
				</div>

				<div className="-space-y-px rounded-md shadow-sm">
					<div>
						<label className="sr-only">
							First Name
						</label>
						<input
							name="first_name"
							defaultValue={data.first_name}
							onChange={handleOtherdata}
							type="text"
							autoComplete="College Name"
							required
							className="relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
							placeholder="First Name"

						/>
					</div>
					<div>
						<label htmlFor="password" className="sr-only">
							Last Name
						</label>
						<input
							defaultValue={data.last_name}
							onChange={handleOtherdata}
							name="last_name"
							type="text"
							autoComplete="current-password"
							required
							className="relative block w-full appearance-none rounded-none rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm mt-2"
							placeholder="Last Name"

						/>
					</div>
					<div>
						<label htmlFor="password" className="sr-only">
							Role
						</label>
						<input
							defaultValue={data.role}
							onChange={handleOtherdata}
							name="role"
							type="text"
							autoComplete="current-password"
							required
							className="relative block w-full appearance-none rounded-none rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm mt-2"
							placeholder="Role"

						/>
					</div>
					<div>
						<label htmlFor="password" className="sr-only">
							Email
						</label>
						<input
							defaultValue={data.email}
							onChange={handleOtherdata}
							name="email"
							type="email"
							autoComplete="current-password"
							required
							className="relative block w-full appearance-none rounded-none rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm mt-2"
							placeholder="Email"

						/>
					</div>
				</div>


				<div className="flex items-center justify-between">


				</div>

				<div>
					<button
						type="submit"
						className="group relative flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
						onClick={() => {
							handleUpdate();
							router.push('/admin/adminPage/testing')
						}}
					>
						<span className="absolute inset-y-0 left-0 flex items-center pl-3">
						</span>
						Update
					</button>
				</div>

			</div>
		</div></>
	)
}