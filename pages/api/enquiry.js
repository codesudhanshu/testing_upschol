import dbConnect from "../../dbConnect";
var { success, error } = require('../../components/response');
import EnquiryModel from "../../model/Enquiry";
import userModel from "../../model/userModel";
import { sendEnquiryEmail } from "../../services/email";

export default async function saveEnquiry(req, res) {
	await dbConnect();
	const { method } = req;
	switch (method) {
		case 'POST':
			try {
				if (!req.body.full_name || !req.body.school_name) {
					return res.status(400).json({ message: 'Fill All Fields' })
				}
				const users = await userModel.find({});
				let enquiry = await EnquiryModel.create(req.body);
				success(res, { message: 'Thank you for applying we will in touch shortly!' });
				const resp = sendEnquiryEmail(users, req.body.full_name, req.body.school_name)
			} catch (e) {
				console.log(e);
				return error(res);
			}
			break;

		default:
			break;
	}
}