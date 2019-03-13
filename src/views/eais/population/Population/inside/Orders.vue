<!-- Shopping Cart Widget -->
<template>
<div>
	<!-- <pre-loader v-if="!items"></pre-loader>  v-else -->
	<vue-perfect-scrollbar style="max-height:calc(100vh - 400px);" :settings="settings">
		<template>
			<v-card v-for="(item, index) in resultsItems" :key="item.index" class="eais__list mb-1 py-1">
				<v-container fluid py-3>
					<v-layout row wrap>


						<v-flex md2>
							<span class="body-1">
								<span v-if="item.data.date_beg">
                  {{forTime(item.data.date_beg)}}
                </span>
							</span>
						</v-flex>

						<!-- <v-flex md3>
							<span class="body-1">
								<span v-if="item.data.rez_det">
                    {{ sl_rezs.find(x => x.rez_cod === (resultValues[resultValues.findIndex(x => x.resultValueId === item.data.rez_det)].rez_cod) ).rez_name }}
                </span>
							</span>
						</v-flex> -->

						<v-flex md4>
							<span class="body-1">
								<span v-if="item.data.rk_cod">
                  {{ slRks.find(x => x.rk_cod === item.data.rk_cod).rk_name }}
                </span>
							</span>
						</v-flex>

						<v-flex md4>
							<span class="body-1">
								<span v-if="item.data.rk_osn">
                  {{ slRkOsns.find(x => x.rk_osn === item.data.rk_osn).osn_namel }}
                </span>
							</span>
						</v-flex>

						<v-flex md2 py-1>
							<div class="text-xs-right mrm-4">
								<v-btn class="ma-0" icon @click="editItem(item)">
									<v-icon color="primary">edit</v-icon>
								</v-btn>
								<!-- <v-btn class="ma-0" icon @click="openApprove(item, index)">
									<v-icon color="primary">delete</v-icon>
								</v-btn> -->

							</div>
						</v-flex>

					</v-layout>
				</v-container>
			</v-card>

		</template>
	</vue-perfect-scrollbar>

	<v-snackbar
		v-model="lessMonth.show"
		top
		right
		vertical
		:timeout='9000'
	>
		<p>{{lessMonth.txt}}</p>
		<v-btn flat @click="lessMonth.show = false">
			Закрыть
		</v-btn>
	</v-snackbar>

	<v-btn color="grey lighten-1" dark absolute bottom left fab small @click="beforeNew" style="margin-bottom: 31px;">
		<v-icon>add</v-icon>
	</v-btn>

	<v-dialog v-model="approve" max-width="600">
		<v-card class="pa-3">
			<v-card-title>
				<h3 class="ironthm-sec-title">Удалить, вы уверены?</h3>
			</v-card-title>
			<v-card-actions>
				<v-spacer></v-spacer>

				<v-btn color="primary" @click="approve = false">
					Нет
				</v-btn>

				<v-btn class="ml-3" color="primary" @click="deleteItem()">
					Да
				</v-btn>
			</v-card-actions>
		</v-card>
	</v-dialog>

	<v-dialog v-model="editNewDialog" max-width="1100">
		<v-card>
			<v-card-title class="headline">Приказ</v-card-title>

			<v-container fluid grid-list-xl>
				<v-layout row wrap>

					<!-- <v-flex md6>
						<v-autocomplete
             :no-data-text="noDataText"
             v-model="slRez"
             :items="sl_rezs"
             item-text="comboVal"
             item-value="rez_cod"
             label="Группа"
             clearable
            ></v-autocomplete>
					</v-flex> -->

					<v-flex md12 class="required">
						<v-autocomplete :rules="[fieldRules.required]"
             :no-data-text="noDataText"
             v-model="editedItem.rk_cod"
             :items="slRks"
             item-text="comboVal"
             item-value="rk_cod"
             label="Решение" @input="fillRez()"
             clearable
            ></v-autocomplete>
					</v-flex>

					<v-flex md9>
						<v-autocomplete
             no-data-text="У выбранного решения отсутствует основание"
             v-model="editedItem.rk_osn"
             :items="filterOsns"
             item-text="comboVal"
             item-value="rk_osn"
             label="Основание" @input="getComm()"
             clearable
            ></v-autocomplete>
					</v-flex>

          <v-flex md3 class="required">
            <date-picker :rules="[fieldRules.required]" label="Дата начала" v-model="editedItem.date_beg"></date-picker>
          </v-flex>

          <!-- <v-flex md6>
            <v-text-field type="number" v-model="editedItem.doc_num" label="Документ №"></v-text-field>
          </v-flex> -->

          <v-flex md12>
            <v-textarea v-model="editedItem.comm" label="Примечание"></v-textarea>
						<div style="font-size:14px">
							<p v-if="editedItem.rk_cod">{{ slRks.find(x => x.rk_cod === editedItem.rk_cod).comm }}</p>
							<p v-if="editedItem.rk_osn">{{ slRkOsns.find(x => x.rk_osn === editedItem.rk_osn).comm }}</p>
						</div>
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

				<v-btn v-if="isNew" color="primary" :disabled="cantSave" flat="flat" @click="createItemVal(items)">
					Создать
				</v-btn>

				<v-btn v-if="!isNew" color="primary" flat="flat" @click="editNewDialog = false">
					Продолжить
				</v-btn>
			</v-card-actions>
		</v-card>
	</v-dialog>

</div>
</template>

<script>
import Vue from 'vue'
import modification from "@/mixins/modification";
import rules from "@/mixins/rules";

export default {
	props: ['oneItem'],
  mixins: [modification, rules],
	data: () => ({
		lessMonth: {
			txt: 'Отказ в признании безработным менее месяца',
			show: false,
			save: false
		},
		className: 'rk_rez_ref',
		sortField: 'date_rez',
		slRez: null,
		rezVal: null,
	}),
	computed: {
		resultsItems() {
			var resultsItems = this.oneItem.linkedData['mpArr_' + this.className];
			var sortResults = resultsItems.sort((prev, next) => {
		    if ( prev.data.date_beg > next.data.date_beg ) return -1;
		    if ( prev.data.date_beg > next.data.date_beg ) return 1;
			});
			return sortResults;
		},
		// slOkveds () {
		// 	return this.$store.state.eais.stateHandbooks.sl_okveds;
		// }
    itemPattern() {
      var d = new Date();
      var dTrueFormat = d.toISOString().split('T')[0] + 'T21:00:00.000+0000';
      const itemPattern = {
        comm: " ",
        doc_num: null,
        rk_cod: null,
        rk_osn: null,
        creationDate: dTrueFormat,
        date_beg: dTrueFormat,
        plc_cod: this.oneItem.data.czu_cod,
        reg_num: this.oneItem.data.reg_num
      }
      return itemPattern;
    },
		cantSave() {
      if (this.editedItem.rk_cod && this.editedItem.date_beg) {
        return false;
      } else {
        return true;
      }
    },
		slRks() {
			return this.$store.state.eais.stateHandbooks.sl_rks;
		},
		slRkOsns() {
			return this.$store.state.eais.stateHandbooks.sl_rk_osns;
		},
		filterOsns() {
      var allOsns = this.$store.state.eais.stateHandbooks.sl_rk_osns;
			var rkCod = this.editedItem.rk_cod
			var filterOsns = allOsns.filter(function(el) {
				return el.rk_cod === rkCod;
			});
			return filterOsns.sort((prev, next) => prev.rk_osn - next.rk_osn);
		},

		sl_rezs() {
      var sl_rezs = this.$store.state.eais.stateHandbooks.sl_rezs;
			return sl_rezs.sort((prev, next) => prev.rez_cod - next.rez_cod)
		},
		resultValues() {
			return this.$store.state.eais.stateHandbooks.resultValues;
		},
		resultFilterValues() {
			var allRez = this.$store.state.eais.stateHandbooks.resultValues;
			var slRez = this.slRez
			var resVal = allRez.filter(function(el) {
				return el.rez_cod === slRez;
			});
			return resVal.sort((prev, next) => prev.resultValueId - next.resultValueId);
		},
		detailResults() {
			return this.$store.state.eais.stateHandbooks.detailResults;
		},
		detailFilterResults() {
      var allDetRez = this.$store.state.eais.stateHandbooks.detailResults;
			var rezVal = this.rezVal
			var resDetVal = allDetRez.filter(function(el) {
				return el.rez_det === rezVal;
			});
			return resDetVal.sort((prev, next) => prev.detailResultId - next.detailResultId);
		}
	},
  watch: {
  },
	methods: {
		getComm() {
			this.editedItem.comm = null;
			var comms = [];
			if (this.editedItem.rk_cod && this.slRks.find(x => x.rk_cod === this.editedItem.rk_cod).comm) {
				comms.push(this.slRks.find(x => x.rk_cod === this.editedItem.rk_cod).comm);
			}
			if (this.editedItem.rk_osn && this.slRkOsns.find(x => x.rk_osn === this.editedItem.rk_osn).comm) {
				comms.push(this.slRkOsns.find(x => x.rk_osn === this.editedItem.rk_osn).comm);
			}
			// console.log(comms);
			this.editedItem.comm = comms.join(`\n`);
		},
		lessMonthFunc() {
			this.lessMonth.show = false;
			const d = new Date();
			const parseD = Date.parse(d);
			const jobless = this.resultsItems.find(x => x.data.rk_cod === 100) && this.resultsItems.find(x => x.data.rk_cod === 100).data.date_beg;
			const parseJobless = Date.parse(jobless) + 2592000000;
			console.log(parseD, parseJobless);
			if (this.editedItem.rk_cod === 94 && parseD < parseJobless) {
				this.lessMonth.show = true;
				this.lessMonth.save = true;
			} else {
				this.lessMonth.save = false;
			}
		},
    fillRez() {
      // this.editedItem.rez_det = this.rezVal;
			this.lessMonthFunc();
			this.editedItem.rk_osn = null;
			this.getComm();
    },
    beforeEdit(){
      const resValObj = this.resultValues.find(x => x.resultValueId === this.editedItem.rez_det);
      console.log(resValObj);
      this.slRez = resValObj.rez_cod;
      this.rezVal = resValObj.resultValueId;
    },
    beforeNew() {
      this.slRez = null,
      this.rezVal = null,
      this.newItem();
    },
		extraFunk() {
      this.beforeEdit();
    }
	}
};
</script>
