import Link from 'next/link';
import blogModel from "../../../model/blogModel";
import dbConnect from "../../../dbConnect";
import { AdminNavigation } from "../../../components/Navigation"
import { useRouter } from "next/router";

export async function getServerSideProps(context) {

	await dbConnect();
	const blog = await blogModel.find({}).lean();
	return {
		props: {
			blog: JSON.parse(JSON.stringify(blog))
		}, // will be passed to the page component as props
	}
}

export default function Pages(props) {

	const blogs = props.blog;
	const router = useRouter();

	return (
		<>
			<AdminNavigation />
			<div className=" container mx-auto relative overflow-x-auto justify-around ">

				<button style={{ backgroundColor: "#4f46e5" }} className="mb-4 lg:mr-96  hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-12" onClick={() => {
					router.push("blog/create")
				}}>
					Write New Blog
				</button>
				<button style={{ backgroundColor: "#4f46e5" }} className="mb-4   float-right hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-12 " onClick={() => {
					router.push("blog/collections")
				}}>
					Manage Collections
				</button>

				<h1 className=" ml-20 mt-8 text-3xl font-semibold lg:text-4xl lg:mt-12 mx-auto lg:ml-96" style={{ color: "#4f46e5" }}>All Blogs</h1>
				<table className="w-full text-sm text-left text-gray-500 dark:text-gray-400 lg:mt-6">
					<thead style={{ backgroundColor: "#4f46e5" }} className="text-xs text-white uppercase bg-gray-300 dark:bg-gray-700 dark:text-gray-400">
						<tr>
							<th scope="col" className="px-6 py-3 ">Title</th>
							{/* <th scope="col" className="px-6 py-3">Collection</th> */}
							<th scope="col" className="px-6 py-3">Action</th>

						</tr>
					</thead>
					<tbody className="tbody">
						{blogs.map((e) => {
							return (
								<tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700" key={e._id}>
									<td className="px-6 py-4">{e.title}</td>

									<Link href={`blog/create?id=${e._id}`}>
										<button style={{ backgroundColor: "#4f46e5" }} className="hover:bg-lime-500 text-white font-bold py-2 px-4 rounded mt-2">
											Edit
										</button>
									</Link>
								</tr>
							)
						})}
					</tbody>
				</table>
			</div>
		</>

	)
}