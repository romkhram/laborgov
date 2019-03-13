import Vue from 'vue'
import router from '@/router';
import {api, file, utils, epetitions, delivery, scheduler} from "Api";
import axios from 'axios';

// import { employers } from './employers/employers';

const eais = {
	// namespaced: true,
	state: {
		mergeCounter: {
			all: 0,
			count: 0
		},
		listMode: false,
		dublicates: [],
		dublicateItems: [],
		findD: false,
		dirItems: [],
		userData: {
			fullName: '',
			position: '',
			email: '',
			userNameDB: null,
			emplCenterId: null
		},
		perses: {
			formprof: false
		},
		check: {
			headers: {},
			txt: {},
			switch: false,
			error: null
		},
		globalCreate: false,
    files: [],
    fileData: '',
		itemLinkId: null,
		emploer: {},
		items: [],
		oneItem: {},
		justItem: {},
		EmplCenters: [],
		EmplCentersId: [],
		slOkveds: [],
		sprPositions: [],
		shureDialog: false,
		stateHandbooks: {},
		serverHandbook: {
			data: [],
			disabled: false
		},
		searchLoading: false,
		putLoading: {
			loading: false,
			note: false,
			data: null
		},
		links: {
			count: 0,
			standard: 0,
		},
		extraFieldsCounters: {
			count: 0,
			standart: 0
		},
		insideSearch: false,
		insideSearchName: '',
		queryResult: {
			ifError: false,
			errorPath: '',
			errorName: '',
			errorCode: '',
			details: [],
		}
	},

	// getters
	getters: {
		headerApi: (state, getters, rootState) => {
			const headers = {
				headers: {
					'Access-Control-Allow-Origin': '*',
					'Authorization': `Bearer ${rootState.auth.tokenParams.access_token}`
				}
			}
			return headers;
		}
	},

	// actions
	actions: {


		// Данные пользователя системы
		getUserData({state, rootState, getters, commit, dispatch}) {
			console.log(rootState.auth.tokenParams.userId); // для обработки ошибок
      console.log('api');
      console.log(api.api);
			console.log(`api/v1/eaisUsers/${rootState.auth.tokenParams.userId}`);
			api
				.get(`api/v1/eaisUsers/${rootState.auth.tokenParams.userId}`, getters.headerApi)
				.then(response => {
					console.log(response);
					commit('getUserData', response.data.data);
					dispatch("getUserLink", response.data.links[1]);
				})
				.catch(error => {
					console.log(error);
					commit('queryError', error.response.data)
				});
		},
		getUserLink({state, getters}, val) {
			// console.log("getLink");
			// console.log(val);
      console.log('api');
      console.log(api);
			api
				.get(val.path, getters.headerApi)
				.then(response => {
					console.log('links');
					console.log(response);
				})
				.catch(error => {
					console.log(error);
					commit('queryError', error.response.data)
				});
		},

		// Список основных объектов
		getListItems({getters, commit}, val) {
			console.log(getters.headerApi.headers.Authorization);
			console.log(val); // для обработки ошибок
			api
				.get(val, getters.headerApi)
				.then(response => {
					// this.loader = false;
					console.log(response.data.objects);
					commit("putItems", response.data.objects)

				})
				.catch(error => {
					console.log(error);
					console.log(error.data);
				});
		},
// ОСНОВНЫЕ ОПЕРАЦИИ
// Поиск списка основных объектов
		searchListItems({state, getters, commit, dispatch}, val) {
			console.log(val.path); // для обработки ошибок

			commit("clearItems");
			commit("searchLoadingStart");
			api
				.post(val.path, val.value, getters.headerApi)
				.then(function(response) {
					commit("putItems", response.data.objects);

					console.log('length');
					console.log(response.data.objects);

					if (response.data.objects.length === 0) {
						var mes = {};
						mes.message = 'Ничего не найдено';
						commit("openCheck", mes);
					}
					setTimeout(function() {
						 commit("checkEnd");
					 }, 3000);

					console.log(val.extraFields);


					if (val.extraFields && state.items.length > 0) {
						state.extraFieldsCounters.count = 0;
						state.extraFieldsCounters.standard = val.extraFields.length * state.items.length;

						val.extraFields.forEach(function(el) {
							dispatch("itemsExtraFields", el)
						});
					} else {
						commit("searchLoadingStop");
					}

				})
				.catch(function(error) {
					console.log(error);
					commit("searchLoadingStop");
				});
		},
// Поиск дополнительных полей списка основных объектов
		itemsExtraFields({state, getters, commit, dispatch}, val) {
			state.items.forEach(function(el) {
					const path = el.links[el.links.findIndex(x => x.rel === val.rel)].path;
					const name = val.name;
					const targetName = val.targetName;
				api
					.get(path, getters.headerApi)
					.then(response => {
						el.data[name] = response.data.data[targetName];
						state.extraFieldsCounters.count++
						console.log(state.extraFieldsCounters.count);

						if (state.extraFieldsCounters.standard === state.extraFieldsCounters.count) {
							commit('searchLoadingStop');
						}
					})
					.catch(error => {
						console.log(error);
					});
			});
		},

// Получение основного объекта
		getOneItem({state, getters, commit, dispatch}, val) {
			commit('putLoadingStart');
			console.log(state.itemLinkId); // для обработки ошибок
			api
				.get(state.itemLinkId, getters.headerApi)
				.then(response => {
					commit("putOneItem", response.data);
					if (val) {
						var selectedLinks = [];
						var responseLinks = response.data.links;
						val.forEach(function(el) {
							selectedLinks.push(
								responseLinks.find(x => String(x.path).includes( String(el) ) )
							);
						});
						dispatch("getAllLinks", selectedLinks);
					} else {
						dispatch("getAllLinks", response.data.links);
					}
				})
				.catch(error => {
					console.log(error);
				});
		},
// Получение дополнительных свойство основного объекта {
		getAllLinks({state, commit, dispatch}, val) {
			state.links.standard = val.length;
			state.links.count = 1;
			Vue.set(state.oneItem, 'linkedData', {});
			Vue.set(state.oneItem, 'extraData', {});
			for (var i = 0; i < val.length; i++) {
				dispatch("getLink", val[i]);
			}
		},

		getLink({state, getters, commit, dispatch}, val) {
			console.log('one link');
			console.log(val);
			api
				.get(val.path, getters.headerApi)
				.then(response => {
					console.log('LinkResponse');

					var toMut = {};
					toMut.response = response;
					toMut.rel = val.rel;

					commit('linksToOneItem', toMut);

					// if (response.data.data) {
					// 	Vue.set(state.oneItem.extraData, val.rel, response.data.data);
					// } else if (response.data.objects) {
					// 	const mpArr_rel = 'mpArr_' + val.rel;
					// 	Vue.set(state.oneItem.linkedData, mpArr_rel, response.data.objects);
					// 	state.oneItem.linkedData[val.rel] = {};
					// }

					if (val.rel === 'gu_request_elem_ref') {
						var path = {};
						path.path = 'api/v1/gu_requests/1/metafiles_ref/' + state.oneItem.data.request_num;
						path.rel = 'docsScans'
						console.log(path);
						dispatch('getFileLink', path);
					}

					if (val.rel === 'cl_idant_ref' && state.oneItem.linkedData.mpArr_cl_idant_ref.length > 0) {
						console.log('Поймали cl_idant_ref');

						commit('findDtrue');
						// console.log(state.oneItem.linkedData.mpArr_job_dir_ref);
						state.dublicates = [];
						var clIdants = state.oneItem.linkedData.mpArr_cl_idant_ref;
						clIdants.forEach(function(el, i, arr) {
							state.dublicates.push(el.data.c_client_old);
						});
						console.log('state.dublicates');
						console.log(state.dublicates);
						var valD = {};
						valD.path = 'api/v1/eaisCompanies/search';
						valD.value = {
				        "offset": 0,
				        "limit": 999,
				        "filter": {
				          "or": [
										{
											"cond": {
												"attr": "companyId",
												"in": state.dublicates
											}
										}
				          ]
				        },
				        "orders": [
				          {"asc":"longName"}
				        ]
				      }
						// val.path, val.value
						// searchListItems({state, getters, commit, dispatch}, val)
						dispatch("searchListItems", valD);
					}



					if (val.rel === 'job_dir_ref') {
						console.log('Поймали job_dir_ref');
						console.log(state.oneItem.linkedData.mpArr_job_dir_ref);
						var jobDirs = state.oneItem.linkedData.mpArr_job_dir_ref;
						var dirCliName = [];
						jobDirs.forEach(function(el, i, arr) {
							if (el.data.c_client) {
								dirCliName.push(el.data.c_client);
							}
						});
						var dirCliFio = [];
						jobDirs.forEach(function(el, i, arr) {
							if (el.data.reg_num) {
								dirCliFio.push(el.data.reg_num);
							}
						});
						console.log('dirCliName');
						console.log(dirCliName);
						console.log('dirCliFio');
						console.log(dirCliFio);
						if (dirCliName.length > 0) {
							dispatch("getCliNames", dirCliName);
						}
						if (dirCliFio.length > 0) {
							dispatch("getFio", dirCliFio);
						}
					}

					if (val.rel === 'pers_book_ref') {
						var persBooks = state.oneItem.linkedData.mpArr_pers_book_ref;
						var persBooksArr = [];
						persBooks.forEach(function(el, i, arr) {
							if (el.data.c_client) {
								persBooksArr.push(el.data.c_client);
							}
						});
						console.log('persBooksArr');
						console.log(persBooksArr);
						state.serverHandbook.data = [];

						var forSearch = {
							"offset": 0,
							"limit": 999,
							"filter": {
								"or": [{"cond": {"attr": "companyId", "in": persBooksArr}}]
							}
						};
						console.log('');
						if (persBooksArr.length > 0) {
							dispatch("searchInBack", forSearch);
						}


						// searchInBack({state, getters, commit, dispatch}, val) {
						// 	console.log(val); // для обработки ошибок
							// state.serverHandbook.data = [];

					}

					state.links.count++;
					if (state.links.count === state.links.standard) {
						setTimeout(function() {
							 commit('putLoadingStop');
						 }, 1000);
					}
				})
				.catch(error => {
					state.links.count++;
					if (state.links.count === state.links.standard) {
						setTimeout(function() {
							 commit('putLoadingStop');
						 }, 1000);
					}
					console.log(error);
				});
		},

		getFileLink({state, getters, commit, dispatch}, val) {
			// commit('putLoadingStart');
			epetitions
				.get(val.path, getters.headerApi)
				.then(response => {
					console.log('LinkResponse');

					var toMut = {};
					toMut.response = response;
					toMut.rel = val.rel;

					commit('linksToOneItem', toMut);
					// commit('putLoadingStop');
				})
				.catch(error => {
					console.log(error);
				});
		},

//
// getBookNames({state, getters, commit, dispatch}, val) {
// 	api
// 		.post(
// 			'api/v1/eaisCompanies/search',
// 			{
//         "offset": 0,
//         "limit": 999,
//         "filter": {
//           "or": [{"cond": {"attr": "companyId", "in": val}}]
//         }
//       },
// 			getters.headerApi)
// 		.then(response => {
// 			console.log('shortName');
// 			console.log(response.data.objects);
// 			var empls = response.data.objects;
// 			var persBooks = state.oneItem.linkedData.mpArr_pers_book_ref;
// 			persBooks.forEach(function(el, i, arr) {
// 				if (el.data.c_client !== null) {
// 					el.data.compName = empls.find(x => x.data.companyId === el.data.c_client).data.shortName;
// 				}
// 			});
// 			console.log(persBooks);
// 		})
// 		.catch(error => {
// 			console.log(error);
// 		});
// },
getCliNames({state, getters, commit, dispatch}, val) {
	api
		.post(
			'api/v1/eaisCompanies/search',
			{
        "offset": 0,
        "limit": 999,
        "filter": {
          "or": [
            {
              "cond": {
                "attr": "companyId",
                "in": val
              }
            },
          ]
        }
      },
			getters.headerApi)
		// .delete(
		// 	`api/v1/eaisCompanies/search`,
		// 	getters.headerApi
		// )
		.then(response => {
			console.log('shortName');
			console.log(response.data.objects);
			var empls = response.data.objects;
			var jobDirs = state.oneItem.linkedData.mpArr_job_dir_ref;
			jobDirs.forEach(function(el, i, arr) {
				// console.log(empls.find(x => x.data.companyId === el.data.c_client).data.shortName);
				el.data.compName = empls.find(x => x.data.companyId === el.data.c_client).data.longName;
			});
			console.log(jobDirs);
		})
		.catch(error => {
			console.log(error);
		});
},

getFio({state, getters, commit, dispatch}, val) {
	api
		.post(
			'api/v1/perses/search',
			{
        "offset": 0,
        "limit": 999,
        "filter": {
          "or": [
            {
              "cond": {
                "attr": "reg_num",
                "in": val
              }
            },
          ]
        }
      },
			getters.headerApi)
		// .delete(
		// 	`api/v1/eaisCompanies/search`,
		// 	getters.headerApi
		// )
		.then(response => {
			console.log('shortName');
			console.log(response.data.objects);
			var empls = response.data.objects;
			var jobDirs = state.oneItem.linkedData.mpArr_job_dir_ref;
			jobDirs.forEach(function(el, i, arr) {
				// console.log(empls.find(x => x.data.companyId === el.data.c_client).data.shortName);
				el.data.persFio = empls.find(x => x.data.reg_num === el.data.reg_num).data.name;
			});
			console.log(jobDirs);
		})
		.catch(error => {
			console.log(error);
		});
},


// Сохранение основного объекта
		sendPutOneItem({state, getters, commit, dispatch}, val) {
			state.globalCreate = false;
			console.log('редактировнаие');
			commit('putLoadingStart');

			const valClone = JSON.parse(JSON.stringify(val));
			console.log('valClone');
			console.log(valClone);
			console.log('state.items');
			console.log(state.items);

			console.log('valClone in items');

			console.log(state.items.find(x => x.id == valClone.id));
			if (state.items.find(x => x.id == valClone.id)) {
				state.items.find(x => x.id == valClone.id).data = JSON.parse(JSON.stringify(valClone.data));
			} //else {
			// 	state.items.push(JSON.parse(JSON.stringify(valClone)));
			// }

			delete valClone.links;
			delete valClone.title;
			delete valClone.extraData;
			for (var value in valClone.linkedData) {
				const oneObj = valClone.linkedData[value];
				if (oneObj.create || oneObj.update || oneObj.delete) {
					console.log(value);
					console.log(valClone.linkedData[value]);
				} else {
					delete valClone.linkedData[value];
				}
			}

			api
				.put(
					val.savePath,
					valClone,
					getters.headerApi
				)
				.then(function(response) {
					console.log('Это PUT!!! редактирования');
					commit('saveToggle');
					if (state.perses.formprof) {
						// dispatch('formProfAsk', response.data.id);
						dispatch('updateProfs', response.data.id);
					}
					dispatch('getOneItem');
				})
				.catch(function(error) {
					console.log(error.response);
					commit('putLoadingStop');
					console.log(error);
					error.response.data.type = 'PUT редактирования'
					commit('queryError', error.response.data)
				});
		},

// Создание основного объекта
		createOneItem({state, getters, commit, dispatch}, val) {
			// console.log('создание');
			// console.log(val); // для обработки ошибок
			commit('putLoadingToggle');

			const valClone = JSON.parse(JSON.stringify(val));

			delete valClone.links;
			delete valClone.title;
			for (var value in valClone.linkedData) {
				const oneObj = valClone.linkedData[value];
				if (oneObj.create || oneObj.update || oneObj.delete) {
					console.log(value);
					console.log(valClone.linkedData[value]);
				} else {
					delete valClone.linkedData[value];
				}
			}
			api
				.post(
					val.savePath,
					valClone,
					getters.headerApi
				)
				.then(function(response) {
					// state.globalCreate = false;
					commit('putLoadingToggle');
					console.log('Это POST!!! создания');
					console.log(response.data);
					commit('saveToggle');
					dispatch('editElement', response.data);
					state.items = [];
					state.items.push(response.data);

					console.log('formprof');
					console.log(state.perses.formprof);
					console.log(response.data.id);

					if (state.perses.formprof) {
						// dispatch('formProfAsk', response.data.id);
					}
				})
				.catch(function(error) {
					// state.globalCreate = false;
					commit('putLoadingToggle');
					console.log(error);
					console.log(error.response.data.details);
					error.response.data.type = 'POST создания'
					commit('queryError', error.response.data)
				});
		},

// УТИЛИТЫ

// utils/v1/companiesmerge/mode/merge


// Смерживание работодателей
mergeEmpsArr({state, getters, commit, dispatch}, val) {
	commit('putLoadingStart');
	console.log(val.length);
	state.mergeCounter.all = 0;
	state.mergeCounter.count = 0;
	state.mergeCounter.all = val.length;
	console.log(state.mergeCounter.all);
	val.forEach(function(el) {
		dispatch('mergeEmps', el);
	})
},
mergeEmps({state, getters, commit, dispatch}, val) {
	var mergeEmps = {
	 toClient: val.data.c_client_old,
	 fromClient: val.data.c_client
	}
	console.log('ЗАПУСТИЛИ companiesmerge');
	utils
		.post(
			'utils/v1/companiesmerge/mode/merge',
			mergeEmps,
			getters.headerApi
		)
		.then(function(response) {
			state.mergeCounter.count++
			console.log('toDelete');
			var path = `api/v1/cl_idants/${val.id}`
			dispatch('deleteElement', path);
			console.log('start', state.mergeCounter.all, state.mergeCounter.count);
			if (state.mergeCounter.all === state.mergeCounter.count) {
				console.log('выключаем крутилку');
				commit('putLoadingStop');
				var mes = {};
				mes.message = 'Слияние организаций завершено, связи удалены';
				commit("openCheck", mes);
			}
		})
		.catch(function(error) {
			console.log(error);
			state.mergeCounter.count++
			console.log('start', state.mergeCounter.all, state.mergeCounter.count);
			if (state.mergeCounter.all === state.mergeCounter.count) {
				console.log('выключаем крутилку');
				commit('putLoadingStop');
			}
		});
		// var mes = {};
		// mes.message = 'Вакансия подтверждена';
		// commit("openCheck", mes);
},


// Подтверждение вакансии
vacConfirm({state, getters, commit, dispatch}, val) {
	utils
		.post(
			'utils/v1/vacconfirm/mode/change',
			val,
			getters.headerApi
		)
		.then(function(response) {
			console.log(response);
			// var mes = {};
			// mes.message = 'Вакансия подтверждена';
			// commit("openCheck", mes);
		})
		.catch(function(error) {
			console.log(error);
		});
},
// Закрытие вакансии
vacClose({state, getters, commit, dispatch}, val) {
	utils
		.post(
			'utils/v1/vacclose/mode/change',
			val,
			getters.headerApi
		)
		.then(function(response) {
			console.log(response);
			// var mes = {};
			// mes.message = 'Вакансия закрыта';
			// commit("openCheck", mes);
		})
		.catch(function(error) {
			console.log(error);
		});
},

asksDelivery({state, getters, commit, dispatch}, val) {
	delivery
		.get(
			'statuses/',
			getters.headerApi
		)
		.then(function(response) {
			console.log(response);
			// state.oneItem.data.status = val.status;
			var mes = {};
			mes.message = 'Cтатусы отправлены';
			console.log('Cтатусы отправлены');
			commit("openCheck", mes);
		})
		.catch(function(error) {
			console.log(error);
		});
},
asksScheduler({state, getters, commit, dispatch}, val) {
	scheduler
		.get(
			'mais/',
			getters.headerApi
		)
		.then(function(response) {
			console.log(response);
			// state.oneItem.data.status = val.status;
			var mes = {};
			mes.message = 'Заявления получены';
			console.log('Заявления получены');
			commit("openCheck", mes);
		})
		.catch(function(error) {
			console.log(error);
		});
},
// Создание личного дела из заявки
createLd({state, getters, commit, dispatch}, val) {
	console.log('val');
	console.log(val);
	epetitions
		.post(
			'utils/v1/epetitions-createcard/mode/create',
			{
				"number": val
			},
			getters.headerApi
		)
		.then(function(response) {
			console.log(response);
			state.oneItem.data.reg_num = response.data.result.id;
			var mes = {};
			mes.message = 'Личное дело создано';
			commit("openCheck", mes);
		})
		.catch(function(error) {
			console.log(error);
		});
},
// Статусы электронных заявлений
changeStatusGu({state, getters, commit, dispatch}, val) {
	console.log('val');
	console.log(val);
	epetitions
		.post(
			val.path,
			{
				"id": val.id,
				"comment": val.comment
			},
			getters.headerApi
		)
		.then(function(response) {
			console.log(response);
			state.oneItem.data.status = val.status;
			// var mes = {};
			// mes.message = 'Сведения в отношении юридического лица в ЕГРЮЛ по его ИНН не найдены';
			commit("openCheck", val);
		})
		.catch(function(error) {
			console.log(error);
		});
},

// Проверка СНИЛС
checkSnils({state, getters, commit, dispatch}, val) {
	state.perses.formprof = false;
	utils
		.post(
			'utils/v1/checksnils/mode/check',
			val,
			getters.headerApi
		)
		.then(function(response) {

			console.log(response.data.snils);
			console.log(state.oneItem.data.spens.replace(/\D+/g,""));
			var snils = response.data.snils;
			var spens = state.oneItem.data.spens.replace(/\D+/g,"");


			if (snils === spens) {
				var val = {};
				val.message = 'Данные физического лица соответствуют СНИЛС';
				commit("openCheck", val);
			} else if (snils !== spens && spens.length > 0) {
				state.oneItem.data.spens = snils;
				var val = {};
				val.message = 'Данные физического лица не соответствуют, СНИЛС обновлен';
				commit("openCheck", val);
			} else {
				state.oneItem.data.spens = snils;
				var val = {};
				val.message = 'СНИЛС получен';
				commit("openCheck", val);
			}



			// commit("openCheck", allData);
		})
		.catch(function(error) {


				console.log('error.response.data.status');
				console.log(error.response.data.status);
				console.log('error.response');
				console.log(error.response);


				var status = error.response.data.status;
			if (error.response.data.details) {
				console.log(error.response.data.details);
				var val = {};
				val.message = 'Сведения не найдены';
				commit("openCheck", val);
			} else {
				var val = {};
				val.message = 'Сведения не могут быть предоставлены в электронном виде';
				commit("openCheck", val);
			}
			// state.perses.formprof = false;
		});
},


// Проверка ЕГРЮЛ
checkEgrul({state, getters, commit, dispatch}, inn) {
	state.perses.formprof = false;
	utils
		.post(
			'utils/v1/checkegrul/mode/check',
			{"inn": inn},
			getters.headerApi
		)
		.then(function(response) {
			console.log(response);
			var allData = {};
			allData.data = response.data;
			allData.data.header = 'Получена выписка в отношении ЮЛ из ЕГРЮЛ по его ИНН';
			allData.headers = {};
			allData.headers.name = 'Зарегистрирована организация:';
			allData.headers.ogrnul = 'ОГРНЮЛ:';
			allData.headers.ogrnulDate = 'Дата ОГРНЮЛ:';
			allData.headers.orgName = 'Наименование налогового органа:';
			console.log(allData);
			commit("openCheck", allData);
		})
		.catch(function(error) {


				console.log('error.response.data.status');
				console.log(error.response.data.status);
				console.log('error.response');
				console.log(error.response);


				var status = error.response.data.status;
			if (error.response.data.details) {
				console.log(error.response.data.details);
				var val = {};
				val.message = 'Сведения в отношении юридического лица в ЕГРЮЛ по его ИНН не найдены';
				commit("openCheck", val);
			} else {
				var val = {};
				val.message = 'Сведения в отношении юридического лица не могут быть предоставлены в электронном виде';
				commit("openCheck", val);
			}
			// state.perses.formprof = false;
		});
},

checkEgrip({state, getters, commit, dispatch}, inn) {
	state.perses.formprof = false;
	utils
		.post(
			'utils/v1/checkegrip/mode/check',
			{"inn": inn},
			getters.headerApi
		)
		.then(function(response) {
			console.log(response);
			var data = response.data;
			var allData = {};
			allData.data = {};
			allData.data.name = data.surname + ' ' + data.name + ' ' + data.secondname;
			allData.data.ogrnul =  data.ogrnip;
			allData.data.ogrnulDate =  data.ogrnipDate;
			allData.data.orgName =  data.orgName;
			allData.data.header = 'Получена выписка в отношении ИП из ЕГРИП по его ИНН';

			allData.headers = {};
			allData.headers.name = 'Зарегистрирован ИП:';
			allData.headers.ogrnul = 'ОГРНИП:';
			allData.headers.ogrnulDate = 'Дата ОГРНИП:';
			allData.headers.orgName = 'Наименование налогового органа:';
			console.log(allData);
			commit("openCheck", allData);
			// console.log('Завершили обновление профессий');
			// state.perses.formprof = false;
			// dispatch('createDirection', persId);
		})
		.catch(function(error) {
			console.log('error.response.data.status');
			console.log(error.response.data.status);
				console.log('error.response');
				console.log(error.response);
				var status = error.response.data.status;
			if (error.response.data.details) {
				console.log(error.response.data.details);
				var val = {};
				val.message = 'Сведения в отношении индивидуального предпринимателя в ЕГРИП по его ИНН не найдены';
				commit("openCheck", val);
			} else {
				var val = {};
				val.message = 'Сведения в отношении индивидуального предпринимателя не могут быть предоставлены в электронном виде';
				commit("openCheck", val);
			}
			// state.perses.formprof = false;
		});
},

updateProfs({state, getters, commit, dispatch}, persId) {
	state.perses.formprof = false;
	utils
		.post(
			'utils/v1/formprof/mode/all',
			{"rn": persId},
			getters.headerApi
		)
		.then(function(response) {
			console.log(response);
			console.log('Завершили обновление профессий');
			state.perses.formprof = false;
			dispatch('createDirection', persId);
		})
		.catch(function(error) {
			console.log(error);
			state.perses.formprof = false;
		});
},
// Обновление профессий и создание заявки
formProfAsk({state, getters, commit, dispatch}, persId) {
	state.perses.formprof = false;
	utils
		.post(
			'utils/v1/formprofask/mode/create',
			{"rn": persId},
			getters.headerApi
		)
		.then(function(response) {
			console.log(response);
			console.log('Завершили обновление профессий и создание заявки');
			state.perses.formprof = false;
		})
		.catch(function(error) {
			console.log(error);
			state.perses.formprof = false;
		});
},
// Создание заявки
createDirection({state, getters, commit, dispatch}, persId) {
	state.perses.formprof = false;
	utils
		.post(
			'utils/v1/formask/mode/create',
			{"rn": persId},
			getters.headerApi
		)
		.then(function(response) {
			console.log(response);
			console.log('Завершили создание');
		})
		.catch(function(error) {
			console.log(error);
		});
},

// ДОПОЛНИТЕЛЬНЫЕ ОБЪЕКТЫ ДЛЯ ВНУТРЕННОГО ИСПОЛЬЗОВАНИЯ

// проверка наличия перед переходом
		beforeSearchListItems({state, getters, commit, dispatch}, val) {
			console.log(val);
			api
				.post(val.path, val.value, getters.headerApi)
				.then(function(response) {
					console.log('response.data.objects');
					console.log(response.data.objects.length);

					if (response.data.objects.length > 0) {
						console.log(router);
						dispatch('searchListItems',  val)
						// commit('assignSearchName', val.listName);
						router.push(val.route);
					} else {
						state.putLoading.data = val.noData;
						commit('saveToggle');
					}
				})
				.catch(function(error) {
					console.log(error.response);
				});
		},

// Поиск списка внутренних объектов
		searchListItemsForDir({state, getters, commit, dispatch}, val) {
			console.log(val.path); // для обработки ошибок

			commit("clearItemsDir");
			commit("searchLoadingStart");
			api
				.post(val.path, val.value, getters.headerApi)
				.then(function(response) {

					if (response.data.objects.length === 0) {
						var mes = {};
						mes.message = 'Ничего не найдено';
						commit("openCheck", mes);
					}
					setTimeout(function() {
						 commit("checkEnd");
					 }, 3000);

					console.log('putItemsDir');
					commit("putItemsDir", response.data.objects);
					if (val.path === 'api/v1/vacs/search') {
						dispatch('searchExtraFieldsForDir', response.data.objects)
					} else {
						commit("searchLoadingStop");
					}
				})
				.catch(function(error) {
					console.log(error);
					commit("searchLoadingStop");
				});
		},
//Дополнительные поля списка внутренних объектов
		searchExtraFieldsForDir({state, getters, commit, dispatch}, objects) {
			var arrEpls = [];
			objects.forEach(function(el, i, arr) {
				if (el.data.c_client !== null) {
					arrEpls.push(el.data.c_client);
				} else {
					arr.splice(i, 1)
					console.log('Нул');
				}
			});
console.log(arrEpls);

			api
				.post(
					'api/v1/eaisCompanies/search',
					{
						"offset": 0,
						"limit": 9999,
						"filter": {
							"or": [{
								"cond": {
									"attr": "companyId",
									"in": arrEpls
									}
								}]
						}
					},
					getters.headerApi
				)
				.then(function(response) {
					console.log('Организации');
					console.log(response);

					var objects = response.data.objects
					state.dirItems.forEach(function(el) {
						el.emplData = objects.find(x => x.id === el.data.c_client).data;
					});
					console.log('state.dirItems');
					console.log(state.dirItems);
					commit("searchLoadingStop");
				})
				.catch(function(error) {
					console.log(error);
					commit("searchLoadingStop");
				});
		},

// Получение отдельного объекта для внутреннего использования
		getJustItem({state, getters, commit, dispatch}, val) {
			state.justItem = {};
			console.log(state.itemLinkId); // для обработки ошибок
			api
				.get(val, getters.headerApi)
				.then(response => {
					state.justItem[response.data.classCode] = response.data.data;
					console.log(state.justItem);
					return 'bibibi';
					// commit("putOneItem", response.data);
				})
				.catch(error => {
					console.log(error);
				});
		},
// Создание одной сущности из другой с подобными полями (вакансии из потребности)
		createFrom({state, getters, commit, dispatch}, val) {
			console.log('создание из');
			const valClone = JSON.parse(JSON.stringify(val));
			delete valClone.links;
			delete valClone.title;
			for (var value in valClone.linkedData) {
				const oneObj = valClone.linkedData[value];
				if (oneObj.create || oneObj.update || oneObj.delete) {
					console.log(value);
					console.log(valClone.linkedData[value]);
				} else {
					delete valClone.linkedData[value];
				}
			}
			api
				.post(
					val.savePath,
					valClone,
					getters.headerApi
				)
				.then(function(response) {
					console.log('Вакансия создана');
					state.globalCreate = false;
					console.log('Вышли из формы');
					state.putLoading.data = 'Вакансия создана'
					commit('saveToggle');
				})
				.catch(function(error) {
					console.log('Такая вакансия уже существует');
					state.putLoading.data = 'Такая вакансия уже существует'
					commit('saveToggle');
				});
		},
// Инициатор редактирования основного элемента
		editElement({state, commit, dispatch }, item) {
			state.globalCreate = false;
			if (item.selLinks) {
				console.log('selLinks');
				commit("editElement", item.item);
				dispatch("getOneItem", item.selLinks);
			} else {
				commit("editElement", item);
				dispatch("getOneItem");
			}
		},
// Инициатор создания основного элемента
		newElement({state, commit, dispatch }, item) {
			state.globalCreate = true;
			commit("newElement", item);
			console.log(state.oneItem);
		},

// Удаление прототип
		deleteElement({state, rootState, getters, commit}, val) {
			api
				.delete(
					// `api/v1/eaisCompanies/${val}`,
					val,
					getters.headerApi
				)
				.then(response => {
					console.log(response);
				})
				.catch(error => {
					console.log(error);
				});
		},

// Загрузка справочника
		getReferences({state, getters, rootState, commit}, val) {
			console.log('getReferences');
			const stateHandbooks = state.stateHandbooks;
				// для комбозначения
			if (val.path) {
				var path = val.path;
			} else {
				var path = val;
			}
				// для сортировки
				var orders = [];
			if (val.code) {
				orders.push({"asc": val.code})
			}


			if (!stateHandbooks[path]) {
				api
					.post(
						`api/v1/${path}/search`, {
							"offset": 0,
							"limit": 99999,
							orders
						},
						getters.headerApi
					)
					.then(function(response) {
						Vue.set(stateHandbooks, path, []);
						response.data.objects.forEach(function(element) {
							stateHandbooks[path].push(element.data);
						});

						if (val.path) {
							commit('listCoValue', val)
						}
						console.log(path);
						console.log(stateHandbooks[path]);
					})
					.catch(function(error) {
						console.log(error);
						error.response.data.type = 'справочник'
						console.log(error.response.data);
						commit('queryError', error.response.data)
					});
			}
		},

// Поиск организации для элемента select
		searchInBack({state, getters, commit, dispatch}, val) {
			console.log(val); // для обработки ошибок
			// state.serverHandbook.data = [];
			state.serverHandbook.disabled = true;
			const serverHandbook = state.serverHandbook;
			api
				.post('api/v1/eaisCompanies/search', val, getters.headerApi)
				.then(function(response) {
					console.log(response);
					// serverHandbook

					response.data.objects.forEach(function(element) {
						element.data.comboVal = element.data.companyId + ': ' + element.data.longName;
						serverHandbook.data.push(element.data);
					});
					console.log('serverHandbook');
					console.log(serverHandbook);
					state.serverHandbook.disabled = false;
				})
				.catch(function(error) {
					console.log(error);
					state.serverHandbook.disabled = false;
				});
		},

// Поиск списка файлов
    searchFiles({state, getters, commit, dispatch}) {
    	api
    	.post(
    		`file/v1/search/`,
    		{
    			"offset": 0,
    			"limit": 50
    		},
    		getters.headerApi
    	)
    	.then(function (response) {
    		console.log('Поиск файлов');
        state.files = response.data.files;
        console.log(state.files);
    	})
    	.catch(function (error) {
      	console.log('Поиск файлов - ошибка');
    		// commit('putLoadingToggle');
    		console.log(error);
    		// error.response.data.type = 'PUT поиска файлов'
    		// commit('queryError', error.response.data)
    	});
    },

		getScan({state, rootState, getters, commit, dispatch}) {
			console.log(rootState.auth.tokenParams.access_token);
			file
			.get(
				`file/v1/c7a0bb15-7b92-4df1-83a0-fc7b6821e9e6/${rootState.auth.tokenParams.access_token}`,
			)
    	.then(function (response) {
    		console.log('скачать скан');
    		console.log(response);
    	})
    	.catch(function (error) {
      	console.log('скачать скан - ошибка');
    		console.log(error);
    	});
		},

    getFile({state, getters, commit, dispatch}, val) {
    	console.log('скачать файл');
    	file
    	.get(
    		`file/v1/${val}`,
    		getters.headerApi
    	)
    	.then(function (response) {
    		console.log('скачать файл');
    		console.log(response);

        const name = response.headers['content-disposition'].split('; ');
    		console.log(name);
        state.fileData = response.data;

           // const url = window.URL.createObjectURL(new Blob([response.data]));
           // const link = document.createElement('a');
           // link.href = url;
           // link.setAttribute('download', 'file.pdf'); //or any other extension
           // document.body.appendChild(link);
           // link.click();


    	})
    	.catch(function (error) {
      	console.log('скачать файл - ошибка');
    		console.log(error);
    	});
    },
	},

	// mutations
	mutations: {
		linksToOneItem(state, val) {
			if (val.response.data.data) {
				Vue.set(state.oneItem.extraData, val.rel, val.response.data.data);
			} else if (val.response.data.objects) {
				const mpArr_rel = 'mpArr_' + val.rel;
				Vue.set(state.oneItem.linkedData, mpArr_rel, val.response.data.objects);
				state.oneItem.linkedData[val.rel] = {};
			}
		},
		findDtrue(state) {
			state.findD = true;
		},
		openCheck(state, val) {
			console.log('openCheck');
			console.log(val);
			state.check.switch = true;
			if (val.data) {
				var d = new Date(val.data.ogrnulDate);
				state.check.txt.header = val.data.header; // = 'Получена выписка в отношении ЮЛ из ЕГРЮЛ по его ИНН';
				state.check.txt.name = val.data.name;
				state.check.txt.ogrnul = val.data.ogrnul;
				state.check.txt.ogrnulDate = d.toLocaleDateString();
				state.check.txt.orgName = val.data.orgName;
				state.check.headers.name = val.headers.name;
				state.check.headers.ogrnul = val.headers.ogrnul;
				state.check.headers.ogrnulDate = val.headers.ogrnulDate;
				state.check.headers.orgName = val.headers.orgName;

				console.log('state.check');
				console.log(state.check);

			} else if (val.message) {
				console.log('val.message');
				state.check.txt.error = val.message;
				console.log(state.check.txt.header);
			}
			console.log('state.check.txt');
			console.log(state.check.txt);
		},
		checkEnd(state, val) {
			state.check.switch = false;
			state.check.txt = {};
			console.log('state.check.txt');
			console.log(state.check.txt);
		},
		toFormProf(state) {
			state.perses.formprof = true;
		},
		notNew(state){
			state.globalCreate = false;
		},
		dontSaved(state) {
			Vue.set(state.oneItem, 'saved', true);
			console.log('state.oneItem.saved');
			console.log(state.oneItem.saved);
		},
		getUserData(state, val) {
			console.log('mut getUserData');
			console.log(val);
			state.userData.fullName = val.fullName;
			state.userData.position = val.position;
			state.userData.email = val.email;
			state.userData.userNameDB = val.userNameDB;
			state.userData.emplCenterId = val.emplCenterId;
			if (val.userNameDB === "PERSUSER") {
				router.push("/eais/population/population");
			} else {
				router.push("/eais/employers/employers");
			}

			console.log(state.userData);
		},
		putLoadingToggle(state) {
			state.putLoading.loading = !state.putLoading.loading;
		},
		putLoadingStart(state) {
			state.putLoading.loading = true;
		},
		putLoadingStop(state) {
			state.putLoading.loading = false;
			state.putLoading.data = null;
		},
		saveToggle(state) {
			state.putLoading.note = !state.putLoading.note;
			if (state.putLoading.note) {
				setTimeout(function() {
					state.putLoading.note = false;
					state.putLoading.data = null;
				}, 3000);
			}
		},
		errorToggle(state) {
			state.queryResult.ifError = !state.queryResult.ifError;
			if (state.queryResult.ifError) {
				setTimeout(function() {
					state.queryResult.ifError = false;
					// state.putLoading.data = null;
				}, 3000);
			} else {
				console.log(state.queryResult.details);
				state.queryResult.details.length = 0;
				console.log(state.queryResult.details);
			}
		},
		searchLoadingToggle(state) {
			state.searchLoading = !state.searchLoading;
		},
		searchLoadingStart(state) {
			state.searchLoading = true;
		},
		searchLoadingStop(state) {
			state.searchLoading = false;
		},
		assignInsideSearch(state) {
			state.insideSearch = true;
		},
		removeInsideSearch(state) {
			state.insideSearch = false;
		},
		assignSearchName(state, val) {
			state.insideSearchName = val;
		},
		removeSearchName(state) {
			setTimeout(function() {
				if (state.items.length === 0 && state.insideSearch === false) {
					state.insideSearchName = '';
				}
			}, 1000)
		},

		deleteLinkData(state, val) {
			console.log('commit delete');
			console.log(val);
			console.log('mpArr_' + val.classCode);
			const forEdit = state.oneItem.linkedData['mpArr_' + val.classCode];
			console.log(forEdit.findIndex(x => x.id === val.id));
			Vue.delete(forEdit, forEdit.findIndex(x => x.id === val.id));
		},



		queryError(state, val) {
			state.queryResult.ifError = true;
			if (val.details) {
				state.queryResult.details.length = 0;
				state.queryResult.details = val.details
				state.queryResult.details.forEach(function(item, i, arr) {
					console.log(item.message);
				});
			} else {
				state.queryResult.errorName = val.error;
				state.queryResult.errorCode = val.status;
				state.queryResult.queryType = val.type;
				const path = val.path.split('/');
				if (path[path.length - 1] === 'search') {
					state.queryResult.errorPath = path[path.length - 2]
				} else {
					state.queryResult.errorPath = path[path.length - 1]
				}
				console.log(state.queryResult);
				console.log(`
				Нет доступа ${state.queryResult.queryType} «${state.queryResult.errorPath}».
				Ошибка запроса - ${state.queryResult.errorCode}: ${state.queryResult.errorName}.
				Приносим извинения за вызванные неудобства.
				Обратитесь к администратору.
			`);
			}

			setTimeout(() => {
				state.queryResult.ifError = false;
				console.log('детали');
				console.log(val);
				console.log(state.queryResult.details);
				state.queryResult.details.length = 0;
			}, 10000);
		},




		queryMess(state, val) {
			state.queryResult.ifError = true;
			// state.queryResult.errorName = val.error;
			// state.queryResult.errorCode = val.status;
			// state.queryResult.queryType = val.type;
			const path = val.path.split('/');

			if (path[path.length - 1] === 'search') {
				state.queryResult.errorPath = path[path.length - 2]
			} else {
				state.queryResult.errorPath = path[path.length - 1]
			}

			console.log(state.queryResult);
			console.log(`
			Нет доступа ${state.queryResult.queryType} «${state.queryResult.errorPath}».
			Ошибка запроса - ${state.queryResult.errorCode}: ${state.queryResult.errorName}.
			Приносим извинения за вызванные неудобства.
			Обратитесь к администратору.
		`);

			setTimeout(() => {
				state.queryResult.ifError = false;
			}, 10000);
		},
		toggleShureDialog(state) {
			state.shureDialog = !state.shureDialog
			console.log('shureDialog: ' + state.shureDialog);
		},
		itemToNull({
			state,
			commit
		}) {
			state.oneItem = {};
		},
		editElement(state, item) {
			state.itemLinkId = item.links[0].path;
			state.oneItem = {};
		},
		listModeCh(state, item) {
			state.listMode = !state.listMode;
		},
		// listModeTrue(state, item) {
		// 	state.listMode = false;
		// },
		newElement(state, item) {
			state.oneItem = item;
		},
		putItems(state, items) {
			// state.items = [];
			if (state.findD) {
				state.dublicateItems = items;
				state.findD = false;
			} else {
				state.items = items;
			}
			console.log(state.items);
		},
		putItemsDir(state, items) {
			// state.items = [];
			state.dirItems = items;
			console.log(state.dirItems);
			// state.searchLoading = false;
		},
		clearItems(state, items) {
			state.items = [];
		},
		clearItemsDir(state, items) {
			state.dirItems = [];
		},
		putOneItem(state, item) {
			state.oneItem = item;
			state.oneItem.linkedData = {};
			console.log("this is oneItem");
			console.log(item);
		},
		listComboValue(state, val) {
			if (state.stateHandbooks[val.handbook] && !state.stateHandbooks[val.handbook][0].comboVal) {
				state.stateHandbooks[val.handbook].forEach(function(item, i, arr) {
					item.comboVal = item[val.one] + ': ' + item[val.two];
				});
			}
		},
		listCoValue(state, val) {

			state.stateHandbooks[val.path].forEach(function(item, i, arr) {
				if (item[val.code] === 0 && item[val.name] === null ||
						item[val.code] === 0 && item[val.name] === '.' ||
						item[val.code] === 0 && item[val.name] === '..' ||
						item[val.code] === 0 && item[val.name] === '...'
				) {
					item.comboVal = '';
					item[val.name] = '';
				} else {
					item.comboVal = item[val.code] + ': ' + item[val.name];
				}
			});

			var und = {}
			und[val.code] = undefined;
			und[val.name] = '';
			und.comboVal = '';
			state.stateHandbooks[val.path].push(und);

		},
		addContacts(state, val) {
			Vue.set(state.stateHandbooks, 'vacContacts', val);
		}
	}
}
export default eais
