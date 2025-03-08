import S3 from "aws-sdk/clients/s3";
const s3 = new S3({
	region: process.env.AWS_REGION,
	accessKeyId: process.env.AWS_ACCESS_KEY_ID,
	secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
	signatureVersion: "v4",
});


export default async function Uploadfile(req, res) {
	const { method } = req;
	switch (method) {
		case 'POST':
			try {
				let { name, type } = req.body;
				const fileParams = {
					Bucket: process.env.BUCKET_NAME,
					Key: name,
					Expires: 600,
					ContentType: type

				};

				const url = await s3.getSignedUrlPromise("putObject", fileParams);

				res.status(200).json({ url });
			} catch (error) {
				res.status(400).json({ success: false })
			}
			break
		default:
			res.status(400).json({ success: false })
			break


	}
}
export const config = {
	api: {
		bodyParser: {
			sizeLimit: "8mb", // Set desired value here
		},
	},
};