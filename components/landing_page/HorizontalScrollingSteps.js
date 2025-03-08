'use client'
import { useEffect, useRef, useState } from "react"
import rightArrow from '../../public/right-arrow-forward-svgrepo-com.svg';
import Image from "next/image";
import banner1 from '../../public/steps/banner1.png'
import banner2 from '../../public/steps/banner2.png'
import banner3 from '../../public/steps/banner3.png'
import banner4 from '../../public/steps/banner4.png'
import banner5 from '../../public/steps/banner5.png'
import banner6 from '../../public/steps/banner6.png'
import screen1 from '../../public/steps/screen1.png'
import screen2 from '../../public/steps/screen2.png'
import screen3 from '../../public/steps/screen3.png'
import screen4 from '../../public/steps/screen4.png'
import screen5 from '../../public/steps/screen5.png'
import screen6 from '../../public/steps/screen6.png'
import { Col, Row } from "antd";

export default function HorizontallyScrollingSteps() {
	const sectionRef = useRef();
	const sectionTopRef = useRef();
	const screens = [{
		step_id: 1,
		step: "Step 1",
		title: "Explore & Envision",
		screen: screen1,
		banner: banner1
	}, {
		step_id: 2,
		title: "Connect & Clarify",
		step: "Step 2",
		screen: screen2,
		banner: banner2
	}, {
		step_id: 3,
		title: "Apply & Succeed",
		step: "Step 3",
		screen: screen3,
		banner: banner3
	}, {
		step_id: 4,
		title: "Submit Application",
		step: "Step 4",
		screen: screen4,
		banner: banner4
	}, {
		step_id: 5,
		title: "Direct University Payment",
		step: "Step 5",
		screen: screen5,
		banner: banner5
	}, {
		step_id: 6,
		title: "Enroll, Learn, Succeed",
		step: "Step 6",
		screen: screen6,
		banner: banner6
	}];

	const [whiteBarHeight, setWhiteBarHeight] = useState(0);

	useEffect(() => {
		const handleScroll = () => {
			if (sectionRef.current) {
				const sectionTop = sectionRef.current.getBoundingClientRect().top;
				if (!sectionTopRef.current) sectionTopRef.current = sectionTop;
				const sectionBottom = sectionRef.current.getBoundingClientRect().bottom;
				const isSectionVisible = sectionTop < window.innerHeight && sectionBottom > 0;

				if (isSectionVisible && sectionTopRef.current) {
					const sectionHeight = sectionBottom - sectionTop;
					const scrolledPixels = window.scrollY - sectionTopRef.current;

					const scrolledPercentage = (scrolledPixels / sectionHeight) * 100;
					const offSetPercentage = window.innerHeight >= 768 ? 10 : 5;
					const scrolledPercentageWithOffset = Math.min(100, Math.max(0, scrolledPercentage + offSetPercentage));
					setWhiteBarHeight(scrolledPercentageWithOffset);
				}

			}
		}

		document.addEventListener("scroll", handleScroll);

		return () => {
			document.removeEventListener("scroll", handleScroll);
		}
	})

	return (
		<section
			ref={sectionRef}
			className="w-full bg-[#121421] flex items-center justify-center p-4 md:p-12"
			style={{
				backgroundImage: "url('/assets/landing-page/images/steps-bg.webp')",
				backgroundPosition: "center",
				backgroundSize: "cover",
				position: 'relative'
			}}
		>
			<Row
				className="md:container w-full "
				gutter={[16, 16]}
				align={"stretch"}
			>
				<Col
					xs={24}
					md={10}
					lg={9}
				>
					<div
						className="h-full "
					>
						<div
							className=" sticky top-[110px] md:pr-8 lg:pr-16 "
							
						>
							<p
								className="text-[#fff] font-medium pb-4"
							>
								HOW IT WORKS
							</p>
							<h1
								className="text-[#fff] font-bold text-4xl pb-4"
							>
								Upskill with <span className="gradientText">Upschol</span>
							</h1>
							<h1
								className="text-[#fff] font-bold text-4xl pb-4"
							>
								Get, Set, Upschol: Enroll Today
							</h1>
							<p
								className="text-[#ffffffcc] pb-4 leading-relaxed"
							>
								Embark on a journey of academic and professional excellence with Upschol – your reliable partner in achieving a brighter future. Our meticulously designed courses serve as personalized roadmaps, guiding you towards success. Consult with our experienced advisors for in-depth guidance that shapes your unique path. Ready to advance? Enrol seamlessly with Upschol and elevate your career today.
							</p>
						</div>
					</div>
				</Col>
				<Col
					xs={24}
					md={14}
					lg={15}
				>
					<div
						className="flex justify-between gap-x-4 md:gap-x-10"
					>
						<div
							className="relative w-auto"
						>
							<div
								className="absolute bg-[#fff]  h-full z-5 left-1/2 transform -translate-x-1/2"
								style={{
									width: "2px",
								}}
							/>
							<div
								className="absolute bg-primary z-6 left-1/2 transform -translate-x-1/2"
								style={{
									width: "2px",
									height: `${whiteBarHeight}%`
								}}
							/>
							<div
								className="w-full flex flex-col z-7"
							>
								{
									screens.map((screen, index) => (
										<div
											key={screen.step_id}
											className="w-max relative min-h-[18rem] h-[18rem] md:min-h-[32rem] md:h-[32rem]"
											style={{
												marginTop: index === 0 ? "4rem" : "0",
											}}
										>
											<div
												className="z-10 w-max h-full flex flex-col"
											>
												<div
													className="flex items-center justify-center rounded-full bg-primary h-[3rem] w-[3rem] md:h-[4rem] md:w-[4rem]"
												>
													<h2
														className="text-3xl text-[#fff]"
													>
														{screen.step_id}
													</h2>
												</div>
											</div>
										</div>
									))
								}
							</div>
						</div>
						<div
							className="w-full h-full"
						>
							<div
								className="w-full flex flex-col z-7"
							>
								{
									screens.map((screen, index) => (
										<div
											key={screen.step_id}
											className="w-full relative pb-4 flex min-h-[18rem] h-[18rem] md:min-h-[32rem] md:h-[32rem]"
											style={{
												marginTop: index === 0 ? "4rem" : "0",
											}}
										>
											<div
												className="w-full flex flex-col flex-1"
											>
												<div
													className="flex w-full items-center gap-x-2 md:gap-x-4"
												>
													<div
														className="w-1/6"
													>
														<Image
															alt="Icon"
															src={screen.banner}
															height={512}
															width={512}
															className="w-full h-auto object-contain"
														/>
													</div>
													<h3
														className="w-5/6 text-[#fff] font-bold text-2xl md:text-3xl pb-0"
													>
														{screen.title}
													</h3>
												</div>
												<div
													className="flex-1 flex items-center justify-center w-full"
												>
													<Image
														alt="Banner"
														src={screen.screen}
														height={512}
														width={512}
														className="h-4/5 w-auto object-contain"
														style={{
															maxHeight: "80%"
														}}
													/>
												</div>
											</div>
										</div>
									))
								}
							</div>
						</div>
					</div>
				</Col>
			</Row>
		</section>
	)
}