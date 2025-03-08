import { useRouter } from 'next/router';
import { LockClosedIcon } from '@heroicons/react/20/solid'
import { Spin } from 'antd';
import { useState } from 'react';
import { message } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import Link from 'next/link';

export default function Login() {

	const router = useRouter();
	const [formdata, setFormdata] = useState({})
	const [loader,setLoader] = useState(false)
	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormdata({
			...formdata,
			[name]: value
		})
	}

	const antIcon = <LoadingOutlined style={{ color: "white", fontSize: 18 }} spin />;

	const handleSubmit = async (e) => {
		setLoader(true);
		e.preventDefault();
		try {
			let res = await fetch("../api/login", {
				method: "POST",
				headers: {
					"content-type": "application/json",
				},
				body: JSON.stringify(formdata)
			});
			res = await res.json();
			if (res.status === 200){
				message.success(res.message)
				router.push("/admin/admin_management")
			} else {
				message.error(res.message)
			}
		} catch (err) {
			message.error('Some error occurred');
		} finally {
			setLoader(false);
		}
	}

	return (
		<>
			<div className="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
				<div className="w-full max-w-md space-y-8">
					<div>
						<h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
							Login
						</h2>
					</div>
					<form className="mt-8 space-y-6" action="#" onSubmit={handleSubmit}
					>
						<input type="hidden" name="remember" defaultValue="true" />
						<div className="-space-y-px rounded-md shadow-sm">
							<div>
								<label htmlFor="email-address" className="sr-only">
									Email address
								</label>
								<input
									id="email-address"
									name="email"
									type="email"
									autoComplete="email"
									required
									className="relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
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
									className="relative block w-full appearance-none rounded-none rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
									placeholder="Password"
									onChange={handleChange}
								/>
							</div>
						</div>

						<div className="flex items-center justify-between">

							<div className="text-sm">
								<Link href="/forgotpass" className="font-medium text-indigo-600 hover:text-indigo-500 ">
									Forgot your password?
								</Link>
							</div>
						</div>

						<div>
							<button
								onClick={handleSubmit}
								type="submit"
								className="group relative flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
							>
								<span className="absolute inset-y-0 left-0 flex items-center pl-3">
									<LockClosedIcon className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400" aria-hidden="true" />
								</span>
								{loader ? <Spin indicator={antIcon} className='mr-2' /> : "Login"}
							</button>
						</div>
					</form>
				</div>
			</div>
		</>
	)
}
