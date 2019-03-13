import Full from 'Container/Full'

const EAISMenu = () => import('Views/eais/menu/EAISMenu');
// Foreigners/Companys

// // Views/eais/foreigners/
// const ActivitiesCompanys = () => import('Views/eais/activities/Companys');
// const ActivitiesCompanyEditForm = () => import('Views/eais/activities/ActivitiesCompanyEditForm');
// const ActivitiesContracts = () => import('Views/eais/activities/Contracts');
// const ActivitiesContractEditForm = () => import('Views/eais/activities/ActivitiesContractEditForm');
//
// // Views/eais/search/
// const ActivitiesCompanysSearch = () => import('Views/eais/search/ActivitiesCompanysSearch');
// const ActivitiesCompanyHeaderEdit = () => import('Views/eais/search/ActivitiesCompanyHeaderEdit');
// const ActivitiesContractHeaderEdit = () => import('Views/eais/search/ActivitiesContractHeaderEdit');
//
// // Views/eais/menu/foreigners/
// const ActivitiesContractMenu = () => import('Views/eais/menu/activities/ActivitiesContractMenu');
//
// // Views/eais/foreigners/editCompanys/
// const ActivitiesContractEditInfo = () => import('Views/eais/activities/editContract/Info');
// const ActivitiesContractEditSubject = () => import('Views/eais/activities/editContract/Subject');
// const ActivitiesContractEditVacancies = () => import('Views/eais/activities/editContract/Vacancies');


// main
const ActivitiesActs = () => import('Views/eais/activities/Acts/Items');
const ActivitiesActsEditForm = () => import('Views/eais/activities/Acts/ItemEditForm');
// Header
const ActivitiesActsSearch = () => import('Views/eais/activities/Acts/HeaderSearch');
const ActivitiesActsHeader = () => import('Views/eais/activities/Acts/HeaderEdit');
// Inside Menu
const ActivitiesActsMenu = () => import('Views/eais/activities/Acts/InsideMenu');
// Inside folder
const ActivitiesActsEditInfo = () => import('Views/eais/activities/Acts/inside/Info');


// function loadEais (component) {
//   // '@' is aliased to src/Views
//   return () => import(`@/Views/${component}.vue`)
// }

export default {
   path: '/',
   component: Full,
   children: [
      {
        path: '/eais/activities/acts',
        components: {
          default: ActivitiesActs,
          search: ActivitiesActsSearch,
          menu: EAISMenu
        },
        meta: {
           requiresAuth: true,
           title: 'Договора',
           breadcrumb: 'ЕАИС / Активные программы / Договоры'
        }
      },
      {
        path: '/eais/activities/acts/:id/',
        components: {
          default: ActivitiesActsEditForm,
          search: ActivitiesActsHeader,
          menu: ActivitiesActsMenu
        },
        redirect: '/eais/activities/acts/:id/info',
        children: [
          {
            path: 'info',
            component: ActivitiesActsEditInfo,
            meta: {
               breadcrumb: 'ЕАИС / Активные программы / Договоры / Предмет договора'
            }
          }
        ],
        meta: {
           requiresAuth: true
        }
      },
      // {
      //    path: '/eais/activities/companys',
      //    components: {
      //      default: ActivitiesCompanys,
      //      search: ActivitiesCompanysSearch,
      //      menu: EAISMenu
      //    },
      //    meta: {
      //       requiresAuth: true,
      //       title: 'Предприятия',
      //       breadcrumb: 'ЕАИС / Активные программы / Предприятия'
      //    }
      // },
      // {
      //    path: '/eais/activities/contracts',
      //    components: {
      //      default: ActivitiesContracts,
      //      search: ActivitiesCompanysSearch,
      //      menu: EAISMenu
      //    },
      //    meta: {
      //       requiresAuth: true,
      //       title: 'Договора',
      //       breadcrumb: 'ЕАИС / Активные программы / Договора'
      //    }
      // },
      // {
      //    path: '/eais/activities/contract/:id/',
      //    components: {
      //      default: ActivitiesContractEditForm,
      //      search: ActivitiesContractHeaderEdit,
      //      menu: ActivitiesContractMenu
      //    },
      //    redirect: '/eais/activities/contract/:id/info',
      //    children: [
      //      {
      //        path: 'info',
      //        component: ActivitiesContractEditInfo
      //      }, {
      //        path: 'subject',
      //        component: ActivitiesContractEditSubject
      //      }, {
      //        path: 'vacancies',
      //        component: ActivitiesContractEditVacancies
      //      }
      //    ],
      //    meta: {
      //       requiresAuth: true,
      //       title: '',
      //       breadcrumb: 'ЕАИС / Активные программы / Карточка договора'
      //    }
      // },
   ]
}
