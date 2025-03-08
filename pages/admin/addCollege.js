import { useEffect, useState } from "react";
const Promise = require("promise");
import { CloseOutlined } from '@ant-design/icons';
import { PlusOutlined } from '@ant-design/icons';
import { Button, Form, Input, InputNumber, Select, Spin, Typography, Image as AntdImage } from 'antd';
import { Modal, Upload, Checkbox, message } from 'antd';
import { LoadingOutlined, DeleteOutlined } from '@ant-design/icons';
import { AdminNavigation } from "../../components/Navigation";
import { useRouter } from 'next/router';
import dbConnect from '../../dbConnect';
import { Add } from "./testing"
import tagsModel from "../../model/tags";
import { _fetch } from "../../_fetch";
import placementPartnerModel from "../../model/placementPartnerModel";
const axios = require('axios');

export async function getServerSideProps({ req, query, resolvedUrl }) {
	try {
		await dbConnect();
		const tags = await tagsModel.find({});
		const placementPartners = await placementPartnerModel.find({});
		return {
			props: {
				tags: JSON.parse(JSON.stringify(tags)),
				placementPartners: JSON.parse(JSON.stringify(placementPartners))
			}
		}
	} catch (error) {
		console.log(error);
		return {
			props: {
				tags: [],
				placementPartners: []
			}
		}
	}
}

export default function AddCollege({ tags, placementPartners }) {
	const initialFAQ = {
		question: '',
		answer: ''
	}
	const initialCardInfo = {
		title: '',
		desc: '',
	}
	const initialReview = {
		title: '',
		desc: '',
		rating: 0,
		user: '',
	}
	const initialQuickFact = {
		title: '',
		description: ''
	}
	const [currentFAQ, setCurrentFAQ] = useState(initialFAQ);
	const [currentQuickFact, setCurrentQuickFact] = useState(initialQuickFact);
	const [currentCardInfo, setCurrentCardInfo] = useState(initialCardInfo);
	const [currentReview, setCurrentReview] = useState(initialReview);
	const [form] = Form.useForm()
	const [loader, setLoader] = useState(false)
	const [flag, setFlag] = useState(false)
	const [error, setError] = useState({})
	const getBase64 = (file) =>
		new Promise((resolve, reject) => {
			const reader = new FileReader();
			reader.readAsDataURL(file);
			reader.onload = () => resolve(reader.result);
			reader.onerror = (error) => reject(error);
		});
	const antIcon = <LoadingOutlined style={{ color: "white", fontSize: 18 }} spin />;
	const [previewOpen, setPreviewOpen] = useState(false);
	const [previewOpen1, setPreviewOpen1] = useState(false);
	const [checked, setChecked] = useState();
	const [updatedformdata, setUpdatedformdata] = useState()
	const [imageRes, setImageRes] = useState([]);
	const [logo_img, setLogoImg] = useState([]);
	const [banner_check, setBanner_check] = useState(false)
	const [logo_check, setLogo_check] = useState(false)
	const [previewImage, setPreviewImage] = useState('');
	const [previewImage1, setPreviewImage1] = useState('');
	const [previewTitle, setPreviewTitle] = useState('');
	const [fileList, setFileList] = useState([

	]);
	const tagArr = tags.map((e) => ({ label: e.tag_name, value: e._id }));

	const [selectedValue, setSelectedValue] = useState([])

	const handleSelect = (value) => {
		setSelectedValue(value);
	}
	const handleCancel = () => setPreviewOpen(false);
	const handlePreview = async (file) => {
		if (!file.url && !file.preview) {
			file.preview = await getBase64(file.originFileObj);
		}
		setPreviewImage(file.url || file.preview);
		setPreviewOpen(true);
		setPreviewTitle(file.name || file.url.substring(file.url.lastIndexOf('/') + 1));
	};
	const handlePreview1 = async (file) => {
		if (!file.url && !file.preview) {
			file.preview = await getBase64(file.originFileObj);
		}
		setPreviewImage1(file.url || file.preview);
		setPreviewOpen(true);
		setPreviewTitle(file.name || file.url.substring(file.url.lastIndexOf('/') + 1));
	};
	const handleimage = async ({ fileList: newFileList }) => {
		setFileList(newFileList);


	}
	const validate = (values) => {
		let check = true;
		var errors = {};

		if (!values?.college_name) {
			check = false
			errors.college_name = "Please Enter College name"
		}
		if (!values.university) {
			check = false
			errors.university = "Please Enter University name"
		}
		if (!values.rating || values.rating > 5) {
			check = false
			errors.rating = "Please Enter Rating "
		}
		if (!values.link) {
			check = false
			errors.link = "Please Enter College Link"
		}
		if (!values.description) {
			check = false
			errors.description = "Please Enter Description"
		}
		if (!values["address.country"]) {
			check = false
			errors.country = "Please Enter Country Name"
		}
		if (!values["address.city"]) {
			check = false
			errors.city = "Please Enter City Name"
		}
		if (!values["address.state"]) {
			check = false
			errors.state = "Please Enter State Name"
		}
		if (!values["address.street"]) {
			check = false
			errors.street = "Please Enter Street Name"
		}
		if (!values["address.pincode"]) {
			check = false
			errors.pincode = "Please Enter Pincode "
		}
		if (values?.sample_certificate) {
			if (!values?.sample_certificate?.desc) {
				check = false
				errors.sample_certificate = "Please Enter Description"
			}
			if (!values?.sample_certificate?.imageFile) {
				check = false
				errors.sample_certificate = "Please Upload Image"
			}
		}

		if (values?.admission_process) {
			if (!values?.admission_process?.desc) {
				check = false
				errors.admission_process = "Please Enter Description"
			}
			if (!values?.admission_process?.steps?.length || values?.admission_process?.steps?.length === 0) {
				check = false
				errors.admission_process = "Please Enter Steps"
			}
		}

		setError(errors)

		if (fileList.length === 0) {
			setFlag(true)
		}
		else {
			setFlag(false)
			setBanner_check(true)
		}
		if (logo_img.length === 0) {
			setLogo_check(true)

		}
		else {
			setLogo_check(false)

		}

		if (checked) {
			setBanner_check(false)
		}

		return check;


	}
	const handlelogo = async ({ fileList: logo }) => {
		setLogoImg(logo);
	}
	const handleCheck = (e) => {
		let check = e.target.checked
	};

	const [uploadedFile, setUploadedfile] = useState();
	const BUCKET_NAME = "https://upschol.s3.ap-south-1.amazonaws.com/"
	const [formdata, setFormadata] = useState({});

	const [files, setFiles] = useState([]);
	const [toggle, setToggle] = useState(false)
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
	)
	const handleCreate = async (name, id, fileID) => {
		try {
			let response = await _fetch(`../api/admin/college/${id}`, {
				method: "PATCH",
				body: { ...formdata, "banner_image": fileID, logo: name, tags: selectedValue }
			});
			let check = await response.json();
			if (check.success) {
				setLoader(false)
				message.success("New College Added")
				return
			}
			else {
				message.error("Some Error Occured")
				setLoader(false)
			}

		}
		catch (err) {
			console.log(err.message);
		}
	}

	const handleFile = async (e) => {

		const check = validate(formdata)
		if (!check) {
			message.error('Please check the form fields');
			return;
		}


		if (formdata.college_name && formdata.university && formdata.rating && formdata.description && formdata.link && formdata["address.city"] && formdata["address.country"] && formdata["address.state"] && formdata["address.pincode"] && fileList.length > 0 && logo_img.length > 0 && checked) {

			setLoader(true)

			if (formdata?.sample_certificate?.imageFile) {
				const res = await fetch("../../../api/uploadFile", {
					method: "POST",
					headers: {
						"content-type": "application/json",
					},
					body: JSON.stringify({
						list: [formdata?.sample_certificate?.imageFile],
						college_name: formdata.college_name
					})
				})
				const imagedata = await res.json();
				const url = imagedata[0];
				let promise = fetch(url, {
					method: "PUT",
					headers: {
						"Content-type": formdata?.sample_certificate?.imageFile.type,
						"Access-Control-Allow-Origin": "*",
					},
					body: formdata?.sample_certificate?.imageFile.originFileObj
				});
				await Promise.all([promise]).then((values) => {
					const imageUrl = values[0].url?.split("?")[0];
					delete formdata?.sample_certificate?.imageFile;
					formdata.sample_certificate.image = imageUrl;
				}).catch((error) => {
					console.log(error);
				})
			}

			let nonBannerImages = fileList?.filter((e) => e?.uid !== checked?.uid);

			let res = await fetch("../api/uploadFile", {
				method: "POST",
				headers: {
					"content-type": "application/json",
				},
				body: JSON.stringify({
					list: nonBannerImages, college_name: formdata.college_name
				})
			})

			let bannerImageRes = await fetch("../api/uploadFile", {
				method: "POST",
				headers: {
					"content-type": "application/json",
				},
				body: JSON.stringify({
					list: [checked], college_name: formdata.college_name
				})
			});
			bannerImageRes = await bannerImageRes.json();

			bannerImageRes = await fetch(bannerImageRes[0], {
				method: "PUT",
				headers: {
					"Content-type": checked?.type,
					"Access-Control-Allow-Origin": "*",
				},
				body: checked?.originFileObj
			});

			let data = await res.json();
			let promises = [];
			data.forEach((url, index) => {
				let newfile = fileList[index];

				let promise = fetch(url, {
					headers: {
						"Content-type": newfile.type,
						"Access-Control-Allow-Origin": "*",
					},
					method: "PUT",
					body: newfile.originFileObj
				});
				promises.push(promise);

			});
			let imagesdata = [];
			await Promise.all(promises).then(function (res) {
				imagesdata = res
				setImageRes(res)
			}).catch((error) => {
				console.log(error);
			})



			formdata.facts = form.getFieldValue('facts')?.map((e) => e?.name)
			let response = await fetch("../api/admin/college", {
				method: "POST",
				headers: {
					"content-type": "application/json",
				},
				body: JSON.stringify(formdata)
			});
			let check = await response.json();

			if (!check.success) {
				setLoader(false)
				message.error('Some Error Occured');
				return;
			}
			let array = [];
			imagesdata?.forEach((file, i) => {
				let obj = {};
				let college_name = formdata.college_name;
				let college = college_name.replace(/\s+/g, '-');
				college = college.toLowerCase();
				let parsedUrl = new URL(file.url);
				let pathname = parsedUrl.pathname.slice(1);
				obj["college_id"] = check.data._id;
				obj["path"] = pathname;
				obj["name"] = fileList[i].name;
				array.push(obj);
			});

			let bannerImageData = {
				college_id: check.data._id,
				path: new URL(bannerImageRes?.url)?.pathname?.slice(1),
				name: checked?.name
			};
			let fileres = await fetch("../api/admin/file", {
				method: "POST",
				headers: {
					"content-type": "application/json",
				},
				body: JSON.stringify({ filedata: array })
			});
			bannerImageRes = await fetch("../api/admin/file", {
				method: "POST",
				headers: {
					"content-type": "application/json",
				},
				body: JSON.stringify({ filedata: [bannerImageData] })
			});
			bannerImageRes = await bannerImageRes.json();
			let fileID = bannerImageRes?.data[0]?._id;

			let name = logo_img[0]?.name
			name = name?.replace(/\s/g, '');

			let res1 = await fetch("../../api/admin/singleupload", {
				method: "POST",
				headers: {
					"content-type": "application/json",
				},
				body: JSON.stringify({
					name: name,
					type: logo_img[0]?.type
				}),

			});

			let response1 = await res1.json();

			let uploadResponse = await axios.put(response1?.url, logo_img[0]?.originFileObj, {
				headers: {
					"Content-type": logo_img[0]?.type,
					"Access-Control-Allow-Origin": "*",
				}

			});

			handleCreate(name, check.data._id, fileID)

		}

	}



	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormadata({
			...formdata,
			[name]: value
		})
	}
	const [currPointer, setCurrPointer] = useState('');
	const [currStep, setCurrStep] = useState('');

	return (
		<>
			<AdminNavigation />
			<div className="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
				<div className="w-full max-w-md space-y-8">
					<div>
						<h2 style={{ fontFamily: "Poppins" }} className=" text-center text-3xl font-bold tracking-tight text-gray-900">
							ADD COLLEGE
						</h2>
					</div>

					<div className="-space-y-px rounded-md shadow-sm">
						<div>
							<label htmlFor="college_name" className="sr-only">
								College Name
							</label>
							<input
								name="college_name"
								onChange={handleChange}
								type="text"
								required
								minlength="5"

								className="rounded relative block w-full appearance-none border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
								placeholder="College Name"

							/>
							<p style={{ fontFamily: "Poppins" }} className="text-xs text-red-500">{error.college_name}</p>
						</div>
						<div>
							<label htmlFor="university" className="sr-only">
								University
							</label>
							<input

								onChange={handleChange}
								name="university"
								type="text"
								required
								className="relative block w-full appearance-none rounded border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm mt-2"
								placeholder="University"

							/>
							<p style={{ fontFamily: "Poppins" }} className="text-xs text-red-500">{error.university}</p>
						</div>
						<div>
							<label htmlFor="rating" className="sr-only">
								Rating
							</label>
							<input
								onChange={handleChange}
								name="rating"
								type="number"
								onKeyDown={(evt) => (evt.key === 'e' || evt.key === 'E') && evt.preventDefault()}
								required
								className="relative block w-full appearance-none rounded border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm mt-2"
								placeholder="Rating"
								max={5}
							/>
							<p style={{ fontFamily: "Poppins" }} className="text-xs text-red-500">{error.rating}</p>
						</div>
						<div>
							<label htmlFor="link" className="sr-only">
								College Link
							</label>
							<input
								id="link"
								onChange={handleChange}
								name="link"
								type="text"
								required
								className="relative block w-full appearance-none rounded border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm mt-2"
								placeholder="College Link"
							/>
							<p style={{ fontFamily: "Poppins" }} className="text-xs text-red-500">{error.link}</p>
						</div>
						<Form form={form} style={{ marginTop: "1rem" }} >
							<Form.Item name={"facts"} >
								<Form.List name="facts">
									{(fields, subOpt) => (

										<><h1 className="font-semibold text-base" >University Facts</h1><div
											style={{
												display: 'flex',
												rowGap: 16,
												width: "100%",
												flexDirection: 'column',
											}}
										>
											{fields.map((field, i) => (
												<div style={{ display: "flex", flexDirection: "column", width: "100%" }} key={fields.key}>
													<Form.Item style={{ marginTop: "0.25rem", marginBottom: "0.25rem" }} key={field.key} label={(
														<div className='flex center gap-3' >
															<span>{`Fact ${i + 1}`}</span>
															<CloseOutlined
																onClick={() => {
																	subOpt.remove(field.name);
																}} />
														</div>
													)} name={[field.name, 'name']}>
														<Input />

													</Form.Item>
												</div>
											))}

											<Button className='mt-4' type="dashed" onClick={() => subOpt.add()} block>
												+ Add Item
											</Button>
										</div></>
									)}
								</Form.List>
							</Form.Item>
						</Form>
						<div>
							<label htmlFor="description" className="sr-only">
								Description
							</label>
							<textarea
								onChange={handleChange}
								name="description"
								type="text"
								required
								className="relative block w-full appearance-none rounded border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm mt-2"
								placeholder="Description"
								rows={4}
							/>
							<p style={{ fontFamily: "Poppins" }} className="text-xs text-red-500">{error.description}</p>
						</div>
						<h1>Address</h1>
						<input
							id="password"
							name="address.street"
							type="text"
							autoComplete="current-password"
							required
							className="relative block w-full appearance-none rounded-none rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
							placeholder="Street"
							onChange={handleChange}

						/>
						<p style={{ fontFamily: "Poppins" }} className="text-xs text-red-500">{error.street}</p>



						<input
							id="password"
							name="address.city"
							type="text"
							autoComplete="current-password"
							required
							className="relative block w-full appearance-none rounded-none rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
							placeholder="City"
							onChange={handleChange}

						/>
						<p style={{ fontFamily: "Poppins" }} className="text-xs text-red-500">{error.city}</p>
						<input
							id="password"
							name="address.state"
							type="text"
							autoComplete="current-password"
							required
							className="relative block w-full appearance-none rounded-none rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
							placeholder="State"
							onChange={handleChange}

						/>
						<p style={{ fontFamily: "Poppins" }} className="text-xs text-red-500">{error.state}</p>
						<input
							id="password"
							name="address.country"
							type="text"
							autoComplete="current-password"
							required
							className="relative block w-full appearance-none rounded-none rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
							placeholder="Country"
							onChange={handleChange}

						/>
						<p style={{ fontFamily: "Poppins" }} className="text-xs text-red-500">{error.country}</p>
						<input
							id="password"
							name="address.pincode"
							type="number"
							onKeyDown={(evt) => (evt.key === 'e' || evt.key === 'E') && evt.preventDefault()}
							autoComplete="current-password"
							required
							className="relative block w-full appearance-none rounded-none rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
							placeholder="Pincode"
							onChange={handleChange}

						/>
						<p style={{ fontFamily: "Poppins" }} className="text-xs text-red-500">{error.pincode}</p>
						<div className="flex justify-between">
							<label>Publish College</label>
							<select name="hidecollege" onChange={handleChange}  >
								<option value={true}>Yes</option>
								<option value={false}>No</option>
							</select>
						</div>

						<Select
							mode="multiple"
							allowClear
							showSearch
							style={{ width: "100%" }}
							onChange={handleSelect}
							placeholder="Select Tags"
							options={tagArr}
							optionFilterProp="label"
						/>

						<div
							className="my-2"
						>
							<h1 className="font-semibold text-base mt-2" >Placement Partners</h1>
							<Select
								mode="multiple"
								allowClear
								showSearch
								placeholder='Select Placement Partners'
								options={placementPartners?.map(partner => ({ label: partner.title, value: partner._id }))}
								filterOption={(input, option) =>
									option.label.toLowerCase().indexOf(input.toLowerCase()) >= 0
								}
								className="w-full mt-2"
								onChange={(value) => {
									setFormadata({
										...formdata,
										placement_partners: value
									})
								}}
							/>
						</div>

						<div
							className="my-2"
						>
							<h1 className="font-semibold text-base mt-2" >Sample Certificate</h1>
							<p
								className="my-1 text-xs text-red-500"
							>
								{error?.sample_certificate}
							</p>
							<Input.TextArea
								onChange={(e) => {
									setFormadata({
										...formdata,
										sample_certificate: {
											...formdata.sample_certificate,
											desc: e.target.value
										}
									});
								}}
								value={formdata?.sample_certificate?.desc}
								placeholder="Description"
								className="my-1"
							/>
							<Typography.Text className="my-1">
								Pointers
							</Typography.Text>
							<Input.Search
								className="my-1"
								placeholder="Pointer"
								enterButton={
									<Button>
										Add
									</Button>
								}
								onChange={(e) => setCurrPointer(e.target.value)}
								onSearch={(value) => {
									setFormadata({
										...formdata,
										sample_certificate: {
											...formdata?.sample_certificate,
											pointers: [
												...(formdata?.sample_certificate?.pointers || []),
												value
											]
										}
									});
									setCurrPointer('')
								}}
								value={currPointer}

							/>
							<ul
								className='list-disc list-inside'
							>
								{formdata?.sample_certificate?.pointers?.map((e, i) => (
									<div
										key={i}
										className="flex items-center justify-between"
									>
										<li
											className='w-4/5'
										>
											{e}
										</li>
										<Button
											className='w-1/5'
											type='text'
											icon={
												<CloseOutlined
													className='text-red-500'
												/>
											}
											onClick={() => {
												setFormadata({
													...formdata,
													sample_certificate: {
														...formdata?.sample_certificate,
														pointers: formdata?.sample_certificate?.pointers?.filter((_, index) => index !== i)
													}
												})
											}}
										/>
									</div>

								))}
							</ul>
							<Typography.Text
								className='my-1'
							>
								Sample Certificate Image
							</Typography.Text>
							<Upload
								className='my-1'
								maxCount={1}
								accept="image/*"
								listType="picture-card"
								fileList={formdata?.sample_certificate?.imageFile ? [formdata?.sample_certificate?.imageFile] : []}
								onChange={(e) => {
									setFormadata({
										...formdata,
										sample_certificate: {
											...formdata?.sample_certificate,
											imageFile: e?.fileList[0]
										}
									});
								}}
								onRemove={() => {
									setFormadata({
										...formdata,
										sample_certificate: {
											...formdata?.sample_certificate,
											imageFile: null
										}
									});
								}}
								onPreview={handlePreview}
							>
								{formdata?.sample_certificate?.imageFile ? null : uploadButton}
							</Upload>

						</div>

						<div
							className="my-2"
						>
							<h1 className="font-semibold text-base mt-2" >Admission Process</h1>
							<p
								className="my-1 text-xs text-red-500"
							>
								{error?.admission_process}
							</p>
							<Input.TextArea
								onChange={(e) => {
									setFormadata({
										...formdata,
										admission_process: {
											...formdata.admission_process,
											desc: e.target.value
										}
									});
								}}
								value={formdata?.admission_process?.desc}
								placeholder="Description"
								className="my-1"
							/>
							<Typography.Text className="my-1">
								Steps
							</Typography.Text>
							<Input.Search
								className="my-1"
								placeholder="Pointer"
								enterButton={
									<Button>
										Add
									</Button>
								}
								onChange={(e) => setCurrStep(e.target.value)}
								onSearch={(value) => {
									setFormadata({
										...formdata,
										admission_process: {
											...formdata?.admission_process,
											steps: [
												...(formdata?.admission_process?.steps || []),
												value
											]
										}
									});
									setCurrStep('')
								}}
								value={currStep}
							/>
							<ul
								className='list-disc list-inside'
							>
								{formdata?.admission_process?.steps?.map((e, i) => (
									<div
										key={i}
										className="flex items-center justify-between"
									>
										<li
											className='w-4/5'
										>
											{e}
										</li>
										<Button
											className='w-1/5'
											type='text'
											icon={
												<CloseOutlined
													className='text-red-500'
												/>
											}
											onClick={() => {
												setFormadata({
													...formdata,
													admission_process: {
														...formdata?.admission_process,
														steps: formdata?.admission_process?.steps?.filter((_, index) => index !== i)
													}
												})
											}}
										/>
									</div>

								))}
							</ul>

						</div>
						<div
							className="my-2"
						>
							<h1 className="font-semibold text-base mt-2" >FAQs</h1>
							<Input
								className='mb-2'
								placeholder='Question'
								value={currentFAQ?.question}
								onChange={(e) => {
									setCurrentFAQ({
										...currentFAQ,
										question: e?.target?.value
									})
								}}
							>
							</Input>
							<Input.TextArea
								placeholder='Answer'
								value={currentFAQ?.answer}
								onChange={(e) => {
									setCurrentFAQ({
										...currentFAQ,
										answer: e?.target?.value
									})
								}}
							/>
							<Button
								type='text'
								icon={
									<PlusOutlined />
								}
								className='w-full mt-2'
								onClick={() => {
									if (currentFAQ?.question?.length > 0 && currentFAQ?.answer?.length > 0) {
										const updatedFAQs = [
											...(formdata?.faqs ? formdata?.faqs : []),
											currentFAQ
										]
										setFormadata({
											...formdata,
											faqs: updatedFAQs
										});
										setCurrentFAQ({
											question: '',
											answer: ''
										})
									}
								}}
							>
								Add FAQ
							</Button>
							<ul
								className='list-disc list-inside'
							>
								{
									formdata?.faqs?.map((faq, index) => (
										<div
											key={index}
											className='flex justify-between'
										>
											<div

											>
												<li className='my-2'>
													<span className='font-bold'>
														Q: {faq?.question}
													</span>
												</li>
												<span className='my-2'>
													A: {faq?.answer}
												</span>
											</div>
											<Button
												type='text'
												icon={
													<CloseOutlined
														className='text-red-500'
													/>
												}
												onClick={() => {
													const updatedFAQs = formdata?.faqs?.filter((e, p_index) => index !== p_index)
													setFormadata({
														...formdata,
														faqs: updatedFAQs
													});
												}}
											/>

										</div>
									))
								}
							</ul>
						</div>

						<div
							className="my-2"
						>
							<h1 className="font-semibold text-base mt-2" >Info Cards</h1>
							{
								(!formdata?.info_cards || formdata?.info_cards?.length < 3) && (
									<>
										<Input
											className='mb-2'
											placeholder='Title'
											value={currentCardInfo?.title}
											onChange={(e) => {
												setCurrentCardInfo({
													...currentCardInfo,
													title: e?.target?.value
												})
											}}
										>
										</Input>
										<Input.TextArea
											placeholder='Description'
											value={currentCardInfo?.desc}
											onChange={(e) => {
												setCurrentCardInfo({
													...currentCardInfo,
													desc: e?.target?.value
												})
											}}
										/>
										<Button
											type='text'
											icon={
												<PlusOutlined />
											}
											className='w-full mt-2'
											onClick={() => {
												if (currentCardInfo?.title?.length > 0 && currentCardInfo?.desc?.length > 0) {
													const updatedCardInfo = [
														...(formdata?.info_cards ? formdata?.info_cards : []),
														currentCardInfo
													]
													setFormadata({
														...formdata,
														info_cards: updatedCardInfo
													});
													setCurrentCardInfo({
														title: '',
														desc: ''
													})
												}
											}}
										>
											Add Info Card
										</Button>
									</>
								)
							}

							<ul
								className='list-disc list-inside'
							>
								{
									formdata?.info_cards?.map((card, index) => (
										<div
											key={index}
											className='flex justify-between'
										>
											<div

											>
												<li className='my-2'>
													<span className='font-bold'>
														{card?.title}
													</span>
												</li>
												<span className='my-2'>
													{card?.desc}
												</span>
											</div>
											<Button
												type='text'
												icon={
													<CloseOutlined
														className='text-red-500'
													/>
												}
												onClick={() => {
													const updatedCardInfo = formdata?.info_cards?.filter((e, p_index) => index !== p_index)
													setFormadata({
														...formdata,
														info_cards: updatedCardInfo
													});
												}}
											/>

										</div>
									))
								}
							</ul>
						</div>

						<div
							className="my-2"
						>
							<h1 className="font-semibold text-base mt-2" >Reviews</h1>
							<Input
								className='mb-2'
								placeholder='Name'
								value={currentReview?.user}
								onChange={(e) => {
									setCurrentReview({
										...currentReview,
										user: e?.target?.value
									})
								}}
							>
							</Input>
							<Input
								className='mb-2'
								placeholder='Title'
								value={currentReview?.title}
								onChange={(e) => {
									setCurrentReview({
										...currentReview,
										title: e?.target?.value
									})
								}}
							>
							</Input>
							<InputNumber
								className='mb-2 w-full'
								placeholder='Rating'
								value={currentReview?.rating}
								onChange={(e) => {
									setCurrentReview({
										...currentReview,
										rating: e
									})
								}}
								max={5}
								min={0}
								step={0.1}
							/>
							<Input.TextArea
								placeholder='Description'
								value={currentReview?.desc}
								onChange={(e) => {
									setCurrentReview({
										...currentReview,
										desc: e?.target?.value
									})
								}}
							/>
							<Button
								type='text'
								icon={
									<PlusOutlined />
								}
								className='w-full mt-2'
								onClick={() => {
									if (currentReview?.user?.length > 0 && currentReview?.title?.length > 0 && currentReview?.rating?.toString()?.length > 0 && currentReview?.desc?.length > 0) {
										const newReview = {
											...currentReview,
											rating: Math.min(currentReview?.rating, 5)
										}
										const updatedReviews = [
											...(formdata?.reviews ? formdata?.reviews : []),
											newReview
										]
										setFormadata({
											...formdata,
											reviews: updatedReviews
										});
										setCurrentReview({
											user: '',
											title: '',
											rating: 0,
											desc: ''
										})
									}
								}}
							>
								Add Review
							</Button>
							<ul
								className='list-disc list-inside'
							>
								{
									formdata?.reviews?.map((review, index) => (
										<div
											key={index}
											className='flex justify-between'
										>
											<div>
												<li className='my-2'>
													<span className='font-bold'>
														{review.title}
													</span>
												</li>
												<p className='my-2'>
													{review.desc}
												</p>
												<p className='my-2'>
													{review.user}
												</p>
												<p className='my-2'>
													{review.rating}
												</p>
											</div>
											<Button
												type='text'
												icon={
													<CloseOutlined
														className='text-red-500'
													/>
												}
												onClick={() => {
													const updatedReviews = formdata?.reviews?.filter((e, p_index) => index !== p_index)
													setFormadata({
														...formdata,
														reviews: updatedReviews
													});
												}}
											/>

										</div>
									))
								}
							</ul>
						</div>

						<div
							className="my-2"
						>
							<h1 className="font-semibold text-base mt-2" >Quick Facts</h1>
							<Input
								className='mb-2'
								placeholder='Title'
								value={currentQuickFact?.title}
								onChange={(e) => {
									setCurrentQuickFact({
										...currentQuickFact,
										title: e?.target?.value
									})
								}}
							>
							</Input>
							<Input.TextArea
								placeholder='Description'
								value={currentQuickFact?.description}
								onChange={(e) => {
									setCurrentQuickFact({
										...currentQuickFact,
										description: e?.target?.value
									})
								}}
							/>
							<Button
								type='text'
								icon={
									<PlusOutlined />
								}
								className='w-full mt-2'
								onClick={() => {
									if (currentQuickFact?.title?.length > 0 && currentQuickFact?.description?.length > 0) {
										const updatedQuickFacts = [
											...(formdata?.quick_facts ? formdata?.quick_facts : []),
											currentQuickFact
										]
										setFormadata({
											...formdata,
											quick_facts: updatedQuickFacts
										});
										setCurrentQuickFact({
											title: '',
											description: ''
										})
									}
								}}
							>
								Add Quick Fact
							</Button>
							<ul
								className='list-disc list-inside'
							>
								{
									formdata?.quick_facts?.map((fact, index) => (
										<div
											key={index}
											className='flex justify-between'
										>
											<div>
												<li className='my-2'>
													<span className='font-bold'>
														Title: {fact?.title}
													</span>
												</li>
												<span className='my-2'>
													Description: {fact?.description}
												</span>
											</div>
											<Button
												type='text'
												icon={
													<CloseOutlined
														className='text-red-500'
													/>
												}
												onClick={() => {
													const updatedQuickFacts = formdata?.quick_facts?.filter((e, p_index) => index !== p_index)
													setFormadata({
														...formdata,
														quick_facts: updatedQuickFacts
													});
												}}
											/>
										</div>
									))
								}
							</ul>
						</div>

						<div className="flex flex-col justify-between  pt-4">

							<div>
								<h1 style={{ fontFamily: "Poppins" }} >Upload Images</h1>
								<Upload
									accept="image/*"
									multiple={true}
									listType="picture"
									fileList={fileList}
									itemRender={(originNode, file) => (
										<>
											<div
												className="flex items-center gap-x-2 p-2 border border-slate-300 rounded-md my-1 justify-between"
											>
												<div
													className="flex gap-x-2 flex-1 items-center"
												>
													<AntdImage
														className="rounded-md "
														width={80}
														height={80}
														src={file.thumbUrl}
													/>
													<div
														className="flex flex-1 justify-between items-center"
													>
														<div>
															<p>
																{file.name}
															</p>
															<p>
																{file.size / 1000} KB
															</p>
														</div>
														<DeleteOutlined
															onClick={() => {
																setFileList(
																	fileList.filter(
																		(e) =>
																			e.uid !==
																			file.uid
																	)
																);
															}}
															className="cursor-pointer text-red-500 text-lg mr-2"
														/>

													</div>
												</div>
												<div
													className="flex gap-x-1 items-center"
												>
													<Checkbox
														checked={checked?.uid == file?.uid}
														onClick={() => setChecked(file)}
													/>
													<p>
														Banner Image
													</p>
												</div>
											</div>
										</>
									)}
									onPreview={handlePreview}
									onChange={handleimage}
								>
									{fileList.length >= 8 ? null : (
										<div
											className="mb-4 h-24 w-24 rounded-lg flex flex-col items-center justify-center border border-slate-300 border-dashed bg-[#fafafa]"
										>
											<PlusOutlined />
											<p>
												Upload
											</p>
										</div>
									)}
								</Upload>
								<Modal open={previewOpen} title={previewTitle} footer={null} onCancel={handleCancel}>
									<img
										alt="example"
										style={{
											width: '100%',
										}}
										src={previewImage}
									/>
								</Modal>
							</div>
							<div className='mt-4'>
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
								<Modal open={previewOpen} title={previewTitle} footer={null} onCancel={handleCancel}>
									<img
										alt="example"
										style={{
											width: '100%',
										}}
										src={previewImage}
									/>
								</Modal>
							</div>
						</div>


					</div>

					<div>{banner_check ? <p style={{ fontFamily: "Poppins" }} className="text-red-600 text-center">Please select a banner image</p> : null}</div>
					<div style={{ fontFamily: "Poppins" }} className="flex justify-between">
						<div>{flag ? <p className="text-red-600 text-center">Please Upload Image</p> : null}</div>
						<div>{logo_check ? <p className="text-red-600 text-center">Please Upload Logo</p> : null}</div>
					</div>

					<div>
						<button
							type="submit"
							className="group relative flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
							onClick={() => {
								handleFile();
							}}
						>

							{loader ? <Spin indicator={antIcon} className='mr-2' /> : "Add College"}
						</button>
					</div>

				</div>
			</div>



			{/*   */}

		</>
	)


}