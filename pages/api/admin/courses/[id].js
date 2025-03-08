import courseModel from "../../../../model/course";
import dbConnect from "../../../../dbConnect";
export default async function College(req, res) {

	const { method } = req;
	await dbConnect();

	switch (method) {
		case 'PATCH': {
			try {
				const course = await courseModel.findByIdAndUpdate(req.query.id, req.body, { new: true });
				res.status(200).json({ success: true, data: course })
			}
			catch (error) {
				res.status(400).json({ success: false });
			}
			break
		}
		case 'GET': {
			try {
				const course = await courseModel.findById(req.query.id);
				res.status(200).json({ success: true, data: course });
			}
			catch (error) {
				res.status(400).json({ success: false });
			}
			break;
		}
		case 'DELETE': {
			try {
				const major = await courseModel.findByIdAndDelete(req.query.id);
				res.status(200).json({ success: true, data: major });
			}
			catch (error) {
				res.status(400).json({ success: false })
			}
			break;
		}

		default:
			res.status(400).json({ success: false });
			break
	}

} 