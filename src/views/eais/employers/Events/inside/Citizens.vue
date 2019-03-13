<!-- Shopping Cart Widget -->
<template>
<div>
    <vue-perfect-scrollbar style="max-height:calc(100vh - 320px)" :settings="settings">
        <template>
            <v-card v-for="(item, index) in items" :key="item.index" class="eais__list mb-1 py-1">
                <v-container fluid py-3>
                    <v-layout row wrap>

                      <v-flex md5>
                        <span class="body-1">{{item.data.name}} {{item.data.mName}} {{item.data.sName}}</span>
                      </v-flex>
                      <v-flex md3>
                        <span class="body-1">дата приглашения: {{item.data.dateInvite}}</span>
                      </v-flex>
                      <v-flex md3>
                        <span class="body-1">дата участия: {{item.data.dateEvent}}</span>
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
            <v-card-title class="headline">Граждане</v-card-title>

            <v-container fluid grid-list-xl>
                <v-layout row wrap>

                  <v-flex md4>
                    <v-text-field
                      label="Фамилия"
                    ></v-text-field>
                  </v-flex>

                  <v-flex md4>
                    <v-text-field
                      label="Имя"
                    ></v-text-field>
                  </v-flex>

                  <v-flex md4>
                    <v-text-field
                      label="Отчество"
                    ></v-text-field>
                  </v-flex>

                  <v-flex md4>
                    <v-autocomplete
                      label="ЛДПГУ"
                      :no-data-text="noDataText"
                    ></v-autocomplete>
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
                          label="Дата приглашения"
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
                          label="Дата участия"
                          prepend-icon="event"
                          readonly
                        ></v-text-field>
                        <v-date-picker v-model="date02" no-title scrollable @input="$refs.dateMenu02.save(date02)" :first-day-of-week="1" locale="ru-ru">
                        </v-date-picker>
                      </v-menu>
                    </v-flex>

                    <v-flex md2>
                      <v-switch
                        label="Участие"
                        v-model="switch1"
                      ></v-switch>
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
          name: 'Иван',
          mName: 'Владимирович',
          sName: 'Спиривайлов',
          szn: '20',
          dateInvite: '10.05.2018',
          dateEvent: '10.10.2018'
        }
      }, {
        data: {
          name: 'Рустам',
          mName: 'Владиленович',
          sName: 'Окунев',
          szn: '20',
          dateInvite: '10.05.2018',
          dateEvent: '10.10.2018'
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
