import mongoose from 'mongoose';

const BlogCollectionScheme = new mongoose.Schema({
	title: {
		type: String,
		required: true
	},
	slug: {
		type: String,
		required: true,
		unique: true
	},
	blogs: [{
		type: mongoose.Schema.Types.ObjectId,
		ref: 'blog',
	}]
}, {
	timestamps: true
});

const blogCollectionModel = mongoose.models?.blogCollection || mongoose.model('blogCollection', BlogCollectionScheme);

export default blogCollectionModel;