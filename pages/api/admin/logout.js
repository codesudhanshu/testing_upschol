const bcrypt = require("bcrypt");
var cookie = require('cookie');
import User from "../../../model/userModel";
import dbConnect from "../../../dbConnect";
import { signJWT } from "../../../lib/jwt";
export default async function Login(req, res) {
	await dbConnect();
	const { method } = req;
	const { cookies } = req;

	// const jwt = cookies.get("jwt");
	// const { email, password } = req.body;

	switch (method) {
		case "DELETE":
			try {
				res.setHeader(
					"Set-Cookie",
					cookie.serialize("jwt", "", {
						httpOnly: true,
						maxAge: -1,
						sameSite: "strict",
						path: "/",
					})
				);



				return res.status(200).json('logout');
			} catch (error) {
				console.log(error);
				return res.status(400).json({ success: false })
			}
		default:
			res.status(400).json({ success: false })
			break
	}
}