import { useRouter } from "next/router";
import { useCookies } from "react-cookie";

export default function useFetch() {
	const router = useRouter();
	const [, , removeCookie] = useCookies();

	/**
	 *
	 * @param {String} url url of the api / service
	 * @param {Object} obj options to pass method, body, token for the request
	 * @param {('GET'|'POST'|'PATCH'|'DELETE')} obj.method http method to use for request
	 * @param {Object} obj.body http message body if request type is POST or PATCH
	 * @returns
	 */
	async function _fetch(url, obj = {}) {
		let headers = {};
		let { method = 'GET', body = undefined } = obj;

		if (body) {
			headers['Content-Type'] = 'application/json';
		}

		const options = {
			headers,
			body: JSON.stringify(body),
			method,
			credentials: 'include',
		};
		let res = await fetch(url, options);

		if (res.status === 401) {
			removeCookie('userInfo');
			router.replace("/login")
		}

		return res;
	}

	return _fetch;
}

export async function _fetch(url, obj = {}) {
	let headers = {};
	let { method = 'GET', body = undefined } = obj;

	if (body) {
		headers['Content-Type'] = 'application/json';
	}

	const options = {
		headers,
		body: JSON.stringify(body),
		method,
		credentials: 'include',
	};
	let res = await fetch(url, options);

	if (res.status === 401) {
		window.location = '/';
	}

	return res;
}