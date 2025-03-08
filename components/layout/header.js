import Link from 'next/link';
import { useRouter } from 'next/router'
import Image from 'next/image';
import { Button, Row, Col, Typography, Dropdown } from 'antd';
import { DownOutlined, RightOutlined, LeftOutlined } from '@ant-design/icons';
import { useEffect, useState } from 'react';
import { FaStar } from "react-icons/fa";
import useFetch from '../../_fetch';
import { LuMenu } from "react-icons/lu";
import { IoCloseCircleOutline } from "react-icons/io5";
import { useCookies } from "react-cookie";
import LeadModal from '../lead_Modal';
import logoPng from '../../public/logo.png';

function CollegeCard({
	college,
	router,
	setIsExploreCourses,
	setSelectedCollege,
	setShowModal,
	cookies
}) {
	return (

		<>
			<div
				className='bg-white rounded-xl shadow-xl flex flex-col h-40 p-3 cursor-pointer'
				onClick={() => {
					if (!cookies?.user) {
						setSelectedCollege(college);
						setShowModal(true);
					} else {
						router.push(`/colleges/${college?.slug}`)
						setIsExploreCourses(false);
					}

				}}
			>
				<div
					className='flex gap-x-2'
				>
					<Image
						src={college?.logo}
						loader={({ src }) =>
							`https://upschol.s3.ap-south-1.amazonaws.com/${src}`
						}
						alt="College Logo"
						height={128}
						width={128}
						className="h-12 w-12 rounded-full object-contain"
					/>
					<div>
						<p
							className='text-sm font-Poppins text-slate-500'
						>
							{college?.university}
						</p>
						<p
							className='text-base font-Poppins'
						>
							{college?.college_name}
						</p>
					</div>
				</div>
				<div
					className='flex gap-x-2 mt-2 w-full mt-auto'
				>
					<div
						className='w-1/3'
					>
						<p
							className='text-sm font-Poppins text-slate-500'
						>
							Country
						</p>
						<p
							className='text-sm font-Poppins'
						>
							{
								college?.address?.Country ? college?.address?.Country : 'Not Available'
							}
						</p>
					</div>
					<div
						className='w-1/3'
					>
						<p
							className='text-sm font-Poppins text-slate-500'
						>
							Ratings
						</p>
						<div
							className='flex items-center gap-x-1'
						>
							<p
								className='text-sm font-Poppins'
							>

								{college.rating}

							</p>
							<FaStar
								className='inline-block text-[#FFD700] ml-1'
								size={18}
							/>
						</div>

					</div>
					<div className='w-1/3'>
						<p className='text-sm font-Poppins text-slate-500'>
							Visit
						</p>
						<p className='text-sm font-Poppins text-[#7F56D9] cursor-pointer'>
							Read More
						</p>
					</div>


				</div>


			</div>
		</>
	);
}


export default function PublicHeader() {
	const router = useRouter();
	const _fetch = useFetch();
	const [cookies] = useCookies(['user']);
	const navigationItems = [
		{
			id: 1,
			name: "Our Colleges",
			href: "/colleges",
		},
		{
			id: 2,
			name: "Blogs",
			href: "/blogs",
		},
		{
			id: 3,
			name: "Why Upschol?",
			href: "/aboutus",
		},
		{
			id: 3,
			name: "Study Abroad",
			href: "/studyAbroad",
		}
	];
	const [loading, setLoading] = useState(false);
	const [isExploreCourses, setIsExploreCourses] = useState(false);
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const [courses, setAllCourses] = useState([]);
	const [selectedCourse, setSelectedCourse] = useState(null);
	const [showModal, setShowModal] = useState(false);
	const [tags, setTags] = useState([]);
	const [selectedCollege, setSelectedCollege] = useState(null);

	useEffect(() => {
		async function init() {
			try {
				setLoading(true);
				let res = await _fetch('../../api/courses');
				res = await res.json();
				if (res.success) {
					setAllCourses(res.data?.courses);
					if (res.data?.courses?.length > 0) {
						setSelectedCourse(res.data?.courses[0]);
					}
					setTags(res.data?.tags);
				}
			} catch (e) {
				console.log(e)
			} finally {
				setLoading(false);
			}
		}

		init();

		const handleResize = () => {
			if (window.innerWidth < 1024) {
				setSelectedCourse(null);
			} else {
				if (courses.length > 0) {
					setSelectedCourse(courses[0]);
				}
				setIsMenuOpen(false);
			}
		}
		window.addEventListener('resize', handleResize);
		return () => {
			window.removeEventListener('resize', handleResize);
		}
	}, []);

	return (
		<>
			<div
				className={`flex flex-col md:py-1 h-full  ${isMenuOpen ? 'slide-in-top' : 'slide-out-top'} transition-all duration-300`}
			>
				<div
					className="flex items-center h-full justify-between px-4 md:px-8"
				>
					<div className="w-full md:w-auto flex items-center h-full justify-between px-4">
						{
							isMenuOpen ? (
								<IoCloseCircleOutline
									className={`lg:hidden cursor-pointer`}
									color='#7F56D9'
									size={24}
									onClick={() => setIsMenuOpen(false)}
								/>
							) : (
								<LuMenu
									className={`lg:hidden cursor-pointer`}
									color='#7F56D9'
									size={20}
									onClick={() => setIsMenuOpen(true)}
								/>
							)
						}
						<Link href="/" >
							<Image
								className='logo -ml-6 '
								src={logoPng}
								alt="UpSchol"

							/>
						</Link>
						<div
							className='flex items-center gap-x-4 xl:gap-x-8'
						>

							<Button
								className='self-center hover:bg-transparent hover:text-primary viewmore p-2 md:p-5 flex items-center gap-x-1 bg-primary shadow-none text-white rounded border-0 max-h-[45px] text-[11px] md:text-[14px]'
								onClick={() => setIsExploreCourses(!isExploreCourses)}
								loading={loading}
								disabled={loading}
							>
								Explore Courses
								<DownOutlined />
							</Button>
						</div>
					</div>
					<div
						className='lg:flex items-center gap-x-4 lg:gap-x-16 hidden ml-6 overflow-x-auto whitespace-nowrap'
					>
						{
							navigationItems.map(item => (
								<a
									key={item.id}
									href={item.href}
									className={`font-Poppins font-medium text-[#FFFFFF] hover:text-primary text-base ${router.pathname === item.href ? 'text-[#7F56D9]' : ''}`}
								>
									{item.name}
								</a>
							))
						}
					</div>
				</div>

				{
					isMenuOpen && (
						<div
							className='gap-y-2 flex flex-col lg:hidden py-6'
						>
							{
								navigationItems.map(item => (
									<Link
										key={item.id}
										href={item.href}
										className={`font-Poppins font-medium text-base ${router.pathname === item.href ? 'text-white' : 'text-white'}`}
										onClick={() => setIsMenuOpen(false)}
									>
										{item.name}
									</Link>
								))
							}
							<Dropdown
								trigger={['click']}
								menu={
									{
										items: [
											{
												key: '1',
												label: 'Career at UpSchol',
											},
											{
												key: '2',
												label: 'Hire from UpSchol',
											}
										],
										onClick: () => {
											//TODO: Add onClick
										}
									}
								}
								className='mt-8'
							>
								<Button
									className='p-5 flex items-center justify-center gap-x-1 bg-[#7F56D9] shadow-none text-white rounded custom-button'
								>
									View More
									<DownOutlined />
								</Button>
							</Dropdown>
						</div>
					)
				}
			</div>
			{
				isExploreCourses && (
					<div
						onClick={() => {
							if (window.innerWidth > 1024) {
								setIsExploreCourses(false);
							}
						}}
						className='fixed top-0 left-0 w-screen h-screen bg-white lg:bg-[#000000b3] z-20 flex justify-center'
					>
						<div
							className='lg:hidden flex flex-col h-full w-full'
						>
							<div
								className='flex flex-col h-full p-5'
							>
								{
									!selectedCourse ? (
										<>
											<IoCloseCircleOutline
												className='cursor-pointer mb-4'
												size={24}
												onClick={() => {
													setIsExploreCourses(false);
													setSelectedCourse(null);
												}}
											/>
											<Typography.Title
												level={4}
												className='font-Poppins'
											>
												Courses
											</Typography.Title>
											<div
												className='flex flex-col flex-1 mt-8 gap-y-6 custom-scrollbar overflow-x-hidden'
											>
												{
													courses.map(course => (
														<div
															key={course._id}
															className='flex items-center justify-between gap-x-2 cursor-pointer hover:text-[#7F56D9] pr-3'
															onClick={() => {
																setSelectedCourse(course);
															}}
														>
															<p
																className={`font-Poppins font-semibold text-base ${selectedCourse?._id === course._id ? 'text-[#7F56D9]' : ''}`}
															>
																{course.name}
															</p>
															<RightOutlined
																className={`text-base ${selectedCourse?._id === course._id ? 'text-[#7F56D9]' : ''}`}
															/>
														</div>
													))
												}
											</div>
										</>
									) : (
										<>
											<LeftOutlined
												className='cursor-pointer mb-4'
												size={24}
												onClick={() => {
													setSelectedCourse(null);
												}}
											/>
											<Typography.Title
												level={4}
												className='font-Poppins'
											>
												{`${selectedCourse?.name} (${selectedCourse?.colleges.length})`}
											</Typography.Title>
											<Row
												gutter={[16, 16]}
												className='custom-scrollbar overflow-y-auto overflow-x-hidden flex-1 mt-8 pb-6'
											>
												{
													selectedCourse?.colleges.map(college => (
														<Col
															xs={24}
															md={12}
															key={college._id}
														>
															<CollegeCard
																college={college}
																router={router}
																setIsExploreCourses={setIsExploreCourses}
																setSelectedCollege={setSelectedCollege}
																setShowModal={setShowModal}
																cookies={cookies}
															/>
														</Col>
													))
												}
											</Row>
										</>
									)
								}

							</div>

						</div>
						<div
							className='lg:flex hidden mt-16 w-4/5 h-2/3 bg-background_color p-6 z-30 rounded-lg shadow-lg overflow-hidden'
							onClick={(e) => {
								e.stopPropagation();
							}}
						>
							<Row
								gutter={[16, 16]}
								className='h-full w-full'
							>
								<Col
									span={6}
									className='h-full'
								>
									<div
										className='flex flex-col h-full'
									>
										<Typography.Title
											level={4}
											className='font-Poppins'
											style={{
												color: 'white'
											}}
										>
											Courses
										</Typography.Title>
										<div
											className='flex flex-col flex-1 mt-8 gap-y-6 custom-scrollbar overflow-x-hidden'
										>
											{
												courses.map(course => (
													<div
														key={course._id}
														className='flex items-center justify-between gap-x-2 cursor-pointer text-white hover:text-primary pr-3'
														onClick={() => {
															setSelectedCourse(course);
														}}
													>
														<p
															className={`font-Poppins font-semibold text-base ${selectedCourse?._id === course._id ? 'text-primary' : ''}`}
														>
															{course.name}
														</p>
														<RightOutlined
															className={`text-base ${selectedCourse?._id === course._id ? 'text-primary' : ''}`}
														/>
													</div>
												))
											}
										</div>
									</div>
								</Col>
								<Col
									span={18}
									className='h-full'
								>
									<div
										className='flex flex-col h-full px-6'
									>
										<Typography.Title
											level={4}
											className='font-Poppins'
											style={{ color: 'white' }}
										>
											{`${selectedCourse?.name} (${selectedCourse?.colleges.length})`}
										</Typography.Title>
										<Row
											gutter={[16, 16]}
											className='custom-scrollbar overflow-y-auto overflow-x-hidden flex-1 mt-8 pr-0 pb-6'
											align={'stretch'}
										>
											{
												selectedCourse?.colleges.map(college => (
													<Col
														span={12}
														key={college._id}
													>
														<CollegeCard
															college={college}
															router={router}
															setIsExploreCourses={setIsExploreCourses}
															setSelectedCollege={setSelectedCollege}
															setShowModal={setShowModal}
															cookies={cookies}
														/>
													</Col>
												))
											}
										</Row>
									</div>
								</Col>

							</Row>
						</div>
					</div>

				)
			}
			<LeadModal
				showModal={showModal}
				setShowModal={setShowModal}
				college={selectedCollege}
				courses={tags}
				onSuccess={() => {
					setIsExploreCourses(false);
				}}
			/>
		</>

	)
}