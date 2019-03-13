<!-- Shopping Cart Widget -->
<template>
<div>
    <vue-perfect-scrollbar style="max-height:calc(100vh - 320px)" :settings="settings">
        <template>
            <v-card v-for="(item, index) in items" :key="item.index" class="eais__list mb-1 py-1">
                <v-container fluid py-3>
                    <v-layout row wrap>

											<v-flex md3 class="row">
				                <span class="body-1">Иванов Иван Иванович</span>
				              </v-flex>

				              <v-flex md1>
				                <span class="body-1">МУЖ</span>
				              </v-flex>

				              <v-flex md1>
				                <span class="body-1">26 лет</span>
				              </v-flex>

				              <v-flex md3>
				                <span class="body-1" >Слесарь по ремонту</span>
				              </v-flex>

				              <v-flex md1>
				                <span class="body-1">ЗП - 22 398 ₽</span>
				              </v-flex>

				              <v-flex md2>
				                <span class="body-1 right" >Уволен: 22.11.2018</span>
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

									<v-flex md6 py-1>
			              <v-label
			              >Основное:</v-label>
			            </v-flex>
			            <v-flex md6 py-1>
			              <v-label
			              >Район регистрации по месту жительства:</v-label>
			            </v-flex>
			            <v-flex md4 py-1>
			              <v-text-field
			                label="ФИО"
			              ></v-text-field>
			            </v-flex>

			            <v-flex md1 py-1>
			              <v-select
			                label="Пол"
			                :items='sex'
			              ></v-select>
			            </v-flex>

			            <v-flex md1 py-1>
			              <v-text-field
			                label="Возраст"  mask= '###'
			              ></v-text-field>
			            </v-flex>

			            <v-flex md3 py-1>
			              <v-text-field
			               label="Документ"
			              >:</v-text-field>
			            </v-flex>

			            <v-flex md3  py-1>
			              <v-autocomplete label="Справочник" :no-data-text="noDataText"></v-autocomplete>
			            </v-flex>

			            <v-flex md6 py-1>
			              <v-label
			              >Образование:</v-label>
			            </v-flex>

			            <v-flex md6 py-1>
			              <v-label
			              >Профессия:</v-label>
			            </v-flex>

			            <v-flex md3 py-1>
			              <v-text-field
			               label="Документ"
			              >:</v-text-field>
			            </v-flex>

			            <v-flex md3  py-1>
			              <v-select label="Справочник"
			                :items='professions'></v-select>
			            </v-flex>

			            <v-flex md2 py-1>
			              <!-- Рома тут надо сделать чтобы то что заполняли в поле "документ" или "ОКПДТР", автоматом подставлялось в строку поиска в поле "Справочник". Я пыталась))) -->
			              <v-text-field v-model='docProfession'
			               label="Документ" @input='spr.text="docProfession"'
			              >:</v-text-field>
			            </v-flex>

			            <v-flex md3  py-1>
			              <v-autocomplete v-model= 'spr' label="Справочник"  :no-data-text="noDataText"></v-autocomplete>
			            </v-flex>

			            <v-flex md1  py-1>
			              <v-text-field label="окпдтр" :no-data-text="noDataText"></v-text-field>
			            </v-flex>

			            <v-flex md6 py-1>
			              <v-text-field
			                label="Особ.катег.(инвалид и др.)"
			              ></v-text-field>
			            </v-flex>

			            <v-flex md3 py-1>
			              <v-text-field
			                label="Зарплата, ₽"
			              ></v-text-field>
			            </v-flex>

			            <v-flex md3 py-1>
			              <date-picker timeLabel="Уволен"></date-picker>
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
          vacSpec: 'по кухне',
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
          vacSpec: 'по кухне',
          VacCategory: '',
          moneyMin: '10 000',
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
