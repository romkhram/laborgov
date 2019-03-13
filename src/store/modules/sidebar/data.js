// Sidebar Routers
export const menus = {
	'message.general': [
		// {
		// 	action: '',
		// 	typeAction: 'zmdi zmdi-group-work',
		// 	title: 'message.dashboard',
		// 	active: true,
		// 	items: [
		// 		{ title: 'message.ecommerce', path: '/default/dashboard/ecommerce', exact: true },
		// 		{ title: 'message.webAnalytics', path: '/default/dashboard/web-analytics', exact: true },
		// 		{ title: 'message.magazine', path: '/horizontal/dashboard/magazine', exact: true },
		// 		{ title: 'message.news', path: '/boxed-v2/dashboard/news', exact: true },
		// 		{ title: 'message.agency', path: '/boxed/dashboard/agency', exact: true }
		// 	]
		// },
		{
			action: 'assignment_ind',
			typeAction: 'v-icon material-icons',
			title: 'Предприятия',
			active: false,
			className: 'ORGUSER',
			items: [
				{ title: 'Работодатели', path: '/eais/employers/employers', exact: true },
				{ title: 'Потребности', path: '/eais/employers/needs', exact: true },
				{ title: 'Вакансии', path: '/eais/employers/vacancies', exact: true },
				{ title: 'Рабочие места', path: '/eais/employers/jobs', exact: true },
				{ title: 'Подбор соискателей', path: '/eais/employers/recruitment', exact: true },
				// { title: 'Квоты', path: '/eais/employers/quotas', exact: true },
				{ title: 'Мероприятия', path: '/eais/employers/events', exact: true }
			]
		},
		{
			action: 'done_all',
			typeAction: 'v-icon material-icons',
			title: 'Идентификация',
			active: false,
			className: 'ORGUSER',
			items: [
				{ title: 'Идентификация', path: '/eais/identification/identification', exact: true },
				{ title: 'Идентификация по списку', path: '/eais/identification/identificationlist', exact: true }
			]
		},
		{
			action: 'access_alarm',
			typeAction: 'v-icon material-icons',
			title: 'Активные программы',
			active: false,
			className: 'ORGUSER',
			items: [
				// { title: 'Предприятия', path: '/eais/activities/companys', exact: true },
				{ title: 'Договоры', path: '/eais/activities/acts', exact: true }
			]
		},
		{
			action: 'work_off',
			typeAction: 'v-icon material-icons',
			title: 'Высвобождения',
			active: false,
			className: 'ORGUSER',
			items: [
				{ title: 'Предприятия', path: '/eais/dismissal/companies', exact: true },
				// { title: 'Режимы неполного времени', path: '/eais/dismissal/parttime', exact: true }
			]
		},
		{
			action: 'transfer_within_a_station',
			typeAction: 'v-icon material-icons',
			title: 'Иностранные работники',
			active: false,
			className: 'ORGUSER',
			items: [
				// { title: 'Предприятия', path: '/eais/foreigners/companys', exact: true },
				{ title: 'Заявки', path: '/eais/foreigners/requests', exact: true },
				{ title: 'Заключения', path: '/eais/foreigners/conclusions', exact: true }
			]
		},
		{
			action: 'group',
			typeAction: 'v-icon material-icons',
			title: 'Население',
			active: false,
			className: 'PERSUSER',
			items: [
				{ title: 'Список граждан', path: '/eais/population/population', exact: true },
				{ title: 'Регистрация заявок', path: '/eais/population/registration', exact: true },
				{ title: 'Трудоустройство', path: '/eais/population/employability', exact: true },
				// { title: 'Электронные заявления', path: '/eais/population/reception', exact: true }
			]
		}, {
				action: 'assignment',
				typeAction: 'v-icon material-icons',
				title: 'Заявления',
				active: false,
				className: 'PERSUSER',
				items: [
					{ title: 'Электронные заявления', path: '/eais/applications/reception', exact: true }
				]
			},
	]
}
