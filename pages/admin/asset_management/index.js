import React, { useState } from 'react'
import { AdminNavigation } from "../../../components/Navigation";
import { useRouter } from 'next/router';
import Tag from '../../../model/tags';
import { MdOutlineDelete } from 'react-icons/md';
import { _fetch } from '../../../_fetch';
import { FiEdit } from 'react-icons/fi'
import Link from 'next/link';
import { message } from 'antd';

export async function getServerSideProps({ req, query, resolvedUrl }) {
	try {
		const tags = await Tag.find({});
		if (tags.length > 0) {
			return {
				props: {
					tags: JSON.parse(JSON.stringify(tags))
				},
			}
		}
		return {
			props: {
				tags: []
			},
		};
	} catch (error) {
		console.log(error);
		return {
			props: {
				tags: []
			},
		};
	}

}



const Index = ({ tags }) => {
	const router = useRouter();
	const [data, setData] = useState([]);


	React.useEffect(() => {
		setData(tags)
	}, [tags]);


	const deleteTag = async (_id) => {
		try {
			const res = await _fetch(`/api/admin/tag/${_id}`, { method: 'DELETE' })
			const response = await res.json()
			if (response.success) {
				setData((prev) => prev.filter((e) => e._id !== _id))
				message.success(`Tag Deleted Successfully`)
			} else {
				message.error(`Something Went Wrong`)
			}
		} catch (error) {
			console.log(error);
			message.error(`Something Went Wrong`)
		}

	}

	return (
		<>
			<AdminNavigation />
			<div className="container mx-auto relative overflow-x-auto">
				<div className="mt-8 mb-4 flex justify-between items-center">
					<h1 className="text-3xl mx-4 font-semibold lg:text-4xl" style={{ color: "#4f46e5" }}>All Tags</h1>
					<button style={{ backgroundColor: "#4f46e5" }} className="hover:bg-blue-700 text-white font-bold mx-4 py-2 px-4 rounded" onClick={() => {
						router.push("/admin/asset_management/addTags")
					}}>
						Add Tag
					</button>
				</div>
				<table className="w-full text-sm text-left text-gray-500 dark:text-gray-400 lg:mt-6">
					<thead style={{ backgroundColor: "#4f46e5" }} className="text-xs text-white uppercase bg-gray-300 dark:bg-gray-700 dark:text-gray-400">
						<tr>
							<th scope="col" className="px-6 py-3 ">Tag Name</th>
							<th scope="col" className="px-6 py-3">Tag Category</th>
							<th scope="col" className="px-6 py-3">Duration</th>
							<th scope="col" className="px-6 py-3">actions</th>
						</tr>
					</thead>
					<tbody className="tbody">
						{
							data?.map((e) => (
								<tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700" key={e._id}>
									<td className="px-6 py-4">{e.tag_name}</td>
									<td className="px-6 py-4">{e.tag_category}</td>
									<td className="px-6 py-4">{e.duration + " " + e.duration_unit}</td>
									<div className="flex 
									items-center justify-start px-4 py-4 gap-5">
										<div className="del-icon text-2xl" onClick={() => deleteTag(e._id)} ><MdOutlineDelete style={{ color: "red", cursor: "pointer" }} /></div>
										<div onClick={() => router.push(`/admin/asset_management/${e._id}`)} className="del-icon text-2xl"><FiEdit style={{ color: "green", cursor: "pointer" }} /></div>
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

export default Index
