export function getS3Url(url) {
	return `${process.env.NEXT_PUBLIC_AWS_URL}/${url?.toString()}`;
}