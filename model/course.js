import mongoose from 'mongoose';

const CourseSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
		index: true
	},
	description: {
		type: String,
		required: true
	},
	feeDetails: {
		fees: Number,
		duration: String,
	}
});

const courseModel = mongoose.models?.course || mongoose.model('course', CourseSchema);

export default courseModel;