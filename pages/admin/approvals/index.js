const Promise = require("promise");
import { useState } from "react";
import { AdminNavigation } from "../../../components/Navigation";
import dbConnect from "../../../dbConnect";
import approvalModel from "../../../model/approvalModel";
import { Button, Modal, Form, Input, Upload, message, Table } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import useFetch from "../../../_fetch";
import Image from "next/image";

export async function getServerSideProps(context) {
	await dbConnect();
	const approvals = await approvalModel.find({});
	return {
		props: {
			approvals: JSON.parse(JSON.stringify(approvals))
		}
	}
}

export default function Approvals(props){
	const _fetch = useFetch();
	const initialApprovalData = {
		name: "",
		description: "",
		image: []
	};
	const [approvalForm] = Form.useForm();
	const [approvals, setApprovals] = useState(props.approvals);
	const [addApproval, setAddApproval] = useState(false);
	const [approvalData, setApprovalData] = useState(initialApprovalData);
	const [loading, setLoading] = useState(false);
	const [deleteLoading, setDeleteLoading] = useState(null);

	const addApprovalHandler = async () => {
		try {
			setLoading(true);
			if(approvalData.image.length === 0){
				message.error("Please upload an image");
				return;
			}
			if(approvalData.name === ""){
				message.error("Please enter a name");
				return;
			}
			if(approvalData.description === ""){
				message.error("Please enter a description");
				return;
			}
			let res = await _fetch("../api/admin/approvals/image-upload", {
				method: "POST",
				body: {
					name: approvalData.name,
					image: {
						name: approvalData.image[0].originFileObj.name,
						type: approvalData.image[0].originFileObj.type
					}
				}
			});
			res = await res.json();
			if (res.success){
				const url = res.data;
				let promise = fetch(url, {
					method: "PUT",
					headers: {
						"Content-type": approvalData.image[0].originFileObj.type,
					},
					body: approvalData.image[0].originFileObj,
				});
				await Promise.all([promise]).then(async (values) => {
					const url = values[0].url.split("?")[0];
					const newApproval = {
						name: approvalData.name,
						description: approvalData.description,
						image: url
					};
					let res = await _fetch("../api/admin/approvals", {
						method: "POST",
						body: newApproval
					});
					res = await res.json();
					if (res.success){
						setApprovals([
							...approvals,
							res.data
						]);
						setAddApproval(false);
						setApprovalData(initialApprovalData);
						approvalForm.resetFields();
						message.success("Approval added successfully");
					} else {
						message.error(res.message);
					}
				}).catch((err) => {
					console.log(err);
					message.error("Something went wrong while uploading image");
				});
			} else {
				message.error(res.message);
			}
		} catch (err) {
			console.log(err);
			message.error("Something went wrong");
		} finally {
			setLoading(false);
		}
	}

	const editApprovalHandler = async () => {
		try {
			setLoading(true);
			if(approvalData.name === ""){
				message.error("Please enter a name");
				return;
			}
			if(approvalData.description === ""){
				message.error("Please enter a description");
				return;
			}
			if(approvalData.image?.length === 0){
				message.error("Please upload an image");
				return;
			}
			const isNewImageAdded = !approvalData.image[0].isUploaded;
			let imageUrl = "";
			if (isNewImageAdded){
				let res = await _fetch("../api/admin/approvals/image-upload", {
					method: "POST",
					body: {
						name: approvalData.name,
						image: {
							name: approvalData.image[0].originFileObj.name,
							type: approvalData.image[0].originFileObj.type
						}
					}
				});
				res = await res.json();
				if (res.success){
					const url = res.data;
					let promise = fetch(url, {
						method: "PUT",
						headers: {
							"Content-type": approvalData.image[0].originFileObj.type,
						},
						body: approvalData.image[0].originFileObj,
					});
					await Promise.all([promise]).then(async (values) => {
						imageUrl = values[0].url.split("?")[0];
					}).catch((err) => {
						console.log(err);
						message.error("Something went wrong while uploading image");
					});
				} else {
					message.error(res.message);
				}	
			} else {
				imageUrl = approvalData.image[0].url;
			}
			const updatedApproval = {
				name: approvalData.name,
				description: approvalData.description,
				image: imageUrl,
				isNewImageAdded
			};
			let res = await _fetch(`../api/admin/approvals/${approvalData._id}`, {
				method: "PATCH",
				body: updatedApproval
			});
			res = await res.json();
			if (res.success){
				const updatedApprovals = approvals.map((approval) => {
					if (approval._id === approvalData._id){
						return res.data;
					} else {
						return approval;
					}
				});
				setApprovals(updatedApprovals);
				setAddApproval(false);
				setApprovalData(initialApprovalData);
				approvalForm.resetFields();
				message.success("Approval updated successfully");
			} else {
				message.error(res.message);
			}
		} catch (err) {
			console.log(err);
			message.error("Something went wrong");
		} finally {
			setLoading(false);
		}
	}

	const deleteApprovalHandler = async (id) => {
		try {
			setDeleteLoading(id);
			let res = await _fetch(`../api/admin/approvals/${id}`, {
				method: "DELETE"
			});
			res = await res.json();
			if (res.success){
				const updatedApprovals = approvals.filter((approval) => approval._id !== id);
				setApprovals(updatedApprovals);
				message.success("Approval deleted successfully");
			} else {
				message.error(res.message);
			}
		} catch (err) {
			console.log(err);
			message.error("Something went wrong");
		} finally {
			setDeleteLoading(null);
		}
	}

	return (
		<>
			<AdminNavigation />
			<div
				className="container mx-auto mt-4"
			>
				<div
					className="flex flex-row justify-between items-center"
				>
					<h1
						className="font-semibold text-3xl"
					>
                        Approvals
					</h1>
					<Button
						icon={
							<PlusOutlined />
						}
						onClick={() => setAddApproval(true)}
					>
                        Add Approval
					</Button>
				</div>
				{
					approvals.length > 0 ? (
						<Table
							className="mt-8"
							dataSource={approvals}
							columns={[
								{
									title: "Image",
									dataIndex: "image",
									key: "image",
									width: 120,
									render: (image) => (
										<Image
											src={image}
											alt="approval image"
											width={80}
											height={80}
											className="rounded-md"
										/>
									)
								},
								{
									title: "Name",
									dataIndex: "name",
									key: "name"
								},
								{
									title: "Description",
									dataIndex: "description",
									key: "description",
								},
								{
									title: "Action",
									key: "action",
									width: 250,
									render: (text, record) => (
										<div
											className="flex flex-row justify-center gap-2"
										>
											<Button
												type="primary"
												style={{
													backgroundColor: "#2F80ED",
													borderColor: "#2F80ED"
												}}
												onClick={() => {
													setApprovalData({
														_id: record._id,
														name: record.name,
														description: record.description,
														image: [
															{
																uid: "1",
																name: "image.png",
																status: "done",
																url: record.image,
																isUploaded: true
															}
														]
													})
												}}
											>
												Edit
											</Button>
											<Button
												type="primary"
												loading={deleteLoading === record._id}
												danger
												style={{
													backgroundColor: "#EB5757",
													borderColor: "#EB5757"
												}}
												onClick={() => deleteApprovalHandler(record._id)}
											>
												Delete
											</Button>
										</div>
									)
								}
							]}
						/>
					) : (
						<h2
							className="text-center text-xl text-slate-500 mt-28"
						>
                            No Approvals
						</h2>
					)
				}
			</div>
			<Modal
				centered
				title={addApproval ? "Add Approval" : "Edit Approval"}
				open={addApproval || approvalData._id}
				footer={null}
				onCancel={() => {
					setAddApproval(false);
					setApprovalData(initialApprovalData);
					approvalForm.resetFields();
				}}
			>
				<Form
					form={approvalForm}
					name="approvalForm"
					labelCol={{
						span: 6,
					}}
					wrapperCol={{
						span: 18,
					}}
					layout="horizontal"
					onFinish={addApproval ? addApprovalHandler : editApprovalHandler}
				>
					<Form.Item
						label="Image"
						labelAlign="left"
						required
					>
						<Upload
							accept="image/*"
							maxCount={1}
							listType="picture-card"
							fileList={approvalData.image}
							onChange={(info) => {
								setApprovalData({
									...approvalData,
									image: info.fileList
								})
							}}
						>
							<div>
								<PlusOutlined />
								<div
									className="ant-upload-text"
								>
									Upload
								</div>
							</div>
						</Upload>
					</Form.Item>
					<Form.Item
						label="Name"
						labelAlign="left"
						required
					>
						<Input
							placeholder="Name"
							value={approvalData.name}
							onChange={(e) => {
								setApprovalData({
									...approvalData,
									name: e.target.value
								})
							}}
						/>
					</Form.Item>
					<Form.Item
						label="Description"
						labelAlign="left"
						required
					>
						<Input.TextArea
							placeholder="Description"
							value={approvalData.description}
							onChange={(e) => {
								setApprovalData({
									...approvalData,
									description: e.target.value
								})
							}}
						/>
					</Form.Item>
					<div
						className="flex flex-row justify-end gap-2"
					>
						<Form.Item>
							<Button
								htmlType="button"
								onClick={() => {
									setAddApproval(false);
									setApprovalData(initialApprovalData);
									approvalForm.resetFields();
								}}
							>
								Cancel
							</Button>
						</Form.Item>
						<Form.Item>
							<Button
								type="primary"
								htmlType="submit"
								loading={loading}
								style={{
									backgroundColor: "#2F80ED",
									borderColor: "#2F80ED"
								}}
							>
								{addApproval ? "Add Approval" : "Edit Approval"}
							</Button>
						</Form.Item>
					</div>
				</Form>
			</Modal>
		</>
	)
}