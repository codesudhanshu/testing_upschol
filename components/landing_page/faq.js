import { useState } from "react";
import { Col, Row } from "antd";
import { FaArrowRightLong } from "react-icons/fa6";
import { FaPlus } from "react-icons/fa6";
import { FaMinus } from "react-icons/fa6";


export default function FAQ() {

	const [open, setOpen] = useState(-1);
	const faqs = [
		{
			question: "What is UPschol and how does it work?",
			answer: <>UPschol is a dynamic online learning platform that provides a wide range of courses to empower learners in their academic and professional pursuits. To get started, simply browse our course catalog, choose your preferred courses, and enroll effortlessly.</>
		},
		{
			question: "What sets Upschol apart from other online learning platforms?",
			answer: <>Upschol stands out for its user-friendly interface, diverse course offerings covering academic and professional development, and a commitment to making education accessible and upskilling easy. Our platform is designed to meet the unique needs of a diverse learner community.</>
		},
		{
			question: "How can I enroll in courses on UPschol?",
			answer: <>Enrolling in Upschol courses is easy! Browse through our catalog, select your desired courses, and follow the simple enrollment process. We&apos;ve streamlined the experience to make it hassle-free for our learners.</>
		},
		{
			question: "Do UPschol courses offer certifications?",
			answer: <>Yes, many of our courses offer certifications upon completion, enhancing your credentials and recognition in various industries. Check the specific course pages for details on available certifications.</>
		},
		{
			question: "Is financial aid available for UPschol courses?",
			answer: <>UPschol provides comprehensive support through discussion forums, live Q&A sessions, and direct communication with instructors. For technical or administrative queries, our Student Support team is readily available through the &quot;Get in Touch&quot; section on the website.</>
		},
		{
			question: "How do I get support if I encounter issues with UPschol courses?",
			answer: <>UPschol provides comprehensive support through discussion forums, live Q&A sessions, and direct communication with instructors. For technical or administrative queries, our Student Support team is readily available through the &quot;Get in Touch&quot; section on the website.</>
		}
	]
	const handleOpen = (value) => {
		setOpen(open === value ? -1 : value);
	}
	return (
		<section
			className="w-full overflow-hidden py-16"
			id="faqs"
		>
			<div className="container w-full">
				<Row
					gutter={[32, 32]}
					align={"stretch"}
				>
					<Col
						xs={24}
						md={12}
					>
						<div>
							<p
								className="text-[#ebdcf7] text-center text-2xl md:text-left font-semibold"
							>
								FAQs
							</p>
							<p className="self-center gradientText text-center md:text-left "
								
							>
								<span
									className="self-center gradientText text-center md:text-left font-semibold text-xl  lg:text-4xl mt-2"
								>
									#ScholarshipsForAll
								</span>
							</p>
							<p
								className="text-center md:text-left text-base md:text-lg mt-4 text-white"
							>
								Here are the top FAQs about online education, demystified for you.
							</p>
							<button
								className="mx-auto md:mx-0 mt-16 border-2 border-primary rounded-lg py-2 px-4 text-white hover:bg-primary hover:text-white transition duration-300 ease-in-out text-base md:text-lg flex items-center justify-center gap-x-2"
							>
								<p>
									Rise Up Your Query
								</p>
								<FaArrowRightLong
									className="inline-block ml-2"
								/>
							</button>
						</div>
					</Col>
					<Col
						xs={24}
						md={12}
					>
						<div
							className="flex flex-col gap-y-4"
						>
							{
								faqs?.map((faq, index) => (
									<div
										key={index}
										className="flex flex-col gap-y-3 p-4 rounded-lg shadow-lg cursor-pointer hover:shadow-xl transition duration-300 ease-in-out select-none"
										onClick={() => handleOpen(index)}
									>
										<div className="flex justify-between">
											<h4
												className={`font-semibold mr-1 text-base md:text-lg ${open === index ? "text-primary" : "text-white"}`}
											>
												{faq.question}
											</h4>
											{
												open === index ?
													<FaMinus color="white" />
													:
													<FaPlus color="white" />
											}
										</div>
										{
											open === index && (
												<p
													className="text-white text-base md:text-lg"
												>
													{faq.answer}
												</p>
											)
										}
									</div>
								))
							}
						</div>
					</Col>
				</Row>
			</div>
		</section >
	)
}