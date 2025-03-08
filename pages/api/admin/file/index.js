import fileModel from "../../../../model/fileModel";
import dbConnect from "../../../../dbConnect";
export default async function File(req, res) {

	const { method } = req;
	await dbConnect();
	let { filedata } = req.body;

	switch (method) {
		case 'GET':
			try {
				const file = await fileModel.find({});
				res.status(200).json({ success: true, data: file });
			} catch (error) {
				res.status(400).json({ success: false });
			}
			break;
		case 'POST':
			try {
				const file = await fileModel.insertMany(filedata);
				res.status(200).json({ success: true, data: file });
			} catch (error) {
				res.status(400).json({ success: false });
			}
			break;

		default:
			res.status(400).json({ success: false });
			break
	}

}
