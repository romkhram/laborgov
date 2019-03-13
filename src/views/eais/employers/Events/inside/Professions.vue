<!-- Shopping Cart Widget -->
<template>
<div>
    <vue-perfect-scrollbar style="max-height:calc(100vh - 320px)" :settings="settings">
        <template>
            <v-card v-for="(item, index) in items" :key="item.index" class="eais__list mb-1 py-1">
                <v-container fluid py-3>
                    <v-layout row wrap>

                        <v-flex md5>
                            <span class="body-1">{{item.data.extraVac}} {{item.data.vacName}}</span>
                        </v-flex>

                        <v-flex md3>
                          <span class="body-1">
														Зарплата - {{item.data.moneyMin}} &mdash; {{item.data.moneyMax}} &#8381;
													</span>
                        </v-flex>

                        <v-flex md3>
                            <span class="body-1">
                              {{item.data.vacNum}} рабочих мест
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
            <v-card-title class="headline">профессии</v-card-title>

            <v-container fluid grid-list-xl>
                <v-layout row wrap>

                    <!-- <v-flex md4>
                        <v-select items="Нет данных" label="Вид счета"></v-select>
                    </v-flex> -->

                    <v-flex md4>
                      <v-autocomplete
                        label="Наименование профессии"
                        :no-data-text="noDataText"
                      ></v-autocomplete>
                    </v-flex>

                    <v-flex md4>
                      <v-text-field
                        label="Специализация"
                      ></v-text-field>
                    </v-flex>

                    <v-flex md4>
                      <v-autocomplete
                        label="Производная должность"
                        :no-data-text="noDataText"
                      ></v-autocomplete>
                    </v-flex>

                    <v-flex md3>
                      <v-text-field
                        label="Разряд"
                      ></v-text-field>
                    </v-flex>

                    <v-flex md3>
                      <v-text-field
                        label="Зарплата с"
                      ></v-text-field>
                    </v-flex>

                    <v-flex md3>
                      <v-text-field
                        label="Зарплата по"
                      ></v-text-field>
                    </v-flex>

                    <v-flex md3>
                      <v-text-field
                        label="Количество рабочих мест"
                      ></v-text-field>
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
          vacId: '1000',
          vacName: 'Повар',
          vacSpec: '',
          extraVac: 'Младший',
          extraVacId: '123',
          VacCategory: '',
          moneyMin: '10 000',
          moneyMax: '60 000',
          vacNum: '10'
        }
      }, {
        data: {
          vacId: '1000',
          vacName: 'Повар',
          vacSpec: '',
          extraVac: 'Младший',
          extraVacId: '123',
          VacCategory: '',
          moneyMin: '10 000',
          moneyMax: '60 000',
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
