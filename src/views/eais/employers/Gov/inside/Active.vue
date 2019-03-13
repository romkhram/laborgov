<!-- Shopping Cart Widget -->
<template>
<div>
    <vue-perfect-scrollbar style="max-height:calc(100vh - 320px)" :settings="settings">
        <template>
            <v-card v-for="(item, index) in items" :key="item.index" class="eais__list mb-1 py-1">
                <v-container fluid py-3>
                    <v-layout row wrap>

                        <v-flex md2>
                            <span class="body-1">Труд / 200 / 21</span>
                        </v-flex>

                        <v-flex md4>
                            <span class="body-1">{{item.data.extraVac}} {{item.data.vacName}}</span>
                        </v-flex>

                        <v-flex md3>
                            <span class="body-1">
                              Мест: {{item.data.vacNum}}, Направлений: 15
                            </span>
                        </v-flex>

                        <v-flex md2>
                          <span class="body-1">
														{{item.data.moneyMin}} &mdash; {{item.data.moneyMax}} &#8381;
													</span>
                        </v-flex>

                        <v-flex md1 py-1>
                          <div class="text-xs-right mrm-4">
                            <v-tooltip left>
                              <v-btn class="my-0" icon @click="requests = true" slot="activator">
                                  <v-icon color="primary">edit</v-icon>
                              </v-btn>
                              <span>Переход к редактированию вакансии</span>
                            </v-tooltip>
                          </div>
                        </v-flex>

                    </v-layout>
                </v-container>
            </v-card>

        </template>
    </vue-perfect-scrollbar>
        <v-snackbar
          v-model="requests"
          auto-height
          vertical
          color="primary"
          top
          class="headline"
        >
          Переход к редактированию вакансии по ID
          <div class="text-xs-right">
            <v-btn flat icon @click="requests = false">
              <v-icon>close</v-icon>
            </v-btn>
          </div>
    </v-snackbar>

    <v-btn color="grey lighten-1" dark absolute bottom left fab small @click="newItem" style="margin-bottom: 31px;">
      <v-icon>add</v-icon>
    </v-btn>

		<v-dialog v-model="editNewDialog" max-width="1100">
        <v-card>
            <v-card-title class="headline">Вакантные рабочие места</v-card-title>

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
                      <v-autocomplete
                        label="Производная должность"
                        :no-data-text="noDataText"
                      ></v-autocomplete>
                    </v-flex>

                    <!-- <v-flex md4>
                      <v-text-field
						            hint="при отсутствии в справочнике"
						            persistent-hint
                        label="Наименование профессии"
                      ></v-text-field>
                    </v-flex> -->

                    <v-flex md4>
                      <v-text-field
                        label="Специализация"
                      ></v-text-field>
                    </v-flex>




                    <v-flex md4>
                      <v-text-field
                        label="Квалификация / Разряд"
                      ></v-text-field>
                    </v-flex>

                    <!-- <v-flex md4>
                      <v-autocomplete
                        label="Образоване"
                        :no-data-text="noDataText"
                      ></v-autocomplete>
                    </v-flex> -->

                    <v-flex md4>
                      <v-text-field
                        label="Количество РМ"
                      ></v-text-field>
                    </v-flex>

                    <v-flex md4>
                      <v-autocomplete
                        label="Характер работы"
                        :no-data-text="noDataText"
                      ></v-autocomplete>
                    </v-flex>

                    <v-flex md4>
                      <v-text-field
                        label="Зарплата"
                      ></v-text-field>
                    </v-flex>


                    <v-flex md4>
                      <v-autocomplete
                        label="ОКПДР"
                        :no-data-text="noDataText"
                      ></v-autocomplete>
                    </v-flex>

										<v-flex md4>
											<v-switch class="shrink ml-3"
												label="Госуслуга"
											></v-switch>
										</v-flex>

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
    requests: false,
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
          vacName: 'Специалист',
          vacSpec: '',
          extraVac: 'Младший',
          vacSpec: '',
          VacCategory: '',
          moneyMin: '10 000',
          moneyMax: '25 000',
          reason: [],
          vacNum: '10'
        }
      }, {
        data: {
          okved: '15.81',
          vacName: 'Директора департамента',
          vacSpec: '',
          extraVac: 'Заместитель',
          vacSpec: '',
          VacCategory: '',
          moneyMin: '50 000',
          moneyMax: '64 000',
          reason: ['Отсутствие', 'в РФ'],
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
