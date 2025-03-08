import fileModel from "../../../../../model/fileModel";
import dbConnect from "../../../../../dbConnect";

export default async function handler(req, res){
	const { method } = req;
	await dbConnect();
	switch(method){
		case 'POST':
			try {
				const {
					fileIDs
				} = req.body;
				for(let i = 0; i < fileIDs.length; i++){
					const isValidMongoID = fileIDs[i].match(/^[0-9a-fA-F]{24}$/);
					if (isValidMongoID){
						const file = await fileModel.findById(fileIDs[i]);
						if(file) await fileModel.findByIdAndDelete(fileIDs[i]);
					}
				}
				res.status(200).json({ success: true, message: "Files deleted" });
			} catch (error){
				console.error(error)
				res.status(400).json({ success: false, message: "Something went wrong" });
			}
		default:
			res.status(400).json({ success: false, message: "Method not allowed" });
			break
	}
}