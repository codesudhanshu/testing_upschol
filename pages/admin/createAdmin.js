import { message } from "antd";
import { useState } from "react";
import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
export default function CreateAdmin() {

	const antIcon = <LoadingOutlined style={{ color: "white", fontSize: 18 }} spin />;
	const [loader,setLoader] = useState(false)

	const [data, setData] = useState([{}])
	const [check, setCheck] = useState();
	const handleChange = (e) => {
		const { name, value } = e.target;


		setData({
			...data,
			[name]: value
		})

	}

	const handleSubmit = async (e) => {
		setLoader(true)
		e.preventDefault();
		try {
			let res = await fetch("../api/createAdmin", {
				method: "POST",
				headers: {
					"content-type": "application/json",
				},
				body: JSON.stringify(data)

			});
			res = await res.json();
			if (res.status === 200) {
				setLoader(false)
				message.success("Admin Created Successfully")
				setCheck(res)
			}
			else{
				message.error(res.message);
				setLoader(false)
			}
		} catch (error) {
			console.log(error)
		}
	}


	return (
		<div>
			<div className=" lg:w-2/5 m-auto" >
				<div>
					<h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
						Create Admin
					</h2>
				</div>
				<form className="mt-8 space-y-6" action="#" onSubmit={handleSubmit}>
					<input type="hidden" name="remember" defaultValue="true" />
					<div className="space-y-px rounded-md shadow-sm justify-center flex flex-col">
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
								className="relative w-3/4 w-full m-auto mt-4 block lg:w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm "
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


					<div style={{ margin: "auto" }}>{check?.message ? <h3 style={{ color: "red", paddingLeft: 200, paddingTop: 10 }}>{check.message}</h3> : null}</div>
					<div>
						<button
							type="submit"
							className="group relative flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
						>
							<span className="absolute inset-y-0 left-0 flex items-center pl-3">
							</span>
							{loader ? <Spin indicator={antIcon} className='mr-2' /> : "Create Admin"}
						</button>
					</div>
				</form>
			</div>
		</div>
	)
}