import { Col, Row, Checkbox, Input, Form } from "antd";
import Image from "next/image";
import { useRef, useState } from "react";
import ScholarshipBG from "../../public/scholarship-bg.jpg"
import ScholarshipImg from "../../public/scholarship-img.png"
import { Transition } from 'react-transition-group';
import Link from "next/link";
import { useRouter } from "next/router";
import bg from "../../public/upschol-bg.png";




export default function Scholarship({ categories, tags, landdingPage }) {
	const defaultStyle = {
		transition: `opacity 1s ease-in-out`,
		opacity: 0,
	}

	const transitionStyles = {
		entering: { opacity: 0, display: 'block' },
		entered: { opacity: 1 },
		exiting: { opacity: 0 },
		exited: { opacity: 0, display: 'none' },
	};
	const [questionNo, setQuestionNo] = useState(1);
	const [multiOptionSelected, setMultiOptionSelected] = useState([])
	const [textAreaOptions, setTextAreaOptions] = useState(["Athletes or sports", "Extra curricular achievements- National or International Level"])
	const [textValue, setTextValue] = useState();
	const [canContinue, setCanContinue] = useState(false);
	const nodeRef = useRef(null);

	const [formSubmitted, setFormSubmitted] = useState(false);
	const [formStarted, setFormStarted] = useState(false);
	const router = useRouter();
	const [questions, setQuestions] = useState([
		{
			id: 1,
			type: "multi",
			question: "Which type of Scholarships you're looking for-",
			options: ["Merit based", "Need based", "Athletes or sports", "Extra curricular achievements- National or International Level", "Divyang(For persons with disabilities)", "Defense Personnel", "Women Scholarships", "Government Employee based on work experience", "Senior Citizen- (Learning has No Age Bars)"],
			selectedOption: [],
			textInputValue: "",
			placeholder: "Select scholar Type"
		},
		{
			id: 2,
			type: "mcq",
			question: "Which degree are you interested in?",
			options: categories,
			selectedOption: "",
			placeholder: "Select degree type",
			selectedIndex: 0
		},
		{
			id: 3,
			type: "mcq",
			question: "Which specific course learner is looking for?",
			options: [],
			selectedOption: "",
			placeholder: "Select specific course"
		},
		{
			id: 4,
			type: "mcq",
			question: "Any particular specialization in the mind-",
			options: ["Business Analytics", "Project Management", "Supply Chain Management", "Cybersecurity", "AI & ML", "Data Science", "Cloud Computing", "Health Informatics", "Medical Imaging", "Clinical Research",
				"Healthcare Administration", "(UX) Design", "Graphic Design", "Interior Design", "Motion Graphics", "Renewable Energy Engineering", "Robotics and Automation", "Aerospace Engineering", "Biomedical Engineering", "International Relations", "Social Work",
				"Environmental Policy and Management", "Public Health", "Creative Writing", "Digital Humanities", "Nanotechnology", "Environmental Science", "Biotechnology", "Space Science", "Digital Marketing",
				"Content Marketing", "Brand Management", "Educational Technology", "Curriculum and Instruction"],
			selectedOption: "",
			placeholder: "Select specialization"
		},
		{
			id: 5,
			type: "mcq",
			question: "Number of years of work experience-",
			options: ["0 Year", "0.1-2 Years", "2-5 Years", "5-8 Years", "8-12 Years", "12+ Years"],
			selectedOption: "",
			placeholder: "Select no of experience"
		},
		{
			id: 6,
			type: "mcq",
			question: "Any fees budget you have in your mind-",
			options: ["less than 60K", "60k - 1Lac", "1Lac - 1.5Lacs", "1.5Lacs - 2Lacs", "2Lacs - 3Lacs", "3Lacs - 4Lacs", "4Lacs - 6Lacs", "6Lacs Above"],
			selectedOption: "",
			placeholder: "Select feed budget"
		},
		{
			id: 7,
			type: "mcq",
			question: "Do you want to convert your fees in Easy or no cost EMI",
			options: ["Yes", "No"],
			selectedOption: "",
			placeholder: "Select one"
		},
		{
			id: 8,
			type: "mcq",
			question: "What is your Salary Package (Per Annum)?",
			options: ["Not Working", "Less than 3 Lacs", "3 Lacs to 6 Lacs", "Above 6 Lacs", "Do not want to Disclose"],
			selectedOption: "",
			placeholder: "Select salary package"
		},
		{
			id: 9,
			type: "mcq",
			question: "Your Highest Qualification?",
			options: ["Postgraduate", "College Graduate", "Completed 12th", "Completed 10th", "Diploma Holder"],
			selectedOption: "",
			placeholder: "Select highest qualification"
		},
		{
			id: 10,
			type: "mcq",
			question: " Percentage scored in last qualification?",
			options: ["Below 50%", "50% to 75%", "Completed 12th", "75%- 85%", "Above 85%"],
			selectedOption: "",
			placeholder: "Select percentage"
		},
		{
			id: 11,
			type: 'lead_form'
		}
	])

	const optionSelected = (questionId, option, index) => {
		setQuestions(previousQuestions => {
			const updatedQuestions = previousQuestions.map(question => {
				if (question.id === questionId) {
					return { ...question, selectedOption: option, selectedIndex: index }
				}
				return question
			})
			return updatedQuestions
		})
		setCanContinue(true)
	}

	const multiSelected = (questionId, option) => {
		setMultiOptionSelected(previousData => {
			const isOptionSelected = previousData.includes(option);
			if (isOptionSelected) {
				return previousData.filter(item => item !== option);
			} else {
				return [...previousData, option];
			}
		});

		setMultiOptionSelected(previousOptions => {
			setQuestions(previousQuestions => {
				const updatedQuestions = previousQuestions.map(question => {
					if (question.id === questionId) {
						return { ...question, selectedOption: previousOptions }
					}
					return question
				})
				return updatedQuestions
			})
			return previousOptions
		})

		setMultiOptionSelected(previousData => {
			if (previousData.length > 0) {
				setCanContinue(true)
			}
			return previousData
		})

	}

	function nextStep() {

		setQuestions(previousQuestions => {
			const updatedQuestions = previousQuestions.map(question => {
				if (question.id === 1) {
					return { ...question, textInputValue: textValue }
				}
				return question
			})
			return updatedQuestions
		})

		setQuestionNo(preQuestionNo => preQuestionNo + 1)
		setQuestionNo(preQuestionNo => {
			return preQuestionNo
		})
		setCanContinue(false)
	}

	const onFinish = async (values) => {
		try {
			if (questionNo === 11) {

				let response = questions.filter(e => e.question)

				let scholarship = await fetch("/api/scholarship", {
					method: "POST",
					headers: {
						"Content-Type": "application/json"
					},
					body: JSON.stringify({
						form_values: values,
						response: response
					})

				});
				let res = await scholarship.json();
				if (res.status === 200) {
					setFormSubmitted(true)
					setQuestionNo(preQuestionNo => preQuestionNo + 1)
				}
			}
		}
		catch (error) {
			console.log(error)
		}
	};

	const onFinishFailed = (errorInfo) => {
		console.log('Failed:', errorInfo);
	};

	return (
		<section
			className=" relative w- full overflow-hidden z-0 bg-[#000]"
			id="scholarship-landing-page"
		>
			<Image
				alt="bg"
				src={bg}
				placeholder="blur"
				quality={100}
				fill
				sizes="100vw"
				style={{
					objectFit: 'contain',
					top: '-3%'
				}}
			/>

			{
				<p className="title">
					<span className="highlight"> </span>
					<span className="text">SCHOLARSHIP</span>
				</p>

			}


			<h3
				className="text-center text-xl lg:text-4xl font-semibold mt-2 text-[#FFFFFF]" style={{ zIndex: 1000 }}
			>
				Get Set for Scholarship Credits
			</h3>
			<p className="text-center text-lg text-[#FFF] mt-2 p-3">
				Your dreams will not have any obstacles, as our Scholarship Credits ensure that each student can turn their dreams into reality.<br></br><br></br>
				We assure you that your 2 mins can benefit you for a lifetime.
			</p>
			<Row
				className="mt-8 lg:mt-12 h-full px-4 justify-between xl:justify-center"
				gutter={[32, 32]}
				style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', alignContent: 'center', minHeight: '70vh', margin: '0' }}
			>
				<Col
					xs={0}
					md={12}
				>
					<div className="flex flex-col xl:mx-24 p-4 justify-center items-left w-1/2 lg:w-full h-full">
						<Image
							src="/logo.png"
							alt="UpSchol"
							width={350}
							height={150}
						/>
						<p className="my-4 xl:pl-16">
							<span className="text-5xl lg:text-[64px] font-semibold  gradientText leading-none">#Scholarships</span><br></br>
							<span className="text-5xl lg:text-[64px] font-semibold  gradientText leading-none">ForAll</span>
						</p>
					</div>

				</Col>
				<Col
					xs={24}
					md={10}
				>
					<div className="p-2 lg:p-10 flex flex-col justify-between rounded-[10px]" style={{
						background: 'linear-gradient(to bottom right, #7F56D9 0%, #432E73 50%)'
					}}>
						{
							formSubmitted ?
								<div className="flex justify-center">
									<p className="text-center font-semibold text-lg lg:text-3xl mt-3 text-[#6941C6]">Scholarship request has been sent successfully!</p>
								</div>
								:
								!formStarted && landdingPage ?
									<div className="flex flex-col justify-center items-center gap-10 p-2.5 rounded-[50px] h-[50vh]" style={{
										boxShadow: 'rgba(100, 100, 111, 0.2) 0px 7px 29px 0px'
									}}>
										<h1 className="text-center font-medium text:lg lg:text-xl mt-3 text-white">
											Get started with the scholarship enrollment form
										</h1>
										<button
											className="viewmore justify-center bg-primary hover:bg-transparent text-white py-3 rounded-md md:text-lg font-semibold w-[200px] "
											onClick={() => {
												setFormStarted(true);
											}}
											style={{
												zIndex: 3,
											}}
										>
											Get Started
										</button>
									</div>
									:
									null
						}
						<Transition nodeRef={nodeRef} in={formStarted || !landdingPage} timeout={300}>
							{state => (
								<div ref={nodeRef} style={{
									...defaultStyle,
									...transitionStyles[state]
								}}>
									{/* {console?.log(state)} */}
									<Form onFinis h={onFinish}
										onFinishFailed={onFinishFailed}
										autoComplete="off"
									>
										{
											questions.map((question, index) => (
												<div key={question?.id}
													className="question"
													style={{
														transition: 'opacity 1s ease-in-out',
														opacity: question?.id === questionNo ? 1 : 0
													}}>
													{
														question?.id === questionNo && (
															<div>
																<div className="flex">
																	{
																		questions.map((elem, index) => (
																			<div key={index} style={{ background: questionNo > index + 1 ? '#D79E6D' : '#D3D3D3', height: '5px', width: '40px' }}></div>
																		))
																	}
																</div>

																<p className="my-3 text-lg text-[#FFFFFF]">{question.question}</p>
																<div style={{ overflow: 'auto', maxHeight: '50vh' }}>
																	{question?.type === 'mcq' && (
																		<div>
																			{
																				question.id === 3 ?
																					tags[questions[1].selectedOption]?.map((elem, index) => (
																						<div
																							key={index}
																							className="flex items-center gap-x-4 mt-2"
																						>
																							<Checkbox
																								checked={question.selectedOption === elem.tag_name}
																								onChange={() => optionSelected(question.id, elem.tag_name, index)}
																								value={question.selectedOption}
																							/>
																							<p className="text-base text-[#FFF]">
																								{elem.tag_name}
																							</p>
																						</div>
																					))
																					:
																					question?.options?.map((elem, index) => (
																						<div
																							key={index}
																							className="flex items-center gap-x-4 mt-2"
																						>
																							<Checkbox
																								checked={question.selectedOption === elem}
																								onChange={() => optionSelected(question.id, elem, index)}
																								value={question.selectedOption}
																							/>
																							<p className="text-base text-[#FFF]">
																								{elem}
																							</p>
																						</div>
																					))
																			}
																		</div>
																	)}
																	{question?.type === 'multi' && (
																		<div>
																			{question?.options?.map((elem, index) => (
																				<div
																					key={index}
																					className="flex items-center gap-x-4 mt-2"
																				>
																					<Checkbox
																						checked={multiOptionSelected.includes(elem)}
																						onChange={() => multiSelected(question.id, elem)}
																					/>
																					<p className="text-base text-[#FFF]">
																						{elem}
																					</p>
																				</div>
																			))}
																			{textAreaOptions.some(option => multiOptionSelected.includes(option)) ?
																				<Input.TextArea
																					placeholder="Write about your Sports or extra curricular achievement scholarships"
																					autoSize={{ minRows: 5, maxRows: 6 }}
																					className="h-10 lg:h-12 w-full px-4 border-none shadow-none rounded-l-lg rounded-r-none mt-5 bg-[#f2ecff] color-[white]"
																					value={textValue}
																					onChange={(e) => {
																						setTextValue(e.target.value);
																					}}
																				/>
																				:
																				''
																			}
																		</div>
																	)}
																	{question?.type === 'lead_form' && (
																		<div>
																			<Form.Item
																				name="full_name"
																				rules={[
																					{
																						required: true,
																						message: 'Please enter your full name!',
																					},
																				]}
																				className="w-full mb-4"
																			>
																				<input
																					type="text"
																					placeholder="Full Name"
																					className="w-full h-12 px-4 rounded-md focus:outline-2 focus:outline-[#6941C6]"
																					style={{
																						boxShadow: "0px 0px 14px 0px rgba(0, 0, 0, 0.10)"
																					}}
																				/>
																			</Form.Item>
																			<Form.Item
																				name="contact_number"
																				rules={[
																					{
																						required: true,
																						message: 'Please enter your contact number!',
																					},
																				]}
																				className="w-full mb-4"
																			>
																				<input
																					type="number"
																					placeholder="Contact Number"
																					className="w-full h-12 px-4 rounded-md focus:outline-2 focus:outline-[#6941C6]"
																					style={{
																						boxShadow: "0px 0px 14px 0px rgba(0, 0, 0, 0.10)"
																					}}
																				/>
																			</Form.Item>
																			<Form.Item
																				name="email_address"
																				rules={[
																					{
																						required: true,
																						message: 'Please enter your email address!',
																					},
																				]}
																				className="w-full mb-4"
																			>
																				<input
																					type="email"
																					placeholder="Email Address"
																					className="w-full h-12 px-4 rounded-md focus:outline-2 focus:outline-[#6941C6]"
																					style={{
																						boxShadow: "0px 0px 14px 0px rgba(0, 0, 0, 0.10)"
																					}}
																				/>
																			</Form.Item>
																			<Form.Item
																				name="dob"
																				rules={[
																					{
																						required: true,
																						message: 'Please enter your date of birth!',
																					},
																				]}
																				className="w-full mb-4"
																			>
																				<input
																					type="date"
																					placeholder="Date of birth"
																					className="w-full h-12 px-4 rounded-md focus:outline-2 focus:outline-[#6941C6]"
																					style={{
																						boxShadow: "0px 0px 14px 0px rgba(0, 0, 0, 0.10)"
																					}}
																				/>
																			</Form.Item>
																			<Form.Item
																				name="address"
																				rules={[
																					{
																						required: true,
																						message: 'Please enter your address!',
																					},
																				]}
																				className="w-full mb-4"
																			>
																				<input
																					type="text"
																					placeholder="Address"
																					className="w-full h-12 px-4 rounded-md focus:outline-2 focus:outline-[#6941C6]"
																					style={{
																						boxShadow: "0px 0px 14px 0px rgba(0, 0, 0, 0.10)"
																					}}
																				/>
																			</Form.Item>
																			<Form.Item
																				name="high_school_marks"
																				rules={[
																					{
																						required: true,
																						message: 'Please enter your high school marks!',
																					},
																				]}
																				className="w-full mb-4"
																			>
																				<input
																					type="number"
																					min={0}
																					max={1000}
																					placeholder="High School Marks"
																					className="w-full h-12 px-4 rounded-md focus:outline-2 focus:outline-[#6941C6]"
																					style={{
																						boxShadow: "0px 0px 14px 0px rgba(0, 0, 0, 0.10)"
																					}}
																				/>
																			</Form.Item>
																			<Form.Item
																				name="graduation_marks"
																				rules={[
																					{
																						required: true,
																						message: 'Please enter your graduation marks!',
																					},
																				]}
																				className="w-full mb-4"
																			>
																				<input
																					type="number"
																					min={0}
																					max={1000}
																					placeholder="Graduation Marks"
																					className="w-full h-12 px-4 rounded-md focus:outline-2 focus:outline-[#6941C6]"
																					style={{
																						boxShadow: "0px 0px 14px 0px rgba(0, 0, 0, 0.10)"
																					}}
																				/>
																			</Form.Item>
																			<Form.Item
																				name="study_area"
																				rules={[
																					{
																						required: true,
																						message: 'Please enter area of study!',
																					},
																				]}
																				className="w-full mb-4"
																			>
																				<input
																					type="text"
																					placeholder="Field/Area of study"
																					className="w-full h-12 px-4 rounded-md focus:outline-2 focus:outline-[#6941C6]"
																					style={{
																						boxShadow: "0px 0px 14px 0px rgba(0, 0, 0, 0.10)"
																					}}
																				/>
																			</Form.Item>
																			<Form.Item
																				name="income"
																				rules={[
																					{
																						required: true,
																						message: `Please enter your House hold income!`,
																					},
																				]}
																				className="w-full mb-4"
																			>
																				<input
																					type="number"
																					min={0}
																					max={10000000}
																					placeholder="Household income"
																					className="w-full h-12 px-4 rounded-md focus:outline-2 focus:outline-[#6941C6]"
																					style={{
																						boxShadow: "0px 0px 14px 0px rgba(0, 0, 0, 0.10)"
																					}}
																				/>
																			</Form.Item>
																			<Form.Item
																				name="dependents_no"
																				rules={[
																					{
																						required: true,
																						message: `Please enter number or dependents!`,
																					},
																				]}
																				className="w-full mb-4"
																			>
																				<input
																					type="number"
																					min={0}
																					max={100}
																					placeholder="Number of dependents"
																					className="w-full h-12 px-4 rounded-md focus:outline-2 focus:outline-[#6941C6]"
																					style={{
																						boxShadow: "0px 0px 14px 0px rgba(0, 0, 0, 0.10)"
																					}}
																				/>
																			</Form.Item>
																			<Form.Item
																				name="additional_information"
																				rules={[
																					{
																						required: false,
																						message: 'Please enter additional financial information!',
																					},
																				]}
																				className="w-full mb-4"
																			>
																				<input
																					type="text"
																					placeholder="Additional financial information"
																					className="w-full h-12 px-4 rounded-md focus:outline-2 focus:outline-[#6941C6]"
																					style={{
																						boxShadow: "0px 0px 14px 0px rgba(0, 0, 0, 0.10)"
																					}}
																				/>
																			</Form.Item>
																		</div>
																	)}
																	<p>{question.content}</p>
																</div>

															</div>
														)
													}
												</div>
											))
										}

										<div className='flex justify-end'>
											<button
												className="bg-[grey] text-white px-6 py-2 rounded-md text-md md:text-lg font-semibold mt-12"
												type="button"
												onClick={() => {
													if (questionNo > 1) {
														setCanContinue(true)
														setQuestionNo(preQuestionNo => preQuestionNo - 1)
													}
												}}
												style={{
													zIndex: 3,
												}}
											>
												Back
											</button>
											{
												questionNo === 11 ?
													<button
														className="bg-[#7F56D9] text-white px-5 py-3 ml-5 rounded-md text-md md:text-lg font-semibold mt-12"
														htmlType="submit"
														style={{
															zIndex: 3,
														}}
													>
														Apply Now
													</button>
													:
													<button
														className={`${(canContinue) ? 'bg-primary' : 'bg-[#6941C6]'}  text-white px-6 py-2 ml-5 rounded-md text-md md:text-lg font-semibold mt-12`}
														type="button"
														onClick={() => {
															if (canContinue) {
																nextStep()
															}
														}}
														style={{
															zIndex: 3,
														}}
													>
														Next
													</button>
											}
										</div>
									</Form>
								</div>
							)}

						</Transition>
					</div>
				</Col>

			</Row>
		</section>
	)
}