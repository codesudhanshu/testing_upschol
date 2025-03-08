import Image from "next/image";
import partner1 from "../../public/company-logos/accenture1.png"
import partner2 from "../../public/company-logos/aditya-birla-group1.png"
import partner3 from "../../public/company-logos/airtel1.png"
import partner4 from "../../public/company-logos/amazon1.png"
import partner5 from "../../public/company-logos/apple1.png"
import partner6 from "../../public/company-logos/BCG1.png"
import partner7 from "../../public/company-logos/coco-cola1.png"
import partner8 from "../../public/company-logos/dell1.png"
import partner9 from "../../public/company-logos/delloite1.png"
import partner10 from "../../public/company-logos/E&Y1.png"
import partner11 from "../../public/company-logos/flipkart1.png"
import partner12 from "../../public/company-logos/google1.png"
import partner13 from "../../public/company-logos/HUL1.png"
import partner14 from "../../public/company-logos/infosys1.png"
import partner15 from "../../public/company-logos/l&t1.png"
import partner16 from "../../public/company-logos/mahindra1.png"
import partner17 from "../../public/company-logos/mckinsey1.png"
import partner18 from "../../public/company-logos/microsoft1.png"
import partner19 from "../../public/company-logos/reliance1.png"
import partner20 from "../../public/company-logos/tcs1.png"
import partner21 from "../../public/company-logos/wipro1.png"
import Slider from "react-slick";
import CreativeThinkingSVG from "../../public/assets/landing-page/svgs/creative-thinking.svg";
import CareerOrientedSVG from "../../public/assets/landing-page/svgs/career-oriented.svg";
import PublicSpeakingSVG from "../../public/assets/landing-page/svgs/public-speaking.svg";
import OnlineTutoringSVG from "../../public/assets/landing-page/svgs/online-tutoring.svg";

export default function FeatureOverview() {
	const settings = {
		dots: false,
		infinite: true,
		slidesToShow: 7,
		slidesToScroll: 1,
		arrows: false,
		autoplay: true,
		speed: 2000,
		autoplaySpeed: 1000,
		cssEase: "linear",
		responsive: [
			{
				breakpoint: 600,
				settings: {
					dots: false,
					infinite: true,
					slidesToShow: 3,
					slidesToScroll: 1,
					autoplay: true,
					cssEase: "linear",
				}
			}
		],
	};
	const partners = [
		{
			src: partner1
		},
		{
			src: partner2
		},
		{
			src: partner3
		},
		{
			src: partner4
		},
		{
			src: partner5
		},
		{
			src: partner6
		},
		{
			src: partner7
		},
		{
			src: partner8
		},
		{
			src: partner9
		},
		{
			src: partner10
		},
		{
			src: partner11
		},
		{
			src: partner12
		},
		{
			src: partner13
		},
		{
			src: partner14
		},
		{
			src: partner15
		},
		{
			src: partner16
		},
		{
			src: partner17
		},
		{
			src: partner18
		},
		{
			src: partner19
		},
		{
			src: partner20
		},
		{
			src: partner21
		}
	];

	const features = [
		{
			svg: OnlineTutoringSVG,
			title: "Affordable Online Learning",
			content: "Who said online learning degree programs must be expensive? Our online courses cater to everyone."
		},
		{
			svg: PublicSpeakingSVG,
			title: "Field-Expert Counselors",
			content: "Our efficient counsellors are on their toes to guide you toward the best recommendations for your online degree journey."
		},
		{
			svg: CareerOrientedSVG,
			title: "Job-ready Courses",
			content: "Our online courses equip you to excel in the field of your dreams."
		},
		{
			svg: CreativeThinkingSVG,
			title: "Dynamic Placement Support",
			content: "Our team is always ready to align you with the best possible placement services with a continuous support system, especially for our online MBA graduates."
		}
	];

	return (
		<div className="w-full overflow-hidden" >
			<div
				className="w-full container"
				style={{
					minHeight: '12vh'
				}}
			>
				<div
					className="w-full flex flex-col sm:gap-x-0 flex-wrap grid grid-cols-2 md:grid-cols-4 mt-5 gap-y-4"
				>
					{
						features?.map((feature, index) => (
							<div key={`${feature.title}${index}`} className="flex">
								<div
									key={index}
									className="md:w-1/3 justify-start flex items-start "
								>
									<Image
										src={feature.svg}
										alt="Feature Image"
										className="h-8 w-8 md:h-12 md:w-12"
									/>

								</div>
								<div className="flex flex-col ">
									<p
										className="mx-2 px-2 text-[13px] md:text-[14px] text-white"
									>
										{feature.title}
									</p>
									<p
										className="hidden md:flex  mx-2 text-[13px] md:text-[14px] text-white px-2"
									>
										{feature.content}
									</p>
								</div>
							</div>
						))
					}
				</div>
			</div>

			<div
				className="w-full mt-8 lg:mt-16"
			>
				<div
					className="w-full"
				>
					<p
						className="mx-4 text-white font-semibold text-xl md:text-2xl text-center"
					>
						{`Our alumnae's associated with some global leading companies`}
					</p>
					<Slider {...settings} className="h-full py-2 flex flex-row items-center justify-between">
						{
							partners.map((partner, index) => {
								return (
									<div
										key={index}
										className="flex-shrink-0 grow-0 px-2 md:px-0"
										style={{ border: '1px solid black' }}
									>

										<Image
											src={partner.src}
											alt='Partner Image'
											className="h-40 w-20 object-contain mx-4 max-h-full"
											priority={true}
										/>
									</div>
								)
							})
						}
					</Slider>
				</div>
			</div>
		</div>

	)
}