import mongoose from 'mongoose';

const EnquirySchema = new mongoose.Schema({
	full_name:{
		type:String,
		require:true,
	},
	school_name:{
		type:String,
		require:true,
	},
	designation:{
		type:String,
	},
	location:{
		type:String,
	},
	date:{
		type:Date,
	},
	time:{
		type:String,
	},
	number_of_students:{
		type:Number,
	}
});

const EnquiryModel = mongoose.models?.enquiry || mongoose.model('enquiry', EnquirySchema);

export default EnquiryModel;