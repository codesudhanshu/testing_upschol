import { Button } from "antd";
import bloger from '../../public/assets/landing-page/images/carrerFairBlog.png';
import Image from "next/image";

export default function CarrerFairsBlog() {

	return (
		<div
			className="flex flex-col md:flex-row px-12 py-8 mt-5 justify-between"
		>
			<div
				className="w-full md:w-1/2 p-5 flex flex-col gap-6"
			>
				<h1
					className="font-bold text-xl md:text-4xl lg:5xl "
				>
					<span className="gradientText">Out Reach</span><br></br>
					<span className="gradientText">Career Fairs</span>
				</h1>
				<p
					className="text-[12px] md:text-[16px] lg:text-[20px] text-white"
				>
					A college search platform can also help connect students with colleges and universities that may have otherwise flown under their radar Often, students may not know about certain schools that may be a great fit for them due to distance or lack of awareness. These platforms allow students to broaden their horizons and discover schools they may not have considered otherwise.
				</p>
				<Button
					className='viewmore w-[80px] h-[30px] text-[12px] md:w-[130px] md:h-[50px] md:text-[18px] font-bold border-2 border-white text-white flex justify-center items-center rounded-[10px]'
				>
					Learn More
				</Button>
			</div>
			<div
				className="flex w-full h-[450px]   md:w-1/2 justify-end "
			>
				<Image
					src={bloger}
					alt=''
					className="lg:w-[80%] md:w-[70%] w-full object-contain"
				/>
			</div>
		</div>
	)
}