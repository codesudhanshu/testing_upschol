import mongoose from 'mongoose';
import { TagCategories } from '../config';

const tagSchema = mongoose.Schema({
	tag_name: {
		type: String,
		required: true
	},
	tag_category: {
		type: String,
		enum: TagCategories,
		required: true
	},
	duration: {
		type: Number,
		required: true,
	},
	duration_unit: {
		type: String,
		required: true,
		enum: ['YEARS', 'MONTHS', 'WEEKS']
	},
	icons: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'file'
	}
})

const tagsModel = mongoose.models?.tag || mongoose.model('tag', tagSchema);

export default tagsModel;
