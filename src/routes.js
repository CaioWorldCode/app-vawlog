import { lazy } from 'react'
import { DEFAULT_PATHS } from 'config.js'


const appRoot = DEFAULT_PATHS.APP.endsWith('/') ? DEFAULT_PATHS.APP.slice(1, DEFAULT_PATHS.APP.length) : DEFAULT_PATHS.APP;

const home = lazy(() => import('views/home'))
const privacy = lazy(() => import('views/policies/privacy'))
const data = lazy(() => import('views/policies/data'))
const cookies = lazy(() => import('views/policies/cookies'))
const regulation = lazy(() => import('views/policies/regulation'))
const contact = lazy(() => import('views/contact'))
const faq = lazy(() => import('views/faq'))
const users = lazy(() => import('views/users/list'))
const orders = lazy(() => import('views/orders/list'))



const routesAndMenuItems = {
	mainMenuItems: [
		{
			path: DEFAULT_PATHS.APP,
			exact: true,
			redirect: true,
			to: `${appRoot}/home`,
			protected: true
		},

		{
			path: `${appRoot}/home`,
			component: home,
			label: 'Dashboard',
			icon: 'dashboard-1',
			protected: true
		},

		{
			path: `${appRoot}/orders`,
			component: orders,
			label: 'Ordens de coleta',
			icon: 'archive',
			protected: true
		},

		{
			path: `${appRoot}/users`,
			component: users,
			label: 'Usuários',
			icon: 'user',
			protected: true
		},

		{
			path: `${appRoot}/contact`,
			component: contact,
			label: 'Contato',
			icon: 'phone',
			protected: true
		},

		{
			path: `${appRoot}/faq`,
			component: faq,
			label: 'FAQ',
			icon: 'question-hexagon',
			protected: true
		},

		{
			path: `${appRoot}/policies/data`,
			component: data,
			label: 'Privacidade de dados',
			icon: 'database',
			protected: true
		},

		{
			path: `${appRoot}/policies/usage`,
			component: privacy,
			label: 'Políticas de uso',
			icon: 'content',
			protected: true
		},

		{
			path: `${appRoot}/policies/cookies`,
			component: cookies,
			label: 'Cookies',
			icon: 'warning-hexagon',
			protected: true
		},

		{
			path: `${appRoot}/policies/regulation`,
			component: regulation,
			label: 'Regulamento',
			icon: 'book',
			protected: true
		},
	],
	sidebarItems: [
		// {
		// 	path: `${appRoot}/organizations`,
		// 	component: organizations.index,
		// 	label: 'Organização',
		// 	icon: 'users',
		// 	protected: false,
		// 	visible: false,
		// 	subs: [
		// 		{ path: '/users/:slug', label: 'Usuários', component: organizations.user_list },
		// 	],
		// },
	],
}

export default routesAndMenuItems
