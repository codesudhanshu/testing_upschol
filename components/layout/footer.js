import Image from "next/image";
import logo from "../../public/file.png";
import { Col, Row } from "antd";
import Link from "next/link";
const Promise = require('promise');
import { useEffect, useState } from "react";
import { _fetch } from "../../_fetch";
import { message } from "antd"
import bg from "../../public/upschol-bg.png"
import googleReviewsIcon from '../../public/step-with-us/google-reviews.png';
import admissionIcon from '../../public/step-with-us/admissions.png';
import stepIcon from '../../public/step-with-us/step-with-us.png';

export default function CustomFooter(props) {

	const [loading, setLoading] = useState(false);
	const [college, setCollege] = useState('');
	const [course, setCourse] = useState('');
	const [alldata, setAlldata] = useState('');

	const collegeData = async () => {
		try {
			setLoading(true);
			let res = await _fetch('../../api/search?page=1&limit=10', {
				method: "GET",
			});
			res = await res.json();
			if (res.success) {
				setCollege(res.data.colleges);
			} else {
				message.error(res.message)
			}
		} catch (error) {
			console.log(error);
			message.error("Some error occurred");
		} finally {
			setLoading(false);
		}
	}
	const courseData = async () => {
		try {
			setLoading(true);
			let res = await _fetch('../../api/courses', {
				method: "GET",
			});
			res = await res.json();
			if (res.success) {
				setCourse(res.data.tags);
			} else {
				message.error(res.message)
			}
		} catch (error) {
			console.log(error);
			message.error("Some error occurred");
		} finally {
			setLoading(false);
		}
	}
	const aggregateData = async () => {
		try {
			setLoading(true);
			let res = await _fetch('../../api/coursewithcollege', {
				method: "GET",
			});
			res = await res.json();
			if (res.success) {
				setAlldata(res.data);
			}
		}
		catch (error) {
			console.log(error);
			message.error("Some error occurred");
		} finally {
			setLoading(false);
		}
	}

	useEffect(() => {
		collegeData();
		courseData();
		aggregateData();
	}, []);

	return (
		<div className="relative">
			<Image
				alt="bg"
				src={bg}
				placeholder="blur"
				quality={100}
				fill
				sizes="100vw"
				style={{
					objectFit: 'cover',
				}}
			/>
			<div className="bg-[#1E1E1E] py-8 md:py-16 px-6 lg:py-20  lg:px-8 max-w-screen">
				<Row
					gutter={[24, 20]}>
					<Col
						xs={24} md={6}
					>
						<div className="basis-1/5 ">
							<Image
								style={{ height: "50px", backgroundColor: "#1E1E1E", objectFit: "cover" }}
								width={200}
								height={100}
								src={logo}
								className=""
								alt='UpSchol'
							/>
							<div className="title mx-auto">
								<h1 className="my-6">
									<span className="text-xl md:text-3xl font-Poppins font-semibold	gradientText">
										Step up with Us!
									</span>
								</h1>
								<div className="w-[250px] h-[60px] bg-[#FFFFFF] rounded-2xl flex justify-center items-center">Google Rating- 4.5
									<Image
										src={googleReviewsIcon}
										alt="Google Rating Icon"
										className="w-12 h-4 mr-2 ml-4"
									/>
								</div>
								<div className="w-[250px] h-[60px] bg-[#FFFFFF] rounded-2xl flex justify-center items-center mt-3">10k+ admissions
									<Image
										src={admissionIcon}
										alt="10k+ admission"
										className="w-6 h-6 mr-2 ml-8"
									/>
								</div>
								<div className="w-[250px] h-[60px] bg-[#FFFFFF] rounded-2xl flex justify-center items-center mt-3">
									#StepUpWithUs
									<Image
										src={stepIcon}
										alt="step with us"
										className="w-8 h-8 mr-2 ml-8"
									/>

								</div>
							</div>
						</div>
					</Col>
					<Col
						xs={24} md={18}
					>
						<div className=" mx-auto mt-6 lg:mt-0">
							<Row
								gutter={[24, 20]}
							>
								<Col
									xs={24} md={8}
								>
									<div style={{ fontFamily: "Poppins" }} className="text-white flex flex-col content-between">
										<h1 className="mb-2">
											<span className="text-lg font-Poppins font-semibold	gradientText">
												Universities
											</span>
										</h1>
										{college.length ? college.map((e, index) => (
											index < 8 && (
												<a
													href={`/colleges/${e.slug}`}
													key={e._id}
												>
													<p className="font-medium mt-3">{e?.college_name}</p>
												</a>
											)

										)) : null}
									</div>
								</Col>
								<Col
									xs={24} md={8}
								>
									<div style={{ fontFamily: "Poppins" }} className="text-white flex flex-col content-between">
										<h1 className="mb-2">
											<span className="text-lg font-Poppins font-semibold	gradientText">
												Courses
											</span>
										</h1>
										{course.length ? course.map((e, index) => (
											index < 8 && (
												<a
													href={`/colleges?tagId=${e._id}`}
													key={e._id}
												>
													<p className="font-medium mt-3">{e?.tag_name}</p>
												</a>
											)

										)) : null}
									</div>
								</Col>
								<Col
									xs={24} md={8}
								>
									<div style={{ fontFamily: "Poppins" }} className="text-white flex flex-col content-between">
										<h1 className="mb-2">
											<span className="text-lg font-Poppins font-semibold	gradientText">
												MBA
											</span>
										</h1>
										<a
											href={`/colleges?streamId=${process.env.NEXT_PUBLIC_MBA_URL}`}
										>
											<p className="font-medium mt-3">Online MBA</p>
										</a>
									</div>
								</Col>
								<Col
									xs={24} md={8}
								>
									<div style={{ fontFamily: "Poppins" }} className="text-white flex flex-col content-between">
										<h1 className="mb-2">
											<span className="text-lg font-Poppins font-semibold	gradientText">
												Study Abroad Online
											</span>
										</h1>
										{alldata.length ? alldata.map((data, index) => (
											index < 8 && (
												<a
													href={`/colleges/${data.slug}`}
													key={data?._id}
												>
													<p className="font-medium mt-3">{data?.college_name}</p>
												</a>
											)

										)) : null}
									</div>
								</Col>
								<Col
									xs={24} md={8}
								>
									<div style={{ fontFamily: "Poppins" }} className="text-white flex flex-col content-between">
										<h1 className="mb-2">
											<span className="text-lg font-Poppins font-semibold	gradientText">
												Pages
											</span>
										</h1>

										<Link
											href="/uni-interact"
										>
											<p className="font-medium mt-3">Uni Interact</p>
										</Link>
										<Link
											href="/#faqs"
											scroll={false}
										>
											<p className="font-medium mt-3">FAQs</p>
										</Link>
										<Link
											href="/blogs"
										>
											<p className="font-medium mt-3">Blogs</p>
										</Link>

									</div>
								</Col>
								<Col
									xs={24} md={8}
								>
									<div className="text-white">
										<div style={{ fontFamily: "Poppins" }} className="text-white flex flex-col content-between ">
											<h1 className="mb-2">
												<span className="text-lg font-Poppins font-semibold	gradientText">
													Company
												</span>
											</h1>
											<Link
												href="/aboutus"
											>
												<p className="font-medium mt-3">Mission And Vision</p>
											</Link>
											<Link
												href="/#about-us"
												scroll={false}
											>
												<p className="font-medium mt-3">About Us</p>
											</Link>
											<Link
												href="/#contact-us"
												scroll={false}
											>
												<p className="font-medium mt-3">Get In Touch</p>
											</Link>
										</div>
									</div>
								</Col>
								<Col
									xs={24} md={8}
								>
									<div className="text-white" >
										<div style={{ fontFamily: "Poppins" }} className="text-white flex flex-col content-between ">
											<h1 className="mb-2">
												<span className="text-lg font-Poppins font-semibold	gradientText">
													Social
												</span>
											</h1>
											<Link
												href="https://www.instagram.com/upschol/"
												target="_blank"
											>
												<p className="font-medium mt-3">Instagram</p>
											</Link>
										</div>
									</div>
								</Col>
							</Row>
						</div>
					</Col>
					<p style={{ color: "white", textAlign: 'center' }} className="text-white">© 2022 UpSchol. All rights reserved.</p>
				</Row>
			</div>
		</div >

	)
}