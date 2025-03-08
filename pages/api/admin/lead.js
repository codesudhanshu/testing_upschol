import leadModel from "../../../model/leadModel";

import dbConnect from "../../../dbConnect"; 
export default async function College(req, res) {

	const { method } = req;
	await dbConnect();

	switch (method) {
		case 'GET':
			try {

				let { page, limit } = req.query;
				page = isNaN(page) ? 1 : parseInt(page);
				limit = isNaN(limit) ? 25 : parseInt(limit);

				const leads = await leadModel.find({}).skip((page - 1) * limit).limit(limit);
				res.status(200).json({ success: true, data: leads });

			} catch (error) {
				res.status(400).json({ success: false });
			}
			break;

		default:
			res.status(501).json({ message: "Method not implemented" });
			break
	}

} 