import mongoose from 'mongoose';

const BlogScheme = new mongoose.Schema({
	title: {
		type: String,
		required: true
	},
	slug: {
		type: String,
		required: true,
		unique: true
	},
	content: {
		type: String,
		required: true
	}
	,
	blog_banner: {
		type: String
	}
}, {
	timestamps: true
});

const blogModel = mongoose.models?.blog || mongoose.model('blog', BlogScheme);

export default blogModel;