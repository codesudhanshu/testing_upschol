import blogModel from "../../../model/blogModel";
import dbConnect from "../../../dbConnect";
export default async function Blog(req, res) {

	const { method } = req;
	await dbConnect();

	switch (method) {
		case 'GET':
			try {
				const blog = await blogModel.find();
				res.status(200).json({ success: true, data: blog });
			} catch (error) {
				res.status(400).json({ success: false });
			}
			break;
		case 'POST':
			try {
				let { title, content, slug, blog_banner } = req.body
				const blog = await blogModel.create({
					title, content, slug, blog_banner
				});
				res.status(200).json({ success: true, data: blog });
			} catch (error) {
				console.log(error)
				res.status(400).json({ success: false });
			}
			break;
		case 'PATCH': {
			try {
				const blog = await blogModel.findByIdAndUpdate(req.query.id, req.body, { new: true });
				res.status(200).json({ success: true, data: blog });
			}
			catch (error) {
				res.status(400).json({ success: false });
			}
			break
		}

		default:
			res.status(400).json({ success: false });
			break
	}

} 