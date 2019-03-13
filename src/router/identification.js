import Full from 'Container/Full'

const EAISMenu = () => import('Views/eais/menu/EAISMenu');


// Identification/Identification
// main
const Identification = () => import('Views/eais/identification/Identification/Items');
const IdentificationEditForm = () => import('Views/eais/identification/Identification/ItemEditForm');

// Header
const IdentificationSearch = () => import('Views/eais/identification/Identification/HeaderSearch');
const IdentificationHeader = () => import('Views/eais/identification/Identification/HeaderEdit');

// Inside Menu
const IdentificationMenu = () => import('Views/eais/identification/Identification/InsideMenu');

// Inside folder State
const IdentificationEditInfo = () => import('Views/eais/identification/Identification/inside/Info');
const IdentificationEditList = () => import('Views/eais/identification/Identification/inside/List');



// Identification/IdentificationList
// main
const IdentificationList = () => import('Views/eais/identification/Listid/Items');
const IdentificationListEditForm = () => import('Views/eais/identification/Listid/ItemEditForm');

// Header
const IdentificationListSearch = () => import('Views/eais/identification/Listid/HeaderSearch');
const IdentificationListHeader = () => import('Views/eais/identification/Listid/HeaderEdit');

// Inside Menu
const IdentificationListMenu = () => import('Views/eais/identification/Listid/InsideMenu');

// Inside folder State
const IdentificationListEditDelete = () => import('Views/eais/identification/Listid/inside/Delete');



export default {
   path: '/',
   component: Full,
   children: [
      {
         path: '/eais/identification/identification',
         components: {
           default: Identification,
           search: IdentificationSearch,
           menu: EAISMenu
         },
         meta: {
            requiresAuth: true,
            title: 'Идентификация',
            breadcrumb: 'ЕАИС / Идентификация / Идентификация'
         }
      },
      {
         path: '/eais/identification/identification/:id/',
         components: {
           default: IdentificationEditForm,
           search: IdentificationHeader,
           menu: IdentificationMenu
         },
         redirect: '/eais/identification/identification/:id/info',
         children: [
           {
             path: 'info',
             component: IdentificationEditInfo
           },
           {
             path: 'list',
             component: IdentificationEditList
            },
         ],
         meta: {
            requiresAuth: true,
            title: 'ГУП «Водоканал Санкт-Петербурга»',
            breadcrumb: 'ЕАИС / Иностранные работники / Заявки'
         }
      },
      {
         path: '/eais/identification/identificationlist',
         components: {
           default: IdentificationList,
           search: IdentificationListSearch,
           menu: EAISMenu
         },
         meta: {
            requiresAuth: true,
            title: 'Идентификация',
            breadcrumb: 'ЕАИС / Идентификация / Идентификация'
         }
      },
      {
         path: '/eais/identification/identificationlist/:id/',
         components: {
           default: IdentificationListEditForm,
           search: IdentificationListHeader,
           menu: IdentificationListMenu
         },
         redirect: '/eais/identification/identificationlist/:id/delete',
         children: [
           {
             path: 'delete',
             component: IdentificationListEditDelete
           }
         ],
         meta: {
            requiresAuth: true,
            title: 'ГУП «Водоканал Санкт-Петербурга»',
            breadcrumb: 'ЕАИС / Иностранные работники / Заявки'
         }
      },
      // {
      //    path: '/eais/foreigners/conclusions',
      //    components: {
      //      default: ForeignConclusions,
      //      search: ForeignCompanySearch,
      //      menu: EAISMenu
      //    },
      //    meta: {
      //       requiresAuth: true,
      //       title: 'Заключения',
      //       breadcrumb: 'ЕАИС / Иностранные работники / Заключения'
      //    }
      // },
      // {
      //    path: '/eais/foreigners/conclusion/:id/',
      //    components: {
      //      default: ForeignConclusionEditForm,
      //      search: ForeignCompanyHeaderEdit,
      //      menu: ForeignConclusionMenu
      //    },
      //    redirect: '/eais/foreigners/conclusion/:id/requisites',
      //    children: [
      //      {
      //        path: 'requisites',
      //        component: ForeignConclusionEditRequisites
      //      }, {
      //        path: 'list',
      //        component: ForeignConclusionEditList
      //      }, {
      //        path: 'quotas',
      //        component: ForeignConclusionEditQuotas
      //      }, {
      //        path: 'statistics',
      //        component: ForeignConclusionEditStatistics
      //      }
      //    ],
      //    meta: {
      //       requiresAuth: true,
      //       title: '',
      //       breadcrumb: 'ЕАИС / Иностранные работники / Заключения'
      //    }
      // },
   ]
}
