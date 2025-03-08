import React, { useState, useEffect } from 'react'
import { Button, Form, Input, Typography, Select, Card } from 'antd'
import { AdminNavigation } from '../../../components/Navigation'
import { _fetch } from '../../../_fetch'
import { message } from 'antd'
import dbConnect from "../../../dbConnect";
import courseModel from '../../../model/course';
export async function getServerSideProps(context) {
	await dbConnect();
	const courses = await courseModel.find({ _id: context.params.id });

	return {
		props: {
			courses: JSON.parse(JSON.stringify(courses[0])),
		}, // will be passed to the page component as props
	}
}
const EditCourse = (props) => {
	const [form] = Form.useForm();
	const onFinish = async (values) => {

		const res = await _fetch(`/api/admin/courses/${props.courses._id}`, { method: 'PATCH', body: values })
		const response = await res.json();

		if (response.success) {
			form.setFieldsValue({})
			message.success('Course Edited Successfully');
		} else {
			message.error('Some error occured')
		}
	}
	useEffect(() => { }, [props])
	return (
		<>
			<AdminNavigation />
			<div className='w-1/3 mx-auto mt-12'>
				<h2 style={{ fontFamily: "Poppins" }} className=" text-center text-3xl font-bold tracking-tight text-gray-900">
					EDIT COURSE
				</h2>
				<Form
					initialValues={{ remember: true }}
					style={{ marginTop: "2rem" }}
					layout='vertical'
					onFinish={onFinish}
				>
					<Form.Item name='name' label="Course Name" >
						<Input placeholder="Enter the name of Course" defaultValue={props.courses?.name} />
					</Form.Item>
					<Form.Item name='description' label="Course Description">
						<Input placeholder='course description' defaultValue={props.courses?.description} />
					</Form.Item>
					<Form.Item>
						<Button htmlType="submit" type="primary" style={{ backgroundColor: "rgb(79 70 229)" }} block >Edit</Button>
					</Form.Item>


				</Form>
			</div>
		</>
	)
}

export default EditCourse
