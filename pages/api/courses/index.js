import dbConnect from "../../../dbConnect";
import courseModel from "../../../model/course";
import collegeModel from "../../../model/collegeModel";
import MajorModel from "../../../model/major";
import TagModel from "../../../model/tags";

export default async function handler(req, res){
	const {
		method
	} = req;
	await dbConnect();
	switch(method) {
		case 'GET':
			try {
				let courses = await courseModel.find({}).select('name')
				for(let i=0; i<courses.length;i++){
					const colleges = await MajorModel.distinct("college_id", {
						course_id: courses[i]._id
					}).populate('college_id');
					const collegeDetails = await collegeModel.find({
						_id: {
							$in: colleges
						}
					}).select('college_name address university rating logo slug approvals');

					courses[i] = {
						...courses[i]._doc,
						colleges: collegeDetails
					}
				}
				const tags = await TagModel.find({});
				res.status(200).json({
					success: true,
					data: {
						courses,
						tags
					}
				});
			} catch (err) {
				console.log(err);
				res.status(400).json({
					success: false,
					message: "Something went wrong"
				});
			}
			break;
		default:
			res.status(400).json({
				success: false,
				message: "Invalid request"
			});
			break;
	}
}