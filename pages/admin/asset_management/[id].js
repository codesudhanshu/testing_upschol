import { useRouter } from 'next/router'
import { AdminNavigation } from '../../../components/Navigation';
import dbConnect from '../../../dbConnect';
import tagsModel from '../../../model/tags';
import { useCallback, useState } from 'react';
import { _fetch } from '../../../_fetch';
import collegeModel from '../../../model/collegeModel';
import { message } from 'antd';
import { TagCategories } from '../../../config';

export async function getServerSideProps(context) {
	await dbConnect();
	const tags = await tagsModel.findById(context.params.id).lean();
	const colleges = await collegeModel.find({ tags: context.params.id })
	const collegeNot = await collegeModel.find({ tags: { $ne: context.params.id } })
	return {
		props: {
			tags: JSON.parse(JSON.stringify(tags)),
			colleges: JSON.parse(JSON.stringify(colleges)),
			collegeNot: JSON.parse(JSON.stringify(collegeNot))
		}, // will be passed to the page component as props
	}
}

export default function Edit(props) {
	const router = useRouter();
	const { id } = router.query;
	const [tagName, setTagName] = useState(props.tags?.tag_name);
	const [tagCategory, setTagCategory] = useState(props.tags?.tag_category);
	const [duration, setDuration] = useState(props.tags?.duration);
	const [durationUnit, setDurationUnit] = useState(props.tags?.duration_unit);
	const [selectedValue, setSelectedValue] = useState('')

	const handleSelect = (e) => {
		setSelectedValue(e.target.value)
	}

	const handleEdit = async () => {
		try {
			const res = await _fetch(`/api/admin/tag/${id}`, {
				method: 'PATCH', body: {
					tag_name: tagName,
					tag_category: tagCategory,
					duration: duration,
					duration_unit: durationUnit,
					college_assign: selectedValue
				}
			})
			const response = await res.json();
			setSelectedValue('')
			if (response.success) {
				message.success('Tag Updated Successfully')
				router.replace(router.asPath);
			}
		} catch (error) {
			console.log(error)
			message.error('Something Went Wrong')
		}
	}

	const removeTag = async (collegeId) => {

		try {
			const res = await _fetch(`/api/admin/removeTag?id=${collegeId}`, {
				method: 'PATCH', body: {
					id: id
				}
			})
			const response = await res.json();
			if (response) {
				setSelectedValue('')
				router.replace(router.asPath);
			} else {
				message.error('something went wrong')
			}
		} catch (error) {
			console.log(error)
			message.error('something went wrong')
		}
	}

	return (
		<>
			<AdminNavigation />
			<div className="lg:flex min-h-full   py-12 px-4 sm:px-6 lg:px-8">
				<div className="w-full lg:ml-24 max-w-md space-y-8">
					<div>
						<h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
							Update Tag
						</h2>
					</div>

					<div className="-space-y-px rounded-md shadow-sm">
						<div>
							<label className="sr-only">
								Tag Name
							</label>
							<input
								name="tag_name"
								value={tagName}
								type="text"
								autoComplete="Tag Name"
								onChange={(e) => setTagName(e.target.value)}
								required
								className="relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
								placeholder="College Name"

							/>
						</div>
						<div>
							<select className='w-full px-3 py-2 bg-white rounded-none   w-full rounded-none rounded-b-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-indigo-500 sm:text-sm mt-2' name="college" onChange={(e) => setTagCategory(e.target.value)} >
								{TagCategories.map((e, i) => <option selected={props.tags?.tag_category === e ? true : false} key={i} value={e} >
									{e}
								</option>)}
							</select>
						</div>

						<div className="pt-4">
							<label htmlFor="duration">
								Duration in Years
							</label>
							<input
								name="duration"
								type="number"
								value={duration}
								onChange={(e) => setDuration(e.target.value)}
								id='duration'
								required
								className="relative block w-full appearance-none rounded-none border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm mt-2"
								placeholder="Duration"

							/>
						</div>
						<div className="pt-4">
							<label htmlFor="duration">
								Duration in Unit
							</label>
							<select className='w-full px-3 py-2 bg-white rounded-none   w-full rounded-none rounded-b-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-indigo-500 sm:text-sm mt-2' onChange={(e) => setDurationUnit(e.target.value)} >
								<option selected={props.tags?.duration_unit === "YEARS" ? true : false} value={"YEARS"} >
									YEARS
								</option>
								<option selected={props.tags?.duration_unit === "MONTHS" ? true : false} value={"MONTHS"} >
									MONTHS
								</option>
								<option selected={props.tags?.duration_unit === "WEEKS" ? true : false} value={"WEEKS"} >
									WEEKS
								</option>
							</select>
						</div>
						<div className="flex flex-col justify-between pt-4">
							<label>Assign College</label>
							<select className='w-full px-3 py-2 bg-white rounded-none border border-gray-300 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm mt-2' name="college" onChange={handleSelect} >
								<option value="none" selected disabled hidden>Select a College</option>
								{props?.collegeNot.map((e) => <option key={e._id} value={e._id} >
									{e.college_name}
								</option>)}
							</select>
						</div>
					</div>


					<div className="flex items-center justify-between">


					</div>

					<div>
						<button
							type="submit"
							className="group relative flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
							onClick={handleEdit}
						>
							<span className="absolute inset-y-0 left-0 flex items-center pl-3">
							</span>
							Update
						</button>
					</div>

				</div>
				<div className='pt-5 lg:pl-12 mx-auto relative overflow-x-auto'>
					<div className='ml-32 text-4xl'><h1>Colleges With Tag - <span style={{ textTransform: "capitalize" }}>{props.tags?.tag_name}</span> </h1></div>
					<table className="w-full text-sm text-left text-gray-500 dark:text-gray-400 lg:mt-6">


						<thead style={{ backgroundColor: "#4f46e5" }} className="w-full text-xs text-white uppercase bg-gray-300 dark:bg-gray-700 dark:text-gray-400">
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
								props?.colleges?.map((e) => (
									<tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700" key={e._id}>
										<td className="px-6 py-4">{e.college_name}</td>
										<td className="px-6 py-4">{e.university}</td>
										<td className="px-6 py-4">{e.hidecollege ? "Yes" : "No"}</td>
										<td className="px-6 py-4">{e.rating}</td>


										<td className="px-6 py-4">{e.slug}</td>
										<div className="flex flex-col">
											<button
												style={{ backgroundColor: "#4f46e5" }}
												className="mt-2 py-1 px-2  text-white  font-bold uppercase text-sm  lg:py-2 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
												type="button"
												onClick={() => removeTag(e._id)}
											>Remove Tag
											</button>
										</div>
									</tr>
								))
							}
						</tbody>
					</table>
				</div>
			</div>
		</>
	)
}