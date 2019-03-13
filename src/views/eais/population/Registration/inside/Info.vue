<template>
	<div>
				<v-container fluid class="eais__readerform">
					<!-- {{persAsk}} -->
						<v-layout row wrap v-if="persAsk">

              <v-flex md3 py-1>
                <span class="body-1">Размер оплаты</span>
                <span class="subheading font-weight-medium">
									<span v-if="persAsk.data.salary !== null">
										{{persAsk.data.salary}}
									</span>
								</span>
              </v-flex>

              <v-flex md3 py-1>
                <span class="body-1">Характер работы:</span>
								<span class="subheading font-weight-medium">
									<span v-if="persAsk.data.jchar_cod !== null">
										{{ sprNatureWorks[sprNatureWorks.findIndex(x => x.codeInGroup === persAsk.data.jchar_cod)].fullName }}
									</span>
								</span>
              </v-flex>

              <v-flex md3 py-1>
                <span class="body-1">Форма оплаты:</span>
								<span class="subheading font-weight-medium">
									<span v-if="persAsk.data.salf_cod !== null">
										{{ sprFormSalarys[sprFormSalarys.findIndex(x => x.codeInGroup === persAsk.data.salf_cod)].fullName }}
									</span>
								</span>
              </v-flex>

              <v-flex md3 py-1>
                <span class="body-1">Режим работы:</span>
								<span class="subheading font-weight-medium">
									<span v-if="persAsk.data.jreg_cod !== null">
										{{ sprOperatingModes[sprOperatingModes.findIndex(x => x.codeInGroup === persAsk.data.jreg_cod)].fullName }}
									</span>
								</span>
              </v-flex>

							<v-flex md12 py-1>
								<v-divider></v-divider>
							</v-flex>

							<v-flex md6 py-1>
									<span class="body-1">Район</span>
									<span class="subheading font-weight-medium">
										<span v-if="persAsk.data.p_ra">{{ municipalityDivisions[municipalityDivisions.findIndex(x => x.cim === persAsk.data.p_ra)].txt }}</span>
									</span>
							</v-flex>

							<!-- <v-flex md3 py-1>
								<span class="body-1">Форма собственности</span>
								<span class="subheading font-weight-medium">
									<span v-if="persAsk.data.sbs_cod !== null && persAsk.data.sbs_cod !== undefined">
										{{ sprSBS[sprSBS.findIndex(x => x.codeInGroup === persAsk.data.sbs_cod)].shortName }}
									</span>
								</span>
								</span>
							</v-flex> -->

							<!-- <v-flex md3 py-1>
								<span class="body-1">Предприятие</span>
								<span class="subheading font-weight-medium">
									<span v-if="persAsk.data.c_client !== null">
										{{persAsk.data.c_client}}
									</span>
								</span>
							</v-flex> -->

							<!-- <v-flex md3 py-1>
								<span class="body-1">Публикация</span>
								<span class="subheading font-weight-medium"></span>
							</v-flex> -->

							<v-flex md12 py-1>
								<v-divider></v-divider>
							</v-flex>

							<v-flex md3 py-1>
								<span class="body-1">Дополнительные пожелания</span>
								<span class="subheading font-weight-medium">{{persAsk.data.comm}}</span>
							</v-flex>

							<v-flex md12 py-1>
								<v-divider></v-divider>
							</v-flex>

							<v-flex md11 py-1>
								<span class="body-1">Профессии в заявке</span>
									<span class="subheading font-weight-medium" style="white-space: normal;">
										<span v-if="this.askProfs[0] !== null" style="white-space: normal;">
											<v-chip small v-for="(item, index) in askProfs" :key="item.index">
												{{item}} {{ sl_profs[sl_profs.findIndex(x => x.prof_cod === item)].prof_name }}
											</v-chip>
										</span>
									</span>
								</span>
							</v-flex>

								<v-flex md1 py-1>
										<div class="text-xs-right mrm-4">
												<v-btn class="ma-0" icon @click="editDialog()">
														<v-icon color="primary">edit</v-icon>
												</v-btn>
										</div>
								</v-flex>

						</v-layout>
				</v-container>

        <v-dialog v-model="editNewDialog" max-width="1100">
		        <v-card>
		            <v-card-title class="headline">Заявка на трудоустройство</v-card-title>

		            <v-container fluid grid-list-xl>
		                <v-layout row wrap>


											<v-flex md3 py-1>
												<v-text-field
												 type="number"
													v-model="persAsk.data.salary" required
													label="Зарплата"
												></v-text-field>
											</v-flex>

	                    <v-flex md3 py-1>
												<v-autocomplete clearable
													label="Характер работы" required
													:items="sprNatureWorks"
													item-text="fullName"
													item-value="codeInGroup"
													v-model="persAsk.data.jchar_cod"
													:no-data-text="noDataText"
												></v-autocomplete>
		                  </v-flex>

		                  <v-flex md3 py-1>
												<v-autocomplete clearable
													label="Форма оплаты" required
													:items="sprFormSalarys"
													item-text="fullName"
													item-value="codeInGroup"
													v-model="persAsk.data.salf_cod"
													:no-data-text="noDataText"
												></v-autocomplete>
		                  </v-flex>

		                  <v-flex md3 py-1>
												<v-autocomplete clearable
													label="Режим работы" required
													:items="sprOperatingModes"
													item-text="fullName"
													item-value="codeInGroup"
													v-model="persAsk.data.jreg_cod"
													:no-data-text="noDataText"
												></v-autocomplete>
		                  </v-flex>

											<v-flex md12>
		                    <v-autocomplete clearable
													:items="municipalityDivisions"
            							item-text="comboVal"
            							item-value="cim"
		                    	v-model="persAsk.data.p_ra"
		                      label="Район"
		                    ></v-autocomplete>
		                  </v-flex>

		                  <!-- <v-flex md3>
		                    <v-autocomplete clearable
													:items="sprSBS"
            							item-text="comboVal"
            							item-value="codeInGroup"
		                    	v-model="persAsk.data.sbs_cod"
		                      label="Форма собственности"
		                    ></v-autocomplete>
		                  </v-flex>

											<v-flex md12 py-1>
	                      <v-autocomplete clearable
	                        label="ID и Наименование организации"
	                        :items="serverHandbook"
	                        item-text="comboVal"
	                        item-value="companyId"
	                        v-model="persAsk.data.c_client"
	                        :no-data-text="noDataText"
	                        append-outer-icon="search"
	                        :search-input.sync="empSearch"
	                        @click:append-outer="letSearch"
	                        @keyup.enter="letSearch"
	                        :disabled="serverHandDis"
	                        :loading="serverHandDis"
	                      ></v-autocomplete>
	                    </v-flex> -->

											<v-flex md12>
												<v-text-field
													v-model="persAsk.data.comm"
													label="Дополнительные пожелания"
												></v-text-field>
											</v-flex>


											<v-flex md12 py-1>
												<v-autocomplete clearable
													class="profession"
													@input="conslog"
													label="Профессия"
													v-model="askProfs"
													:items="sl_profs"
													item-text="comboVal"
													chips deletable-chips small-chips
													multiple
													item-value="prof_cod"
												></v-autocomplete>
											</v-flex>


		                </v-layout>
		            </v-container>

								<v-card-actions>
		                <v-spacer></v-spacer>
		                <v-btn color="primary" flat="flat" @click="editNewDialog = false">
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
.profession .v-select__selections {height:auto; flex-wrap:wrap;}
</style>

<script>
import Vue from 'vue';
import editmain from "@/mixins/editmain";
import profSearch from "@/mixins/profSearch";
export default {
	props: ['oneItem'],
  mixins: [editmain, profSearch],
	mounted() {
		// if (this.oneItem.data.prof_cod !== null) {
		// 	this.askDefProfs = [this.oneItem.data.prof_cod];
		// }
		this.fullAsk();
		this.askProfs = JSON.parse(JSON.stringify(this.askDefProfs));
	},
	data: () => ({
		askDefProfs: [],
		askProfs: [],
    noDataText: 'Нет данных',
		emplCenterId: null,
	}),
	// beforeMount() {
	// 	if (this.oneItem.linkedData.mpArr_pers_ask_ref[0].data.c_client !== null) {
	// 		this.empSearch = this.oneItem.linkedData.mpArr_pers_ask_ref[0].data.c_client;
	// 		this.letSearch();
	// 	}
	// },
							// mounted() {
							// 	if (this.oneItem.data.prof_cod !== null) {
							// 		this.askDefProfs = [this.oneItem.data.prof_cod];
							// 	}
							// 	this.fullAsk();
							// 	this.askProfs = JSON.parse(JSON.stringify(this.askDefProfs));
							// 	console.log('askProfs');
							// 	console.log(this.askProfs);
							// 	if (this.askProfs[0] === null) {
							// 		console.log('this.askProfs[0] === null');
							// 	}
							// },
	computed: {
		persAsk() {
			if (this.oneItem.linkedData.mpArr_pers_ask_ref.length > 0) {
				return this.oneItem.linkedData.mpArr_pers_ask_ref[0];
			} else {
				console.log('Нет заявки - создаем');
				var persAskNull = {
					classCode: "pers_ask",
					data: {
						c_client: null,
						comm: null,
						inter_1: null,
						inter_2: null,
						inter_3: null,
						inter_4: null,
						inter_p: null,
						inter_v: null,
						inter_yn: null,
						jchar_cod: null,
						jreg_cod: null,
						p_ra: null,
						prizpall: null,
						salary: null,
						salf_cod: null,
						sbs_cod: null,
						tr_date: null,
						tr_lg1: null,
						tr_lg2: null,
						tr_lg3: null
					}
				}
				this.oneItem.linkedData.mpArr_pers_ask_ref.push(persAskNull)
				return this.oneItem.linkedData.mpArr_pers_ask_ref[0];
			}
		},
		// askProfs() {
		// 	var askProfs = [this.oneItem.data.prof_cod];
		// 	this.oneItem.linkedData.mpArr_pers_prof_ref.forEach(function(element) {
		// 		askProfs.push(element.data.prof_cod);
		// 	});
		// 	console.log('askProfs');
		// 	console.log(askProfs);
		// 	return askProfs;
		// },
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
			// const profs = this.$store.state.eais.stateHandbooks.sl_profs;
			// const newProfs = results.filter(ar => ar.prof_old !== 1);
			// return newProfs;
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
		sprSBS() {
      return this.$store.state.eais.stateHandbooks.sprSBS;
		},
		municipalityDivisions() {
			const areas = this.$store.state.eais.stateHandbooks.municipalityDivisions;
			const newAreas = areas.filter(ar => ar.cim_parent === '402600000');
      return newAreas;
		},
		// select server search
	    // serverHandDis() {
	    //   return this.$store.state.eais.serverHandbook.disabled;
	    //   // return true
	    // },
	    // serverHandbook() {
			// 	return this.$store.state.eais.serverHandbook.data;
			// },
			// forSearch() {
			// 	var searchFields =  {
			// 		"offset": 0,
			// 		"limit": 99999,
			// 		"filter": {
			// 			"or": [
			// 				{
			// 					"cond": {
			// 						"attr": "companyId",
			// 						"eq": Number(this.empSearch)
			// 					}
			// 				},
			// 				{
			// 					"cond": {
			// 						"attr": "longName",
			// 						"like": this.empSearch
			// 					}
			// 				}
			// 			]
			// 		},
			// 		"orders": [
			// 			{"asc":"longName"}
			// 		]
			// 	}
			// 	if (this.empSearch.length > 0) {
			// 		return searchFields;
			// 	}
			// }
		// select server search end
	},
  components: {
  },
	methods: {
		conslog() {
			var that = this;
			var askProfs = this.askProfs;
			var askDefProfs = this.askDefProfs;
			this.oneItem.linkedData.pers_ask_plist_ref.create = [];
			this.oneItem.linkedData.pers_ask_plist_ref.delete = [];

			this.askProfs.forEach(function(element) {
				if(askDefProfs.includes(element) === false) {
					var toPush = {
						"classCode": "pers_ask_plist",
						"data": {
							"prof_cod": element,
							"reg_num": that.oneItem.id
						}
					}
					that.oneItem.linkedData.pers_ask_plist_ref.create.push(toPush);
				}
			});
			this.askDefProfs.forEach(function(element) {
				if(askProfs.includes(element) === false) {
					var toDel = that.oneItem.linkedData.mpArr_pers_ask_plist_ref.find(x => x.data.prof_cod === element);
					that.oneItem.linkedData.pers_ask_plist_ref.delete.push(toDel);
				}
			});
		}
	}
}

</script>
