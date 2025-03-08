import { Typography, Input, Button } from 'antd';
import { useEffect, useState } from "react";
import moment from 'moment';
import { useRouter } from 'next/router';
import { EditorContent, Editor } from '@tiptap/react'
import Image from 'next/image';
import { getS3Url } from '../../lib/s3';

export default function BlogDetails() {
	const router = useRouter();
	const [searchInput, setSearchInput] = useState("");
	const [blog, setBlog] = useState({});
	const [loading, setLoading] = useState(true);
	const [extractedText, setExtractedText] = useState("");
	let { slug } = router?.query;

	const init = async () => {
		if (!slug) return;
		try {
			setLoading(true);
			let res = await fetch(`../api/blogs/${slug}`);
			res = await res.json();
			if (res.status === 200) {
				setBlog(res.data);
			}
		} catch (error) {
			console.log(error);
		} finally {
			setLoading(false);
		}
	}

	useEffect(() => {
		init();
	}, [slug]);

	if (loading) {
		return (
			<Typography.Text>
				Loading
			</Typography.Text>
		)
	}

	return (
		<>
			<div
				className=' m-auto bg-background_color'
			>
				<div
					style={{
						width: '100%',
						height: '220px',
						background: 'linear-gradient(180deg, rgba(127, 86, 217, 0.8645) 0%, rgba(127, 86, 217, 0.95) 100%), url(https://unsplash.com/photos/ggeZ9oyI-PE/download?ixid=MnwxMjA3fDB8MXxhbGx8fHx8fHx8fHwxNjc5OTk2NDcw&force=true) no-repeat',
						backgroundSize: 'cover',
						backgroundPosition: 'center',
						padding: '16px',
						display: 'flex',
						flexDirection: 'column',
						alignItems: 'center',
						justifyContent: 'center',
					}}
				>
					<Typography.Title
						level={2}
						style={{
							color: 'white',
							textAlign: 'center',
							fontWeight: '700',
						}}
					>
						Over 1,32,000 courses across 56 languages
					</Typography.Title>
					<div
						style={{
							width: '100%',
							display: 'flex',
							flexDirection: 'row',
							alignItems: 'center',
							justifyContent: 'center',
						}}
					>
						<Input
							placeholder="Search Blogs"
							className="h-14"
							style={{
								border: 'none',
								boxShadow: 'none',
								borderRadius: '6px',
								padding: '0.5rem',
								width: '40%',
							}}
							onChange={(e) => setSearchInput(e.target.value)}
						/>
						<Button
							style={{
								backgroundColor: 'white',
								color: '#7F56D9',
								boxShadow: 'none',
								border: 'none',
								height: '100%',
								width: '10%',
								marginLeft: '0.5rem',
							}}
							onClick={() => {
								alert(`You searched for ${searchInput}`);
							}}
						>
							Search
						</Button>
					</div>
				</div>
				<div
					style={{
						width: '100%',

						padding: '20px',
					}}
					className='container'
				>
					<div
						style={{
							display: 'flex',
							flexDirection: 'column',
							justifyContent: 'start',
						}}
					>
						<Typography.Title
							level={2}
							style={{
								fontWeight: '600',
								color: 'white',
								margin: '0.5rem 0',
							}}
						>
							{blog?.title}
						</Typography.Title>
						<div
							style={{
								display: 'flex',
								flexDirection: 'row',
								alignItems: 'center',
								justifyContent: 'start',
								margin: '0.5rem 0',
							}}
						>
							<div
								style={{
									marginLeft: '1rem',
									display: 'flex',
									flexDirection: 'column',
								}}
							>
								<Typography.Text
									style={{
										fontWeight: '500',
										fontSize: '1rem',
										color: 'white',
									}}
								>
									Upschol
								</Typography.Text>
								<Typography.Text
									style={{
										fontWeight: '400',
										fontSize: '1rem',
										color: '#667085',
									}}
								>
									{
										moment(blog.createdAt).format('MMMM DD, YYYY')
									}
								</Typography.Text>
							</div>
						</div>
						<div className='container justify-center w-11/12 h-[60vh] mx-9 my-5 rounded-xl'>
							<Image
								alt="blog"
								src={blog?.blog_banner || '/Student.png'}
								loader={({ src }) => getS3Url(src)}
								className="rounded-xl h-full w-full object-cover object-center"
								height={1300}
								width={4000}
							/>
						</div>
						<p
							className="text-white  line-clamp-2"
						>
							{
								(Array.isArray(extractedText) && extractedText?.map(et => et)) ?? null
							}
						</p>
						<div
							className='editor-component'
							style={{
								margin: '0.51rem 0',
							}}
							dangerouslySetInnerHTML={{ __html: blog.content }}
						/>
					</div>
				</div>
			</div>
		</>
	);
}