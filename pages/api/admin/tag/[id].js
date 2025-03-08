import dbConnect from '../../../../dbConnect'
import collegeModel from '../../../../model/collegeModel';
import Tag from '../../../../model/tags';
export default async function handler(req, res) {
	await dbConnect();
	const { method } = req;
	switch (method) {
		case 'GET':
			try {
				const { id } = req.query;
				const tag = await Tag.findById(id);
				res.status(200).json({ success: true, data: tag });
			} catch (error) {
				console.log(error);
				res.status(404).json({ success: false });
			}
			break;
		case 'DELETE':
			try {
				const { id } = req.query;
				const deletedTag = await Tag.findByIdAndDelete(id);
				res.status(200).json({ success: true, data: deletedTag });
			} catch (error) {
				console.log(error);
				res.status(404).json({ success: false });
			}
			break;
		case 'PATCH':
			try {
				const { id } = req.query;
				if (req.body.college_assign) {
					await collegeModel.findByIdAndUpdate(req.body.college_assign, { $push: { tags: id } });
				}
				const updatedData = await Tag.findByIdAndUpdate(id, req.body, { new: true });
				res.status(200).json({ success: true, data: updatedData })
			} catch (error) {
				console.log(error);
				res.status(404).json({ success: false })
			}
		default:
			break;
	}
}