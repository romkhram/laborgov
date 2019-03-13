<!-- Shopping Cart Widget -->
<template>
<div>
    <vue-perfect-scrollbar style="max-height:calc(100vh - 320px)" :settings="settings">
        <template>
            <v-card v-for="(item, index) in items" :key="item.index" class="eais__list mb-1">
                <v-container fluid py-3>
                    <v-layout row wrap>

				              <v-flex md2>
				                <span class="body-1">{{forTime(item.data.date_end)}}</span>
				              </v-flex>

  				            <v-flex md4>
				                <span class="body-1">
                          <div v-if="item.data.speco_cod !== null && item.data.speco_cod !== undefined && item.data.speco_cod !== 0">
                            {{ sl_specs.find(x => x.spec_cod === item.data.speco_cod).comboVal }}
                          </div>
                          <div v-else>
                            {{ item.data.prof_name }}
                          </div>
                        </span>
  				            </v-flex>

                      <v-flex md4>
				                <span class="body-1">{{ item.data.c_name }}</span>
				              </v-flex>

                        <v-flex md2 py-1>
                            <div class="text-xs-right mrm-4">
                                <v-btn class="ma-0" icon @click="editItem(item)">
                                    <v-icon color="primary">edit</v-icon>
                                </v-btn>
                                <v-btn class="ma-0" icon @click="openApprove(item, index)">
                                    <v-icon color="primary">delete</v-icon>
                                </v-btn>

                            </div>
                        </v-flex>

                    </v-layout>
                </v-container>
            </v-card>

        </template>
    </vue-perfect-scrollbar>

    <v-btn color="grey lighten-1" dark absolute bottom left fab small @click="newItem" style="margin-bottom: 31px;">
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
            <v-card-title class="headline">Сведения об образовании</v-card-title>

            <v-container fluid grid-list-xl>
                <v-layout row wrap>

                    <v-flex md6 py-1>
                      <v-autocomplete
                      :no-data-text="noDataText"
                      label="Наименование профессии" clearable
                      v-model="editedItem.speco_cod"
                      :items="sl_specs"
                      item-text="comboVal"
                      item-value="spec_cod"
                      ></v-autocomplete>
                    </v-flex>

                    <v-flex md6 py-1>
                      <v-autocomplete
                      :no-data-text="noDataText"
                      label="Программа обучения" clearable
                      v-model="editedItem.rpu_ppo"
                      :items="sprPPOes"
                      item-text="fullName"
                      item-value="codeInGroup"
                      ></v-autocomplete>
                    </v-flex>

                    <v-flex md12 py-1>
                      <v-text-field
                      v-model="editedItem.prof_name"
                      label="Наименование профессии при отсутствии в справочнике"
                      ></v-text-field>
                    </v-flex>

                    <v-flex md9 py-1>
                      <v-text-field
                      v-model="editedItem.c_name"
                      label="Наименование учебного заведения"
                      ></v-text-field>
                    </v-flex>

                    <v-flex md3 py-1 class="required">
                        <date-picker :rules="[fieldRules.required]" label="Дата окончания обучения" v-model="editedItem.date_end"></date-picker>
                    </v-flex>

                    <!-- c_name -->

                    <v-flex md9 py-1 class="required">
                      <v-text-field :rules="[fieldRules.required]"
                      v-model="editedItem.spec_doc"
                      label="Документ, №"
                      ></v-text-field>
                    </v-flex>

                    <v-flex md3 py-1>
                      <date-picker label="От" v-model="editedItem.spec_date"></date-picker>
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

                <v-btn v-if="!isNew" color="primary" flat="flat" @click="editNewDialog = false">
                    Продолжить
                </v-btn>

                <v-btn v-if="isNew" :disabled="cantSave" color="primary" flat="flat" @click="createItemVal(items)">
                    Создать
                </v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>

</div>
</template>

<style>
.eais__list:nth-child(even) {
  background-color: #fafafa;
}
.eais__list span.body-1 {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.app-card .app-card-title {
  background: #fafafa;
}
</style>

<script>
import Vue from 'vue'
import modification from "@/mixins/modification";
import rules from "@/mixins/rules";

export default {
	props: ['oneItem'],
  mixins: [modification, rules],
  data: () => ({
    empSearch: null,
    className: 'pers_spec_ref',
  }),
  computed: {
    itemPattern() {
      const itemPattern = {
        date_end: null,
        prof_name: null,
        c_name: null,
        spec_doc: null,
        spec_date: null,
        speco_cod: null,
        reg_num: this.oneItem.data.reg_num
      }
      return itemPattern;
    },
    forSearch() {
      var searchFields =  {
        "offset": 0,
        "limit": 99999,
        "filter": {
          "or": [
            {
              "cond": {
                "attr": "companyId",
                "eq": Number(this.empSearch)
              }
            },
            {
              "cond": {
                "attr": "longName",
                "like": this.empSearch
              }
            }
          ]
        },
        "orders": [
          {"asc":"longName"}
        ]
      }
      if (this.empSearch.length > 0) {
        return searchFields;
      }
    },
    // poor_cod doc_end
    cantSave() {
      if (this.editedItem.poor_cod !== null && this.editedItem.doc_end !== null && this.editedItem.doc_end !== '') {
        return false;
      } else {
        return true;
      }
    },
    sprPOORs() {
      return this.$store.state.eais.stateHandbooks.sprPOORs;
    },
    sprPPOes() {
      return this.$store.state.eais.stateHandbooks.sprPPOes;
    },
    sprPERIODes() {
      return this.$store.state.eais.stateHandbooks.sprPERIODes;
    },
    sl_profs() {
      return this.$store.state.eais.stateHandbooks.sl_profs;
    },
		sprDerivativePositions() {
			return this.$store.state.eais.stateHandbooks.sprDerivativePositions;
		},
		sl_ares() {
			return this.$store.state.eais.stateHandbooks.sl_ares;
		},
    sl_specs() {
			return this.$store.state.eais.stateHandbooks.sl_specs;
		},
    serverHandbook() {
			return this.$store.state.eais.serverHandbook.data;
		},
    serverHandDis() {
      return this.$store.state.eais.serverHandbook.disabled;
      // return true
    }
  },
  watch: {
    search (val) {
      this.empSearch = val;
    }
  },
  methods: {
    extraFunk() {
    },
    letSearch() {
			this.$store.dispatch('searchInBack', this.forSearch);
    }
  }
};
</script>
