import mongoose from "mongoose";

const placementPartnerSchema =  new mongoose.Schema({
	title: {
		type: String,
		required: true
	},
	image: {
		type: String,
		required: true
	}
});

const placementPartnerModel = mongoose.models?.placement_partner ||  mongoose.model('placement_partner', placementPartnerSchema);

export default placementPartnerModel;