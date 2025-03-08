import { Button, Input } from 'antd';
import axios from "axios";
import { PlusOutlined } from '@ant-design/icons';
import { Modal, Upload, message } from 'antd';
import { useState } from 'react';
import { AdminNavigation } from '../../../components/Navigation';
import useFetch from '../../../_fetch';
import Editor from '../../../components/editor';
import dbConnect from '../../../dbConnect';
import blogModel from '../../../model/blogModel';
const Promise = require("promise");
import { useRouter } from "next/router";


export async function getServerSideProps(context) {

	await dbConnect();
	const blog = await blogModel.findById(context.query.id).lean();
	return {
		props: {
			blog: JSON.parse(JSON.stringify(blog))
		},
	}
}

export default function CreateBlog(props) {

	const [article, setArticle] = useState({
		id: props?.blog?._id ? props?.blog?._id : null,
		title: props?.blog?.title ? props?.blog?.title : "",
		content: props?.blog?.content ? props?.blog?.content : null,
		isNew: props?.blog?.title ? false : true,
		blog_banner: props?.blog?.blog_banner ? props?.blog?.blog_banner : null,
	});
	let id = "";
	const [previewOpen, setPreviewOpen] = useState(false);
	const [previewImage, setPreviewImage] = useState('');
	const [previewTitle, setPreviewTitle] = useState('');
	const [newUpload, setNewUpload] = useState(false);
	const [fileList, setFileList] = useState(
		props?.blog?.blog_banner ?
			[{
				uid: "-1",
				name: "College Logo",
				status: "done",
				isUploaded: true,
				url: `https://upschol.s3.ap-south-1.amazonaws.com/${props?.blog?.blog_banner}`,
				thumbUrl: `https://upschol.s3.ap-south-1.amazonaws.com/${props?.blog?.blog_banner}`,
			}]
			:
			[]
	)
	const getBase64 = (file) =>
		new Promise((resolve, reject) => {
			const reader = new FileReader();
			reader.readAsDataURL(file);
			reader.onload = () => resolve(reader.result);
			reader.onerror = (error) => reject(error);
		});

	const _fetch = useFetch();
	const [res_id, setRes_id] = useState()
	const router = useRouter();


	const handleInputs = (event) => {
		let { name, value } = event.target
		setArticle(prev => ({
			...prev,
			[name]: value
		}));
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
	const handleChange = async ({ fileList: newFileList }) => {
		setNewUpload(true)
		setFileList(newFileList)
	};
	const handleEditorContent = (content) => {
		setArticle(prev => ({
			...prev,
			content,
			articleUpdated: true
		}));
	}
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

	const submitForm = async (event) => {
		if (!article.content || !article.title) return;
		event.preventDefault()
		let { content, title } = article;
		try {
			let name = fileList[0]?.name
			name = name?.replace(/\s/g, '');
			let res = await fetch("../../api/admin/singleupload", {
				method: "POST",
				headers: {
					"content-type": "application/json",
				},
				body: JSON.stringify({
					name: name,
					type: fileList[0]?.type
				}),

			});

			let response = await res.json();

			let uploadResponse = await axios.put(response.url, fileList[0]?.originFileObj, {
				headers: {
					"Content-type": fileList[0]?.type,
					"Access-Control-Allow-Origin": "*",
				}

			});
			if (uploadResponse.status === 200) {
				let res = await _fetch('/api/admin/blog', {
					method: "POST",
					body: {
						title,
						content,
						slug: title.toLowerCase().replace(/\s/g, '-'),
						blog_banner: name
					}
				})
				res = await res.json();
				id = res.data._id
				if (res.success === true) {
					message.success("New Blog Added")
					router.push(`/admin/blog`)
				}
				else {
					message.error("Error Occured")
				}

			}
		}
		catch (e) {
			console.log(e)
		}
	}

	const updateBlog = async () => {
		let { content, title, blog_banner } = article;

		if (newUpload) {
			let name = fileList[0]?.name
			name = name?.replace(/\s/g, '');
			let res = await fetch("../../api/admin/singleupload", {
				method: "POST",
				headers: {
					"content-type": "application/json",
				},
				body: JSON.stringify({
					name: name,
					type: fileList[0]?.type
				}),

			});

			let response = await res.json();

			let uploadResponse = await axios.put(response.url, fileList[0]?.originFileObj, {
				headers: {
					"Content-type": fileList[0]?.type,
					"Access-Control-Allow-Origin": "*",
				}

			});
			if (uploadResponse.status === 200) {

				let res = await _fetch(`/api/admin/blog?id=${article?.id}`, {
					method: "PATCH",
					headers: {
						"content-type": "application/json",
					},
					body: {
						title,
						content,
						slug: title.toLowerCase().replace(/\s/g, '-'),
						blog_banner: name
					}
				});
				res = await res.json();

				if (res.success) {
					message.success("Blog Updated")
					router.push(`/admin/blog`)
				}
				else {
					message.error("Error Occured")
				}

			}
		}
		else {

			let res = await _fetch(`/api/admin/blog?id=${article?.id}`, {
				method: "PATCH",
				headers: {
					"content-type": "application/json",
				},
				body: {
					title,
					content,
					slug: title.toLowerCase().replace(/\s/g, '-'),
					blog_banner
				}
			});
			res = await res.json();

			if (res.success) {
				message.success("Blog Updated")
				router.push(`/admin/blog`)
			}
			else {
				message.error("Error Occured")
			}
		}
	}

	return (
		<>
			<AdminNavigation />
			<div>
				<label htmlFor="password" className="sr-only">
					Image Upload
				</label>
			</div>

			<div className='lg:w-8/12 container m-auto p-4'>
				<div className='mb-3 flex justify-between'>
					<div className='w-3/4'>
						<Input
							placeholder='Enter Blog Title'
							className='w-100'
							onChange={(e) => setArticle(prev => ({
								...prev,
								title: e.target.value
							}))}
							style={{
								fontSize: '2rem',
								fontWeight: 'bold',
							}}
							value={article?.title}
						/>
					</div>
					<Button
						className='w-1/4'
						onClick={article.isNew ? submitForm : updateBlog}
						type='primary'
						style={{
							backgroundColor: '#7F56D9',
							color: '#fff',
							border: 'none',
							boxShadow: 'none',
							marginLeft: '0.5rem',
							height: 'inherit',
						}}
					>

						{
							article.isNew ? 'Publish' : 'Update'
						}
					</Button>
				</div>
				<div className=' lg:pr-32'>
					<Upload
						listType="picture-card"
						fileList={fileList}
						onPreview={handlePreview}
						onChange={handleChange}
						maxCount={1}
						className='antd-blog-upload'
					>
						{fileList.length >= 1 ? null : uploadButton}
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

				<Editor
					handleContentChange={handleEditorContent}
					content={article?.content}
				/>
			</div>
		</>
	)

}