import mongoose from 'mongoose';

const ContactUsSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true
	},
	email: {
		type: String,
		required:true
	},
	phoneNumber: {
		type: String,
		required:true
	}
});

const contactUsModel = mongoose.models?.contactUs || mongoose.model('contactUs', ContactUsSchema);

export default contactUsModel;
