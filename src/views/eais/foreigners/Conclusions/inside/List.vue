<!-- Shopping Cart Widget -->
<template>
<div>
    <vue-perfect-scrollbar style="max-height:calc(100vh - 320px)" :settings="settings">
        <template>
            <v-card v-for="(item, index) in items" :key="item.index" class="eais__list mb-1 py-1">
                <v-container fluid py-3>
                    <v-layout row wrap>

                        <v-flex md3>
                            <span class="body-1">{{item.data.extraVac}} {{item.data.vacName}}</span>
                        </v-flex>

                        <v-flex md2>
                          <span class="body-1">
														{{item.data.moneyMin}} &#8381;
													</span>
                        </v-flex>

                        <v-flex md2>
                            <span class="body-1">
                              Разешено - {{item.data.vacNum}} из {{item.data.vacNum}}
                            </span>
                        </v-flex>

                        <v-flex md4>
                          <span class="body-1">
														Причина отказа: {{item.data.reason.toString()}}
													</span>
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
            <v-card-title class="headline">Список</v-card-title>

            <v-container fluid grid-list-xl>
                <v-layout row wrap>

                    <!-- <v-flex md4>
                        <v-select items="Нет данных" label="Вид счета"></v-select>
                    </v-flex> -->

                    <!-- <v-flex md4>
                      <v-autocomplete
                        label="Шифр ОКВЭД"
                        :no-data-text="noDataText"
                      ></v-autocomplete>
                    </v-flex> -->

                    <v-flex md4>
                      <v-autocomplete
                        label="Наименование профессии"
                        :no-data-text="noDataText"
                      ></v-autocomplete>
                    </v-flex>

                    <v-flex md4>
                      <v-autocomplete
                        label="Производная должность"
                        :no-data-text="noDataText"
                      ></v-autocomplete>
                    </v-flex>

                    <v-flex md2>
                      <v-text-field
                        label="Запрос, кол-во"
                      ></v-text-field>
                    </v-flex>

                    <v-flex md2>
                      <v-text-field
                        label="Зарплата"
                      ></v-text-field>
                    </v-flex>

                    <!-- <v-flex md3>
                      <v-text-field
                        label="С прошл. года"
                      ></v-text-field>
                    </v-flex>

                    <v-flex md3>
                      <v-text-field
                        label="Потребн. в РФ"
                      ></v-text-field>
                    </v-flex>

                    <v-flex md3>
                      <v-autocomplete
                        label="Страна"
                        :no-data-text="noDataText"
                      ></v-autocomplete>
                    </v-flex> -->


                    <v-flex md6 my-3 pr-5 class="multiflex">
                      <span class="editLabel">Заключение</span>
                      <v-layout row wrap>

                        <v-flex md3 pt-0>
                          <v-text-field
                            label="Да"
                          ></v-text-field>
                        </v-flex>

                        <v-flex md3 pt-0>
                          <v-text-field
                            label="Нет"
                          ></v-text-field>
                        </v-flex>

                        <v-flex md6 pt-0>
                          <v-autocomplete
                            label="Прич.нецел.привл.ИР"
                            :no-data-text="noDataText"
                          ></v-autocomplete>
                        </v-flex>

                      </v-layout>
                    </v-flex>


                    <v-flex md6 my-3 class="multiflex">
                      <span class="editLabel">Предложение</span>
                      <v-layout row wrap>

                        <v-flex md3 pt-0>
                          <v-text-field
                            label="Да"
                          ></v-text-field>
                        </v-flex>

                        <v-flex md3 pt-0>
                          <v-text-field
                            label="Нет"
                          ></v-text-field>
                        </v-flex>

                        <v-flex md6 pt-0>
                          <v-autocomplete
                            label="Прич.нецел.привл.ИР"
                            :no-data-text="noDataText"
                          ></v-autocomplete>
                        </v-flex>

                      </v-layout>
                    </v-flex>

                    <v-flex md3>
                      <v-menu
                        ref="dateMenu01"
                        :close-on-content-click="false"
                        v-model="dateMenu01"
                        :nudge-right="40"
                        :return-value.sync="date01"
                        lazy
                        transition="scale-transition"
                        offset-y
                        full-width
                        min-width="290px"
                      >
                        <v-text-field
                          slot="activator"
                          v-model="date01"
                          label="Начало трудоустройства"
                          prepend-icon="event"
                          readonly
                        ></v-text-field>
                        <v-date-picker v-model="date01" no-title scrollable @input="$refs.dateMenu01.save(date01)" :first-day-of-week="1" locale="ru-ru">
                        </v-date-picker>
                      </v-menu>
                    </v-flex>

                    <v-flex md3>
                      <v-menu
                        ref="dateMenu02"
                        :close-on-content-click="false"
                        v-model="dateMenu02"
                        :nudge-right="40"
                        :return-value.sync="date02"
                        lazy
                        transition="scale-transition"
                        offset-y
                        full-width
                        min-width="290px"
                      >
                        <v-text-field
                          slot="activator"
                          v-model="date02"
                          label="Конец трудоустройства"
                          prepend-icon="event"
                          readonly
                        ></v-text-field>
                        <v-date-picker v-model="date02" no-title scrollable @input="$refs.dateMenu02.save(date02)" :first-day-of-week="1" locale="ru-ru">
                        </v-date-picker>
                      </v-menu>
                    </v-flex>

                    <v-flex md6>
                      <v-autocomplete
                        label="Страна"
                        :no-data-text="noDataText"
                      ></v-autocomplete>
                    </v-flex>

                    <v-flex md9>
                      <v-text-field
                        label="Примечание"
                      ></v-text-field>
                    </v-flex>

                    <v-flex md3>
                      <v-menu
                        ref="dateMenu03"
                        :close-on-content-click="false"
                        v-model="dateMenu03"
                        :nudge-right="40"
                        :return-value.sync="date03"
                        lazy
                        transition="scale-transition"
                        offset-y
                        full-width
                        min-width="290px"
                      >
                        <v-text-field
                          slot="activator"
                          v-model="date03"
                          label="Дата ввода"
                          prepend-icon="event"
                          readonly
                        ></v-text-field>
                        <v-date-picker v-model="date03" no-title scrollable @input="$refs.dateMenu03.save(date03)" :first-day-of-week="1" locale="ru-ru">
                        </v-date-picker>
                      </v-menu>
                    </v-flex>


                </v-layout>
            </v-container>

            <v-card-actions>
                <v-spacer></v-spacer>

                <v-btn color="green darken-1" flat="flat" @click="editNewDialog = false">
                    Отменить
                </v-btn>

                <v-btn v-if="!isNew" color="primary" flat="flat" @click="editNewDialog = false">
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

export default {
	props: ['emploer'],
  data: () => ({
		sign: ['Руководитель', 'Уволен', 'Основной'],
    settings: {
      maxScrollbarLength: 100
    },
    noDataText: 'Нет данных',
    editNewDialog: false,
    switch1: false,
    editedItem: {},
    isNew: false,
    reasons: [
      'Развитие',
      'Создание',
      'Отсутствие',
      'в РФ',
      'Иные'
    ],
    dateMenu01: false,
    dateMenu02: false,
    dateMenu03: false,
    dateMenu04: false,
    date01: null,
    date02: null,
    date03: null,
    date04: null,
    items: [
      {
        data: {
          okved: '15.81',
          vacName: 'Грузчик',
          vacSpec: '',
          extraVac: 'Младший',
          vacCountry: 'Узбекистан',
          VacCategory: '',
          moneyMin: '10 000',
          reason: [],
          vacNum: '10'
        }
      }, {
        data: {
          okved: '15.81',
          vacName: 'Повар',
          vacSpec: '',
          extraVac: 'Младший',
          vacCountry: 'Узбекистан',
          VacCategory: '',
          moneyMin: '10 000',
          reason: ['Присутствие', ' в РФ'],
          vacNum: '10'
        }
      },
    ]
  }),
  computed: {
		// items () {
		// 	return this.emploer.linkedData.contacts;
		// },
		sprPositions () {
			return this.$store.state.eais.sprPositions;
		},

  },
  methods: {
    editItem (item) {
      this.isNew = false;
      this.editedItem = item.data;
      console.log(this.editedItem);
      this.editNewDialog = true;
    },
    newItem () {
      this.isNew = true;
      this.editedItem = {}
      this.editNewDialog = true;
    },
    createItemVal(items, linkedDataName) {
      items.push({classCode: linkedDataName});
      let objlength = items.length - 1;
      Vue.set(items[objlength], 'data', this.editedItem);
      this.addUserIds(items[objlength].data);
      this.editNewDialog = false;
    },
    addUserIds(val) {
      Vue.set(val, 'userOwnerId', 9990000000);
      Vue.set(val, 'userEditorId', 9990000000);
    }
  }
};
</script>
