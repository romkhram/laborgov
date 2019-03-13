import Vue from 'vue'
import Router from 'vue-router'

//routes
import eaisRoutes from './eais';
import dismissalRoutes from './dismissal';
import foreignersRoutes from './foreigners';
import activitiesRoutes from './activities';
import identificationRoutes from './identification';
import populationRoutes from './population';

// import defaultRoutes from './default';
// import horizontalRoutes from './horizontal';
// import boxedRoutes from './boxed';
// import mini from './mini';
// import boxedV2 from './boxed-v2';

// session components
const LoginOne = () => import('Views/session/LoginOne');

const Auth0CallBack = () => import('Components/Auth0Callback/Auth0Callback');
// 404 not found
// const NotFoundComponent = () => import('Views/system/404');


Vue.use(Router)

export default new Router({
	mode: 'history',
	base: '/ui',
	routes: [
		eaisRoutes,
		dismissalRoutes,
		foreignersRoutes,
		activitiesRoutes,
		identificationRoutes,
		populationRoutes,
		// defaultRoutes,
		// horizontalRoutes,
		// boxedRoutes,
		// mini,
		// boxedV2,
		{
			path: '/session/login',
			component: LoginOne,
			meta: {
				title: 'message.login',
				breadcrumb: 'Session / Login'
			}
		}
	]
})
