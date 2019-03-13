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
										{{ Math.floor((new Date() - new Date(oneItem.data.date_borth)) / 31536000000) }}
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

							<v-flex md12 py-1>
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

							<v-flex md12 py-1>
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
								<span class="body-1">Статус</span>
								<span class="subheading font-weight-medium">
									<span v-if="oneItem.data.status !== null">
										{{ sprPersStatuss[sprPersStatuss.findIndex(x => x.typ_cod == oneItem.data.status)].typ_name }}
									</span>
								</span>

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

							<v-flex md1 py-1>
								<div class="text-xs-right mrm-4">
									<v-btn class="ma-0" icon @click="editDialog" right>
										<v-icon color="primary">edit</v-icon>
									</v-btn>
								</div>
							</v-flex>

						</v-layout>
				</v-container>

				<v-dialog v-model="editNewDialog" max-width="1100">
		        <v-card>
			      	<v-card-title class="headline">Личное дело гражданина</v-card-title>

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

										<v-flex md3 py-1 class="required">
                    	<v-text-field label="Отчество" :rules="[fieldRules.required]" v-model="oneItem.data.famn"></v-text-field>
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
											<v-text-field label="Домашний телефон" v-model="oneItem.data.tel_h"></v-text-field>
										</v-flex>

										<v-flex md3 py-1>
											<v-text-field label="Мобильный телефон" v-model="oneItem.data.tel_m"></v-text-field>
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
												mask="############"
												label="ИНН"  v-model="oneItem.data.inn"></v-text-field>
										</v-flex>

										<v-flex md3 py-1>
											<v-text-field
												mask="###-###-### ##"
												label="СНИЛС" v-model="oneItem.data.spens"></v-text-field>
										</v-flex>

										<v-flex md6 py-1>
											<v-autocomplete
												:items="sprMilitaryRanks"
												item-text="fullName"
												item-value="codeInGroup"
												v-model="oneItem.data.zvan_cod"
												label="Воинское звание"
											></v-autocomplete>
										</v-flex>

							</v-layout>
					</v-container>

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
	data: () => ({
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
		dateMenu02: false,
		dateMenu03: false,
		dateMenu04: false,
		date01: null,
		date02: null,
		date03: null,
		date04: null
	}),
	computed: {
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
		sprMaritalStatuses() {
			return this.$store.state.eais.stateHandbooks.sprMaritalStatuses;
		},
		sprMilitaryRanks() {
			return this.$store.state.eais.stateHandbooks.sprMilitaryRanks;
		},
		sl_oksms() {
			return this.$store.state.eais.stateHandbooks.sl_oksms;
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
	components: {}
}
</script>
