import dbConnect from "../../../dbConnect";
import blogModel from "../../../model/blogModel";


export default async function handler(req, res) {
	const { method } = req;
	await dbConnect();

	switch (method) {
		case 'GET' : {
			try {
				const slug = req.query.name;
				const blog = await blogModel.findOne({
					slug: slug
				});
				if (!blog) {
					return res.status(404).json({
						status: 404,
						success: false,
						message: "Blog not found"
					});
				}
				res.status(200).json({
					status: 200,
					success: true,
					data: blog
				})
			} catch (err) {
				res.status(400).json({success: false, message: err.message});
			}
			break;
		}
		default: 
			res.status(400).json({success: false, message: "Invalid request method"});
	}
}