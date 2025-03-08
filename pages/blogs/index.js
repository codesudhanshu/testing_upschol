
import { useRouter } from 'next/router';
import moment from 'moment';
import blogModel from "../../model/blogModel";
import dbConnect from "../../dbConnect";
import { Button, Col, Input, Row, Typography } from "antd";
import Image from "next/image";
import { getS3Url } from "../../lib/s3.js";
import { useEffect, useRef, useState } from "react";
import blogCollectionModel from '../../model/blogCollectionModel.js';

export async function getServerSideProps(context) {

	await dbConnect();
	const blogs = await blogModel.find({}).lean();
	const collections = await blogCollectionModel.find({}).populate("blogs").lean();

	return {
		props: {
			blogs: JSON.parse(JSON.stringify(blogs)),
			collections: JSON.parse(JSON.stringify(collections))
		},
	}
}

function BlogCard({ blog }) {

	const [extractedText, setExtractedText] = useState("");
	const router = useRouter();
	const ref = useRef();

	useEffect(() => {
		let allpTag = ref?.current.getElementsByTagName("p");

		let final = [];
		for (const pTag of allpTag) {
			final = [...final, pTag.lastChild?.textContent || ""]
		}

		setExtractedText(final)
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [ref?.current])

	return (
		<Col
			key={blog?._id}
			xs={24}
			md={8}
		>
			<div className='p-4 w-full h-full '>
				<div
					className="w-full h-auto cursor-pointer bg-white rounded-lg p-3"
					onClick={() => {
						router.push(`/blogs/${blog?.slug}`)
					}}
				>
					<Image
						src={blog?.blog_banner || '/Student.png'}
						loader={({ src }) => getS3Url(src)}
						alt="Blog Banner"
						height={100}
						width={100}
						style={{
							borderRadius: '4px',
							marginBottom: '0.5rem',
							objectFit: 'cover',
							objectPosition: 'center',
							overflow: 'hidden',
							width: '100%',
							height: '150px'
						}}
					/>
					<div
						style={{
							width: '100%',
							display: 'flex',
							justifyContent: 'start',
							alignItems: 'center',
							margin: '0.5rem 0',
						}}
					>
						<div
							style={{
								marginLeft: '0.5rem',
								display: 'flex',
								flexDirection: 'column',
							}}
						>
							<Typography.Text
								style={{
									fontWeight: '500',
									fontSize: '0.8rem',
								}}
							>
								Upschol
							</Typography.Text>
							<Typography.Text
								style={{
									fontWeight: '400',
									fontSize: '0.8rem',
									color: '#667085',
								}}
							>
								{
									moment(blog.createdAt).format('MMMM DD, YYYY')
								}
							</Typography.Text>
						</div>
					</div>
					<Typography.Title
						level={4}
						style={{
							fontWeight: '600',
							color: '#101828'
						}}
					>
						{blog?.title}
					</Typography.Title>
					<Typography.Paragraph
						style={{
							color: '#667085',
							fontWeight: '400',
							fontSize: '0.9rem'
						}}
						className="line-clamp-3"
					>
						<p
							className="line-clamp-2"
						>
							{
								(Array?.isArray(extractedText) && extractedText?.map(et => et)) ?? null
							}
						</p>
					</Typography.Paragraph>
					<div
						ref={ref}
						className="hidden"
						dangerouslySetInnerHTML={{ __html: blog?.content }}
					/>
				</div>
			</div>
		</Col >
	)
}

export default function Page1(props) {
	const router = useRouter();
	const [searchInput, setSearchInput] = useState("");
	const [collection, setCollection] = useState(false);
	const [filterData, setFilterData] = useState('');
	const [selectedCollection, setSelectedCollection] = useState([]);
	const ref = useRef();
	const blogs = props?.blogs;
	const collections = props?.collections;

	const handleCollection = (data) => {
		setCollection(true);
		setFilterData(data?.title);
		router.push(`/blogs?collection=${data?._id}`)
		setSelectedCollection(data?.blogs)
	}

	return (
		<>
			<div
				className="w-100 bg-background_color"
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
								width: '15%',
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
				<Row>
					<Col
						xs={0}
						sm={0}
						md={0}
						lg={5}
						xl={5}
						xxl={5}
					>
						<div className="text-white"
							style={{

								width: '100%',
								height: '100%',
								padding: '3rem',
								display: 'flex',
								flexDirection: 'column',
							}}
						>
							<Typography.Title
								level={5}
								style={{
									fontWeight: '600',
									color: 'white'
								}}
							>
								Collections
							</Typography.Title>
							<div
								style={{
									width: '100%',
									display: 'flex',
									flexDirection: 'row',
									flexWrap: 'wrap',
									marginBottom: '1rem',
								}}
							>
								{
									collections.map((collection, index) => (
										<Button
											key={index}
											shape="round"
											style={{
												border: 'none',
												boxShadow: 'none',
												backgroundColor: '#E6E0EE',
												margin: '0.25rem',
												fontSize: '0.7rem',
												fontWeight: '400',
											}}
											onClick={() => {
												handleCollection(collection)
											}}
										>
											{collection?.title}
										</Button>
									))
								}
							</div>
						</div>
					</Col>
					<Col
						xs={24}
						sm={24}
						md={24}
						lg={19}
						xl={19}
						xxl={19}
					>
						{
							collection ?
								<div>
									<p className='text-white p-6 text-2xl font-semibold'>{filterData}</p>
									<Row
										className="mt-10"
										align={"stretch"}
										gutter={[16, 16]}
									>
										{
											selectedCollection.map((blog, i) => {
												return (
													<BlogCard blog={blog} key={i} />
												)
											})
										}
									</Row>
								</div>
								:
								<Row
									className="mt-10"
									align={"stretch"}
									gutter={[16, 16]}
								>
									{
										blogs?.map((blog, i) => {
											return (
												<BlogCard blog={blog} key={i} />
											)
										}
										)
									}
								</Row>
						}
					</Col>
				</Row>
			</div >
		</>
	)
}