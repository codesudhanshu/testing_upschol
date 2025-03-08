import User from "../../../model/userModel"
const bcrypt = require("bcrypt");
import dbConnect from "../../../dbConnect";
export default async function handler(req, res) {
	const saltRounds = 10;
	const { method } = req
	const { first_name, last_name, role, email, password } = req.body;
	await dbConnect();

	switch (method) {
		case 'GET':
			try {
				const users = await User.find({}, { first_name: 1, _id: 1, last_name: 1, role: 1, email: 1 });
				res.status(200).json({ success: true, data: users })
			} catch (error) {
				res.status(400).json({ success: false })
			}
			break
		case 'POST':
			try {
				const existingUser =  await User.findOne({ email: email });
				if (existingUser) {
					return res.status(400).send({ message: "Email already exists! Login Instead" });
				}
				const hashedPassword = await bcrypt.hash(password, saltRounds);
				const user = new User({
					first_name,
					last_name,
					role: "Admin",
					email,
					password: hashedPassword
				});
				await user.save();
				res.status(200).json({
					status: 200,
					success: true,
					data: user

				})
			} catch (error) {
				console.log(error);
				res.status(400).json({ success: false })
			}
			break
		default:
			res.status(400).json({ success: false })
			break
	}
}