import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
	first_name: {
		type: String,
		required: true
	},
	last_name: {
		type: String,
		required: true
	},
	role: {
		type: String,
		required: true
	},
	otp: {
		type: String,

	},
	otp_left: {
		type: Number,
		default: 3
	},
	otp_time: {
		type: Number
	},
	email: {
		type: String,
		unique: true,
		index: true,
		required: true
	},
	password: {
		type: String,
		required: true
	}
});

const userModel = mongoose.models?.user || mongoose.model('user', UserSchema);

export default userModel;