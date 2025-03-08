import { useEffect, useState } from "react";
import Link from 'next/link';
import { useRouter } from "next/router";
import contactUsModel from "../../../model/contactUsModel";
import dbConnect from "../../../dbConnect";
import { AdminNavigation } from "../../../components/Navigation";

export async function getServerSideProps(context) {

	await dbConnect();
	const contacts = await contactUsModel.find({}).sort({ createdAt: -1 }).lean();

	return {
		props: {
			contacts: JSON.parse(JSON.stringify(contacts))
		}, 
	}
}

export default function LeadManagement(props) {
	const contacts = props?.contacts;
	const [data, setData] = useState([])
	const router = useRouter();

	useEffect(() => {
		setData(contacts)
	}, []);
	return (
		<>
			<AdminNavigation />
			<div className=" container mx-auto relative overflow-x-auto">
				<h1 className="mt-8 text-3xl font-semibold lg:text-4xl lg:mt-12 mx-auto" style={{ color: "#4f46e5" }}>All Contact US</h1>
				<table className="w-full text-sm text-left text-gray-500 dark:text-gray-400 lg:mt-6">
					<thead style={{ backgroundColor: "#4f46e5" }} className="text-xs text-white uppercase bg-gray-300 dark:bg-gray-700 dark:text-gray-400">
						<tr>
							<th scope="col" className="px-6 py-3 ">Name</th>
							<th scope="col" className="px-6 py-3">Email</th>
							<th scope="col" className="px-6 py-3">Phone Number</th>

						</tr>
					</thead>
					<tbody className="tbody">
						{
							data.map((e) => (
								<tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700" key={e._id}>
									<td className="px-6 py-4">{e.name}</td>
									<td className="px-6 py-4">{e.email}</td>
									<td className="px-6 py-4">{e.phoneNumber}</td>
								</tr>
							))
						}
					</tbody>
				</table>
			</div>
		</>
	)
}