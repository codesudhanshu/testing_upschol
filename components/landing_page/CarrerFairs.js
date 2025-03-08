import Image from 'next/image';
import online from '../../public/career/online_book.png';
import presentation from '../../public/career/Presentation.png';
import video from '../../public/career/video.png';
import { Button } from 'antd';

export default function CarrerFairs() {
	return (
		<div
			className="px-12 text-[#101828] py-8 w-full"
		>
			<div
				className="flex flex-col md:flex-row  justify-between gap-4"
			>
				<h1
					className="font-bold text-xl md:text-4xl lg:5xl "
				>
					<span className="gradientText">Out Reach</span><br></br>
					<span className="gradientText">Career Fairs</span>
				</h1>
				<p
					className="text-[12px] md:text-[20px] md:w-1/2 text-white md:w-1/2"
				>
					On Upschol, instructors from all over the world instruct millions of students. We offer the knowledge and abilities.
				</p>
			</div>
			<div
				className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mt-[30px] md:mt-[50px] gap-5 "
			>
				<div
					className="border border-white flex flex-col p-4 gap-2 drop-shadow"
				>
					<Image
						src={online}
						alt=''
						className='w-12 h-12 md:w-24 md:h-24'
					/>
					<h3
						className='text-[12px] md:text-[20px] font-bold mt-4 text-white'
					>
						Online Courses from Experts
					</h3>
					<p
						className='text-white md:text-[14px] text-[10px]'
					>
						Explore a world of knowledge with online courses crafted by industry-leading experts. Learn from the best and elevate your skills to new heights. Dive into specialized subjects and gain insights directly from seasoned professionals
					</p>
					<Button
						className='viewmore w-[80px] h-[30px] text-[12px] md:w-[130px] md:h-[50px] md:text-[18px] font-bold border border-white flex justify-center items-center rounded-[10px] text-white'
					>
						Learn More
					</Button>
				</div>
				<div
					className="border border-white flex flex-col p-4 gap-2 drop-shadow"
				>
					<Image
						src={presentation}
						alt=''
						className='w-12 h-12 md:w-24 md:h-24'
					/>
					<h3
						className='text-[12px] md:text-[20px] font-bold mt-4 text-white'
					>
						Over 500+High Quality Topics
					</h3>
					<p
						className='text-white md:text-[14px] text-[10px]'
					>
						Explore a world of knowledge with online courses crafted by industry-leading experts. Learn from the best and elevate your skills to new heights. Dive into specialized subjects and gain insights directly from seasoned professionals
					</p>
					<Button
						className='viewmore w-[80px] h-[30px] text-[12px] md:w-[130px] md:h-[50px] md:text-[18px] font-bold border border-white flex justify-center items-center rounded-[10px] text-white'
					>
						Learn More
					</Button>
				</div>
				<div
					className="border border-white flex flex-col p-4 gap-2 drop-shadow"
				>
					<Image
						src={video}
						alt=''
						className='w-12 h-12 md:w-24 md:h-24'
					/>
					<h3
						className='text-[12px] md:text-[20px] font-bold mt-4 text-white'
					>
						Occasional Video Updates
					</h3>
					<p
						className='text-white md:text-[14px] text-[10px]'
					>
						Explore a world of knowledge with online courses crafted by industry-leading experts. Learn from the best and elevate your skills to new heights. Dive into specialized subjects and gain insights directly from seasoned professionals
					</p>
					<Button
						className='viewmore w-[80px] h-[30px] text-[12px] md:w-[130px] md:h-[50px] md:text-[18px] font-bold border border-white flex justify-center items-center rounded-[10px] text-white'
					>
						Learn More
					</Button>
				</div>
			</div>
		</div>
	)
}