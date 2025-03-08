import collegeModel from "../../model/collegeModel";
// import MajorModel from "../../model/major";
import dbConnect from "../../dbConnect";



export default async function Major(req, res) {

	const { method } = req;
	const { college } = req.query;

	await dbConnect();

	switch (method) {
		case 'GET':
			try {
				var regexp = new RegExp(college, "i");

				const college_res = await collegeModel.find({ college_name: regexp }).populate("banner_image").exec();
				res.status(200).json({ success: true, data: college_res });
			}
			catch (error) {
				res.status(400).json({ success: false });

			}
			break;

		default:
			res.status(400).json({ success: false });
			break

	}
}