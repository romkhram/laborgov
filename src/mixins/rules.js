import Vue from 'vue'

export default {
	data: () => ({
		noDataText: 'Нет данных',
		snils: [
			v => {
				if (v && v.length > 0) {
					return (v && v.length === 11) || 'Формат СНИЛС - 11 цифр'
				} else {
					return true;
				}
			},
			v => {
				if (v) {
					var result = false;
					var sum = 0;
					for (var i = 0; i < 9; i++) {
						sum += parseInt(v[i]) * (9 - i);
					}
					var checkDigit = 0;
					if (sum < 100) {
						checkDigit = sum;
					} else if (sum > 101) {
						checkDigit = parseInt(sum % 101);
						if (checkDigit === 100) {
							checkDigit = 0;
						}
					}
					if (checkDigit === parseInt(v.slice(-2))) {
						result = true;
					} else {
						result = 'Неправильное контрольное число';
					}
					return result;
				} else {
					return true;
				}
			}
		],
		fieldRules: {
			required: v => v !== null && v !== '' && v !== undefined || 'Обязательное поле',
			email: value => {
				const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
				if (value && value.length > 0) {
					return pattern.test(value) || 'Введите корректный E-mail'
				} else {
					return true
				}
			},
			// snils: v => {
			// 	if (v && v.length === 11) {
			// 		return true || 'Формат СНИЛС - 11 цифр'
			// 	} else {
			// 		return true;
			// 	}
			// },
		}
	}),
	computed: {
	},
	methods: {
	}
}
