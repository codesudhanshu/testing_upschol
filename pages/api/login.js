const bcrypt = require("bcrypt");
var cookie = require('cookie');
import User from "../../model/userModel";
import dbConnect from "../../dbConnect";
import { signJWT } from "../../lib/jwt";

export default async function Login(req, res) {
	await dbConnect();
	const { method } = req;
	const { email, password } = req.body;

	switch (method) {
		case "POST":
			try {
				const existingUser = await User.findOne({ email: email });
				if (!existingUser) {
					return res.status(400).json({ message: "User not found. SignUp Please" });
				}
				const isPasswordCorrect = await bcrypt.compareSync(password, existingUser.password);
				if (!isPasswordCorrect) {
					return res.status(400).json({ message: "Incorrect password" });
				}

				const token = await signJWT({
					_id: existingUser._id,
					email: existingUser.email,
					role: existingUser.role,
				});

				res.setHeader(
					"Set-Cookie",
					cookie.serialize("jwt", token, {
						httpOnly: true,
						maxAge: 30 * 24 * 60 * 60,
						sameSite: "strict",
						path: "/",
					})
				);

				return res
					.status(200)
					.json({
						message: "Successfully Logged In", user: {
							first_name: existingUser.first_name,
							last_name: existingUser.last_name,
							role: existingUser.role,
							email: existingUser.email,
							token: token
						},
						status: 200,
						success: true
					});
			} catch (error) {
				console.log(error);
				return res.status(400).json({ success: false })
			}
		default:
			res.status(400).json({ success: false })
			break
	}
}