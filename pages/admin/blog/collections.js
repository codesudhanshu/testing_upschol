
import { useEffect, useState } from "react";
import blogCollectionModel from "../../../model/blogCollectionModel";
import blogModel from "../../../model/blogModel";
import dbConnect from "../../../dbConnect";
import { AdminNavigation } from "../../../components/Navigation"
import { useRouter } from "next/router";
import { Form, Input, Modal, Select, Button, message } from "antd";
import { _fetch } from "../../../_fetch";

export async function getServerSideProps(context) {

	await dbConnect();
	const blogCollection = await blogCollectionModel.find({}).populate("blogs");
	const blogs = await blogModel.find({});
	return {
		props: {
			blogCollection: JSON.parse(JSON.stringify(blogCollection)),
			blogs: JSON.parse(JSON.stringify(blogs))
		}, // will be passed to the page component as props
	}
}

export default function Pages(props) {
	const check = props.blogCollection;
	const [form] = Form.useForm();
	const [data, setData] = useState([])
	const [openAddCollModal, setOpenAddCollModal] = useState(false);
	const [open, setOpen] = useState(false);
	const router = useRouter();
	const [updateobj, setUpdateobj] = useState();


	const onUpdate = async (formdata) => {
		try {
			let response = await _fetch(`/api/admin/blog-collections`, {
				method: "POST",
				headers: {
					"content-type": "application/json",
				},
				body: formdata,
			});
			response = await response.json();
			if (response.success) {
				setData((pre) => [...pre, response.data]);
				message.success("Collection Added to college successfully");

			}
			else {
				message.error("Something went wrong");
			}
		} catch (error) {
			console.log(error)
			message.error("Something went wrong");
		} finally {
			form.resetFields();
		}
	}
	useEffect(() => {
		if (check) {
			setData(check)
		}
	}, []);

	return (
		<>
			<AdminNavigation />
			<div className=" container mx-auto relative overflow-x-auto">
				<button
					style={{ backgroundColor: "#4f46e5" }}
					className="mb-4 lg:mr-96 float-right hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-12"
					onClick={() => setOpenAddCollModal(true)}>
					Add Collections
				</button>

				<h1 className=" ml-20 mt-8 text-3xl font-semibold lg:text-4xl lg:mt-12 mx-auto lg:ml-96" style={{ color: "#4f46e5" }}>All Collections</h1>
				<table className="w-full text-sm text-left text-gray-500 dark:text-gray-400 lg:mt-6">
					<thead style={{ backgroundColor: "#4f46e5" }} className="text-xs text-white uppercase bg-gray-300 dark:bg-gray-700 dark:text-gray-400">
						<tr>
							<th scope="col" className="px-6 py-3 ">Title</th>
							<th scope="col" className="px-6 py-3">Action</th>
						</tr>
					</thead>
					<tbody className="tbody">
						{data.map((e) => {
							return (
								<tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700" key={e._id}>
									<td className="px-6 py-4">{e.title}</td>

									<button onClick={() => {
										let temp = e?.blogs.map((e) => (e._id))
										setUpdateobj({ ...e, blogs: temp })
										setOpen(true);
									}} style={{ backgroundColor: "#4f46e5" }} className="hover:bg-lime-500 text-white font-bold py-2 px-4 rounded mt-2">
										Edit
									</button>

								</tr>
							)
						})}
					</tbody>
				</table>
			</div >
			<Modal title="Add Collection" open={openAddCollModal} onCancel={() => setOpenAddCollModal(false)}
				okButtonProps={{
					style: {
						backgroundColor: "#4f46e5",
						color: "white"
					},
				}}
				footer={null}
			>

				<Form
					okType="primary"
					form={form}
					onFinish={(formdata) => onUpdate(formdata)}
					name="basic"
					labelCol={{ span: 8 }}
					wrapperCol={{ span: 16 }}
					style={{ maxWidth: 600 }}
					initialValues={{ remember: true }}
					autoComplete="off"

				>
					<Form.Item
						label="Title"
						name="title"
					>
						<Input />
					</Form.Item>
					<Form.Item
						label="Slug/URL"
						name="slug"
					>
						<Input />
					</Form.Item>
					<Form.Item
						label="Blogs"
						name="blogs"
					>
						<Select
							mode="multiple"
							style={{
								width: '100%',
								color: "red"
							}}
							placeholder="Select Blogs"
							options={props.blogs.map((item) => ({
								value: item._id,
								label: item.title,
							}))}

						/>
					</Form.Item>
					<Form.Item ><Button
						style={{ backgroundColor: "#4f46e5", marginLeft: 250 }}
						type="primary"
						htmlType="submit"
						onClick={() => setOpenAddCollModal(false)}>
						Submit
					</Button>
					</Form.Item>
				</Form>

			</Modal>
			<Modal title="Edit Collection" open={open} onCancel={() => setOpen(false)}
				okButtonProps={{
					style: {
						backgroundColor: "#4f46e5",
						color: "white"
					},
				}}
				footer={null}
				destroyOnClose={true}
			>
				<Form
					okType="primary"
					onFinish={async (formdata) => {
						await fetch(`../../api/admin/blog-collections?id=${updateobj._id}`, {
							method: "PATCH",
							headers: {
								"content-type": "application/json",
							},
							body: JSON.stringify(formdata)
						})
					}}
					name="basic"
					labelCol={{ span: 8 }}
					wrapperCol={{ span: 16 }}
					style={{ maxWidth: 600 }}
					initialValues={updateobj}
					autoComplete="off"

				>
					<Form.Item
						label="Title"
						name="title"
					>
						<Input />
					</Form.Item>
					<Form.Item
						label="Slug/URL"
						name="slug"
					>
						<Input />
					</Form.Item>
					<Form.Item
						label="Blogs"
						name="blogs"
					>
						<Select
							mode="multiple"
							style={{
								width: '100%',
								color: "red"
							}}
							placeholder="Select Blogs"
							options={props.blogs.map((item) => ({
								value: item._id,
								label: item.title,
							}))}

						/>
					</Form.Item>
					<Form.Item ><Button style={{ backgroundColor: "#4f46e5", marginLeft: 250 }} type="primary" htmlType="submit" onClick={() => setOpen(false)}>Update</Button></Form.Item>
				</Form>


			</Modal>
		</>

	)
}
