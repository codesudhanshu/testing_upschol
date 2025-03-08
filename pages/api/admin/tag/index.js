import dbConnect from '../../../../dbConnect'
import Tag from '../../../../model/tags';
export default async function handler(req, res) {
	await dbConnect();
	const { method } = req

	switch (method) {
		case 'GET':
			try {
				const tags = await Tag.find({});
				res.status(200).json({ success: true, data: tags });
			} catch (error) {
				console.log(error);
				res.status(404).json({ success: false });
			}
			break;
		case 'POST':
			try {
				const newTag = await Tag.create(req.body);
				res.status(200).json({ success: true, data: newTag });
			} catch (error) {
				console.log(error);
				res.status(404).json({ success: false });
			}
	}
}