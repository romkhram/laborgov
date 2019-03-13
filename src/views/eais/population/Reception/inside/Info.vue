<template>
	<div>
				<v-container fluid class="eais__readerform">
						<v-layout row wrap>

							<v-flex md3 py-1>
								<span class="body-1">Вид результата</span>
								<span class="subheading font-weight-medium">
									<span v-if="oneItem.data.sob_cod !== null">
										{{ resTypes[resTypes.findIndex(x => x.code === oneItem.data.sob_cod)].txt }}
									</span>
									</span>
							</v-flex>

							<v-flex md2 py-1>
								<span class="body-1">Дата подачи</span>
								<span class="subheading font-weight-medium">
									<span v-if="oneItem.data.applicationdate">
										{{forTime(oneItem.data.applicationdate)}}
									</span>
								</span>
							</v-flex>

							<v-flex md2 py-1>
								<span class="body-1">Дата поступления</span>
								<span class="subheading font-weight-medium">
									<span v-if="oneItem.data.in_date">
										{{forTime(oneItem.data.in_date)}}
									</span>
									<span v-else-if="!oneItem.data.request_num">
										{{forTime(oneItem.data.applicationdate)}}
									</span>
								</span>
							</v-flex>

							<v-flex md2 py-1>
								<span class="body-1">Забронированное время</span>
								<span class="subheading font-weight-medium">{{oneItem.data.test}}</span>
							</v-flex>

							<v-flex md2 py-1>
								<span class="body-1">Номер талона</span>
								<span class="subheading font-weight-medium">{{oneItem.data.r}}</span>
							</v-flex>

							<v-flex md1 py-1 align-self-end>
								<!-- <div class="text-xs-right mrm-4">
									<v-btn class="ma-0" icon @click="editNewDialog = true" right>
										<v-icon color="primary">edit</v-icon>
									</v-btn>
								</div> -->
							</v-flex>

							<v-flex md12 py-1>
								<v-divider></v-divider>
							</v-flex>

			        <v-flex md3  py-1>
			          <span class="body-1">Обратившийся:</span>
			          <span class="subheading font-weight-medium">{{oneItem.data.plastname}} {{oneItem.data.pfirstname}} {{oneItem.data.pmiddlename}}</span>
			        </v-flex>
							<v-flex md3 py-1>
			          <span class="body-1">Тип заявителя</span>
			            <span class="subheading font-weight-medium">
										<span v-if="oneItem.data.applicanttype !== null">
											{{ applicantTypes[applicantTypes.findIndex(x => x.code === oneItem.data.applicanttype)].txt }}
										</span>
									</span>
			        </v-flex>
			        <v-flex md2 py-1>
			          <span class="body-1">Пол:</span>
			          <span class="subheading font-weight-medium">
									<span v-if="oneItem.data.pgender_code !== null">
										{{ sex[sex.findIndex(x => x.code === oneItem.data.pgender_code)].txt }}
									</span>
								</span>
			        </v-flex>
			        <v-flex md3  py-1>
			          <span class="body-1">ИНН:</span>
			          <span class="subheading font-weight-medium">{{oneItem.data.pinn}}</span>
			        </v-flex>
			        <v-flex md12 py-1>
			          <v-divider></v-divider>
			        </v-flex>
			        <v-flex md3 py-1>
			          <span class="body-1">Дата рождения:</span>
			          <span class="subheading font-weight-medium">
									<span v-if="oneItem.data.pbirth !== null">
										{{forTime(oneItem.data.pbirth)}}
									</span>
								</span>
			        </v-flex>
			        <v-flex md3 py-1>
			          <span class="body-1">Место рождения:</span>
			          <span class="body-1">
			            <span class="subheading font-weight-medium">{{oneItem.data.pplaceofbirth}}</span>
			          </span>
			        </v-flex>
			        <v-flex md2 py-1>
			          <span class="body-1" >Гражданство:</span>
			          <!-- <span class="subheading font-weight-medium">{{oneItem.data.citizenship_name}}</span> -->
			          <span class="subheading font-weight-medium">Российская Федерация</span>
			        </v-flex>
			        <v-flex md3 py-1>
			          <span class="body-1" >СНИЛС:</span>
			          <span class="subheading font-weight-medium">{{oneItem.data.psnils}}</span>
			        </v-flex>
			        <v-flex md12 py-1>
			          <v-divider></v-divider>
			        </v-flex>

							<v-flex md12 py-1>
								<span class="body-1">Документ, удостоверяющий личность</span>
								<span class="body-1">вид документа
						        <span class="subheading font-weight-medium pr-1">
											<span v-if="oneItem.data.idtyp !== null">
												{{ sprDocTypes[sprDocTypes.findIndex(x => x.codeInGroup == oneItem.data.idtyp)].fullName }}
											</span>
										</span>
						        серия
						        <span class="subheading font-weight-medium">{{oneItem.data.idpasseries}}</span>
						        №
						        <span class="subheading font-weight-medium pr-1">{{oneItem.data.idpasnumber}}</span>
						        выдан
						        <span class="subheading font-weight-medium pr-1">
											<span v-if="oneItem.data.idpasissuerdat !== null">
												{{forTime(oneItem.data.idpasissuerdat)}}
											</span>
										</span>
										кем
						        <span class="subheading font-weight-medium">{{oneItem.data.idpasissuer}}</span>
						    </span>
							</v-flex>

			        <v-flex md12 py-1>
			          <v-divider></v-divider>
			        </v-flex>
			        <v-flex md3 py-1>
			          <span class="body-1">Мобильный телефон:</span>
			          <span class="subheading font-weight-medium">{{oneItem.data.cmobilephone}}</span>
			        </v-flex>
			        <v-flex md3 py-1>
			          <span class="body-1">Почта:</span>
			          <span class="subheading font-weight-medium">{{oneItem.data.cmail}}</span>
			        </v-flex>
			        <v-flex md2 py-1>
			          <span class="body-1">Домашний телефон:</span>
			          <span class="subheading font-weight-medium">{{oneItem.data.cphone}}</span>
			        </v-flex>
							<v-flex md3 py-1>
							  <span class="body-1" >Индекс:</span>
							  <span class="subheading font-weight-medium">{{oneItem.data.rsaindex}}</span>
							</v-flex>
			        <!-- <v-flex md3 py-1>
			          <span class="body-1">Факс:</span>
			          <span class="subheading font-weight-medium">{{oneItem.data.cfax}}</span>
			        </v-flex> -->
			        <v-flex md12 py-1>
			          <v-divider></v-divider>
			        </v-flex>
							<!-- <v-flex md3 py-1>
							  <span class="body-1" >Тип:</span>
							  <span class="subheading font-weight-medium">{{oneItem.data.rtype}}</span>
							</v-flex> -->
							<!-- <v-flex md5 py-1>
							  <span class="body-1" >ФИАС:</span>
							  <span class="subheading font-weight-medium">{{oneItem.data.rsafias}}</span>
							</v-flex> -->
							<v-flex md11 py-1>
							  <span class="body-1">Адрес:</span>
							  <span class="subheading font-weight-medium">{{oneItem.data.test}}</span>
							</v-flex>

							<v-flex md1 py-1>
								<div class="text-xs-right mrm-4" v-if="!oneItem.data.request_num">
									<v-btn class="ma-0" icon @click="beforeEdit" right>
										<v-icon color="primary">edit</v-icon>
									</v-btn>
								</div>
							</v-flex>

						</v-layout>
				</v-container>

        <v-dialog v-model="editNewDialog" max-width="1100">
		        <v-card>
		            <v-card-title class="headline">Сведения о рабочем месте</v-card-title>

		            <v-container fluid grid-list-xl>
		                <v-layout row wrap>

											<v-flex md3 py-1 class="required">
	                    	<v-text-field label="Фамилия" :rules="[fieldRules.required]" v-model="oneItem.data.plastname"></v-text-field>
	                    </v-flex>

											<v-flex md3 py-1 class="required">
	                    	<v-text-field label="Имя" :rules="[fieldRules.required]" v-model="oneItem.data.pfirstname"></v-text-field>
	                    </v-flex>

											<v-flex md3 py-1>
	                    	<v-text-field label="Отчество" v-model="oneItem.data.pmiddlename"></v-text-field>
	                    </v-flex>

											<v-flex md3 py-1 class="required">
												<v-autocomplete
													:items="sex" :rules="[fieldRules.required]"
													item-text="txt"
													item-value="code"
													v-model="oneItem.data.pgender_code"
													label="Пол"
												></v-autocomplete>
											</v-flex>

	                    <!-- <v-flex md12 py-1>
	                    	<v-autocomplete
	                    	 v-model="oneItem.data.sob_cod"
	                    	 :items="resTypes"
	                       item-text="txt"
	                       item-value="code"
	                    	 label="Вид результата"
	                    	 :no-data-text="noDataText"
	                    	></v-autocomplete>
	                    </v-flex> -->
											<v-flex md3 py-1>
												<v-text-field
													mask="############" :rules="innRules"
													label="ИНН" v-model="oneItem.data.pinn">
												</v-text-field>
											</v-flex>

											<v-flex md3 py-1>
												<v-text-field
													:rules="snils" mask="###-###-### ##"
													label="СНИЛС" v-model="oneItem.data.psnils"></v-text-field>
											</v-flex>

											<v-flex md3 py-1>
												<!-- item-text="comboVal" -->
												<v-text-field
													label="Гражданство" v-model="oneItem.data.citizenship_name">
												</v-text-field>
											</v-flex>

											<v-flex md3 py-1>
													<date-picker label="Дата рождения" v-model="oneItem.data.pbirth"></date-picker>
											</v-flex>

											<v-flex md12 py-1>
												<!-- item-text="comboVal" -->
												<v-text-field
													label="Место рождения" v-model="oneItem.data.pplaceofbirth">
												</v-text-field>
											</v-flex>

											<v-flex md3 py-1 class="required">
												<v-autocomplete
													:items="sprDocTypes" :rules="[fieldRules.required]"
													item-text="fullName"
													item-value="codeInGroup"
													v-model="oneItem.data.idtyp"
													label="Вид документа"
												></v-autocomplete>
											</v-flex>

											<v-flex md3 py-1>
												<v-text-field label="Серия" mask="#########" v-model="oneItem.data.idpasseries"></v-text-field>
											</v-flex>

											<v-flex md3 py-1>
												<v-text-field label="Номер" mask="#########" v-model="oneItem.data.idpasnumber"></v-text-field>
											</v-flex>

											<v-flex md3 py-1>
													<date-picker label="Выдан" v-model="oneItem.data.idpasissuerdat"></date-picker>
											</v-flex>

											<v-flex md12 py-1>
												<v-text-field label="Кем" v-model="oneItem.data.idpasissuer"></v-text-field>
											</v-flex>

											<v-flex md3 py-1>
												<v-text-field label="Мобильный телефон" mask="#(###) ###-##-##" v-model="oneItem.data.cmobilephone"></v-text-field>
											</v-flex>

											<v-flex md3 py-1>
												<v-text-field :rules="[fieldRules.email]" label="E-mail" v-model="oneItem.data.cmail"></v-text-field>
											</v-flex>

											<v-flex md3 py-1>
												<v-text-field label="Домашний телефон" mask="#(###) ###-##-##" v-model="oneItem.data.cphone"></v-text-field>
											</v-flex>

											<v-flex md3 py-1>
												<v-text-field label="Индекс" mask="######" v-model="oneItem.data.rsaindex"></v-text-field>
											</v-flex>

											<v-flex md8 py-1>
												<v-text-field label="Адрес" v-model="oneItem.data.tel_h"></v-text-field>
											</v-flex>

											<v-flex md4 py-1>
												<v-autocomplete clearable
													:items="azns"
													item-text="txt"
													item-value="code"
													v-model="oneItem.data.iogvcode"
													label="АЗН"
												></v-autocomplete>
											</v-flex>


		                </v-layout>
		            </v-container>

								<v-card-actions>
		                <v-spacer></v-spacer>

		                <!-- <v-btn v-if="this.$store.state.eais.globalCreate" color="primary" flat="flat" @click="editNewDialog = false">
		                    Отменить
		                </v-btn> -->

		                <v-btn color="primary" flat="flat" @click="editNewDialog = false">
		                    Продолжить
		                </v-btn>

		                <!-- <v-btn v-if="this.$store.state.eais.globalCreate" color="primary" flat="flat" @click="createItemVal(items, 'contacts')">
		                    Создать
		                </v-btn> -->
		            </v-card-actions>
		        </v-card>
		    </v-dialog>

	</div>
</template>

<style>
span.body-1:first-letter {text-transform: capitalize;}
</style>

<script>




// oneItem.data.people
// oneItem.data.foreigner
import editmain from "@/mixins/editmain";
export default {
	props: ['oneItem'],
  mixins: [editmain],
	data: () => ({
    noDataText: 'Нет данных',
		azns: [
			{code: "azn10", txt: "АЗН Василеостровского р-на"},
			{code: "azn20", txt: "АЗН Выборгского района"},
			{code: "azn40", txt: "АЗН Приморского района"},
			{code: "azn50", txt: "АЗН Калининского района"},
			{code: "azn60", txt: "АЗН Кировского района"},
			{code: "azn70", txt: "АЗН Колпинского района"},
			{code: "azn100", txt: "АЗН Московского района"},
			{code: "azn110", txt: "АЗН Невского района"},
			{code: "azn120", txt: "АЗН Адмиралтейского района"},
			{code: "azn130", txt: "АЗН Петроградского района"},
			{code: "azn140", txt: "АЗН Петродворцового района"},
			{code: "azn150", txt: "АЗН Пушкинского района"},
			{code: "azn160", txt: "АЗН Курортного района"},
			{code: "azn170", txt: "АЗН Центрального района"},
			{code: "azn180", txt: "АЗН Фрунзенского района"},
			{code: "azn190", txt: "АЗН Кронштадтского района"},
			{code: "azn200", txt: "АЗН Красносельского района"},
			{code: "azn210", txt: "АЗН Красногвардейского р-н"},
			{code: "azn230", txt: "АЗН Ломоносова"},
			{code: "iogv431", txt: "СПб ГАУ Центр занятости населения Санкт-Петербурга"},
		],
		sex: [
			{ code: 'F', txt: 'Женский'},
			{ code: 'M', txt: 'Мужской'},
			{ code: '1', txt: 'Мужской'},
			{ code: '2', txt: 'Женский'},
		],
		resTypes: [
			{ code: 1, txt: 'Приглашен' },
			{ code: 2, txt: 'Регистрация проведена' },
			{ code: 3, txt: 'Ошибочное обращение'},
			{ code: 4, txt: 'Не удалось дозвониться'},
			{ code: 11, txt: 'Явка' },
			{ code: 12, txt: 'Не явка'}
		],
		applicantTypes: [
			{ code: 'P', txt: 'Физическое лицо'},
			{ code: 'L', txt: 'Юридическое лицо'},
			{ code: 'B', txt: 'Индивидуальный предприниматель'}
		],
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
	}),
	mounted() {

	},
	computed: {
		// sex() {
		// 	var sex = [
		// 		{ code: 'F', txt: 'Женский'},
		// 		{ code: 'M', txt: 'Мужской'},
		// 		{ code: '1', txt: 'Мужской'},
		// 		{ code: '2', txt: 'Женский'},
		// 	];
		// 	return sex
		// },
		sprDocTypes() {
			return this.$store.state.eais.stateHandbooks.sprDocTypes;
		},
		emplCenters() {
			return this.$store.state.eais.stateHandbooks.emplCenters;
		},
		dateNow() {
			var dateNow = new Date();
			var ISOdate = dateNow.toISOString().split('T');
			dateNow = ISOdate[0] + 'T21:00:00.000+0000';
			// dateNow.toISOString()
			// dateNow.setMinutes(dateNow.getMinutes() + 1);
			console.log(ISOdate, dateNow);
			return dateNow;
		},
	},
  components: {
  },
	methods: {
		beforeEdit() {
			if (this.oneItem.data.pinn) {
				this.oneItem.data.pinn = this.oneItem.data.pinn.toString();
			}
			if (this.oneItem.data.psnils) {
				this.oneItem.data.psnils = this.oneItem.data.psnils.replace(/\D+/g,"");
			}
			if (this.oneItem.data.in_date == null) {
				this.oneItem.data.in_date = this.dateNow;
			}
			if (this.oneItem.data.applicationdate == null) {
				this.oneItem.data.applicationdate = this.dateNow;
			}

			this.editDialog();
		},
		// toNum(val){
		// console.log(val);
		// 	val = Number(val);
		// 	console.log(val);
		// 	console.log(this.oneItem.data);
		// },
		// toAreCode() {
		// 	const areCode = this.sl_profs[this.sl_profs.findIndex(x => x.prof_cod === this.oneItem.data.prof_cod)].are_cod;
		// 	console.log(areCode);
		// 	if (areCode !== 0) {
		// 		this.oneItem.data.are_cod = areCode;
		// 	}
		// }
	}
}

</script>
