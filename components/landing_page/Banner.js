import { Col, Row, Typography } from "antd";
import { useRouter } from "next/router";
import Image from "next/image";
import Link from 'next/link';
import Slider from "react-slick";
import CountUp from 'react-countup';
import BackgroundImage from '../../public/assets/landing-page/images/HomeBackground.png';
import Union from '../../public/assets/landing-page/images/Union.png';
import Course1SVG from "../../public/assets/landing-page/svgs/courses/1.svg";
import NextArrowSVG from "../../public/assets/landing-page/svgs/next-arrow.svg";
import Union2 from '../../public/assets/landing-page/images/Union_2.png';
import Group1 from '../../public/assets/landing-page/images/Group1.png';
import Group2 from '../../public/assets/landing-page/images/Group2.png';
import Group3 from '../../public/assets/landing-page/images/Group3.png';
import blurDataURL from '../../public/assets/landing-page/images/banner-student1.png';
import { getS3Url } from '../../lib/s3.js';
import { Mentors } from "./Mentor";

const getUniqueColleges = (tags = []) => {
	let seenColleges = {}; 
	const uniqueColleges = [];

	for (let tag of tags) {
		for (let i = 0; i < tag?.college.length; i++) {
			let college = tag.college[i];
			if (!seenColleges.hasOwnProperty(college._id.toString())) {
				seenColleges[college._id.toString()] = { ...tag, college: college };
				break;
			}
		}
	}

	for (let key in seenColleges) {
		if (seenColleges.hasOwnProperty(key)) {
			uniqueColleges.push({ data: seenColleges[key].college, tag_name: seenColleges[key].tag_name });
		}
	}

	return uniqueColleges;
};


export default function Banner({ pg_course, ug_course }) {
	const router = useRouter();

	const combinedCourses = [...pg_course, ...ug_course];
	const uniqueCourses = getUniqueColleges(combinedCourses);

	function TagCard({ tag }) {
		return (
			<>
				<div
					className="w-[90px] h-[100px] lg:w-[250px] lg:h-[150px]"
					style={{ borderRadius: '20px' }}

				>
					<Image
						className="w-[130px] lg:w-[250px] absolute h-[150px]"
						loader={({ src }) => getS3Url(src)}
						src={tag?.data?.banner_image?.path}
						width={250}
						height={150}
						alt={tag?.data?.college_name}
						style={{ borderRadius: '20px' }}
					/>
					<Link href={`/colleges/${tag?.data?.slug}`} style={{ textDecoration: 'none', color: 'inherit' }}>
						<div className="w-[65px] h-[100px] lg:w-[135px] lg:h-[150px] bg-white relative flex flex-col justify-center px-2 left-[85px] lg:left-[114px]" style={{ borderRadius: '20px' }}>
							<Image
								className="object-contain"
								loader={({ src }) => getS3Url(src)}
								src={tag?.data?.logo}
								width={25}
								height={22}
								alt={tag?.college_name}
							/>
							<p className="text-[10px] font-semibold mt-1">{tag?.data?.college_name}</p>
							<p className="text-[12px] font-semibold mt-1">{tag?.tag_name}</p>
							<Image
								alt="Next Arrow"
								src={NextArrowSVG}
								className="w-2 h-2 md:w-8 md:h-8 self-end absolute bottom-4 md:bottom-3"
								width={32}
								height={32}
							/>
						</div>
					</Link>
				</div>
			</>
		);
	}


	const settings = {
		dots: false,
		slidesToShow: 2,
		arrows: false,
		cssEase: "linear",
	};

	return (
		<div
			id="overview"
			className='w-full bg-background_color relative overflow-hidden'
			style={{
				minHeight: '75vh',
			}}
		>
			<Image
				src={BackgroundImage}
				alt=""
				className='w-full h-full'
				style={{
					position: 'absolute'
				}}
			/>
			<div
				className="container w-full h-full"
				style={{
					minHeight: 'inherit'
				}}
			>
				<Row
					gutter={[20, 20]}
					align={"stretch"}
					className="w-full h-full md:pb-0"
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
								className="text-[#FFFFFF] font-bold text-2xl md:text-5xl lg:6xl leading-relaxed leading-10 md:leading-none"
								style={{
									zIndex: 3
								}}
							>
								<span>Up Your</span> <span className="gradientText">Skills</span> To <span className="gradientText">Advance</span> Your <span className="gradientText">Career</span> Path
							</h1>
							<p
								className="text-[#FFFFFF] text-[14px] mt-4 "
								style={{
									zIndex: 3
								}}
							>
								A world of opportunities awaits you at Upschol: affordable courses, Top Tier Universities, Expert
								Guidance Counseling, and Dream scholarships. All of this at the click of your finger. At Upschol,
								we ensure that each step you take is toward a brighter and more secure future with our online
								programs. Choose your dream career now!<br></br><br></br>
							</p>
							<div
								className="flex items-center gap-2 2xl:gap-x-4 mt-4 flex-wrap xl:flex-nowrap"
							>
								<button
									className="bg-primary text-white px-2 2xl:px-5 py-3 rounded-md text-xs 2xl:text-lg font-semibold"
									onClick={() => {
										router.push('/colleges')
									}}
									style={{
										zIndex: 3,
									}}
								>
									Enroll Now
								</button>
								<button
									className="bg-transparent border text-white px-2 2xl:px-5 py-3 rounded-md text-xs 2xl:text-lg font-semibold"
									onClick={() => {
										router.push('/colleges')
									}}
									style={{
										zIndex: 3,
									}}
								>
									Explore Colleges
								</button>
								<Mentors />
							</div>
							<div>
							</div>
							<div
								className="mt-6 max-w-[515px]"
							>
								<h2
									className="text-[#FFFFFF] font-bold text-xs md:text-3xl lg:4xl leading-relaxed leading-10 md:leading-none"
									style={{
										zIndex: 3
									}}
								>
									Popular Course
								</h2>
								<Slider
									{...settings}
									className="flex gap-[10px] mt-5"
								>
									{uniqueCourses.map((tag, index) => (
										<TagCard tag={tag} key={index} />
									))}
								</Slider>
							</div>
						</div>
					</Col>
					<Col
						xs={{
							order: 1,
							span: 24
						}}
						md={{
							order: 2,
							span: 12
						}}
					>
						<div
							className="w-full h-full relative flex h-[30vh] md:h-[100%] mt-4 md:mt-0"
						>
							<Image
								src={blurDataURL}
								alt={'student'}
								style={{
									maxHeight: '95%',
									maxWidth: '100%',
									zIndex: 4,
									objectFit: 'contain',
									alignSelf: 'center'
								}}
								width={512}
								height={512}
								loading="lazy"
								placeholder="blur"
								className="lg:absolute  right-10 object-contain"
							/>
							<div
								className="top-1/2 transform -translate-y-1/2 rounded-xl p-3 absolute left-0 lg:left-0 md:left-[-10%] sm:[-10%] flex items-center justify-center gap-x-3 w-[160px] h-[60px] 2xl:w-[200px] 2xl:h-[70px]"
								style={{
									zIndex: 5,
								}}
							>
								<Image
									src={Union2}
									alt=""
									className="w-full h-full absolute"

								/>
								<Image
									src={Group1}
									alt={'course'}
									width={64}
									height={64}
									className="object-contain h-6 w-6 md:h-10 md:w-10 z-10"
								/>
								<div
									className="w-1/2 z-10"
								>
									<h3
										className="text-[#FFFFFF] font-semibold text-xs 2xl:text-lg"
									>
										<CountUp
											start={0}
											end={50}
											suffix="+"
											duration={5}
										/>
									</h3>
									<p
										className="text-[#FFFFFF] text-[11px] 2xl:text-sm"
									>
										Global universities
									</p>
								</div>
							</div>
							<div
								className="top-1/4 transform -translate-y-1/2 rounded-xl p-3  absolute right-[-10%] md:right-[-5%] 2xl:right-[-15%]   flex items-center justify-center gap-x-3 w-[160px] h-[60px] 2xl:w-[200px] 2xl:h-[70px]"
								style={{
									zIndex: 5,
								}}
							>
								<Image
									src={Union}
									alt=""
									className="w-full h-full absolute z-0"
								/>
								<Image
									src={Group2}
									alt={'colleges'}
									width={64}
									height={64}
									loading="lazy"
									className="object-contain h-6 w-6 md:h-10 md:w-10 z-10"
								/>
								<div
									className="w-1/2 z-10"
								>
									<h3
										className="text-[#FFFFFF] font-semibold text-xs 2xl:text-lg"
									>
										<CountUp
											start={0}
											end={10}
											suffix=",000+"
											duration={5}
										/>
									</h3>
									<p
										className="text-[#FFFFFF] text-[11px] 2xl:text-sm"
									>
										Trusted Students
									</p>
								</div>
							</div>
							<div
								className="top-2/3 rounded-xl p-3  absolute right-[-10%] 2xl:right-[-13%] md:right-[-2%]  flex items-center  justify-center gap-x-3 w-[140px] 2xl:w-[220px] h-[60px] 2xl:h-[80px]"
								style={{
									zIndex: 5,
								}}
							>
								<Image
									src={Union}
									alt=""
									className="w-full h-full absolute"
								/>
								<Image
									src={Group3}
									alt={'tutor'}
									width={64}
									height={64}
									className="object-contain h-6 w-6 md:h-10 md:w-10 z-10"
								/>
								<div
									className="w-1/2 z-10"
								>
									<h3
										className="text-[#FFFFFF] font-semibold text-xs 2xl:text-lg"
									>
										<CountUp
											start={0}
											end={6}
											suffix=",000+"
											duration={5}
										/>
									</h3>
									<p
										className="text-[#FFFFFF] text-[11px] 2xl:text-sm"
									>
										Scholarships Availed
									</p>

								</div>
							</div>
						</div>
					</Col>
				</Row>
			</div>
			{/* <Image
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
			/> */}
		</div>
	)
}