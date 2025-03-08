import Image from "next/image";
import React, { useState } from "react";
import TagSvg from "../public/tag.js";
import { useRouter } from "next/router.js";
import { _fetch } from "../_fetch";

const TagCard = ({ category, Tags }) => {
	const [tags, setTags] = useState(Tags[category]);
	const [hovered, setHovered] = useState(false);
	const router = useRouter();
	if (!tags || tags.length === 0) return <span>Data Not Found</span>;
	else
		return (
			<div
				id="tagCardContainer"
				className="grid place-items-center mx-auto xxl:grid-cols-6 xl:grid-cols-5 lg:grid-cols-3 md:grid-cols-3  grid-cols-2 lg:gap-x-0 xl:gap-x-8 gap-y-8"
			>
				{
					tags.map((e) => (
						<div
							id="tagCard"
							onClick={() => router.push(`/colleges?tagId=${e._id}`)}
							onMouseEnter={() => setHovered(e._id)}
							onMouseLeave={() => setHovered(false)}
							key={e._id}
							style={{ minHeight: "9rem", minWidth: "9.5rem" }}
							className={hovered !== e._id ? "bg-white cursor-pointer grid grid-cols-1 shadow-[0_35px_60px_-15px_rgba(0,0,0,0.3)] md:h-5/6 rounded-t-lg rounded-b-lg" : "grid cursor-pointer grid-cols-1 shadow-[0_35px_60px_-15px_rgba(0,0,0,0.3)] md:h-5/6 rounded-t-lg rounded-b-lg grow-element"}
						>
							<div className="flex justify-end rounded-md py-1 px-2">
								<span className="py-1 px-4 font-Poppins text-xs font-medium bg-[#FAEBD7] rounded-2xl" >
									{e.duration} Years
								</span>
							</div>
							<div id="tagContent"
								className="grid grid-cols-1 py-2 md:pt-3 place-items-center rounded-t-lg"
								style={{ minHeight: "7rem" }}
							>
								<TagSvg color={"#7F56D9"} />
								<h3
									className="text-center font-medium font-Poppins text-xxs md:text-sm"
									style={{
										color: "black",
										transition: "all 0.1s",
										textTransform: "capitalize",
										fontFamily: "'Poppins', sans-serif"
									}}
								>
									{e.tag_name}
								</h3>
							</div>
							<span
								style={{
									color: "white",
									fontFamily: "'Poppins', sans-serif"
								}}
								className="font-medium bg-purple py-1 md:py-1 rounded-b-lg font-Poppins text-center text-xxs md:text-xs"
							>
								{e.duration} Years
							</span>
						</div>
					))
				}

			</div>
		);
};

export default TagCard;
