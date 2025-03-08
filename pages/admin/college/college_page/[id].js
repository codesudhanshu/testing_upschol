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
import { useEffect, useState } from "react";
import collegeModel from "../../../../model/collegeModel";
import dbConnect from "../../../../dbConnect";
import { AdminNavigation } from "../../../../components/Navigation";
import tagsModel from "../../../../model/tags";
const Promise = require("promise");
import { PlusOutlined } from "@ant-design/icons";
import approvalModel from "../../../../model/approvalModel";
import placementPartnerModel from "../../../../model/placementPartnerModel";
import courseModel from "../../../../model/course";
const axios = require("axios");
import { _fetch } from "../../../../_fetch";
import { PlusCircleOutlined, DeleteOutlined } from "@ant-design/icons";
import fileModel from "../../../../model/fileModel";
import * as Sentry from "@sentry/nextjs";

export async function getServerSideProps(context) {
	await dbConnect();
	const college = await collegeModel.findById(context.params.id).lean();
	if (!college) {
		return {
			notFound: true,
		};
	}
	const photos = await fileModel.find({ college_id: college._id });
	const courses = await courseModel.find({});
	const tags = await tagsModel.find({}).lean();
	const approvals = await approvalModel.find({});
	const placementPartners = await placementPartnerModel.find({});
	if (!courses) {
		return {
			props: {
				college: JSON.parse(JSON.stringify(college)),
				tags: JSON.parse(JSON.stringify(tags)),
				approvals: JSON.parse(JSON.stringify(approvals)),
				photos: JSON.parse(JSON.stringify(photos)),
				placementPartners: JSON.parse(JSON.stringify(placementPartners)),
			},
		};
	}
	return {
		props: {
			college: JSON.parse(JSON.stringify(college)),
			tags: JSON.parse(JSON.stringify(tags)),
			courses: JSON.parse(JSON.stringify(courses)),
			approvals: JSON.parse(JSON.stringify(approvals)),
			placementPartners: JSON.parse(JSON.stringify(placementPartners)),
			photos: JSON.parse(JSON.stringify(photos)),
		},
	};
}
export default function Edit(props) {
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
	const [fileList, setFileList] = useState(
		props?.photos?.map((e) => ({
			uid: e._id,
			name: e.name,
			status: "done",
			url: `https://upschol.s3.ap-south-1.amazonaws.com/${e.path}`,
			type: "image/*",
			isUploaded: true,
		}))
	);
	const [option, setOption] = useState([]);
	const [showModal, setShowModal] = useState(false);
	const [majorModal, setMajorModal] = useState(false);
	const [previewOpen, setPreviewOpen] = useState(false);
	const [logo_img, setLogoImg] = useState([
		{
			uid: "-1",
			name: "College Logo",
			status: "done",
			isUploaded: true,
			url: `https://upschol.s3.ap-south-1.amazonaws.com/${props?.college?.logo}`,
			thumbUrl: `https://upschol.s3.ap-south-1.amazonaws.com/${props?.college?.logo}`,
		},
	]);
	const [previewImage, setPreviewImage] = useState("");
	const [previewTitle, setPreviewTitle] = useState("");
	const [major, setMajor] = useState([]);
	const [prefilled, setPrefilled] = useState();
	const [bannerImage, setBannerImage] = useState(
		props?.photos
			?.filter((e) => e._id === props?.college?.banner_image)
			?.map((e) => ({
				uid: e._id,
				name: e.name,
				status: "done",
				url: new URL(`https://upschol.s3.ap-south-1.amazonaws.com/${e.path}`),
				type: "image/*",
				isUploaded: true,
			}))[0]
	);
	const [deletedImages, setDeletedImages] = useState([]);
	useEffect(() => {
		if (props.college?.sample_certificate?.image) {
			setData({
				...props.college,
				sample_certificate: {
					...props?.college?.sample_certificate,
					imageFile: {
						name: "Sample Certificate",
						uid: "-1",
						url: props?.college?.sample_certificate?.image,
						type: "image/*",
						status: "done",
					},
				},
			});
			setData((previousRecords) => {
				return previousRecords
			})

		} else {
			setData(props.college);
		}
		getdata();
	}, [showModal, form1]);
	const [formData, setFormData] = useState({});

	const getcourses = async () => {
		const data = await fetch("/api/admin/courses");
		const res = await data.json();
		let check = res.data;
		setLatest(check);
	};
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
	const getdata = async () => {
		const data = await fetch(`../../../api/admin/major?college_id=${id}`);
		const res = await data.json();
		let check = res.data;
		setMajor(check);
	};

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
			Sentry.captureException(err);
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
		for (let i = 0; i < fileList.length; i++) {
			if (fileList[i]?.uid === bannerImage?.uid) {
				isBannerImageAvailable = true;
				break;
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
				await fetch("../../../api/admin/file/delete-files", {
					method: "POST",
					headers: {
						"content-type": "application/json",
					},
					body: JSON.stringify({ fileIDs: deletedImages }),
				});
			}
			if (filesToUpload.length > 0) {
				let res = await fetch("../../../api/uploadFile", {
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
				await fetch("../../../api/admin/file", {
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
				let bannerImageRes = await fetch("../../../api/uploadFile", {
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
				bannerImageRes = await fetch("../../../api/admin/file", {
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

				let res1 = await fetch("../../../api/admin/singleupload", {
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

			let check = await fetch(`../../../api/admin/college/${id}`, {
				method: "PATCH",
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
			Sentry.captureException(err);
		}
	};
	const update = (value) => {
		setFormData({ ...formData, course_id: value });
	};
	const validateForm = (values) => {
		let isValid = true;
		if (values?.specialization?.length > 0) {
			values?.specialization?.forEach((e) => {
				if (!e?.title || !e?.fees || (e?.fees < 0)) {
					message.error("Please fill all the fields in specialization");
					isValid = false;
				}
			});
		}
		return isValid;
	}
	const handUpdateMajor = async () => {
		let eligibility = form1.getFieldValue("eligibility") || [];
		const Major = form1.getFieldValue("Major");
		const description = form1.getFieldValue("description");
		const duration = form1.getFieldValue("duration");
		const duration_unit = form1.getFieldValue("duration_unit");
		let otherfees = form1.getFieldValue("other_fees") || [];
		const course_id = form1.getFieldValue("course_id");
		let specialization = form1.getFieldValue("specialization") || [];
		const annual_fees = form1.getFieldValue("annual_fees");
		const fees = { annual_fees: annual_fees, other_fees: otherfees };
		const college_id = id;
		const check = validateForm({ eligibility, Major, description, duration, otherfees, course_id, specialization, annual_fees });
		if (!check) {
			return;
		}
		try {
			console.log({
				eligibility,
				Major,
				description,
				duration,
				fees,
				course_id,
				college_id,
				specialization,
				duration_unit
			})
			const resp = await _fetch(`/api/admin/major/${prefilled._id}`, {
				method: "PATCH",
				body: {
					eligibility,
					Major,
					description,
					duration,
					fees,
					course_id,
					college_id,
					specialization,
					duration_unit
				},
			});
			const response = await resp.json();
			console.log(response)
			if (response.success) {
				message.success("Major Added to college successfully");
				// router.replace(`/admin/college/college_page/`);
			} else {
				message.error(response.data);
			}
		} catch (error) {
			message.error("Something went wrong");
			console.log(error);
		}
	};
	const handleSubmit = async () => {
		let response = await fetch(`/api/admin/major/${prefilled._id}`, {
			method: "PATCH",
			headers: {
				"content-type": "application/json",
			},
			body: JSON.stringify({ ...formData, college_id: data._id }),
		});
		response = await response.json();

		if (response.success) {
			let newdata = [...major];
			let check3 = newdata.map((e) => {
				if (e._id === response.data._id) {
					return (e = response.data);
				}
				return e;
			});
			setMajor(check3);
			message.success("Major Updated");
		} else {
			message.error("error occured");
		}
	};
	const deleteMajor = async (id) => {
		await fetch(`/api/admin/major/${id}`, { method: "DELETE" });
		getdata();
	};
	const tagArr = props.tags?.map((e) => ({ label: e.tag_name, value: e._id }));
	const courseArr = props.courses?.map((e) => ({
		label: e.name,
		value: e._id,
	}));

	const [selectedValue, setSelectedValue] = useState([]);

	const handleSelect = (value) => {
		setSelectedValue(value);
	};

	const onFinish = async (e) => {
		const eligibility = form.getFieldValue("eligibility");
		const apply_link = form.getFieldValue("apply_link");
		const Major = form.getFieldValue("Major");
		const description = form.getFieldValue("description");
		const duration = form.getFieldValue("duration");
		const duration_unit = form.getFieldValue("duration_unit");
		const otherfees = form.getFieldValue("fees");
		const course_id = form.getFieldValue("course_id");
		const specialization = form.getFieldValue("specialization") || [];
		const annual_fees = form.getFieldValue("annual_fees");

		const fees = { annual_fees: annual_fees, other_fees: otherfees };
		const college_id = id;
		let payload = {
			eligibility,
			apply_link,
			Major,
			description,
			duration,
			fees,
			course_id,
			college_id,
			specialization,
			duration_unit
		};
		const check = validateForm({ eligibility, Major, description, duration, otherfees, course_id, specialization, fees });
		if (!check) {
			return;
		}

		try {
			const resp = await _fetch(`/api/admin/major`, {
				method: "POST",
				body: payload,
			});
			const response = await resp.json();
			if (response.success) {
				message.success("Major Added to college successfully");
				router.replace(`/admin/college/college_page/`);
				setMajorModal(false);
			} else {
				message.error(response.data);
			}
		} catch (error) {
			message.error("Something went wrong");
			console.log(error);
		}
	};

	async function handleAddPlacementPartner() {
		try {
			if (
				currentPlacementPartner?.title?.length > 0 &&
				currentPlacementPartner?.imageFile
			) {
				let res = await _fetch(
					"../../../api/admin/placement-partners/image-upload",
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
					res = await _fetch("../../../api/admin/placement-partners", {
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
			{majorModal ? (
				<>
					<div className="justify-center items-center flex overflow-x-hidden fixed inset-0 z-50 outline-none focus:outline-none">
						<div className="relative lg:w-1/3 my-6 mx-auto max-w-6xl">
							{/*content*/}
							<div className="h-[90vh] overflow-y-auto border-0 rounded-lg shadow-lg relative flex flex-col w-full  bg-white outline-none focus:outline-none">
								{/*header*/}
								<div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
									<h3 className="text-3xl font-semibold">Add Major</h3>
									<button
										className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
										onClick={() => setMajorModal(false)}
									>
										<span className="bg-white text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
											×
										</span>
									</button>
								</div>
								{/*body*/}
								<Form
									onFinish={onFinish}
									form={form}
									style={{ padding: "2rem", msOverflowY: "scroll" }}
									layout="horizontal"
								>
									<Form.Item
										name="Major"
										label="Major Name"
										rules={[
											{
												required: true,
												message: "Please input your Major Name!",
											},
										]}
									>
										<Input placeholder="Enter the name of Major" />
									</Form.Item>
									<Form.Item
										name="description"
										label="Description of Major"
										rules={[
											{
												required: true,
												message: "Please input Description of Major!",
											},
										]}
									>
										<Input />
									</Form.Item>
									<Form.Item
										name="duration"
										label="Course Duration"
										rules={[
											{
												required: true,
												message: "Please input Course Duration!",
											},
										]}
									>
										<Input type="number" ssss placeholder="Duration of tag" />
									</Form.Item>
									<Form.Item name='duration_unit'
										rules={[
											{
												required: true,
												message: "Please Select Duration Unit!",
											},
										]}
										label="Duration Unit">
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
									<Form.Item name="apply_link" label="Apply Link">
										<Input />
									</Form.Item>
									<Form.Item
										name={"course_id"}
										label="Courses"
										rules={[
											{
												required: true,
												message: "Please input Courses",
											},
										]}
									>
										<Select
											allowClear
											style={{ width: "100%" }}
											placeholder="Select Course"
											options={courseArr}
										/>
									</Form.Item>
									<Form.Item name="eligibility">
										<Form.List name="eligibility">
											{(fields, subOpt) => (
												<>
													<span>Eligibility Criteria</span>
													<div
														style={{
															display: "flex",
															rowGap: 16,
															width: "100%",
															flexDirection: "column",
														}}
													>
														{fields.map((field, i) => (
															<div
																style={{
																	display: "flex",
																	flexDirection: "column",
																	width: "100%",
																}}
																key={fields.key}
															>
																<Form.Item
																	{...field}
																	style={{
																		marginTop: "0.25rem",
																		marginBottom: "0.25rem",
																	}}
																	key={field.key}
																	label={
																		<div className="flex center gap-3">
																			<span>{`Criteria ${i + 1}`}</span>
																			<CloseOutlined
																				onClick={() => {
																					subOpt.remove(field.name);
																				}}
																			/>
																		</div>
																	}
																>
																	<Input />
																</Form.Item>
															</div>
														))}

														<Button
															className="mt-4"
															type="dashed"
															onClick={() => subOpt.add()}
															block
														>
															+ Add Item
														</Button>
													</div>
												</>
											)}
										</Form.List>
									</Form.Item>
									<Form.Item name={"specializations"}>
										<Form.Item name={"specializations"}>
											<Form.List name="specialization">
												{(fields3, subOpt2) => (
													<>
														<span>Specializations</span>
														<div
															style={{
																display: "flex",
																rowGap: 16,
																width: "100%",
																flexDirection: "column",
															}}
														>
															{fields3.map((field3, i) => {
																return (
																	<div
																		className="w-full flex justify-between gap-x-2"
																		key={fields3.key}
																	>
																		<Form.Item
																			{...field3}
																			name={[field3.name, "title"]}
																			key={field3.key}
																			label={
																				<div className="flex center gap-x-3">
																					<span>{`Specialization ${i + 1}`}</span>
																					<CloseOutlined
																						onClick={() => {
																							subOpt2.remove(
																								field3.name
																							);
																						}}
																					/>
																				</div>
																			}
																			className="w-3/4"
																		>
																			<Input
																				placeholder="Specialization"
																			/>
																		</Form.Item>
																		<Form.Item
																			{...field3}
																			name={[field3.name, "fees"]}
																			key={field3.key}
																			label={"Fees"}
																			className="w-1/4"
																		>
																			<InputNumber
																				min={1000}
																				step={1000}
																				placeholder="Fees"
																			/>
																		</Form.Item>

																	</div>
																);
															})}

															<Button
																className="mt-4"
																type="dashed"
																onClick={() => subOpt2.add()}
																block
															>
																+ Add Item
															</Button>
														</div>
													</>
												)}
											</Form.List>
										</Form.Item>
										{/* <Form.List name="specializations">
											{(fields3, subOpt2) => (
												<>
													<span>Specializations</span>
													<div
														style={{
															display: "flex",
															rowGap: 16,
															width: "100%",
															flexDirection: "column",
														}}
													>
														{fields3.map((field3, i) => (
															<div
																style={{
																	display: "flex",
																	flexDirection: "column",
																	width: "100%",
																}}
																key={fields3.key}
															>
																<Form.Item
																	{...field3}
																	style={{
																		marginTop: "0.25rem",
																		marginBottom: "0.25rem",
																	}}
																	key={field3.key}
																	label={
																		<div className="flex center gap-3">
																			<span>{`Specialization ${i + 1}`}</span>
																			<CloseOutlined
																				onClick={() => {
																					subOpt2.remove(field3.name);
																				}}
																			/>
																		</div>
																	}
																>
																	<Input />
																</Form.Item>
															</div>
														))}

														<Button
															className="mt-4"
															type="dashed"
															onClick={() => subOpt2.add()}
															block
														>
															+ Add Item
														</Button>
													</div>
												</>
											)}
										</Form.List> */}
									</Form.Item>
									<span>Fee Structure</span>
									<Form.Item
										name="annual_fees"
										rules={[
											{
												required: true,
												message: "Please input annual fee",
											},
										]}
									>
										<Input type="number" placeholder="Total fees" />
									</Form.Item>
									<Form.Item name={"fees"}>
										<Form.List name="fees">
											{(field2, subOpt2) => (
												<>
													<div
														style={{
															display: "flex",
															rowGap: 16,
															width: "100%",
															flexDirection: "column",
														}}
													>
														{field2.map((field, i) => (
															<div
																style={{
																	display: "flex",
																	justifyContent: "space-around",
																	gap: "2rem",
																	width: "100%",
																}}
																key={field2.key}
															>
																<Form.Item
																	style={{
																		marginTop: "0.25rem",
																		marginBottom: "0.25rem",
																	}}
																	key={field.key}
																	label={
																		<div className="flex center gap-3">
																			<span>{`Fee Type`}</span>
																		</div>
																	}
																	name={[field.name, "fee_type"]}
																>
																	<Input />
																</Form.Item>
																<Form.Item
																	style={{
																		marginTop: "0.25rem",
																		marginBottom: "0.25rem",
																	}}
																	key={field.key}
																	label={
																		<div className="flex center gap-3">
																			<span>{`Fee Amount`}</span>
																			<CloseOutlined
																				onClick={() => {
																					subOpt2.remove(field.name);
																				}}
																			/>
																		</div>
																	}
																	name={[field.name, "amount"]}
																>
																	<Input />
																</Form.Item>
															</div>
														))}

														<Button
															className="mt-4"
															type="dashed"
															onClick={() => subOpt2.add()}
															block
														>
															+ Add Item
														</Button>
													</div>
												</>
											)}
										</Form.List>
									</Form.Item>

									<div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
										<Form.Item>
											<button
												className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
												type="button"
												onClick={() => setMajorModal(false)}
											>
												Close
											</button>
										</Form.Item>
										<Form.Item>
											<button
												className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
												type="submit"
											>
												Save Changes
											</button>
										</Form.Item>
									</div>
								</Form>
							</div>
						</div>
					</div>
					<div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
				</>
			) : null}
			<Row gutter={[16, 16]}>
				<Col xs={24} md={8}>
					<div className="pb-4 px-4">
						<div className="w-full space-y-8">
							<div>
								<h2 className="mt-6 text-3xl font-bold tracking-tight text-gray-900">
									Update College
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
									<p className="mt-1 text-sm text-slate-400">
										{formdata.college_name
											? `Slug: ${formdata.college_name
												?.toLowerCase()
												.replace(/ /g, "-")}`
											: `Slug: ${data?.slug}`}
									</p>
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
								key={`Data-Tags-Length-${data?.tags?.length}`}
								mode="multiple"
								allowClear
								style={{ width: "100%" }}
								onChange={handleSelect}
								placeholder="Select Tags"
								defaultValue={data?.tags}
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
																	: `${file.size / 1000} KB`}
															</p>
														</div>
														<DeleteOutlined
															onClick={() => {
																if (fileList.length === 1) {
																	message.error(
																		"Atleast one image is required"
																	);
																} else {
																	setFileList(
																		fileList.filter((e) => e.uid !== file.uid)
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
									{fileList.length >= 8 ? null : (
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
									Update
								</button>
							</div>
						</div>
					</div>
				</Col>
				<Col xs={24} md={16}>
					<div className="overflow-x-auto px-4">
						<div className="flex items-center justify-between">
							<div className="text-4xl">
								<h2 className="text-2xl font-bold tracking-tight text-gray-900">
									Update Majors
								</h2>
							</div>
							<button
								onClick={() => setMajorModal(true)}
								style={{ backgroundColor: "#4f46e5" }}
								className="hover:bg-lime-500 text-white font-bold py-2 px-4 rounded mt-2"
							>
								Add Major
							</button>
						</div>

						<table className="w-full text-sm text-left text-gray-500 dark:text-gray-400 lg:mt-6">
							<thead
								style={{ backgroundColor: "#4f46e5" }}
								className="w-full text-xs text-white uppercase bg-gray-300 dark:bg-gray-700 dark:text-gray-400"
							>
								<tr>
									<th scope="col" className="px-6 py-3 ">
										Major
									</th>
									<th scope="col" className="px-6 py-3">
										Description
									</th>
									<th scope="col" className="px-6 py-3">
										Duration
									</th>
									<th scope="col" className="px-6 py-3">
										Tution Fees
									</th>
									<th scope="col" className="px-6 py-3">
										Hostel Fees
									</th>
									<th scope="col" className="px-6 py-3">
										Course
									</th>
									<th scope="col" className="px-6 py-3">
										actions
									</th>
								</tr>
							</thead>
							<tbody className="tbody">
								{major?.map((e) => (
									<tr
										className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
										key={e._id}
									>
										<td className="px-6 py-4">{e?.Major}</td>
										<td className="px-6 py-4">{e?.description}</td>
										<td className="px-6 py-4">{e?.duration} {e?.duration_unit}</td>
										<td className="px-6 py-4">
											{e?.fee_structure?.tution_fees}
										</td>
										<td className="px-6 py-4">
											{e?.fee_structure?.hostel_fees}
										</td>
										<td className="px-6 py-4">{e?.course_id?.name}</td>

										<div className="flex items-center gap-x-2 mt-2">
											<div
												onClick={() => {
													setShowModal(true);
													setOption(e?.Major);
													getcourses();
													e.other_fees = e?.fees.other_fees;
													e.annual_fees = e?.fees.annual_fees;
													setPrefilled(e);
													form1.setFieldsValue(e);
													form1.setFieldValue("course_id", e?.course_id?._id);
												}}
												className="p-2 rounded cursor-pointer"
												style={{
													backgroundColor: "#4f46e5",
												}}
											>
												<EditOutlined className="text-lg text-white" />
											</div>
											<div
												onClick={() => {
													deleteMajor(e._id);
												}}
												className="p-2 rounded cursor-pointer"
												style={{
													backgroundColor: "#fafafa",
												}}
											>
												<DeleteOutlined className="text-lg text-red-500" />
											</div>
										</div>
									</tr>
								))}
								{showModal ? (
									<>
										<div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
											<div className="relative lg:w-1/3 my-6 mx-auto max-w-6xl">
												{/*content*/}
												<div className="border-0 h-[90vh] overflow-y-auto rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
													{/*header*/}
													<div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
														<h3 className="text-3xl font-semibold">
															Update {option} in {data?.college_name}
														</h3>
														<button
															className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
															onClick={() => setShowModal(false)}
														>
															<span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
																×
															</span>
														</button>
													</div>
													<Form
														onFinish={handUpdateMajor}
														form={form1}
														style={{ padding: "2rem", msOverflowY: "scroll" }}
														layout="horizontal"
													>
														<Form.Item name="Major" label="Major Name">
															<Input />
														</Form.Item>
														<Form.Item
															name="description"
															label="Description of Major"
														>
															<Input />
														</Form.Item>
														<Form.Item name="duration" label="Course Duration">
															<Input
																type="number"
																placeholder="Duration of tag"
															/>
														</Form.Item>
														<Form.Item name='duration_unit'
															label="Duration Unit">
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
														<Form.Item name={`course_id`} label="Courses">
															<Select
																allowClear
																style={{ width: "100%" }}
																placeholder="Select Course"
																options={courseArr}
															/>
														</Form.Item>
														<Form.Item>
															<Form.List name="eligibility">
																{(fields, subOpt) => (
																	<>
																		<span>Eligibility Criteria</span>
																		<div
																			style={{
																				display: "flex",
																				rowGap: 16,
																				width: "100%",
																				flexDirection: "column",
																			}}
																		>
																			{fields.map((field, i) => (
																				<div
																					style={{
																						display: "flex",
																						flexDirection: "column",
																						width: "100%",
																					}}
																					key={field.key}
																				>
																					<Form.Item
																						{...field}
																						style={{
																							marginTop: "0.25rem",
																							marginBottom: "0.25rem",
																						}}
																						key={field.key}
																						label={
																							<div className="flex center gap-3">
																								<span>{`Criteria ${i + 1}`}</span>
																								<CloseOutlined
																									onClick={() => {
																										subOpt.remove(field.name);
																									}}
																								/>
																							</div>
																						}
																					>
																						<Input />
																					</Form.Item>
																				</div>
																			))}

																			<Button
																				className="mt-4"
																				type="dashed"
																				onClick={() => subOpt.add()}
																				block
																			>
																				+ Add Item
																			</Button>
																		</div>
																	</>
																)}
															</Form.List>
														</Form.Item>
														<Form.Item name={"specializations"}>
															<Form.List name="specialization">
																{(fields3, subOpt2) => (
																	<>
																		<span>Specializations</span>
																		<div
																			style={{
																				display: "flex",
																				rowGap: 16,
																				width: "100%",
																				flexDirection: "column",
																			}}
																		>
																			{fields3.map((field3, i) => {
																				return (
																					<div
																						className="w-full flex justify-between gap-x-2"
																						key={fields3.key}
																					>
																						<Form.Item
																							{...field3}
																							name={[field3.name, "title"]}
																							key={field3.key}
																							label={
																								<div className="flex center gap-x-3">
																									<span>{`Specialization ${i + 1}`}</span>
																									<CloseOutlined
																										onClick={() => {
																											subOpt2.remove(
																												field3.name
																											);
																										}}
																									/>
																								</div>
																							}
																							className="w-3/4"
																						>
																							<Input
																								placeholder="Specialization"
																							/>
																						</Form.Item>
																						<Form.Item
																							{...field3}
																							name={[field3.name, "fees"]}
																							key={field3.key}
																							label={"Fees"}
																							className="w-1/4"
																						>
																							<InputNumber
																								min={1000}
																								step={1000}
																								placeholder="Fees"
																							/>
																						</Form.Item>

																					</div>
																				);
																			})}

																			<Button
																				className="mt-4"
																				type="dashed"
																				onClick={() => subOpt2.add()}
																				block
																			>
																				+ Add Item
																			</Button>
																		</div>
																	</>
																)}
															</Form.List>
														</Form.Item>
														<span>Fee Structure</span>
														<Form.Item name="annual_fees">
															<Input type="number" placeholder="Total fees" />
														</Form.Item>
														<Form.Item name="other_fees">
															<Form.List name="other_fees">
																{(field2, subOpt2) => (
																	<>
																		<div
																			style={{
																				display: "flex",
																				rowGap: 16,
																				width: "100%",
																				flexDirection: "column",
																			}}
																		>
																			{field2.map((field, i) => (
																				<div
																					style={{
																						display: "flex",
																						justifyContent: "space-around",
																						gap: "2rem",
																						width: "100%",
																					}}
																					key={field2.key}
																				>
																					<Form.Item
																						{...field2}
																						style={{
																							marginTop: "0.25rem",
																							marginBottom: "0.25rem",
																						}}
																						key={field.key}
																						label={
																							<div className="flex center gap-3">
																								<span>{`Fee Type`}</span>
																							</div>
																						}
																						name={[field.name, "fee_type"]}
																					>
																						<Input />
																					</Form.Item>
																					<Form.Item
																						{...field2.amount}
																						style={{
																							marginTop: "0.25rem",
																							marginBottom: "0.25rem",
																						}}
																						key={field.key}
																						label={
																							<div className="flex center gap-3">
																								<span>{`Fee Amount`}</span>
																								<CloseOutlined
																									onClick={() => {
																										subOpt2.remove(field.name);
																									}}
																								/>
																							</div>
																						}
																						name={[field.name, "amount"]}
																					>
																						<Input />
																					</Form.Item>
																				</div>
																			))}

																			<Button
																				className="mt-4"
																				type="dashed"
																				onClick={() => subOpt2.add()}
																				block
																			>
																				+ Add Item
																			</Button>
																		</div>
																	</>
																)}
															</Form.List>
														</Form.Item>
													</Form>
													<div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
														<button
															className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
															type="button"
															onClick={() => setShowModal(false)}
														>
															Close
														</button>
														<button
															className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
															type="button"
															onClick={() => {
																handUpdateMajor();
															}}
														>
															Save Changes
														</button>
													</div>
												</div>
											</div>
										</div>
										<div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
									</>
								) : null}
							</tbody>
						</table>
					</div>
				</Col>
			</Row>
			<div style={{ display: "flex", gap: "10px" }}></div>
		</>
	);
}
