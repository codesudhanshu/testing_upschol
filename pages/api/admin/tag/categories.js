import dbConnect from '../../../../dbConnect'
import Tag from '../../../../model/tags';
export default async function handler(req, res) {
	await dbConnect();
	const { method } = req
    
	switch(method){
		case 'GET':
			try {
				const categories = await Tag.aggregate([
					{
						$group: {
							_id: null,
							categories: { $addToSet: "$tag_category" }
						}
					}
				]);
                  
				res.status(200).json({success:true,data:categories})
			} catch (error) {
				console.log(error);
				res.status(404).json({success:false});
			}
			break;
	}
}