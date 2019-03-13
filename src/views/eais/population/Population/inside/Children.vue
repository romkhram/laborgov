<!-- Shopping Cart Widget -->
<template>
<div>
    <vue-perfect-scrollbar style="max-height:calc(100vh - 320px)" :settings="settings">
        <template>
            <v-card v-for="(item, index) in items" :key="item.index" class="eais__list mb-1">
                <v-container fluid py-3>
                    <v-layout row wrap>

				              <v-flex md2>
				                <span class="body-1">{{ sprPOORs[sprPOORs.findIndex(x => x.codeInGroup === item.data.poor_cod)].fullName }}</span>
				              </v-flex>

                      <v-flex md4>
				                <span class="body-1">{{forTime(item.data.date_borth)}} - {{forTime(item.data.date_end)}}</span>
				              </v-flex>

				              <v-flex md4>
				                <span class="body-1">{{item.data.doc_end}}</span>
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
            <v-card-title class="headline">Сведения об иждивенце</v-card-title>

            <v-container fluid grid-list-xl>
                <v-layout row wrap>

                    <v-flex md4 py-1 class="required">
                      <v-autocomplete :rules="[fieldRules.required]"
  										label="Степень родства"
                      v-model="editedItem.poor_cod"
                      :items="sprPOORs"
                      item-text="fullName"
                      item-value="codeInGroup"
                      ></v-autocomplete>
                    </v-flex>

                    <v-flex md4 py-1 class="required">
                      <date-picker :rules="[fieldRules.required]" label="Дата рождения" v-model="editedItem.date_borth"></date-picker>
                    </v-flex>

                    <v-flex md4 py-1>
                      <date-picker label="Дата окончания иждивения" :min="editedItem.date_borth" v-model="editedItem.date_end"></date-picker>
                    </v-flex>

                    <v-flex md9 py-1 class="required">
                      <v-text-field :rules="[fieldRules.required]"
                      v-model="editedItem.doc_end"
                      label="Документ"
                      ></v-text-field>
                    </v-flex>

                    <v-flex md3 pl-5>
                      <v-switch
                        label="Активна"
                        v-model="editedItem.poor_priz"
                        :true-value="1"
                        :false-value="0"
                      ></v-switch>
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
    className: 'pers_poor_ref',
  }),
  computed: {
    swLabel() {
      if (true) {
        return 'Активна';
      } else {
        return 'Неактивна';
      }
    },
    itemPattern() {
      const itemPattern = {
        date_borth: null,
        date_end: null,
        doc_end: null,
        poor_cod: null,
        poor_priz: 1,
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
