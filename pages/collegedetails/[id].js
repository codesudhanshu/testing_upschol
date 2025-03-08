import { useEffect, useState } from "react"
import { useRouter } from 'next/router'

import collegeModel from "../../model/collegeModel";
import dbConnect from "../../dbConnect";

export async function getServerSideProps(context) {
	await dbConnect();
	const college = await collegeModel.findById(context.params.id).lean();
	return {
		props: {
			college: JSON.parse(JSON.stringify(college))
		}, // will be passed to the page component as props
	}
}

export default function Details(props) {
	const router = useRouter();
	const { id } = router.query;
	const [data, setData] = useState([])

	return <div>
		<h1>Hello World </h1>
	</div>
}