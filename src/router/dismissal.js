import Full from 'Container/Full'

const EAISMenu = () => import('Views/eais/menu/EAISMenu');
// Foreigners/Companys

// Dismissal/Companies
// main
const DismissalCompanies = () => import('Views/eais/dismissal/Companies/Items');
const DismissalCompanyEditForm = () => import('Views/eais/dismissal/Companies/ItemEditForm');
// Header
const DismissalCompaniesSearch = () => import('Views/eais/dismissal/Companies/HeaderSearch');
const DismissalCompanyHeader = () => import('Views/eais/dismissal/Companies/HeaderEdit');
// Inside Menu
const DismissalCompanyMenu = () => import('Views/eais/dismissal/Companies/InsideMenu');
// Inside folder State
const DismissalCompanyEditInfo = () => import('Views/eais/dismissal/Companies/inside/Info');
const DismissalCompanyEditProgress = () => import('Views/eais/dismissal/Companies/inside/Progress');
const DismissalCompanyEditList = () => import('Views/eais/dismissal/Companies/inside/List');


// Dismissal/Parttimes
// main
const DismissalPartTimes = () => import('Views/eais/dismissal/PartTimes/Items');
const DismissalPartTimesEditForm = () => import('Views/eais/dismissal/PartTimes/ItemEditForm');
// Header
const DismissalPartTimesSearch = () => import('Views/eais/dismissal/PartTimes/HeaderSearch');
const DismissalPartTimesHeader = () => import('Views/eais/dismissal/PartTimes/HeaderEdit');
// Inside Menu
const DismissalPartTimesMenu = () => import('Views/eais/dismissal/PartTimes/InsideMenu');
// Inside folder State
const DismissalPartTimesEditInfo = () => import('Views/eais/dismissal/PartTimes/inside/Info');


export default {
   path: '/',
   component: Full,
   children: [
      {
         path: '/eais/dismissal/companies',
         components: {
           default: DismissalCompanies,
           search: DismissalCompaniesSearch,
           menu: EAISMenu
         },
         meta: {
            requiresAuth: true,
            title: 'Предприятия',
            breadcrumb: 'ЕАИС / Высвобождения / Предприятия'
         }
      },
      {
        path: '/eais/dismissal/company/:id/',
        components: {
          default: DismissalCompanyEditForm,
          search: DismissalCompanyHeader,
          menu: DismissalCompanyMenu
        },
        redirect: '/eais/dismissal/company/:id/info',
        children: [
          {
            path: 'info',
            component: DismissalCompanyEditInfo
          },
          {
            path: 'progress',
            component: DismissalCompanyEditProgress
          },
          {
            path: 'list',
            component: DismissalCompanyEditList
          }
        ],
        meta: {
          requiresAuth: true,
          title: 'ГУП «Водоканал Санкт-Петербурга»',
          breadcrumb: 'ЕАИС / Высвобождения / Высвобождения'
        }
      },
      {
         path: '/eais/dismissal/parttime',
         components: {
           default: DismissalPartTimes,
           search: DismissalPartTimesSearch,
           menu: EAISMenu
         },
         meta: {
            requiresAuth: true,
            title: 'Заявки',
            breadcrumb: 'ЕАИС / Высвобождения / Режимы неполного времени'
         }
      },
      {
        path: '/eais/dismissal/parttime/:id/',
        components: {
          default: DismissalPartTimesEditForm,
          search: DismissalPartTimesHeader,
          menu: DismissalPartTimesMenu
        },
        redirect: '/eais/dismissal/parttime/:id/info',
        children: [
          {
            path: 'info',
            component: DismissalPartTimesEditInfo
          }
        ],
        meta: {
          requiresAuth: true,
          title: 'ГУП «Водоканал Санкт-Петербурга»',
          breadcrumb: 'ЕАИС / Работодатели / Работодатель / Потребности'
        }
      },
   ]
}
