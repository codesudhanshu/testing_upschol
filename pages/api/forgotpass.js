var bcrypt = require('bcrypt');
const { sendOTP } = require('../../services/email');
import userModel from "../../model/userModel";
var { success, error } = require('../../components/response');

import User from "../../model/userModel";
import dbConnect from "../../dbConnect";

export default async function Forgot(req, res) {
	const { method } = req;
	const saltRounds = 10;



	await dbConnect();

	if (method === 'POST') {
		let { new_password, otp, email } = req.body;

		let user = await User.findOne({ email: email });
		if (!user)
			return error(res, 404, 'user with this email does not exist');

		const OTP_VALID_TILL_TIME_IN_SEC = parseInt(process.env.OTP_VALID_TILL_TIME_IN_MIN, 10) * 60;
		const currentTimeInSec = (new Date().getTime() / 1000);
		const ElapsedTimeSinceLastOtpInSec = (currentTimeInSec - (user.otp_time / 1000));
		const go = await otpSolver(user);
		if (go.status) {
			if (OTP_VALID_TILL_TIME_IN_SEC > ElapsedTimeSinceLastOtpInSec) {
				if (user.otp == otp) {

					user.otp_left = 3;
					let updatedUser = await user.save();

					bcrypt.hash(new_password, saltRounds, async (err, hash) => {
						if (err) {
							console.log(err);
							return error(res, 500, 'Some internal error occurred');
						}

						try {
							user.password = hash;
							await user.save();
							return res.status(200).json({ status: 200, success: true, response: { message: "Your password has been Successfully Updated" } })
						} catch (err) {
							console.log(err);
							return error(res);
						}
					});
				} else {
					return res.json({ status: 401, success: false, response: { message: "Incorrect OTP Entered" } });
				}
			} else {
				return error(res, 402, 'OTP is expired');
			}
		} else {
			return error(res, 405, go.message);
		}
	}


	else if (method === 'GET') {
		let { email } = req.query;
		let user = await userModel.findOne({ email });
		if (!user) return error(res, 404, 'user does not exist');

		let go = await otpSolver(user);
		if (go.status) {
			let OTP = await sendOTP([user.email]);
			user.otp = OTP;
			user.otp_time = new Date().getTime();
			user.otp_left -= 1;
			let userAfterOtp = await user.save();
			success(res, { message: 'OTP sent to your email' });
		} else {
			return error(res, 404, go.message);
		}
	}



}

async function otpSolver(user) {
	let OTP_RESET_TIME_IN_MIN = parseInt(
		process.env.OTP_REFRESH_INTERVAL_IN_MIN,
		10
	);
	let timeGap = OTP_RESET_TIME_IN_MIN * 60;
	let currentTime = new Date().getTime();
	let ElapsedTimeSinceLastOTP = (currentTime - user.otp_time) / 1000;

	if (ElapsedTimeSinceLastOTP > timeGap) {
		user.otp_left = 3;
		await user.save();
	}
	if (user.otp_left <= 0) {
		let message = `you have zero attempts left, Try after ${Math.ceil(
			(timeGap - ElapsedTimeSinceLastOTP) / 60
		)} mins`;
		return {
			status: false,
			message,
		};
	} else {
		return {
			status: true,
			message: `continuing with attempts left2 , ${user.otp_left}`,
		};
	}
}



