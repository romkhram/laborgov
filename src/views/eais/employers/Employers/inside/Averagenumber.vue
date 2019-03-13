<template>
	<div>
				<v-container fluid>
						<v-layout row wrap>

								<v-flex md6 py-1>
									<span class="body-2">ГУП «Водоканал Санкт-Петербурга»</span>
								</v-flex>

								<v-flex md5 py-1>
										<span class="body-1 text-md-right">Организация</span>
								</v-flex>

								<v-flex md12 py-1>
										<v-divider></v-divider>
								</v-flex>

								<v-flex md3 py-1>
										<span class="body-1">Идентификатор: 1010050412</span>
								</v-flex>
								<v-flex md3 py-1>
										<span class="body-1">Код ЛДПГУ: 2001162</span>
								</v-flex>
								<v-flex md3 py-1>
										<span class="body-1">АЗН Красносельского района</span>
								</v-flex>
								<v-flex md2 py-1>
										<span class="body-1 text-md-right">Международная организация</span>
								</v-flex>


								<v-flex md12 my-0 py-1 class="body-1">
										<v-divider></v-divider>
								</v-flex>

								<v-flex md3 py-1>
									<span class="body-1">Статус</span>
								</v-flex>

								<v-flex md7 py-1>
									<span class="body-1">Среднесписочная численность:
										{{oneItem.people}}
										в т.ч. иностранных граждан:
										{{oneItem.foreigner}}</span>
								</v-flex>

								<v-flex md12 my-0 py-1 class="body-1">
										<v-divider></v-divider>
								</v-flex>

								<v-flex md3 py-1>
										<span class="body-1">Дата регистрации: 23.09.1987</span>
								</v-flex>

								<v-flex md3 py-1>
										<span class="body-1">Дата ликвидации: 23.09.1987</span>
								</v-flex>

								<v-flex md5 py-1>
										<span class="body-1">Причина ликвидации</span>
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

				<v-dialog v-model="editNewDialog" max-width="1100">
		        <v-card>
		            <v-card-title class="headline">Информация</v-card-title>

		            <v-container fluid grid-list-xl>
		                <v-layout row wrap>

											<v-flex md4>
		                    <v-autocomplete
		                      label="Наименование профессии"
		                      :no-data-text="noDataText"
		                    ></v-autocomplete>
		                  </v-flex>

											<v-flex md4>
												<v-text-field
													label="Специализация"
												></v-text-field>
											</v-flex>

												<v-flex md4>
			                    <v-autocomplete
			                      label="Производная должность"
			                      :no-data-text="noDataText"
			                    ></v-autocomplete>
			                  </v-flex>

		                  <v-flex md3>
		                    <v-select
		                      items="ГУП"
		                      label="ОПФ"
		                    ></v-select>
		                  </v-flex>

		                  <v-flex md9>
		                    <v-text-field
		                      label="Краткое наименование"
		                    ></v-text-field>
		                  </v-flex>

		                  <v-flex md3>
		                    <v-text-field
		                      label="Идентификатор"
		                    ></v-text-field>
		                  </v-flex>

		                  <v-flex md3>
		                    <v-text-field
		                      label="Код ЛДПГУ"
		                    ></v-text-field>
		                  </v-flex>

		                  <v-flex md3>
		                    <v-select
		                      items="АЗН Красносельского района"
		                      label="ЦЗН"
		                    ></v-select>
		                  </v-flex>

		                  <v-flex md3>
		                    <v-select
		                      items="Международная организация"
		                      label="Форма собственности"
		                    ></v-select>
		                  </v-flex>

		                  <v-flex md3>
		                    <v-text-field
		                      label="Среднесписочная численность"
		                    ></v-text-field>
		                  </v-flex>

		                  <v-flex md3>
		                    <v-text-field
		                      label="Количество иностранных граждан"
		                    ></v-text-field>
		                  </v-flex>

		                  <v-flex md6>
		                    <v-text-field
		                      label="Дополнительно"
		                    ></v-text-field>
		                  </v-flex>

		                  <v-flex md3>
		                    <v-text-field
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
		                      items="Банкротство"
		                      label="Причина ликвидации"
		                    ></v-select>
		                  </v-flex>


		                </v-layout>
		            </v-container>

		            <v-card-actions>
		                <v-spacer></v-spacer>

		                <v-btn v-if="!isNew" color="primary" flat="flat" @click="editNewDialog = false">
		                    Продолжить
		                </v-btn>

		                <v-btn v-if="isNew" color="primary" flat="flat" @click="editNewDialog = false">
		                    Отмена
		                </v-btn>

		                <v-btn v-if="isNew" color="primary" flat="flat" @click="createItemVal(items, 'companyResult')">
		                    Создать
		                </v-btn>
		            </v-card-actions>
		        </v-card>
		    </v-dialog>

	</div>
</template>

<script>
// import EmployersList from "Components/Widgets/Eais/Employers/EmployersList";
// import EmployerEdit from "Components/Widgets/Eais/Employers/EmployerEdit";
// import RecentOrders from "Components/Widgets/RecentOrders";

export default {
	data: () => ({
		switch1: false,
		editNewDialog: false,
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
		emploer () {
			return this.$store.state.eais.emploer;
		},
	},
  components: {
    // RecentOrders,
		// EmployersList,
		// EmployerEdit
  },
	methods: {
	changeSidebarFilterHandler(filter) {
		console.log(filter);
		this.$store.commit('changeSidebarFilterHandler2', filter);
		}
	}
}

</script>
