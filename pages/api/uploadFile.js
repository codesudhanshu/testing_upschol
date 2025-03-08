import S3 from "aws-sdk/clients/s3";
const Promise = require("promise"); 
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
				let promises = [];
				let { list, college_name } = req.body;

				let college = college_name.replace(/\s+/g, '-');
				college = college.toLowerCase();

				list.forEach(async (file) => {
					const fileParams = {
						Bucket: process.env.BUCKET_NAME,
						Key: `${college}/${file.name}`,
						ContentType: file.type,

					};



					const promise = s3.getSignedUrlPromise("putObject", fileParams)
					promises.push(promise);
				});
				await Promise.all(promises).then(function (data) {
					res.send(data)
				}).catch(function (err) {
					res.send(err.stack);
				})
				break;


			} catch (error) {
				console.log(error)
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