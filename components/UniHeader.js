import React, { useEffect, useState } from 'react'
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Button } from 'antd';
import BarIcon from '../public/BarIcon';

const UniHeader = () => {
    
	const router = useRouter();
	const [clicked,setClicked] = useState(false);
	const navigation = [
		{ name: 'Our Colleges', href: '/colleges', current: false, check: 2 },
		{ name: 'Blogs', href: '/blogs', current: false, check: 3 },
		{ name: 'About Us', href: '', current: false, check: 4 },
	];

	return (
		<nav className='w-full z-20 bg-white h-16 p-4 fixed flex items-center lg:justify-around justify-between'>
			<div className="left">
				<Link href="/admin/admin_management">
					<Image
						className="h-8 w-auto lg:block"
						src="/logo.png"
						alt="UpSchol"
						width={100}
						height={30.3}
					/>
				</Link>
			</div>
			
			<div className={!clicked?"not-show z-50 transition-all center items-center flex lg:hidden gap-4":"show transition-all center items-center lg:flex gap-4"}>
				{navigation.map((item) => (
					<Link

						key={item.name}
						href={item.href}
						style={{ fontFamily: "Poppins"}}
						className={`${router.asPath === item.href ? 'text-indigo-600' : 'text-slate-900 hover:text-indigo-600'} px-3 py-2 font-medium`}

						aria-current={item.current ? 'page' : undefined}
						data-tab={item.name}
					>
						{item?.name}
					</Link>
				))}                
			</div>
			<div className="hidden transition-all center items-center lg:flex gap-4">
				{navigation.map((item) => (
					<Link

						key={item.name}
						href={item.href}
						style={{ fontFamily: "Poppins"}}
						className={`${router.asPath === item.href ? 'text-indigo-600' : 'text-slate-900 hover:text-indigo-600'} px-3 py-2 font-medium`}

						aria-current={item.current ? 'page' : undefined}
						data-tab={item.name}
					>
						{item.name}
					</Link>
				))}                
			</div>
			<div className="right lg:flex hidden items-center gap-8 uniHeaderShadow">
				<Link className='text-black-2 bg-transparent font-semibold' href={'/'} >Sign In</Link>
				<button className='items-center flex px-2.5 py-3 rounded-md shadow-0px 0px 0px 4px #F4EBFF, 0px 1px 2px 0px rgba(16, 24, 40, 0.05) bg-purple text-white text-base font-semibold'>Create free account</button>
				
			</div>
			<div className='mt-12 h-20 w-20 bg-red lg:hidden' onClick={()=>setClicked(!clicked)}>
				<BarIcon/>
			</div>
		</nav>  
	)
}

export default UniHeader