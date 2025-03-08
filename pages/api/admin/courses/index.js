import courseModel from "../../../../model/course";
import dbConnect from "../../../../dbConnect";
export default async function Course(req, res) {

	const { method } = req;
	await dbConnect();
	const { stream } = req.query;
	let arr = [];

	switch (method) {
		case 'GET':
			try {
				if (stream) {
					const course = await courseModel.find({ name: stream });
					for (var i = 0; i < course.length; i++) {
						arr.push((course[i]._id))
					}
					res.status(200).json({ success: true, data: course });


				}
				else {
					const course = await courseModel.find({});
					res.status(200).json({ success: true, data: course });

				}


			} catch (error) {
				res.status(400).json({ success: false });
			}
			break;
		case 'POST':
			try {
				const course = await courseModel.create(req.body);
				res.status(200).json({ success: true, data: course });
			} catch (error) {
				console.log(error)
				res.status(400).json({ success: false });
			}
			break;

		default:
			res.status(400).json({ success: false });
			break
	}

} 