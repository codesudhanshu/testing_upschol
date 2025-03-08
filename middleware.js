import { NextResponse } from "next/server";
import { verifyJWT } from "./lib/jwt";

const secretkey = process.env.JWT_SECRET_KEY;

export default async function middleware(req) {
	const { cookies } = req;
	const jwt = cookies.get("jwt");

	const { origin } = req.nextUrl;
	const url = req.url;

	if (url.includes(`${origin}/admin`)) {
		if (!jwt?.value) {
			return NextResponse.redirect(`${origin}/login`)
		}
		try {
			const decoded = await verifyJWT({
				token: jwt.value,
			});
			return NextResponse.next();
		}
		catch (e) {
			console.log(e)
			return NextResponse.redirect(`${origin}/login`)
		}
	} 
	else if (url.includes(`${origin}/api/admin`)) {
		if (jwt?.value) {
			try {
				let decoded = await verifyJWT({
					token: jwt.value,
				});
				decoded = {
					_id: decoded._id,
					email: decoded.email,
					role: decoded.role,
				}
				const reqHeaders = new Headers(req.headers)
				reqHeaders.set('decoded-token', JSON.stringify(decoded))
				const response = NextResponse.next({
					request: {
						headers: reqHeaders
					}
				})
				return response;
			} catch (err) {
				console.log(err)
				return NextResponse.redirect(`${origin}/login`)
			}
		} else {
			return NextResponse.redirect(`${origin}/login`)
		}
	}

	return NextResponse.next()
}

// const verifyToken = (req, res, next) => {
//     //

//     const headers = req.headers[`authorization`];
//     const token = headers.split(" ")[1];
//     if (!token) {
//         res.status(404).json({ message: "No token found" });
//     }
//     jwt.verify(String(token), JWT_SECRET_KEY, (error, user) => {
//         if (error) {
//             res.status(400).json({ message: "Invalid Token" });
//         }
//         console.log(user.id);
//         req.id = user.id;
//     });
//     next();
// };