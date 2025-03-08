import Image from "next/image";
import Good from "../../public/Good.png";
import Good1 from "../../public/Good1.png";
import Good2 from "../../public/Good2.png";
import Good3 from "../../public/Good3.png";
import bg from "../../public/upschol-bg.png";
export default function WhyUpschol() {
	return (
		<div className="relative">
			<Image
				alt="bg"
				src={bg}
				placeholder="blur"
				quality={100}
				fill
				sizes="100vw"
				style={{
					objectFit: 'contain',
					top: '-40%'
				}}
			/>
			<div
				className="py-8 px-4 lg:px-12 w-full"
			>
				<div className=" flex-col justify-center items-center">
					<div className="title mx-auto">
						<h1 className="text-center mt-4 ">
							<span className="text-center text-xl md:text-3xl font-Poppins font-semibold	gradientText">
								WHY UPSCHOL
							</span>
						</h1>
					</div>
					<p className="text-center text-xl  font-semibold text-white mt-4">
						Where Innovation Meets Education</p>
					<div className="my-14 mx-auto lg:mx-14">
						<div className="flex justify-between lg:justify-center flex-wrap gap-x-1 lg:gap-x-24 lg:mx-auto">

							<div className="relative mb-24 w-[160px] md:w-2/5 border-[1px] rounded-2xl border-[rgba(255,255,255,0.5)] bg-[#1F1031]">
								<div className="absolute left-[-50px] top-[-50px]">
									<Image
										src={Good}
										alt="good"
										width={150}
										height={150}

									/>
								</div>
								<p className="font-extrabold text-white text-[11px] lg:text-[14px] mx-2 lg:mx-28 m-8 mt-24 lg:mt-18">Highest Accreditations:</p>
								<p className="text-white text-[11px] lg:text-[14px] lg:m-8 mt-2 px-1 m-1">
									UGC and AICTE approved Universities that provide foolproof courses aligned with market standards and requirements. These universities ensure their courses are matched with the industry requirements and make it an all-encompassing and rigorous curriculum. </p>
							</div>
							<div className="relative mt-24 w-[160px] md:w-2/5 border-[1px] rounded-2xl border-[rgba(255,255,255,0.5)] bg-[#1F1031]">
								<div className="absolute left-[-50px] top-[-50px]">
									<Image
										src={Good1}
										alt="good"
										width={150}
										height={150}

									/>
								</div>
								<p className="font-extrabold text-white text-[11px] lg:text-[14px] mx-2 lg:mx-28 m-8 mt-24 lg:mt-18">Unbiased Guidance:</p>
								<p className="text-white text-[11px] lg:text-[14px] m-1 lg:m-8 mt-2 px-1">
									Helpful guidance counsellors help you pave your way towards success. Their main job is to help you make an informed decision towards a successful career and utilise your potential in the best way possible.
								</p>
							</div>
							<div className="relative mb-24 w-[160px] md:w-2/5 border-[1px] rounded-2xl border-[rgba(255,255,255,0.5)] bg-[#1F1031]">
								<div className="absolute left-[-50px] top-[-50px]">
									<Image
										src={Good2}
										alt="good"
										width={150}
										height={150}

									/>
								</div>
								<p className="font-extrabold text-white text-[11px] lg:text-[14px] mx-2 lg:mx-28 m-8 mt-24 lg:mt-18">Unwavering helping hand: </p>
								<p className="text-white text-[11px] lg:text-[14px] m-1 lg:m-8 mt-2 px-1">
									Constant support from admission to your graduation. Our expert guidance is here to make your education journey as seamless and smooth as possible. We offer continuous help to overcome any challenges you might face.
								</p>
							</div>
							<div className="relative mt-24 w-[160px] md:w-2/5 border-[1px] rounded-2xl border-[rgba(255,255,255,0.5)] bg-[#1F1031]">
								<div className="absolute left-[-50px] top-[-50px]">
									<Image
										src={Good3}
										alt="good"
										width={150}
										height={150}

									/>
								</div>
								<p className="font-extrabold text-white text-[11px] lg:text-[14px] mx-2 lg:mx-28 m-8 mt-24 lg:mt-18">Trusted by students:</p>
								<p className="text-white text-[11px] lg:text-[14px] m-1 lg:m-8 mt-2 px-1">
									10k+ students realise their dreams through Upschol. At every attempt, we ensure that a child’s future is secured and they can achieve their dreams against all odds. At Upschol, we continue to build this with our community with this intention.
								</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}