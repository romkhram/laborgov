<template>
	<div>
				<v-container fluid class="eais__readerform">
						<v-layout row wrap>

              <v-flex md7 py-1>
                <span class="body-1">Контактное лицо предприятия</span>
                <span class="subheading font-weight-medium">{{oneItem.data.test}}</span>
              </v-flex>

              <v-flex md4 py-1>
                <span class="body-1">Дополнительные телефоны:</span>
                <span class="subheading font-weight-medium">{{oneItem.data.test}}</span>
              </v-flex>

              <v-flex md12 py-1>
                  <v-divider></v-divider>
              </v-flex>


              <v-flex md11 py-1>
                <span class="body-1">Адрес собеседования: </span>
                <span class="subheading font-weight-medium">{{oneItem.data.test}}</span>
              </v-flex>

              <v-flex md11 py-1 mt-3>
                <span class="body-1">Проезд: </span>
                <span class="subheading font-weight-medium">{{oneItem.data.test}}</span>
              </v-flex>


              <v-flex md12 py-1>
                  <v-divider></v-divider>
              </v-flex>

              <v-flex md4 py-1>
                <span class="body-1">Тип вакансии:</span>
                <span class="subheading font-weight-medium">{{oneItem.data.test}}</span>
              </v-flex>


              <v-flex md3 py-1>
                <span class="body-1">Программа развития:</span>
                <span class="subheading font-weight-medium">{{oneItem.data.test}}</span>
              </v-flex>

              <v-flex md3 py-1>
                <span class="body-1">Специальное РМ:</span>
                <span class="subheading font-weight-medium">{{oneItem.data.test}}</span>
              </v-flex>

              <v-flex md1 py-1>
                <span class="body-1">Степень ограничения: </span>
                <span class="subheading font-weight-medium">{{oneItem.data.test}}</span>
              </v-flex>

              <v-flex md12 py-1>
                  <v-divider></v-divider>
              </v-flex>


              <v-flex md4 py-1>
                <span class="body-1">Прием по результатам конкурса:</span>
                <span class="subheading font-weight-medium">{{oneItem.data.test}}</span>
              </v-flex>

              <v-flex md3 py-1>
                <span class="body-1">Форма объявления:</span>
                <span class="subheading font-weight-medium">{{oneItem.data.test}}</span>
              </v-flex>


              <v-flex md4 py-1>
                <span class="body-1">Привлечение ИРС:</span>
                <span class="subheading font-weight-medium">{{oneItem.data.test}}</span>
              </v-flex>

              <v-flex md4 py-1>
                <span class="body-1">Вакансия принята по: </span>
                <span class="subheading font-weight-medium">{{oneItem.data.test}}</span>
              </v-flex>

              <v-flex md12 py-1>
                  <v-divider></v-divider>
              </v-flex>

              <v-flex md4 py-1>
                <span class="body-1">Публиковать в интернет: </span>
                <span class="subheading font-weight-medium">{{oneItem.data.test}}</span>
              </v-flex>

              <v-flex md3 py-1>
                <span class="body-1">Отображать предприятие: </span>
                <span class="subheading font-weight-medium">{{oneItem.data.test}}</span>
              </v-flex>

              <v-flex md4 py-1>
                <span class="body-1">Правила публикации:</span>
                <span class="subheading font-weight-medium">{{oneItem.data.test}}</span>
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
		            <v-card-title class="headline">Сведения о вакансии</v-card-title>

		            <v-container fluid grid-list-xl>
		                <v-layout row wrap>

		                  <v-flex md6  py-1>
		                    <v-autocomplete
		                      :no-data-text="noDataText"
		                      label="Контактное лицо предприятия"
													:items="vacContacts"
	          							item-text="comboVal"
	          							item-value="contactId"
		                    	v-model="oneItem.data.c_contact"

		                    ></v-autocomplete>
		                  </v-flex>

		                  <v-flex md3 py-1>
							          <v-text-field
							            label="Дополнительные телефоны"
							          ></v-text-field>
		                  </v-flex>

		                  <v-flex md3 py-1>
		                    <v-select
												:no-data-text="noDataText"
		                      label="Район"
		                    ></v-select>
		                  </v-flex>



		                  <v-flex md6 py-1>
					          <v-text-field
					            label="Адрес собеседования"
					          ></v-text-field>
					        </v-flex>

		                  <v-flex md6 py-1>
					          <v-text-field
					            label="Как добраться до места собеседования"
					          ></v-text-field>
					        </v-flex>


		                  <v-flex md6  py-1>
		                    <v-autocomplete
		                      :no-data-text="noDataText"
		                      label="Административный район МО"
		                    ></v-autocomplete>
		                  </v-flex>

		                   <v-flex md6  py-1>
		                    <v-autocomplete
		                      :no-data-text="noDataText"
		                      label="Муниципальное образование по ОКТМО"
		                    ></v-autocomplete>
		                  </v-flex>



		                  <v-flex md6  py-1>
		                    <v-select
												:no-data-text="noDataText"
		                      label="Тип вакансии"
		                    ></v-select>
		                  </v-flex>

		                  <v-flex md6  py-1>
		                    <v-select
												:no-data-text="noDataText"
		                    label="Программа развития"
		                    ></v-select>
		                  </v-flex>

		                  <v-flex md8  py-1>
		                    <v-select
												:no-data-text="noDataText"
		                      label="Специальное РМ"
		                    ></v-select>
		                  </v-flex>

		                  <v-flex md4  py-1>
		                    <v-select
												:no-data-text="noDataText"
		                      label="Степень ограничения"
		                    ></v-select>
		                  </v-flex>

		                      <v-flex md3  py-1>
		                    <v-select
												:no-data-text="noDataText"
		                      label="Форма объявления"
		                    ></v-select>
		                  </v-flex>


		                  <v-flex md5  py-1>
		                    <v-select
												:no-data-text="noDataText"
		                      label="Возможность привлечения иностранной рабочей силы"
		                    ></v-select>

		                  </v-flex>
		                  <v-flex md4 py-1>
		                   <v-switch
		                    label="Прием по результатам конкурса"
		                    ></v-switch>
		                  </v-flex>


		                  <v-flex md6 py-1>
		                    <v-select
												:no-data-text="noDataText"
		                      label="Вакансия принята по"
		                    ></v-select>
		                  </v-flex>

		                  <v-flex md6 py-1>
				            <v-select
											:no-data-text="noDataText"
				              label="Правила публикации"
				            ></v-select>
				           </v-flex>

		                  <v-flex md6 py-1>
		                    <v-switch label="Опубликовать на Портале"></v-switch>
		                  </v-flex>

		                   <v-flex md6 py-1>
		                    <v-switch label="Отображать предприятие при публикации"></v-switch>
		                  </v-flex>


		                </v-layout>
		            </v-container>


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




// oneItem.data.people
// oneItem.data.foreigner

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
		date04: null,
    noDataText: 'Нет данных',
	}),
	mounted() {
		this.getContacts();
	},
	computed: {
		EmplCenters() {
			return this.$store.state.eais.stateHandbooks.emplCenters;
		},
		vacContacts() {
			console.log('in Vac');
			console.log(this.$store.state.extranotes.extraHandbooks.vacContacts);
			return this.$store.state.extranotes.extraHandbooks.vacContacts;
		}
	},
  components: {
  },
	methods: {
		getContacts() {	
			this.$store.dispatch('getVacContacts');
		},
		noMore(val1, val2) {
			if (val1 > val2) {
				this.oneItem.data.foreigner = val2;
			}
		},
		getEmplCenters() {
			this.$store.dispatch('getEmplCenters');
		},
		returnId() {
			console.log(this.oneItem.data.emplCenterId);
		}
	}
}

</script>
