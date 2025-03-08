import dbConnect from '../../dbConnect';
import College from '../../model/collegeModel';

export default async function handler(req, res) {

	try {
		await dbConnect();
		const colleges = await College.aggregate([
			{
				$lookup: {
					from: 'tags',
					localField: 'tags',
					foreignField: '_id',
					as: 'tagDetails',
				},
			},
			{
				$match: {
					'tagDetails.tag_category': 'Study Abroad Online',
				},
			},
		]);

		res.status(200).json({ success: true, data: colleges });
	} catch (error) {
		console.error('Error fetching colleges with UG courses:', error);
		res.status(500).json({ success: false, error: 'Server Error' });
	}
}
