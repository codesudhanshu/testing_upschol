import React, { useState } from 'react'
import { Button,Form,Input, Typography,Select, Card } from 'antd'
import { AdminNavigation } from '../../../components/Navigation'
import { _fetch } from '../../../_fetch'
import {message} from 'antd'
import { courseDuration } from '../../../config'
import { IoMdCloseCircleOutline } from 'react-icons/io'
import { Textarea } from '@material-tailwind/react'

const AddCourse = () => {
	const [form] = Form.useForm();
	const [selected, setSelected] = useState(["gfg"]); 
	const onFinish = async(values)=>{

		const res = await _fetch('/api/admin/courses',{method:'POST',body:values})
		const response = await res.json();
		if(response.success){
			form.setFieldsValue({})
			message.success('Course Added Successfully');
		}else{
			message.error('Some error occured')
		}
	}

	return (
		<>
			<AdminNavigation/>
			<div className='w-1/3 mx-auto mt-12'>
				<h2 style={{ fontFamily: "Poppins" }} className=" text-center text-3xl font-bold tracking-tight text-gray-900">
							ADD COURSE
				</h2>
				<Form 
					initialValues={{ remember: true }}
					style={{marginTop:"2rem"}}
					layout='vertical'
					onFinish={onFinish}
				>
					<Form.Item name='name' label="Course Name">
						<Input  placeholder="Enter the name of Course" />
					</Form.Item>
					<Form.Item name='description' label="Course Description">
						<Input placeholder='course description' />
					</Form.Item>
					<Form.Item>
						<Button htmlType="submit" type="primary" style={{backgroundColor:"rgb(79 70 229)"}} block >Submit</Button>
					</Form.Item>
					
					
				</Form>
			</div>
		</>
	)
}

export default AddCourse
