import collegeModel from "../../../model/collegeModel";
import dbConnect from "../../../dbConnect";
export default async function handler(req, res){
	const { method } = req;
	await dbConnect();

	switch (method) {
		case 'PATCH':
			try {
				await collegeModel.findByIdAndUpdate(req.query.id,{$pull:{tags:req.body.id}})
				res.status(200).json({ success: true})
			} catch (error) {
				console.log(error)
				res.status(400).json({success:false});
			}
			break;
    
		default:
			res.status(400).json({ success: false })
			break;
	}
}