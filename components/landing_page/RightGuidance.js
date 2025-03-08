import Slider from "react-slick";
import { FaStar, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import Image from "next/image";
import sanjana from "../../public/experts/sanjana.jpg"
import simran from "../../public/experts/simran.jpg"
import yash from "../../public/experts/yash.jpg"
import rubbal from "../../public/experts/rubbal.jpg"
import trishna from "../../public/experts/trishna.jpg"
import rohan from "../../public/experts/rohan.jpg"
import { useRouter } from 'next/router';

function ImageCard({
	imageLink = "",
	name = "",
	rating = 0,
	experience = 0,
	counsellingNumber = 0,
	onConsultClick = () => { },
	designation = "",
	course = ""
}) {

	const router = useRouter();

	const handleChatClick = () => {
		const whatsappUrl = 'https://wa.me/+919810800223?text=Hello%20I%20would%20like%20to%20connect%20with%20you%21';
		router.push(whatsappUrl);
	};

	return (
		<div
			className="px-4 lg:px-8 h-[500px]"
		>
			<div
				className="h-full w-full rounded-xl overflow-hidden flex flex-col pb-4 md:pb-0"
				style={{ background: '#583c96', borderTopRightRadius: '20px' }}
			>
				<div className="relative h-[280px]">
					<Image
						src={imageLink}
						alt="Feature Image"
						className="w-full h-64 object-cover object-top"
						style={{ borderTopRightRadius: '20px', borderBottomRightRadius: '20px' }}
					/>
					<p
						className="absolute top-2 right-2 bg-white px-2 py-2 rounded text-primary bg-[#F4EBFF] text-xs md:text-md"
					>
						{experience} Years experience
					</p>
					<p
						className="flex absolute top-2 left-2 bg-white px-3 py-2 rounded text-[#1DA767] bg-[#F4EBFF] text-xs md:text-md gap-2"
					>
						<span className="self-center">Live</span>
						<span className="blinking-dot"></span>

					</p>

				</div>

				<div
					className="flex flex-col justify-between h-2/5 p-3"
				>
					<div
						className="flex justify-between items-center"
					>
						<h5
							className="text-black font-semibold text-base text-white"
						>
							{name}
						</h5>
						<div
							className="flex gap-x-2 items-center px-3 py-1 rounded bg-secondary"
						>
							<FaStar
								className="text-[#F8B84E]"
							/>

							<p
								className="text-primary"
							>
								{rating}
							</p>
						</div>
					</div>
					<p
						className="text-white"
					>
						{designation}
					</p>
					<p
						className="text-black flex items-center gap-x-2 text-white mt-1"
					>
						<strong >
							{counsellingNumber}+
						</strong>
						Counselling
					</p>
				</div>
				<div className="flex flex-col items-center mt-3 mb-4">
					<button
						className="viewmore justify-center bg-[white] text-white py-2 rounded-md md:text-lg font-semibold w-4/5"
						onClick={handleChatClick}
						style={{
							zIndex: 3,
							color: '#583c96'
						}}
					>
						Connect Now
					</button>
					<button
						className="viewmore justify-center bg-[white] text-white py-2 rounded-md md:text-lg font-semibold w-4/5 mt-2"
						onClick={handleChatClick}
						style={{
							zIndex: 3,
							color: '#583c96'
						}}
					>
						Book a Free Counselling
					</button>
				</div>
			</div>
		</div>
	)
}

function PrevArrow(props) {
	const { onClick } = props;
	return (
		<div
			className="absolute top-1/2 left-0 transform -translate-y-1/2 cursor-pointer z-10 rounded-full bg-white p-3"
			onClick={onClick}
		>
			<FaChevronLeft
				size={20}
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
				size={20}
				color={"black"}
			/>
		</div>
	)
}


export default function RightGuidance() {
	const data = [
		{
			imageLink: simran,
			name: "Mrs. Simran Garg",
			rating: 4.5,
			experience: 4.0,
			counsellingNumber: 2347,
			onConsultClick: () => { },
			designation: "Sr. Mentor (PG)",
			course: "M.Com"
		},
		{
			imageLink: yash,
			name: "Yash Jadoun",
			rating: 4.0,
			experience: 2.5,
			counsellingNumber: 1578,
			onConsultClick: () => { },
			designation: "Mentor PG",
			course: "M.Com"
		},
		{
			imageLink: sanjana,
			name: "Ms. Sanjana Maan",
			rating: 4.5,
			experience: 3.5,
			counsellingNumber: 2165,
			onConsultClick: () => { },
			designation: "Sr. Mentor MBA",
			course: "M.Com"
		},
		{
			imageLink: rubbal,
			name: "Rubal",
			rating: 4.0,
			experience: 2.5,
			counsellingNumber: 1635,
			onConsultClick: () => { },
			designation: "Mentor (MCA)",
			course: "M.Com"
		},
		{
			imageLink: trishna,
			name: "Trishna",
			rating: 4.0,
			experience: 2.5,
			counsellingNumber: '1500+',
			onConsultClick: () => { },
			designation: "Academic counsellor",
			course: "M.Com"
		},
		{
			imageLink: rohan,
			name: "Rohan",
			rating: 4.6,
			experience: '3+',
			counsellingNumber: 1635,
			onConsultClick: () => { },
			designation: " Senior academic counselor",
			course: "M.Com"
		}
	];
	return (
		<section
			id="right-guidance"
			className="bg-[#121421] py-8 lg:py-12 px-2 lg:px-4 w-full overflow-hidden"
		>
			<div
				className="container"
			>
				<div>
					<p className="title">
						<span className="student">STUDENT</span>
						<span className="support">SUPPORT SYSTEM</span>
					</p>
					<style jsx>{`
        .title {
          text-align: center;
          font-family: 'Poppins', sans-serif;
          font-weight: 700;
          font-size: 96px;
          line-height: 138px;
          letter-spacing: 0.5px;
        }

        .student {
          color: #ebdcf7;
        }

        .support {
          margin-left: 16px;
          -webkit-text-stroke: 1px #ebdcf7;
          color: transparent;
        }

        @media (max-width: 768px) {
          .title {
            font-size: 48px;
            line-height: 68px;
          }

           @media (max-width: 425px) {
            .title {
                font-size: 32px;
                line-height: 68px;
            }
        }
      `}</style>
					<div className="title mx-auto">
						<h1 className="text-center text-xl md:text-3xl font-Poppins font-semibold	gradientText">
								Get Set, Excel with Expert
						</h1>
					</div>
					<p
						className="text-center text-base md:text-lg mt-4 text-[#FFF]"
					>
						UPschol&apos;s Expert Guidance is more than just advice – it&apos;s your personalized pathway to excellence! Overcome academic challenges with confidence through one-on-one counselling sessions with experienced mentors. Take advantage of our unique feature that allows direct conversations with experts, tailoring your educational journey like never before.
					</p>
				</div>
				<div
					className="mt-8"
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
							data.map((item, index) => {
								return (
									<ImageCard
										key={index}
										imageLink={item.imageLink}
										name={item.name}
										rating={item.rating}
										experience={item.experience}
										counsellingNumber={item.counsellingNumber}
										onConsultClick={item.onConsultClick}
										designation={item.designation}
										course={item.course}
									/>
								)
							})
						}
					</Slider>
				</div>
			</div>

		</section>
	)
}