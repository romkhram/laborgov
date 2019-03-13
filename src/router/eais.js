import Full from 'Container/Full'

// dashboard components
const EAISMenu = () =>
  import('Views/eais/menu/EAISMenu');

const NotFoundComponent = () => import('Views/system/404');
// Employers/Employers
// main
const Employers = () =>
  import('Views/eais/employers/Employers/Items');
const EmployerEditForm = () =>
  import('Views/eais/employers/Employers/ItemEditForm');
// Header
const EmployerSearch = () =>
  import('Views/eais/employers/Employers/HeaderSearch');
const EmployerHeaderEdit = () =>
  import('Views/eais/employers/Employers/HeaderEdit');
// Inside Menu
const EmployerMenu = () =>
  import('Views/eais/employers/Employers/InsideMenu');

const EmployerEditInfo = () =>
  import('Views/eais/employers/Employers/inside/Info');
const EmployerEditRequisites = () =>
  import('Views/eais/employers/Employers/inside/Requisites');
const EmployerEditGiro = () =>
  import('Views/eais/employers/Employers/inside/Giro');
const EmployerEditOkved = () =>
  import('Views/eais/employers/Employers/inside/Okved');
const EmployerEditContacts = () =>
  import('Views/eais/employers/Employers/inside/Contacts');
const EmployerEditAveragenumber = () =>
  import('Views/eais/employers/Employers/inside/Averagenumber');
const EmployerEditAddresses = () =>
  import('Views/eais/employers/Employers/inside/Addresses');
const EmployerEditAdditionally = () =>
  import('Views/eais/employers/Employers/inside/Additionally');
const EmployerEditResults = () =>
  import('Views/eais/employers/Employers/inside/Results');
const EmployerEditEvents = () =>
  import('Views/eais/employers/Employers/inside/Events');

// Employers/Quotas
// const Quotas = () =>
//   import('Views/eais/employers/Quotas');
// const QuotaSearch = () =>
//   import('Views/eais/search/QuotaSearch');
// const QuotaHeaderEdit = () =>
//   import('Views/eais/search/QuotaHeaderEdit');
// const QuotaMenu = () =>
//   import('Views/eais/menu/employer/QuotaMenu');
// const QuotaEditForm = () =>
//   import('Views/eais/employers/QuotaEditForm');
//
// const QuotaEditInfo = () =>
//   import('Views/eais/employers/editQuota/Info');
// const QuotaEditVacancies = () =>
//   import('Views/eais/employers/editQuota/Vacancies');
// const QuotaEditEmployed = () =>
//   import('Views/eais/employers/editQuota/Employed');
// const QuotaEditNormativeAct = () =>
//   import('Views/eais/employers/editQuota/NormativeAct');
// const QuotaEditDocumentation = () =>
//   import('Views/eais/employers/editQuota/Documentation');
// const QuotaEditService = () =>
//   import('Views/eais/employers/editQuota/Service');
// const QuotaEditSystemInfo = () =>
//   import('Views/eais/employers/editQuota/SystemInfo');


// Employers/Events
const Events = () => import('Views/eais/employers/Events/Items');
const EventsSearch = () => import('Views/eais/employers/Events/HeaderSearch');
const EventHeaderEdit = () => import('Views/eais/employers/Events/HeaderEdit');
const EventMenu = () => import('Views/eais/employers/Events/InsideMenu');
const EventEditForm = () => import('Views/eais/employers/Events/ItemEditForm');

const EventEditInfo = () => import('Views/eais/employers/Events/inside/Info');

const EventEditProfessions = () => import('Views/eais/employers/Events/inside/Professions');
const EventEditCategories = () => import('Views/eais/employers/Events/inside/Categories');
const EventEditEnterprises = () => import('Views/eais/employers/Events/inside/Enterprises');
const EventEditCitizens = () => import('Views/eais/employers/Events/inside/Citizens');


// Employers/Jobs
// main
const EmployersJobs = () =>
  import('Views/eais/employers/Jobs/Items');
const EmployersJobsEditForm = () =>
  import('Views/eais/employers/Jobs/ItemEditForm');
// Header
const EmployersJobsSearch = () =>
  import('Views/eais/employers/Jobs/HeaderSearch');
const EmployersJobsHeader = () =>
  import('Views/eais/employers/Jobs/HeaderEdit');
// Inside Menu
const EmployersJobsMenu = () =>
  import('Views/eais/employers/Jobs/InsideMenu');
// Inside folder
const EmployersJobsEditInfo = () =>
  import('Views/eais/employers/Jobs/inside/Info');


// Employers/Vacancies
// main
const EmployersVacancies = () =>
  import('Views/eais/employers/Vacancies/Items');
const EmployersVacancyEditForm = () =>
  import('Views/eais/employers/Vacancies/ItemEditForm');
// Header
const EmployersVacanciesSearch = () =>
  import('Views/eais/employers/Vacancies/HeaderSearch');
const EmployersVacanciesHeader = () =>
  import('Views/eais/employers/Vacancies/HeaderEdit');
// Inside Menu
const EmployersVacanciesMenu = () =>
  import('Views/eais/employers/Vacancies/InsideMenu');
// Inside folder State
const EmployersVacanciesEditInfo = () =>
  import('Views/eais/employers/Vacancies/inside/Info');
const EmployersVacanciesEditVacancy = () =>
  import('Views/eais/employers/Vacancies/inside/Vacancy');
const EmployersVacanciesEditAdvanced = () =>
  import('Views/eais/employers/Vacancies/inside/Advanced');
const EmployersVacanciesEditLanguages = () =>
  import('Views/eais/employers/Vacancies/inside/Languages');
const EmployersVacanciesEditBenefits = () =>
  import('Views/eais/employers/Vacancies/inside/Benefits');
const EmployersVacanciesEditNotes = () =>
  import('Views/eais/employers/Vacancies/inside/Notes');
const EmployersVacanciesEditStates = () =>
  import('Views/eais/employers/Vacancies/inside/States');
const EmployersVacanciesEditDirections = () =>
  import('Views/eais/employers/Vacancies/inside/Directions');
const EmployersVacanciesEditHistory = () =>
  import('Views/eais/employers/Vacancies/inside/History');


// Employers/Recruitment
// main
const EmployersRecruitment = () =>
  import('Views/eais/employers/Recruitment/Items');
const EmployersRecruitmentEditForm = () =>
  import('Views/eais/employers/Recruitment/ItemEditForm');
// Header
const EmployersRecruitmentSearch = () =>
  import('Views/eais/employers/Recruitment/HeaderSearch');
const EmployersRecruitmentHeader = () =>
  import('Views/eais/employers/Recruitment/HeaderEdit');
// Inside Menu
const EmployersRecruitmentMenu = () =>
  import('Views/eais/employers/Recruitment/InsideMenu');
// Inside folder State
const EmployersRecruitmentEditInfo = () =>
  import('Views/eais/employers/Recruitment/inside/Info');
  const EmployersRecruitmentEditDirections = () =>
    import('Views/eais/employers/Recruitment/inside/Directions');


// Employers/Needs
// main
const EmployersNeeds = () =>
  import('Views/eais/employers/Needs/Items');
const EmployersNeedsEditForm = () =>
  import('Views/eais/employers/Needs/ItemEditForm');
// Header
const EmployersNeedsSearch = () =>
  import('Views/eais/employers/Needs/HeaderSearch');
const EmployersNeedsHeader = () =>
  import('Views/eais/employers/Needs/HeaderEdit');
// Inside Menu
const EmployersNeedsMenu = () =>
  import('Views/eais/employers/Needs/InsideMenu');
// Inside folder State
const EmployersNeedsEditInfo = () =>
  import('Views/eais/employers/Needs/inside/Info');
const EmployersNeedsEditDeclared = () =>
  import('Views/eais/employers/Needs/inside/Declared');
const EmployersNeedsEditActive = () =>
  import('Views/eais/employers/Needs/inside/Active');
const EmployersNeedsEditClosed = () =>
  import('Views/eais/employers/Needs/inside/Closed');
// const Vacancies = () => import('Views/eais/employers/Vacancies');

// function loadEais (component) {
//   // '@' is aliased to src/Views
//   return () => import(`@/Views/${component}.vue`)
// }

export default {
  path: '/',
  component: Full,
  // redirect: '/eais/employers/employers',
  redirect: '/session/login',
  children: [
    // {
    //   path: '*',
    //   component: NotFoundComponent,
    //   meta: {
    //     requiresAuth: true
    //   }
    // },
    {
      path: '/eais/employers/employers',
      components: {
        default: Employers,
        search: EmployerSearch,
        menu: EAISMenu
      },
      meta: {
        requiresAuth: true,
        title: 'Работодатели',
        breadcrumb: 'ЕАИС / Предприятия / Работодатели'
      }
    },
    {
      path: '/eais/employers/employer/:id/',
      components: {
        default: EmployerEditForm,
        search: EmployerHeaderEdit,
        menu: EmployerMenu
      },
      redirect: '/eais/employers/employer/:id/info',
      children: [{
        path: 'info',
        component: EmployerEditInfo,
        meta: {
          breadcrumb: 'ЕАИС / Предприятия / Работодатели / Информация'
        }
      }, {
        path: 'requisites',
        component: EmployerEditRequisites,
        meta: {
          breadcrumb: 'ЕАИС / Предприятия / Работодатели / Реквизиты'
        }
      }, {
        path: 'giro',
        component: EmployerEditGiro,
        meta: {
          breadcrumb: 'ЕАИС / Предприятия / Работодатели / Расчетный счет'
        }
      }, {
        path: 'okved',
        component: EmployerEditOkved,
        meta: {
          breadcrumb: 'ЕАИС / Предприятия / Работодатели / ОКВЭД'
        }
      }, {
        path: 'contacts',
        component: EmployerEditContacts,
        meta: {
          breadcrumb: 'ЕАИС / Предприятия / Работодатели / Контакты'
        }
      }, {
        path: 'addresses',
        component: EmployerEditAddresses,
        meta: {
          breadcrumb: 'ЕАИС / Предприятия / Работодатели / Адреса'
        }
      }, {
        path: 'averagenumber',
        component: EmployerEditAveragenumber,
        meta: {
          breadcrumb: 'ЕАИС / Предприятия / Работодатели / Среднесписочная численность'
        }
      }, {
        path: 'additionally',
        component: EmployerEditAdditionally,
        meta: {
          breadcrumb: 'ЕАИС / Предприятия / Работодатели / Дополнительно'
        }
      }, {
        path: 'results',
        component: EmployerEditResults,
        meta: {
          breadcrumb: 'ЕАИС / Предприятия / Работодатели / Результаты'
        }
      }, {
        path: 'events',
        component: EmployerEditEvents,
        meta: {
          breadcrumb: 'ЕАИС / Предприятия / Работодатели / Мероприятия'
        }
      }],
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/eais/employers/vacancies',
      components: {
        default: EmployersVacancies,
        search: EmployersVacanciesSearch,
        menu: EAISMenu
      },
      meta: {
        requiresAuth: true,
        title: 'Вакансии',
        breadcrumb: 'ЕАИС / Предприятия / Вакансии'
      }
    },
    {
      path: '/eais/employers/vacancy/:id/',
      components: {
        default: EmployersVacancyEditForm,
        search: EmployersVacanciesHeader,
        menu: EmployersVacanciesMenu
      },
      redirect: '/eais/employers/vacancy/:id/info',
      children: [{
          path: 'info',
          component: EmployersVacanciesEditInfo,
          meta: {
            breadcrumb: 'ЕАИС / Предприятия / Вакансии / Сведения о рабочем месте'
          }
        },
        {
          path: 'vacancy',
          component: EmployersVacanciesEditVacancy,
          meta: {
            breadcrumb: 'ЕАИС / Предприятия / Вакансии / Сведения о вакансии'
          }
        },
        {
          path: 'advanced',
          component: EmployersVacanciesEditAdvanced,
          meta: {
            breadcrumb: 'ЕАИС / Предприятия / Вакансии / Дополнительно'
          }
        },
        {
          path: 'languages',
          component: EmployersVacanciesEditLanguages,
          meta: {
            breadcrumb: 'ЕАИС / Предприятия / Вакансии / Иностранные языки'
          }
        },
        {
          path: 'benefits',
          component: EmployersVacanciesEditBenefits,
          meta: {
            breadcrumb: 'ЕАИС / Предприятия / Вакансии / Льготы'
          }
        },
        {
          path: 'notes',
          component: EmployersVacanciesEditNotes,
          meta: {
            breadcrumb: 'ЕАИС / Предприятия / Вакансии / Примечания'
          }
        },
        {
          path: 'states',
          component: EmployersVacanciesEditStates,
          meta: {
            breadcrumb: 'ЕАИС / Предприятия / Вакансии / Состояния'
          }
        },
        {
          path: 'directions',
          component: EmployersVacanciesEditDirections,
          meta: {
            breadcrumb: 'ЕАИС / Предприятия / Вакансии / Направления'
          }
        },
        {
          path: 'history',
          component: EmployersVacanciesEditHistory,
          meta: {
            breadcrumb: 'ЕАИС / Предприятия / Вакансии / История'
          }
        }
      ],
      meta: {
        requiresAuth: true
      }
    },

    {
      path: '/eais/employers/recruitment',
      components: {
        default: EmployersRecruitment,
        search: EmployersRecruitmentSearch,
        menu: EAISMenu
      },
      meta: {
        requiresAuth: true,
        title: 'Подбор соискателей',
        breadcrumb: 'ЕАИС / Предприятия / Подбор соискателей'
      }
    },
    {
      path: '/eais/employers/recruitment/:id/',
      components: {
        default: EmployersRecruitmentEditForm,
        search: EmployersRecruitmentHeader,
        menu: EmployersRecruitmentMenu
      },
      redirect: '/eais/employers/recruitment/:id/info',
      children: [{
        path: 'info',
        component: EmployersRecruitmentEditInfo,
        meta: {
          breadcrumb: 'ЕАИС / Предприятия / Подбор соискателей / Список соискателей'
        }
      }, {
        path: 'directions',
        component: EmployersRecruitmentEditDirections,
        meta: {
          breadcrumb: 'ЕАИС / Предприятия / Подбор соискателей / Предложения'
        }
      }]
    },



    {
      path: '/eais/employers/needs',
      components: {
        default: EmployersNeeds,
        search: EmployersNeedsSearch,
        menu: EAISMenu
      },
      meta: {
        requiresAuth: true,
        title: 'Потребности',
        breadcrumb: 'ЕАИС / Предприятия / Потребности'
      }
    },
    {
      path: '/eais/employers/needs/:id/',
      components: {
        default: EmployersNeedsEditForm,
        search: EmployersNeedsHeader,
        menu: EmployersNeedsMenu
      },
      redirect: '/eais/employers/needs/:id/info',
      children: [
        {
          path: 'info',
          component: EmployersNeedsEditInfo,
          meta: {
            breadcrumb: 'ЕАИС / Предприятия / Потребности / Информация'
          }
        },
        {
          path: 'declared',
          component: EmployersNeedsEditDeclared,
          meta: {
            breadcrumb: 'ЕАИС / Предприятия / Потребности / Заявлено'
          }
        },
        {
          path: 'active',
          component: EmployersNeedsEditActive
        },
        {
          path: 'closed',
          component: EmployersNeedsEditClosed
        }
      ],
      meta: {
        requiresAuth: true
      }
    },








    {
      path: '/eais/employers/jobs',
      components: {
        default: EmployersJobs,
        search: EmployersJobsSearch,
        menu: EAISMenu
      },
      meta: {
        requiresAuth: true,
        title: 'Рабочие места',
        breadcrumb: 'ЕАИС / Предприятия / Рабочие места'
      }
    },
    {
      path: '/eais/employers/job/:id/',
      components: {
        default: EmployersJobsEditForm,
        search: EmployersJobsHeader,
        menu: EmployersJobsMenu
      },
      redirect: '/eais/employers/job/:id/info',
      children: [{
        path: 'info',
        component: EmployersJobsEditInfo
      }],
      meta: {
        requiresAuth: true,
        title: 'ГУП «Водоканал Санкт-Петербурга»',
        breadcrumb: 'ЕАИС / Предприятия / Квота'
      }
    },
    // {
    //   path: '/eais/employers/quotas',
    //   components: {
    //     default: Quotas,
    //     search: QuotaSearch,
    //     menu: EAISMenu
    //   },
    //   meta: {
    //     requiresAuth: true,
    //     title: 'Квоты',
    //     breadcrumb: 'ЕАИС / Предприятия / Квоты'
    //   }
    // },
    // {
    //   path: '/eais/employers/quota/:id/',
    //   components: {
    //     default: QuotaEditForm,
    //     search: QuotaHeaderEdit,
    //     menu: QuotaMenu
    //   },
    //   redirect: '/eais/employers/quota/:id/info',
    //   children: [{
    //     path: 'info',
    //     component: QuotaEditInfo
    //   }, {
    //     path: 'vacancies',
    //     component: QuotaEditVacancies
    //   }, {
    //     path: 'employed',
    //     component: QuotaEditEmployed
    //   }, {
    //     path: 'normativeact',
    //     component: QuotaEditNormativeAct
    //   }, {
    //     path: 'documentation',
    //     component: QuotaEditDocumentation
    //   }, {
    //     path: 'service',
    //     component: QuotaEditService
    //   }, {
    //     path: 'systeminfo',
    //     component: QuotaEditSystemInfo
    //   }],
    //   meta: {
    //     requiresAuth: true,
    //     title: 'ГУП «Водоканал Санкт-Петербурга»',
    //     breadcrumb: 'ЕАИС / Предприятия / Квота'
    //   }
    // },
    {
      path: '/eais/employers/events',
      components: {
        default: Events,
        search: EventsSearch,
        menu: EAISMenu
      },
      meta: {
        requiresAuth: true,
        title: 'Мероприятия',
        breadcrumb: 'ЕАИС / Предприятия / Мероприятия'
      }
    },
    {
      path: '/eais/employers/event/:id/',
      components: {
        default: EventEditForm,
        search: EventHeaderEdit,
        menu: EventMenu
      },
      redirect: '/eais/employers/event/:id/info',
      children: [{
        path: 'info',
        component: EventEditInfo
      }, {
        path: 'professions',
        component: EventEditProfessions
      }, {
        path: 'categories',
        component: EventEditCategories
      }, {
        path: 'enterprises',
        component: EventEditEnterprises
      }, {
        path: 'citizens',
        component: EventEditCitizens
      }],
      meta: {
        requiresAuth: true,
        title: 'ГУП «Водоканал Санкт-Петербурга»',
        breadcrumb: 'ЕАИС / Предприятия / Мероприятия'
      }
    }
  ]
}
