<!-- Shopping Cart Widget -->
<template>
<div>
	<!-- <pre-loader v-if="!items"></pre-loader>  v-else -->
	<vue-perfect-scrollbar style="max-height:calc(100vh - 400px);" :settings="settings">
		<template>
			<v-card v-for="(item, index) in items" :key="item.index" class="eais__list mb-1 py-1">
				<v-container fluid py-3>
					<v-layout row wrap>

						<v-flex md3>
							<span class="body-1">
								<span v-if="item.data.resultValueId">
                    {{ sl_rezs.find(x => x.rez_cod === (resultValues[resultValues.findIndex(x => x.resultValueId === item.data.resultValueId)].rez_cod) ).rez_name }}
                </span>
							</span>
						</v-flex>

						<v-flex md4>
							<span class="body-1">
								<span v-if="item.data.resultValueId">
                  {{ resultValues.find(x => x.resultValueId === item.data.resultValueId).rez_name }}
                </span>
							</span>
						</v-flex>

						<v-flex md4>
							<span class="body-1">
								<span v-if="item.data.detailResultId">
                  {{ detailResults.find(x => x.detailResultId === item.data.detailResultId).rez_name }}
                  <!-- {{ detailResults[detailResults.findIndex(x => x.detailResultId === item.data.detailResultId)].rez_name }} -->
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
						<v-autocomplete
             :no-data-text="noDataText" :rules="[fieldRules.required]"
             v-model="slRez"
             :items="sl_rezs"
             item-text="comboVal"
             item-value="rez_cod"
             label="Группа"
             clearable
            ></v-autocomplete>
					</v-flex>

					<v-flex md6 class="required">
						<v-autocomplete
             :no-data-text="noDataText" :rules="[fieldRules.required]"
             v-model="rezVal"
             :items="resultFilterValues"
             item-text="comboVal"
             item-value="resultValueId"
             label="Результат" @input="fillRez()"
             clearable
            ></v-autocomplete>
					</v-flex>

					<v-flex md12>
						<v-autocomplete
             no-data-text="У выбранного результата отсутствует значение причины"
             v-model="editedItem.detailResultId"
             :items="detailFilterResults"
             item-text="comboVal"
             item-value="detailResultId"
             label="Причина, основание"
             clearable
            ></v-autocomplete>
					</v-flex>

          <v-flex md6>
            <date-picker label="Дата результата" v-model="editedItem.resultDate"></date-picker>
          </v-flex>

          <v-flex md6>
            <v-text-field type="number" v-model="editedItem.docNumber" label="Документ №"></v-text-field>
          </v-flex>

					<v-flex md9>
						<v-autocomplete
							:no-data-text="noDataText"
							label="Представитель работодателя"
							:items="vacContacts"
							item-text="comboVal"
							item-value="contactId"
							v-model="editedItem.contactId"
						></v-autocomplete>
					</v-flex>

					<v-flex md3>
						<v-autocomplete
							:no-data-text="noDataText"
							label="Cпособ взаимодействия"
							:items="sprFormSubmissions"
							item-text="fullName"
							item-value="codeInGroup"
							v-model="editedItem.fok_cod"
						></v-autocomplete>
					</v-flex>

          <v-flex md12>
            <v-textarea v-model="editedItem.comment" label="Примечание"></v-textarea>
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

				<v-btn v-if="isNew" color="primary" :disabled="allFields" flat="flat" @click="createItemVal(items)">
					Создать
				</v-btn>

				<v-btn v-if="!isNew" color="primary" :disabled="allFields" flat="flat" @click="editNewDialog = false">
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
		className: 'companyResult',
		slRez: null,
		rezVal: null,
	}),
	computed: {
		allFields() {
			if (this.slRez && this.rezVal
			) {
				return false;
			} else {return true}
		},
		// slOkveds () {
		// 	return this.$store.state.eais.stateHandbooks.sl_okveds;
		// }
    itemPattern() {
      var d = new Date();
      var dTrueFormat = d.toISOString().split('T')[0] + 'T21:00:00.000+0000';
      const itemPattern = {
        changeDate: null,
        comment: " ",
        companyId: this.oneItem.data.companyId,
        contactId: null,
        creationDate: dTrueFormat,
        resultDate: dTrueFormat,
        detailResultId: null,
        docDate: null,
        docNumber: null,
        docSum: null,
        emplCenterId: this.oneItem.data.emplCenterId,
        endDate: null,
        resultId: null,
        resultValueId: null,
        service: null,
        serviceDate: null,
        sourceId: null,
        startDate: null
      }
      return itemPattern;
    },
		sprFormSubmissions() {
			return this.$store.state.eais.stateHandbooks.sprFormSubmissions;
		},
		vacContacts() {
			var contacts = this.oneItem.linkedData.mpArr_contacts;
			var vacContacts = [];
			contacts.forEach(function(el) {
				vacContacts.push(el.data);
			});
			vacContacts.forEach(function(element) {
				var comboValArr = [];
				if (element.contactSurname !== null) {comboValArr.push(element.contactSurname)}
				if (element.contactName !== null) {comboValArr.push(' ' + element.contactName)}
				if (element.contactMiddleName !== null) {comboValArr.push(' ' + element.contactMiddleName)}
				if (element.eMail !== null) {comboValArr.push(', ' + element.eMail)}
				if (element.phoneNumber !== null) {comboValArr.push(', тел: ' + element.phoneNumber)}
				element.comboVal = comboValArr.join('');
			});
			return vacContacts;
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
    fillRez() {
      this.editedItem.resultValueId = this.rezVal;
    },
    beforeEdit(){
      const resValObj = this.resultValues.find(x => x.resultValueId === this.editedItem.resultValueId);
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
