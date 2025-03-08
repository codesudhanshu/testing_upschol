import Image from "next/image"
import Link from "next/link";
import banner5 from "../../public/Frame 390.png"
import banner6 from "../../public/Frame 391.png"
import { IoIosArrowForward } from "react-icons/io";
import { Card, Col, Row, Typography } from "antd";
export default function WhatMakesus() {
	return (
		<section className="py-16">
			<div id="what-makes-us-different" >
				<div
					style={{ height: 'auto' }}
					className="text-base font-semibold"
				>
					<div>
						<h1 style={{ color: "#6941C6", fontFamily: "Poppins" }} className="text-center">
							What makes us different
						</h1>
						<h1 style={{ fontFamily: "Poppins" }} className="text-center pt-4 text-2xl lg:text-4xl">
							Fostering a playful & engaging learning <br /> environment
						</h1>
					</div>

					<Row
						className="mt-10"
						gutter={[]}
						style={{
							padding: "0 10%"
						}}
					>
						<Col
							xs={{ span: 24 }}
							sm={{ span: 24 }}
							md={{ span: 8 }}
							lg={{ span: 8 }}
							xl={{ span: 8 }}
							xxl={{ span: 8 }}
						>
							<Card
								hoverable
								className="home-hoverable-card mt-8  lg:ml-3 lg:mt-0"
								style={{
									backgroundColor: '#FFFFFF',
									borderRadius: '12px',
									height: '55vh',
									display: 'flex',
									justifyContent: 'center',
									alignItems: 'center',
									flexDirection: 'column',

								}}
								bodyStyle={{
									padding: '12px'
								}}
							>
								<div
									style={{
										display: 'flex',
										alignItems: 'center',
										justifyContent: 'start',
										width: '100%',
										flexDirection: 'row',
										marginBottom: '24px'
									}}
								>
									<Image
										alt="UI Icon"
										className=""
										src={banner5}
										style={{
											objectFit: "contain",
										}}
									/>
									<Typography.Title
										level={4}
										style={{
											fontWeight: '700',
											margin: '0 0 0 8px',
										}}
									>
										User Experience
									</Typography.Title>
								</div>
								<div
									style={{
										margin: '24px 0'
									}}
								>
									<Typography.Text
										style={{
											color: '#646464',
											fontWeight: '400',
											margin: 0
										}}
									>
										Lessons on design that cover the most recent developments.
									</Typography.Text>
								</div>
								<div
									style={{
										marginTop: '24px',
										display: 'flex',
										flexDirection: 'row',
										alignItems: 'center',
										justifyContent: 'start',
									}}
								>
									<Typography.Text
										style={{
											color: '#7F56D9',
											fontWeight: '500',
											margin: '0'
										}}
									>
										<Link style={{ color: "#7F56D9", boxShadow: "none" }} className="link" href="/">Learn More</Link>
									</Typography.Text>
									<Link style={{ color: "#7F56D9", boxShadow: "none" }} className="link" href="/" ><IoIosArrowForward style={{
										color: "#7F56D9",
										marginLeft: '8px'
									}} className="learn-more-forward-icon" /></Link>
								</div>
							</Card>
						</Col>
						<Col
							xs={{ span: 24 }}
							sm={{ span: 24 }}
							md={{ span: 8 }}
							lg={{ span: 8 }}
							xl={{ span: 8 }}
							xxl={{ span: 8 }}
						>
							<Card
								hoverable
								className="home-hoverable-card mt-8 md:ml-3 lg:ml-3 lg:mt-0"
								style={{
									backgroundColor: '#FFFFFF',
									borderRadius: '12px',
									height: '55vh',
									display: 'flex',
									justifyContent: 'center',
									alignItems: 'center',
									flexDirection: 'column',

								}}
								bodyStyle={{
									padding: '12px'
								}}
							>
								<div
									style={{
										display: 'flex',
										alignItems: 'center',
										justifyContent: 'start',
										width: '100%',
										flexDirection: 'row',
										marginBottom: '24px'
									}}
								>
									<Image
										alt="Web Dev Icon"
										className=""
										src={banner6}
										style={{
											objectFit: "contain",
										}}
									/>
									<Typography.Title
										level={4}
										style={{
											fontWeight: '700',
											margin: '0 0 0 8px',
										}}
									>
										Web Development
									</Typography.Title>
								</div>
								<div
									style={{
										margin: '24px 0'
									}}
								>
									<Typography.Text
										style={{
											color: '#646464',
											fontWeight: '400',
											margin: 0
										}}
									>
										Classes in development that cover the most recent advancements in web.
									</Typography.Text>
								</div>
								<div
									style={{
										marginTop: '24px',
										display: 'flex',
										flexDirection: 'row',
										alignItems: 'center',
										justifyContent: 'start',
									}}
								>
									<Typography.Text
										style={{
											color: '#7F56D9',
											fontWeight: '500',
											margin: '0'
										}}
									>
										<Link style={{ color: "#7F56D9", boxShadow: "none" }} className="link" href="/">Learn More</Link>
									</Typography.Text>
									<Link style={{ color: "#7F56D9", boxShadow: "none" }} className="link" href="/" ><IoIosArrowForward style={{
										color: "#7F56D9",
										marginLeft: '8px'
									}} className="learn-more-forward-icon" /></Link>
								</div>
							</Card>
						</Col>
						<Col
							xs={{ span: 24 }}
							sm={{ span: 24 }}
							md={{ span: 8 }}
							lg={{ span: 8 }}
							xl={{ span: 8 }}
							xxl={{ span: 8 }}
						>
							<Card
								hoverable
								className="home-hoverable-card mt-8 md:ml-3 lg:ml-3 lg:mt-0"
								style={{
									backgroundColor: '#FFFFFF',
									borderRadius: '12px',
									height: '55vh',
									display: 'flex',
									justifyContent: 'center',
									alignItems: 'center',
									flexDirection: 'column',

								}}
								bodyStyle={{
									padding: '12px'
								}}
							>
								<div
									style={{
										display: 'flex',
										alignItems: 'center',
										justifyContent: 'start',
										width: '100%',
										flexDirection: 'row',
										marginBottom: '24px'
									}}
								>
									<Image
										alt="Web Dev Icon"
										className=""
										src={banner6}
										style={{
											objectFit: "contain",
										}}
									/>
									<Typography.Title
										level={4}
										style={{
											fontWeight: '700',
											margin: '0 0 0 8px',
										}}
									>
										Web Development
									</Typography.Title>
								</div>
								<div
									style={{
										margin: '24px 0'
									}}
								>
									<Typography.Text
										style={{
											color: '#646464',
											fontWeight: '400',
											margin: 0
										}}
									>
										Classes in development that cover the most recent advancements in web.
									</Typography.Text>
								</div>
								<div
									style={{
										marginTop: '24px',
										display: 'flex',
										flexDirection: 'row',
										alignItems: 'center',
										justifyContent: 'start',
									}}
								>
									<Typography.Text
										style={{
											color: '#7F56D9',
											fontWeight: '500',
											margin: '0'
										}}
									>
										<Link style={{ color: "#7F56D9", boxShadow: "none" }} className="link" href="/">Learn More</Link>
									</Typography.Text>
									<Link style={{ color: "#7F56D9", boxShadow: "none" }} className="link" href="/" ><IoIosArrowForward style={{
										color: "#7F56D9",
										marginLeft: '8px'
									}} className="learn-more-forward-icon" /></Link>
								</div>
							</Card>
						</Col>
					</Row>
				</div>
			</div>
		</section>
	)
}