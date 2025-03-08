import { AiFillStar } from "react-icons/ai";
import { useEffect, useState } from "react"
export default function Page1() {
	const [data, setData] = useState([])
	console.log(data)
	useEffect(() => {
		getdata();
	}, [])

	const getdata = async () => {
		let response = await fetch("./api/collegedetails");
		let newresponse = await response.json();
		setData(newresponse.data)

	}
	return (

		<div className=" w-4/5 h-fit m-auto lg:grid gap-5 grid-cols-3 lg:grid-rows-3 mt-6">
			{data.map((e) => {
				return <>
					<div className="lg:h-6/6 lg:w-9/12 shadow-2xl rounded-2xl mb-5  ">
						<img className="w-96 h-80  " src={`https://upschol.s3.ap-south-1.amazonaws.com/${e.College_image}`} />
						<h3 className="pl-6">{e?.College_Name}</h3>
						<div className="flex mt-2 pl-5">
							<AiFillStar style={{ color: '#ffc107' }} />
							<AiFillStar style={{ color: '#ffc107' }} />
							<AiFillStar style={{ color: '#ffc107' }} />
							<AiFillStar style={{ color: '#ffc107' }} />
							<AiFillStar />
						</div>
						<div className="flex justify-around  mt-4 justify-around text-center ">
							<div className="ml-2 bg-sky-50 px-4 rounded-xl text-center flex "><svg className='mt-1 me-1' stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path fill="none" d="M0 0h24v24H0V0z"></path><path d="M14 12c0 .74-.4 1.38-1 1.72V22h-2v-8.28c-.6-.35-1-.98-1-1.72 0-1.1.9-2 2-2s2 .9 2 2zm-2-6c-3.31 0-6 2.69-6 6 0 1.74.75 3.31 1.94 4.4l1.42-1.42A3.957 3.957 0 018 12c0-2.21 1.79-4 4-4s4 1.79 4 4c0 1.19-.53 2.25-1.36 2.98l1.42 1.42A5.957 5.957 0 0018 12c0-3.31-2.69-6-6-6zm0-4C6.48 2 2 6.48 2 12c0 2.85 1.2 5.41 3.11 7.24l1.42-1.42A7.987 7.987 0 014 12c0-4.41 3.59-8 8-8s8 3.59 8 8c0 2.29-.98 4.36-2.53 5.82l1.42 1.42C20.8 17.41 22 14.85 22 12c0-5.52-4.48-10-10-10z"></path></svg><p className='text-center'>Listen Podcast</p></div>
							<div className="bg-sky-50 rounded-xl px-4 flex"><svg className='pt-1 me-1' stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 1024 1024" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg" style={{ marginTop: 2 }}><path d="M912 302.3L784 376V224c0-35.3-28.7-64-64-64H128c-35.3 0-64 28.7-64 64v576c0 35.3 28.7 64 64 64h592c35.3 0 64-28.7 64-64V648l128 73.7c21.3 12.3 48-3.1 48-27.6V330c0-24.6-26.7-40-48-27.7zM712 792H136V232h576v560zm176-167l-104-59.8V458.9L888 399v226zM208 360h112c4.4 0 8-3.6 8-8v-48c0-4.4-3.6-8-8-8H208c-4.4 0-8 3.6-8 8v48c0 4.4 3.6 8 8 8z"></path></svg><p className='text-center ' >Watch Video</p> </div>
						</div>
						<p style={{ color: "#538de1", marginLeft: 25, fontWeight: 700, marginTop: 5 }}>₹ {e.Course_fees}</p>
						<p style={{ fontWeight: 20, fontFamily: 'Times New Roman', marginTop: 10, marginLeft: 10 }}>{e.university}</p>
						<hr className='w-11/12 border-gray-300 ml-3 ' />
						<div className='flex'>
							<input className='ml-5 border-b-sky-500' type="checkbox" />
							<p style={{ color: "#538de1", marginLeft: 10, fontWeight: 900, marginTop: 2 }}>Add To Compare</p>
						</div>
					</div></>
			})}

		</div>

	)
}