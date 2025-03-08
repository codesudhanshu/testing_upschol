import mongoose from 'mongoose';

const CitySchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
	}
});

const cityModel = mongoose.models?.city || mongoose.model('city', CitySchema);

export default cityModel;