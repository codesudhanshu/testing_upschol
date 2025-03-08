// import MissionIcon from "../../public/images/about-us/mission-icon.svg";
import MissionIcon from "../public/images/about-us/mission-icon.svg";

import VisionIcon from "../public/images/about-us/vision-icon.svg";
import AboutUsBG from "../public/images/about-us/page-bg.svg";
import Image from "next/image";
import { Col, Row, Typography } from "antd";

export default function AboutUs() {
	return (
		<main className="bg-background_color p-2">
			<div
				id="about-us"
				className="relative overflow-hidden w-full"
			>
				<div
					className="z-1 flex flex-col justify-center items-centerc container pb-12"
				>
					<div className="title mx-auto">
						<h3 className="text-primary text-center text-base font-Poppins font-semibold">
							About Us
						</h3>
						<h1
							className="text-center text-3xl font-Poppins font-semibold my-2 text-white"
						>
							Your Guide for the Right Path
						</h1>
						<p className="text-center text-base lg:text-lg px-8 lg:px-52 mt-4 text-secondary"
						>
							UpSchol, short for Upskilling with Scholarships, envisions education for all. It is the perfect platform for students, helping them discover the best online courses. With a base of 9+ million students annually enrolling in online programs, we aim to provide a clear path for students, offering not only the right education but also scholarships and placement assurance.
						</p>
					</div>
					<Row
						className="w-full mt-12"
						align={"top"}
						gutter={[16, 16]}
					>
						<Col
							xs={24}
							md={12}
							className="flex flex-col justify-center items-center px-2 lg:px-4 text-white"
						>
							<Image
								src={MissionIcon}
								alt="Mission Icon"
								quality={100}
							/>
							<h1
								className="text-3xl font-Poppins font-semibold text-center mt-4"
							>
								Our Mission
							</h1>
							<p className="text-center text-base lg:text-lg mt-4"
								
							>
								To offer correct information and guidance to those pursuing higher education online or seeking upskilling opportunities. We aim to reach every corner, making people aware of the benefits of online education and serving society through excellence, leadership, and scholarships for all.
							</p>
						</Col>
						<Col
							xs={24}
							md={12}
							className="flex flex-col justify-center items-center px-4 lg:px-6 text-white"
						>
							<Image
								src={VisionIcon}
								alt="Vision Icon"
								quality={100}
							/>
							<h1
								className="text-3xl font-Poppins font-semibold text-center mt-4"
							>
								Our Vision
							</h1>
							<p className="text-center text-base lg:text-lg mt-4"
								
							>
								To create a platform that guides individuals in making informed decisions about their higher education journey. We strive to simplify the online education landscape, making it accessible to all, including those facing financial constraints.
							</p>
						</Col>
					</Row>
				</div>
				<Image
					src={AboutUsBG}
					alt="About Us Background"
					quality={100}
					className="object-contain absolute z-0 bottom-0 right-0"
				/>
			</div>
		</main>
	);
}