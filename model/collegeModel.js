import mongoose from 'mongoose';

const SampleCertificateSchema = new mongoose.Schema({
	desc: {
		type: String,
		required: true
	},
	pointers: {
		type: [String],
		default: []
	},
	image: {
		type: String,
		required: true
	}
});

const AdmissionProcessSchema = new mongoose.Schema({
	desc: {
		type: String,
		required: true
	},
	steps: {
		type: [String],
		default: []
	}
});

const ReviewSchema = new mongoose.Schema({
	title: {
		type: String,
		required: true
	},
	desc: {
		type: String,
		required: true
	},
	rating: {
		type: Number,
		required: true
	},
	user: {
		type: String,
		required: true
	}
}, {
	timestamps: true
});

const CollegeSchema = new mongoose.Schema({
	college_name: {
		type: String,
		required: true
	},
	address: {
		street: { type: String },
		city: { type: String },
		state: { type: String },
		Country: { type: String, default: "India" },
		pincode: { type: Number },
	},
	university: {
		type: String,
	},
	rating: {
		type: Number,
		required: true
	},
	slug: {
		type: String,
		unique: true,
	},
	link: {
		type: String,
		required: true
	},
	facts: {
		type: [String],
		default: []
	},
	description: {
		type: String,
		required: true
	},
	banner_image: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'file'
	},
	logo: {
		type: String
	},
	hidecollege: {
		type: Boolean,
		default: true,
	},
	course_ids: [{
		type: mongoose.Schema.Types.ObjectId,
		ref: 'course'
	}],
	tags: [{
		type: mongoose.Schema.Types.ObjectId,
		ref: 'tag'
	}],
	approvals: [{
		type: mongoose.Schema.Types.ObjectId,
		ref: 'approval',
		default: []
	}],
	sample_certificate: {
		type: SampleCertificateSchema,
		default: null
	},
	admission_process: {
		type: AdmissionProcessSchema,
		default: null
	},
	faqs: {
		type: [
			{
				question: {
					type: String,
					required: true
				},
				answer: {
					type: String,
					required: true
				}
			}
		],
		default: []
	},
	quick_facts: {
		type: [
			{
				title: {
					type: String,
					required: true
				},
				description: {
					type: String,
					required: true
				}
			}
		],
		default: []
	},
	info_cards: {
		type: [
			{
				title: {
					type: String,
					required: true
				},
				desc: {
					type: String,
					required: true
				},
			}
		],
		default: [],
	},
	reviews: {
		type: [ReviewSchema],
		default: []
	},
	placement_partners: [{
		type: mongoose.Schema.Types.ObjectId,
		ref: 'placement_partner',
		default: []
	}]
});

const collegeModel = mongoose.models?.college || mongoose.model('college', CollegeSchema);

export default collegeModel;