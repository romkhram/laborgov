import Full from 'Container/Full'

const EAISMenu = () => import('Views/eais/menu/EAISMenu');
// Foreigners/Companys

const ForeignRequests = () => import('Views/eais/foreigners/Request/Items');
const ForeignRequestEditForm = () => import('Views/eais/foreigners/Request/ItemEditForm');
// Header
const ForeignCompanySearch = () => import('Views/eais/foreigners/Request/HeaderSearch');
const ForeignCompanyHeaderEdit = () => import('Views/eais/foreigners/Request/HeaderEdit');
// Inside Menu
const ForeignRequestMenu = () => import('Views/eais/foreigners/Request/InsideMenu');
// Inside folder State
const ForeignRequestEditProfessions = () => import('Views/eais/foreigners/Request/inside/Professions');



const ForeignConclusions = () => import('Views/eais/foreigners/Conclusions/Items');
const ForeignConclusionEditForm = () => import('Views/eais/foreigners/Conclusions/ItemEditForm');
// Header
const ForeignConclusionsSearch = () => import('Views/eais/foreigners/Conclusions/HeaderSearch');
const ForeignConclusionHeaderEdit = () => import('Views/eais/foreigners/Conclusions/HeaderEdit');
// Inside Menu
const ForeignConclusionMenu = () => import('Views/eais/foreigners/Conclusions/InsideMenu');
// Inside folder State
const ForeignConclusionEditProfessions = () => import('Views/eais/foreigners/Conclusions/inside/Professions');
const ForeignConclusionEditRequisites = () => import('Views/eais/foreigners/Conclusions/inside/Requisites');
const ForeignConclusionEditList = () => import('Views/eais/foreigners/Conclusions/inside/List');
const ForeignConclusionEditQuotas = () => import('Views/eais/foreigners/Conclusions/inside/Quotas');
const ForeignConclusionEditStatistics = () => import('Views/eais/foreigners/Conclusions/inside/Statistics');



// Views/eais/foreigners/
// const ForeignCompanys = () => import('Views/eais/foreigners/Companys');
// const ForeignCompanyEditForm = () => import('Views/eais/foreigners/ForeignCompanyEditForm');

// const ForeignRequests = () => import('Views/eais/foreigners/Requests');
// const ForeignRequestEditForm = () => import('Views/eais/foreigners/ForeignRequestEditForm');

// const ForeignConclusions = () => import('Views/eais/foreigners/Conclusions');
// const ForeignConclusionEditForm = () => import('Views/eais/foreigners/ForeignConclusionEditForm');

// Views/eais/search/
// const ForeignCompanySearch = () => import('Views/eais/search/ForeignCompanySearch');
// const ForeignCompanyHeaderEdit = () => import('Views/eais/search/ForeignCompanyHeaderEdit');

// Views/eais/menu/foreigners/
// const ForeignRequestMenu = () => import('Views/eais/menu/foreigners/ForeignRequestMenu');
// const ForeignConclusionMenu = () => import('Views/eais/menu/foreigners/ForeignConclusionMenu');

// Views/eais/foreigners/editCompanys/
// const ForeignCompanysEditInfo = () => import('Views/eais/foreigners/editCompany/Info');

// Views/eais/foreigners/editRequest/
// const ForeignRequestEditProfessions = () => import('Views/eais/foreigners/editRequest/Professions');

// Views/eais/foreigners/editRequest/
// const ForeignConclusionEditRequisites = () => import('Views/eais/foreigners/editConclusion/Requisites');
// const ForeignConclusionEditList = () => import('Views/eais/foreigners/editConclusion/List');
// const ForeignConclusionEditQuotas = () => import('Views/eais/foreigners/editConclusion/Quotas');
// const ForeignConclusionEditStatistics = () => import('Views/eais/foreigners/editConclusion/Statistics');


// function loadEais (component) {
//   // '@' is aliased to src/Views
//   return () => import(`@/Views/${component}.vue`)
// }

export default {
   path: '/',
   component: Full,
   children: [
      // {
      //    path: '/eais/foreigners/companys',
      //    components: {
      //      default: ForeignCompanys,
      //      search: ForeignCompanySearch,
      //      menu: EAISMenu
      //    },
      //    meta: {
      //       requiresAuth: true,
      //       title: 'Предприятия',
      //       breadcrumb: 'ЕАИС / Иностранные работники / Предприятия'
      //    }
      // },
      {
         path: '/eais/foreigners/requests',
         components: {
           default: ForeignRequests,
           search: ForeignCompanySearch,
           menu: EAISMenu
         },
         meta: {
            requiresAuth: true,
            title: 'Заявки',
            breadcrumb: 'ЕАИС / Иностранные работники / Заявки'
         }
      },
      {
         path: '/eais/foreigners/request/:id/',
         components: {
           default: ForeignRequestEditForm,
           search: ForeignCompanyHeaderEdit,
           menu: ForeignRequestMenu
         },
         redirect: '/eais/foreigners/request/:id/professions',
         children: [
           {
             path: 'professions',
             component: ForeignRequestEditProfessions
           }
         ],
         meta: {
            requiresAuth: true,
            title: 'ГУП «Водоканал Санкт-Петербурга»',
            breadcrumb: 'ЕАИС / Иностранные работники / Заявки'
         }
      },
      {
         path: '/eais/foreigners/conclusions',
         components: {
           default: ForeignConclusions,
           search: ForeignConclusionsSearch,
           menu: EAISMenu
         },
         meta: {
            requiresAuth: true,
            title: 'Заключения',
            breadcrumb: 'ЕАИС / Иностранные работники / Заключения'
         }
      },
      {
         path: '/eais/foreigners/conclusion/:id/',
         components: {
           default: ForeignConclusionEditForm,
           search: ForeignConclusionHeaderEdit,
           menu: ForeignConclusionMenu
         },
         redirect: '/eais/foreigners/conclusion/:id/requisites',
         children: [
           {
             path: 'requisites',
             component: ForeignConclusionEditRequisites
           }, {
             path: 'list',
             component: ForeignConclusionEditList
           }, {
             path: 'quotas',
             component: ForeignConclusionEditQuotas
           }, {
             path: 'statistics',
             component: ForeignConclusionEditStatistics
           }
         ],
         meta: {
            requiresAuth: true,
            title: '',
            breadcrumb: 'ЕАИС / Иностранные работники / Заключения'
         }
      },
   ]
}
