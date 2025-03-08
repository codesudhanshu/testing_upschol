import { AiFillStar } from "react-icons/ai";
import Image from "next/image";
import Link from 'next/link';

function getStars(rating) {
	let arr = [];
	for (let i = 0; i < rating; i++) {
		arr.push(<AiFillStar style={{ color: '' }} />)
	}

	for (let i = 0; i < 5 - rating; i++) {
		arr.push(<AiFillStar style={{ color: "" }} />)
	}

	return arr;

}

export default function CollegeCard({ college }) {
	return (
		<Link href={`/collegedetails/${college?._id}`} className='w-full h-full'>
			<div className="lg:w-3/4  flex flex-col rounded-2xl overflow-hidden drop-shadow-md college-card">
				<div className="flex justify-around lg:w-96 lg:h-80">

					<div className="">
						{
							college?.banner_image &&
							<Image

								className="w-96 h-80"
								loader={({ src }) => `https://upschol.s3.ap-south-1.amazonaws.com/${src}`}
								src={`${college?.banner_image.path}`}
								alt={college?.college_name}
								width={100}
								height={100}
								style={{ marginTop: 30, marginLeft: 10 }}
							/>
						}
					</div>
					<div className="ml-32 mt-10 text-blue-500 font-semibold">Univerity</div>
					<div className="ml-20 mt-10 text-blue-500 font-semibold">
						<img alt="collegeLogo" src={`https://upschol.s3.ap-south-1.amazonaws.com/${college?.logo}`} />
					</div>



				</div>

			</div>
		</Link>

	)
}