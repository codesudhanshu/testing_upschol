import Image from "next/image"
import banner from "../../public/new.png"
import banner1 from "../../public/pic1.png"
import banner3 from "../../public/img1.png"
import banner4 from "../../public/img3.png"
import banner5 from "../../public/img5.png"
import banner6 from "../../public/img6.png"
export default function Career() {
	return (
		<div id="our-partners" style={{ backgroundColor: '#FDF7FF' }} className="py-16">
			<div className="container px-4 mx-auto">
				<h1 style={{ color: "#6941C6", fontFamily: "Poppins" }} className="text-center font-semibold">Our Partners</h1>
				{/* <h1 style={{ fontFamily: "Poppins" }} className="text-center text-4xl font-semibold mt-2">Reach Out to Career Fairs</h1>
			<p style={{ color: "#667085", fontFamily: "Poppins" }} className="text-xl text-center font-normal mt-6"	>On UpSchol, instructors from all over the world instruct millions of students. We <br />offer the knowledge and abilities.</p>
			<div className="flex flex-col lg:w-2/3 lg:max-w-fix mx-auto mt-4">
				<Image
					src={banner}
					style={{ width: "100%" }}
					alt="banner"
				/>
				<p style={{ backgroundColor: "#6941C6", fontFamily: "Poppins" }} className="text-white text-xl lg:text-2xl lg:px-3 lg:py-3 font-bold w-10/12  self-end">Campus Placement <span className="font-medium">Seminar</span></p>
			</div> */}
				<div className="lg:flex justify-center mt-8 mx-auto  ">
					<div className="  lg:w-4/12  ">
						<Image src={banner1}
							alt="banner1"
							className="mx-auto" />

					</div>
					<div className="lg:w-4/12 mt-6 lg:mt-0  grid gap-2 grid-cols-2 lg:grid-rows-2 ml-3 justify-center">
						<div className="">
							<Image
								className="mx-auto"
								alt="banner3"
								src={banner3} />
						</div>
						<div className="">
							<Image
								className="mx-auto"
								alt="banner4"
								src={banner4} />
						</div>
						<div className="">
							<Image
								className="mx-auto"
								alt="banner5"
								src={banner5} />
						</div>
						<div className="">
							<Image
								className="mx-auto"
								alt="banner6"
								src={banner6} />
						</div>

					</div>
				</div>
				<p style={{ color: "#667085", fontFamily: "Poppins" }} className="text-xl text-center font-normal mt-6">On UpSchol, instructors from all over the world instruct millions of students. We <br />offer the knowledge and abilities.</p>

			</div>
		</div>
	)
}