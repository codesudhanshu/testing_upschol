import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router'
import Image from 'next/image';
import { LuMenu } from "react-icons/lu";
import { IoCloseCircleOutline } from "react-icons/io5";
import { Button, Row, Col, Typography, Dropdown } from 'antd';
import { DownOutlined, RightOutlined, LeftOutlined } from '@ant-design/icons';



export function AdminNavigation() {
	const [isMenuOpen, setIsMenuOpen] = useState(false);

	const signout = async () => {

		let check = await fetch(`/api/admin/logout`, { method: 'DELETE' });
		if (check.status == 200) {
			router.push("/login")
		}
	}


	const router = useRouter();

	const navigationItems = [
		{ name: 'Admins', href: '/admin/admin_management'},
		{ name: 'Colleges', href: '/admin/college/college_page' },
		{ name: 'Leads', href: '/admin/lead_management'},
		{ name: 'Assets', href: '/admin/asset_management'},
		{ name: 'Blogs', href: '/admin/blog'},
		{ name: 'Courses', href: '/admin/courses'},
		{ name: 'Approvals', href: '/admin/approvals'},
		{ name: 'Contact Us', href: '/admin/contactUs'},
	];

	useEffect(() => {
		const handleResize = () => {
			if (window.innerWidth > 1024) setIsMenuOpen(true);
		}
		window.addEventListener('resize', handleResize);
		return () => {
			window.removeEventListener('resize', handleResize);
		}
	}, [])

	return (
		<>
			<div
				className={`flex flex-col my-2 py-2 md:py-4 h-full container ${isMenuOpen ? 'slide-in-top' : 'slide-out-top'} transition-all duration-300 shadow-lg rounded-lg`}
			>
				<div
					className="flex items-center h-full justify-between gap-x-2"
				>
					{
						isMenuOpen ? (
							<IoCloseCircleOutline
								className={`lg:hidden cursor-pointer`}
								color='#7F56D9'
								size={24}
								onClick={() => setIsMenuOpen(false)}
							/>
						) : (
							<LuMenu
								className={`lg:hidden cursor-pointer`}
								color='#7F56D9'
								size={20}
								onClick={() => setIsMenuOpen(true)}
							/>
						)
					}
					<div
						className='flex items-center gap-x-4 lg:gap-x-16'
					>
						<Link href="/">
							<Image
								className='h-8 w-auto lg:block'
								src="/logo.png"
								alt="UpSchol"
								width={100}
								height={30.3}
							/>
						</Link>
					</div>
					<div
						className='lg:flex items-center gap-x-4 lg:gap-x-16 hidden'
					>
						{
							navigationItems.map(item => (
								<Link
									key={item.id}
									href={item.href}
									className={`font-Poppins font-medium text-base ${router.pathname === item.href ? 'text-[#7F56D9]' : ''}`}
								>
									{item.name}
								</Link>
							))
						}
					</div>
				</div>

				{
					isMenuOpen && (
						<div
							className='gap-y-2 flex flex-col lg:hidden py-6'
						>
							{
								navigationItems.map(item => (
									<Link
										key={item.id}
										href={item.href}
										className={`font-Poppins font-medium text-base ${router.pathname === item.href ? 'text-[#7F56D9]' : ''}`}
										onClick={()=> setIsMenuOpen(false)}
									>
										{item.name}
									</Link>
								))
							}
						</div>
					)
				}
			</div>
		</>	
	)
}


