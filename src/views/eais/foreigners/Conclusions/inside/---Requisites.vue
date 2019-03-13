<template>
	<div>
		<v-container fluid class="eais__readerform">
				<v-layout row wrap>


					<v-flex md2 py-1>
							<span class="body-1">Запрос получен</span>
							<span class="subheading font-weight-medium">{{oneItem.data.test}}</span>
					</v-flex>

					<v-flex md2 py-1>
							<span class="body-1">Запрос от</span>
							<span class="subheading font-weight-medium">{{oneItem.data.test}}</span>
					</v-flex>

					<v-flex md2 py-1>
							<span class="body-1">Год</span>
							<span class="subheading font-weight-medium">{{oneItem.data.test}}</span>
					</v-flex>

					<v-flex md2 py-1>
							<span class="body-1">№ запроса</span>
							<span class="subheading font-weight-medium">{{oneItem.data.test}}</span>
					</v-flex>

					<v-flex md4 py-1>
							<span class="body-1">МФС</span>
							<span class="subheading font-weight-medium">{{oneItem.data.test}}</span>
					</v-flex>

					<!-- <v-flex md12 py-1>
							<v-divider></v-divider>
					</v-flex> -->

						<!-- <v-flex md2 py-1>
								<span class="body-1">ОГРН</span>
								<span class="subheading font-weight-medium">{{oneItem.data.ogrn}}</span>
						</v-flex>
						<v-flex md2 py-1>
								<span class="body-1">ИНН</span>
								<span class="subheading font-weight-medium">{{oneItem.data.inn}}</span>
						</v-flex>
						<v-flex md2 py-1>
								<span class="body-1">КПП</span>
								<span class="subheading font-weight-medium">{{oneItem.data.kppInn}}</span>
						</v-flex>
						<v-flex md2 py-1>
								<span class="body-1">ОКПО</span>
								<span class="subheading font-weight-medium">{{oneItem.data.okpo}}</span>
						</v-flex>
						<v-flex md4 py-1>
								<span class="body-1">ОКОГУ</span>
								<span class="subheading font-weight-medium">{{oneItem.data.soogu}}</span>
						</v-flex>

						<v-flex md12 py-1>
								<v-divider></v-divider>
						</v-flex>

						<v-flex md6 py-1>
								<span class="body-1">Свидетельство о внесении в ЕГРЮЛ / ЕГРИП</span>
								<span class="body-1">
									<span class="subheading font-weight-medium">{{oneItem.data.innDoc}}</span> от <span class="subheading font-weight-medium">{{new Date(oneItem.data.ogrnDate).toLocaleDateString()}}</span>
								</span>
						</v-flex>

						<v-flex md5 py-1>
								<span class="body-1">№свНИ</span>
								<span class="body-1">
									<span class="subheading font-weight-medium">{{oneItem.data.innDoc}}</span> от <span class="subheading font-weight-medium">{{new Date(oneItem.data.innDate).toLocaleDateString()}}</span>
								</span>
						</v-flex>

						<v-flex md1 py-1>
								<div class="text-xs-right mrm-4">
										<v-btn class="ma-0" icon @click="emplRequisites = true">
												<v-icon color="primary">edit</v-icon>
										</v-btn>
								</div>
						</v-flex> -->

						<v-flex md12 py-1>
								<v-divider></v-divider>
						</v-flex>

						<v-flex md4 py-1>
							<span class="body-1">Штатная численность работников</span>
								<span class="body-1">
									<span class="subheading font-weight-medium">{{oneItem.data.people}}</span>
									в т.ч. иностранных граждан:
									<span class="subheading font-weight-medium">{{oneItem.data.foreigner}}</span>
								</span>
						</v-flex>

						<v-flex md4 py-1>
							<span class="body-1">Обращался в</span>
							<span class="subheading font-weight-medium">{{oneItem.data.test}}</span>
						</v-flex>

						<v-flex md4 py-1>
							<span class="body-1">Пустое поле</span>
							<span class="subheading font-weight-medium">{{oneItem.data.test}}</span>
						</v-flex>

						<v-flex md12 py-1>
								<v-divider></v-divider>
						</v-flex>

						<v-flex md2 py-1>
							<span class="body-1">Дата</span>
							<span class="subheading font-weight-medium">{{oneItem.data.test}}</span>
						</v-flex>

						<v-flex md2 py-1>
							<span class="body-1">№ обращения</span>
							<span class="subheading font-weight-medium">{{oneItem.data.test}}</span>
						</v-flex>

						<v-flex md4 py-1>
							<span class="body-1">Территория</span>
							<span class="subheading font-weight-medium">{{oneItem.data.test}}</span>
						</v-flex>

						<v-flex md4 py-1>
							<span class="body-1">по ОКВЭД</span>
							<span class="subheading font-weight-medium">{{oneItem.data.test}}</span>
						</v-flex>

						<v-flex md12 py-1>
								<v-divider></v-divider>
						</v-flex>

						<v-flex md2 py-1>
							<span class="body-1">Статус: Заключение от</span>
							<span class="subheading font-weight-medium">{{oneItem.data.test}}</span>
						</v-flex>

						<v-flex md9 py-1>
							<span class="body-1">Статус: №</span>
							<span class="subheading font-weight-medium">{{oneItem.data.test}}</span>
						</v-flex>

						<v-flex md1 py-1>
								<div class="text-xs-right mrm-4">
										<v-btn class="ma-0" icon @click="editDialog = true">
												<v-icon color="primary">edit</v-icon>
										</v-btn>
								</div>
						</v-flex>

				</v-layout>
		</v-container>

				<v-dialog v-model="editDialog" max-width="1100">
		        <v-card>
		            <v-card-title class="headline">Реквизиты</v-card-title>

		            <v-container fluid grid-list-xl>
		                <v-layout row wrap>


											<v-flex md2>
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
											      label="Запрос получен"
											      prepend-icon="event"
											      readonly
											    ></v-text-field>
											    <v-date-picker v-model="date01" no-title scrollable @input="$refs.dateMenu01.save(date01)" :first-day-of-week="1" locale="ru-ru">
											    </v-date-picker>
											  </v-menu>
											</v-flex>

											<v-flex md2>
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
											      label="Запрос от"
											      prepend-icon="event"
											      readonly
											    ></v-text-field>
											    <v-date-picker v-model="date02" no-title scrollable @input="$refs.dateMenu02.save(date02)" :first-day-of-week="1" locale="ru-ru">
											    </v-date-picker>
											  </v-menu>
											</v-flex>


		                  <!-- <v-flex md3>
		                    <v-select
		                      items="Организация"
		                      label="Тип предприятия"
		                    ></v-select>
		                  </v-flex> -->

		                  <v-flex md2>
		                    <v-text-field
		                      label="Год"
		                    ></v-text-field>
		                  </v-flex>

		                  <v-flex md2>
		                    <v-text-field
		                      label="№ запроса"
		                    ></v-text-field>
		                  </v-flex>

	                    <v-flex md4>
	                      <v-autocomplete
	                        label="МФС"
	                        :no-data-text="noDataText"
	                      ></v-autocomplete>
	                    </v-flex>

		                  <v-flex md2>
		                    <v-text-field
		                      label="Штат.числ. работников"
		                    ></v-text-field>
		                  </v-flex>

		                  <v-flex md2>
		                    <v-text-field
		                      label="в т.ч. ин.гр."
		                    ></v-text-field>
		                  </v-flex>

	                    <v-flex md4>
	                      <v-autocomplete
	                        label="Обращался в"
	                        :no-data-text="noDataText"
	                      ></v-autocomplete>
	                    </v-flex>

		                  <v-flex md4>
		                    <v-text-field
		                      label=""
		                    ></v-text-field>
		                  </v-flex>

											<v-flex md2>
		                    <v-menu
		                      ref="dateMenu03"
		                      :close-on-content-click="false"
		                      v-model="dateMenu03"
		                      :nudge-right="40"
		                      :return-value.sync="date03"
		                      lazy
		                      transition="scale-transition"
		                      offset-y
		                      full-width
		                      min-width="290px"
		                    >
		                      <v-text-field
		                        slot="activator"
		                        v-model="date03"
		                        label="Дата"
		                        prepend-icon="event"
		                        readonly
		                      ></v-text-field>
		                      <v-date-picker v-model="date03" no-title scrollable @input="$refs.dateMenu03.save(date03)" :first-day-of-week="1" locale="ru-ru">
		                      </v-date-picker>
		                    </v-menu>
		                  </v-flex>

		                  <v-flex md2>
		                    <v-menu
		                      ref="dateMenu04"
		                      :close-on-content-click="false"
		                      v-model="dateMenu04"
		                      :nudge-right="40"
		                      :return-value.sync="date04"
		                      lazy
		                      transition="scale-transition"
		                      offset-y
		                      full-width
		                      min-width="290px"
		                    >
		                      <v-text-field
		                        slot="activator"
		                        v-model="date04"
		                        label="№ обращения"
		                        prepend-icon="event"
		                        readonly
		                      ></v-text-field>
		                      <v-date-picker v-model="date04" no-title scrollable @input="$refs.dateMenu04.save(date04)" :first-day-of-week="1" locale="ru-ru">
		                      </v-date-picker>
		                    </v-menu>
		                  </v-flex>

		                  <v-flex md4>
		                    <v-text-field
		                      label="Территория"
		                    ></v-text-field>
		                  </v-flex>

	                    <v-flex md4>
	                      <v-autocomplete
	                        label="По ОКВЭД"
	                        :no-data-text="noDataText"
	                      ></v-autocomplete>
	                    </v-flex>


											<v-flex md4>
											  <v-menu
											    ref="dateMenu05"
											    :close-on-content-click="false"
											    v-model="dateMenu05"
											    :nudge-right="40"
											    :return-value.sync="date05"
											    lazy
											    transition="scale-transition"
											    offset-y
											    full-width
											    min-width="290px"
											  >
											    <v-text-field
											      slot="activator"
											      v-model="date05"
											      label="Статус: Заключение от"
											      prepend-icon="event"
											      readonly
											    ></v-text-field>
											    <v-date-picker v-model="date05" no-title scrollable @input="$refs.dateMenu05.save(date05)" :first-day-of-week="1" locale="ru-ru">
											    </v-date-picker>
											  </v-menu>
											</v-flex>

		                  <v-flex md4>
		                    <v-text-field
		                      label="Статус: №"
		                    ></v-text-field>
		                  </v-flex>



		                </v-layout>
		            </v-container>

		            <v-card-actions>
		                <v-spacer></v-spacer>

		                <v-btn color="green darken-1" flat="flat" @click="editDialog = false">
		                    Отменить
		                </v-btn>

		                <v-btn color="green darken-1" flat="flat" @click="editDialog = false">
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
// import EmployersList from "Components/Widgets/Eais/Employers/EmployersList";
// import EmployerEdit from "Components/Widgets/Eais/Employers/EmployerEdit";
// import RecentOrders from "Components/Widgets/RecentOrders";

export default {
	props: ['oneItem'],
	data: () => ({
		switch1: false,
		editDialog: false,
		dateMenu01: false,
		dateMenu02: false,
		dateMenu03: false,
		dateMenu04: false,
		dateMenu05: false,
		date01: null,
		date02: null,
		date03: null,
		date04: null,
		date05: null,
		noDataText: 'Нет данных'
	}),
	computed: {

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
