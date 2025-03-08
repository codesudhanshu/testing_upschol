import React, { useState } from 'react'
import { Button, Form, Input, Select } from 'antd'
import { AdminNavigation } from '../../../components/Navigation'
import { _fetch } from '../../../_fetch'
import { message } from 'antd'
import { TagCategories } from '../../../config'

const AddTags = () => {
	const [form] = Form.useForm();
	const [durationUnit, setDurationUnit] = useState("");

	const onFinish = async (values) => {

		const res = await _fetch('/api/admin/tag', { method: 'POST', body: values })
		const response = await res.json();
		if (response.success) {
			form.setFieldsValue({})
			message.success('Tag Added Successfully');
		} else {
			message.error('Some error occured')
		}
	}

	return (
		<>
			<AdminNavigation />
			<div className='w-1/3 mx-auto mt-12'>
				<h2 style={{ fontFamily: "Poppins" }} className=" text-center text-3xl font-bold tracking-tight text-gray-900">
					ADD TAG
				</h2>
				<Form
					initialValues={{ remember: true }}
					style={{ marginTop: "2rem" }}
					layout='vertical'
					onFinish={onFinish}
				>
					<Form.Item name='tag_name' label="Tag Name">
						<Input placeholder="Enter the name of tag" />
					</Form.Item>
					<Form.Item name='tag_category' label="Tag Category">
						<Select placeholder="Tag Category" >
							{TagCategories.map((e, i) => <Select.Option key={i} value={e}>
								{e} </Select.Option>)}

						</Select>
					</Form.Item>
					<Form.Item name='duration' label="Tag Duration">
						<div id="duration_id_div">
							<Input type='number' placeholder="Duration of tag" style={{ padding: '0px' }} id="duration_unit_span" />
						</div>
					</Form.Item>
					<Form.Item name='duration_unit' label="Duration Unit">
						<Select placeholder="Duration Unit" >
							<Select.Option value={"YEARS"} >
								YEARS
							</Select.Option>
							<Select.Option value={"MONTHS"} >
								MONTHS
							</Select.Option>
							<Select.Option value={"WEEKS"} >
								WEEKS
							</Select.Option>
						</Select>
					</Form.Item>
					<Form.Item>
						<Button htmlType="submit" type="primary" style={{ backgroundColor: "rgb(79 70 229)" }} block >Submit</Button>
					</Form.Item>

				</Form >
			</div >
		</>
	)
}

export default AddTags
