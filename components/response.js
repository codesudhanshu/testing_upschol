export function success(res, result = 'OK', status = 200) {
	res.status(status).json({ status: status, success: true, response: result });
}

export function error(res, status = 500, error = 'Some internal server error occurred') {
	res.status(status).json({ status: status, success: false, response: error });
}