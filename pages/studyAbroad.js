import { Col, Row, Typography } from "antd";
import { useRouter } from "next/router";
import Image from "next/image";
import Slider from "react-slick";
import { FaArrowRight, FaCheckCircle, FaRegUserCircle, FaStar, FaWhatsapp } from "react-icons/fa";
import { FaArrowRightLong, FaLocationDot, FaChevronRight, FaChevronLeft } from "react-icons/fa6";
import { AiFillStar } from "react-icons/ai";
import { useState, useEffect } from 'react'
import { FaPlus } from "react-icons/fa6";
import { FaMinus } from "react-icons/fa6";
import { _fetch } from '../_fetch';
import { getS3Url } from "../lib/s3";

export default function StudyAbroad() {
	const router = useRouter();
	const [open, setOpen] = useState(-1);
	const [collegedata, setCollegedata] = useState('');
	const [loading, setLoading] = useState(false);

	const clgData = async () => {
		try {
			setLoading(true);
			let res = await _fetch('../../api/collegedetails', {
				method: "GET",
			});
			res = await res.json();
			if (res.success) {
				const filtredArr = res?.data?.filter((collage) => {
					return collage.tag_category?.some((tag) => tag.tag_category === 'Study Abroad Online');
				});
				setCollegedata(filtredArr);
			}
		}
		catch (error) {
			console.log(error);
		} finally {
			setLoading(false);
		}
	}
	useEffect(() => {
		clgData();
	}, []);
	const colleges = [0, 1, 2, 3, 4, 5, 6, 7, 8]
	const reviews = [0, 1, 2, 3, 4, 5, 6, 7, 8]
	const faqs = [
		{
			question: <>Is Upschol Abroad&apos;s education really affordable?</>,
			answer: <>Absolutely! We&apos;ve curated budget-friendly programs to ensure quality education is accessible to everyone. Your dream education is now within reach.
			</>
		},
		{
			question: <>How can Upschol Abroad help with my post-study work plans?</>,
			answer: <>Our programs are designed to be post-study work visa qualified, offering a seamless transition from education to a successful career. Speak to our study-abroad experts to now more, Call: 8368500496.</>
		},
		{
			question: <>Are there any scholarships available, and how can I apply?</>,
			answer: <>Yes! Upschol  believes in your potential. Explore our on-campus scholarships – your stepping stone to academic excellence without breaking the bank, Call: 8368500496 to know more.</>
		},
		{
			question: <>Can Upschol Abroad assist with visa processes and accommodations?</>,
			answer: <>Certainly! We provide guidance on visa procedures and can help you find suitable accommodations. Your success, coupled with your comfort and ease, remains our top priority.</>
		},
		{
			question: <>How does Upschol Abroad&apos;s career fair benefit students in launching their professional journey?</>,
			answer: <>Our career fairs provide a unique platform for students to connect with industry professionals, explore job opportunities, and gain valuable insights. We&apos;re dedicated to helping you kickstart your career on a successful note!</>
		},
		{
			question: <>What sets Upschol Abroad apart from other study abroad programs?</>,
			answer: <>Our commitment to affordability, globally recognized degrees, and post-study work opportunities makes us stand out. We&apos;re not just a program; we&apos;re your partner in success till you achieve it.</>
		},
		{
			question: <>What if I face challenges during my academic journey?</>,
			answer: <>We&apos;ve got your back! Upschol Abroad offers comprehensive support services. Our dedicated team is here to assist you, ensuring a smooth academic experience. Speak to our study-abroad experts to now more, Call: 8368500496.</>
		},
		{
			question: <>How do I get started with the application process?</>,
			answer: <>It&apos;s easy! Explore our programs, and once you find the perfect fit, follow our simple online application process. We&apos;re here to guide you every step of the way.</>
		},
		{
			question: <>What opportunities does Upschol Abroad provide for networking and career development?</>,
			answer: <>Upschol Abroad hosts networking events, career fairs, and workshops, connecting you with industry professionals. Your success journey doesn&apos;t end with graduation; it begins here and we are your end to end partner in it.</>
		}
	]

	function PrevArrow(props) {
		const { onClick } = props;
		return (
			<div
				className="absolute top-1/2 left-0 transform -translate-y-1/2 cursor-pointer z-10 rounded-full bg-white p-3"
				onClick={onClick}
			>
				<FaChevronLeft
					size={25}
					color={"black"}
				/>
			</div>
		)
	}

	function NextArrow(props) {
		const { onClick } = props;
		return (
			<div
				className="absolute top-1/2 right-0 transform -translate-y-1/2 cursor-pointer z-10 rounded-full bg-white p-3"
				onClick={onClick}
			>
				<FaChevronRight
					size={25}
					color={"black"}
				/>
			</div>
		)
	}

	function getStars(rating) {
		let arr = [];
		for (let i = 0; i < rating; i++) {
			arr.push(<AiFillStar style={{ color: '#ffc107', marginLeft: 3 }} />)
		}

		for (let i = 0; i < 5 - rating; i++) {
			arr.push(<AiFillStar style={{ color: "#D3D3D3" }} />)
		}
		return arr.slice(0, 5);
	}

	const handleOpen = (value) => {
		setOpen(open === value ? -1 : value);
	}


	return (
		<main className="bg-background_color">
			<section
				id="overview"
				className='relative overflow-hidden'
				style={{
					// boxShadow: 'inset 0px 10px 18px #e6e5ff',
					minHeight: '90vh'
				}}
			>
				<div
					className="w-full h-full container"
					style={{
						minHeight: 'inherit'
					}}
				>
					<Row
						gutter={[20, 20]}
						align={"stretch"}
						className="w-full h-full pb-5 md:pb-0"
						style={{
							minHeight: 'inherit',
							rowGap: '0px',
						}}
					>
						<Col
							xs={{
								order: 2,
								span: 24
							}
							}
							md={{
								order: 1,
								span: 12
							}}
						>
							<div
								className="w-full h-full flex flex-col justify-center"
							>
								<h1
									className="text-white font-bold text-4xl md:text-6xl lg:6xl leading-relaxed"
									style={{
										zIndex: 3,
										lineHeight: 1.3
									}}
								>
									Upschol <span className="gradientText">Abroad: International Degree</span> in Local Budget
								</h1>
								<p
									className="text- text-lg mt-4 text-white"
									style={{
										zIndex: 3,
									}}
								>
									Globally Accredited & Recognized Degrees | Post Study Work Visa Qualified Programs | On-Campus Scholarships Available
								</p>
								<div
									className="flex items-center gap-x-4 mt-4"
								>
									<button
										className="bg-[#7F56D9] text-white px-5 py-3 rounded-md text-lg font-semibold"
										onClick={() => {
											router.push('/colleges')
										}}
										style={{
											zIndex: 3,
										}}
									>
										Explore Colleges
									</button>
								</div>
								<div className="flex mt-5">
									<div className="mr-5">
										<p className="font-bold text-lg text-white">45k+</p>
										<p className="text-white">Univerity Partners</p>
									</div>
									<svg xmlns="http://www.w3.org/2000/svg" width="10" height="26" viewBox="0 0 10 26" fill="none">
										<line y1="-0.5" x2="10.9573" y2="-0.5" transform="matrix(-0.82137 0.570396 -0.726733 -0.68692 9 0)" stroke="white" />
										<line y1="-0.5" x2="10.9573" y2="-0.5" transform="matrix(-0.82137 0.570396 -0.726733 -0.68692 9 6.25)" stroke="white" />
										<line y1="-0.5" x2="10.9573" y2="-0.5" transform="matrix(-0.82137 0.570396 -0.726733 -0.68692 9 12.5)" stroke="white" />
										<line y1="-0.5" x2="10.9573" y2="-0.5" transform="matrix(-0.82137 0.570396 -0.726733 -0.68692 9 18.75)" stroke="white" />
									</svg>
									<div className="ml-5">
										<p className="font-bold text-lg text-white">5000k+</p>
										<p className="text-white">Careers Transformed</p>
									</div>
								</div>
							</div>
						</Col>
						<Col
							xs={{
								order: 1,
								span: 24
							}
							}
							md={{
								order: 2,
								span: 12
							}}
						>
							<div
								className="w-full h-full flex flex-col justify-center"
							>
								<Image
									src={'/study-abroad-img.png'}
									alt={'student'}
									style={{
										maxHeight: '100%',
										maxWidth: '100%',
										zIndex: 4
									}}
									width={1000}
									height={1000}
									className="lg:absolute object-contain"
								/>
							</div>
						</Col>
					</Row>
				</div>
			</section>
			<section className="mt-20 container">
				<div className="title mx-auto">
					<h3 className="text-primary text-center text-base font-Poppins font-semibold	">
						About Us
					</h3>
					<h1 className="text-center mt-4">
						<span className="text-center text-3xl font-Poppins font-semibold text-white">
							Get Set, Study Abroad
						</span>
					</h1>
				</div>

				<Row
					gutter={[32, 32]}
					align={"stretch"}
					className="w-full h-full pb-5 md:pb-0 mt-8"
					style={{
						minHeight: 'inherit',
						rowGap: '0px',
					}}
				>
					<Col
						xs={{
							order: 2,
							span: 24
						}
						}
						md={{
							order: 1,
							span: 12
						}}
					>
						<Image
							src={'/abroad-img.png'}
							alt={'student'}
							style={{
								maxHeight: '100%',
								maxWidth: '100%',
								zIndex: 4
							}}
							width={700}
							height={700}
							className=" object-contain"
						/>
					</Col>
					<Col
						xs={{
							order: 2,
							span: 24
						}
						}
						md={{
							order: 1,
							span: 12
						}}
					>
						<p className="text-2xl font-bold text-white">Our Vision & Mission</p><br />
						<div className="text-white">
							<p className="text-lg font-bold">Vision: Get Set for Affordable Opportunities-</p>
							<p className="mt-2 ">Upschol Abroad envisions empowering everyone through accessible and affordable global education, simplifying the journey from education to impactful careers.</p>
						</div>

						<div className="mt-5 text-white">
							<p className="text-lg font-bold">Vision: Get Set for Affordable Opportunities-</p>
							<p className="mt-2 ">Upschol Abroad envisions empowering everyone through accessible and affordable global education, simplifying the journey from education to impactful careers.</p>
						</div>
					</Col>
				</Row >
			</section >
			<section className="mt-20">
				<div
					className="container w-screen"
				>
					<div className="title mx-auto">
						<h3 className="text-primary text-center text-base font-Poppins font-semibold	">
							Top Colleges
						</h3>
						<h1 className="text-center mt-4 text-white">
							<span className="text-center text-3xl font-Poppins font-semibold">
								Top Colleges Abroad
							</span>
						</h1>
					</div>
					<div
						className="mt-8"
					>
						{collegedata && <Slider
							dots={false}
							speed={500}
							autoplay={true}
							autoPlaySpeed={3000}
							slidesToShow={3}
							slidesToScroll={1}
							infinite={true}
							responsive={[
								{
									breakpoint: 1200,
									settings: {
										slidesToShow: 2,
										slidesToScroll: 1,
									}
								},
								{
									breakpoint: 768,
									settings: {
										slidesToShow: 1,
										slidesToScroll: 1,
									}
								}
							]}
							nextArrow={<NextArrow />}
							prevArrow={<PrevArrow />}
						>
							{
								collegedata?.length && collegedata?.map((item, index) => {
									return (
										<div
											key={index}
											className="lg:px-2 h-[530px] bg-background_color md:h-[540px]"
										>
											<div
												className="cursor-pointer h-full w-full rounded-xl bg-white overflow-hidden flex flex-col" 
												style={{
													borderRadius: '10px',
													boxShadow: '0px 0px 14px 0px rgba(0, 0, 0, 0.10)'
												}}
												onClick={() => {
													router.push(`/colleges/${item.slug}`)
												}}
											>
												<div style={{ padding: 10, maxHeight: 300, minHeight: 300 }}>
													<Image
														className="h-full w-full object-cover object-center rounded-lg"
														loader={({ src }) => getS3Url(src)}
														src={item?.banner_image?.path}
														alt={item?.college_name}
														width={425}
														height={200}
													/>
													<div
														className="flex flex-col justify-between h-1/5 p-2"
													>
														<div
															className="flex justify-between items-center py-3"
														>
															<Image
																className="w-7 min-w-7 min-h-7 h-7 object-contain"
																loader={({ src }) => getS3Url(src)}
																src={item?.logo}
																alt={item?.college_name}
																width={50}
																height={50}
															/>
															<h5
																className="text-black font-semibold text-base px-3"
															>
																{item?.college_name}
															</h5>
															<div
																className="flex gap-x-2 items-center px-3 py-1 rounded bg-[#F4EBFF]"
															>
																<FaStar
																	className="text-yellow-500"
																/>

																<p
																	className="text-[#6941C6]"
																>
																	{item?.rating}
																</p>
															</div>
														</div>
														<div
															className="flex items-center gap-x-4 text-[#00000080] mt-3"
														>
															<FaLocationDot
																size={20}
															/>
															<p
																className="text-[#6941C6]"
															>
																{item?.address?.Country},{item?.address?.state},{item?.address?.city}
															</p>
														</div>
														<p
															className="text-[#6941C6] mt-4"
														>
															{item?.description.slice(0, 80)}
														</p>
														<div className="flex justify-center">
															<Typography.Link
																className="px-4 mt-3 py-2  rounded font-normal text-center flex items-center gap-x-2 w-auto"
																style={{
																	backgroundColor: "#7F56D9",
																	border: "none",
																	color: "#fff",
																	boxShadow: "none",
																}}

															>
																View Details
															</Typography.Link>
														</div>
													</div>
												</div>

											</div>
										</div >
									)
								})
							}
						</Slider>}
					</div>
				</div>
			</section>
			<section className="mt-20">
				<div className="container py-10">
					<div className="title mx-auto container py-10">
						<h3 className="text-primary text-center text-base font-Poppins font-semibold	">
							Testimonial
						</h3>
						<h1 className="text-center mt-4 text-white">
							<span className="text-center text-3xl font-Poppins font-semibold">
								Discover what learners are saying about Upschol Abroad
							</span>
						</h1>
					</div>
					<Slider
						dots={true}
						speed={500}
						autoplay={true}
						autoPlaySpeed={3000}
						slidesToShow={3}
						slidesToScroll={1}
						infinite={true}
						responsive={[
							{
								breakpoint: 1750,
								settings: {
									slidesToShow: 2,
									slidesToScroll: 1,
								}
							},
							{
								breakpoint: 1200,
								settings: {
									slidesToShow: 1,
									slidesToScroll: 1,
								}
							}
						]}
						className="college-details-reviews-slider"
					>
						{
							reviews?.map((elem) => (
								<div
									key={elem}
									className="px-4 py-8 h-full"
								>
									<div
										className="h-full bg-white p-4 rounded-lg shadow-md hover:shadow-xl transition-all duration-300 ease-in-out flex flex-col justify-between"
									>
										<div className="flex">
											<Image
												className="w-7 min-w-7 min-h-7 h-7 object-contain"
												src="https://upschol.s3.ap-south-1.amazonaws.com/chandigarh-university/Chandigarh%20University.jpeg"
												alt="Chandigarh University"
												width={50}
												height={50}
												style={{ borderRadius: "100px" }}
											/>
											<div className="ml-4">
												<p className="font-bold">George Bush</p>
												<p className="text-[#667085]">President</p>
											</div>
										</div>
										<p className="mt-4 text-[#667085]">This course exceeded my expectations! The comprehensive content, interactive sessions, and supportive instructors made learning enjoyable and rewarding. Highly recommend for any student seeking a top-notch educational experience.</p>
										<div className="flex mt-4">
											{
												getStars(4)
											}

										</div>
									</div>
								</div>
							))
						}
					</Slider>
				</div>
			</section>
			<section className="container py-20">
				<div className="title mx-auto container">
					<h3 className="text-primary text-center text-base font-Poppins font-semibold	">
						Know Upschol Abroad
					</h3>
					<h1 className="text-center mt-4 text-white">
						<span className="text-center text-3xl font-Poppins font-semibold">
							Frequently Asked Questions
						</span>
					</h1>
				</div>
				<div
					className="flex flex-col gap-y-4 mt-5"
				>
					{
						faqs?.map((faq, index) => (
							<div
								key={index}
								className="flex flex-col gap-y-3 p-4 rounded-lg shadow-lg cursor-pointer hover:shadow-xl transition duration-300 ease-in-out select-none"
								onClick={() => handleOpen(index)}
							>
								<div className="flex justify-between">
									<h4
										className={`font-semibold mr-1 text-lg ${open === index ? "text-[#7F56D9]" : "text-white"}`}
									>
										{faq.question}
									</h4>
									{
										open === index ?
											<FaMinus color="white" />
											:
											<FaPlus color="white" />
									}
								</div>
								{
									open === index && (
										<p
											className="text-white text-lg"
										>
											{faq.answer}
										</p>
									)
								}
							</div>
						))
					}
				</div>
			</section>
		</main>
	)
}