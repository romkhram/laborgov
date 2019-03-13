import Vue from 'vue'

export default {
	data: () => ({
		noDataText: 'Нет данных',
		fieldRules: {
			required: v => v !== null && v !== '' && v !== undefined || 'Обязательное поле',
			email: value => {
				const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
				if (value && value.length > 0) {
					return pattern.test(value) || 'Введите корректный E-mail'
				} else {
					return true
				}
			}
		},
		editNewDialog: false
	}),
	computed: {
	},
	methods: {
		editDialog() {
			this.$store.commit('dontSaved');
			this.editNewDialog = true;
		}
	}
}
