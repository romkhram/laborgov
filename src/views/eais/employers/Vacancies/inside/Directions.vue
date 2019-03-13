<!-- Shopping Cart Widget -->
<template>
<div>
    <vue-perfect-scrollbar style="max-height:calc(100vh - 320px)" :settings="settings">
        <template>
            <v-card v-for="(item, index) in items" :key="item.index" class="eais__list mb-1 py-1">
                <v-container fluid py-3>
                    <v-layout row wrap>

											<v-flex md1 py-1>
												<span class="body-1">{{ item.type }}</span>
											</v-flex>


											<v-flex md3 py-1>
												<span class="body-1">{{ item.customer }}</span>
											</v-flex>

											<v-flex md3 py-1>
												<span class="body-1">Дата выдачи: {{ item.issueDate }}</span>
											</v-flex>

											<v-flex md2 py-1>
												<span class="body-1">Дата закрытия: {{ item.closeDate }}</span>
											</v-flex>

											<v-flex md2 py-1>
												<span class="body-1">{{ item.status }}</span>
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
            <v-card-title class="headline">Вакантные рабочие места</v-card-title>

            <v-container fluid grid-list-xl>
                <v-layout row wrap>

									<v-flex md3 py-1>
										<span class="body-1">Тип:</span>
										<span class="subheading font-weight-medium">{{items[1].type}}</span>
									</v-flex>

									<v-flex md4 py-1>
										<span class="body-1">ФИО:</span>
										<span class="subheading font-weight-medium">{{items[1].customer}}</span>
									</v-flex>


									<v-flex md3 py-1>
										<span class="body-1">Дата выдачи:</span>
										<span class="subheading font-weight-medium">{{items[1].issueDate}}</span>
									</v-flex>

									<v-flex md2 py-1>
										<span class="body-1">Дата закрытия:</span>
										<span class="subheading font-weight-medium">{{items[1].closeDate}}</span>
									</v-flex>

									<v-flex md3 py-1>
										<span class="body-1">Статус:</span>
										<span class="subheading font-weight-medium">{{items[1].status}}</span>
									</v-flex>

									<v-flex md6 py-1>
										<span class="body-1">Данные по отказу:</span>
										<span class="subheading font-weight-medium"></span>
									</v-flex>

									<v-flex md12 py-1>
										<v-divider></v-divider>
								</v-flex>

									<v-flex md12 py-1>
										<v-title class="body-2">Данные по трудоустройству
										</v-title>
									</v-flex>


									<v-flex md3 py-1>
										<span class="body-1">Приказ:</span>
										<span class="subheading font-weight-medium"></span>
									</v-flex>

									<v-flex md4 py-1>
										<span class="body-1">Работа:</span>
										<span class="subheading font-weight-medium"> с {{items[1].issueDate}} по {{items[1].closeDate}}</span>
									</v-flex>

									<v-flex md4 py-1>
										<span class="body-1">Отработал направление:</span>
										<span class="subheading font-weight-medium">Систематика</span>
									</v-flex>

									 <v-flex md12 py-1>
										<v-divider></v-divider>
								</v-flex>

									 <v-flex md3 py-1>
										<span class="body-1">Оформил подтверждение:</span>
										<span class="subheading font-weight-medium"></span>
									</v-flex>

									<v-flex md4 py-1>
										<span class="body-1">Рег №:</span>
										<span class="subheading font-weight-medium">1012222000</span>
									</v-flex>

									 <v-flex md4 py-1>
										<span class="body-1">ID направления:</span>
										<span class="subheading font-weight-medium">1010101212121</span>
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
			{ id: '1', type: 'Справка', customer: 'Кораблев Павел Федорович', issueDate: '25.05.2015', closeDate: '25.05.2015', status: 'Не отработано', detail: '', fio: ''},
		 { id: '1', type: 'Справка', customer: 'Кораблев Павел Федорович', issueDate: '25.05.2015', closeDate: '25.05.2015', status: 'Не отработано', detail: '', fio: ''},
		 { id: '1', type: 'Справка', customer: 'Кораблев Павел Федорович', issueDate: '25.05.2015', closeDate: '25.05.2015', status: 'Не отработано', detail: '', fio: ''},
		 { id: '1', type: 'Справка', customer: 'Кораблев Павел Федорович', issueDate: '25.05.2015', closeDate: '25.05.2015', status: 'Не отработано', detail: '', fio: ''},
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
