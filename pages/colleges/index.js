import { useCallback, useEffect, useRef, useState } from "react";
import { Col, Grid, Card, Row, Checkbox, Slider, InputNumber, Spin, message, Pagination } from "antd";
import { AiFillStar,AiOutlineStar } from "react-icons/ai";
import { IoIosSearch } from "react-icons/io";
import { FaChevronRight, FaChevronUp, FaLocationDot, } from "react-icons/fa6";
import LeadModal from "../../components/lead_Modal";
import Image from "next/image";
import collegeModel from "../../model/collegeModel";
import courseModel from "../../model/course";
import dbConnect from "../../dbConnect";
import { Button, Input, Typography, Popover, } from "antd"
import { useRouter } from 'next/router'
import { useCookies } from 'react-cookie';
import Tag from '../../model/tags'
import { _fetch } from '../../_fetch'
const Promise = require('promise');
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
const { useBreakpoint } = Grid;
import { FaTimes } from 'react-icons/fa';
import { CloseOutlined } from '@ant-design/icons';
import { getS3Url } from "../../lib/s3";
export async function getServerSideProps(context) {

	await dbConnect();
	const [college, tags] = await Promise.all([
		collegeModel.find({}).populate([{ path: "banner_image", model: 'file' }, { path: "approvals", model: 'approval' }]).lean(),
		Tag.find({})
	]);
	const collegeProp = college?.map((e) => ({ ...e, rating: Math.min(e.rating, 5) }))
	const courses = await courseModel.find({}).lean();
	return {
		props: {
			college: JSON.parse(JSON.stringify(collegeProp)),
			tags: JSON.parse(JSON.stringify(tags)),
			courses: JSON.parse(JSON.stringify(courses))
		},
	}
}

function CollegeCard({
	college,
	setShowModal,
	setCollege,
	cookies,
	router,
	getStars = () => { },
	screen
}) {
	return (
		<div
			className="w-full p-4 shadow-lg rounded-lg flex flex-col lg:flex-row gap-4 cursor-pointer hover:shadow-2xl transition-all duration-300 bg-white"
			onClick={() => {
				if (!cookies.user) {
					setCollege(college)
					setShowModal(true)
				} else {
					router.push(`/colleges/${college?.slug}`)
				}
			}}
		>
			<div
				className="w-full lg:w-1/4 rounded-lg overflow-hidden h-80"
			>
				<Image
					key={college?._id}
					className="h-full w-full object-cover object-center"
					loader={({ src }) => getS3Url(src)}
					src={`${college?.banner_image?.path}`}
					alt={college?.college_name}
					width={512}
					height={512}
				/>
			</div>
			<div
				className="flex flex-col w-full lg:w-3/4 gap-y-4"
			>
				<div
					className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-x-4"
				>
					<div
						className="flex items-center gap-x-4"
					>
						<div
							className="border border-[#00000040] rounded-lg flex justify-center items-center p-2"
						>
							<Image
								key={college?._id}
								className="w-8 min-w-8 min-h-8 h-8 object-contain"
								loader={({ src }) => getS3Url(src)}
								src={college?.logo}
								width={56}
								height={56}
								alt={college?.college_name}
							/>
						</div>
						<h2
							className="font-semibold text-lg lg:text-xl"
						>
							{college?.college_name}
						</h2>
					</div>
					<div
						className="flex items-center gap-x-1 shrink-0  w-full lg:w-auto justify-end"
					>
						{
							getStars(college?.rating)
						}
					</div>
				</div>
				<div
					className="flex items-center gap-x-4 text-[#00000080]"
				>
					<FaLocationDot
						size={24}
					/>
					<p
						className="text-base"
					>
						{
							college?.address?.city ? `${college?.address?.city}, ${college?.address?.state}` : college?.address?.state
						}
					</p>
				</div>
				<p
					className="text-base text-[#00000080] leading-relaxed text-wrap break-words"
				>
					{
						!screen.md ? (
							`${college?.description?.slice(0, 200)}...`
						) : (
							`${college?.description?.slice(0, 400)}...`
						)
					}
				</p>
				<div
					className="flex items-center gap-x-4 lg:mt-auto"
				>
					{
						college?.approvals?.slice(0, 3)?.map((approval) => (
							<Image
								key={approval?._id}
								src={approval?.image}
								width={100}
								height={100}
								alt={approval?.name}
								className="h-12 w-12 object-contain"
							/>
						))
					}
					{
						college?.approvals?.length > 3 && (
							<Typography.Text>
								{`+ ${college?.approvals?.length - 3} more`}
							</Typography.Text>
						)
					}
				</div>
			</div>
		</div>
	)
}

const Modal = ({ isVisible, onClose, onApply, children, onClear }) => {
	const content = (
		<div className="bg-white p-6 rounded-lg shadow-lg max-w-2xl w-full relative">
			<div className="flex justify-between items-center mb-4">
				<h2 className="text-xl font-bold">Filters</h2>
				<Button className="text-black" onClick={onClose} type="text" icon={<CloseOutlined />} />
			</div>
			{children}
			<div className="mt-4 flex justify-end gap-x-2">
				<Button className="bg-transparent text-violet-700 font-semibold pt-2 pb-7 rounded border border-violet-700" onClick={onClear}>
					Clear All
				</Button>
				<Button className="bg-violet-700 text-white pt-2 pb-7 rounded" type="primary" onClick={onApply}>
					Apply Filters
				</Button>
			</div>
		</div>
	);

	return (
		<Popover
			content={content}
			trigger="click"
			open={isVisible}
			onOpenChange={(visible) => { if (!visible) onClose(); }}
			placement="bottom"
			overlayStyle={{ minWidth: '300px' }}
		>
			{({ ref }) => (
				<button ref={ref} className="mt-2 text-blue-500" onClick={onApply}>
					Show More Filters
				</button>
			)}
		</Popover>
	);
};


export default function Page1(props) {
	const colleges = props?.college;
	const tags = props?.tags;
	const popularFilters = props.courses.map((course) => ({ title: course?.name, value: course?._id }));
	const filterChangeTimeOut = useRef(null);
	const router = useRouter()
	const screen = useBreakpoint();
	const { query } = router
	const tagId = query?.tagId;
	const streamId = query?.streamId;
	const initialFeeRange = [0, 5000000]
	const handleShowMoreTags = () => {
		setIsModalVisible(true);
	};
	const handleShowMorePopularFilters = () => {
		setIsPopularFiltersModalVisible(true);
	};
	const handleCloseModal = () => {
		setIsModalVisible(false);
	};
	const handleClosePopularFiltersModal = () => {
		setIsPopularFiltersModalVisible(false);
	};


	const [isModalVisible, setIsModalVisible] = useState(false);
	const [isPopularFiltersModalVisible, setIsPopularFiltersModalVisible] = useState(false);
	const [displayedTags, setDisplayedTags] = useState([]);
	const [displayedPopularFilters, setDisplayedPopularFilters] = useState(popularFilters.slice(0, 6));
	const [isShowingAllPopularFilters, setIsShowingAllPopularFilters] = useState(false);



	const [loading, setLoading] = useState(false);
	const [cookies] = useCookies(['user']);
	const [showModal, setShowModal] = useState(false);
	const [collegeQ, setCollegeQ] = useState();
	const [data, setData] = useState(colleges);
	const [college, setCollege] = useState([]);
	const [feeRange, setFeeRange] = useState(initialFeeRange);
	const [isFiltersExpanded, setIsFiltersExpanded] = useState(true);
	const initialStreamFilter = streamId ? [streamId] : [];
	const [stream, setStream] = useState(initialStreamFilter);
	const initialTagsFilter = tagId ? [tagId] : [];
	const [tagsFilter, setTagsFilter] = useState(initialTagsFilter);
	const [searchString, setSearchString] = useState("");
	const [pageData, setPageData] = useState({
		page: 1,
		limit: 10,
		total: 0
	});

	useEffect(() => {
		if (tagsFilter.length === 0) {
			setDisplayedTags(tags.slice(0, 6));
		} else {
			setDisplayedTags(tags.filter((tag) => tagsFilter.includes(tag._id)));
		}
	}, [tagsFilter, tags]);

	useEffect(() => {
		if (isPopularFiltersModalVisible) {
			setDisplayedPopularFilters(popularFilters);
		} else {
			setDisplayedPopularFilters(popularFilters.slice(0, 6));
		}
	}, [isPopularFiltersModalVisible]);

	function getStars(rating) {
		let arr = [];
		let fullStars = Math.floor(rating);
		let fractionalPart = rating % 1;
		let emptyStars = 5 - fullStars - (fractionalPart > 0 ? 1 : 0);

		for (let i = 0; i < fullStars; i++) {
			arr.push(<AiFillStar style={{ color: '#ffc107', marginLeft: 3 }} />);
		}

		if (fractionalPart > 0) {
			arr.push(
				<div style={{ position: 'relative', marginLeft: 3 }}>
					<AiOutlineStar style={{ color: "#D3D3D3" }} />
					<div style={{
						position: 'absolute',
						top: 0,
						left: 0,
						width: `${fractionalPart * 100}%`,
						height: '100%',
						overflow: 'hidden',
					}}>
						<AiFillStar style={{ color: '#ffc107' }} />
					</div>
				</div>
			);
		}

		for (let i = 0; i < emptyStars; i++) {
			arr.push(<AiOutlineStar style={{ color: "#D3D3D3", marginLeft: 3 }} />);
		}

		return arr;
	}


	const searchCollege = async (e) => {
		e.preventDefault();
		if (collegeQ) setSearchString(collegeQ);
	}

	const handleStream = async (e) => {
		const { value, checked } = e.target;
		if (checked) {
			setStream([...stream, value])
		} else {
			setStream(stream.filter((e) => e !== value))
		}
	}
	const handleFilterChange = async () => {
		try {
			setLoading(true);
			const feeRangeJSON = {
				low: feeRange[0],
				high: feeRange[1]
			};
			let url = `/api/search/?page=${pageData.page}&limit=${pageData.limit}`;
			if (stream.length > 0) {
				url += `&stream=${JSON.stringify(stream)}`;
			}
			if (tagsFilter.length > 0) {
				url += `&tagIds=${JSON.stringify(tagsFilter)}`;
			}
			if (searchString !== "") {
				url += `&searchString=${searchString}`;
			}
			if (feeRangeJSON.low !== initialFeeRange[0] || feeRangeJSON.high !== initialFeeRange[1]) {
				url += `&feeRange=${JSON.stringify(feeRangeJSON)}`;
			}

			let res = await _fetch(url);
			res = await res.json();
			if (res.success) {
				setData(
					res?.data?.colleges
				);
				setPageData({
					...pageData,
					total: res?.data?.total
				});
			} else {
				message.error("Something went wrong");
			}
		} catch (error) {
			console.log(error)
		} finally {
			setLoading(false);
		}
	};
	const handleTagFilter = (e) => {
		const { value, checked } = e.target;
		setSelectedTags(prevState =>
			checked ? [...prevState, value] : prevState.filter(tag => tag !== value)
		);
	};

	const handlePopularFilter = (e) => {
		const { value, checked } = e.target;
		setSelectedPopularFilters(prevState =>
			checked ? [...prevState, value] : prevState.filter(filter => filter !== value)
		);
	};
	const handleApplyFilters = async () => {
		setTagsFilter(selectedTags);
		setStream(selectedPopularFilters);
		await handleFilterChange();
		setIsModalVisible(false);
		setIsPopularFiltersModalVisible(false);
	};

	const handleClearFilters = () => {
		setSelectedTags([]);
		setSelectedPopularFilters([]);
	};

	const [selectedTags, setSelectedTags] = useState(tagsFilter);
	const [selectedPopularFilters, setSelectedPopularFilters] = useState(stream);

	useEffect(() => {
		if (filterChangeTimeOut.current) {
			clearTimeout(filterChangeTimeOut.current);
		}
		filterChangeTimeOut.current = setTimeout(() => {
			handleFilterChange();
		}, 500);
		return () => clearTimeout(filterChangeTimeOut.current);
	}, [feeRange, stream, tagsFilter, searchString, pageData.page]);

	useEffect(() => {
		if (!tagsFilter?.includes(tagId) && tagId) {
			setTagsFilter((prev) => [tagId])
		} else {
			setTagsFilter(initialTagsFilter)
		}

	}, [tagId]);

	useEffect(() => {
		if (!stream?.includes(streamId) && streamId) {
			setStream((prev) => [streamId])
		} else {
			setStream(initialStreamFilter)
		}

	}, [streamId]);


	useEffect(() => {
		const handleResize = () => {
			if (window.innerWidth < 768) {
				setIsFiltersExpanded(false);
			} else {
				setIsFiltersExpanded(true);
			}
		}
		window.addEventListener('resize', handleResize);
		return () => window.removeEventListener('resize', handleResize);
	}, []);

	if (loading) {
		return (
			<div
				className="w-full h-screen flex justify-center items-center"
			>
				<Spin
					size="large"
				/>
			</div>
		)
	}

	return (
		<>
			<div className="bg-background_color">
				<form onSubmit={searchCollege}>
					<div
						className="w-full flex flex-col justify-center items-center py-8 md:py-16 lg:py-20 px-4 lg:px-0"
						style={{
							backgroundImage: 'url(/assets/common/search-bg.png)',
							backgroundSize: 'cover',
							backgroundPosition: 'center',
						}}
					>
						<Typography.Title
							level={2}
							style={{
								color: 'white',
								textAlign: 'center',
								fontWeight: '700',
							}}
						>
							Over 1,32,000 courses across 56 languages
						</Typography.Title>
						<div
							className="mt-4 flex items-center justify-center w-full md:w-3/4 lg:w-1/2"
						>
							<Input
								placeholder="Search Colleges"
								className="h-10 lg:h-12 w-4/5 px-4 border-none shadow-none rounded-l-lg rounded-r-none"
								value={collegeQ}
								onChange={(e) => {
									if (e.target.value === "") {
										setCollegeQ(e.target.value);
										setSearchString("");
									} else {
										setCollegeQ(e.target.value);
									}
								}}
							/>
							<Button
								htmlType="submit"
								className="h-10 lg:h-12 w-1/5 shadow-none rounded-l-none rounded-r-lg border-none flex justify-center items-center"
								style={{
									backgroundColor: '#F4EBFF',
									color: '#7F56D9',
								}}
								onClick={searchCollege}
							>
								<IoIosSearch
									size={25}
								/>
							</Button>
						</div>
					</div>
				</form>
			</div>
			<Row style={{
				background: '#14081E'
			}}>
				<Col
					xs={24}
					md={8}
					lg={6}

				>
					<div
						className="p-4 lg:p-6 xl:p-8 3xl:p-10 w-full h-full text-white"
					>
						<div
							className="flex w-full justify-between items-center gap-x-4"
						>
							<div
								className="flex items-center gap-x-4"
								onClick={() => {
									if (!screen.md) {
										setIsFiltersExpanded(!isFiltersExpanded);
									}
								}}
							>
								<h4
									className="text-lg lg:text-xl font-semibold"
								>
									Filters

								</h4>
								{
									!screen.md && (
										isFiltersExpanded ? (
											<FaChevronUp
												size={16}
											/>
										) : (
											<FaChevronRight
												size={16}
											/>
										)
									)
								}
							</div>

							<button
								className="border-2 rounded-lg border-[#7F56D9] px-5 py-1 text-[#7F56D9]"
								onClick={() => {
									setStream([]);
									setTagsFilter([]);
									setCollegeQ("");
									setSearchString("");
									setFeeRange(initialFeeRange);
									if (!screen.md) {
										setIsFiltersExpanded(false);
									}
								}}
							>
								Reset Filter
							</button>
						</div>
						{
							isFiltersExpanded && (
								<div className="flex flex-col gap-y-4 mt-4 custom-checkbox">
									<div>
										{
											(popularFilters.length > 6 ? popularFilters.slice(0, 6) : popularFilters).map((filter, index) => (
												<div key={index} className="flex items-center gap-x-4 mb-4">
													<Checkbox
														checked={stream.find((e) => e === filter.value)}
														onChange={handleStream}
														value={filter.value}
													/>
													<p className="font-medium text-white">{filter.title}</p>
												</div>
											))
										}
										{popularFilters.length > 6 && !isPopularFiltersModalVisible && (
											<button
												className="mt-2 text-blue-500"
												onClick={handleShowMorePopularFilters}
											>
												Show More Filters
											</button>
										)}

										<Modal isVisible={isPopularFiltersModalVisible} onClose={handleClosePopularFiltersModal} onApply={handleApplyFilters} onClear={handleClearFilters}>
											<p className="my-2 font-medium text-black">All Popular Filters</p>
											<div className="tags-container">
												{popularFilters?.map((filter, index) => (
													<div key={index} className="tag-item">
														<div className="relative flex items-center justify-center">
															<input
																type="checkbox"
																checked={selectedPopularFilters.includes(filter?.value)}
																onChange={handlePopularFilter}
																value={filter?.value}
																className="new-checkbox"
															/>
															{selectedPopularFilters.includes(filter?.value) && <span className="checkmark">✓</span>}
														</div>
														<p className="font-medium text-black">{filter?.title}</p>
													</div>
												))}
											</div>
										</Modal>
									</div>

									<div className="my-2 flex flex-col gap-y-2">
										<p className="font-medium">Fees</p>
										<div className="flex justify-between items-center gap-x-4">
											<InputNumber
												value={feeRange[0]}
												onChange={(value) => setFeeRange([value, feeRange[1]])}
												className="w-full"
												min={initialFeeRange[0]}
												max={initialFeeRange[1]}
												formatter={(value) => `₹ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
												parser={(value) => value.replace(/\₹\s?|(,*)/g, '')}
											/>
											<InputNumber
												value={feeRange[1]}
												onChange={(value) => setFeeRange([feeRange[0], value])}
												className="w-full"
												min={initialFeeRange[0]}
												max={initialFeeRange[1]}
												formatter={(value) => `₹ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
												parser={(value) => value.replace(/\₹\s?|(,*)/g, '')}
											/>
										</div>
									</div>

									<Slider
										range
										value={feeRange}
										min={initialFeeRange[0]}
										max={initialFeeRange[1]}
										className="mx-4 custom-slider"
										onChange={(value) => setFeeRange(value)}
									/>
									<p className="my-2 font-medium">Tags</p>
									<div>{displayedTags.map((tag, index) => (
										<div key={index} className="flex items-center gap-x-4 mb-4">
											<Checkbox
												checked={tagsFilter.find((e) => e === tag._id)}
												onChange={handleTagFilter}
												value={tag?._id}
											/>
											<p className="font-medium">{tag?.tag_name}</p>
										</div>
									))}
									<button
										className="mt-2 text-blue-500"
										onClick={handleShowMoreTags}
									>
											Show More Filters
									</button>
									<Modal isVisible={isModalVisible} onClose={handleCloseModal} onApply={handleApplyFilters} onClear={handleClearFilters}>
										<p className="my-2 font-medium text-black">All Tags</p>
										<div className="tags-container">
											{tags.map((tag, index) => (
												<div key={index} className="tag-item">
													<div className="relative flex items-center justify-center">
														<input
															type="checkbox"
															checked={selectedTags.includes(tag._id)}
															onChange={handleTagFilter}
															value={tag._id}
															className="new-checkbox"
														/>
														{selectedTags.includes(tag._id) && (
															<FontAwesomeIcon
																icon={faCheck}
																className="check-icon"
															/>
														)}
													</div>
													<p className="font-medium text-black">{tag.tag_name}</p>
												</div>
											))}
										</div>
									</Modal>

									</div>

								</div>
							)
						}

					</div>
				</Col>
				<Col
					xs={24}
					md={16}
					lg={18}
				>
					<div
						className="flex flex-col gap-y-4 p-4 lg:p-6 xl:p-8 3xl:p-10 w-full h-full bg-red"
					>
						{
							data?.length === 0 ? (
								<div
									className="flex justify-center items-center py-32"
								>
									<h2
										className="font-medium text-xl"
									>
										No College Found
									</h2>
								</div>
							) : (
								data?.map((college) => (
									<CollegeCard
										key={college?._id}
										college={college}
										setShowModal={setShowModal}
										setCollege={setCollege}
										cookies={cookies}
										router={router}
										getStars={getStars}
										screen={screen}
									/>
								))
							)
						}
					</div>
				</Col>
			</Row>
			<div
				className="w-full flex justify-center items-center py-4 bg-background_color text-white"
			>
				<Pagination
					showSizeChanger={false}
					current={pageData.page}
					pageSize={pageData.limit}
					total={pageData.total}
					onChange={(page) => {
						setPageData({
							...pageData,
							page,
						});
					}}
					style={{
						backgroundColor: 'white',
					}}

				/>
			</div>
			<LeadModal showModal={showModal} setShowModal={setShowModal} college={college} courses={tags} />
		</>
	)
};