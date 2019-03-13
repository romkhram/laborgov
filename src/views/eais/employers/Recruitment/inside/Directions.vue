<!-- Shopping Cart Widget -->
<template>
<div>
    <vue-perfect-scrollbar style="max-height:calc(100vh - 320px)" :settings="settings">
        <template>
            <v-card v-for="(item, index) in sentences" :key="item.id" class="eais__list mb-1">
                <v-container fluid py-3>
                    <v-layout row wrap>

                      <v-flex md3>
              					<span class="body-1">{{item.data.persFio}}</span>
              				</v-flex>

              					<v-flex md5>
              						<span class="body-1">{{item.data.prof_cod}}:
              							{{ sl_profs[sl_profs.findIndex(x => x.prof_cod === item.data.prof_cod)].prof_name }}
              						</span>
              					</v-flex>

              					<v-flex md3>
              						<span class="body-1">{{item.data.salary}} ₽</span>
              					</v-flex>

              					<!-- <v-flex md2> -->
              						<!-- <span class="body-1">
                          {{ sprRecordCloses[sprRecordCloses.findIndex(x => x.typ_cod === item.data.fin_way)].typ_name }}</span> -->
              					<!-- </v-flex> -->

                        <!-- <v-flex md1 py-1>
                            <div class="text-xs-right mrm-4">
                                <v-btn class="ma-0" icon @click="editItem(item)">
                                    <v-icon color="primary">edit</v-icon>
                                </v-btn>
                            </div>
                        </v-flex> -->

                    </v-layout>
                </v-container>
            </v-card>

        </template>
    </vue-perfect-scrollbar>

    <!-- <v-btn color="grey lighten-1" dark absolute bottom left fab small @click="newItem" style="margin-bottom: 31px;">
      <v-icon>add</v-icon>
    </v-btn> -->

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
            <v-card-title class="headline">Направление</v-card-title>

            <v-container fluid grid-list-xl>
                <v-layout row wrap>

                    <!-- <v-flex md4 py-1>
                      <v-autocomplete
  										label="Наименование"
                      v-model="editedItem.period"
                      :items="sprPERIODes"
                      item-text="fullName"
                      item-value="codeInGroup"
                      ></v-autocomplete>
                    </v-flex>

                    <v-flex md2 py-1>
                        <date-picker label="по" v-model="editedItem.date_begin"></date-picker>
                    </v-flex>

                    <v-flex md2 py-1>
                        <date-picker label="по" v-model="editedItem.date_end"></date-picker>
                    </v-flex>

                    <v-flex md4 py-1>
                      <v-text-field
                      v-model="editedItem.prof_doc"
                      label="Документ"
                      ></v-text-field>
                    </v-flex>

                    <v-flex md6 py-1>
                      <v-autocomplete
  										label="Профессия"
                      v-model="editedItem.prof_cod"
                      :items="sl_profs"
                      item-text="comboVal"
                      item-value="prof_cod"
                      ></v-autocomplete>
                    </v-flex>

                    <v-flex md2 py-1>
                       <v-text-field
                        v-model="editedItem.prof_lev"
                        label="Разряд"
                      ></v-text-field>
                    </v-flex>

                    <v-flex md4 py-1>
                      <v-autocomplete
                        label="Производная должность"
                        :items="sprDerivativePositions"
                        item-text="fullName"
                        item-value="codeInGroup"
                        v-model="editedItem.pd_cod"
                        :no-data-text="noDataText"
                      ></v-autocomplete>
                    </v-flex>

                    <v-flex md6 py-1>
                      <v-autocomplete
                        label="Сфера деятельности"
                        disabled
                        :items="sl_ares"
                        item-text="are_name"
                        item-value="are_cod"
                        v-model="editedItem.prof_comm"
                        :no-data-text="noDataText"
                      ></v-autocomplete>
                    </v-flex>

                    <v-flex md6 py-1>
                      <v-text-field
                        v-model="editedItem.prof_spec"
                        label="Специализация"
                      ></v-text-field>
                    </v-flex>

                    <v-flex md12 py-1>
                      <v-autocomplete
                        label="ID и Наименование организации"
                        :items="serverHandbook"
                        item-text="comboVal"
                        item-value="companyId"
                        v-model="editedItem.c_client"
                        :no-data-text="noDataText"
                        append-outer-icon="search"
                        :search-input.sync="empSearch"
                        @click:append-outer="letSearch"
                        @keyup.enter="letSearch"
                        :disabled="serverHandDis"
                        :loading="serverHandDis"
                      ></v-autocomplete>
                    </v-flex>

                    <v-flex md12 py-1>
                      <v-text-field
                        v-model="editedItem.c_name"
                        label="Наименование организации при отсутствии в справочнике"
                      ></v-text-field>
                    </v-flex> -->

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

export default {
	props: ['oneItem'],
  mixins: [modification],
  data: () => ({
    empSearch: null,
    className: 'job_dir_ref',
  }),
  computed: {
    sentences () {
      const sentences = this.oneItem.linkedData['mpArr_' + this.className];
      const newSentences = sentences.filter(ar => ar.data.dir_spr === 3);
      return newSentences;
      // return this.oneItem.linkedData['mpArr_' + this.className];
    },
    itemPattern() {
      const itemPattern = {
        date_begin: null,
        date_end: null,
        period: null,
        prof_cod: null,
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
    cantSave() {
      if (this.editedItem.date_begin !== null && this.editedItem.date_end !== null && this.editedItem.period !== null) {
        return false;
      } else {
        return true;
      }
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
    sprRecordCloses() {
			return this.$store.state.eais.stateHandbooks.sprRecordCloses;
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
