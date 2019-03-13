
import Vue from 'vue'
import Vuex from 'vuex';
import router from '@/router';
import {api} from "Api";

Vue.use(Vuex);

export default {
	beforeMount() {
		this.getContacts(this.oneItem.data.c_client);
	},
	data: () => ({
		noDataText: 'Нет данных',
		extraHandbook: {
			contacts: [],
		}
	}),
	computed: {
		headerApi() {
			return this.$store.getters.headerApi
		}
	},
	methods: {
		getContacts(val) {
			console.log('contacts');
			var contacts = this.extraHandbook.contacts;
			console.log(contacts);
			api
				.get(
					`api/v1/eaisCompanies/${val}/contacts`,
					this.headerApi
				)
				.then(function(response) {
					console.log('contacts');
					response.data.objects.forEach(function(element) {
						contacts.push(element.data);
					});
					contacts.forEach(function(element) {
						element.comboVal = element.contactSurname + ' ' + element.contactName + ' ' + element.contactMiddleName + ', ' + element.eMail + ', ' + element.phoneNumber;
					});
				})
				.catch(function(error) {
					console.log(error);
				});
				this.$store.commit('addContacts', contacts);
		}
	}
}
