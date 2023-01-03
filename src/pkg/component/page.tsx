import type { ReactNode } from 'react'
import { Suspense } from 'react'
import { Helmet } from 'react-helmet'
import { CircleLoader } from 'react-spinners'

export const Loader = () => {
	const style1: any = { position: 'fixed', left: 0, top: 0, width: '100%', height: '100%', backgroundColor: 'rgba(255,255,255,0.05)', zIndex: 999 }
	const style2: any = {
		position: 'absolute',
		left: 0,
		right: 0,
		top: 'calc(50% - 20px)',
		margin: 'auto',
		height: '40px',
		width: '40px',
		'& img': { position: 'absolute', height: '25px', width: 'auto', top: 0, bottom: 0, left: 0, right: 0, margin: 'auto' },
	}
	return (
		<div style={style1}>
			<div style={style2}>
				<CircleLoader color='#6a95ff' />
			</div>
		</div>
	)
}
export const PageWrapper = (props: { title: string; component: ReactNode }) => {
	const { title, component } = props
	return (
		<Suspense fallback={<Loader />}>
			<Helmet>
				<meta charSet='utf-8' />
				<link rel='icon' type='image/png' href='/favicon.png' />
				<link rel='apple-touch-icon' href='/apple-touch-icon.png' />
				<meta name='viewport' content='width=device-width, initial-scale=1.0' />
				<meta name='description' content='Lifepedia SEO' />
				<meta name='theme-color' content='#4471ff' />
				<title>{title}</title>
			</Helmet>
			{component}
		</Suspense>
	)
}
