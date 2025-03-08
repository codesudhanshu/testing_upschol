import Image from "next/image";
import { FaChevronRight } from "react-icons/fa";
import Mentor1 from "../../public/experts/sanjana.jpg"
import Mentor2 from "../../public/experts/simran.jpg"
import Mentor3 from "../../public/experts/yash.jpg"
import Mentor4 from "../../public/experts/rubbal.jpg"

export const Mentors = () => {

	const mentorData = [
		{ src: Mentor1 },
		{ src: Mentor2 },
		{ src: Mentor3 },
		{ src: Mentor4 }];
	return (
		<div className='flex items-center gap-5 mt-5 md:mt-0'>
			<div className='flex items-center'>
				{
					mentorData.map((partner, index) => {
						return (
							<div key={partner.src} className='w-[50px] h-[50px] rounded-full' style={{
								marginLeft: index === 0 ? '0px' : '-15px',
								cursor: 'pointer'
							}}>
								<Image
									src={partner.src}
									alt='Partner Image'
									className="object-contain z-0 2xl:w-full 2xl:h-full w-3//4 h-3/4 rounded-full transform transition-transform duration-300 hover:scale-110 hover:z-50 relative"
									priority={true}

								/>
							</div>
						)
					})
				}
			</div>
			<div className='cursor-pointer'>
				<a href="#right-guidance">
					<h1 className='text-white text-xs 2xl:text-md font-semibold'>Meet</h1>
					<h1 className='text-white font-semibold text-xs 2xl:text-md flex items-center gap-2'>Our Mentors <FaChevronRight color='#6941C6' /></h1>
				</a>
			</div>

		</div>
	)
}
