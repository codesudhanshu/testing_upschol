
import { useEffect, useState } from "react";
import Link from 'next/link';
import { useRouter } from "next/router";

import collegeModel from "../../../../model/collegeModel";
import dbConnect from "../../../../dbConnect";
import { AdminNavigation } from "../../../../components/Navigation";

export async function getServerSideProps(context) {
	await dbConnect();
	const college = await collegeModel.find({}).lean();
	return {
		props: {
			college: JSON.parse(JSON.stringify(college))
		},
	}
}

export default function Pages({ college }) {

	const [data, setData] = useState([]);
	const router = useRouter();

	useEffect(() => {
		setData(college)
	}, [college]);

	return (
		<>
			<AdminNavigation />
			<div className="container mx-auto relative overflow-x-auto">
				<div className="mt-8 mb-4 flex justify-between items-center">
					<h1 className="text-3xl font-semibold lg:text-4xl" style={{ color: "#4f46e5" }}>All College</h1>
					<button style={{ backgroundColor: "#4f46e5" }} className="hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={() => {
						router.push("/admin/addCollege")
					}}>
						Add College
					</button>
				</div>

				<table className="w-full text-sm text-left text-gray-500 lg:mt-6">
					<thead style={{ backgroundColor: "#4f46e5" }} className="text-xs text-white uppercase bg-gray-300">
						<tr>
							<th scope="col" className="px-6 py-3 ">College Name</th>
							<th scope="col" className="px-6 py-3">University</th>
							<th scope="col" className="px-6 py-3">Publish College</th>
							<th scope="col" className="px-6 py-3">Rating</th>
							<th scope="col" className="px-6 py-3">College Link</th>
							<th scope="col" className="px-6 py-3">actions</th>
						</tr>
					</thead>
					<tbody className="tbody">
						{
							data.map((e) => (
								<tr className="bg-white border-b" key={e._id}>
									<td className="px-6 py-4">{e.college_name}</td>
									<td className="px-6 py-4">{e.university}</td>
									<td className="px-6 py-4">{e.hidecollege ? "Yes" : "No"}</td>
									<td className="px-6 py-4">{e.rating}</td>
									<td className="px-6 py-4">{e.slug}</td>
									<div className="flex flex-col">
										<Link href={`/admin/college/college_page/${e._id}`}>
											<button style={{ backgroundColor: "#4f46e5" }} className="hover:bg-lime-500 text-white font-bold py-2 px-9 rounded mt-2 ">
												Edit
											</button>
										</Link>
									</div>
								</tr>
							))
						}
					</tbody>
				</table>
			</div>
		</>

	)
}