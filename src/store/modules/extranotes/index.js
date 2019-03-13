import Vue from 'vue'
import router from '@/router';
import {api, file} from "Api";
import axios from 'axios';

// import { employers } from './employers/employers';

const extranotes = {
	// namespaced: true,
	state: {
		extraHandbooks: {
			vacContacts: []
		},
	},

	// getters
	getters: {
		// headerApi: (state, getters, rootState) => {
		// 	const headers = {
		// 		headers: {
		// 			'Access-Control-Allow-Origin': '*',
		// 			'Authorization': `Bearer ${rootState.auth.tokenParams.access_token}`
		// 		}
		// 	}
		// 	return headers;
		// }
	},

	// actions
	actions: {
		getVacContacts({state, rootState, rootGetters}) {
			console.log('getVacContacts');
			var contacts = state.extraHandbooks.vacContacts;
			contacts.length = 0;
			console.log(contacts);
			api
				.get(
					`api/v1/eaisCompanies/${rootState.eais.oneItem.data.c_client}/contacts`,
					rootGetters.headerApi
				)
				.then(response => {
					console.log('Contacts');
					console.log(response);
					response.data.objects.forEach(function(element) {
						state.extraHandbooks.vacContacts.push(element.data);
					});
					state.extraHandbooks.vacContacts.forEach(function(element) {
						var comboValArr = [];
						comboValArr.push(element.contactSurname + ' ');
						comboValArr.push(element.contactName + ' ');
						comboValArr.push(element.contactMiddleName);
						if (element.eMail !== null) {comboValArr.push(', ' + element.eMail)}
						if (element.phoneNumber !== null) {comboValArr.push(', тел: ' + element.phoneNumber)}
						element.comboVal = comboValArr.join('');
						// element.comboVal = element.contactSurname + ' ' + element.contactName + ' ' + element.contactMiddleName + ', ' + element.eMail + ', ' + element.phoneNumber;
					});
				})
				.catch(error => {
					console.log(error);
				});
		}
	},
	// mutations
	mutations: {
	}
}
export default extranotes
