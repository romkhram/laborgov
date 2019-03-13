<template>
<div>
    <vue-perfect-scrollbar style="max-height:calc(100vh - 320px)" :settings="settings">
        <template>
            <v-card v-for="(item, index) in items" :key="item.index" class="eais__list mb-1 py-1">
                <v-container fluid py-3>
                    <v-layout row wrap>

                        <v-flex sm5 xl3 pb-0>
                          <span class="body-1" v-if="item.data.prof_cod">{{ sl_profs.find(x => x.prof_cod === item.data.prof_cod).prof_name }}</span>
                        </v-flex>

                        <v-flex sm2 xl1 pb-0>
                            <span class="body-1">
                              {{item.data.k_prof }}
                            </span>
                        </v-flex>

                        <v-flex sm3 xl2 pb-0>
                          <span class="body-1">
														Зарплата - {{item.data.salary}} &#8381;
													</span>
                        </v-flex>

                        <v-flex sm2 xl1 pb-0>
                          <span class="body-1">
                            <span v-if="item.data.oksm_cod">
                              {{ sl_oksms[sl_oksms.findIndex(x => x.oksm_cod == item.data.oksm_cod)].oksm_name }}
                            </span>
													</span>
                        </v-flex>

                        <v-flex sm11 xl5 pb-0>
                          <span class="body-1">{{item.data.shifr}}
                            <span v-if="item.data.shifr && slOkveds.find(x => x.shifr === item.data.shifr)">
                              {{ slOkveds.find(x => x.shifr === item.data.shifr).name }}
                            </span>
                            <span v-else>
                              Нет значения в справочнике
                            </span>
                          </span>
                          <!-- {{ slOkveds[slOkveds.findIndex(x => x.shifr == "55.1")].comboVal }} -->
                          <!-- <span class="body-1">{{ slOkveds.find(x => x.shifr === item.data.shifr).comboVal }}</span> -->
                        </v-flex>

                        <v-flex sm11 pt-3>
                          <span class="body-1">{{celTrue(item.data)}}</span>
                        </v-flex>

                        <v-flex md1 py-1>
                            <div class="text-xs-right mrm-4">
                                <v-btn class="ma-0" icon @click="editItem(item)">
                                    <v-icon color="primary">edit</v-icon>
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

    <v-dialog v-model="editNewDialog" max-width="1100">
        <v-card>
            <v-card-title class="headline">Контакты</v-card-title>

            <v-container fluid grid-list-xl>
                <v-layout row wrap>

                    <v-flex md4>
  										<v-autocomplete
                       :no-data-text="noDataText"
  										v-model="editedItem.shifr"
  										:items="slOkveds"
  										item-text="comboVal"
  										item-value="shifr"
  										label="ВЭД"
  										></v-autocomplete>
                    </v-flex>

                    <v-flex md4 class="required">
                      <v-autocomplete :rules="[fieldRules.required]"
                        label="Профессия"
                        :items="sl_profs"
                        item-text="comboVal"
                        item-value="prof_cod"
                        v-model="editedItem.prof_cod"
                        :no-data-text="noDataText"
                      ></v-autocomplete>
                    </v-flex>

                    <v-flex md4>
                      <v-autocomplete
                        label="Производная профессия"
                        :items="sprDerivativePositions"
                        item-text="fullName"
                        item-value="codeInGroup"
                        v-model="editedItem.pd_cod"
                        :no-data-text="noDataText"
                      ></v-autocomplete>
                    </v-flex>

                    <v-flex md3>
                      <v-text-field
                        type="number"
                        min="0"
                        v-model="editedItem.k_prof_year"
                        label="Числ. привл. ИР"
                      ></v-text-field>
                    </v-flex>

                    <v-flex md3>
                      <v-text-field
                        type="number"
                        min="0"
                        v-model="editedItem.k_prof_bak"
                        label="С прошл. года"
                      ></v-text-field>
                    </v-flex>

                    <v-flex md3>
                      <v-text-field
                        type="number"
                        min="0"
                        v-model="editedItem.k_prof_rf"
                        label="Потребн. в РФ"
                      ></v-text-field>
                    </v-flex>

                    <v-flex md3>
                      <v-autocomplete
                        label="Страна"
                        :items="sl_oksms"
                        item-text="oksm_name"
                        item-value="oksm_cod"
                        v-model="editedItem.oksm_cod"
                        :no-data-text="noDataText"
                      ></v-autocomplete>
                    </v-flex>

                    <v-flex md6 my-3 pr-5 class="multiflex">
                      <span class="editLabel">Опыт</span>
                      <v-layout row wrap>

                        <v-flex md3 pt-0>
                          <v-text-field
                            type="number"
                            min="0"
                            v-model="editedItem.staj1"
                            label="< 1"
                          ></v-text-field>
                        </v-flex>

                        <v-flex md3 pt-0>
                          <v-text-field
                            type="number"
                            min="0"
                            v-model="editedItem.staj2"
                            label="1 - 3"
                          ></v-text-field>
                        </v-flex>

                        <v-flex md3 pt-0>
                          <v-text-field
                            type="number"
                            min="0"
                            v-model="editedItem.staj3"
                            label="3 - 5"
                          ></v-text-field>
                        </v-flex>

                        <v-flex md3 pt-0>
                          <v-text-field
                            type="number"
                            min="0"
                            v-model="editedItem.staj4"
                            label="> 5"
                          ></v-text-field>
                        </v-flex>

                      </v-layout>
                    </v-flex>

                    <v-flex md6 my-3 class="multiflex">
                      <span class="editLabel">Образование</span>
                      <v-layout row wrap>

                        <v-flex md3 pt-0>
                          <v-text-field
                            type="number"
                            min="0"
                            v-model="editedItem.educ1"
                            label="Нач.проф."
                          ></v-text-field>
                        </v-flex>

                        <v-flex md3 pt-0>
                          <v-text-field
                            type="number"
                            min="0"
                            v-model="editedItem.educ2"
                            label="Ср.проф."
                          ></v-text-field>
                        </v-flex>

                        <v-flex md3 pt-0>
                          <v-text-field
                            type="number"
                            min="0"
                            v-model="editedItem.educ3"
                            label="Среднее"
                          ></v-text-field>
                        </v-flex>

                        <v-flex md3 pt-0>
                          <v-text-field
                            type="number"
                            min="0"
                            v-model="editedItem.educ4"
                            label="Высшее"
                          ></v-text-field>
                        </v-flex>

                      </v-layout>
                    </v-flex>

                    <v-flex md4 my-3 pr-5 class="multiflex">
                      <span class="editLabel">Условия</span>
                      <v-layout row wrap>

                        <v-flex md4 pt-0>
                          <v-text-field
                            type="number"
                            min="0"
                            v-model="editedItem.srok"
                            label="Срок (мес.)"
                          ></v-text-field>
                        </v-flex>

                        <v-flex md8 pt-0>
                          <v-text-field
                            type="number"
                            min="0"
                            v-model="editedItem.salary"
                            label="Оплата"
                          ></v-text-field>
                        </v-flex>

                      </v-layout>
                    </v-flex>

                    <v-flex md4 my-3 pr-5 class="multiflex">
                      <span class="editLabel">Жилье</span>
                      <v-layout row wrap>

                        <v-flex md4 pt-0>
                          <v-text-field
                            type="number"
                            min="0"
                            v-model="editedItem.build_n"
                            label="Нет"
                          ></v-text-field>
                        </v-flex>

                        <v-flex md4 pt-0>
                          <v-text-field
                            type="number"
                            min="0"
                            v-model="editedItem.build_o"
                            label="Общ"
                          ></v-text-field>
                        </v-flex>

                        <v-flex md4 pt-0>
                          <v-text-field
                            type="number"
                            min="0"
                            v-model="editedItem.build_a"
                            label="Аренда"
                          ></v-text-field>
                        </v-flex>

                      </v-layout>
                    </v-flex>

                    <v-flex md4 my-3 class="multiflex">
                      <span class="editLabel">Мед.обсл.</span>
                      <v-layout row wrap>

                        <v-flex md6 pt-0>
                          <v-text-field
                            type="number"
                            min="0"
                            v-model="editedItem.med_o"
                            label="ОМС"
                          ></v-text-field>
                        </v-flex>

                        <v-flex md6 pt-0>
                          <v-text-field
                            type="number"
                            min="0"
                            v-model="editedItem.med_d"
                            label="ДМС"
                          ></v-text-field>
                        </v-flex>

                      </v-layout>
                    </v-flex>

                    <v-flex md3>
                      <date-picker label="Дата приема" v-model="editedItem.creationDate"></date-picker>
                    </v-flex>

                    <v-flex md3>
                      <v-text-field
                        type="number"
                        min="0"
                        v-model="editedItem.k_prof"
                        label="Количество"
                      ></v-text-field>
                    </v-flex>

                    <v-flex md3>
                      <v-text-field
                        type="number"
                        min="0"
                        v-model="editedItem.educ"
                        label="Обучение"
                      ></v-text-field>
                    </v-flex>

                    <v-flex md12>
                      <v-select
                        :items="reasons"
                        @input="getSign()"
                        v-model="signVal"
                        label="Причина"
                        multiple
                      ></v-select>
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
.multiflex:hover {
  background: #f5f5f5;
}
</style>

<script>
import { mapState } from "vuex";
import api from "Api";
import Vue from 'vue'
import modification from "@/mixins/modification";
import rules from "@/mixins/rules";

export default {
	props: ['oneItem'],
  mixins: [modification, rules],
  data: () => ({
    className: 'cl_zspis_ref',
    settings: {
      maxScrollbarLength: 100
    },
    signVal: [],
    noDataText: 'Нет данных',
    reasons: [
      'Развитие новых технологий',
      'Создание совместных предприятий',
      'Отсутствие кадров в регионе',
      'Отсутствие кадров в РФ',
      'Иные'
    ],
    objReasons: [
      {code: 'cel1', txt: 'Развитие новых технологий'},
      {code: 'cel2', txt: 'Создание совместных предприятий'},
      {code: 'cel3', txt: 'Отсутствие кадров в регионе'},
      {code: 'cel4', txt: 'Отсутствие кадров в РФ'},
      {code: 'cel5', txt: 'Иные'}
    ]
  }),
  computed: {
    cantSave() {
      if (this.editedItem.prof_cod) {
        return false;
      } else {
        return true;
      }
    },
		// items () {
		// 	return this.emploer.linkedData.contacts;
		// },
    sprPositions() {
			return this.$store.state.eais.stateHandbooks.sprPositions;
		},
    sl_profs() {
			return this.$store.state.eais.stateHandbooks.sl_profs;
		},
    slOkveds () {
      return this.$store.state.eais.stateHandbooks.sl_okveds;
    },
    sl_oksms() {
			return this.$store.state.eais.stateHandbooks.sl_oksms;
		},
		sprDerivativePositions() {
			return this.$store.state.eais.stateHandbooks.sprDerivativePositions;
		},
  },
  methods: {
    celTrue(val) {
      var objReasons = this.objReasons;
      var celTrueArr = [];
      var celTrue = [];
      celTrueArr.push(val.cel1);
      celTrueArr.push(val.cel2);
      celTrueArr.push(val.cel3);
      celTrueArr.push(val.cel4);
      celTrueArr.push(val.cel5);
      console.log(celTrueArr);
      celTrueArr.forEach(function(item, i, arr) {
        if (item === 1) {
          console.log(i);
          console.log(objReasons[i].txt);
          celTrue.push(objReasons[i].txt);
        }
      })
      return celTrue.join(', ');
    },
    extraFunk() {
      this.toSign();
    },


    toSign() {
      this.signVal = [];
      console.log('Запустили признак');
      if (this.editedItem.cel1 === 1) {
        this.signVal.push('Развитие новых технологий');
      }
      if (this.editedItem.cel2 === 1) {
        this.signVal.push('Создание совместных предприятий');
      }
      if (this.editedItem.cel3 === 1) {
        this.signVal.push('Отсутствие кадров в регионе');
      }
      if (this.editedItem.cel4 === 1) {
        this.signVal.push('Отсутствие кадров в РФ');
      }
      if (this.editedItem.cel5 === 1) {
        this.signVal.push('Иные');
      }
      console.log(this.signVal);
    },
    getSign() {
      this.editedItem.cel1 = null
      this.editedItem.cel2 = null
      this.editedItem.cel3 = null
      this.editedItem.cel4 = null
      this.editedItem.cel5 = null
      var that = this
      this.signVal.forEach(function(item, i, arr) {
        if (item === that.reasons[0]) {
          that.editedItem.cel1 = 1; // Меняем 'Развитие новых технологий'
        } else if (item === that.reasons[1]) {
          that.editedItem.cel2 = 1; // Меняем 'Создание совместных предприятий'
        } else if (item === that.reasons[2]) {
          that.editedItem.cel3 = 1; // Меняем 'Отсутствие кадров в регионе'
        } else if (item === that.reasons[3]) {
          that.editedItem.cel4 = 1; // Меняем 'Отсутствие кадров в РФ'
        } else if (item === that.reasons[4]) {
          that.editedItem.cel5 = 1; // 'Иные'
        }
      });
    }
  }
};
</script>
