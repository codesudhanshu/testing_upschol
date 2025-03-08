import MajorModel from "../../../../model/major";
import dbConnect from "../../../../dbConnect";
import { courseDuration } from "../../../../config";
export default async function College(req, res) {

	const { method } = req;
	await dbConnect();

	switch (method) {
		case 'PATCH': {
			try {
				console.log(req.body)
				req.body?.fees?.other_fees?.forEach((e)=>e.duration=courseDuration[0]) 
				if(req.body?.specialization) req.body.specialization = req.body.specialization?.map((e)=>e)
				if(req.body?.eligibility) req.body.eligibility = req.body.eligibility?.map((e)=>e)
				console.log(req.body.duration_unit)
				const major = await MajorModel.findByIdAndUpdate(req.query.id, {$set:req.body}, { new: true });
				res.status(200).json({ success: true, data: major })
			}
			catch (error) {
				console.log(error,302);
				res.status(400).json({ success: false })
			}
			break
		}
		case 'GET': {
			try {
				const major = await MajorModel.findById(req.query.id);
				res.send(major);
			}
			catch (error) {
				res.status(400).json({ success: false })
			}
			break;
		}
		case 'DELETE': {
			try {
				const major = await MajorModel.findByIdAndDelete(req.query.id);
				res.send(major);
			}
			catch (error) {
				res.status(400).json({ success: false })
			}
			break;
		}

		default:
			res.status(400).json({ success: false })
			break
	}

} 