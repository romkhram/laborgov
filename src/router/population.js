import Full from 'Container/Full'

const EAISMenu = () => import('Views/eais/menu/EAISMenu');
// Foreigners/Companys

// Population/Population
// main
const Population = () => import('Views/eais/population/Population/Items');
const PopulationEditForm = () => import('Views/eais/population/Population/ItemEditForm');
// Header
const PopulationSearch = () => import('Views/eais/population/Population/HeaderSearch');
const PopulationHeader = () => import('Views/eais/population/Population/HeaderEdit');
// Inside Menu
const PopulationMenu = () => import('Views/eais/population/Population/InsideMenu');
// Inside folder State
const PopulationEditInfo = () => import('Views/eais/population/Population/inside/Info');
const PopulationEditStatic = () => import('Views/eais/population/Population/inside/Static');
const PopulationEditChildren = () => import('Views/eais/population/Population/inside/Children');
const PopulationEditBook = () => import('Views/eais/population/Population/inside/Book');
const PopulationEditDegree = () => import('Views/eais/population/Population/inside/Degree');
const PopulationEditCategories = () => import('Views/eais/population/Population/inside/Categories');
const PopulationEditEtc = () => import('Views/eais/population/Population/inside/Etc');
const PopulationEditResults = () => import('Views/eais/population/Population/inside/Results');
const PopulationEditOrders = () => import('Views/eais/population/Population/inside/Orders');

// Population/Registration
// main
const PopulationRegistration = () => import('Views/eais/population/Registration/Items');
const PopulationRegistrationEditForm = () => import('Views/eais/population/Registration/ItemEditForm');
// Header
const PopulationRegistrationSearch = () => import('Views/eais/population/Registration/HeaderSearch');
const PopulationRegistrationHeader = () => import('Views/eais/population/Registration/HeaderEdit');
// Inside Menu
const PopulationRegistrationMenu = () => import('Views/eais/population/Registration/InsideMenu');
// Inside folder State
const PopulationRegistrationEditInfo = () => import('Views/eais/population/Registration/inside/Info');


// Population/Vacancies
// main
const PopulationVacancies = () => import('Views/eais/population/Vacancies/Items');
const PopulationVacanciesEditForm = () => import('Views/eais/population/Vacancies/ItemEditForm');
// Header
const PopulationVacanciesSearch = () => import('Views/eais/population/Vacancies/HeaderSearch');
const PopulationVacanciesHeader = () => import('Views/eais/population/Vacancies/HeaderEdit');
// Inside Menu
const PopulationVacanciesMenu = () => import('Views/eais/population/Vacancies/InsideMenu');
// Inside folder State
const PopulationVacanciesEditInfo = () => import('Views/eais/population/Vacancies/inside/Info');

// Population/Employability
// main
const PopulationEmployability = () => import('Views/eais/population/Employability/Items');
const PopulationEmployabilityEditForm = () => import('Views/eais/population/Employability/ItemEditForm');
// Header
const PopulationEmployabilitySearch = () => import('Views/eais/population/Employability/HeaderSearch');
const PopulationEmployabilityHeader = () => import('Views/eais/population/Employability/HeaderEdit');
// Inside Menu
const PopulationEmployabilityMenu = () => import('Views/eais/population/Employability/InsideMenu');
// Inside folder State
const PopulationEmployabilityEditInfo = () => import('Views/eais/population/Employability/inside/Info');
const PopulationEmployabilityEditDirections = () => import('Views/eais/population/Employability/inside/Directions');
const PopulationEmployabilityEditOffer = () => import('Views/eais/population/Employability/inside/Offer');
const PopulationEmployabilityEditSuggestions = () => import('Views/eais/population/Employability/inside/Suggestions');
const PopulationEmployabilityEditConfirmation = () => import('Views/eais/population/Employability/inside/Confirmation');

// Population/Reception
// main
const PopulationReception = () => import('Views/eais/population/Reception/Items');
const PopulationReceptionEditForm = () => import('Views/eais/population/Reception/ItemEditForm');
// Header
const PopulationReceptionSearch = () => import('Views/eais/population/Reception/HeaderSearch');
const PopulationReceptionHeader = () => import('Views/eais/population/Reception/HeaderEdit');
// Inside Menu
const PopulationReceptionMenu = () => import('Views/eais/population/Reception/InsideMenu');
// Inside folder State
const PopulationReceptionEditInfo = () => import('Views/eais/population/Reception/inside/Info');
const PopulationReceptionEditRequest = () => import('Views/eais/population/Reception/inside/Request');
const PopulationReceptionEditElements = () => import('Views/eais/population/Reception/inside/Elements');
const PopulationReceptionEditScans = () => import('Views/eais/population/Reception/inside/Scans');
// const PopulationReceptionEditInfo = () => import('Views/eais/population/Reception/inside/Info');


export default {
   path: '/',
   component: Full,
   children: [
      {
         path: '/eais/population/population',
         components: {
           default: Population,
           search: PopulationSearch,
           menu: EAISMenu
         },
         meta: {
            requiresAuth: true,
            title: 'Предприятия',
            breadcrumb: 'ЕАИС / Население / Население'
         }
      },
      {
        path: '/eais/population/population/:id/',
        components: {
          default: PopulationEditForm,
          search: PopulationHeader,
          menu: PopulationMenu
        },
        redirect: '/eais/population/population/:id/info',
        children: [
          {
            path: 'info',
            component: PopulationEditInfo
          },
          {
            path: 'static',
            component: PopulationEditStatic
          },
          {
            path: 'children',
            component: PopulationEditChildren
          },
          {
            path: 'book',
            component: PopulationEditBook
          },
          {
            path: 'degree',
            component: PopulationEditDegree
          },
          {
            path: 'categories',
            component: PopulationEditCategories
          },
          {
            path: 'etc',
            component: PopulationEditEtc
          },
          {
            path: 'results',
            component: PopulationEditResults
          },
          {
            path: 'orders',
            component: PopulationEditOrders
          }
        ],
        meta: {
          requiresAuth: true,
          title: 'ГУП «Водоканал Санкт-Петербурга»',
          breadcrumb: 'ЕАИС / Население / Население'
        }
      },
      //
      //
      // Population/Registration
      {
         path: '/eais/population/registration',
         components: {
           default: PopulationRegistration,
           search: PopulationSearch,
           menu: EAISMenu
         },
         meta: {
            requiresAuth: true,
            title: 'Предприятия',
            breadcrumb: 'ЕАИС / Население / Регистрация'
         }
      },
      {
        path: '/eais/population/registration/:id/',
        components: {
          default: PopulationRegistrationEditForm,
          search: PopulationRegistrationHeader,
          menu: PopulationRegistrationMenu
        },
        redirect: '/eais/population/registration/:id/info',
        children: [
          {
            path: 'info',
            component: PopulationRegistrationEditInfo
          },
        ],
        meta: {
          requiresAuth: true,
          title: 'ГУП «Водоканал Санкт-Петербурга»',
          breadcrumb: 'ЕАИС / Население / Регистрация'
        }
      },
      //
      //
      // Population/Vacancies
      {
         path: '/eais/population/vacancies',
         components: {
           default: PopulationVacancies,
           search: PopulationVacanciesSearch,
           menu: EAISMenu
         },
         meta: {
            requiresAuth: true,
            title: 'Предприятия',
            breadcrumb: 'ЕАИС / Население / Подобранные вакансии'
         }
      },
      {
        path: '/eais/population/vacancies/:id/',
        components: {
          default: PopulationVacanciesEditForm,
          search: PopulationVacanciesHeader,
          menu: PopulationVacanciesMenu
        },
        redirect: '/eais/population/vacancies/:id/info',
        children: [
          {
            path: 'info',
            component: PopulationVacanciesEditInfo
          },
        ],
        meta: {
          requiresAuth: true,
          title: 'ГУП «Водоканал Санкт-Петербурга»',
          breadcrumb: 'ЕАИС / Население / Подобранные вакансии'
        }
      },
      //
      //
      // Population/Vacancies
      {
         path: '/eais/population/employability',
         components: {
           default: PopulationEmployability,
           search: PopulationSearch,
           menu: EAISMenu
         },
         meta: {
            requiresAuth: true,
            title: 'Предприятия',
            breadcrumb: 'ЕАИС / Население / Трудоустройство'
         }
      },
      {
        path: '/eais/population/employability/:id/',
        components: {
          default: PopulationEmployabilityEditForm,
          search: PopulationEmployabilityHeader,
          menu: PopulationEmployabilityMenu
        },
        redirect: '/eais/population/employability/:id/info',
        children: [
          {
            path: 'info',
            component: PopulationEmployabilityEditInfo,
            meta: {
              breadcrumb: 'ЕАИС / Население / Трудоустройство / Подбор мест трудоустройства'
            }
          },
          {
            path: 'directions',
            component: PopulationEmployabilityEditDirections,
            meta: {
              breadcrumb: 'ЕАИС / Население / Трудоустройство / Направления'
            }
          },
          {
            path: 'offer',
            component: PopulationEmployabilityEditOffer,
            meta: {
              breadcrumb: 'ЕАИС / Население / Трудоустройство / Справки'
            }
          },
          {
            path: 'suggestions',
            component: PopulationEmployabilityEditSuggestions,
            meta: {
              breadcrumb: 'ЕАИС / Население / Трудоустройство / Предложения'
            }
          },
          {
            path: 'confirmation',
            component: PopulationEmployabilityEditConfirmation,
            meta: {
              breadcrumb: 'ЕАИС / Население / Трудоустройство / Подтверждение'
            }
          }
        ],
        meta: {
          requiresAuth: true
        }
      },
      //
      //
      // Population/Vacancies
      {
         path: '/eais/applications/reception',
         components: {
           default: PopulationReception,
           search: PopulationReceptionSearch,
           menu: EAISMenu
         },
         meta: {
            requiresAuth: true,
            title: 'Предприятия',
            breadcrumb: 'ЕАИС / Заявления / Электронные заявления'
         }
      },
      {
        path: '/eais/applications/reception/:id/',
        components: {
          default: PopulationReceptionEditForm,
          search: PopulationReceptionHeader,
          menu: PopulationReceptionMenu
        },
        redirect: '/eais/applications/reception/:id/info',
        children: [
          {
            path: 'info',
            component: PopulationReceptionEditInfo,
            meta: {
              breadcrumb: 'ЕАИС / Заявления / Электронные заявления / Информация'
            }
          },
          {
            path: 'request',
            component: PopulationReceptionEditRequest,
            meta: {
              breadcrumb: 'ЕАИС / Заявления / Электронные заявления / Реквизиты запроса'
            }
          },
          {
            path: 'elements',
            component: PopulationReceptionEditElements,
            meta: {
              breadcrumb: 'ЕАИС / Заявления / Электронные заявления / Дополнительные сведения'
            }
          },
          {
            path: 'scans',
            component: PopulationReceptionEditScans,
            meta: {
              breadcrumb: 'ЕАИС / Заявления / Электронные заявления / Документы'
            }
          },
        ],
        meta: {
          requiresAuth: true,
          // title: 'ГУП «Водоканал Санкт-Петербурга»',
          // breadcrumb: 'ЕАИС / Население / Назначение на прием'
        }
      },

// PopulationReceptionEditRequest

// PopulationReceptionEditElements

   ]
}
