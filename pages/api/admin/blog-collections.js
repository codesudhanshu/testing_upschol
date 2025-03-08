import blogCollectionModel from "../../../model/blogCollectionModel";
import dbConnect from "../../../dbConnect";
export default async function Blog(req, res) {

	const { method } = req;
	await dbConnect();

	switch (method) {
		case 'GET':
			try {
				const collection = await blogCollectionModel.find();
				res.status(200).json({ success: true, data: collection });
			} catch (error) {
				res.status(400).json({ success: false });
			}
			break;
		case 'POST':
			try {
				let { title, blogs, slug } = req.body
				const collection = await blogCollectionModel.create({
					title, blogs, slug
				});
				res.status(200).json({ success: true, data: collection });
			} catch (error) {
				console.log(error)
				res.status(400).json({ success: false });
			}
			break;
		case 'PATCH': {
			try {
				const collection = await blogCollectionModel.findByIdAndUpdate(req.query.id, req.body, { new: true });
				res.status(200).json({ success: true, data: collection });
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