import mongoose from 'mongoose';

const leadSchema = new mongoose.Schema({
	name: {
		type: String,
	},
	email: {
		type: String,
		required: true
	},
	phone: {
		type: String,
	},
	dob: {
		type: String,
		required: true
	},
	state: {
		type: String,
		required: true
	},
	course: {
		type: String,
		required: true
	},
	gender: {
		type: String,
		required: true
	}

}, {
	timestamps: true
});

const leadModel = mongoose.models?.lead || mongoose.model('lead', leadSchema);

export default leadModel;