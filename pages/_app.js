import '../styles/globals.css'
import '../styles/shadow.css'
import '../styles/files.css'
import Head from "next/head";
import { CookiesProvider } from 'react-cookie';
import { Layout } from 'antd';
import CustomFooter from '../components/layout/footer';
import PublicHeader from '../components/layout/header';
import { useRouter } from 'next/router';

const { Content, Footer } = Layout;

export default function App({ Component, pageProps }) {
	const router = useRouter();
	const isAdmin = router.pathname.includes('admin');

	// Jin pages pe header/footer nahi dikhana hai
	const hideLayoutPaths = [
		'/lpu-online-learning-plateform',
		'/amity-online-program',
		'/nmims-online-mba',
		'/manipal-online-mba-program',
		'/thank-you'
	];

	const shouldHideLayout = hideLayoutPaths.includes(router.pathname);

	return (
		<>
		<Head>
        <link rel="icon" href="/favicon.ico" />
      </Head>
		<CookiesProvider>
			<Layout className='min-h-screen'>
				{/* Header hide condition */}
				{!isAdmin && !shouldHideLayout && (
					<div
						className='bg-background_color shadow-md px-4 py-2.5'
						style={{
							boxShadow: "rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px",
							position: 'sticky',
							top: 0,
							zIndex: 1000,
						}}
					>
						<PublicHeader />
					</div>
				)}

				<Content className='max-w-screen bg-white'>
					<Component {...pageProps} />
				</Content>

				{/* Footer hide condition */}
				{!shouldHideLayout && (
					<Footer style={{ padding: 0 }}>
						<CustomFooter />
					</Footer>
				)}
			</Layout>
		</CookiesProvider>
		</>
	);
}
