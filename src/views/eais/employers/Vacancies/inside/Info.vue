<template>
	<div>
				<v-container fluid class="eais__readerform">
						<v-layout row wrap>

              <v-flex md3 py-1>
                <span class="body-1">Производная профессия:</span>
								<span class="subheading font-weight-medium">
									<span v-if="oneItem.data.pd_cod !== null">
										{{ sprDerivativePositions[sprDerivativePositions.findIndex(x => x.codeInGroup === oneItem.data.pd_cod)].shortName }}
									</span>
								</span>
              </v-flex>

              <v-flex md4 py-1>
                <span class="body-1">Сфера деятельности:</span>
								<span class="subheading font-weight-medium">
									<span v-if="oneItem.data.are_cod !== null">
										{{ sl_ares[sl_ares.findIndex(x => x.are_cod == oneItem.data.are_cod)].are_name }}
									</span>
								</span>
              </v-flex>

              <v-flex md4 py-1>
                <span class="body-1">Тарифный разряд, класс, категория:</span>
                <span class="subheading font-weight-medium">{{oneItem.data.prof_lev}}</span>
              </v-flex>

							<v-flex md12 my-0 py-1 class="body-1">
                  <v-divider></v-divider>
              </v-flex>

              <v-flex md3 py-1>
                <span class="body-1">Зарплата </span>
                <span class="subheading font-weight-medium">{{oneItem.data.salary}} <span v-if="oneItem.data.salary1">- {{oneItem.data.salary1}}</span></span>
              </v-flex>


              <v-flex md4 py-1>
                <span class="body-1">Форма оплаты:</span>
								<span class="subheading font-weight-medium">
									<span v-if="oneItem.data.salf_cod !== null">
										{{ sprFormSalarys[sprFormSalarys.findIndex(x => x.codeInGroup === oneItem.data.salf_cod)].fullName }}
									</span>
								</span>
              </v-flex>

              <v-flex md4 py-1>
                <span class="body-1">Специализация:</span>
                <span class="subheading font-weight-medium">{{oneItem.data.prof_spec}}</span>
              </v-flex>

							<v-flex md12 my-0 py-1 class="body-1">
                  <v-divider></v-divider>
              </v-flex>

              <v-flex md3 py-1>
                <span class="body-1">Рабочий день:</span>
                <span class="subheading font-weight-medium">{{oneItem.data.job_time}} часов</span>
              </v-flex>

              <v-flex md4 py-1>
                <span class="body-1">Режим работы:</span>
								<span class="subheading font-weight-medium">
									<span v-if="oneItem.data.jreg_cod !== null">
										{{ sprOperatingModes[sprOperatingModes.findIndex(x => x.codeInGroup === oneItem.data.jreg_cod)].fullName }}
									</span>
								</span>
              </v-flex>

              <v-flex md2 py-1>
                <span class="body-1">Характер работы:</span>
								<span class="subheading font-weight-medium">
									<span v-if="oneItem.data.jchar_cod !== null">
										{{ sprNatureWorks[sprNatureWorks.findIndex(x => x.codeInGroup === oneItem.data.jchar_cod)].fullName }}
									</span>
								</span>
              </v-flex>


              <v-flex md2 py-1>
                <span class="body-1 text-xs-right">Условия труда</span>
								<span class="subheading font-weight-medium text-xs-right">
									<span v-if="oneItem.data.jcond_cod !== null">
										{{ sprWorkConditions[sprWorkConditions.findIndex(x => x.codeInGroup === oneItem.data.jcond_cod)].fullName }}
									</span>
								</span>
              </v-flex>



              <v-flex md12 py-1>
                  <v-divider></v-divider>
              </v-flex>

              <v-flex md3 py-1>
                <span class="body-1">Тип вакансии</span>
                <span class="subheading font-weight-medium">
									<span v-if="oneItem.data.type_cod !== null">
										{{ sl_vactypes[sl_vactypes.findIndex(x => x.type_cod === oneItem.data.type_cod)].type_names }}
									</span>
								</span>
              </v-flex>

              <!-- <v-flex md6 py-1>
                <span class="body-1">Отрасль НХ: </span>
                <span class="subheading font-weight-medium">{{oneItem.data.test}}</span>
              </v-flex> -->

              <!-- <v-flex md12 py-1>
                  <v-divider></v-divider>
              </v-flex> -->

              <v-flex md2 py-1>
                <span class="body-1">Рабочих мест</span>
                <span class="subheading font-weight-medium">{{oneItem.data.start_free}}</span>
              </v-flex>

              <v-flex md2 py-1>
                <span class="body-1">Направлений</span>
                <span class="subheading font-weight-medium">{{oneItem.data.max_dir}}</span>
              </v-flex>

              <v-flex md2 py-1>
                <span class="body-1">Справок</span>
                <span class="subheading font-weight-medium">{{oneItem.data.max_spr}}</span>
              </v-flex>

							<v-flex md2 py-1>
								<span class="body-1 text-xs-right">Дата начала работ</span>
								<span class="subheading font-weight-medium text-xs-right">
									<span v-if="oneItem.data.beg_date !== null">{{ forTime(oneItem.data.beg_date) }}</span>
								</span>
							</v-flex>

              <v-flex md12 my-0 py-1 class="body-1">
                  <v-divider></v-divider>
              </v-flex>

              <v-flex md11 py-1>
                <span class="body-2" >Даты, связанные с вакансией</span>
              </v-flex>

              <v-flex md3 py-1>
                <span class="body-1">Дата ввода: </span>
								<span class="subheading font-weight-medium">
									<span v-if="oneItem.data.in_date !== null">{{ forTime(oneItem.data.in_date) }}</span>
								</span>
              </v-flex>

              <v-flex md2 py-1>
                <span class="body-1">Дата подтверждения:</span>
								<span class="subheading font-weight-medium">
									<span v-if="oneItem.data.inst_date !== null">{{ forTime(oneItem.data.inst_date) }}</span>
								</span>
              </v-flex>

              <v-flex md2 py-1>
                <span class="body-1">Дата закрытия:</span>

								<span class="subheading font-weight-medium">
									<span v-if="oneItem.data.end_date !== null">{{ forTime(oneItem.data.end_date) }}</span>
								</span>
              </v-flex>

              <v-flex md4 py-1>
                <span class="body-1">Причина закрытия:</span>
								<span class="subheading font-weight-medium">
									<span v-if="oneItem.data.psv_cod !== null">
										{{ sprPSVs[sprPSVs.findIndex(x => x.codeInGroup === oneItem.data.psv_cod)].fullName }}
									</span>
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
		            <v-card-title class="headline">Сведения о рабочем месте</v-card-title>

		            <v-container fluid grid-list-xl>
		                <v-layout row wrap>

		                  <v-flex md12 py-1 class="required">
												<v-autocomplete :rules="[fieldRules.required]"
													label="Профессия"
													:items="sl_profs"
													item-text="comboVal"
													item-value="prof_cod"
													v-model="oneItem.data.prof_cod"
													@input="toAreCode"
													:no-data-text="noDataText"
												></v-autocomplete>
		                  </v-flex>


		                  <v-flex md3 py-1>
												<v-autocomplete
													label="Производная профессия"
													:items="sprDerivativePositions"
													item-text="fullName"
													item-value="codeInGroup"
													v-model="oneItem.data.pd_cod"
													:no-data-text="noDataText"
												></v-autocomplete>
		                  </v-flex>

		                  <v-flex md3 py-1>
												<v-autocomplete
													label="Сфера деятельности" required
													:items="sl_ares"
													item-text="are_name"
													item-value="are_cod"
													v-model="oneItem.data.are_cod"
													:no-data-text="noDataText"
												></v-autocomplete>
		                  </v-flex>

		                  <v-flex md3 py-1>
		                    <v-text-field
													v-model="oneItem.data.prof_spec"
		                      label="Специализация"
		                    ></v-text-field>
		                  </v-flex>

		                  <v-flex md3 py-1 class="required">
												<v-autocomplete :rules="[fieldRules.required]"
													label="Форма оплаты" required
													:items="sprFormSalarys"
													item-text="fullName"
													item-value="codeInGroup"
													v-model="oneItem.data.salf_cod"
													:no-data-text="noDataText"
												></v-autocomplete>
		                  </v-flex>

		                  <v-flex md3 py-1 class="required">
		                    <v-text-field
												 type="number"
												 	min="1"
													v-model="oneItem.data.salary" required
													:rules="[rules.required]"
		                      label="Зарплата: от"
		                    ></v-text-field>
		                  </v-flex>

		                  <v-flex md3 py-1>
		                    <v-text-field
		                    	:min="oneItem.data.salary"
												 type="number"
													v-model="oneItem.data.salary1"
		                      label="до"
		                    ></v-text-field>
		                  </v-flex>

		                  <v-flex md6 py-1>
												<v-autocomplete
													label="Режим работы" required
													:items="sprOperatingModes"
													item-text="fullName"
													item-value="codeInGroup"
													v-model="oneItem.data.jreg_cod"
													:no-data-text="noDataText"
												></v-autocomplete>
		                  </v-flex>

		                  <v-flex md3 py-1>
		                    <v-text-field
												type="number"
												v-model="oneItem.data.job_time"
												label="Продолжительность рабочего дня, в часах"
												@input="toNum(oneItem.data.job_time)"
		                    ></v-text-field>
		                  </v-flex>


		                   <v-flex md3 py-1>
 												<v-autocomplete
 													label="Условия труда"
 													:items="sprWorkConditions"
 													item-text="fullName"
 													item-value="codeInGroup"
 													v-model="oneItem.data.jcond_cod"
 													:no-data-text="noDataText"
 												></v-autocomplete>
		                  </v-flex>

	                    <v-flex md4 py-1 class="required">
												<v-autocomplete :rules="[fieldRules.required]"
													label="Характер работы" required
													:items="sprNatureWorks"
													item-text="fullName"
													item-value="codeInGroup"
													v-model="oneItem.data.jchar_cod"
													:no-data-text="noDataText"
												></v-autocomplete>
		                  </v-flex>

		                  <v-flex md2 py-1>
		                   	 <v-text-field
 													v-model="oneItem.data.prof_lev"
		                      label="Тарифный разряд, класс, категория"
		                    ></v-text-field>
		                  </v-flex>

		                  <v-flex md3 py-1 class="required">
		                   	 <v-text-field :rules="[fieldRules.required]"
		                   	 	type="number"
 													v-model="oneItem.data.start_free"
		                      label="Рабочих мест" :readonly="!this.$store.state.eais.globalCreate" required
		                    ></v-text-field>
		                  </v-flex>

		                  <v-flex md3 py-1 class="required">
		                   	 <v-text-field :rules="[fieldRules.required]"
		                   	 	type="number"
 													v-model="oneItem.data.max_dir"
		                      label="Направлений" required
		                    ></v-text-field>
		                  </v-flex>

		                  <v-flex md3 py-1 class="required">
		                   	 <v-text-field :rules="[fieldRules.required]"
		                   	 	type="number"
 													v-model="oneItem.data.max_spr"
		                      label="Справок" required
		                    ></v-text-field>
		                  </v-flex>

		                  <v-flex md3 py-1>
		                  </v-flex>



		                  <v-flex md3 py-1>
												<date-picker label="Дата ввода вакансии" v-model="oneItem.data.in_date"></date-picker>
		                  </v-flex>

		                  <v-flex md3 py-1>
												<date-picker :min="oneItem.data.in_date" label="Дата подтверждения" v-model="oneItem.data.inst_date"></date-picker>
		                  </v-flex>

		                  <v-flex md3 py-1>
												<date-picker :min="oneItem.data.beg_date" label="Дата начала работ" v-model="oneItem.data.beg_date"></date-picker>
		                  </v-flex>

		                  <v-flex md3 py-1>
												<!-- <date-picker :min="oneItem.data.beg_date" label="по" v-model="oneItem.data.test"></date-picker> -->
		                  </v-flex>


		                  <v-flex md3 py-1>
												<!-- <date-picker :min="oneItem.data.inst_date" label="Дата закрытия вакансии" v-model="oneItem.data.end_date"></date-picker> -->
		                  </v-flex>

		                  <v-flex md9 py-1>
											 <!-- <v-autocomplete
												 label="Причина закрытия вакансии"
												 :items="sprPSVs"
												 item-text="fullName"
												 item-value="codeInGroup"
												 v-model="oneItem.data.psv_cod"
												 :no-data-text="noDataText"
											 ></v-autocomplete> -->
		                  </v-flex>


		                </v-layout>
		            </v-container>

								<v-card-actions>
		              <div class="ml-3">
		                <p class="requiredNote primary--text">	&mdash; обязательные поля</p>
		              </div>
		                <v-spacer></v-spacer>

		                <v-btn v-if="isNew" color="primary" flat="flat" @click="editNewDialog = false">
		                    Отменить
		                </v-btn>

		                <v-btn v-if="!isNew" :disabled="allFields" color="primary" flat="flat" @click="editNewDialog = false">
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
		isNew: false,
    noDataText: 'Нет данных',
		rules: {
        required: value => value > 1 || 'Не может быть меньше 1.',
				min: value => value > this.oneItem.data.salary || 'Не может быть меньше начального значения.',
			}
	}),
	mounted() {
		this.getContacts();
	},
	computed: {
    allFields() {
      if (this.oneItem.data.prof_cod !== null && this.oneItem.data.prof_cod !== undefined &&
        this.oneItem.data.salf_cod !== null && this.oneItem.data.salf_cod !== undefined &&
	      this.oneItem.data.jchar_cod !== null && this.oneItem.data.jchar_cod !== undefined &&
	      this.oneItem.data.salary && this.oneItem.data.start_free && this.oneItem.data.max_dir && this.oneItem.data.max_spr
      ) {
        return false;
      } else {return true}
    },
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
    }
	},
  components: {
  },
	methods: {
		getContacts() {
			console.log('getVacContacts');
			this.$store.dispatch('getVacContacts');
		},
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
