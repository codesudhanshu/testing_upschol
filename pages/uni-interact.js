import React, { useState } from 'react';
import { FaGraduationCap } from "react-icons/fa";
import { FaSchoolFlag } from "react-icons/fa6";
import { MdHandshake, MdSupportAgent } from "react-icons/md";
import { CgFileDocument } from "react-icons/cg";
import { GiReceiveMoney } from "react-icons/gi";
import { IoPeopleOutline, IoMapOutline } from "react-icons/io5";
import { FiArrowUpRight } from "react-icons/fi";
import { IoCalendarOutline } from "react-icons/io5";
import { GoClock } from "react-icons/go";
import { SlBadge } from "react-icons/sl";
import Image from 'next/image';
import Banner from '../public/Group 35716.png'
import Community from '../public/Rectangle 327.png';
import Row2 from '../public/Rows-2.png';
import Col1Row1 from '../public/Col-1.png'
import Col1Row2 from '../public/Row-2Col-2.png'
import Col2Row2 from '../public/Col-1Row-2.png'
import Col2Row1 from '../public/Row-2Col-1.png'
import GetInTouch from '../components/landing_page/GetinTouch';
import { _fetch } from '../_fetch';
import { Col, List, Row, message } from 'antd';
import Link from 'next/link';
import IIT from '../public/iit-indian-institute-of-technology-kharagpur4613.png'
import IIM from '../public/IIM,_Ahmedabad_Logo.svg.png'
import Amity from '../public/images.png'
import OPJINDAL from '../public/O._P._Jindal_Global_University_Logo.png'
import IMT from '../public/imt-ghaziabad.png'
import CU from '../public/chandigarh-university.png'
import DY from '../public/dy-patil.png'
import JU from '../public/images (2).png'
import LPU from '../public/images (3).png'
import CircullarBG from "../public/images/about-us/page-bg.svg";
import TopArrowSVG from "../public/assets/uni-interact/svgs/top-arrow.svg";
import MiddleArrowSVG from "../public/assets/uni-interact/svgs/middle-arrow.svg";
import MiddleArrowSVG2 from "../public/assets/uni-interact/svgs/middle-arrow-2.svg";


const initValues = {
	full_name: "",
	designation: '',
	school_name: '',
	location: '',
	date: '',
	time: '',
	number_of_students: ''
}

const Component = () => {

	const partners = [
		{
			src: IIT,
		},
		{
			src: IIM,
		},
		{
			src: Amity,
		},
		{
			src: OPJINDAL,
		},
		{
			src: IMT,
		},
		{
			src: CU,
		},
		{
			src: DY,
		},
		{
			src: JU,
		},
		{
			src: LPU,
		}
	];
	const upscholImpactData = [
		{
			number: "21,000+",
			title: "Students Assisted",
			icon: FaGraduationCap
		},
		{
			number: "215+",
			title: "Partner Schools & Colleges",
			icon: MdHandshake
		},
		{
			number: "120+",
			title: "Top Universities",
			icon: FaSchoolFlag
		},
		{
			number: "205+",
			title: "Successful Events",
			icon: SlBadge
		}
	];
	const whyChooseUsData = [
		{
			title: "Meet Top Universities",
			desc: "You will get an exclusive opportunity to interact directly with the representatives of Top Universities.",
			icon: FaSchoolFlag
		},
		{
			title: "Career Counseling",
			desc: "Get expert advice on program selection, application, admissions, and life after course persuasion.",
			icon: IoPeopleOutline
		},
		{
			title: "Discover Scholarships",
			desc: "Our events will give you access to obtain exclusive scholarships that you deserve.",
			icon: FaGraduationCap
		},
		{
			title: "Application Guidance",
			desc: "We will ensure that your application is up to the mark and you are able to avail offers from top Universities.",
			icon: CgFileDocument
		},
		{
			title: "Study Loan Assistance",
			desc: "Discover different financial support options and get assistance to secure a study loan.",
			icon: GiReceiveMoney
		},
		{
			title: "Continuous Support",
			desc: "Receive 1-on-1 support from our expert counseling team.",
			icon: MdSupportAgent
		}
	];
	const upcomingEvents = [
		{
			category: "Workshop",
			title: "Nadimpalli Satyanarayana Raju Institute of Technology",
			date: "02 Dec 2023",
			time: "09:00 AM",
			location: "ITC Fortune Park BBD"
		},
		{
			category: "Workshop",
			title: "Nadimpalli Satyanarayana Raju Institute of Technology",
			date: "02 Dec 2023",
			time: "09:00 AM",
			location: "ITC Fortune Park BBD"
		},
		{
			category: "Workshop",
			title: "Nadimpalli Satyanarayana Raju Institute of Technology",
			date: "02 Dec 2023",
			time: "09:00 AM",
			location: "ITC Fortune Park BBD"
		},
		{
			category: "Workshop",
			title: "Nadimpalli Satyanarayana Raju Institute of Technology",
			date: "02 Dec 2023",
			time: "09:00 AM",
			location: "ITC Fortune Park BBD"
		},
		{
			category: "Workshop",
			title: "Nadimpalli Satyanarayana Raju Institute of Technology",
			date: "02 Dec 2023",
			time: "09:00 AM",
			location: "ITC Fortune Park BBD"
		},
		{
			category: "Workshop",
			title: "Nadimpalli Satyanarayana Raju Institute of Technology",
			date: "02 Dec 2023",
			time: "09:00 AM",
			location: "ITC Fortune Park BBD"
		},
		{
			category: "Workshop",
			title: "Nadimpalli Satyanarayana Raju Institute of Technology",
			date: "02 Dec 2023",
			time: "09:00 AM",
			location: "ITC Fortune Park BBD"
		},
		{
			category: "Workshop",
			title: "Nadimpalli Satyanarayana Raju Institute of Technology",
			date: "02 Dec 2023",
			time: "09:00 AM",
			location: "ITC Fortune Park BBD"
		},
		{
			category: "Workshop",
			title: "Nadimpalli Satyanarayana Raju Institute of Technology",
			date: "02 Dec 2023",
			time: "09:00 AM",
			location: "ITC Fortune Park BBD"
		}
	];
	const [values, setValues] = useState(initValues);

	const handleChange = (e) => {
		const name = e.target.name;
		const value = e.target.value;
		setValues({ ...values, [name]: value });
	};

	const handleSubmit = async () => {
		try {
			const res = await _fetch('/api/enquiry', {
				method: 'POST',
				body: values
			})
			const data = await res.json();
			if (data.status === 200) {
				message.success('We Will Contact You Shortly')
				setValues(initValues)
			} else {
				message.error('School Name and Full Name is Required')
				setValues(initValues)
			}
		} catch (error) {
			message.error('Something Went Wrong')
			setValues(initValues)
		}
	}

	return (<section style={{ minWidth: "710px" }} className='flex flex-col' >
		<div className='w-full' >
			<div className='flex lg:flex-row flex-col' >
				<div className="title p-8 basis-1/2">
					<h1 style={{ lineHeight: 1.2 }} className='font-bold font-Poppins lg:text-6xl text-2xl' >
						<span>Fuel Your</span>
						<span className='text-primary' > University </span><br />
						<span className='text-primary mt-6' > Experience </span><span>With </span> <span>Vibrant </span><br />
						<span className='text-primary mt-6' >Student </span><span> Interaction</span>
					</h1>
					<p className='font-Poppins text-gray text-lg mt-6' >Promote vibrant university student interaction through clubs, events, and online forums, enhancing social bonds, sharing knowledge, and fostering a dynamic campus community.</p>
					<div className='flex justify-start px-6 gap-8'>
						<Link href={"#form"} className='rounded-md lg:text-lg lg:px-5 lg:py-4 py-2 px-3 my-8 bg-purple text-white font-semibold text-xs font-Poppins' >Enroll Now</Link>
						<button className='text-primary font-semibold font-Poppins text-lg' >View Colleges</button>
					</div>
				</div>
				<div style={{ minWidth: "660px" }} className='mt-5 basis-1/2 mx-auto' >
					<Image alt='banner' src={Banner} width={600} height={450} />
				</div>
			</div>
			<div className="title w-1/2 mt-20 mx-auto my-12">
				<h3 className="text-primary text-center text-base font-Poppins font-semibold	">
					University Interaction
				</h3>
				<h1 className="text-center mt-3">
					<span className="text-center text-3xl font-Poppins font-semibold	">
						Vibrant student interaction
					</span>
					<br />
					<span className="text-center text-lg  text-gray font-Poppins font-medium">
						On UpSchol, instructors from all over the world instruct millions of students. We offer the knowledge and abilities.
					</span>
				</h1>
			</div>
			<div style={{ minWidth: "700px" }} className='flex px-6 lg:flex-row flex-col gap-12 mt-6 items-center justify-center'>
				<Image width={"40%"} height={"40%"} alt='work' src={Community} />
				<div>
					<h1 className='font-semibold text-2xl font-Poppins'>A Strong Community</h1>
					<p className='mt-3 flex flex-col gap-4'><span>At our university, we understand that a strong sense of community is essential for personal and academic growth. That&apos;s why we invest in creating spaces and initiatives that actively encourage interaction among students. Whether you&apos;re collaborating on a group project, immersing yourself in a cultural event, or simply engaging in a lively conversation within one of our communal spaces, you&apos;ll quickly discover that student interaction is not just encouraged but ingrained in the very fabric of our campus life.</span>
						<span>In addition to peer-to-peer interactions, we also place great importance on fostering mentorship and guidance opportunities. Our faculty members are not just educators but also mentors who are readily available to provide academic support, career advice, and personal guidance. These interactions are designed to empower you to make informed decisions and navigate the challenges and opportunities that university life presents. </span>
					</p>
				</div>
			</div>

			<div className="title w-full mt-20 mx-auto p-6 lg:p-12"
				style={{
					backgroundColor: "rgba(242, 236, 255, 0.6)",
				}}
			>
				<h3 className="text-primary text-center text-base font-Poppins font-semibold	">
					Our Partners
				</h3>
				<Row
					className='mt-6 md:mt-10 lg:mt-14'
					gutter={[16, 16]}
					align={"stretch"}
				>
					<Col
						xs={{ span: 24 }}
						md={{ span: 8 }}
						lg={{ span: 8 }}
						className='flex flex-col items-center justify-center md:items-start'
					>
						<h4
							className='text-center md:text-left text-2xl font-Poppins font-extrabold'
						>
							Trusted By Leading
						</h4>
						<h4
							className='text-center md:text-left text-2xl font-Poppins font-extrabold mt-2'
							style={{
								color: "rgba(127, 86, 217, 1)",
							}}
						>
							Universities
						</h4>
						<p
							className='text-center md:text-left text-base font-Poppins font-normal mt-2'
						>
							Over years, we have helped universities find and admit bright students who have gone ahead to make a mark in the real world. Thanks to our transparent process and value-driven principles, TopUni Network has a proven track record that boasts of repeat participation from some of the finest universities in the world.
						</p>
					</Col>
					<Col
						xs={{ span: 24 }}
						md={{ span: 16 }}
						lg={{ span: 16 }}
						className='mt-6 md:mt-0'
					>
						<List
							grid={{
								gutter: 2,
								xs: 3,
								sm: 3,
								md: 3,
								lg: 3,
								xl: 3,
								xxl: 3,
							}}
							dataSource={partners}
							renderItem={(item) => (
								<List.Item>
									<Image
										src={item.src}
										alt='partner'
										className='w-full max-h-44 object-contain'
									/>
								</List.Item>
							)}
						/>
					</Col>
				</Row>
			</div>

			<div className="title w-full mx-auto p-6 lg:p-12 relative overflow-hidden">
				<div
					className='z-1'
				>
					<h3 className="text-primary text-center text-base font-Poppins font-semibold	">
						Get To Know About Us
					</h3>
					<h1 className="text-center mt-3 text-3xl font-semibold">
						UpSchol Impact
					</h1>
					<p
						className='text-center mt-3 text-base font-Poppins font-normal text-gray px-2 md:px-16 lg:px-48'
					>
						UpSchol events have enabled students to dream bigger and fulfill their wish of studying at Top Universities.
					</p>
				</div>
				<Row
					className='mt-6 md:mt-12 lg:mt-20 z-1'
					gutter={[16, 16]}
					align={"stretch"}
				>
					{
						upscholImpactData.map((item, index) => (
							<Col
								xs={12}
								lg={6}
								key={index}
							>
								<div
									className='flex items-center gap-x-8 justify-start lg:justify-center'
								>
									<div
										className='flex items-center justify-center w-16 h-16 rounded-full'
										style={{
											backgroundColor: "rgba(244, 235, 255, 1)",
										}}
									>
										<item.icon
											style={{
												fontSize: "1.8rem",
												color: "rgba(127, 86, 217, 1)"
											}}
										/>
									</div>
									<div>
										<h3
											className='text-3xl font-Poppins font-bold text-center'
											style={{
												color: "rgba(127, 86, 217, 1)"
											}}
										>
											{item.number}
										</h3>
										<h5
											className='text-base font-Poppins font-normal text-center'
										>
											{item.title}
										</h5>
									</div>
								</div>
							</Col>
						))
					}
				</Row>
				<Image
					src={CircullarBG}
					alt="Page Background"
					quality={100}
					className="object-contain absolute z-0 bottom-1/3 right-0 max-w-none"
				/>
				<Image
					src={TopArrowSVG}
					alt="Top Arrow"
					quality={100}
					className="object-contain absolute z-0 top-0 left-1/4"
				/>
				<Image
					src={MiddleArrowSVG}
					alt="Middle Arrow"
					quality={100}
					className="object-contain absolute z-0 top-1/4 left-1/6"
				/>
				<Image
					src={MiddleArrowSVG2}
					alt="Middle Arrow 2"
					quality={100}
					className="object-contain absolute z-0 top-1/3 md:top-1/4"
					style={{
						right: "1rem",
					}}
				/>
			</div>
			<div className="title w-full mx-auto p-6 lg:p-12"
				style={{
					backgroundColor: "rgba(242, 236, 255, 0.6)",
				}}
			>
				<div
					className='z-1'
				>
					<h3 className="text-primary text-center text-base font-Poppins font-semibold	">
						WHY CHOOSE US
					</h3>
					<h1 className="text-center mt-3 text-3xl font-semibold">
						Why Attend UpSchol Events
					</h1>
					<p
						className='text-center mt-3 text-base font-Poppins font-normal text-gray px-2 md:px-16 lg:px-48'
					>
						Our in-person events match you with the leading universities which offer courses that align with your interest and career goals. Interact with panel experts and network with like-minded aspirants for unbiased suggestions and guidance on the next steps. It’s your free ticket to a thriving career.
					</p>
				</div>
				<Row
					gutter={[24, 24]}
					align={"stretch"}
					className='mt-6 md:mt-12 md:px-12 lg:px-20'
				>
					{
						whyChooseUsData.map((item, index) => (
							<Col
								key={index}
								xs={12}
								md={8}
							>
								<div
									className='h-full p-6 flex flex-col items-center justify-between bg-white rounded-lg'
								>
									<div
										className='p-6 rounded-full mb-4'
										style={{
											backgroundColor: "rgba(244, 235, 255, 1)",
										}}
									>
										<item.icon
											size={30}
											color={"rgba(127, 86, 217, 1)"}
										/>
									</div>

									<div>
										<h3
											className='text-xl font-Poppins font-semibold text-center'
										>
											{item.title}
										</h3>
										<p
											className='text-sm font-Poppins font-normal text-center mt-2 text-gray'
										>
											{item.desc}
										</p>
									</div>
								</div>
							</Col>
						))
					}
				</Row>
			</div>
			<div className="title w-full mx-auto p-6 lg:p-12">
				<div
					className='z-1'
				>
					<h3 className="text-primary text-center text-base font-Poppins font-semibold	">
						Upcoming Events
					</h3>
					<h1 className="text-center mt-3 text-3xl font-semibold">
						Our Exciting Lineups
					</h1>
					<p
						className='text-center mt-3 text-base font-Poppins font-normal text-gray px-2 md:px-16 lg:px-48'
					>
						{`Discover what's on the horizon with our exciting upcoming events!`}
					</p>
				</div>
				<Row
					gutter={[24, 24]}
					align={"stretch"}
					className='mt-6 md:mt-12 md:px-12 lg:px-20'
				>
					{
						upcomingEvents.map((item, index) => (
							<Col
								key={index}
								xs={12}
								md={8}
							>
								<div
									className='h-full p-6 flex flex-col bg-white rounded-lg border border-slate-300 hover:border-blue-400 shadow-sm hover:shadow-lg transition duration-300 ease-in-out hover:scale-105 transform cursor-pointer'
								>
									<h5
										className='text-xs font-Poppins font-semibold'
										style={{
											color: "rgba(127, 86, 217, 1)"
										}}
									>
										{item.category}
									</h5>
									<div
										className='flex gap-x-2 items-center'
									>
										<h3
											className='text-lg font-Poppins font-semibold mt-2'
										>
											{item.title}
										</h3>
										<FiArrowUpRight
											size={40}
										/>
									</div>
									<div
										className='flex w-full items-center justify-start gap-x-8 mt-2'
									>
										<div
											className='flex items-center gap-x-2'
										>
											<IoCalendarOutline
												size={20}
											/>
											<h6
												className='text-xs font-Poppins'
											>
												{item.date}
											</h6>
										</div>
										<div
											className='flex items-center gap-x-2'
										>
											<GoClock
												size={20}
											/>
											<h6
												className='text-xs font-Poppins'
											>
												{item.time}
											</h6>
										</div>
									</div>
									<div
										className='flex items-center gap-x-2 mt-2'
									>
										<IoMapOutline
											size={20}
										/>
										<h6
											className='text-xs font-Poppins'
										>
											{item.location}
										</h6>
									</div>
								</div>
							</Col>
						))
					}
				</Row>
			</div>

			{/* <div className="title w-1/2 my-6 mx-auto mt-16">
				<h3 className="text-primary text-center text-base font-Poppins font-semibold	">
          		Upcoming Events
				</h3>
				<h1 className="text-center mt-3">
					<span className="text-center text-3xl font-Poppins font-semibold	">
            		Our Exciting Lineups
					</span>
					<br />
					<span className="text-center text-lg px-54 text-gray font-Poppins font-medium">
					Discover what&apos;s on the horizon with our exciting upcoming events!
					</span>
				</h1>
			</div>
			<div style={{minWidth:"700px"}} className='flex flex-wrap md:flex-row flex-col items-center justify-center'>
				<div className='card md:w-1/3 p-12 flex flex-col' >
					<div className='w-full' >
						<Image style={{width:"100%"}} src={Card1} width={"100%"} height={"100%"} alt='cardImg1' />
					</div>
					<span className='text-primary font-Poppins font-semibold'>Workshop</span>
					<div className="flex justify-between items-center">
						<h1 className='text-2xl text-black-2 font-Poppins font-semibold'>Real-Time Applications using LabVIEW with Arduino 2023</h1>
						<BsArrowUpRight style={{fontSize:"2.5rem"}} />
					</div>
					<p className='text-gray font-normal text-base' >Workshops This workshop aims at giving hands-on experience of implementing real-time applications using Arduino with LabVIEW graphical programming.</p>
				</div>
				<div className='card md:w-1/3 p-12 flex flex-col' >
					<div className='w-full' >
						<Image style={{width:"100%"}} src={Card2} width={"100%"} height={"100%"} alt='cardImg1' />
					</div>
					<span className='text-primary font-Poppins font-semibold'>Workshop</span>
					<div className="flex justify-between items-center">
						<h1 className='text-2xl text-black-2 font-Poppins font-semibold'>Real-Time Applications using LabVIEW with Arduino 2023</h1>
						<BsArrowUpRight style={{fontSize:"2.5rem"}} />
					</div>
					<p className='text-gray font-normal text-base' >Workshops This workshop aims at giving hands-on experience of implementing real-time applications using Arduino with LabVIEW graphical programming.</p>
				</div>
				<div className='card md:w-1/3 p-12 flex flex-col' >
					<div className='w-full' >
						<Image style={{width:"100%"}} src={Card3} width={"100%"} height={"100%"} alt='cardImg1' />
					</div>
					<span className='text-primary font-Poppins font-semibold' >Workshop</span>
					<div className="flex justify-between items-center">
						<h1 className='text-2xl text-black-2 font-Poppins font-semibold'>Real-Time Applications using LabVIEW with Arduino 2023</h1>
						<BsArrowUpRight style={{fontSize:"2.5rem"}} />
					</div>
					<p className='text-gray font-normal text-base' >Workshops This workshop aims at giving hands-on experience of implementing real-time applications using Arduino with LabVIEW graphical programming.</p>
				</div>
				
			</div> */}
			<div className="title w-1/2 mt-10 my-6 mx-auto">
				<h3 className="text-primary text-center text-base font-Poppins font-semibold	">
					Gallery
				</h3>
				<h1 className="text-center mt-3">
					<span className="text-center text-3xl font-Poppins font-semibold	">
						Our Captivating World
					</span>
					<br />
					<span className="text-center text-lg px-54 text-gray font-Poppins font-medium">
						Dive into our visual journey through a captivating gallery of memories and moments.
					</span>
				</h1>
			</div>
			<div className='grid grid-cols-4 xs:w-2/3 w-4/5  grid-rows-2 mx-auto xs:gap-x-10 gap-x-6 gap-y-6 pb-6'>
				<div className='row-span-2 col-span-2'><Image src={Row2} alt='img' /></div>

				<div><Image src={Col1Row1} alt='img' /></div>
				<div><Image src={Col2Row2} alt='img' /></div>
				<div><Image src={Col1Row2} alt='img' /></div>
				<div><Image src={Col2Row1} alt='img' /></div>

			</div>
			<GetInTouch />
			{/* <div id='form' className="title w-1/2 mt-20 my-6 mx-auto">
				<h3 className="text-primary text-center text-base font-Poppins font-semibold	">
				Schedule a Career Fair
				</h3>
				<h1 className="text-center mt-3">
					<span className="text-center text-3xl font-Poppins font-semibold	">
            		Plan Your Future Success
					</span>
					<br />
					<span className="text-center text-lg px-54 text-gray font-Poppins font-medium">
					Book your slot to participate in our upcoming career fair today!
					</span>
				</h1>
			</div>
			<div  className='flex flex-col items-center' >
				<form  className='grid sm:grid-cols-3 grid-cols-2 w-full gap-x-8 gap-y-8 px-16 my-6' >
					<div className="form-group flex flex-col">
						<label className='text-black-2 font-Poppins' >Full Name</label>
						<input value={values.full_name} onChange={handleChange} style={{border:"1px solid #E0E0E0"}} name='full_name' className='px-3 py-4 mt-3' type='text' placeholder='Full Name' required />
					</div>
					<div className="form-group flex flex-col">
						<label className='text-black-2 font-Poppins' >Designation</label>
						<input value={values.designation} onChange={handleChange} style={{border:"1px solid #E0E0E0"}} name='designation' className='px-3 py-4 mt-3'  type='text' placeholder='Desgination'  />
					</div>
					<div className="form-group flex flex-col">
						<label className='text-black-2 font-Poppins' >School Name</label>
						<input value={values.school_name} onChange={handleChange} name='school_name' style={{border:"1px solid #E0E0E0"}} className='px-3 py-4 mt-3'  type='text' placeholder='School Name' required />
					</div>
					<div className="form-group flex flex-col">
						<label className='text-black-2 font-Poppins' >Location</label>
						<input style={{border:"1px solid #E0E0E0"}} value={values.location} onChange={handleChange} name='location' className='px-3 py-4 mt-3'  type='text' placeholder='Location' required />
					</div>
					<div className="form-group flex flex-col">
						<label className='text-black-2 font-Poppins' >Date</label>
						<input style={{border:"1px solid #E0E0E0"}} value={values.date} onChange={handleChange}  name='date' className='px-3 py-4 mt-3'  type='date' placeholder='Date' required />
					</div>
					<div className="form-group flex flex-col">
						<label className='text-black-2 font-Poppins' >Time</label>
						<input style={{border:"1px solid #E0E0E0"}} value={values.time} onChange={handleChange}  name='time' type='time' className=' px-3 py-4 mt-3' placeholder='Time' required />
					</div>
					<div className="form-group flex flex-col">
						<label className='text-black-2 font-Poppins' >Number Of Students</label>
						<input style={{border:"1px solid #E0E0E0"}} value={values.number_of_students} onChange={handleChange}  name='number_of_students'  className='px-3 py-4  mt-3' type='number' placeholder='Number Of Students' required />
					</div>
				</form>
				<button onClick={handleSubmit} className='rounded-md px-5 py-4 my-8 bg-purple text-white font-semibold text-lg font-Poppins' >Enroll Now</button>
			</div> */}
		</div>
	</section>
	)
}

export default Component;
