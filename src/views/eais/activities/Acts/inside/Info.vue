<template>
	<div>
				<v-container fluid class="eais__readerform">
						<v-layout row wrap>

							<v-flex md6 py-1>
								<span class="body-1">Вид договора</span>
								<span class="subheading font-weight-medium">
									<span v-if="oneItem.data.type_cod !== null && sl_vactypes.find(x => x.type_cod === oneItem.data.type_cod)">
										{{sl_vactypes.find(x => x.type_cod === oneItem.data.type_cod).type_name }}
									</span>
								</span>
							</v-flex>

							<v-flex md3 py-1>
								<span class="body-1">Номер договора</span>
								<span class="subheading font-weight-medium">{{oneItem.data.agr_num}}</span>
							</v-flex>

							<v-flex md3 py-1>
								<span class="body-1">Форма договора</span>
								<span class="subheading font-weight-medium">{{oneItem.data.agr_form}}</span>
							</v-flex>

							<v-flex md12 py-1>
								<v-divider></v-divider>
							</v-flex>

							<!-- <v-flex md6 py-1>
								<span class="body-1">Источник финансирования</span>
								<span class="subheading font-weight-medium">{{oneItem.data.vif_cod}}</span>
							</v-flex> -->

							<v-flex md6 py-1>
								<span class="body-1">ЦЗН</span>
								<span class="subheading font-weight-medium">
									<span>{{ emplCenters[emplCenters.findIndex(x => x.emplCenterId === oneItem.data.cz_cod)].shortName }}</span>
								</span>
							</v-flex>

							<v-flex md6 py-1>
								<span class="body-1">Адм.ур. по ОКАТО</span>
								<span class="subheading font-weight-medium">
									<span v-if="oneItem.data.p_ra !== null">{{municipalityDivisions[municipalityDivisions.findIndex(x => x.cim === oneItem.data.p_ra)].txt }}</span>
								</span>
							</v-flex>

							<v-flex md12 py-1>
								<v-divider></v-divider>
							</v-flex>

								<v-flex md6 py-1>
									<span class="body-1">ФИО подписавшего лица от предприятия</span>
				          <span class="subheading font-weight-medium">
				            <span v-if="oneItem.data.c_sign && vacContacts.find(x => x.contactId === oneItem.data.c_sign)">{{ vacContacts.find(x => x.contactId === oneItem.data.c_sign).comboVal }}</span>
				          </span>
									<!-- <span class="subheading font-weight-medium">{{oneItem.data.test}}</span> -->
								</v-flex>

								<v-flex md6 py-1>
									<span class="body-1">ФИО контактного лица от предприятия</span>
				          <span class="subheading font-weight-medium">
				            <span v-if="oneItem.data.c_contact && vacContacts.find(x => x.contactId === oneItem.data.c_contact)">{{ vacContacts.find(x => x.contactId === oneItem.data.c_contact).comboVal }}</span>
				          </span>
									<!-- <span class="subheading font-weight-medium">{{oneItem.data.test}}</span> -->
								</v-flex>

								<v-flex md12 py-1>
									<v-divider></v-divider>
								</v-flex>

								<v-flex md3 py-1>
									<span class="body-1">Дата заключения Договора</span>
									<span class="subheading font-weight-medium">
										<span v-if="oneItem.data.agr_begin !== null">{{ forTime(oneItem.data.agr_begin) }}</span>
									</span>
								</v-flex>

								<v-flex md3 py-1>
									<span class="body-1">Дата окончания Договора</span>
									<span class="subheading font-weight-medium">
										<span v-if="oneItem.data.agr_time !== null">{{ forTime(oneItem.data.agr_time) }}</span>
									</span>
								</v-flex>

								<v-flex md3 py-1>
									<span class="body-1">Начало проведения работ</span>
									<span class="subheading font-weight-medium">
										<span v-if="oneItem.data.date_beg !== null">{{ forTime(oneItem.data.date_beg) }}</span>
									</span>
								</v-flex>

								<v-flex md3 py-1>
									<span class="body-1">Окончание проведения работ</span>
									<span class="subheading font-weight-medium">
										<span v-if="oneItem.data.date_end !== null">{{ forTime(oneItem.data.date_end) }}</span>
									</span>
								</v-flex>

								<v-flex md12 py-1>
									<v-divider></v-divider>
								</v-flex>

								<v-flex md6 py-1>
									<span class="body-1">Программа развития</span>
									<span class="subheading font-weight-medium">
										<span v-if="oneItem.data.ncp_cod !== null">{{oneItem.data.ncp_cod}}
											{{sprDevelopmentPrograms[sprDevelopmentPrograms.findIndex(x => x.codeInGroup === oneItem.data.ncp_cod)].fullName }}
										</span>
									</span>
								</v-flex>

								<v-flex md6 py-1>
									<span class="body-1">Вид работ</span>
									<span class="subheading font-weight-medium">
										<span v-if="oneItem.data.cjtyp_cod !== null">
											{{sprCJTYPes[sprCJTYPes.findIndex(x => x.codeInGroup === oneItem.data.cjtyp_cod)].fullName }}
										</span>
									</span>
								</v-flex>

								<v-flex md12 py-1>
									<v-divider></v-divider>
								</v-flex>

								<v-flex md3 py-1>
									<span class="body-1">Сумма договора</span>
									<span class="subheading font-weight-medium">{{oneItem.data.agr_money}}</span>
								</v-flex>

								<v-flex md3 py-1>
									<span class="body-1">КБК</span>
									<span class="subheading font-weight-medium">{{oneItem.data.cod_l}}</span>
								</v-flex>

								<v-flex md3 py-1>
									<span class="body-1">Числ. уч. по договору</span>
									<span class="subheading font-weight-medium">{{oneItem.data.agr_count}}</span>
								</v-flex>

								<v-flex md3 py-1>
									<span class="body-1">Кол-во ликв. мест</span>
									<span class="subheading font-weight-medium">{{oneItem.data.likv_kol}}</span>
								</v-flex>

								<v-flex md12 py-1>
										<v-divider></v-divider>
								</v-flex>

								<!-- <v-flex md6 py-1>
									<span class="body-1">Напоминание</span>
									<span class="subheading font-weight-medium">{{oneItem.data.test}}</span>
								</v-flex> -->

								<v-flex md11 py-1>
									<span class="body-1">Причины ликвидации РМ</span>
									<span class="subheading font-weight-medium">{{oneItem.data.likv_comm}}</span>
								</v-flex>

								<v-flex md1 py-1>
									<div class="text-xs-right mrm-4">
										<v-btn class="ma-0" icon @click="editDialog">
											<v-icon color="primary">edit</v-icon>
										</v-btn>
									</div>
								</v-flex>
						</v-layout>
				</v-container>

				<v-dialog v-model="editNewDialog" max-width="1100">
		        <v-card>
		            <v-card-title class="headline">Информация</v-card-title>

		            <v-container fluid grid-list-xl>
		                <v-layout row wrap>



											<v-flex md6>
												<v-autocomplete
													:no-data-text="noDataText"
													label="Вид договора"
													:items="sl_vactypes"
													item-text="comboVal"
													item-value="type_cod"
													v-model="oneItem.data.type_cod"
												></v-autocomplete>
											</v-flex>

											<!-- <v-flex md6 py-1>
	                      <v-autocomplete
												label="Вид договора"
	                        :no-data-text="noDataText"
	                      ></v-autocomplete>
											</v-flex> -->

											<v-flex md3>
			                    <v-text-field
			                      label="Номер договора"
			                      v-model="oneItem.data.agr_num"
			                    ></v-text-field>
											</v-flex>

											<v-flex md3>
		                      <v-autocomplete
		                        label="Форма договора"
		                        :no-data-text="noDataText"
			                      :items="['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20']"
			                      v-model="oneItem.data.agr_form"
		                      ></v-autocomplete>
											</v-flex>

											<!-- <v-flex md6 py-1>
		                      <v-autocomplete
		                        label="Источник финансирования"
		                        :no-data-text="noDataText"
		                      ></v-autocomplete>
											</v-flex> -->

											<v-flex md6>
												<v-autocomplete
													label="ЦЗН"
													hide-details
													:items="emplCenters"
													item-text="comboVal"
													item-value="emplCenterId"
													v-model="oneItem.data.cz_cod"
													:no-data-text="noDataText"
												></v-autocomplete>
			                    <!-- <v-text-field
			                      label="ЦЗН"
			                    ></v-text-field> -->
											</v-flex>

											<v-flex md6>
												<v-autocomplete
													label="Административный уровень по ОКАТО"
													hide-details
													:items="municipalityDivisions"
													item-text="txt"
													item-value="cim"
													v-model="oneItem.data.p_ra"
													:no-data-text="noDataText"
												></v-autocomplete>
											</v-flex>

												<!-- <v-flex md6>
			                      <v-autocomplete
			                        label="ФИО подписавшего лица от предприятия"
			                        :no-data-text="noDataText"
			                      ></v-autocomplete>
												</v-flex> -->

												<v-flex md6>
			                    <v-autocomplete
			                      :no-data-text="noDataText"
			                      label="ФИО подписавшего лица от предприятия"
			                      :items="vacContacts"
			                      item-text="comboVal"
			                      item-value="contactId"
			                      v-model="oneItem.data.c_sign"
			                    ></v-autocomplete>
			                  </v-flex>

												<v-flex md6>
			                    <v-autocomplete
			                      :no-data-text="noDataText"
			                      label="ФИО контактного лица от предприятия"
			                      :items="vacContacts"
			                      item-text="comboVal"
			                      item-value="contactId"
			                      v-model="oneItem.data.c_contact"
			                    ></v-autocomplete>
			                  </v-flex>

												<!-- <v-flex md6>
			                      <v-autocomplete
			                        label="ФИО контактного лица от предприятия"
			                        :no-data-text="noDataText"
			                      ></v-autocomplete>
												</v-flex> -->

												<v-flex md3 py-1>
													<date-picker label="Дата заключения Договора" v-model="oneItem.data.agr_begin"></date-picker>
												</v-flex>

												<v-flex md3 py-1>
													<date-picker label="Дата окончания Договора" v-model="oneItem.data.agr_time"></date-picker>
												</v-flex>

												<v-flex md3 py-1>
													<date-picker label="Начало проведения работ" v-model="oneItem.data.date_beg"></date-picker>
												</v-flex>

												<v-flex md3 py-1>
													<date-picker label="Окончание проведения работ" v-model="oneItem.data.date_end"></date-picker>
												</v-flex>

												<v-flex md6>
			                    <v-autocomplete
			                      :no-data-text="noDataText"
			                      label="Программа развития"
			                      :items="sprDevelopmentPrograms"
			                      item-text="comboVal"
			                      item-value="codeInGroup"
			                      v-model="oneItem.data.ncp_cod"
			                    ></v-autocomplete>
			                  </v-flex>

												<v-flex md6 py-1>
			                    <v-autocomplete
			                      :no-data-text="noDataText"
			                      label="Вид работ"
			                      :items="sprCJTYPes"
			                      item-text="comboVal"
			                      item-value="codeInGroup"
			                      v-model="oneItem.data.cjtyp_cod"
			                    ></v-autocomplete>
												</v-flex>

												<!-- <v-flex md6 py-1>
			                      <v-autocomplete
			                        label="Вид работ"
			                        :no-data-text="noDataText"
			                      ></v-autocomplete>
												</v-flex> -->

												<v-flex md3 py-1>
				                    <v-text-field
				                    	:min="1"
				                    	type="number"
				                      label="Сумма договора"
				                      v-model="oneItem.data.agr_money"
				                    ></v-text-field>
												</v-flex>

												<v-flex md3 py-1>
				                    <v-text-field
				                      label="КБК"
				                      v-model="oneItem.data.cod_l"
				                    ></v-text-field>
												</v-flex>

												<v-flex md3 py-1>
				                    <v-text-field
				                    	:min="1"
				                    	type="number"
				                      label="Числ. уч. по договору"
				                      v-model="oneItem.data.agr_count"
				                    ></v-text-field>
												</v-flex>

												<v-flex md3 py-1>
				                    <v-text-field
				                    	:min="oneItem.data.agr_count"
				                    	type="number"
				                      label="Кол-во ликв. мест"
				                      v-model="oneItem.data.likv_kol"
				                    ></v-text-field>
												</v-flex>

												<!-- <v-flex md6 py-1>
												    <v-textarea
												      label="Напоминание"
				                      v-model="oneItem.data.type_cod"
												    ></v-textarea>
												</v-flex> -->

												<v-flex md12 py-1>
												    <v-text-field
												      label="Причины ликвидации РМ"
				                      v-model="oneItem.data.likv_comm"
												    ></v-text-field>
												</v-flex>


		                </v-layout>
		            </v-container>

		            <v-card-actions>
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
		ownerTypeAr: [
			{code: 0, name: 'Организация'},
			{code: 1, name: 'Предприниматель'},
			{code: 2, name: 'Иногороднее'},
			{code: 3, name: 'Филиал'}
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
	mounted() {
		this.getContacts();
	},
	computed: {
		sprCLStatus() {
			return this.$store.state.eais.stateHandbooks.sprCLStatus;
		},
		statusId(){
			return this.sprCLStatus[this.sprCLStatus.findIndex(x => x.codeInGroup === this.oneItem.data.statusId)].fullName;
		},
		emplCenters() {
			return this.$store.state.eais.stateHandbooks.emplCenters;
		},
		sprSBS() {
			return this.$store.state.eais.stateHandbooks.sprSBS;
		},
		sprOPFs() {
			return this.$store.state.eais.stateHandbooks.sprOPFs;
		},

		sprCJTYPes() {
			return this.$store.state.eais.stateHandbooks.sprCJTYPes;
		},
		sl_vactypes() {

			// .sort((prev, next) => prev.type_cod - next.type_cod)
			return this.$store.state.eais.stateHandbooks.sl_vactypes.sort((prev, next) => prev.type_cod - next.type_cod);
		},
		municipalityDivisions() {
			return this.$store.state.eais.stateHandbooks.municipalityDivisions;
		},
		sprDevelopmentPrograms() {
			return this.$store.state.eais.stateHandbooks.sprDevelopmentPrograms.sort((prev, next) => prev.codeInGroup - next.codeInGroup);
		},
		vacContacts() {
			console.log('in Vac');
			console.log(this.$store.state.extranotes.extraHandbooks.vacContacts);
			return this.$store.state.extranotes.extraHandbooks.vacContacts;
		},
		sprLiquidations() {
			return this.$store.state.eais.stateHandbooks.sprLiquidations;
		},
		liquidationSignId() {
			return this.sprLiquidations[this.sprLiquidations.findIndex(x => x.codeInGroup === this.oneItem.data.liquidationSignId)].fullName
		}
	},
  components: {
  },
  methods: {
		getContacts() {
			this.$store.dispatch('getVacContacts');
		}
  }

}

</script>
