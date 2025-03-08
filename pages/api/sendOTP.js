const { sendOTP } = require('../../services/email');
import dbConnect from "../../dbConnect";
var { success, error } = require('../../components/response');
import User from "../../model/userModel";

async function otpSolver(user) {
	let OTP_RESET_TIME_IN_MIN = parseInt(process.env.OTP_REFRESH_INTERVAL_IN_MIN, 10);
	let timeGap = OTP_RESET_TIME_IN_MIN * 60;
	let currentTime = new Date().getTime();
	let ElapsedTimeSinceLastOTP = (currentTime - user.otp_time) / 1000;


	if (ElapsedTimeSinceLastOTP > timeGap) {
		user.otp_left = 3;
		await user.save();
	} else {
		console.log('not resetting otp_left');
	}
	if (user.otp_left <= 0) {
		let message = `you have zero attempts left, Try after ${Math.roof((timeGap - ElapsedTimeSinceLastOTP) / 60)} mins`;
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

export default async function Sendotp(req, res) {
	await dbConnect();
	const { method } = req;
	const { email } = req.body;

	switch (method) {
		case "POST": {
			try {
				let user = await User.findOne({ email: email });
				user.otp_time = new Date().getTime();
				await user.save();
				if (!user)
					return error(res, 404, 'user does not exist');
				let go = await otpSolver(user);

				if (go.status) {

					let OTP = await sendOTP([user.email]);
					user.otp = OTP;

					user.otp_time = new Date().getTime();
					user.otp_left -= 1;
					let userAfterOtp = await user.save();
					success(res, { message: 'OTP sent to your email' });
				}
				else {
					return error(res, 404, go.message)
				}

			}
			catch (e) {
				console.log(error.message)
				return error(res);

			}
		}


	}

}