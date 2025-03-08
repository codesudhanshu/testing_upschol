import approvalModel from "../../../model/approvalModel";
import collegeModel from "../../../model/collegeModel";
import fileModel from "../../../model/fileModel";
import dbConnect from "../../../dbConnect";
export default async function College(req, res) {

	const { method } = req;
	await dbConnect();

	switch (method) {
		case 'GET': {
			try {
				const name = req.query.name;
				const college = await collegeModel.findOne({
					slug: name
				}).populate("banner_image approvals tags placement_partners");

				if (!college) {
					return res.status(404).json({
						status: 404,
						success: false,
						error: "College not found"
					})
				}
				const photos = await fileModel.find({
					college_id: college._id
				});
				res.status(200).json({
					status: 200,
					college: college,
					photos: photos
				})
			}
			catch (error) {
				console.log(error)
				res.status(400).json({
					status: 400,
					success: false,
					error: error
				})
			}
			break;
		}

		default:
			res.status(400).json({ success: false })
			break
	}

} 