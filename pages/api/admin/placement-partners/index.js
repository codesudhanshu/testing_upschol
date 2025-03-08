import placementPartnerModel from "../../../../model/placementPartnerModel";
import dbConnect from "../../../../dbConnect";
export default async function Approvals(req, res) {
	const {
		method
	} = req;
	await dbConnect();
	switch (method) {
		case 'POST':
			try {
				const {
					title,
					image
				} = req.body;
				if (!title || !image) {
					return res.status(400).json({
						success: false,
						message: "Please enter all fields"
					});
				}
				const check = await placementPartnerModel.findOne({
					title
				});
				if(check){
					return res.status(400).json({
						success: false,
						message: "Placement Partner already exists"
					});
				}
				const placementPartner = await placementPartnerModel.create({
					title,
					image
				});
				res.status(200).json({
					success: true,
					data: placementPartner,
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