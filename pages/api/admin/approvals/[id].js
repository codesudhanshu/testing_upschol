import S3 from "aws-sdk/clients/s3";
const Promise = require("promise");
import approvalModel from "../../../../model/approvalModel";
import dbConnect from "../../../../dbConnect";
const s3 = new S3({
	region: process.env.AWS_REGION,
	accessKeyId: process.env.AWS_ACCESS_KEY_ID,
	secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
	signatureVersion: "v4",
});

export default async function Approval(req, res){
	const { method } = req;
	await dbConnect();

	switch(method) {
		case 'PATCH':
			try {
				const _id = req.query.id;
				const approval = await approvalModel.findById(_id);
				if (!approval){
					return res.status(400).json({
						success: false,
						message: "Approval not found"
					});
				}
				const {
					name,
					description,
					image,
					isNewImageAdded
				} = req.body;
				if (!name || !description) {
					return res.status(400).json({
						success: false,
						message: "Please enter all fields"
					});
				}
				if (isNewImageAdded){
					if(!image) {
						return res.status(400).json({
							success: false,
							message: "Please upload an image"
						});
					}
					const oldImage = approval.image;
					const oldImageKey = oldImage.split("/").slice(3).join("/");
					const deleteParams = {
						Bucket: process.env.BUCKET_NAME,
						Key: oldImageKey
					}
					await s3.deleteObject(deleteParams).promise();
					const newApproval = await approvalModel.findByIdAndUpdate(_id, {
						name,
						description,
						image
					}, { new: true });
					res.status(200).json({
						success: true,
						data: newApproval
					});

				} else {
					const newApproval = await approvalModel.findByIdAndUpdate(_id, {
						name,
						description,
					}, { new: true });
					res.status(200).json({
						success: true,
						data: newApproval
					});
				}
			} catch (err) {
				console.log(err);
				res.status(400).json({
					success: false,
					message: "Something went wrong"
				});
			}
			break;
		case 'DELETE':
			try {
				const _id = req.query.id;
				const approval = await approvalModel.findById(_id);
				if (!approval){
					return res.status(400).json({
						success: false,
						message: "Approval not found"
					});
				}
				const oldImage = approval.image;
				const oldImageKey = oldImage.split("/").slice(3).join("/");
				const deleteParams = {
					Bucket: process.env.BUCKET_NAME,
					Key: oldImageKey
				}
				await s3.deleteObject(deleteParams).promise();

				await approvalModel.findByIdAndDelete(_id);
				return res.status(200).json({
					success: true,
					message: "Approval deleted successfully"
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