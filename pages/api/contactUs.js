import dbConnect from "../../dbConnect";
import ContactUsModel  from "../../model/contactUsModel";

export default async function ContactUs(req, res) {
	await dbConnect();
	const {
		method
	} = req;
	switch (method) {
		case "POST":
			try {
				const {
					name,
					email,
					phoneNumber
				} = req.body;
				const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
				const phoneRegex = /^(\+\d{1,4}\s?)?\d{10}$/;
				if (!name || !email || !phoneNumber) {
					return res.status(400).json({
						message: "Please fill all the fields",
						success: false
					});
				}
				if (!emailRegex.test(email)) {
					return res.status(400).json({
						message: "Please enter a valid email address",
						success: false
					});
				}
				if (!phoneRegex.test(phoneNumber)) {
					return res.status(400).json({
						message: "Please enter a valid phone number",
						success: false
					});
				}
				const contactUs = await ContactUsModel.create({
					name,
					email,
					phoneNumber
				});
				return res.status(200).json({
					success: true,
					status: 200,
					message: "Successfully Submitted",
					data: contactUs
				});
			} catch (error) {
				console.log(error);
				return res.status(400).json({
					success: false
				})
			}
		default:
			res.status(400).json({
				success: false
			})
			break
	}
}