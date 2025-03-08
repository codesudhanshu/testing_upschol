import User from "../../../model/userModel"
import dbConnect from "../../../dbConnect";
export default async function College(req, res) {

	const { method } = req;
	await dbConnect();

	switch (method) {
		case 'PATCH': {
			try {
				const user = await User.findByIdAndUpdate(req.query.id, req.body, { new: true });
				res.status(200).json({ success: true, data: user })
			}
			catch (error) {
				res.status(400).json({ success: false })
			}
			break
		}
		case 'GET': {
			try {
				const Users = await User.findById(req.query.id);
				res.send(Users)
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