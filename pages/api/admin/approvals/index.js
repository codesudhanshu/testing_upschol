import approvalModel from "../../../../model/approvalModel";
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
					name,
					description,
					image
				} = req.body;
				if (!name || !description || !image) {
					return res.status(400).json({
						success: false,
						message: "Please enter all fields"
					});
				}
				const check = await approvalModel.findOne({
					name
				});
				if(check){
					return res.status(400).json({
						success: false,
						message: "Approval already exists"
					});
				}
				const approval = await approvalModel.create({
					name,
					description,
					image
				});
				res.status(200).json({
					success: true,
					data: approval
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