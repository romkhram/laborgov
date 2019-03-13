<template>
	<div>
				<v-container fluid class="eais__readerform">
						<v-layout row wrap>

							<v-flex md3 py-1>
								<span class="body-1">№</span>
								<span class="subheading font-weight-medium">{{oneItem.data.r}}</span>
							</v-flex>

							<v-flex md3 py-1>
								<span class="body-1">ЦЗН:</span>
								<span class="subheading font-weight-medium">
	                <span v-if="oneItem.data.cz_cod">{{ emplCenters[emplCenters.findIndex(x => x.emplCenterId === oneItem.data.cz_cod)].shortName }}</span>
	              </span>
							</v-flex>


							<v-flex md3 py-1>
								<span class="body-1">Телефон: </span>
								<span class="subheading font-weight-medium">{{oneItem.data.isptel}}</span>
							</v-flex>

							<v-flex md3 py-1>
								<span class="body-1">Списочная численность:</span>
								<span class="body-1">
						        <span class="subheading font-weight-medium">{{oneItem.data.k_all}}</span>
						        из них ИР:
						        <span class="subheading font-weight-medium">{{oneItem.data.k_alli}}</span>
						    </span>
							</v-flex>

							<v-flex md12 py-1>
								<v-divider></v-divider>
							</v-flex>

							<!-- <v-flex md2 py-1>
								<span class="body-1">Вид высвобождения:</span>
								<span class="subheading font-weight-medium">Массовое</span>
							</v-flex>


							<v-flex md3 py-1>
								<span class="body-1">Основание:</span>
								<span class="subheading font-weight-medium">Сокращение</span>
							</v-flex>

							<v-flex md3 py-1>
								<span class="body-1">Увольнение:</span>
								<span class="subheading font-weight-medium">Плановое</span>
							</v-flex> -->

							<!-- <v-flex md3 py-1>
								<span class="body-1">Период высвобождения:</span>
								<span class="body-1">С
						        <span class="subheading font-weight-medium"><span v-if="oneItem.data.date_beg !== null">С {{ forTime(oneItem.data.date_beg) }}</span></span>
						        по
						        <span class="subheading font-weight-medium"><span v-if="oneItem.data.date_end !== null"> по {{ forTime(oneItem.data.date_end) }}</span></span>
						    </span>
							</v-flex> -->

							<!-- <v-flex md11 mt-3 py-1> -->
							<!--  Рома! нужно автоматически добавить чипсину, заполненную в текстфилде при выборе "Иное", а саму чипсину "Иное не показывать"  -->
								<!-- <span class="body-1">Наличие факторов кризисного состояния: </span>
									<span class="subheading font-weight-medium">
										<v-chip small>Трудности с выплатой кредитов</v-chip>
										<v-chip small>Наличие антикризисного управляющего</v-chip>
										<v-chip small>Денег нет</v-chip>
									</span>
								</span>
							</v-flex> -->

							<!-- <v-flex md12 py-1>
								<v-divider></v-divider>
							</v-flex> -->


							<v-flex md11 py-1>
								<span class="body-2">Численность предполагаемых к увольнению</span>
							</v-flex>

							<v-flex md3 py-1>
								<span class="body-1">Сокращение:</span>
								<span class="subheading font-weight-medium">{{oneItem.data.k_v1}}</span>
							</v-flex>


							<v-flex md3 py-1>
								<span class="body-1">По инициативе работника:</span>
								<span class="subheading font-weight-medium">{{oneItem.data.k_v2}}</span>
							</v-flex>

							<v-flex md3 py-1>
								<span class="body-1">Соглашение: </span>
								<span class="subheading font-weight-medium">{{oneItem.data.k_v3}}</span>
							</v-flex>

							<v-flex md3 py-1>
								<span class="body-1">Всего: </span>
								<span class="body-1">
							        <span class="subheading font-weight-medium">{{oneItem.data.k_v}}</span>
							        из них ИР:
							        <span class="subheading font-weight-medium">{{oneItem.data.k_vi}}</span>, пенсионеров:
							        <span class="subheading font-weight-medium">{{oneItem.data.k_pens}}</span>
							    </span>
							</v-flex>

							<v-flex md12 py-1>
								<v-divider></v-divider>
							</v-flex>

							<v-flex md3 py-1>
								<span class="body-1">Основание высвобождения:</span>
								<span class="body-1"> Приказ №
											<span class="subheading font-weight-medium">{{oneItem.data.osn_doc}}</span>
											от
											<span class="subheading font-weight-medium">
												<span v-if="oneItem.data.osn_date !== null">{{ forTime(oneItem.data.osn_date) }}</span>
											</span>
									</span>
							</v-flex>

							<v-flex md3 py-1>
								<span class="body-1">Период высвобождения:</span>
								<span class="body-1">с
										<span class="subheading font-weight-medium"><span v-if="oneItem.data.date_beg !== null"> {{ forTime(oneItem.data.date_beg) }}</span></span>
										по
										<span class="subheading font-weight-medium"><span v-if="oneItem.data.date_end !== null"> {{ forTime(oneItem.data.date_end) }}</span></span>
								</span>
							</v-flex>

							<v-flex md3 py-1>
								<span class="body-1">Причина:</span>
								<span class="subheading font-weight-medium">{{oneItem.data.osn_prim}}</span>
							</v-flex>

							<v-flex md3 py-1>
								<span class="body-1">Примечание:</span>
								<span class="subheading font-weight-medium">{{oneItem.data.krizf5n}}</span>
							</v-flex>

							<v-flex md12 py-1>
								<v-divider></v-divider>
							</v-flex>

							<v-flex md3 py-1>
								<span class="body-1">Дата подачи уведомления: </span>
								<span class="subheading font-weight-medium">
									<span v-if="oneItem.data.in_date !== null">{{ forTime(oneItem.data.in_date) }}</span>
								</span>
							</v-flex>

							<v-flex md3 py-1>
								<span class="body-1">Снятие с учета: </span>
								<span class="subheading font-weight-medium">
									<span v-if="oneItem.data.end_date !== null">{{ forTime(oneItem.data.end_date) }}</span>
								</span>
							</v-flex>

							<v-flex md3 py-1>
								<span class="body-1">Несостоявшееся высвобождение:</span>
								<span class="subheading font-weight-medium">
									<span v-if="oneItem.data.n_date !== null">{{ forTime(oneItem.data.n_date) }}</span>
								</span>
							</v-flex>

							<v-flex md12 py-1>
								<v-divider></v-divider>
							</v-flex>

							<v-flex md11 py-1>
								<span class="body-2">Планируемые показатели</span>
							</v-flex>

							<v-flex md3 py-1>
								<span class="body-1">Всего будет трудоустроено:</span>
								<span class="body-1">
						        <span class="subheading font-weight-medium">{{oneItem.data.p_trud}}</span>
						        в т.ч. на данном предприятии:
						        <span class="subheading font-weight-medium">{{oneItem.data.p_trud_cl}}</span>
						    </span>
							</v-flex>

							<v-flex md3 py-1>
								<span class="body-1">Будет оформлена пенсия:</span>
								<span class="subheading font-weight-medium">{{oneItem.data.p_pens}}</span>
							</v-flex>

							<v-flex md3 py-1>
								<span class="body-1">Обратится в СЗ:</span>
								<span class="subheading font-weight-medium">{{oneItem.data.p_cz}}</span>
							</v-flex>

              <!-- <v-flex md3 py-1>
                <span class="body-1">Дата ввода: </span>
								<span class="subheading font-weight-medium">
									<span v-if="oneItem.data.in_date !== null">{{ forTime(oneItem.data.in_date) }}</span>
								</span>
              </v-flex> -->



							<v-flex md3 py-1>
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

											<v-flex md2 py-2>
												 <v-text-field
													type="number" :min="0"
													v-model="oneItem.data.r"
													label="№" readonly
												></v-text-field>
											</v-flex>

											<v-flex md4 class="required" py-2>
												<v-autocomplete :no-data-text="noDataText"
													:items="emplCenters"
													item-text="comboVal"
													item-value="emplCenterId"
													v-model="oneItem.data.cz_cod"
													label="АЗН"
												></v-autocomplete>
											</v-flex>

											<v-flex md2 py-2>
												 <v-text-field
													v-model="oneItem.data.isptel"
													label="Телефон" mask='# (###) ###-##-##'
												></v-text-field>
											</v-flex>

											<v-flex md2 class="required" py-2>
												 <v-text-field :rules="[fieldRules.required]"
													type="number" :min="0"
													v-model="oneItem.data.k_all"
													label="Всего занятых на предприятии"
												></v-text-field>
											</v-flex>

											<v-flex md2 class="required" py-2>
												 <v-text-field :rules="[fieldRules.required]"
													type="number" :min="0"
													v-model="oneItem.data.k_alli"
													label="в т.ч. ИР"
												></v-text-field>
											</v-flex>

											<v-flex md12 pt-3>
												<v-label>Численность предполагаемых к увольнению:</v-label>
											</v-flex>

											<v-flex md2 py-2>
												 <v-text-field
													type="number" :min="0"
													v-model="oneItem.data.k_v1"
													label="Сокращение"
												></v-text-field>
											</v-flex>

											<v-flex md2 py-2>
												 <v-text-field
													type="number" :min="0"
													v-model="oneItem.data.k_v2"
													label="По инициативе работника"
												></v-text-field>
											</v-flex>

											<v-flex md2 py-2>
												 <v-text-field
													type="number" :min="0"
													v-model="oneItem.data.k_v3"
													label="Соглашение"
												></v-text-field>
											</v-flex>

											<v-flex md2 py-2>
												 <v-text-field
													type="number" :min="0"
													v-model="oneItem.data.k_v"
													label="Всего"
												></v-text-field>
											</v-flex>

											<v-flex md2 py-2>
												 <v-text-field
													type="number" :min="0"
													v-model="oneItem.data.k_vi"
													label="из них ИР"
												></v-text-field>
											</v-flex>

											<v-flex md2 py-2>
												 <v-text-field
													type="number" :min="0"
													v-model="oneItem.data.k_pens"
													label="из них пенсионеров"
												></v-text-field>
											</v-flex>

											<v-flex md2 py-2>
												 <v-text-field
													type="number" :min="0"
													v-model="oneItem.data.osn_doc"
													label="Приказ №"
												></v-text-field>
											</v-flex>

											<v-flex md2 py-2>
												<date-picker label="от" v-model="oneItem.data.osn_date"></date-picker>
											</v-flex>

											<v-flex md2 py-2>

											</v-flex>

											<v-flex md2 py-2>
												<date-picker label="Период от" v-model="oneItem.data.date_beg"></date-picker>
											</v-flex>

											<v-flex md2 py-2>
												<date-picker :min="oneItem.data.date_beg" label="по" v-model="oneItem.data.date_end"></date-picker>
											</v-flex>

											<v-flex md6 py-2>
												 <v-text-field
													v-model="oneItem.data.osn_prim"
													label="Причина"
												></v-text-field>
											</v-flex>

											<v-flex md6 py-2>
												 <v-text-field
													v-model="oneItem.data.krizf5n"
													label="Примечание"
												></v-text-field>
											</v-flex>

											<v-flex md3 py-2>
												<date-picker label="Дата подачи уведомления" v-model="oneItem.data.in_date"></date-picker>
											</v-flex>

											<v-flex md3 py-2>
												<date-picker label="Снятие с учета" v-model="oneItem.data.end_date"></date-picker>
											</v-flex>

											<v-flex md3 py-2>
												<date-picker label="Несостоявшееся высвобождение" v-model="oneItem.data.n_date"></date-picker>
											</v-flex>

											<v-flex md3 py-2>
											</v-flex>

											<v-flex md3 py-2>
												 <v-text-field
													type="number" :min="0"
													v-model="oneItem.data.p_trud"
													label="Всего будет трудоустроено"
												></v-text-field>
											</v-flex>

											<v-flex md3 py-2>
												 <v-text-field
													type="number" :min="0"
													v-model="oneItem.data.p_trud_cl"
													label="на данном предприятии"
												></v-text-field>
											</v-flex>

											<v-flex md3 py-2>
												 <v-text-field
													type="number" :min="0"
													v-model="oneItem.data.p_pens"
													label="Будет оформлена пенсия"
												></v-text-field>
											</v-flex>

											<v-flex md3 py-2>
												 <v-text-field
													type="number" :min="0"
													v-model="oneItem.data.p_cz"
													label="Обратится в СЗ"
												></v-text-field>
											</v-flex>

											<!-- <v-flex md12 py-1 class="required">
												<v-autocomplete :rules="[fieldRules.required]"
													label="Профессия"
													:items="sl_profs"
													item-text="comboVal"
													item-value="prof_cod"
													v-model="oneItem.data.prof_cod"
													@input="toAreCode"
													:no-data-text="noDataText"
												></v-autocomplete>
											</v-flex> -->

											<!-- <v-flex md3 py-1 class="required">
												 <v-text-field :rules="[fieldRules.required]"
													type="number" :min="0"
													v-model="oneItem.data.max_spr"
													label="Справок" required
												></v-text-field>
											</v-flex> -->


											<!-- <v-flex md3>
												<date-picker :min="oneItem.data.inst_date" label="Дата закрытия вакансии" v-model="oneItem.data.end_date"></date-picker>
											</v-flex> -->


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
