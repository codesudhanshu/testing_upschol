import FeatureOverview from "../components/landing_page/FeatureOverview";
import Partners from "../components/landing_page/ourPartners";
import GetinTouch from "../components/landing_page/GetinTouch";
import WhyUpschol from "../components/landing_page/whyUpschol";
import RightGuidance from "../components/landing_page/RightGuidance";
import SucessStories from "../components/landing_page/SucessStories";
import FAQ from "../components/landing_page/faq";
import Courses from "../components/landing_page/Courses";
import { TagCategories } from "../config";
import Tag from "../model/tags";
const Promise = require("promise");
import dbConnect from "../dbConnect";
import { useEffect, useState } from "react";
import Advantages from "../components/landing_page/Advantages";
import collegeModel from "../model/collegeModel";
import Banner from "../components/landing_page/Banner";
import InternationCollaborators from "../components/landing_page/InternationalCollaborators";
import blogModel from "../model/blogModel";
import BlogSection from "../components/landing_page/BlogSection";
import Scholarship from "../components/landing_page/Scholarship";
import HorizontallyScrollingSteps from "../components/landing_page/HorizontalScrollingSteps";
import Career from "../components/landing_page/careers";
import CarrerFairs from "../components/landing_page/CarrerFairs";
import CarrerFairsBlog from "../components/landing_page/CarrerFairsBlog";
import MajorModel from "../model/major";

export async function getServerSideProps({ req, query, resolvedUrl }) {
	await dbConnect();
	async function countColleges(tags) {
		let newTags = [];
		for (let i = 0; i < tags.length; i++) {
			let count = await collegeModel.countDocuments({ tags: tags[i]._id, hidecollege: true });
			let college = await collegeModel.find({ tags: tags[i]?._id }).populate([{ path: "banner_image", model: 'file' }]).exec()

			newTags.push({ ...tags[i]._doc, collegeCount: count, college: college })
		}
		return newTags;
	}

	const colleges = await collegeModel.find({}).limit(50);
	const major = await MajorModel.find({});
	const blogs = await blogModel.find({}).limit(3);

	let [tag1, tag2, tag3, tag4, tag5, tag6, tag7, tag8] = await Promise.all([
		Tag.find({ tag_category: TagCategories[0] }),
		Tag.find({ tag_category: TagCategories[1] }),
		Tag.find({ tag_category: TagCategories[2] }),
		Tag.find({ tag_category: TagCategories[3] }),
		Tag.find({ tag_category: TagCategories[4] }),
		Tag.find({ tag_category: TagCategories[5] }),
		Tag.find({ tag_category: TagCategories[6] }),
		Tag.find({ tag_category: TagCategories[7] }),
	]);

	tag1 = await countColleges(tag1);
	tag2 = await countColleges(tag2);
	tag3 = await countColleges(tag3);
	tag4 = await countColleges(tag4);
	tag5 = await countColleges(tag5);
	tag6 = await countColleges(tag6);
	tag7 = await countColleges(tag7);
	tag8 = await countColleges(tag8);

	const obj = {
		[TagCategories[0]]: tag1,
		[TagCategories[1]]: tag2,
		[TagCategories[2]]: tag3,
		[TagCategories[3]]: tag4,
		[TagCategories[4]]: tag5,
		[TagCategories[5]]: tag6,
		[TagCategories[6]]: tag7,
		[TagCategories[7]]: tag8
	};
	return {
		props: {
			tags: JSON.parse(JSON.stringify(obj)),
			blogs: JSON.parse(JSON.stringify(blogs)),
			major: JSON.parse(JSON.stringify(major)),
			college: JSON.parse(JSON.stringify(colleges))
		},
	};
}

export default function Page1(props) {
	const [isMobile, setIsMobile] = useState(null);
	useEffect(() => {
		const handleResize = () => {
			setIsMobile(window.innerWidth < 786);
		};
		handleResize();
		window.addEventListener('resize', handleResize);
		return () => {
			window.removeEventListener('resize', handleResize);
		};
	}, []);
	return (
		<div id="landingContainer" className="scroll-smooth bg-background_color"
		>

			<Banner
				pg_course={props?.tags['PG COURSE']}
				ug_course={props?.tags['UG COURSE']}
			/>
			<FeatureOverview />
			<Courses categories={TagCategories} tags={props?.tags} isMobile={isMobile} />
			<WhyUpschol />
			<SucessStories />
			{/* <CarrerFairs />
			<CarrerFairsBlog /> */}
			<HorizontallyScrollingSteps />
			<Scholarship categories={TagCategories} tags={props?.tags} landdingPage={true} />
			<Partners college={props?.college} />
			{/* <Advantages /> */}
			<InternationCollaborators />
			<RightGuidance />
			<FAQ />
			<BlogSection
				blogs={props?.blogs}
			/>
			<GetinTouch />
		</div >
	);
}
