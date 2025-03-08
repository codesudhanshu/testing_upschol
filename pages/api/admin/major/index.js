import MajorModel from "../../../../model/major";
import dbConnect from "../../../../dbConnect";
import { courseDuration } from "../../../../config";
export default async function Major(req, res) {

	const { method } = req;
	const college_id = req.query.college_id
	await dbConnect();

	switch (method) {
		case 'GET':
			try {
				const major = await MajorModel.find({ college_id: college_id }).populate("course_id").exec();
				res.status(200).json({ success: true, data: major });
			} catch (error) {
				res.status(400).json({ success: false });
			}
			break;
		case 'POST':
			try {
				req.body?.fees?.other_fees?.forEach((e)=>e.duration=courseDuration[0]) 
				console.log(req.body)
				if(req.body?.specialization) req.body.specialization = req.body.specialization?.map((e)=>e)
				if(req.body?.eligibility) req.body.eligibility = req.body.eligibility?.map((e)=>e)
				const major = await MajorModel.create(req.body);
				res.status(200).json({ success: true, data: major });
			} catch (error) {
				console.log(error)
				res.status(400).json({ success: false,data:'Some Internal error Occurred' });
			}
			break;

		default:
			res.status(400).json({ success: false });
			break
	}

}

