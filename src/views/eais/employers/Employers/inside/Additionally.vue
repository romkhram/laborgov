<template>
	<div>
		<v-container fluid class="eais__readerform">
				<v-layout row wrap>


						<v-flex md3 py-1>
								<span class="body-1">Признак учета</span>
								<span class="subheading font-weight-medium">Не определен</span>
						</v-flex>

						<v-flex md8 py-1>
								<span class="body-1">Головное предприятие для системообразующих предприятий</span>
								<span class="subheading font-weight-medium">ГК Росатом</span>
						</v-flex>

						<v-flex md12 py-1>
								<v-divider></v-divider>
						</v-flex>

						<v-flex md3 py-1>
								<span class="body-1">Учебное заведение</span>
								<span class="subheading font-weight-medium">Да</span>
						</v-flex>

						<v-flex md8 py-1 v-if="switch1">
								<span class="body-1">Тип учебного заведения</span>
								<span class="subheading font-weight-medium">Высшее учебное заведение</span>
						</v-flex>

						<v-flex md3 py-1 mt-3 v-if="switch1">
								<span class="body-1">Номер лицензии</span>
								<span class="subheading font-weight-medium">12312312312312312</span>
						</v-flex>

						<v-flex md3 py-1 mt-3 v-if="switch1">
								<span class="body-1">Дата начала лицензии</span>
								<span class="subheading font-weight-medium">22.10.2018</span>
						</v-flex>
						<v-flex md3 py-1 mt-3 v-if="switch1">
								<span class="body-1">Дата окончания</span>
								<span class="subheading font-weight-medium">22.10.2018</span>
						</v-flex>

						<v-flex md12 py-1>
								<v-divider></v-divider>
						</v-flex>

						<v-flex md3 py-1>
								<span class="body-1">Исполнительный орган власти</span>
								<span class="subheading font-weight-medium">Да</span>
						</v-flex>

						<v-flex md8 py-1 v-if="switch2">
								<span class="body-1">Руководящий ИОГВ</span>
								<span class="subheading font-weight-medium">Комитет имущественных отношений Санкт-Петербурга</span>
						</v-flex>

						<v-flex md11 py-1 mt-3 v-if="switch2">
								<span class="body-1">Описание предприятия</span>
								<span class="subheading font-weight-medium"></span>
						</v-flex>

						<v-flex md8 py-1 v-if="!switch2">
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
		            <v-card-title class="headline">Реквизиты</v-card-title>

		            <v-container fluid grid-list-xl>
		                <v-layout row wrap>


											<v-flex md3>
												<v-autocomplete :no-data-text="noDataText" label="Признак учета"></v-autocomplete>
											</v-flex>

											<v-flex md9>
												<v-autocomplete :no-data-text="noDataText" label="Головное предприятие для системообразующих предприятий"></v-autocomplete>
											</v-flex>

											<v-flex md3>
		                  	<v-switch label="Учебное заведение" v-model="switch1"></v-switch>
											</v-flex>

											<v-flex md9 v-if="switch1">
												<v-autocomplete :no-data-text="noDataText" label="Тип учебного заведения"></v-autocomplete>
											</v-flex>

											<v-flex md3 v-if="switch1">
												<v-text-field label="Номер лицензии"></v-text-field>
											</v-flex>

											<v-flex md3 v-if="switch1">
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
	                          label="Дата начала лицензии"
	                          prepend-icon="event"
	                          readonly
	                        ></v-text-field>
	                        <v-date-picker v-model="date01" no-title scrollable @input="$refs.dateMenu01.save(date01)" :first-day-of-week="1" locale="ru-ru">
	                        </v-date-picker>
	                      </v-menu>
											</v-flex>

											<v-flex md3 v-if="switch1">
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
	                          label="Дата окончания"
	                          prepend-icon="event"
	                          readonly
	                        ></v-text-field>
	                        <v-date-picker v-model="date02" no-title scrollable @input="$refs.dateMenu02.save(date02)" :first-day-of-week="1" locale="ru-ru">
	                        </v-date-picker>
	                      </v-menu>
											</v-flex>

											<v-flex md3 v-if="switch1">
											</v-flex>

											<v-flex md9 v-if="switch2 && !switch1">
											</v-flex>

											<v-flex md3>
													<v-switch label="ИОГВ" v-model="switch2"></v-switch>
											</v-flex>

											<v-flex md9 v-if="switch2">
												<v-autocomplete :no-data-text="noDataText" label="Руководящий ИОГВ"></v-autocomplete>
											</v-flex>

											<v-flex md12 v-if="switch2">
	                      <v-textarea
	                        label="Описание предприятия"
	                      ></v-textarea>

											</v-flex>

		                </v-layout>
		            </v-container>

		            <v-card-actions>
		                <v-spacer></v-spacer>
		                <v-btn color="green darken-1" flat="flat" @click="editNewDialog = false">
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
import editmain from "@/mixins/editmain";

export default {
	props: ['emploer'],
  mixins: [editmain],
	data: () => ({
		switch1: false,
		switch2: false,
    noDataText: 'Нет данных',
		emplRequisites: false,
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
