<template>
	<div>
				<v-container fluid class="eais__readerform">
						<v-layout row wrap>

							<v-flex md3 py-1>
									<span class="body-1">Запрос получен</span>
									<span class="subheading font-weight-medium">{{ forTime(oneItem.data.pol_date) }}</span>
							</v-flex>

							<v-flex md3 py-1>
									<span class="body-1">Запрос от</span>
									<span class="subheading font-weight-medium">{{ forTime(oneItem.data.in_date) }}</span>
							</v-flex>

							<v-flex md3 py-1>
									<span class="body-1">Год</span>
									<span class="subheading font-weight-medium">{{oneItem.data.year}}</span>
							</v-flex>

							<v-flex md3 py-1>
									<span class="body-1">№ запроса</span>
									<span class="subheading font-weight-medium">{{oneItem.data.in_num}}</span>
							</v-flex>

							<!-- <v-flex md4 py-1>
									<span class="body-1">МФС</span>
									<span class="subheading font-weight-medium">{{oneItem.data.in_cod}}</span>
							</v-flex> -->

								<v-flex md12 py-1>
										<v-divider></v-divider>
								</v-flex>

								<v-flex md4 py-1>
									<span class="body-1">Штатная численность работников</span>
										<span class="body-1">
											<span class="subheading font-weight-medium">{{oneItem.data.k_all}}</span>
											в т.ч. иностранных граждан:
											<span class="subheading font-weight-medium">{{oneItem.data.k_ir}}</span>
										</span>
								</v-flex>

								<v-flex md4 py-1>
									<span class="body-1">Обращался в</span>
									<span class="subheading font-weight-medium">
										<span v-if="oneItem.data.emplCenterId !== null">{{ emplCenters.find(x => x.emplCenterId === oneItem.data.kzn_org).shortName }}</span>
									</span>
								</v-flex>

								<v-flex md12 py-1>
										<v-divider></v-divider>
								</v-flex>

								<v-flex md4 py-1>
									<span class="body-1">Дата обращения</span>
									<span class="subheading font-weight-medium">{{ forTime(oneItem.data.kzn_date) }}</span>
								</v-flex>

								<v-flex md4 py-1>
									<span class="body-1">№ обращения</span>
									<span class="subheading font-weight-medium">{{oneItem.data.kzn_num}}</span>
								</v-flex>

								<v-flex md4 py-1>
									<span class="body-1">Территория</span>
									<span class="subheading font-weight-medium">{{oneItem.data.comm}}</span>
								</v-flex>

								<v-flex md12 py-1>
										<v-divider></v-divider>
								</v-flex>

								<v-flex md12 py-1>
									<span class="body-1">по ОКВЭД</span>
									<span class="subheading font-weight-medium">
										<span v-if="oneItem.data.shifr">{{oneItem.data.shifr}}: {{ slOkveds[slOkveds.findIndex(x => x.shifr === oneItem.data.shifr)].name }}</span>
									</span>
								</v-flex>

								<v-flex md12 py-1>
										<v-divider></v-divider>
								</v-flex>

								<v-flex md2 py-1>
									<span class="body-1">Статус: Заключение №</span>
									<span class="subheading font-weight-medium">{{oneItem.data.out_num}}</span>
								</v-flex>

								<v-flex md9 py-1>
									<span class="body-1">от</span>
									<span class="subheading font-weight-medium">{{ forTime(oneItem.data.out_date) }}</span>
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
												<date-picker label="Запрос получен" v-model="oneItem.data.pol_date"></date-picker>
		                  </v-flex>

											<v-flex md3>
												<date-picker label="Запрос от" v-model="oneItem.data.in_date"></date-picker>
		                  </v-flex>

											<v-flex md3>
												<v-text-field
													mask="####"
													v-model="oneItem.data.year"
													label="Год"
												></v-text-field>
											</v-flex>

											<v-flex md3>
												<v-text-field
													type="number"
													min="1"
													v-model="oneItem.data.in_num"
													label="№ запроса"
												></v-text-field>
											</v-flex>

											<v-flex md3>
												<v-text-field
													type="number"
													min="1"
													v-model="oneItem.data.k_all"
													label="Штатная численность работников"
												></v-text-field>
											</v-flex>

											<v-flex md3>
												<v-text-field
													type="number"
													:max="oneItem.data.k_all"
													v-model="oneItem.data.k_ir"
													label="в т.ч. иностранных граждан"
												></v-text-field>
											</v-flex>

											<v-flex md6>
												<v-autocomplete
												 :no-data-text="noDataText"
													:items="emplCenters"
													item-text="comboVal"
													item-value="emplCenterId"
													v-model="oneItem.data.kzn_org"
													label="ЦЗН"
												></v-autocomplete>
											</v-flex>



											<v-flex md3>
												<date-picker label="Дата обращения" v-model="oneItem.data.kzn_date"></date-picker>
		                  </v-flex>

											<v-flex md3>
												<v-text-field
													v-model="oneItem.data.kzn_num"
													label="№ обращения"
												></v-text-field>
											</v-flex>

											<v-flex md6>
												<v-text-field
													v-model="oneItem.data.comm"
													label="Территория"
												></v-text-field>
											</v-flex>

											<v-flex md12>
												<v-autocomplete
												 :no-data-text="noDataText"
												v-model="oneItem.data.shifr"
												:items="slOkveds"
												item-text="comboVal"
												item-value="shifr"
												label="По ОКВЭД"
												></v-autocomplete>
											</v-flex>

											<v-flex md3>
												<v-text-field
													v-model="oneItem.data.out_num"
													label="Статус: Заключение №"
												></v-text-field>
											</v-flex>

											<v-flex md3>
												<date-picker label="от" v-model="oneItem.data.out_date"></date-picker>
											</v-flex>

											<!-- <v-flex md12 class="required">
												<v-autocomplete
													:rules="[fieldRules.required]"
												 :no-data-text="noDataText"
												v-model="editedItem.code"
												:items="slOkveds"
												item-text="name"
												item-value="shifr"
												label="Расшифровка"
												></v-autocomplete>
											</v-flex> -->

		                </v-layout>
		            </v-container>

								<v-card-actions>
		                <v-spacer></v-spacer>

		                <!-- <v-btn v-if="isNew" color="primary" flat="flat" @click="editNewDialog = false">
		                    Отменить
		                </v-btn> -->

		                <v-btn color="primary" flat="flat" @click="editNewDialog = false">
		                    Продолжить
		                </v-btn>

		                <!-- <v-btn v-if="isNew" color="primary" flat="flat" @click="createItemVal(items, 'contacts')">
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
import rules from "@/mixins/rules";
export default {
	props: ['oneItem'],
  mixins: [editmain, rules],
	data: () => ({
    noDataText: 'Нет данных',
		rules: {
        required: value => value > 1 || 'Не может быть меньше 1.',
				min: value => value > this.oneItem.data.salary || 'Не может быть меньше начального значения.',
			}
	}),
	mounted() {

	},
	computed: {
		sprFormSalarys() {
			return this.$store.state.eais.stateHandbooks.sprFormSalarys;
		},
		sl_ares() {
			return this.$store.state.eais.stateHandbooks.sl_ares;
		},
		sprDerivativePositions() {
			return this.$store.state.eais.stateHandbooks.sprDerivativePositions;
		},
		emplCenters() {
      return this.$store.state.eais.stateHandbooks.emplCenters;
    },
    sl_profs() {
      return this.$store.state.eais.stateHandbooks.sl_profs;
    },
    sprOperatingModes() {
      return this.$store.state.eais.stateHandbooks.sprOperatingModes;
    },
    sprNatureWorks() {
      return this.$store.state.eais.stateHandbooks.sprNatureWorks;
    },
    sprWorkConditions() {
      return this.$store.state.eais.stateHandbooks.sprWorkConditions;
    },
    sprPSVs() {
      return this.$store.state.eais.stateHandbooks.sprPSVs;
    },
    sl_vactypes() {
      return this.$store.state.eais.stateHandbooks.sl_vactypes.sort((prev, next) => prev.type_cod - next.type_cod);
    },
		slOkveds () {
			return this.$store.state.eais.stateHandbooks.sl_okveds;
		}
	},
  components: {
  },
	methods: {
		toNum(val){
		console.log(val);
			val = Number(val);
			console.log(val);
			console.log(this.oneItem.data);
		},
		toAreCode() {
			const areCode = this.sl_profs[this.sl_profs.findIndex(x => x.prof_cod === this.oneItem.data.prof_cod)].are_cod;
			console.log(areCode);
			if (areCode !== 0) {
				this.oneItem.data.are_cod = areCode;
			}
		}
	}
}

</script>
