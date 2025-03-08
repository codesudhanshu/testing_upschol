import Slider from "react-slick";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import Image from "next/image";
import indianman1 from "../../public/sucess-stories/indian-man-1.jpg";
import indianman2 from "../../public/sucess-stories/indian-man-2.jpeg";
import indianwoman from "../../public/sucess-stories/indian-women.jpg";
function ImageCard({
	image = "",
	name = "",
	review = "",
	course = ""
}) {
	return (
		<div
			className="px-4 lg:px-8 h-[350px]"
		>
			<div
				className="h-full w-full rounded-xl flex flex-col align-center items-center justify-evenly p-10 text-white"
				style={{ background: 'linear-gradient(to bottom right, #7F56D9 0%, #432E73 30%)' }}
			>
				<div className="flex flex-col align-center items-center justify-between">
					<div className="w-[70px] h-[70px] rounded-full overflow-hidden border-4 border-white">
						<Image
							src={image}
							alt="good"
							width={70}
							height={70}
							className="object-cover w-full h-full"
						/>
					</div>
					<p className="font-semibold text-lg mt-3">{name}</p>
					<p className="font-medium mt-1">{course}</p>
				</div>
				<p className="font-semibold mt-5 w-full line-clamp-3">{"\""}{review}{"\""}</p>

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
			className="absolute top-1/2 right-0 transform -translate-y-1/2 cursor-pointer z-10 rounded-full bg-white p-3 "
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
			name: "Amit Sharma",
			image: indianman1,
			course: "PG Certificate Programme",
			onConsultClick: () => { },
			review: "Hailing from a small town in Rajasthan, Amit Sharma had always dreamed of a career in technology. Lacking local educational resources, Amit enrolled in online courses in computer science through Kurukshetra University. Balancing his studies with a part-time job, he used the convenience of online learning to her advantage. After graduation, Amit landed a senior position as a software engineer at HCL Technologies. His journey from a small town to a global tech giant stands as a testament to the power of online education and perseverance."
		},
		{
			name: "Priya Desai",
			image: indianwoman,
			course: "PG Certificate Programme",
			onConsultClick: () => { },
			review: "Priya Desai, a marketing major from Mumbai, wanted to accelerate her career without taking a break from her job. She chose to pursue an online MBA at the Lovely Professional University Online (LPU) while pursuing her career. The online program gave her the flexibility to learn at her own pace and apply new techniques directly to her work. Soon after graduating, Priya was promoted to Senior Marketing Manager at Reliance Industries, where she now leads a dynamic team and develops new campaigns."
		},
		{
			name: "Ravi Patel",
			image: indianman2,
			course: "PG Certificate Programme",
			onConsultClick: () => { },
			review: "Ravi Patel, from Gujarat, aspired to work in data science but faced financial constraints that made attending a traditional university challenging. He enrolled in an online degree program in Data Science through the MICA School of Ideas. Ravi made the most of online resources, attending virtual lectures, participating in data analysis boot camps, and completing industry-relevant projects. His proactive approach led him to an internship with a startup, where he gained practical experience. Ravi's exceptional skills and portfolio earned him multiple job offers, and he chose to join Tech Mahindra as a Data Scientist."
		},
	];
	return (
		<section
			className="py-8 lg:py-16 px-2 lg:px-4 w-full overflow-hidden"
		>
			<div
				className="container"
			>
				<div>
					<div className="title mx-auto">
						<h1 className="text-center mt-4 ">
							<span className="text-center text-xl md:text-3xl font-Poppins font-semibold	gradientText">
								Success Stories
							</span>
						</h1>
					</div>
				</div>
				<div
					className="mt-8"
				>
					<Slider
						dots={false}
						speed={500}
						autoplay={true}
						autoPlaySpeed={3000}
						slidesToShow={2}
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
										image={item.image}
										name={item.name}
										course={item.course}
										review={item.review}
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