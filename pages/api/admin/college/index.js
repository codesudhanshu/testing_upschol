import collegeModel from "../../../../model/collegeModel";
import cityModel from "../../../../model/cityModel";
import dbConnect from "../../../../dbConnect";
export default async function College(req, res) {

	const { method } = req;
	const { city } = req.query


	await dbConnect();


	switch (method) {
		case 'GET':
			try {
				if (city) {
					const cities = city.split(',');
					const college = await collegeModel.find({ "address.city": cities }).populate("banner_image").exec()
					res.status(200).json({ success: true, data: college });

				}
				else {
					const college = await collegeModel.find({}).populate("banner_image").exec();
					res.status(200).json({ success: true, data: college })
				}


			} catch (error) {
				console.log(error)
				res.status(400).json({ success: false });
			}
			break;
		case 'POST':
			try {
				const {
					college_name, address, info_cards	
				} = req.body;
				if (address && address.city) {
					const check = await cityModel.findOne({ name: address.city });
					const cityName = address.city?.trim();
					if (!check) await cityModel.create({ name: cityName });
				}
				const slug = college_name.toLowerCase().replace(/ /g, '-');
				let newCollege = { ...req.body, slug };
				const check = await collegeModel.findOne({ slug });
				if (check){
					return res.status(400).json({ success: false, message: "College already exists" });
				}
				if(info_cards){
					newCollege = { ...newCollege, info_cards: info_cards.slice(0, 3) }
				}
				const college = await collegeModel.create(newCollege);
				res.status(200).json({ success: true, data: college });
			} catch (error) {
				console.log(error)
				res.status(400).json({ success: false, message: error });
			}
			break;
		case 'PATCH': {
			try {
				const oldCollege = await collegeModel.findById(req.params.id);
				const {
					college_name
				} = req.body;
				const slug = college_name.toLowerCase().replace(/ /g, '-');
				const check = await collegeModel.findOne({ slug });
				if (check){
					return res.status(400).json({ success: false, message: "College already exists" });
				}
				let newCollege = req.body;
				if (slug !== oldCollege.slug) {
					newCollege = { ...newCollege, slug }
				}
				const college = await collegeModel.findByIdAndUpdate(req.params.id, newCollege, { new: true });
				res.status(200).json({ success: true, data: college });
			}
			catch (error) {
				res.status(400).json({ success: false, message: error });
			}
			break
		}
		default:
			res.status(400).json({ success: false });
			break
	}

} 