import collegeModel from "../../../model/collegeModel";
import dbConnect from "../../../dbConnect";


export default async function College(req, res) {

	const { method } = req;
	const { city } = req.query
	await dbConnect();

	switch (method) {
		case 'GET':
			try {
				const college = await collegeModel.aggregate([
					{
						$lookup: {
							from: "majors",
							localField: "_id",
							foreignField: "college_id",
							as: "fees_data"
						}
					},
					{
						$lookup: {
							from: "files",
							localField: "banner_image",
							foreignField: "_id",
							as: "banner_image_data"
						}
					},
					{
						$lookup: {
							from: "tags",
							localField: "tags",
							foreignField: "_id",
							as: "tag_category"
						}
					},
					{
						$project: {
							tag_category: '$tag_category',
							fees: '$fees_data.fees',
							college_name: '$college_name',
							address: '$address',
							university: '$university',
							rating: '$rating',
							slug: '$slug',
							link: '$link',
							facts: '$collegfactse_name',
							description: '$description',
							banner_image: { $arrayElemAt: ["$banner_image_data", 0] },
							logo: '$logo',
							hidecollege: '$hidecollege',
							course_ids: '$course_ids',
							tags: '$tags',
							approvals: '$approvals',
							sample_certificate: '$sample_certificate',
							admission_process: '$admission_process',
							faqs: '$faqs',
							quick_facts: '$quick_facts',
							info_cards: '$info_cards',
							reviews: '$reviews',
							placement_partners: '$placement_partners',
						}
					}
				])
				res.status(201).json({ success: true, data: college })

			} catch (error) {
				res.status(400).json({ success: false })
			}
			break;
		default:
			res.status(400).json({ success: false })
			break
	}

} 