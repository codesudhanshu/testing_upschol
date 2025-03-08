import React, { useEffect, useState } from "react";
import Course1SVG from "../../public/assets/landing-page/svgs/courses/1.svg";
import Course2SVG from "../../public/assets/landing-page/svgs/courses/2.svg";
import Course3SVG from "../../public/assets/landing-page/svgs/courses/3.svg";
import Course4SVG from "../../public/assets/landing-page/svgs/courses/4.svg";
import NextArrowSVG from "../../public/assets/landing-page/svgs/next-arrow.svg";
import { useRouter } from "next/router";
import { Col, Row } from "antd";
import { FaArrowRightLong } from "react-icons/fa6";
import Image from "next/image";

const Courses = ({ categories, tags, isMobile }) => {
	const router = useRouter();
	const exceptions = ['UG', 'PG'];
	const [isExpanded, setIsExpanded] = useState(false);
	const [selectedCategory, setSelectedCategory] = useState("All Courses");
	const allTags = Object.values(tags).flat();

	
	function transformText(text) {
		const words = text.split(' ');
		const capitalizedWords = words.map(word => {
			if (exceptions.includes(word.toUpperCase())) {
				return word.toUpperCase();
			} else {
				return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
			}
		});
		return capitalizedWords.join(' ');
	}

	function TagCard({
		tag,
		index
	}) {
		return (
			<div
				onClick={() => router.push(`/colleges?tagId=${tag._id}`)}
				className="p-3 min-h-[220px] md:h-full rounded-lg flex flex-col justify-center border-2 border-white bg-white hover:shadow-lg shadow-[#FFF0CA] cursor-pointer transition-all duration-300 hover:scale-105"
			>
				<div
					className="w-full h-1/3 flex justify-between"
				>
					<div
						className="w-1/3 md:w-1/2 h-full flex relative"
					>
						{/* <div
							className="rounded-full h-8 w-8 md:h-24 md:w-24 bg-[#FFF0CA66]"
						/> */}
						{
							index % 4 === 0 && (
								<Image
									alt="Tag Icon"
									src={Course1SVG}
									className="absolute w-4 h-4 md:w-10 md:h-10"
									width={96}
									height={96}
								/>
							)
						}
						{
							index % 4 === 1 && (
								<Image
									alt="Tag Icon"
									src={Course2SVG}
									className="absolute  w-6 h-6 md:w-10 md:h-10"
									width={96}
									height={96}
								/>
							)
						}
						{
							index % 4 === 2 && (
								<Image
									alt="Tag Icon"
									src={Course3SVG}
									className="absolute  w-6 h-6 md:w-10 md:h-10"
									width={96}
									height={96}
								/>
							)
						}
						{
							index % 4 === 3 && (
								<Image
									alt="Tag Icon"
									src={Course4SVG}
									className="absolute w-6 h-6 md:w-10 md:h-10"
									width={96}
									height={96}
								/>
							)
						}
					</div>
					<p
						className="rounded-full px-2 md:px-4 py-1 bg-secondary h-fit text-[10px] md:text-md"
					>
						{tag?.duration} {tag?.duration_unit}
					</p>
				</div>
				<div
					className="w-full h-1/2 flex flex-col justify-evenly pt-2"
				>
					<p
						className="text-xs md:text-base text-primary"
					>
						{tag?.collegeCount} Colleges
					</p>
					<h3
						className="text-xs md:text-sm font-semibold text-[#101828]"
					>
						{tag?.tag_name}
					</h3>
					<Image
						alt="Next Arrow"
						src={NextArrowSVG}
						className="w-4 h-4 md:w-8 md:h-8 self-end mb-2 bottom-0 absolute"
						width={32}
						height={32}
					/>
				</div>
			</div>
		)
	}

	return (
		<section id="tabSection" className="my-8 2xl:my-12 w-full z-10 relative">
			<div className="container mx-auto flex flex-col items-center">
				<div className="title mx-auto">
					<h1 className="text-center mt-4 ">
						<span className="text-center text-xl md:text-3xl font-Poppins font-semibold	gradientText">
							Fostering a playful & engaging learning environment
						</span>
					</h1>
				</div>
				<div
					className="w-full mt-4 lg:mt-8"
				>
					<div
						className="courses flex items-center gap-x-6 md:gap-x-12 lg:gap-x-16 justify-between overflow-x-auto "
					>
						<div
							className="flex-shrink-0 grow-0"
						>
							<div
								className="flex flex items-center justify-center px-4 py-2 rounded-lg cursor-pointer"
								onClick={() => {
									setSelectedCategory("All Courses");
								}}
								style={{
									backgroundColor: selectedCategory === "All Courses" ? "white" : "transparent",
								}}
							>
								<p
									className={`font-medium text-md md:text-lg text-${selectedCategory === "All Courses" ? 'primary' : 'white'}`}
								>
									All Courses
								</p>
							</div>
						</div>
						{
							categories?.map((category, index) => (
								<div
									key={category}
									className="flex-shrink-0 grow-0"
								>
									<div
										className="flex  items-center justify-center px-4 py-2 rounded-lg cursor-pointer"
										onClick={() => {
											setSelectedCategory(category);
										}}
										style={{
											backgroundColor: selectedCategory === category ? "white" : "transparent",
										}}
									>
										<p
											className={`font-medium text-md md:text-lg block text-${selectedCategory === category ? "primary" : "white"}`}
										>
											{transformText(category)}
										</p>
									</div>
								</div>
							))
						}
					</div>
				</div>
				<div
					className="w-full mt-6"
				>
					<Row gutter={[16, 16]}>
						{selectedCategory !== "All Courses"
							? (isExpanded
								? tags[selectedCategory]?.map((tag, index) => (
									<Col key={tag?._id} xs={8} sm={8} md={8} lg={4}>
										<TagCard tag={tag} index={index} />
									</Col>
								))
								: tags[selectedCategory]?.slice(0, isMobile ? 4 : 8).map((tag, index) => (
									<Col key={tag?._id} xs={8} sm={8} md={8} lg={4}>
										<TagCard tag={tag} index={index} />
									</Col>
								))
							)
							: (isExpanded
								? allTags?.map((tag, index) => (
									<Col key={tag?._id} xs={8} sm={8} md={8} lg={4}>
										<TagCard tag={tag} index={index} />
									</Col>
								))
								: allTags?.slice(0, isMobile ? 4 : 8).map((tag, index) => (
									<Col key={tag?._id} xs={8} sm={8} md={8} lg={4}>
										<TagCard tag={tag} index={index} />
									</Col>
								))
							)}
					</Row>
					{
						(selectedCategory !== "All Courses" ? tags[selectedCategory]?.length : allTags?.length) > (isMobile ? 3 : 8) && (
							<div
								className="flex items-center justify-center mt-8"
							>
								<button
									className="px-4 py-2 rounded-lg border-2 border-white hover:shadow-lg shadow-[#FFBA08] cursor-pointer transition-all duration-300 hover:scale-105 flex items-center justify-center gap-x-2"
									onClick={() => setIsExpanded(!isExpanded)}
								>
									{
										isExpanded ? (
											<p
												className="text-base md:text-lg font-medium text-white"
											>
												View Less
											</p>
										) : (
											<p
												className="text-base md:text-lg font-medium text-white"
											>
												View More
											</p>
										)
									}
									<FaArrowRightLong
										className="text-white text-base md:text-lg"
									/>
								</button>
							</div>
						)
					}

				</div>
			</div>
		</section >
	);
};

export default Courses;
