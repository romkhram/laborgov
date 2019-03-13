<template>
	<div>
				<v-container fluid class="eais__readerform">
						<v-layout row wrap>

							<v-flex md4 py-1>
								<span class="body-1">Ф.И.О.</span>
								<span class="subheading font-weight-medium">{{oneItem.data.fam}} {{oneItem.data.nam}} {{oneItem.data.famn}}</span>
							</v-flex>

							<v-flex md2 py-1>
								<span class="body-1">Дата рождения</span>
								<span class="subheading font-weight-medium">
									<span v-if="oneItem.data.date_borth !== null">{{ forTime(oneItem.data.date_borth) }}</span>
								</span>
							</v-flex>

							<v-flex md2 py-1>
								<span class="body-1">Полных лет</span>
								<span class="subheading font-weight-medium">
									<span v-if="oneItem.data.date_borth">
										{{age}}
									</span>
								</span>
							</v-flex>

							<v-flex md2 py-1>
								<span class="body-1">Пол</span>
								<span class="subheading font-weight-medium">
									<span v-if="oneItem.data.sex !== null">
										{{ sex[sex.findIndex(x => x.codeInGroup == oneItem.data.sex)].fullName }}
									</span>
								</span>
							</v-flex>

							<v-flex md2 py-1>
								<span class="body-1">ЛДПГУ</span>
								<span class="subheading font-weight-medium">{{oneItem.data.reg_bak}}</span>
							</v-flex>

							<v-flex md12 py-1>
								<v-divider></v-divider>
							</v-flex>

							<v-flex md12 py-0>
								<span class="body-1">Документ, удостоверяющий личность</span>
								<span class="body-1">вид документа
									<span class="subheading font-weight-medium">
										<span v-if="oneItem.data.sex !== null">
											{{ sprDocTypes[sprDocTypes.findIndex(x => x.codeInGroup == oneItem.data.doctype)].fullName }}
										</span>
									</span>
					        серия
					        <span class="subheading font-weight-medium">{{oneItem.data.austype}}</span>
					        №
					        <span class="subheading font-weight-medium">{{oneItem.data.ausnum}}</span>
					        выдан
					        <span class="subheading font-weight-medium">{{ forTime(oneItem.data.ausd) }}</span>
									кем
					        <span class="subheading font-weight-medium">{{oneItem.data.ausp}}</span>
						    </span>
							</v-flex>

							<v-flex md10 py-1 my-3>
								<span class="body-1">Место рождения</span>
								<span class="body-1">страна
						        <span class="subheading font-weight-medium">{{oneItem.data.b_country}}</span>,
						        город
						        <span class="subheading font-weight-medium">{{oneItem.data.place_borth}}</span>
						    </span>
							</v-flex>

							<v-flex md2 py-1 my-3>
								<span class="body-1">Гражданство</span>
								<span class="subheading font-weight-medium">
									<span v-if="oneItem.data.citizenship !== null">
										{{ sl_oksms[sl_oksms.findIndex(x => x.oksm_cod == oneItem.data.citizenship)].oksm_name }}
									</span>
								</span>
							</v-flex>

							<v-flex md12 py-0>
								<span class="body-1">Адрес регистрации</span>
								<span class="subheading font-weight-medium">{{oneItem.data.adress_old}}</span>
							</v-flex>

							<v-flex md12 py-1>
								<v-divider></v-divider>
							</v-flex>

							<v-flex md10 py-1>
								<span class="body-1">Фактический адрес</span>
								<span class="subheading font-weight-medium">
									<span v-if="oneItem.data.adress_old_f == null || oneItem.data.adress_old_f == oneItem.data.adress_old">
										Совпадает с адресом регистрации
									</span>
									<span v-else>{{oneItem.data.adress_old_f}}</span>
								</span>
							</v-flex>

							<v-flex md2 py-1>
								<span class="body-1">Дата окончания</span>
								<span class="subheading font-weight-medium">{{ forTime(oneItem.data.srok_f) }}</span>
							</v-flex>

							<v-flex md12 py-1>
								<v-divider></v-divider>
							</v-flex>



							<v-flex md3 py-1>
								<span class="body-1">Пенсионный возраст</span>
								<span class="subheading font-weight-medium">{{oneItem.data.stage_v}}</span>
							</v-flex>

							<!-- <v-flex md3 py-1>
								<span class="body-1">Статус</span>
								<span class="subheading font-weight-medium">
									<span v-if="oneItem.data.status !== null">
										{{ sprPersStatuss[sprPersStatuss.findIndex(x => x.typ_cod == oneItem.data.status)].typ_name }}
									</span>
								</span> -->

								<!-- <span class="body-1">Административный уровень по ОКАТО</span>
								<span class="subheading font-weight-medium"></span> -->
							</v-flex>

							<v-flex md3 py-1>
								<span class="body-1">Телефон</span>
								<span class="subheading font-weight-medium">{{oneItem.data.tel_h}}</span>
							</v-flex>

							<v-flex md3 py-1>
								<span class="body-1">Мобильный</span>
								<span class="subheading font-weight-medium">{{oneItem.data.tel_m}}</span>
							</v-flex>

							<v-flex md3 py-1>
								<span class="body-1">E-mail</span>
								<span class="subheading font-weight-medium">{{oneItem.data.e_mail}}</span>
							</v-flex>

							<v-flex md12 py-1>
								<v-divider></v-divider>
							</v-flex>

							<v-flex md3 py-1>
								<span class="body-1">ИНН</span>
								<span class="subheading font-weight-medium">{{oneItem.data.inn}}</span>
							</v-flex>

							<v-flex md3 py-1>
								<span class="body-1">СНИЛС</span>
								<span class="subheading font-weight-medium">{{oneItem.data.spens}}</span>
							</v-flex>

							<v-flex md3 py-1>
								<span class="body-1">Семейное положение</span>
								<span class="subheading font-weight-medium">
									<span v-if="oneItem.data.fem_cod !== null">
										{{ sprMaritalStatuses[sprMaritalStatuses.findIndex(x => x.codeInGroup === oneItem.data.fem_cod)].fullName }}
									</span>
								</span>
							</v-flex>

							<v-flex md2 py-1>
								<span class="body-1">Воинское звание</span>
								<span class="subheading font-weight-medium">
									<span v-if="oneItem.data.zvan_cod !== null">
										{{ sprMilitaryRanks[sprMilitaryRanks.findIndex(x => x.codeInGroup === oneItem.data.zvan_cod)].fullName }}
									</span>
								</span>
							</v-flex>

							<v-flex md12 py-1>
								<v-divider></v-divider>
							</v-flex>

							<v-flex md3 py-0>
								<span class="body-1">Статус</span>
								<span class="subheading font-weight-medium">
									<span v-if="oneItem.data.reg_status !== null">
										<!-- {{ sprPersStatuss[sprPersStatuss.findIndex(x => x.typ_cod == oneItem.data.status)].typ_name }} -->
										{{ sprRegStatuss[sprRegStatuss.findIndex(x => x.typ_cod == oneItem.data.reg_status)].typ_name }}
									</span>
								</span>
							</v-flex>

							<v-flex md3 py-0>
								<span class="body-1">Состояние</span>
								<span class="subheading font-weight-medium">
									<span v-if="oneItem.data.reg_sost1 !== null">
										{{ sprRegSosts.find(x => x.typ_cod === oneItem.data.reg_sost1).typ_name }}
									</span>
								</span>
							</v-flex>
<!-- дата явки  (pers.date_p), дата следующей явки (pers.date_n) -->
							<v-flex md3 py-0>
								<span class="body-1">Дата явки</span>
								<span class="subheading font-weight-medium">{{ forTime(oneItem.data.date_p) }}</span>
							</v-flex>

							<v-flex md2 py-0>
								<span class="body-1">Дата следующей явки</span>
								<span class="subheading font-weight-medium">{{ forTime(oneItem.data.date_n) }}</span>
							</v-flex>

							<v-flex md1 py-1>
								<div class="text-xs-right mrm-4">
									<v-btn class="ma-0" icon @click="beforeEdit" right>
										<v-icon color="primary">edit</v-icon>
									</v-btn>
								</div>
							</v-flex>

						</v-layout>
				</v-container>

				<v-dialog v-model="editNewDialog" max-width="1100">
		        <v-card>
			      	<v-card-title class="headline">Персональные данные</v-card-title>
							<v-form
								ref="form"
								v-model="valid"
								lazy-validation
							>
	            <v-container fluid grid-list-xl>
	                <v-layout row wrap>



										<v-flex md3 py-1>
											<v-text-field disabled label="ЛДПГУ" v-model="oneItem.data.reg_bak"></v-text-field>
										</v-flex>

										<v-flex md3 py-1 class="required">
                    	<v-text-field label="Фамилия" :rules="[fieldRules.required]" v-model="oneItem.data.fam"></v-text-field>
                    </v-flex>

										<v-flex md3 py-1 class="required">
                    	<v-text-field label="Имя" :rules="[fieldRules.required]" v-model="oneItem.data.nam"></v-text-field>
                    </v-flex>

										<v-flex md3 py-1>
                    	<v-text-field label="Отчество" v-model="oneItem.data.famn"></v-text-field>
                    </v-flex>



										<v-flex md3 py-1 class="required">
												<date-picker label="Дата рождения" :rules="[fieldRules.required]" v-model="oneItem.data.date_borth"></date-picker>
                    </v-flex>

										<v-flex md3 py-1 class="required">
											<v-autocomplete
												:items="sex" :rules="[fieldRules.required]"
												item-text="fullName"
												item-value="codeInGroup"
												v-model="oneItem.data.sex"
												label="Пол"
											></v-autocomplete>
										</v-flex>

										<v-flex md3 py-1>
											<v-text-field label="Место рождения. Страна" v-model="oneItem.data.b_country"></v-text-field>
										</v-flex>

										<v-flex md3 py-1>
											<v-text-field label="Город" v-model="oneItem.data.place_borth"></v-text-field>
										</v-flex>

										<v-flex md3 py-1>
											<!-- item-text="comboVal" -->
											<v-autocomplete
												:items="sl_oksms"
												item-text="oksm_name"
												item-value="oksm_cod"
												v-model="oneItem.data.citizenship"
												label="Гражданство"
											></v-autocomplete>
										</v-flex>

										<v-flex md3 py-1 class="required">
											<v-autocomplete
												:items="sprDocTypes" :rules="[fieldRules.required]"
												item-text="fullName"
												item-value="codeInGroup"
												v-model="oneItem.data.doctype"
												label="Вид документа"
											></v-autocomplete>
										</v-flex>

										<v-flex md3 py-1>
											<v-text-field label="Серия" v-model="oneItem.data.austype"></v-text-field>
										</v-flex>

										<v-flex md3 py-1>
											<v-text-field label="Номер" v-model="oneItem.data.ausnum"></v-text-field>
										</v-flex>

										<v-flex md3 py-1>
												<date-picker label="Выдан" v-model="oneItem.data.ausd"></date-picker>
                    </v-flex>

										<v-flex md9 py-1>
											<v-text-field label="Кем" v-model="oneItem.data.ausp"></v-text-field>
										</v-flex>

										<v-flex md12 py-1>
											<v-text-field label="Адрес регистрации" v-model="oneItem.data.adress_old"></v-text-field>
										</v-flex>

										<v-flex md9 py-1>
											<v-text-field label="Фактический адрес" v-model="oneItem.data.adress_old_f"></v-text-field>
										</v-flex>

										<v-flex md3 py-1>
												<date-picker label="Дата окончания регистрации" v-model="oneItem.data.srok_f"></date-picker>
										</v-flex>

										<v-flex md3 py-1>
											<v-text-field label="Домашний телефон" mask="###-##-##" v-model="oneItem.data.tel_h"></v-text-field>
										</v-flex>

										<v-flex md3 py-1>
											<v-text-field label="Мобильный телефон" mask="#(###) ###-##-##" v-model="oneItem.data.tel_m"></v-text-field>
										</v-flex>

										<v-flex md3 py-1>
											<v-text-field :rules="[fieldRules.email]" label="E-mail" v-model="oneItem.data.e_mail"></v-text-field>
										</v-flex>

										<v-flex md3 py-1>
											<v-autocomplete
												:items="sprMaritalStatuses"
												item-text="fullName"
												item-value="codeInGroup"
												v-model="oneItem.data.fem_cod"
												label="Семейное положение"
											></v-autocomplete>
										</v-flex>

										<v-flex md3 py-1>
											<v-text-field
												mask="############" :rules="innRules"
												label="ИНН" v-model="oneItem.data.inn"></v-text-field>
										</v-flex>

										<v-flex md3 py-1>
											<v-text-field
												:rules="snils" mask="###-###-### ##"
												label="СНИЛС" v-model="oneItem.data.spens"></v-text-field>
										</v-flex>

										<v-flex md3 py-1>
											<v-autocomplete
												:items="sprMilitaryRanks"
												item-text="fullName"
												item-value="codeInGroup"
												v-model="oneItem.data.zvan_cod"
												label="Воинское звание"
											></v-autocomplete>
										</v-flex>

										<v-flex md3 py-1>
											<v-text-field :min="20" type="number"
												label="Пенсионный возраст" v-model="oneItem.data.stage_v"></v-text-field>
											</v-flex>

							</v-layout>
					</v-container>
</v-form>
					<v-card-actions>
						<div class="ml-3">
							<p class="requiredNote primary--text">	&mdash; обязательные поля</p>
						</div>
							<v-spacer></v-spacer>

							<v-btn v-if="isNew" color="primary" flat="flat" @click="editNewDialog = false">
									Отменить
							</v-btn>

							<v-btn v-if="!isNew" color="primary" flat="flat" @click="editNewDialog = false">
									Продолжить
							</v-btn>

							<v-btn v-if="isNew" color="primary" flat="flat" @click="createItemVal(items, 'contacts')">
									Создать
							</v-btn>
					</v-card-actions>
			</v-card>
	</v-dialog>

	<v-snackbar
		v-model="showMessages"
		top
		right
		vertical
		:timeout='9000'
	>
		<div v-for="(item, i) in messages" :key="item.i">
			<p>{{item}}</p>
		</div>
		<v-btn flat @click="showMessages = false">
			Закрыть
		</v-btn>
	</v-snackbar>

</div>
</template>

<style>
span.body-1:first-letter {text-transform: capitalize;}
.eais__readerform .body-1 {color: rgba(0, 0, 0, 0.50);}
.eais__readerform .subheading:empty::before {content: "\2014";}
.eais__readerform .subheading {color: #464D69;}
</style>

<script>
import editmain from "@/mixins/editmain";
// oneItem.data.people
// oneItem.data.foreigner

export default {
	props: ['oneItem'],
	mixins: [editmain],
	mounted() {
		this.allCheck();
  	this.validate();
	},
	data: () => ({
		valid: true,
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
		innRules: [
			v => {
				if (v && v.length > 0) {
					return (v && v.length === 12) || 'Формат ИНН физического лица - 12 цифр'
				} else {
					return true;
				}
			},
			v => {
				if (v) {
					var result = false;
					var checkDigit = function (v, coefficients) {
						var n = 0;
						for (var i in coefficients) {
							n += coefficients[i] * v[i];
						}
						return parseInt(n % 11 % 10);
					};
					switch (v.length) {
						case 10:
							var n10 = checkDigit(v, [2, 4, 10, 3, 5, 9, 4, 6, 8]);
							if (n10 === parseInt(v[9])) {
								result = true;
							}
							break;
						case 12:
							var n11 = checkDigit(v, [7, 2, 4, 10, 3, 5, 9, 4, 6, 8]);
							var n12 = checkDigit(v, [3, 7, 2, 4, 10, 3, 5, 9, 4, 6, 8]);
							if ((n11 === parseInt(v[10])) && (n12 === parseInt(v[11]))) {
								result = true;
							}
							break;
					}
					if (!result) {
						result = 'Неправильное контрольное число';
					}
					return result;
				} else {
					return true;
				}
			}
		],
		sex: [{
			codeInGroup: 0,
			fullName: 'Мужской'
		}, {
			codeInGroup: 1,
			fullName: 'Женский'
		},

		],
		ownerTypeAr: [{
				code: 0,
				name: 'Организация'
			},
			{
				code: 1,
				name: 'Предприниматель'
			},
			{
				code: 2,
				name: 'Иногороднее'
			},
			{
				code: 3,
				name: 'Филиал'
			}
		],
		switch1: false,
		editNewDialog: false,
		isNew: false,
		dateMenu01: false,
		messages: [],
		showMessages: false,
		dateMenu02: false,
		dateMenu03: false,
		dateMenu04: false,
		date01: null,
		date02: null,
		date03: null,
		date04: null
	}),
	computed: {
		age() {
		 var n = new Date(), b = new Date(this.oneItem.data.date_borth),
		 age = n.getFullYear() - b.getFullYear();
			var d = new Date()
			var dGood = d.toISOString().split('T');
			var dArr = dGood[0].split('-');
			var dBorth = this.oneItem.data.date_borth;
			var dBorthGood = dBorth.split('T');
			var dBorthArr = dBorthGood[0].split('-');
			// if (dBorthArr[1] === dArr[1] && dBorthArr[2] === dArr[2]) {
			// 	console.log('Вот это поворот');
			// 	return (n.setFullYear(1972) < b.setFullYear(1972) ? age - 1 : age) + 1;
			// } else {
				return n.setFullYear(1972) < b.setFullYear(1972) ? age - 1 : age;
			// }
		},
		cantSave() {
			if (this.oneItem.data.status !== null &&
					this.oneItem.data.inn !== null &&
					this.oneItem.data.adress_old !== null &&
					this.oneItem.data.ausp !== null &&
					this.oneItem.data.ausd !== null &&
					this.oneItem.data.ausnum !== null &&
					this.oneItem.data.austype !== null &&
					this.oneItem.data.doctype !== null &&
					this.oneItem.data.citizenship !== null &&
					this.oneItem.data.sex !== null &&
					this.oneItem.data.date_borth !== null &&
					this.oneItem.data.famn !== null &&
					this.oneItem.data.nam !== null &&
					this.oneItem.data.fam !== null &&
					this.oneItem.data.status !== undefined &&
					this.oneItem.data.inn !== '' &&
					this.oneItem.data.adress_old !== '' &&
					this.oneItem.data.ausp !== '' &&
					this.oneItem.data.ausnum !== '' &&
					this.oneItem.data.austype !== '' &&
					this.oneItem.data.doctype !== undefined &&
					this.oneItem.data.citizenship !== undefined &&
					this.oneItem.data.sex !== undefined &&
					this.oneItem.data.famn !== '' &&
					this.oneItem.data.nam !== '' &&
					this.oneItem.data.fam !== '') {
				return false;
			} else {
				return true;
			}
		},
		pensAge() {
			if (this.oneItem.data.sex === 1) {
				return 55
			} else {
				return 60
			}
		},
		sprRegStatuss() {
			return this.$store.state.eais.stateHandbooks.sprRegStatuss;
		},
		sprMaritalStatuses() {
			return this.$store.state.eais.stateHandbooks.sprMaritalStatuses;
		},
		sprMilitaryRanks() {
			return this.$store.state.eais.stateHandbooks.sprMilitaryRanks;
		},
		sl_oksms() {
			return this.$store.state.eais.stateHandbooks.sl_oksms;
		},
		sprRegSosts() {
			return this.$store.state.eais.stateHandbooks.sprRegSosts
		},
		sprDocTypes() {
			return this.$store.state.eais.stateHandbooks.sprDocTypes;
		},
		sprCLStatus() {
			return this.$store.state.eais.stateHandbooks.sprCLStatus;
		},
		statusId() {
			return this.sprCLStatus[this.sprCLStatus.findIndex(x => x.codeInGroup === this.oneItem.data.statusId)].fullName;
		},
		EmplCenters() {
			return this.$store.state.eais.stateHandbooks.emplCenters;
		},
		sprSBS() {
			return this.$store.state.eais.stateHandbooks.sprSBS;
		},
		sprOPFs() {
			return this.$store.state.eais.stateHandbooks.sprOPFs;
		},
		sprLiquidations() {
			return this.$store.state.eais.stateHandbooks.sprLiquidations;
		},
		sprPersStatuss() {
			return this.$store.state.eais.stateHandbooks.sprPersStatuss;
		},
		liquidationSignId() {
			return this.sprLiquidations[this.sprLiquidations.findIndex(x => x.codeInGroup === this.oneItem.data.liquidationSignId)].fullName
		}
	},
	updated() {
		this.nextVisit()
	},
	methods: {
		nextVisit() {
			if (this.oneItem.data.date_p) {
				console.log(this.oneItem.data.date_p);
				var d = new Date(this.oneItem.data.date_p);
				var x = 14;
				d.setDate(d.getDate() + x);
				var dateNz = d.toISOString()
				this.oneItem.data.date_n = dateNz.replace('00.000Z', '00.000+0000');
				console.log(this.oneItem.data.date_n);
			}
		},
		beforeEdit() {
			if (this.oneItem.data.inn) {
				this.oneItem.data.inn = this.oneItem.data.inn.toString();
			}
			if (this.oneItem.data.spens) {
				this.oneItem.data.spens = this.oneItem.data.spens.replace(/\D+/g,"");
			}
			this.editDialog();
		},
		validate() {
			if (this.$refs.form.validate()) {
				this.snackbar = true
			}
		},
		allCheck() {
			this.messages.length = 0;
			this.absence();
			this.changePass();
			this.p3st4();
			this.reabEnd();
			this.predPens();
			if (this.messages.length > 0) {
				console.log(this.messages);
				this.showMessages = true;
			}
		},
		absence() {
			var oneItemData = this.$store.state.eais.oneItem.data;
			if (oneItemData.reg_status === 1 || oneItemData.reg_status === 3) {
				console.log('Неснятый');
				const d = new Date();
				const parseD = Date.parse(d);
				if (oneItemData.date_p !== null) {
					const dateP = oneItemData.date_p;
					const parseDateP = Date.parse(dateP) + 2592000000;
					if (parseD > parseDateP) {
						this.messages.push('Необходимо снять с учета - неявка более месяца') // проверил
					}
				}
			}
		},
		changePass() {
			if (this.oneItem.data.ausd !== null) {

				var birthDay20 = new Date(this.oneItem.data.date_borth);
				birthDay20.setFullYear(birthDay20.getFullYear() + 20);
				console.log('birthDay20');
				console.log(birthDay20);
				var birthDay45 = new Date(this.oneItem.data.date_borth);
				birthDay45.setFullYear(birthDay45.getFullYear() + 45);
				console.log('birthDay45');
				console.log(birthDay45);

					if (
						this.age >= 20 && this.age < 45 &&
						new Date(birthDay20) > new Date(this.oneItem.data.ausd)
					) {
						this.messages.push('Пора менять паспорт');
					} else if (
						this.age >= 45 &&
						new Date(birthDay45) > new Date(this.oneItem.data.ausd)
					) {
						this.messages.push('Пора менять паспорт');  // проверил
					}

				// joblessDate.setMonth(joblessDate.getMonth() + 18);

			// 	var dBorth = this.oneItem.data.date_borth;
			// 	var dBorthGood = dBorth.split('T');
			// 	var dBorthArr = dBorthGood[0].split('-');
			// 	console.log(dBorthArr);
			// 	var mutantDate = (Number(dBorthArr[0]) + this.age) + '-' + dBorthArr[1] + '-' + dBorthArr[2] + 'T21:00:00.000+0000';
			// 	console.log('mutantDate');
			// 	console.log(new Date(mutantDate));
			// 	console.log('ausd');
			// 	console.log(new Date(this.oneItem.data.ausd));
			// 	console.log(new Date(mutantDate) > new Date(this.oneItem.data.ausd));
			// 	if (
			// 		this.age >= 20 && this.age < 45 &&
			// 		new Date(mutantDate) > new Date(this.oneItem.data.ausd)
			// 	) {
			// 		this.messages.push('Пора менять паспорт');
			// 	} /*else if (
			// 		this.age >= 45 &&
			// 		new Date(mutantDate) > new Date(this.oneItem.data.ausd)
			// 	) {
			// 		this.messages.push('Пора менять паспорт');
			// 	} */
			}
		},
		predPens() {
			var birthDayPens = new Date(this.oneItem.data.date_borth);
				if (this.oneItem.data.stage_v && this.oneItem.data.stage_v > 0) {
					birthDayPens.setFullYear( (birthDayPens.getFullYear() + Number(this.oneItem.data.stage_v) ) - 5);
				} else {
					birthDayPens.setFullYear( (birthDayPens.getFullYear() + this.pensAge) - 5);
				}
			const persDef = this.$store.state.eais.oneItem.linkedData.mpArr_pers_def_ref;
			var defCod10 = persDef.find(x => x.data.def_cod === 10);
					if (new Date(birthDayPens) < new Date() && !defCod10 ) {
						this.messages.push('Гражданин предпенсионного возраста');
					}
		},
		p3st4() {
			const oneItemData = this.$store.state.eais.oneItem.data;
			const persRez = this.$store.state.eais.oneItem.linkedData.mpArr_pers_rez_ref;
			var sortResults = persRez.sort((prev, next) => {
				if ( prev.data.date_rez > next.data.date_rez ) return -1;
				if ( prev.data.date_rez > next.data.date_rez ) return 1;
			});
			if (sortResults.find(x => x.data.rez_det === 114)) {
				var joblessDateJSON = sortResults.find(x => x.data.rez_det === 114).data.date_rez;
				var joblessDate = new Date(joblessDateJSON);
				joblessDate.setMonth(joblessDate.getMonth() + 18);
				console.log(joblessDate);
				console.log();
				if (
					oneItemData.reg_status === 1 &&
					new Date() >= new Date(joblessDate)
				) {
					this.messages.push('Относится к гражданам, указанным в п.3 ст.4 Закона о занятости');
				}
			}
		},
		reabEnd() {
			const oneItemData = this.$store.state.eais.oneItem.data;
			const persRez = this.$store.state.eais.oneItem.linkedData.mpArr_pers_rez_ref;
			var sortResults = persRez.sort((prev, next) => {
				if ( prev.data.date_rez > next.data.date_rez ) return -1;
				if ( prev.data.date_rez > next.data.date_rez ) return 1;
			});
			if (sortResults.find(x => x.data.rez_osn === 576)) {
				var reabEndDateJSON = sortResults.find(x => x.data.rez_osn === 576).data.date_end;
				// var reabEndDate = new Date();
				var reabEndDate = new Date(reabEndDateJSON);
				reabEndDate.setMonth(reabEndDate.getMonth() - 1);

				var reabEndedDate = new Date(reabEndDateJSON);
				reabEndedDate.setMonth(reabEndedDate.getMonth() + 1);

				console.log(reabEndDate);
				if (
					new Date() >= new Date(reabEndDate) && new Date() <= new Date(reabEndedDate)
				) {
					this.messages.push('Окончание индивидуальной программы реабилитации и абилитации гражданина');
				}
			}
			console.log('rez_osn === 576');
			console.log(sortResults.find(x => x.data.rez_osn === 576));
		},
	},
	components: {}
}
</script>
