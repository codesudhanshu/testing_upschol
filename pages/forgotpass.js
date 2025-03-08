import { LockClosedIcon } from '@heroicons/react/24/outline'
import { Button, Form, Input, Modal, Spin, message } from 'antd'
import React, { useState } from 'react'
import { LoadingOutlined } from '@ant-design/icons';
import {_fetch} from '../_fetch'

const Forgotpass = () => {
	const [email,setEmail] = useState('')
	const [form] = Form.useForm();

	const [loader,setLoader] = useState(false)
	const [isModalOpen, setIsModalOpen] = useState(false);

	const handleSubmit = async(e)=>{
		e.preventDefault();
		if(!email){
			message.error('Enter Email')
		}
		setLoader(true)
		try {
			const res = await _fetch(`/api/forgotpass?email=${email}`)
			const resp = await res.json()
			
			setLoader(false)
			if(resp.status===200){
				message.success('OTP Sent Successfully')
				setIsModalOpen(true);
			}else{
				message.error(resp.response)
			}
            
		} catch (error) {
			setLoader(false)
			console.log(error)
			if(error.status===404){
				message.error(error.response.data.response)
			}else message.error('Something Went Wrong')   
		}

		
	}
    
	const handleOtpSolver =async ()=>{
		const newPassword = form.getFieldValue('password')
		const otp = form.getFieldValue('OTP')
		if(!otp){
			message.error('Please Enter OTP')
			return;
		}
		if(!newPassword){
			message.error('Please Enter New Password')
			return;
		}
		setLoader(true);
		try {
			const res = await _fetch(`/api/forgotpass`,{
				method:"POST",
				body:{email:email,
					otp:otp,
					new_password:newPassword}
			})
			const resp = await res.json()
			setLoader(false)
			if(resp.status===200){
				message.success('Password Changed')
			}else{
				message.error(resp.response.message)
			}
		} catch (error) {
			setLoader(false)
			console.log(error)
			if(error.response.status!==500){
				message.error(error.response.data.respnse);
			}else{
				message.error('Something Went Wrong')
			}
		}
	}

	const antIcon = <LoadingOutlined style={{ color: "white", fontSize: 18 }} spin />;

	return (
		<>  
			<Modal 
				footer={
					<div className='flex' >
						<Button onClick={handleOtpSolver} className='bg-purple hover:bg-violet-400' type='primary' >Submit</Button>
						<Button onClick={()=>setIsModalOpen(false)} >Cancel</Button>
					</div>
				} 
				title="Enter OTP" 
				open={isModalOpen} 
				onOk={handleOtpSolver} 
				onCancel={()=>setIsModalOpen(false)} >
				<Form
					layout='horizontal'
					form={form}
					className='my-12'
					name="basic"
					labelCol={{
						span: 8,
					}}
					wrapperCol={{
						span: 16,
					}}
					style={{
						maxWidth: 600,
						marginRight:"6rem",
					}}
					initialValues={{
						remember: true,
					}}
					autoComplete="off"
				>
					<Form.Item
                        
						label="OTP"
						name="OTP"
						// style={{width:"100%",display:"flex",justifyContent}}
						rules={[
							{
								required: true,
								message: 'Please Enter OTP!',
							},
						]}
					>
						<Input />
					</Form.Item>

					<Form.Item
						label="Password"
						name="password"
						style={{width:"100%"}}
						rules={[
							{
								required: true,
								message: 'Please input your new password!',
							},
						]}
					>
						<Input.Password />
					</Form.Item>

				</Form>
			</Modal>
			<div className="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
				<div className="w-full max-w-md space-y-8">
					<div>
						<h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
							Reset Password
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
									value={email}
									type="email"
									autoComplete="email"
									required
									className="relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
									placeholder="Email address"
									onChange={(e)=>setEmail(e.target.value)}
								/>
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
								{loader ? <Spin indicator={antIcon} className='mr-2' /> : "Send Verification Code"}
							</button>
						</div>
					</form>
				</div>
			</div>
		</>
	)
}

export default Forgotpass