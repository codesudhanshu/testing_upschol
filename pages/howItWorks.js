import Image from "next/image";
import banner from "../public/mockup 1.png"
import banner1 from "../public/steps/banner1.png"

export default function header() {
	return (
		<section style={{ backgroundColor: "#F2ECFF" }}>
			<div className="flex container mx-auto h-screen justify-center items-center">
				<div>
					<h1 style={{ fontFamily: "Poppins", color: "#DE69C3" }} className="invisible md:visible text-[25vw] lg:visible lg:text-[27vw] opacity-25  font-black">Step 1</h1>
				</div>
				<div className="absolute text-center flex flex-col z-10">
					<p style={{
						fontSize: 16, fontWeight: 600, color: "#6941C6"
					}} className="">How it Works</p>
					<p style={{
						fontSize: 35, fontWeight: 600, fontFamily: "Poppins"
					}} className=""><span style={{ color: "#6941C6" }}>UpSchol</span> Your One Stop Solution</p>
					<p style={{
						fontSize: 24, fontWeight: 700, fontFamily: "Poppins", color: "#667085"
					}} className="">Get Enroll with UpSchol</p>
					<p style={{
						fontSize: 14, fontWeight: 400, fontFamily: "Poppins", color: "#667085"
					}} className="lg:w-2/4 mx-auto">A college search platform can also help connect students with colleges and universities that may have otherwise flown under their radar Often, students may not know about certain schools that may be a great fit for them due to distance or lack of awareness. These platforms allow students to broaden their horizons and discover schools they may not have considered otherwise. </p>
					<div className="flex">
						<div className="mx-auto" ><h1 style={{ fontFamily: "Poppins" }} className="pt-20  bg-gradient-to-r from-pink-500 via-pink-500 to-purple-500 inline-block text-transparent bg-clip-text  lg:text-[3vw] font-bold lg:pt-32 lg:pl-64 ">Step 1</h1>
							<Image
								className="lg:ml-52 md:w-7/12 lg:w-6/12"
								src={banner1} /></div>
						<div className="md:w-9/12 lg:pl-24 mx-auto pt-16 lg:pt-16 z-0">
							<Image
								className="lg:w-9/12"
								src={banner}
							/>
						</div>
					</div>
				</div>

			</div>

		</section>
	)
}