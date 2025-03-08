import { Button, Checkbox, Col, Row, Typography } from "antd";
import { useRouter } from "next/router";
import Image from "next/image";
import BGLeftSVG from "../public/assets/landing-page/svgs/bg-left.svg";
import BGRightSVG from "../public/assets/landing-page/svgs/bg-right.svg";
import SteponeIcon from '../public/File.svg'
import SteptwoIcon from '../public/Group.svg'
import StepthreeIcon from '../public/wallet.svg'
import React, { useState } from 'react'
import { TagCategories } from "../config";
import Tag from "../model/tags";
import collegeModel from "../model/collegeModel";
import blogModel from "../model/blogModel";
const Promise = require("promise");
import dbConnect from "../dbConnect";
import { FaChevronRight, FaMinus, FaPlus } from "react-icons/fa6";
import Link from "next/link";
import Scholarship from "../components/landing_page/Scholarship";

export async function getServerSideProps({ req, query, resolvedUrl }) {
	await dbConnect();

	async function countColleges(tags) {
		let newTags = [];
		for (let i = 0; i < tags.length; i++) {
			let count = await collegeModel.countDocuments({ tags: tags[i]._id, hidecollege: true });
			newTags.push({ ...tags[i]._doc, collegeCount: count })
		}
		return newTags;
	}

	const blogs = await blogModel.find({}).limit(3);

	let [tag1, tag2, tag3, tag4, tag5, tag6, tag7, tag8] = await Promise.all([
		Tag.find({ tag_category: TagCategories[0] }),
		Tag.find({ tag_category: TagCategories[1] }),
		Tag.find({ tag_category: TagCategories[2] }),
		Tag.find({ tag_category: TagCategories[3] }),
		Tag.find({ tag_category: TagCategories[4] }),
		Tag.find({ tag_category: TagCategories[5] }),
		Tag.find({ tag_category: TagCategories[6] }),
		Tag.find({ tag_category: TagCategories[7] }),
	]);

	tag1 = await countColleges(tag1);
	tag2 = await countColleges(tag2);
	tag3 = await countColleges(tag3);
	tag4 = await countColleges(tag4);
	tag5 = await countColleges(tag5);
	tag6 = await countColleges(tag6);
	tag7 = await countColleges(tag7);
	tag8 = await countColleges(tag8);

	const obj = {
		[TagCategories[0]]: tag1,
		[TagCategories[1]]: tag2,
		[TagCategories[2]]: tag3,
		[TagCategories[3]]: tag4,
		[TagCategories[4]]: tag5,
		[TagCategories[5]]: tag6,
		[TagCategories[6]]: tag7,
		[TagCategories[7]]: tag8
	};
	return {
		props: {
			tags: JSON.parse(JSON.stringify(obj)),
			blogs: JSON.parse(JSON.stringify(blogs))
		},
	};
}

const Page = (props) => {
	const steps = [
		{
			heading: "Step 1",
			icon: SteponeIcon,
			desc: "Submitting the Application Form and Paying the First Semester Fee or Full fees.(Either by You, or by no cost emi or loan provided by University Authorized loan partners). Complete the application form and submit it on the University's website. Make the necessary payment for the entire first semester or full course through the secure payment portal on the University's website."
		},
		{
			heading: "Step 2",
			icon: SteptwoIcon,
			desc: "Document Verification and Admission Confirmation. After submitting the application and fee, complete the document verification process with the University. Upon successful document verification, you will receive an official admission confirmation from the University.",
		},
		{
			heading: "Step 3",
			icon: StepthreeIcon,
			desc: "Document Verification and Admission Confirmation. After submitting the application and fee, complete the document verification process with the University. Upon successful document verification, you will receive an official admission confirmation from the University."
		},

	]

	const router = useRouter();

	return (
		<>
			<section
				id="overview"
				className='w-screen bg-[#f2f9fd] relative overflow-hidden min-h-[78vh] md:min-h-[90vh]'
				style={{
					boxShadow: 'inset 0px 10px 18px #e6e5ff',
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
									className="text-[#101828] font-bold text-2xl md:text-6xl lg:6xl leading-relaxed leading-10 md:leading-none"
									style={{
										zIndex: 3,
										lineHeight: 1.2
									}}
								>

									Easily find <span className="text-[#7F56D9]">scholarships</span> That <span className="text-[#7F56D9]">Fit You</span>
								</h1>
								<p
									className="text-[#646464] text-md md:text-lg mt-4"
									style={{
										zIndex: 3,
									}}
								>
									Unlock your academic potential with our university scholarship, offering financial aid and support for exceptional students striving for excellence.
								</p>
								<div
									className="flex items-center gap-x-4 mt-4"
								>
									<button
										className="bg-[#7F56D9] text-white px-5 py-3 rounded-md  md:text-lg font-semibold"
										onClick={() => {
											router.push('/colleges')
										}}
										style={{
											zIndex: 3,
										}}
									>
										FIND SCHOLARSHIPS NOW
									</button>
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
									src={'/Group 35979.png'}
									alt={'student'}
									style={{
										maxHeight: '100%',
										maxWidth: '100%',
										zIndex: 4
									}}
									width={1000}
									height={1000}
									loading="lazy"
									placeholder="blur"
									blurDataURL="/Group 35979.png"
									className="lg:absolute object-contain"
								/>
							</div>
						</Col>
					</Row>
				</div>
				<Image
					src={BGLeftSVG}
					alt={'bg-left'}
					width={1024}
					height={1024}
					className="absolute bottom-0 left-0 w-2/3"
					style={{
						zIndex: 2,
					}}
				/>
				<Image
					src={BGRightSVG}
					alt={'bg-right'}
					width={512}
					height={512}
					className="absolute top-0 right-0 w-1/4"
					style={{
						zIndex: 2,
					}}
				/>
			</section>
			<div className="flex pt-16 px-4 sm:px-16 justify-center items-center flex-col gap-4" >
				<span className="text-[#6941C6] font-semibold text-lg" >Scholarship</span>
				<h1 className="text-center font-bold text-4xl" >University Scholarship</h1>
				<p className="font-normal text-[#667085] text-center text-[16px]" >Unlock your academic potential with our university scholarship, offering financial<br /> aid and support for exceptional students striving for excellence.</p>
				<div className="flex justify-center flex-col items-center md:flex-row gap-6 mt-6">
					<div className="w-1/3 lg:w-1/2" >
						<Image
							responsive
							className="md:mx-auto w-[300px] lg:w-[400px]"
							style={{
								maxHeight: '95%',
								maxWidth: '100%',
								zIndex: 4
							}}
							width={400}
							height={200}
							alt="stdent"
							src={'/Student.png'}
						/>
					</div>
					<div className="flex flex-col w-full lg:w-1/2" >
						{steps.map((e, i) =>
							<div className="flex p-4 gap-8" key={i} >
								<div className="self-start" >
									<Image style={{ minHeight: 40, minWidth: 40 }} responsive src={e.icon} width={50} height={50} alt="step icon" />
								</div>
								<div className="flex flex-col">
									<Typography.Title level={2}>
										{e.heading} :
									</Typography.Title>
									<p className="text-[#667085] font-medium" >{e.desc}</p>
								</div>

							</div>
						)}
					</div>
				</div>
			</div>
			{/*Scholarship form section */}
			<Scholarship categories={TagCategories} tags={props.tags} landdingPage={false} />
		</>
	)
}

export default Page
