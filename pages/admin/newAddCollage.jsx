import { useRouter } from "next/router";
import {
	Button,
	Col,
	Form,
	Input,
	Select,
	message,
	Typography,
	InputNumber,
	Row,
	Image as AntdImage,
	Checkbox,
} from "antd";
import { Modal, Upload } from "antd";
import { CloseOutlined, EditOutlined } from "@ant-design/icons";
import { useEffect, useRef, useState } from "react";
import collegeModel from "../../model/collegeModel";
import dbConnect from "../../dbConnect";
import { AdminNavigation } from "../../components/Navigation";
import tagsModel from "../../model/tags";
const Promise = require("promise");
import { PlusOutlined } from "@ant-design/icons";
import approvalModel from "../../model/approvalModel";
import placementPartnerModel from "../../model/placementPartnerModel";
import courseModel from "../../model/course";
const axios = require("axios");
import { _fetch } from "../../_fetch";
import { PlusCircleOutlined, DeleteOutlined } from "@ant-design/icons";
import fileModel from "../../model/fileModel";

export async function getServerSideProps({ req, query, resolvedUrl }) {
	try {
		await dbConnect();
		const tags = await tagsModel.find({});
		const placementPartners = await placementPartnerModel.find({});
		const approvals = await approvalModel.find({});
		return {
			props: {
				tags: JSON.parse(JSON.stringify(tags)),
				placementPartners: JSON.parse(JSON.stringify(placementPartners)),
				approvals: JSON.parse(JSON.stringify(approvals))
			}
		}
	} catch (error) {
		console.log(error);
		return {
			props: {
				tags: [],
				placementPartners: [],
				approvals: []
			}
		}
	}
}
export default function Collage(props) {
	const initialSampleCertificateData = {
		desc: "",
		pointers: [],
		image: "",
		imageFile: null,
	};
	const initialAdmissionProcessData = {
		desc: "",
		steps: [],
	};
	const initialFAQ = {
		question: "",
		answer: "",
	};
	const initialQuickFacts = {
		title: "",
		description: "",
	};
	const initialCardInfo = {
		title: "",
		desc: "",
	};
	const initialReview = {
		title: "",
		desc: "",
		rating: 0,
		user: "",
	};
	const initialPlacementPartner = {
		title: "",
		image: "",
		imageFile: null,
	};
	const [currentSampleCertificatePointer, setCurrentSampleCertificatePointer] =
		useState("");
	const [currentAdmissionProcessStep, setCurrentAdmissionProcessStep] =
		useState("");
	const [formdata, setFormadata] = useState({});
	const [currentFAQ, setCurrentFAQ] = useState(initialFAQ);
	const [currentQuickFacts, setCurrentQuickFacts] = useState(initialQuickFacts);
	const [currentCardInfo, setCurrentCardInfo] = useState(initialCardInfo);
	const [currentReview, setCurrentReview] = useState(initialReview);
	const [currentPlacementPartner, setCurrentPlacementPartner] = useState(
		initialPlacementPartner
	);
	const [placementPartners, setPlacementPartners] = useState(
		props.placementPartners
	);
	const [isAddPlacementPartnerOpen, setIsAddPlacementPartnerOpen] =
		useState(false);
	const router = useRouter();
	const { id } = router.query;
	const [form] = Form.useForm();
	const [form1] = Form.useForm();
	const handleOtherdata = (e) => {
		const { name, value } = e.target;
		setFormadata({
			...formdata,
			[name]: value,
		});
	};
	const [isAddFactOpen, setIsAddFactOpen] = useState(false);
	const [factText, setFactText] = useState("");
	const [data, setData] = useState([]);
	const [latest, setLatest] = useState([]);
	const [fileList, setFileList] = useState([]);
	const [option, setOption] = useState([]);
	const [showModal, setShowModal] = useState(false);
	const [majorModal, setMajorModal] = useState(false);
	const [previewOpen, setPreviewOpen] = useState(false);
	const [logo_img, setLogoImg] = useState([]);
	const [previewImage, setPreviewImage] = useState("");
	const [previewTitle, setPreviewTitle] = useState("");
	const [major, setMajor] = useState([]);
	const [prefilled, setPrefilled] = useState();
	const [bannerImage, setBannerImage] = useState([]);
	const [deletedImages, setDeletedImages] = useState([]);
	const [formData, setFormData] = useState({});
	const getBase64 = (file) =>
		new Promise((resolve, reject) => {
			const reader = new FileReader();
			reader.readAsDataURL(file);
			reader.onload = () => resolve(reader.result);
			reader.onerror = (error) => reject(error);
		});
	const handlePreview = async (file) => {
		if (!file.url && !file.preview) {
			file.preview = await getBase64(file.originFileObj);
		}
		setPreviewImage(file.url || file.preview);
		setPreviewOpen(true);
		setPreviewTitle(
			file.name || file.url.substring(file.url.lastIndexOf("/") + 1)
		);
	};
	const handlePreview1 = async (file) => {
		if (!file.url && !file.preview) {
			file.preview = await getBase64(file.originFileObj);
		}
		setPreviewImage(file.url || file.preview);
		setPreviewOpen(true);
		setPreviewTitle(
			file.name || file.url.substring(file.url.lastIndexOf("/") + 1)
		);
	};
	const handlelogo = async ({ fileList: logo }) => {
		setLogoImg(logo);
	};
	const handleimage = async ({ fileList: newFileList }) => {
		setFileList(newFileList);
	};
	const handleChange = (e) => {
		const { name, value } = e;
		setFormData({
			...formData,
			[name]: value,
		});
	};
	const handleCancel = () => setPreviewOpen(false);
	const uploadButton = (
		<div>
			<PlusOutlined />
			<div
				style={{
					marginTop: 8,
				}}
			>
				Upload
			</div>
		</div>
	);
	async function handleSampleCertificateSubmission() {
		try {
			let check = true;
			if (!formdata?.sample_certificate?.imageFile) {
				check = false;
				message.error("Please add a sample certificate image");
			} else if (!formdata?.sample_certificate?.desc) {
				check = false;
				message.error("Please add a sample certificate description");
			}

			if (!check) {
				return false;
			}

			if (formdata?.sample_certificate?.imageFile?.uid !== "-1") {
				const res = await fetch("../../../api/uploadFile", {
					method: "POST",
					headers: {
						"content-type": "application/json",
					},
					body: JSON.stringify({
						list: [formdata?.sample_certificate?.imageFile],
						college_name: data.college_name,
					}),
				});
				const imagedata = await res.json();
				const url = imagedata[0];
				let promise = fetch(url, {
					method: "PUT",
					headers: {
						"Content-type": formdata?.sample_certificate?.imageFile.type,
						"Access-Control-Allow-Origin": "*",
					},
					body: formdata?.sample_certificate?.imageFile.originFileObj,
				});
				await Promise.all([promise]).then((values) => {
					const imageUrl = values[0].url?.split("?")[0];
					delete formdata?.sample_certificate?.imageFile;
					formdata.sample_certificate.image = imageUrl;
				});
			}
			return true;
		} catch (err) {
			message.error("Something went wrong");
			return false;
		}
	}

	const handleUpdate = async (e) => {
		if (formdata.sample_certificate) {
			const check = await handleSampleCertificateSubmission();
			if (!check) {
				return;
			}
		}
		if (formdata?.admission_process) {
			if (!formdata?.admission_process?.desc) {
				message.error("Please add admission process description");
				return;
			}
			if (formdata?.admission_process?.steps?.length === 0) {
				message.error("Please add admission process steps");
				return;
			}
		}
		let isBannerImageAvailable = false;
		if (fileList?.length) {
			for (let i = 0; i < fileList.length; i++) {
				if (fileList[i]?.uid === bannerImage?.uid) {
					isBannerImageAvailable = true;
					break;
				}
			}
		}
		if (!isBannerImageAvailable) {
			message.error("Please select a banner image");
			return;
		}
		try {
			const filesToUpload = fileList.filter(
				(file) => !file?.isUploaded && file?.uid !== bannerImage?.uid
			);
			if (deletedImages.length > 0) {
				await fetch("../api/admin/file/delete-files", {
					method: "POST",
					headers: {
						"content-type": "application/json",
					},
					body: JSON.stringify({ fileIDs: deletedImages }),
				});
			}
			if (filesToUpload.length > 0) {
				let res = await fetch("../api/uploadFile", {
					method: "POST",
					headers: {
						"content-type": "application/json",
					},
					body: JSON.stringify({
						list: filesToUpload,
						college_name: data.college_name,
					}),
				});
				let imagedata = await res.json();
				let promises = [];
				imagedata?.forEach((url, index) => {
					let newfile = filesToUpload[index];

					let promise = fetch(url, {
						headers: {
							"Content-type": newfile.type,
							"Access-Control-Allow-Origin": "*",
						},
						method: "PUT",
						body: newfile.originFileObj,
					});
					promises.push(promise);
				});
				let array = [];
				let imagesdata = [];
				await Promise.all(promises)
					.then(function (res) {
						imagesdata = res;
						imagesdata?.forEach((file, i) => {
							let obj = {};
							let college_name = data.college_name;
							let college = college_name.replace(/\s+/g, "-");
							college = college.toLowerCase();
							let parsedUrl = new URL(file.url);
							let pathname = parsedUrl.pathname.slice(1);
							obj["college_id"] = data._id;
							obj["path"] = pathname;
							obj["name"] = fileList[i].name;
							array.push(obj);
						});
					})
					.catch((error) => {
						console.log(error);
					});
				await fetch("../api/admin/file", {
					method: "POST",
					headers: {
						"content-type": "application/json",
					},
					body: JSON.stringify({ filedata: array }),
				});
			}
			let fileID = "";
			if (bannerImage?.isUploaded) {
				fileID = bannerImage.uid;
			} else {
				let bannerImageRes = await fetch("../api/uploadFile", {
					method: "POST",
					headers: {
						"content-type": "application/json",
					},
					body: JSON.stringify({
						list: [bannerImage],
						college_name: data.college_name,
					}),
				});
				bannerImageRes = await bannerImageRes.json();
				bannerImageRes = await fetch(bannerImageRes[0], {
					headers: {
						"Content-type": bannerImage.type,
						"Access-Control-Allow-Origin": "*",
					},
					method: "PUT",
					body: bannerImage.originFileObj,
				});
				let bannerImageData = {
					college_id: data._id,
					path: new URL(bannerImageRes?.url)?.pathname?.slice(1),
					name: bannerImage.name,
				};
				bannerImageRes = await fetch("../api/admin/file", {
					method: "POST",
					headers: {
						"content-type": "application/json",
					},
					body: JSON.stringify({ filedata: [bannerImageData] }),
				});
				bannerImageRes = await bannerImageRes.json();
				fileID = bannerImageRes?.data[0]?._id;
			}

			let pathname = "";

			if (logo_img?.length > 0 && !logo_img[0]?.isUploaded) {
				let name = logo_img[0]?.name;
				name = name?.replace(/\s/g, "");

				let res1 = await fetch("../api/admin/singleupload", {
					method: "POST",
					headers: {
						"content-type": "application/json",
					},
					body: JSON.stringify({
						name: name,
						type: logo_img[0]?.type,
					}),
				});
				let response1 = await res1.json();
				if (response1.url) {
					let parsedUrl = new URL(response1?.url);
					pathname = parsedUrl.pathname.slice(1);
					await axios.put(response1?.url, logo_img[0]?.originFileObj, {
						headers: {
							"Content-type": logo_img[0]?.type,
							"Access-Control-Allow-Origin": "*",
						},
					});
				}
			}

			const toUpdateFields =
				pathname === ""
					? {
						...formdata,
						banner_image: fileID,
						tags: selectedValue,
					}
					: {
						...formdata,
						banner_image: fileID,
						tags: selectedValue,
						logo: pathname,
					};

			let check = await fetch(`../api/admin/college`, {
				method: "POST",
				headers: {
					"content-type": "application/json",
				},
				body: JSON.stringify(toUpdateFields),
			});
			const res = await check.json();
			if (res.success) {
				message.success("College Details Updated");
			} else {
				message.error("error occured");
			}
		} catch (err) {
			console.log(err.message);
		}
	};



	const tagArr = props.tags?.map((e) => ({ label: e.tag_name, value: e._id }));


	const [selectedValue, setSelectedValue] = useState([]);

	const handleSelect = (value) => {
		setSelectedValue(value);
	};
	async function handleAddPlacementPartner() {
		try {
			if (
				currentPlacementPartner?.title?.length > 0 &&
				currentPlacementPartner?.imageFile
			) {
				let res = await _fetch(
					"../api/admin/placement-partners/image-upload",
					{
						method: "POST",
						body: {
							title: currentPlacementPartner.title,
							image: {
								name: currentPlacementPartner.imageFile.name,
								type: currentPlacementPartner.imageFile.type,
							},
						},
					}
				);
				res = await res.json();
				if (res.success) {
					const url = res.data;
					let promise = fetch(url, {
						method: "PUT",
						headers: {
							"Content-type": currentPlacementPartner.imageFile.type,
							"Access-Control-Allow-Origin": "*",
						},
						body: currentPlacementPartner.imageFile.originFileObj,
					});
					await Promise.all([promise]).then((values) => {
						const imageUrl = values[0].url?.split("?")[0];
						currentPlacementPartner.image = imageUrl;
					});
					res = await _fetch("../api/admin/placement-partners", {
						method: "POST",
						body: {
							title: currentPlacementPartner.title,
							image: currentPlacementPartner.image,
						},
					});
					res = await res.json();
					if (res.success) {
						message.success("Placement partner added successfully");
						setPlacementPartners([...placementPartners, res.data]);
						setIsAddPlacementPartnerOpen(false);
						setCurrentPlacementPartner(initialPlacementPartner);
					} else {
						message.error("Something went wrong");
					}
				}
			}
		} catch (e) {
			console.log(e);
			message.error("Something went wrong");
		}
	}

	return (
		<>
			<AdminNavigation />
			<Row gutter={[16, 16]}>
				<Col xs={24} md={8}>
					<div className="pb-4 px-4">
						<div className="w-full space-y-8">
							<div>
								<h2 className="mt-6 text-3xl font-bold tracking-tight text-gray-900">
									Add College
								</h2>
							</div>

							<div className="-space-y-px rounded-md shadow-sm">
								<div>
									<label className="sr-only">College Name</label>
									<input
										name="college_name"
										defaultValue={data?.college_name}
										onChange={handleOtherdata}
										type="text"
										autoComplete="College Name"
										required
										className="relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
										placeholder="College Name"
									/>
								</div>
								<div>
									<label htmlFor="password" className="sr-only">
										University
									</label>
									<input
										defaultValue={data?.university}
										onChange={handleOtherdata}
										name="university"
										type="text"
										autoComplete="current-password"
										required
										className="relative block w-full appearance-none rounded-none rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm mt-2"
										placeholder="University"
									/>
								</div>

								<div>
									<label htmlFor="password" className="sr-only">
										Description
									</label>
									<textarea
										defaultValue={data?.description}
										onChange={handleOtherdata}
										name="description"
										type="textarea"
										required
										className="relative block w-full appearance-none rounded-none rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm mt-2"
										placeholder="Description"
									/>
								</div>
								<div className="flex justify-between pt-4">
									<label>Publish College</label>
									<select name="hidecollege" onChange={handleOtherdata}>
										<option value={data?.hidecollege}>
											{data?.hidecollege ? "Yes" : "No"}
										</option>
										<option value={!data?.hidecollege}>
											{!data?.hidecollege ? "Yes" : "No"}
										</option>
									</select>
								</div>

								<div className="pt-4">
									<label htmlFor="password" className="sr-only">
										Rating
									</label>
									<input
										defaultValue={data?.rating}
										onChange={handleOtherdata}
										name="rating"
										type="number"
										autoComplete="current-password"
										required
										className="relative block w-full appearance-none rounded-none rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm mt-2"
										placeholder="Rating"
									/>
								</div>
								<div>
									<label htmlFor="password" className="sr-only">
										College Link
									</label>
									<input
										defaultValue={data?.link}
										onChange={handleOtherdata}
										name="link"
										type="text"
										required
										className="relative block w-full appearance-none rounded-none rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm mt-2"
										placeholder="College Link"
									/>
								</div>
							</div>
							<Select
								mode="multiple"
								allowClear
								style={{ width: "100%" }}
								onChange={handleSelect}
								placeholder="Select Tags"
								options={tagArr}
							/>
							<div>
								<p className="text-sm mt-2">College Approvals</p>
								<Select
									mode="multiple"
									allowClear
									showSearch
									placeholder="Select Approvals"
									defaultValue={props?.college?.approvals}
									options={props?.approvals?.map((approval) => ({
										label: approval.name,
										value: approval._id,
									}))}
									onChange={(value) => {
										setFormadata({
											...formdata,
											approvals: value,
										});
									}}
									filterOption={(input, option) =>
										option.label.toLowerCase().indexOf(input.toLowerCase()) >= 0
									}
									className="w-full mt-2"
								/>
							</div>
							<div>
								<div className="flex items-center justify-between mb-2">
									<Typography.Title level={5}>
										Placement Partners
									</Typography.Title>
									{isAddPlacementPartnerOpen ? (
										<Button
											type="text"
											icon={<CloseOutlined />}
											onClick={() => {
												setIsAddPlacementPartnerOpen(false);
												setCurrentPlacementPartner(initialPlacementPartner);
											}}
										>
											Cancel
										</Button>
									) : (
										<Button
											type="text"
											icon={<PlusCircleOutlined />}
											onClick={() => {
												setIsAddPlacementPartnerOpen(true);
											}}
										>
											Add
										</Button>
									)}
								</div>
								{isAddPlacementPartnerOpen && (
									<>
										<Input
											placeholder="Enter placement partner name"
											value={currentPlacementPartner.title}
											onChange={(e) =>
												setCurrentPlacementPartner({
													...currentPlacementPartner,
													title: e.target.value,
												})
											}
										/>
										<Upload
											className="mt-2"
											accept="image/*"
											maxCount={1}
											listType="picture-card"
											fileList={
												currentPlacementPartner.imageFile
													? [currentPlacementPartner.imageFile]
													: []
											}
											onChange={({ fileList }) =>
												setCurrentPlacementPartner({
													...currentPlacementPartner,
													imageFile: fileList[0],
												})
											}
											onRemove={() => {
												setCurrentPlacementPartner({
													...currentPlacementPartner,
													imageFile: null,
												});
											}}
											onPreview={handlePreview}
										>
											{currentPlacementPartner.imageFile ? null : uploadButton}
										</Upload>
										<Button
											icon={<PlusOutlined />}
											className="mt-2 w-full text-center"
											type="text"
											onClick={async () => {
												if (
													currentPlacementPartner.title &&
													currentPlacementPartner.imageFile
												) {
													await handleAddPlacementPartner();
												} else {
													message.error(
														"Please enter placement partner name and image"
													);
												}
											}}
										>
											Add Placement Partner
										</Button>
									</>
								)}
								<Select
									mode="multiple"
									allowClear
									showSearch
									placeholder="Select Placement Partners"
									defaultValue={props?.college?.placement_partners}
									options={placementPartners?.map((partner) => ({
										label: partner.title,
										value: partner._id,
									}))}
									onChange={(value) => {
										setFormadata({
											...formdata,
											placement_partners: value,
										});
									}}
									filterOption={(input, option) =>
										option.label.toLowerCase().indexOf(input.toLowerCase()) >= 0
									}
									className="w-full mt-2"
								/>
							</div>
							<div>
								<h1 style={{ fontFamily: "Poppins" }}>Upload Images</h1>
								<Upload
									accept="image/*"
									multiple={true}
									listType="picture"
									fileList={fileList}
									itemRender={(originNode, file) => (
										<>
											<div className="flex items-center gap-x-2 p-2 border border-slate-300 rounded-md my-1 justify-between">
												<div className="flex gap-x-2 flex-1 items-center">
													<AntdImage
														className="rounded-md "
														width={80}
														height={80}
														src={file?.isUploaded ? file?.url : file?.thumbUrl}
													/>
													<div className="flex flex-1 justify-between items-center">
														<div>
															<p>{file.name}</p>
															<p>
																{file?.isUploaded
																	? "Uploaded"
																	: `${file?.size / 1000} KB`}
															</p>
														</div>
														<DeleteOutlined
															onClick={() => {
																if (fileList?.length === 1) {
																	message.error(
																		"Atleast one image is required"
																	);
																} else {
																	setFileList(
																		fileList?.filter((e) => e.uid !== file.uid)
																	);
																	if (file?.isUploaded) {
																		setDeletedImages([
																			...deletedImages,
																			file?.uid,
																		]);
																	}
																}
															}}
															className="cursor-pointer text-red-500 text-lg mr-2"
														/>
													</div>
												</div>
												<div className="flex gap-x-1 items-center">
													<Checkbox
														checked={bannerImage?.uid === file?.uid}
														onClick={() => {
															setBannerImage(file);
														}}
													/>
													<p>Banner Image</p>
												</div>
											</div>
										</>
									)}
									onPreview={handlePreview}
									onChange={handleimage}
								>
									{fileList?.length >= 8 ? null : (
										<div className="mb-4 h-24 w-24 rounded-lg flex flex-col items-center justify-center border border-slate-300 border-dashed bg-[#fafafa]">
											<PlusOutlined />
											<p>Upload</p>
										</div>
									)}
								</Upload>
								<Modal
									open={previewOpen}
									title={previewTitle}
									footer={null}
									onCancel={handleCancel}
								>
									<img
										alt="example"
										style={{
											width: "100%",
										}}
										src={previewImage}
									/>
								</Modal>
							</div>
							<div className="">
								<h1 style={{ fontFamily: "Poppins" }}>Upload Logo</h1>
								<Upload
									maxCount={1}
									accept="image/*"
									listType="picture-card"
									fileList={logo_img}
									onPreview={handlePreview1}
									onChange={handlelogo}
								>
									{logo_img.length >= 1 ? null : uploadButton}
								</Upload>
								<Modal
									open={previewOpen}
									title={previewTitle}
									footer={null}
									onCancel={handleCancel}
								>
									<img
										alt="example"
										style={{
											width: "100%",
										}}
										src={previewImage}
									/>
								</Modal>
							</div>
							<div>
								<div className="flex items-center justify-between mb-2">
									<Typography.Title level={5}>College Facts</Typography.Title>
									<Button
										type="text"
										icon={<PlusCircleOutlined />}
										onClick={() => setIsAddFactOpen(true)}
									>
										Add Fact
									</Button>
								</div>
								{isAddFactOpen && (
									<div>
										<Input.TextArea
											placeholder="Enter fact"
											value={factText}
											onChange={(e) => setFactText(e.target.value)}
										/>
										<div className="flex items-center justify-end gap-2 mt-2">
											<Button
												onClick={() => {
													setIsAddFactOpen(false);
													setFactText("");
												}}
												type="text"
											>
												Cancel
											</Button>
											<Button
												onClick={() => {
													if (data?.facts?.length > 0) {
														setData({
															...data,
															facts: [...data?.facts, factText],
														});
														setFormadata({
															...formdata,
															facts: [...data?.facts, factText],
														});
													} else {
														setData({
															...data,
															facts: [factText],
														});
														setFormadata({
															...formdata,
															facts: [factText],
														});
													}
													setFactText("");
													setIsAddFactOpen(false);
												}}
											>
												Add
											</Button>
										</div>
									</div>
								)}
								{data?.facts?.length > 0 ? (
									<ul className="list-disc list-inside">
										{data?.facts?.map((fact, index) => (
											<div
												className="flex items-center justify-between"
												key={index}
											>
												<li className="w-4/5">{fact}</li>
												<Button
													className="w-1/5"
													type="text"
													icon={<DeleteOutlined className="text-red-500" />}
													onClick={() => {
														const newFacts = data?.facts?.filter(
															(fact, i) => i !== index
														);
														setData({
															...data,
															facts: newFacts,
														});
														setFormadata({
															...formdata,
															facts: newFacts,
														});
													}}
												/>
											</div>
										))}
									</ul>
								) : (
									<p>No facts added</p>
								)}
							</div>

							<div>
								<div className="flex items-center justify-between mb-2">
									<Typography.Title level={5}>
										Sample Certificate
									</Typography.Title>
									{!data?.sample_certificate ? (
										<Button
											type="text"
											icon={<PlusCircleOutlined />}
											onClick={() => {
												setData({
													...data,
													sample_certificate: initialSampleCertificateData,
												});
												setFormadata({
													...formdata,
													sample_certificate: initialSampleCertificateData,
												});
											}}
										>
											Add Sample Certificate
										</Button>
									) : (
										<Button
											type="text"
											icon={<CloseOutlined />}
											onClick={() => {
												setData({
													...data,
													sample_certificate: null,
												});
												setFormadata({
													...formdata,
													sample_certificate: null,
												});
											}}
										>
											Remove Sample Certificate
										</Button>
									)}
								</div>
								{!data?.sample_certificate ? (
									<Typography.Text className="text-center ">
										No Sample Certificate Added
									</Typography.Text>
								) : (
									<>
										<Input.TextArea
											placeholder="Description"
											value={data?.sample_certificate?.desc}
											onChange={(e) => {
												const updatedSampleCertificate = {
													...data?.sample_certificate,
													desc: e?.target?.value,
												};
												setData({
													...data,
													sample_certificate: updatedSampleCertificate,
												});
												setFormadata({
													...formdata,
													sample_certificate: updatedSampleCertificate,
												});
											}}
										/>
										<Typography.Text className="my-1">Pointers</Typography.Text>
										<Input.Search
											value={currentSampleCertificatePointer}
											onChange={(e) => {
												setCurrentSampleCertificatePointer(e.target.value);
											}}
											className="my-1"
											placeholder="Pointer"
											enterButton={<Button>Add</Button>}
											onSearch={() => {
												if (currentSampleCertificatePointer.length > 0) {
													const updatedSampleCertificate = {
														...data?.sample_certificate,
														pointers: [
															...data?.sample_certificate?.pointers,
															currentSampleCertificatePointer,
														],
													};
													setData({
														...data,
														sample_certificate: updatedSampleCertificate,
													});
													setFormadata({
														...formdata,
														sample_certificate: updatedSampleCertificate,
													});
													setCurrentSampleCertificatePointer("");
												}
											}}
										/>
										<ul className="list-disc list-inside">
											{data?.sample_certificate?.pointers?.map(
												(point, index) => (
													<div
														className="flex items-center justify-between"
														key={index}
													>
														<li className="w-4/5">{point}</li>
														<Button
															className="w-1/5"
															type="text"
															icon={<DeleteOutlined className="text-red-500" />}
															onClick={() => {
																const updatedSampleCertificate = {
																	...data?.sample_certificate,
																	pointers:
																		data?.sample_certificate?.pointers.filter(
																			(e, p_index) => index !== p_index
																		),
																};
																setData({
																	...data,
																	sample_certificate: updatedSampleCertificate,
																});
																setFormadata({
																	...formdata,
																	sample_certificate: updatedSampleCertificate,
																});
															}}
														/>
													</div>
												)
											)}
										</ul>
										<Typography.Text className="my-1">
											Sample Certificate Image
										</Typography.Text>
										<Upload
											className="my-1"
											maxCount={1}
											accept="image/*"
											listType="picture-card"
											fileList={
												data?.sample_certificate?.imageFile
													? [data?.sample_certificate?.imageFile]
													: []
											}
											onChange={(e) => {
												const updatedSampleCertificate = {
													...data?.sample_certificate,
													imageFile: e?.fileList?.[0],
												};
												setData({
													...data,
													sample_certificate: updatedSampleCertificate,
												});
												setFormadata({
													...formdata,
													sample_certificate: updatedSampleCertificate,
												});
											}}
											onRemove={() => {
												const updatedSampleCertificate = {
													...data?.sample_certificate,
													image: null,
													imageFile: null,
												};
												setData({
													...data,
													sample_certificate: updatedSampleCertificate,
												});
												setFormadata({
													...formdata,
													sample_certificate: updatedSampleCertificate,
												});
											}}
											onPreview={handlePreview}
										>
											{data?.sample_certificate?.imageFile
												? null
												: uploadButton}
										</Upload>
									</>
								)}
							</div>
							<div>
								<div className="flex items-center justify-between mb-2">
									<Typography.Title level={5}>
										Admission Process
									</Typography.Title>
									{!data?.admission_process ? (
										<Button
											type="text"
											icon={<PlusCircleOutlined />}
											onClick={() => {
												setData({
													...data,
													admission_process: initialAdmissionProcessData,
												});
												setFormadata({
													...formdata,
													admission_process: initialAdmissionProcessData,
												});
											}}
										>
											Add Admission Process
										</Button>
									) : (
										<Button
											type="text"
											icon={<CloseOutlined />}
											onClick={() => {
												setData({
													...data,
													admission_process: null,
												});
												setFormadata({
													...formdata,
													admission_process: null,
												});
											}}
										>
											Remove Admission Process
										</Button>
									)}
								</div>
								{!data?.admission_process ? (
									<Typography.Text className="text-center ">
										No Admission Process Added
									</Typography.Text>
								) : (
									<>
										<Input.TextArea
											placeholder="Description"
											value={data?.admission_process?.desc}
											onChange={(e) => {
												const updatedAdmissionProcessData = {
													...data?.admission_process,
													desc: e?.target?.value,
												};
												setData({
													...data,
													admission_process: updatedAdmissionProcessData,
												});
												setFormadata({
													...formdata,
													admission_process: updatedAdmissionProcessData,
												});
											}}
										/>
										<Typography.Text className="my-1">Steps</Typography.Text>
										<Input.Search
											value={currentAdmissionProcessStep}
											onChange={(e) => {
												setCurrentAdmissionProcessStep(e.target.value);
											}}
											className="my-1"
											placeholder="Pointer"
											enterButton={<Button>Add</Button>}
											onSearch={() => {
												if (currentAdmissionProcessStep.length > 0) {
													const updatedAdmissionProcessData = {
														...data?.admission_process,
														steps: [
															...data?.admission_process?.steps,
															currentAdmissionProcessStep,
														],
													};
													setData({
														...data,
														admission_process: updatedAdmissionProcessData,
													});
													setFormadata({
														...formdata,
														admission_process: updatedAdmissionProcessData,
													});
													setCurrentAdmissionProcessStep("");
												}
											}}
										/>
										<ul className="list-disc list-inside">
											{data?.admission_process?.steps?.map((point, index) => (
												<div
													className="flex items-center justify-between"
													key={index}
												>
													<li className="w-4/5">{point}</li>
													<Button
														className="w-1/5"
														type="text"
														icon={<DeleteOutlined className="text-red-500" />}
														onClick={() => {
															const updatedAdmissionProcessData = {
																...data?.admission_process,
																steps: data?.admission_process?.steps.filter(
																	(e, p_index) => index !== p_index
																),
															};
															setData({
																...data,
																admission_process: updatedAdmissionProcessData,
															});
															setFormadata({
																...formdata,
																admission_process: updatedAdmissionProcessData,
															});
														}}
													/>
												</div>
											))}
										</ul>
									</>
								)}
							</div>

							<div>
								<div className="flex items-center justify-between mb-2">
									<Typography.Title level={5}>FAQs</Typography.Title>
									{!data?.faqs ? (
										<Button
											type="text"
											icon={<PlusCircleOutlined />}
											onClick={() => {
												setData({
													...data,
													faqs: [],
												});
												setFormadata({
													...formdata,
													faqs: [],
												});
											}}
										>
											Add FAQs
										</Button>
									) : (
										<Button
											type="text"
											icon={<CloseOutlined />}
											onClick={() => {
												setData({
													...data,
													faqs: [],
												});
												setFormadata({
													...formdata,
													faqs: [],
												});
											}}
										>
											Remove FAQs
										</Button>
									)}
								</div>
								{!data?.faqs ? (
									<Typography.Text className="text-center ">
										No FAQs Added
									</Typography.Text>
								) : (
									<>
										<Input
											className="mb-2"
											placeholder="Question"
											value={currentFAQ?.question}
											onChange={(e) => {
												setCurrentFAQ({
													...currentFAQ,
													question: e?.target?.value,
												});
											}}
										></Input>
										<Input.TextArea
											placeholder="Answer"
											value={currentFAQ?.answer}
											onChange={(e) => {
												setCurrentFAQ({
													...currentFAQ,
													answer: e?.target?.value,
												});
											}}
										/>
										<Button
											type="text"
											icon={<PlusCircleOutlined />}
											className="w-full mt-2"
											onClick={() => {
												if (
													currentFAQ?.question?.length > 0 &&
													currentFAQ?.answer?.length > 0
												) {
													const updatedFAQs = [...data?.faqs, currentFAQ];
													setData({
														...data,
														faqs: updatedFAQs,
													});
													setFormadata({
														...formdata,
														faqs: updatedFAQs,
													});
													setCurrentFAQ({
														question: "",
														answer: "",
													});
												}
											}}
										>
											Add FAQ
										</Button>
										<ul className="list-disc list-inside">
											{data?.faqs?.map((faq, index) => (
												<div key={index} className="flex justify-between">
													<div>
														<li className="my-2">
															<span className="font-bold">
																Q: {faq?.question}
															</span>
														</li>
														<span className="my-2">A: {faq?.answer}</span>
													</div>
													<Button
														type="text"
														icon={<DeleteOutlined className="text-red-500" />}
														onClick={() => {
															const updatedFAQs = data?.faqs?.filter(
																(e, p_index) => index !== p_index
															);
															setData({
																...data,
																faqs: updatedFAQs,
															});
															setFormadata({
																...formdata,
																faqs: updatedFAQs,
															});
														}}
													/>
												</div>
											))}
										</ul>
									</>
								)}
							</div>
							<div>
								<div className="flex items-center justify-between mb-2">
									<Typography.Title level={5}>Card Infos</Typography.Title>
									{!data?.info_cards ? (
										<Button
											type="text"
											icon={<PlusCircleOutlined />}
											onClick={() => {
												setData({
													...data,
													info_cards: [],
												});
												setFormadata({
													...formdata,
													info_cards: [],
												});
											}}
										>
											Add Card Infos
										</Button>
									) : (
										<Button
											type="text"
											icon={<CloseOutlined />}
											onClick={() => {
												setData({
													...data,
													info_cards: [],
												});
												setFormadata({
													...formdata,
													info_cards: [],
												});
											}}
										>
											Remove Card Infos
										</Button>
									)}
								</div>
								{!data?.info_cards ? (
									<Typography.Text className="text-center ">
										No Card Infos Added
									</Typography.Text>
								) : (
									<>
										{(!data?.info_cards || data?.info_cards?.length < 3) && (
											<>
												<Input
													className="mb-2"
													placeholder="Title"
													value={currentCardInfo?.title}
													onChange={(e) => {
														setCurrentCardInfo({
															...currentCardInfo,
															title: e?.target?.value,
														});
													}}
												></Input>
												<Input.TextArea
													placeholder="Description"
													value={currentCardInfo?.desc}
													onChange={(e) => {
														setCurrentCardInfo({
															...currentCardInfo,
															desc: e?.target?.value,
														});
													}}
												/>
												<Button
													type="text"
													icon={<PlusCircleOutlined />}
													className="w-full mt-2"
													onClick={() => {
														if (
															currentCardInfo?.title?.length > 0 &&
															currentCardInfo?.desc?.length > 0
														) {
															const updatedCardInfos = [
																...data?.info_cards,
																currentCardInfo,
															];
															setData({
																...data,
																info_cards: updatedCardInfos,
															});
															setFormadata({
																...formdata,
																info_cards: updatedCardInfos,
															});
															setCurrentCardInfo({
																title: "",
																desc: "",
															});
														}
													}}
												>
													Add Card Info
												</Button>
											</>
										)}
										<ul className="list-disc list-inside">
											{data?.info_cards?.map((card, index) => (
												<div key={index} className="flex justify-between">
													<div>
														<li className="my-2">
															<span className="font-bold">{card?.title}</span>
														</li>
														<span className="my-2">{card?.desc}</span>
													</div>
													<Button
														type="text"
														icon={<DeleteOutlined className="text-red-500" />}
														onClick={() => {
															const updatedCardInfos = data?.info_cards?.filter(
																(e, p_index) => index !== p_index
															);
															setData({
																...data,
																info_cards: updatedCardInfos,
															});
															setFormadata({
																...formdata,
																info_cards: updatedCardInfos,
															});
														}}
													/>
												</div>
											))}
										</ul>
									</>
								)}
							</div>

							<div>
								<div className="flex items-center justify-between mb-2">
									<Typography.Title level={5}>Reviews</Typography.Title>
									{!data?.reviews ? (
										<Button
											type="text"
											icon={<PlusCircleOutlined />}
											onClick={() => {
												setData({
													...data,
													reviews: [],
												});
												setFormadata({
													...formdata,
													reviews: [],
												});
											}}
										>
											Add Reviews
										</Button>
									) : (
										<Button
											type="text"
											icon={<CloseOutlined />}
											onClick={() => {
												setData({
													...data,
													reviews: [],
												});
												setFormadata({
													...formdata,
													reviews: [],
												});
											}}
										>
											Remove Reviews
										</Button>
									)}
								</div>
								{!data?.reviews ? (
									<Typography.Text className="text-center ">
										No Reviews Added
									</Typography.Text>
								) : (
									<>
										<Input
											className="mb-2"
											placeholder="Name"
											value={currentReview?.user}
											onChange={(e) => {
												setCurrentReview({
													...currentReview,
													user: e?.target?.value,
												});
											}}
										></Input>
										<Input
											className="mb-2"
											placeholder="Title"
											value={currentReview?.title}
											onChange={(e) => {
												setCurrentReview({
													...currentReview,
													title: e?.target?.value,
												});
											}}
										></Input>
										<InputNumber
											className="mb-2 w-full"
											placeholder="Rating"
											value={currentReview?.rating}
											onChange={(e) => {
												setCurrentReview({
													...currentReview,
													rating: e,
												});
											}}
											max={5}
											min={0}
											step={0.1}
										/>
										<Input.TextArea
											placeholder="Description"
											value={currentReview?.desc}
											onChange={(e) => {
												setCurrentReview({
													...currentReview,
													desc: e?.target?.value,
												});
											}}
										/>

										<Button
											type="text"
											icon={<PlusCircleOutlined />}
											className="w-full mt-2"
											onClick={() => {
												if (
													currentReview?.user?.length > 0 &&
													currentReview?.title?.length > 0 &&
													currentReview?.rating?.toString()?.length > 0 &&
													currentReview?.desc?.length > 0
												) {
													const newReview = {
														...currentReview,
														rating: Math.min(currentReview?.rating, 5),
													};
													const updatedReviews = [...data?.reviews, newReview];
													setData({
														...data,
														reviews: updatedReviews,
													});
													setFormadata({
														...formdata,
														reviews: updatedReviews,
													});
													setCurrentReview({
														user: "",
														title: "",
														rating: 0,
														desc: "",
													});
												}
											}}
										>
											Add Review
										</Button>
										<ul className="list-disc list-inside">
											{data?.reviews?.map((review, index) => (
												<div key={index} className="flex justify-between">
													<div>
														<li className="my-2">
															<span className="font-bold">{review.title}</span>
														</li>
														<p className="my-2">{review.desc}</p>
														<p className="my-2">{review.user}</p>
														<p className="my-2">{review.rating}</p>
													</div>
													<Button
														type="text"
														icon={<DeleteOutlined className="text-red-500" />}
														onClick={() => {
															const updatedReviews = data?.reviews?.filter(
																(e, p_index) => index !== p_index
															);
															setData({
																...data,
																reviews: updatedReviews,
															});
															setFormadata({
																...formdata,
																reviews: updatedReviews,
															});
														}}
													/>
												</div>
											))}
										</ul>
									</>
								)}
							</div>

							<div>
								<div className="flex items-center justify-between mb-2">
									<Typography.Title level={5}>Quick Facts</Typography.Title>
									{!data?.quick_facts ? (
										<Button
											type="text"
											icon={<PlusCircleOutlined />}
											onClick={() => {
												setData({
													...data,
													quick_facts: [],
												});
												setFormadata({
													...formdata,
													quick_facts: [],
												});
											}}
										>
											Add Quick Facts
										</Button>
									) : (
										<Button
											type="text"
											icon={<CloseOutlined />}
											onClick={() => {
												setData({
													...data,
													quick_facts: [],
												});
												setFormadata({
													...formdata,
													quick_facts: [],
												});
											}}
										>
											Remove Quick Facts
										</Button>
									)}
								</div>
								{!data?.quick_facts ? (
									<Typography.Text className="text-center ">
										No Quick Facts Added
									</Typography.Text>
								) : (
									<>
										<Input
											className="mb-2"
											placeholder="Title"
											value={currentQuickFacts?.title}
											onChange={(e) => {
												setCurrentQuickFacts({
													...currentQuickFacts,
													title: e?.target?.value,
												});
											}}
										></Input>
										<Input.TextArea
											placeholder="Description"
											value={currentQuickFacts?.description}
											onChange={(e) => {
												setCurrentQuickFacts({
													...currentQuickFacts,
													description: e?.target?.value,
												});
											}}
										/>
										<Button
											type="text"
											icon={<PlusCircleOutlined />}
											className="w-full mt-2"
											onClick={() => {
												if (currentQuickFacts?.title?.length > 0 &&
													currentQuickFacts?.description?.length > 0 && data?.quick_facts?.length === 5
												) {
													message.error("maximum 5 quick facts can be added")
													return
												}
												if (
													currentQuickFacts?.title?.length > 0 &&
													currentQuickFacts?.description?.length > 0
												) {

													const updatedQuickFacts = [...data?.quick_facts, currentQuickFacts];
													setData({
														...data,
														quick_facts: updatedQuickFacts,
													});
													setFormadata({
														...formdata,
														quick_facts: updatedQuickFacts,
													});
													setCurrentQuickFacts({
														title: "",
														description: "",
													});
												}
											}}
										>
											Add Quick Facts
										</Button>
										<ul className="list-disc list-inside">
											{data?.quick_facts?.map((facts, index) => (
												<div key={index} className="flex justify-between">
													<div>
														<li className="my-2">
															<span className="font-bold">
																Title: {facts?.title}
															</span>
														</li>
														<span className="my-2">Description: {facts?.description}</span>
													</div>
													<Button
														type="text"
														icon={<DeleteOutlined className="text-red-500" />}
														onClick={() => {
															const updatedFAQs = data?.quick_facts?.filter(
																(e, p_index) => index !== p_index
															);
															setData({
																...data,
																quick_facts: updatedFAQs,
															});
															setFormadata({
																...formdata,
																quick_facts: updatedFAQs,
															});
														}}
													/>
												</div>
											))}
										</ul>
									</>
								)}
							</div>

							<div>
								<button
									type="submit"
									className="group relative flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
									onClick={() => {
										handleUpdate();
									}}
								>
									Add Colage
								</button>
							</div>
						</div>
					</div>
				</Col>
			</Row>
		</>
	);
}
