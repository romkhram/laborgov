<template>
	<div>
				<v-container fluid class="eais__readerform">
						<v-layout row wrap>

								<v-flex md12 py-1>
									<span class="body-1"><span v-if="oneItem.data.ownerType !== null">{{ ownerTypeAr[oneItem.data.ownerType].name }} </span></span>
									<span class="subheading font-weight-medium"><!-- {{oneItem.data.activityFormId}} -->  {{oneItem.data.longName}}</span>
								</v-flex>
								<!-- <v-flex md5 py-1>
									<span class="body-1 text-md-right">
										<span v-if="oneItem.data.ownerType !== null">{{ ownerTypeAr[oneItem.data.ownerType].name }} </span>
									</span>
								</v-flex> -->

								<v-flex md12 py-1>
										<v-divider></v-divider>
								</v-flex>

								<v-flex md3 py-1>
										<span class="body-1">Идентификатор организации</span>
										<span class="subheading font-weight-medium">{{oneItem.data.companyId}}</span>
								</v-flex>
								<v-flex md3 py-1>
										<span class="body-1">Код заявителя (ЛДПГУ)</span>
										<span class="subheading font-weight-medium">{{oneItem.data.declarerId}}</span>
								</v-flex>
								<v-flex md3 py-1>
										<span class="body-1">ЦЗН</span>
										<span class="subheading font-weight-medium">
											<!-- {{oneItem.data.emplCenterId}} -->
											<span v-if="oneItem.data.emplCenterId !== null">{{ EmplCenters[EmplCenters.findIndex(x => x.emplCenterId === oneItem.data.emplCenterId)].shortName }}</span>
										</span>
								</v-flex>
								<v-flex md2 py-1>
										<span class="body-1 text-md-right">Форма собственности</span>
										<span class="subheading font-weight-medium text-md-right">
											<span v-if="oneItem.data.ownershipId !== null">
												{{ sprSBS[sprSBS.findIndex(x => x.codeInGroup === oneItem.data.ownershipId)].shortName }}
											</span>
										</span>
								</v-flex>


								<v-flex md12 my-0 py-1 class="body-1">
										<v-divider></v-divider>
								</v-flex>

								<v-flex md3 py-1>
									<span class="body-1">Статус</span>
									<span class="subheading font-weight-medium">
										<span v-if="oneItem.data.statusId">
											{{statusId}}
										</span>
									</span>
								</v-flex>

								<v-flex md7 py-1>
									<span class="body-1">Среднесписочная численность</span>
										<span class="body-1">
											<span class="subheading font-weight-medium">{{oneItem.data.people}}</span>
											в т.ч. иностранных граждан:
											<span class="subheading font-weight-medium">{{oneItem.data.foreigner}}</span>
										</span>
								</v-flex>

								<v-flex md12 my-0 py-1 class="body-1">
										<v-divider></v-divider>
								</v-flex>

								<v-flex md3 py-1>
									<span class="body-1 mb-1">Дата регистрации</span>
									<!-- {{oneItem.data.dateReg}} -->
									<!-- <span class="subheading font-weight-medium">{{ forTime(oneItem.data.dateReg) }}</span> -->
								</v-flex>

								<v-flex md3 py-1>
									<span class="body-1 mb-1">Дата ликвидации</span>
									<span class="subheading font-weight-medium">{{ forTime(oneItem.data.liquidationDate) }}</span>
								</v-flex>

								<v-flex md5 py-1>
										<span class="body-1">Признак ликвидации</span>
										<span class="subheading font-weight-medium">
											<span v-if="oneItem.data.liquidationSignId !== null">
												{{liquidationSignId}}
											</span>
										</span>
								</v-flex>

								<v-flex md12 my-0 py-1 class="body-1">
										<v-divider></v-divider>
								</v-flex>

								<v-flex md3 py-1>
										<span class="body-1">E-mail</span>
										<span class="subheading font-weight-medium">{{oneItem.data.eMail}}</span>
								</v-flex>
								<v-flex md3 py-1>
										<span class="body-1">Сайт</span>
										<span class="subheading font-weight-medium">{{oneItem.data.webSite}}</span>
								</v-flex>
								<v-flex md5 py-1>
										<span class="body-1">Дополнительная информация</span>
										<span class="subheading font-weight-medium">{{oneItem.data.addInformation}}</span>
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


		                  <v-flex md3>
		                    <v-autocomplete
		                    	v-model="oneItem.data.ownerType"
		                      :items="ownerTypeAr"
													item-text="name"
													item-value="code"
		                      label="Тип предприятия"
		                    ></v-autocomplete>
		                  </v-flex>

		                  <v-flex md9>
		                    <v-text-field
		                    	v-model="oneItem.data.longName"
		                      label="Полное наименование"
		                    ></v-text-field>
		                  </v-flex>

		                  <v-flex md6>

		                    <v-autocomplete
													:items="sprOPFs"
	          							item-text="comboVal"
	          							item-value="addCode"
		                    	v-model="oneItem.data.activityFormId"
		                      label="ОПФ"
		                    ></v-autocomplete>
		                  </v-flex>

		                  <v-flex md6>
		                    <v-text-field
		                    	v-model="oneItem.data.shortName"
		                      label="Краткое наименование"
		                    ></v-text-field>
		                  </v-flex>

		                  <v-flex md2>
		                    <v-text-field
		                    	v-model="oneItem.data.companyId"
		                      label="Идентификатор"
		                    ></v-text-field>
		                  </v-flex>

		                  <v-flex md2>
		                    <v-text-field
		                    	v-model="oneItem.data.declarerId"
		                      label="Код ЛДПГУ"
		                    ></v-text-field>
		                  </v-flex>

		                  <v-flex md4>
		                    <v-autocomplete
													:items="EmplCenters"
            							item-text="comboVal"
            							item-value="emplCenterId"
		                    	v-model="oneItem.data.emplCenterId"
		                      label="ЦЗН"
		                    ></v-autocomplete>
		                  </v-flex>

		                  <v-flex md4>
		                    <v-autocomplete
													:items="sprSBS"
            							item-text="comboVal"
            							item-value="codeInGroup"
		                    	v-model="oneItem.data.ownershipId"
		                      label="Форма собственности"
		                    ></v-autocomplete>
		                  </v-flex>

		                  <v-flex md3>
		                    <v-text-field
		                    	v-model="oneItem.data.people"
		                      label="Среднесписочная численность"
		                    ></v-text-field>
		                  </v-flex>

		                  <v-flex md3>
		                    <v-text-field
		                    	v-model="oneItem.data.foreigner"
		                      label="Количество иностранных граждан"
		                    ></v-text-field>
		                  </v-flex>

		                  <v-flex md3>
		                    <v-text-field
		                    	v-model="oneItem.data.eMail"
		                      label="E-mail"
		                    ></v-text-field>
		                  </v-flex>

		                  <v-flex md3>
		                    <v-text-field
		                    	v-model="oneItem.data.webSite"
		                      label="Сайт"
		                    ></v-text-field>
		                  </v-flex>

		                  <v-flex md12>
		                    <v-text-field
		                    	v-model="oneItem.data.addInformation"
		                      label="Дополнительно"
		                    ></v-text-field>
		                  </v-flex>

		                  <v-flex md3>


												<v-autocomplete
		                    	v-model="oneItem.data.statusId"
		                      :items="sprCLStatus"
            							item-text="comboVal"
            							item-value="codeInGroup"
		                      label="Статус"
		                    ></v-autocomplete>

		                    <!-- <v-text-field
		                    	v-model="oneItem.data.statusId"
		                      label="Статус"
		                    ></v-text-field> -->
		                  </v-flex>

		                  <v-flex md3>
												<date-picker label="Дата регистрации" v-model="oneItem.data.dateReg"></date-picker>
		                  </v-flex>

		                  <v-flex md3>
												<date-picker label="Дата ликвидации" v-model="oneItem.data.liquidationDate"></date-picker>
		                  </v-flex>



			<!-- path:	'sprLiquidations', code: 'codeInGroup', name: 'fullName' -->
		                  <v-flex md3>


		                    <v-autocomplete
													:items="sprLiquidations"
	          							item-text="comboVal"
	          							item-value="codeInGroup"
		                    	v-model="oneItem.data.liquidationSignId"
		                      label="Причина ликвидации"
		                    ></v-autocomplete>


		                    <!-- <v-select
		                    	v-model="oneItem.data.liquidationSignId"
		                      label="Причина ликвидации"
		                    ></v-select> -->
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
	computed: {
		sprCLStatus() {
			return this.$store.state.eais.stateHandbooks.sprCLStatus;
		},
		statusId(){
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
		liquidationSignId() {
			return this.sprLiquidations[this.sprLiquidations.findIndex(x => x.codeInGroup === this.oneItem.data.liquidationSignId)].fullName
		}
	},
  components: {
  }
}

</script>
