import { Col, Row } from "antd";
import Image from "next/image";
import { useRouter } from "next/router";
import { getS3Url } from "../../lib/s3";
import { useEffect, useRef, useState } from "react";

function BlogCard({ blog }) {

	const [extractedText, setExtractedText] = useState("");
	const router = useRouter();
	const ref = useRef();

	useEffect(() => {
		let allpTag = ref?.current.getElementsByTagName("p");

		let final = [];
		for (const pTag of allpTag) {
			final = [...final, pTag.lastChild?.textContent || ""]
		}

		setExtractedText(final)
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [ref?.current])

	return (
		<Col
			key={blog?._id}
			xs={24}
			md={8}
		>
			<div
				className="w-full h-auto p-2 cursor-pointer"
				onClick={() => {
					router.push(`/blogs/${blog?.slug}`)
				}}
			>
				<Image
					src={blog?.blog_banner || '/Student.png'}
					loader={({ src }) => getS3Url(src)}
					alt="Blog Banner"
					className="rounded-lg w-full h-3/4 object-cover"
					width={512}
					height={512}

				/>
				<div
					className="w-full h-1/4 mt-2"
				>
					<h4
						className="text-white text-lg font-semibold "
					>
						{blog?.title}
					</h4>
					<p
						className="text-white  line-clamp-2"
					>
						{
							(Array?.isArray(extractedText) && extractedText?.map(et => et)) ?? null
						}
					</p>
					<div
						ref={ref}
						className="hidden"
						dangerouslySetInnerHTML={{ __html: blog?.content }}
					/>

					<p
						className="text-[#ebdcf7] text-lg font-semibold mt-2"
					>
						Learn More &rarr;
					</p>
				</div>
			</div>
		</Col>
	)
}

export default function BlogSection({ blogs }) {
	return (
		<section
			id="blog-section-landing-page"
			className="pb-10 w-full overflow-hidden"
		>
			<div
				className="container w-full"
			>
				<p className="title">
					<span className="our">OUR</span>
					<span className="blogs">BLOGS</span>
				</p>
				<h3
					className="text-white text-center text-xl md:text-3xl lg:text-4xl font-semibold mt-2"
				>
					Get Set, Update with Upschol&apos;s Exclusive Blogs
				</h3>
				<p
					className="text-center text-base md:text-lg mt-4 text-white"
				>
					Dive into fascinating insights on academics and upskilling. Update with Upschol and stay ahead in the world of education
				</p>

				<Row
					className="mt-10"
					align={"stretch"}
					gutter={[16, 16]}
				>
					{
						blogs?.map((blog, i) => {
							return (
								<BlogCard blog={blog} key={i} />
							)
						}
						)
					}
				</Row>

			</div>
		</section>
	)
}