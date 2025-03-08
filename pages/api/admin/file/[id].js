import fileModel from "../../../../model/fileModel";
import dbConnect from "../../../../dbConnect";
export default async function College(req, res) {

	const { method } = req;
	await dbConnect();

	switch (method) {
		case 'PATCH': {
			try {

				const file = await fileModel.findByIdAndUpdate(req.query.id, req.body, { new: true });
				res.status(200).json({ success: true, data: file })
			}
			catch (error) {
				res.status(400).json({ success: false })
			}
			break
		}
		case 'GET': {
			try {
				const file = await fileModel.findById(req.query.id);
				res.send(file);
			}
			catch (error) {
				res.status(400).json({ success: false })
			}
			break;
		}
		case 'DELETE': {
			try {
				const file = await fileModel.findByIdAndDelete(req.query.id);
				res.send(file);
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