import MajorModel from "../../model/major";
import courseModel from "../../model/course";
import collegeModel from "../../model/collegeModel";
import dbConnect from "../../dbConnect";

export default async function Major(req, res) {

	const { method } = req;
	let { stream, city, tagIds, feeRange, searchString, page, limit } = req.query;
	let tagsArr = [];
	if (tagIds) tagsArr = JSON.parse(tagIds);
	if (stream) stream = JSON.parse(stream);
	if (feeRange) feeRange = JSON.parse(feeRange);

	await dbConnect();

	switch (method) {
		case 'GET':
			try {
				let query = {
					hidecollege: true,
				};
				let courses = [];
				if (stream){
					const college_ids = await MajorModel.distinct("college_id", {
						"course_id": { $in: stream }
					});
					query._id = { $in: college_ids };
				}
				if (tagsArr?.length > 0) query.tags = { $in: tagsArr };
				if (city) query["address.city"] = { $in: city.split(',') };
				if (searchString) query.college_name = { $regex: searchString, $options: "i" };
				if (feeRange){
					feeRange.low = parseInt(feeRange.low);
					feeRange.high = parseInt(feeRange.high);
					const college_ids = await MajorModel.distinct("college_id", {
						'fees.annual_fees': { $gte: feeRange.low, $lte: feeRange.high }
					});
					if (query._id){
						const old_ids = query?._id?.$in;
						query._id = { $in: [...old_ids, ...college_ids] };
					} else {
						query._id = { $in: college_ids };
					}
				}
				page = parseInt(page) || 1;
				limit = parseInt(limit) || 10;
				const colleges = await collegeModel.find(query).populate("banner_image approvals").skip((page - 1) * limit).limit(limit);
				const total = await collegeModel.countDocuments(query);
				res.status(200).json({
					success: true,
					data: {
						colleges,
						total: total,
					}
				});
			} catch (error) {
				console.log(error)
				res.status(400).json({ success: false });
			}
			break;
		case 'POST':
			try {
				const major = await MajorModel.create(req.body);
				res.status(200).json({ success: true, data: major });
			} catch (error) {
				res.status(400).json({ success: false });
			}
			break;

		default:
			res.status(400).json({ success: false });
			break
	}

}

