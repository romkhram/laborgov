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
								<span v-if="item.data.date_rez">
                  {{forTime(item.data.date_rez)}}
                </span>
							</span>
						</v-flex>

						<v-flex md3>
							<span class="body-1">
								<span v-if="item.data.rez_det">
                    {{ sl_rezs.find(x => x.rez_cod === (resultValues[resultValues.findIndex(x => x.resultValueId === item.data.rez_det)].rez_cod) ).rez_name }}
                </span>
							</span>
						</v-flex>

						<v-flex md3>
							<span class="body-1">
								<span v-if="item.data.rez_det">
                  {{ resultValues.find(x => x.resultValueId === item.data.rez_det).rez_name }}
                </span>
							</span>
						</v-flex>

						<v-flex md3>
							<span class="body-1">
								<span v-if="item.data.rez_osn">
                  {{ detailResults.find(x => x.detailResultId === item.data.rez_osn).rez_name }}
                </span>
							</span>
						</v-flex>

						<v-flex md1 py-1>
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
			<v-card-title class="headline">Результат</v-card-title>

			<v-container fluid grid-list-xl>
				<v-layout row wrap>

					<v-flex md6 class="required">
						<v-autocomplete :rules="[fieldRules.required]"
             :no-data-text="noDataText"
             v-model="slRez"
             :items="sl_rezs"
             item-text="comboVal"
             item-value="rez_cod"
             label="Группа"
             clearable
            ></v-autocomplete>
					</v-flex>

					<v-flex md6 class="required">
						<v-autocomplete :rules="[fieldRules.required]"
             :no-data-text="noDataText"
             v-model="rezVal"
             :items="resultFilterValues"
             item-text="comboVal"
             item-value="resultValueId"
             label="Результат" @input="fillRez()"
             clearable
            ></v-autocomplete>
					</v-flex>

					<v-flex md9>
						<v-autocomplete
             no-data-text="У выбранного результата отсутствует значение причины"
             v-model="editedItem.rez_osn"
             :items="detailFilterResults"
             item-text="comboVal"
             item-value="detailResultId"
             label="Причина, основание" @input="getCommz()"
             clearable
            ></v-autocomplete>
					</v-flex>

          <v-flex md3 class="required">
            <date-picker label="Дата результата" :rules="[fieldRules.required]" v-model="editedItem.date_rez"></date-picker>
          </v-flex>

          <!-- <v-flex md6>
            <v-text-field type="number" v-model="editedItem.doc_num" label="Документ №"></v-text-field>
          </v-flex> -->

          <v-flex md12>
            <v-textarea v-model="editedItem.comm" label="Примечание"></v-textarea>
						<div style="font-size:14px">
							<span v-if="editedItem.rez_det">{{ resultValues.find(x => x.resultValueId === editedItem.rez_det).commz }}</span>
							<span v-if="editedItem.rez_osn">{{ detailResults.find(x => x.detailResultId === editedItem.rez_osn).commz }}</span>
						</div>
          </v-flex>

					<v-flex md3 v-if="editedItem.rez_osn === 576">
						<date-picker label="Дата начала" v-model="editedItem.date_begin"></date-picker>
          </v-flex>

					<v-flex md3 v-if="editedItem.rez_osn === 576">
						<date-picker label="Дата окончания" v-model="editedItem.date_end"></date-picker>
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
		className: 'pers_rez_ref',
		sortField: 'date_rez',
		slRez: null,
		rezVal: null,
	}),
	computed: {
		resultsItems() {
			var resultsItems = this.oneItem.linkedData['mpArr_' + this.className];
			var sortResults = resultsItems.sort((prev, next) => {
		    if ( prev.data.date_rez > next.data.date_rez ) return -1;
		    if ( prev.data.date_rez > next.data.date_rez ) return 1;
			});

			console.log(sortResults);

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
        rez_det: null,
        rez_osn: null,
        creationDate: dTrueFormat,
        date_rez: dTrueFormat,
        plc_cod: this.oneItem.data.czu_cod,
        reg_num: this.oneItem.data.reg_num
      }
      return itemPattern;
    },
		cantSave() {
      if (this.editedItem.date_rez && this.slRez && this.rezVal) {
        return false;
      } else {
        return true;
      }
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
		getCommz() {
			var commzs = []
			if (this.editedItem.rez_det && this.resultValues.find(x => x.resultValueId === this.editedItem.rez_det).comm) {
				commzs.push(this.resultValues.find(x => x.resultValueId === this.editedItem.rez_det).comm);
			}
			if (this.editedItem.rez_osn && this.detailResults.find(x => x.detailResultId === this.editedItem.rez_osn).comm) {
				commzs.push(this.detailResults.find(x => x.detailResultId === this.editedItem.rez_osn).comm);
			}
			console.log(commzs);
			this.editedItem.comm = commzs.join(`\n`);
		},
    fillRez() {
			this.editedItem.rez_osn = null;
      this.editedItem.rez_det = this.rezVal;
			this.getCommz();
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
