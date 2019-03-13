<!-- Shopping Cart Widget -->
<template>
<div>
    <vue-perfect-scrollbar style="max-height:calc(100vh - 320px)" :settings="settings">
        <template>
            <!-- <v-btn color="primary" @click="newItem">Создать</v-btn> -->
            <v-card v-for="(item, index) in items" :key="item.index" class="eais__list mb-1">
                <v-container fluid py-3>
                    <v-layout row wrap>

                      <v-flex md3 py-1>
          								<span class="body-1">{{item.data.name}}</span>
          						</v-flex>

          						<v-flex md3 py-1>
          								<span class="body-1">{{item.data.type}}</span>
          						</v-flex>

          						<v-flex md3 py-1>
          								<span class="body-1">{{item.data.specification}}</span>
          						</v-flex>

          						<v-flex md2 py-1>
          								<span class="body-1 text-xs-right">{{item.data.date}}</span>
          						</v-flex>

                      <v-flex md1 py-1>
                          <div class="text-xs-right mrm-4">
                            <v-tooltip bottom>
                              <v-btn class="ma-0" icon slot="activator" disabled>
                                  <v-icon color="primary">open_in_new</v-icon>
                              </v-btn>
                              <span>Перейти к редактированию мероприятия</span>
                            </v-tooltip>

                          </div>
                      </v-flex>

                    </v-layout>
                </v-container>
            </v-card>

        </template>
    </vue-perfect-scrollbar>

    <!-- <v-dialog v-model="editNewDialog" max-width="1100">
        <v-card>
            <v-card-title class="headline">Результат</v-card-title>

            <v-container fluid grid-list-xl>
                <v-layout row wrap>

                    <v-flex md4>
                        <v-autocomplete :no-data-text="noDataText" label="Группа"></v-autocomplete>
                    </v-flex>

                    <v-flex md4>
                        <v-autocomplete no-data-text="Выберите Группу" label="Результат"></v-autocomplete>
                    </v-flex>

                    <v-flex md4>
                        <v-autocomplete no-data-text="Выберите Результат" label="Причина, основание"></v-autocomplete>
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
                          label="Дата"
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
                          label="Событие"
                          prepend-icon="event"
                          readonly
                        ></v-text-field>
                        <v-date-picker v-model="date02" no-title scrollable @input="$refs.dateMenu02.save(date02)" :first-day-of-week="1" locale="ru-ru">
                        </v-date-picker>
                      </v-menu>
                    </v-flex>

                    <v-flex md6></v-flex>

                    <v-flex md3>
                      <v-text-field
                        label="Документ"
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
                          label="Дата"
                          prepend-icon="event"
                          readonly
                        ></v-text-field>
                        <v-date-picker v-model="date03" no-title scrollable @input="$refs.dateMenu03.save(date03)" :first-day-of-week="1" locale="ru-ru">
                        </v-date-picker>
                      </v-menu>
                    </v-flex>

                    <v-flex md3>
                      <v-menu
                        ref="dateMenu04"
                        :close-on-content-click="false"
                        v-model="dateMenu04"
                        :nudge-right="40"
                        :return-value.sync="date04"
                        lazy
                        transition="scale-transition"
                        offset-y
                        full-width
                        min-width="290px"
                      >
                        <v-text-field
                          slot="activator"
                          v-model="date04"
                          label="Событие"
                          prepend-icon="event"
                          readonly
                        ></v-text-field>
                        <v-date-picker v-model="date04" no-title scrollable @input="$refs.dateMenu04.save(date04)" :first-day-of-week="1" locale="ru-ru">
                        </v-date-picker>
                      </v-menu>
                    </v-flex>


                    <v-flex md3>
                      <v-text-field
                        label="Без наименования"
                      ></v-text-field>
                    </v-flex>


                    <v-flex md12>
                      <v-textarea
                        label="Примечание"
                      ></v-textarea>
                    </v-flex>

                </v-layout>
            </v-container>

            <v-card-actions>
                <v-spacer></v-spacer>

                <v-btn v-if="!isNew" color="primary" flat="flat" @click="editNewDialog = false">
                    Продолжить
                </v-btn>

                <v-btn v-if="isNew" color="primary" flat="flat" @click="createItemVal(items, 'companyResult')">
                    Создать
                </v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog> -->

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
	props: ['oneItem'],
  data: () => ({
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
          name: 'Наименование',
          type: 'Вид',
          specification: 'Детализация',
          date: 'Дата'
        }
      }, {
        data: {
          name: 'Работа 2016',
          type: 'Круглый стол',
          specification: 'Городская',
          date: '11.07.2016'
        }
      }
    ]
  }),
  computed: {
		// items () {
		// 	return this.emploer.linkedData.companyResult;
		// }
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
