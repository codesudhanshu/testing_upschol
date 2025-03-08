import mongoose from 'mongoose';
import { courseDuration } from '../config';

const MajorSchema = new mongoose.Schema({
	description: {
		type: String,
		required: true
	},
	Major: {
		type: String,
		required: true
	},
	fees: {
		annual_fees: Number,
		other_fees: [{
			fee_type: String,
			amount: String,
			duration: courseDuration,
		}]
	},
	eligibility: [{
		type: String,
		required: true
	}],
	specialization: {
		type: [
			{
				title: {
					type: String,
					required: true
				},
				fees: {
					type: Number,
					required: true
				}
			}
		],
		default: []
	},
	duration: {
		type: Number,
	},
	duration_unit: {
		type: String,
		enum: ['YEARS', 'MONTHS', 'WEEKS'],
	},
	college_id: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'college'
	},

	course_id: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "course"
	},
	apply_link: {
		type: String,
	}
});

const MajorModel = mongoose?.models?.major || mongoose.model('major', MajorSchema);

export default MajorModel;