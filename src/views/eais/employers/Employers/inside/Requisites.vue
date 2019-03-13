<template>
	<div>
		<v-container fluid class="eais__readerform">
				<v-layout row wrap>


						<v-flex md2 py-1>
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
								<span class="body-1">Свидетельство о внесении в ЕГР</span>
								<span class="body-1">
									<span class="subheading font-weight-medium">{{oneItem.data.ogrnNumber}}</span>
									<span v-if="oneItem.data.ogrnDate !== null"> от <span class="subheading font-weight-medium">{{ forTime(oneItem.data.ogrnDate) }}</span></span>
								</span>
						</v-flex>

						<v-flex md5 py-1>
								<span class="body-1">№свНИ</span>
								<span class="body-1">
									<span class="subheading font-weight-medium">{{oneItem.data.innDoc}}</span>
									<span v-if="oneItem.data.innDate !== null"> от <span class="subheading font-weight-medium">{{ forTime(oneItem.data.innDate) }}</span></span>
								</span>
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


		                  <!-- <v-flex md3>
		                    <v-select
		                      items="Организация"
		                      label="Тип предприятия"
		                    ></v-select>
		                  </v-flex> -->

		                  <v-flex md4>
		                    <v-text-field
													v-model="oneItem.data.ogrn"
		                      label="ОГРН"
		                      mask="#############"
		                    ></v-text-field>
		                  </v-flex>

		                  <v-flex md2>
		                    <v-text-field
													v-model="oneItem.data.inn"
		                      label="ИНН"
		                      readonly
		                    ></v-text-field>
		                  </v-flex>

		                  <v-flex md2>
		                    <v-text-field
													v-model="oneItem.data.kppInn"
		                      label="КПП"
		                      mask="#########"
		                    ></v-text-field>
		                  </v-flex>

		                  <v-flex md2>
		                    <v-text-field
													v-model="oneItem.data.okpo"
		                      label="ОКПО"
		                      mask="########"
		                    ></v-text-field>
		                  </v-flex>

		                  <v-flex md2>
		                    <v-text-field
													v-model="oneItem.data.soogu"
		                      label="ОКОГУ"
		                    ></v-text-field>
		                  </v-flex>

		                  <v-flex md3>
		                    <v-text-field
													v-model="oneItem.data.ogrnNumber"
		                      label="Свидетельство о внесении в ЕГР"
		                    ></v-text-field>
		                  </v-flex>

		                  <v-flex md2>
													<date-picker label="от" v-model="oneItem.data.ogrnDate"></date-picker>
		                  </v-flex>

		                  <v-flex md3 offset-md1>
		                    <v-text-field
													v-model="oneItem.data.innDoc"
		                      label="№свНИ"
		                    ></v-text-field>
		                  </v-flex>

		                  <v-flex md2>
												<date-picker label="от" v-model="oneItem.data.innDate"></date-picker>
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

export default {
	props: ['oneItem'],
  mixins: [editmain],
	data: () => ({
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

	},
  components: {
    // RecentOrders,
		// EmployersList,
		// EmployerEdit
  }
}

</script>
