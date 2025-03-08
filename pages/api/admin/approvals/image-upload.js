import S3 from "aws-sdk/clients/s3";
const Promise = require("promise");
const s3 = new S3({
	region: process.env.AWS_REGION,
	accessKeyId: process.env.AWS_ACCESS_KEY_ID,
	secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
	signatureVersion: "v4",
});

export default async function UploadImage(req, res) {
	const {
		method
	} = req;
    
	switch(method) {
		case 'POST':
			try {
				let {
					name,
					image
				} = req.body;
				if (!name || !image) {
					return res.status(400).json({
						success: false,
						message: "Please provide all the fields"
					});
				}
				name = name.replace(/\s+/g, '-');
				if(!image?.type?.startsWith("image/")){
					return res.status(400).json({
						success: false,
						message: "Please upload an image"
					});
				}
				const fileParams = {
					Bucket: process.env.BUCKET_NAME,
					Key: `approvals/${name}/${image.name}`,
					ContentType: image.type,
				}
				const data = await s3.getSignedUrlPromise("putObject", fileParams);
				res.status(200).json({
					success: true,
					data
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