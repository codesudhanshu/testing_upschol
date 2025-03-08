import mongoose from 'mongoose';

const ApprovalSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
	},
	image: {
		type: String,
		required: true
	},
	description: {
		type: String,
		required: true
	}
});

const approvalModel = mongoose.models?.approval || mongoose.model('approval', ApprovalSchema);

export default approvalModel;