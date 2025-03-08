
import dbConnect from "../../dbConnect";
var { success, error } = require('../../components/response');
import LeadModel from "../../model/leadModel";

export default async function SaveLead(req, res) {

	await dbConnect();
	const { method } = req;
	// const { name, email, phone, dob, state, course, gender } = req.body;

	switch (method) {
		case "POST": {
			try {
				let lead = await LeadModel.create(req.body);
				console.log(lead);
				success(res, { message: 'Thank you for applying we will in touch shortly!' });
			} catch (e) {
				console.log(e);
				return error(res);
			}
		}
	}
}