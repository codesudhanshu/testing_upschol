import React, { useEffect, useState } from 'react'
import Climber from "../../public/vivid-the-traveler-with-with-travel-bag-and-map-1.gif";
import Hill from "../../public/hill-img.png";
import Image from 'next/image'

const Advantages = () => {

	return (
		<section
			className='w-screen overflow-hidden lg:px-24 py-12'
			style={{ backgroundColor: '#121421' }}
		>
			<div className='flex flex-col justify-center items-center'>
				<div>
					<h1 className='md:text-3xl text-xl font-Poppins mx-8 lg:mx-12 font-semibold text-center'>

						<span className='text-primary' >Get Set to Transform Your Career with UPschol!</span>
					</h1>
					<p
						className="text-center text-lg mt-4 text-[#FFF]"
					>
						#FutureStartsOnline
					</p>
				</div>
				{/* <div id='climberContainer' className='relative flex items-center justify-center'>
					<Image
						className={`absolute left-[37%] top-[22%]`}
						style={{ width: `15%`, transform: "scaleX(-1)" }}
						alt="climber"
						src={Climber}
					/> */}
				<Image
					className='w-[95vw] md:w-[85vw] lg:w-[80vw] xl:w-[75vw] xl:max-w-[1440px] md:max-w-[1024px] object-contain'
					alt="hill"
					src={Hill}
				/>
				{/* </div> */}
			</div>
		</section>
	)
}

export default Advantages
