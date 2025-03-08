import Image from "next/image";
import IIMa from '../../public/IIM,_Ahmedabad_Logo.svg.png'
import Amity from '../../public/images.png'
import OPJINDAL from '../../public/O._P._Jindal_Global_University_Logo.png'
import IMT from '../../public/imt-ghaziabad.jpg'
import CU from '../../public/chandigarh-university.png'
import DY from '../../public/dy-patil.png'
import JU from '../../public/jain-university.png'
import LPU from '../../public/images (3).png'
import SU from '../../public/shoolini.png'
import NMIMS from '../../public/images (4).png'
import LIVERPOOL from '../../public/liverpool-john-moores-university-logo.webp'
import GOLDEN from '../../public/online-golden-gate-logo.webp'
import DEAKIN from '../../public/image-20231114-142600.png'
import { FaArrowRightLong } from "react-icons/fa6";
import { Card, Col, List, Row } from "antd";
import { useState } from "react";
import { useRouter } from "next/router";
import IIMC from '../../public/iimc.png';
import IIM from '../../public/iim.png';
import IIMA from '../../public/iima.png';
import IIMR from '../../public/iimr.png';
import IIMU from '../../public/iimu.png';
import IITG from '../../public/iitg.png';
import IITR from '../../public/iitr.png';
import { getS3Url } from "../../lib/s3";
import Link from "next/link";

export default function Partners({ college }) {
	const router = useRouter();
	const [isExpanded, setIsExpanded] = useState(false);
	const features = [
		{
			title: "Online Courses from Experts",
			desc: "Explore a world of knowledge with online courses crafted by industry-leading experts. Learn from the best and elevate your skills to new heights. Dive into specialized subjects and gain insights directly from seasoned professionals"
		},
		{
			title: "Over 500+High Quality Topics",
			desc: "Explore a world of knowledge with online courses crafted by industry-leading experts. Learn from the best and elevate your skills to new heights. Dive into specialized subjects and gain insights directly from seasoned professionals"
		},
		{
			title: "Occasional Video Updates",
			desc: "Explore a world of knowledge with online courses crafted by industry-leading experts. Learn from the best and elevate your skills to new heights. Dive into specialized subjects and gain insights directly from seasoned professionals"
		}
	];
	return (
		<section className="py-12" id="our-partners-landing-page">

			<div className="flex flex-col justify-around container">
				<div>
					<p className="title">
						<span>
							OUR
						</span>
						<span className="partners">
							PARTNERS
						</span>
					</p>

					<div className="title mx-auto">
						<h1 className="text-center text-xl md:text-3xl font-Poppins font-semibold	gradientText">
							Partner Universities & EdTech Companies
						</h1>
					</div>
					<p
						className="text-center text-lg mt-4 text-white my-3"
					>
						Upskill your potential with premium institutes nationwide and top pioneers of ED Tech organizations and level yourself up.
					</p>
				</div>
				<List
					grid={{
						gutter: 12,
						xs: 3,
						sm: 4,
						md: 5,
						lg: 6,
						xl: 6,
						xxl: 6,
					}}
					style={{
						marginTop: "20px",
					}}
					className="partners-list"
					dataSource={
						isExpanded ? college : college.slice(0, 18)
					}
					renderItem={(item, index) => (
						<List.Item>
							<Card
								className="partners-card relative"
								key={index}
								hoverable
								style={{
									borderRadius: "8px",
									height: '125px',
									overflow: 'hidden',
									display: 'flex',
									justifyContent: 'center',
									alignItems: 'center',

								}}
								bodyStyle={{
									padding: "10px 20px 10px 20px",
									maxHeight: '100%'
								}}
							>
								<Link href={`/colleges/${item.slug}`}>
									<Image
										fill
										key={item?._id}
										loader={({ src }) => getS3Url(src)}
										src={item?.logo}
										alt={item?.college_name}
										style={{
											objectFit: 'contain',
											paddingLeft: "16px",
											paddingRight: "16px",
											paddingTop: "28px",
											paddingBottom: "28px"
										}}
									/>
								</Link>
							</Card>
						</List.Item>
					)}
				/>
				{
					college.length > 18 && (
						<div
							className="flex items-center justify-center mt-8"
						>
							<button
								className="px-4 py-2 rounded-lg border-2 border-white hover:shadow-lg shadow-white cursor-pointer transition-all duration-300 hover:scale-105 flex items-center justify-center gap-x-2"
								onClick={() => setIsExpanded(!isExpanded)}
							>
								{
									isExpanded ? (
										<p
											className="text-lg font-medium text-white"
										>
											Show Less
										</p>
									) : (
										<p
											className="text-lg font-medium text-white"
										>
											Show More
										</p>
									)
								}
								<FaArrowRightLong
									className="text-white text-lg"
								/>
							</button>
						</div>
					)
				}

			</div>
		</section>
	)
}