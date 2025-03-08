import mongoose from 'mongoose';

const FileSchema = new mongoose.Schema({
	college_id: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "college"
	},
	path: {
		type: String,
		required: true
	},
	name: {
		type: String,
		required: true
	}
}, { timestamps: true });

const fileModel = mongoose.models?.file || mongoose.model('file', FileSchema);

export default fileModel;