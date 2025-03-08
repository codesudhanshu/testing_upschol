import Slider from "react-slick";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import Image from "next/image";
import { useState, useEffect } from "react";
import { _fetch } from "../../_fetch";
import { getS3Url } from "../../lib/s3";

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

export default function InternationCollaborators() {

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

	return (
		<section
			className="w-full pt-12 pb-7 overflow-hidden"
			id="global-partners-landing-page"
		>
			<div
				className="container w-full"
			>
				<p className="title">
					<span className="global">
						GLOBAL
					</span>
					<span className="partners">
						PARTNERS
					</span>
				</p>
				<div className="title mx-auto">
					<h1 className="text-center text-xl md:text-3xl font-Poppins font-semibold	gradientText ">
						Get Set, Go abroad!
					</h1>
				</div>
				<p
					className="text-center text-base md:text-lg mt-4 text-white"
				>
					UPschol&apos;s International Studies offers a dynamic learning experience, providing a passport to global education. Hurry, gain a global perspective for high pay-scale opportunities. Ready to broaden your horizons? Get set for exploration with UPschol&apos;s International Studies!
				</p>
				<div
					className="w-full mt-8"
				>
					<Slider
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
							collegedata?.length && collegedata?.map((item, index) => (
								<div
									key={index}
									className="px-4 lg:px-8 h-[450px]"
								>
									<div
										className="h-3/4 w-full bg-white border-2 border-[#D8D8D8] rounded-3xl overflow-hidden flex flex-col p-4"
									>
										<div
											className="h-1/2 w-full border-b-2 border-[#D8D8D8] flex flex-col items-center justify-center"
										>
											<Image
												loader={({ src }) => getS3Url(src)}
												src={item?.logo}
												alt={item?.college_name}
												className="h-2/3 mx-auto object-contain"
												width={512}
												height={512}
											/>
											<p
												className="text-center text-[#646464] text-sm mt-2"
											>
												{item?.college_name}
											</p>
										</div>
										<div
											className="h-1/2 w-full flex flex-col items-center justify-around"
										>
											<p
												className="text-center text-[#646464] text-sm"
											>
												Rating : {item?.rating}
											</p>
											<h3
												className="text-center text-primary text-xl lg:text-2xl font-bold"
											>
												₹{item?.fees[0]?.annual_fees}/ per year
											</h3>
										</div>
									</div>
								</div>
							))
						}
					</Slider>
				</div>
			</div>
		</section>
	)
}