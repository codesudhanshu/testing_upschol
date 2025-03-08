
import dbConnect from "../../dbConnect";
var { success, error } = require('../../components/response');
import { sendScholarShipEmail } from "../../services/email";
import userModel from "../../model/userModel";

export default async function Scholarship(req, res) {

	await dbConnect();
	const { method } = req;

	switch (method) {
		case "POST": {
			try {
				const users = await userModel.find({});

				sendScholarShipEmail(users, req.body.form_values, req.body.response)

				success(res, { message: 'Scholarship request has been sent successfully!' });
			} catch (e) {
				console.log(e);
				return error(res);
			}
		}
	}
}