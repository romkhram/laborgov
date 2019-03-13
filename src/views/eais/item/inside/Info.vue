<template>
	<div>
				<v-container fluid class="eais__readerform">
						<v-layout row wrap>

								<v-flex md6 py-1>
									<span class="body-2"><!-- list --> {{oneItem.data.activityFormId}} {{oneItem.data.longName}}</span>
								</v-flex>
								<v-flex md5 py-1>
										<span class="body-1 text-md-right">{{ownerTypeAr[oneItem.data.ownerType]}} </span>
								</v-flex>

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
										<span class="body-1">Код ЦЗН</span>
										<span class="subheading font-weight-medium">{{oneItem.data.emplCenterId}}</span>
								</v-flex>
								<v-flex md2 py-1>
										<span class="body-1 text-md-right">Форма собственности</span>
										<span class="subheading font-weight-medium text-md-right">{{oneItem.data.ownershipId}}</span>
								</v-flex>


								<v-flex md12 my-0 py-1 class="body-1">
										<v-divider></v-divider>
								</v-flex>

								<v-flex md3 py-1>
									<span class="body-1">Статус</span>
									<span class="subheading font-weight-medium">{{oneItem.data.statusId}}</span>
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
									<span class="subheading font-weight-medium">{{new Date(oneItem.data.dateReg).toLocaleDateString()}}</span>
								</v-flex>

								<v-flex md3 py-1>
									<span class="body-1 mb-1">Дата ликвидации</span>
									<span class="subheading font-weight-medium">{{new Date(oneItem.data.liquidationDate).toLocaleDateString()}}</span>
								</v-flex>

								<v-flex md5 py-1>
										<span class="body-1">Признак ликвидации</span>
										<span class="subheading font-weight-medium">{{oneItem.data.liquidationSignId}}</span>
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
												<v-btn class="ma-0" icon @click="emplMain = true">
														<v-icon color="primary">edit</v-icon>
												</v-btn>
										</div>
								</v-flex>

						</v-layout>
				</v-container>

				<v-dialog v-model="emplMain" max-width="1100">
		        <v-card>
		            <v-card-title class="headline">Информация</v-card-title>

		            <v-container fluid grid-list-xl>
		                <v-layout row wrap>


		                  <v-flex md3>
		                    <v-select
		                    	v-model="oneItem.data.ownerType"
		                      :items="ownerTypeAr"
		                      label="Тип предприятия"

		                    ></v-select>
		                  </v-flex>

		                  <v-flex md9>
		                    <v-text-field
		                    	v-model="oneItem.data.longName"
		                      label="Полное наименование"
		                    ></v-text-field>
		                  </v-flex>

		                  <v-flex md3>
		                    <v-select
		                    	v-model="oneItem.data.activityFormId"
		                      label="ОПФ"
		                    ></v-select>
		                  </v-flex>

		                  <v-flex md9>
		                    <v-text-field
		                    	v-model="oneItem.data.shortName"
		                      label="Краткое наименование"
		                    ></v-text-field>
		                  </v-flex>

		                  <v-flex md3>
		                    <v-text-field
		                    	v-model="oneItem.data.companyId"
		                      label="Идентификатор"
		                    ></v-text-field>
		                  </v-flex>

		                  <v-flex md3>
		                    <v-text-field
		                    	v-model="oneItem.data.declarerId"
		                      label="Код ЛДПГУ"
		                    ></v-text-field>
		                  </v-flex>

		                  <v-flex md3>
		                    <v-autocomplete
            							item-text="shortName"
            							item-value="emplCenterId"
		                    	v-model="oneItem.data.emplCenterId"
		                      :items="EmplCenters"
		                      label="ЦЗН"
		                      @input="returnId"
		                    ></v-autocomplete>
		                  </v-flex>

		                  <v-flex md3>
		                    <v-select
		                    	v-model="oneItem.data.ownershipId"
		                      label="Форма собственности"
		                    ></v-select>
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
		                    <v-text-field
		                    	v-model="oneItem.data.statusId"
		                      label="Статус"
		                    ></v-text-field>
		                  </v-flex>

		                  <v-flex md3>
		                    <v-menu
		                      ref="dateMenu01"
		                      :close-on-content-click="false"
		                      v-model="dateMenu01"
		                      :nudge-right="40"
		                      :return-value.sync="date01"
		                      lazy
		                      transition="scale-transition"
		                      offset-y
		                      full-width
		                      min-width="290px"
		                    >
		                      <v-text-field
		                        slot="activator"
		                        v-model="date01"
		                        label="Дата регистрации"
		                        prepend-icon="event"
		                        readonly
		                      ></v-text-field>
		                      <v-date-picker v-model="date01" no-title scrollable @input="$refs.dateMenu01.save(date01)" :first-day-of-week="1" locale="ru-ru">
		                      </v-date-picker>
		                    </v-menu>
		                  </v-flex>

		                  <v-flex md3>
		                    <v-menu
		                      ref="dateMenu02"
		                      :close-on-content-click="false"
		                      v-model="dateMenu02"
		                      :nudge-right="40"
		                      :return-value.sync="date02"
		                      lazy
		                      transition="scale-transition"
		                      offset-y
		                      full-width
		                      min-width="290px"
		                    >
		                      <v-text-field
		                        slot="activator"
		                        v-model="date02"
		                        label="Дата ликвидации"
		                        prepend-icon="event"
		                        readonly
		                      ></v-text-field>
		                      <v-date-picker v-model="date02" no-title scrollable @input="$refs.dateMenu02.save(date02)" :first-day-of-week="1" locale="ru-ru">
		                      </v-date-picker>
		                    </v-menu>
		                  </v-flex>

		                  <v-flex md3>
		                    <v-select
		                    	v-model="oneItem.data.liquidationSignId"
		                      label="Причина ликвидации"
		                    ></v-select>
		                  </v-flex>


		                </v-layout>
		            </v-container>

		            <v-card-actions>
		                <v-spacer></v-spacer>

		                <v-btn color="primary" flat="flat" @click="emplMain = false">
		                    Отменить
		                </v-btn>

		                <v-btn color="primary" flat="flat" @click="emplMain = false">
		                    Продолжить
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

export default {
	props: ['oneItem'],
	data: () => ({
		ownerTypeAr: [
			'организация',
			'предприниматель',
			'иногороднее',
			'филиал'
		],
		switch1: false,
		emplMain: false,
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
		this.getEmplCenters();
	},
	computed: {
		EmplCenters () {
			return this.$store.state.eais.EmplCenters;
		}
	},
  components: {
  },
	methods: {
		getEmplCenters() {
			this.$store.dispatch('getEmplCenters');
		},
		returnId() {
			console.log(this.oneItem.data.emplCenterId);
		}
	}
}

</script>
