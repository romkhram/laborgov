<!-- Shopping Cart Widget -->
<template>
<div>
  <v-container fluid class="eais__readerform">
      <v-layout row wrap>

        <v-flex md3 py-1>
          <span class="body-1">Тип</span>
          <span class="subheading font-weight-medium">
            <span v-if="oneItem.data.fok_cod !== null">{{sprFormSubmissions[sprFormSubmissions.findIndex(x => x.codeInGroup === oneItem.data.fok_cod)].comboVal }}</span>
          </span>
        </v-flex>

        <v-flex md3 py-1>
          <span class="body-1">Дата подачи</span>
          <span class="subheading font-weight-medium">
            <span v-if="oneItem.data.date_doc !== null">{{ forTime(oneItem.data.date_doc) }}</span>
          </span>
        </v-flex>

        <v-flex md6 py-1>
          <span class="body-1">АЗН</span>
          <span class="subheading font-weight-medium">
            <span v-if="oneItem.data.cz_cod !== null">{{ emplCenters[emplCenters.findIndex(x => x.cz_cod === oneItem.data.emplCenterId)].shortName }}</span>
          </span>
        </v-flex>

        <v-flex md3 py-1 my-3>
          <span class="body-1">Статус обработки</span>
          <span class="subheading font-weight-medium">
            <span v-if="oneItem.data.stat !== null">{{ status[status.findIndex(x => x.code === oneItem.data.stat)].comboVal }}</span>
          </span>
          <!-- <span class="subheading font-weight-medium">{{oneItem.data.test}}</span> -->
        </v-flex>


        <v-flex md3 py-1 my-3>
          <span class="body-1">Дата ввода</span>
          <span class="subheading font-weight-medium">
            <span v-if="oneItem.data.creationDate !== null">{{ forTime(oneItem.data.creationDate) }}</span>
          </span>
        </v-flex>

        <v-flex md6 py-1 my-3>
          <span class="body-1">Примечание</span>
          <span class="subheading font-weight-medium">{{oneItem.data.stat_comm}}</span>
        </v-flex>

        <v-flex md3 py-1>
          <span class="body-1">Дата регистрации</span>
          <span class="subheading font-weight-medium">
            <span v-if="oneItem.data.date_reg !== null">{{ forTime(oneItem.data.date_reg) }}</span>
          </span>
        </v-flex>

        <v-flex md3 py-1>
          <span class="body-1">Номер регистрации</span>
          <span class="subheading font-weight-medium">{{oneItem.data.num_reg}}</span>
        </v-flex>

        <v-flex md6 py-1>
          <span class="body-1">Рабочих мест</span>
          <span class="body-1">Заявлено <span class="subheading font-weight-medium">{{oneItem.data.test}}</span>,
            Активно <span class="subheading font-weight-medium">{{oneItem.data.test}}</span>,
            Закрыто <span class="subheading font-weight-medium">{{oneItem.data.test}}</span>
          </span>
        </v-flex>

        <v-flex md12 py-1>
            <!-- <v-divider class="mb-0"></v-divider> -->
            <v-divider></v-divider>
        </v-flex>

        <v-flex md6 py-1>
          <span class="body-1">Адрес</span>
          <span class="subheading font-weight-medium">{{oneItem.data.vac_adress}}</span>
        </v-flex>

        <v-flex md6 py-1>
          <span class="body-1">Проезд</span>
          <span class="subheading font-weight-medium">{{oneItem.data.vac_way}}</span>
        </v-flex>

        <v-flex md11 py-1 my-3>
          <span class="body-1">ФИО представителя работодателя</span>
          <span class="subheading font-weight-medium">
            <span v-if="oneItem.data.c_contact !== null">{{ vacContacts[vacContacts.findIndex(x => x.contactId === oneItem.data.c_contact)].comboVal }}</span>
          </span>
        </v-flex>

        <v-flex md11 py-1>
          <span class="body-1">Дополнительная информация о вакансии</span>
          <span class="subheading font-weight-medium">{{oneItem.data.adinfcl}}</span>
        </v-flex>

          <v-flex md1 py-1>
              <div class="text-xs-right mrm-4">
                  <v-btn class="ma-0" icon @click="editNewDialog = true">
                      <v-icon color="primary">edit</v-icon>
                  </v-btn>
              </div>
          </v-flex>

      </v-layout>
  </v-container>

  <!-- <v-btn color="grey lighten-1" dark absolute bottom left fab small @click="newItem" style="margin-bottom: 31px;">
    <v-icon>add</v-icon>
  </v-btn> -->

    <v-dialog v-model="editNewDialog" max-width="1100">
        <v-card>
            <v-card-title class="headline">Результат</v-card-title>

            <v-container fluid grid-list-xl>
                <v-layout row wrap>

                  <v-flex md6>
                    <v-textarea
                      label="Адрес"
                    ></v-textarea>
                  </v-flex>

                  <v-flex md6>
                    <v-textarea
                      label="Проезд"
                    ></v-textarea>
                  </v-flex>

                  <v-flex md12>
                    <v-autocomplete
                      :no-data-text="noDataText"
                      label="ФИО представителя работодателя (список из Контакты Предприятия)"
                      :items="vacContacts"
                      item-text="comboVal"
                      item-value="contactId"
                      v-model="oneItem.data.c_contact"
                    ></v-autocomplete>
                  </v-flex>

                  <v-flex md12>
                    <v-textarea
                      label="Дополнительная информация о вакансии"
                    ></v-textarea>
                  </v-flex>

                  <v-flex md3>
                    <v-text-field
                      label="Входящий номер"
                    ></v-text-field>
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
                          label="Дата регистрации"
                          prepend-icon="event"
                          readonly
                        ></v-text-field>
                        <v-date-picker v-model="date01" no-title scrollable @input="$refs.dateMenu01.save(date01)" :first-day-of-week="1" locale="ru-ru">
                        </v-date-picker>
                      </v-menu>
                    </v-flex>

                </v-layout>
            </v-container>

            <v-card-actions>
                <v-spacer></v-spacer>

                <v-btn v-if="!isNew" color="primary" flat="flat" @click="editNewDialog = false">
                    Продолжить
                </v-btn>

                <v-btn v-if="isNew" color="primary" flat="flat" @click="editNewDialog = false">
                    Отмена
                </v-btn>

                <v-btn v-if="isNew" color="primary" flat="flat" @click="createItemVal(items, 'companyResult')">
                    Создать
                </v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>

</div>
</template>

<style>
span.body-1:first-letter {text-transform: capitalize;}
.eais__readerform .body-1 {color: rgba(0, 0, 0, 0.50);}
.eais__readerform .subheading:empty::before {content: "\2014";}
.eais__readerform .subheading {color: #464D69;}
</style>

<script>
import editmain from "@/mixins/editmain";
export default {
	props: ['oneItem'],
  mixins: [editmain],
  data: () => ({
		status: [
      { code: 0, name: 'Не принято', comboVal: '0: Не принято'},
      { code: 1, name: 'Принято', comboVal: '1: Принято'},
      { code: 2, name: 'Отклонено', comboVal: '2: Отклонено'}
    ],
    noDataText: 'Нет данных',
  }),
	mounted() {
		this.getContacts();
	},
  computed: {
    emplCenters() {
      return this.$store.state.eais.stateHandbooks.emplCenters;
    },
		vacContacts() {
			console.log('in Vac');
			console.log(this.$store.state.extranotes.extraHandbooks.vacContacts);
			return this.$store.state.extranotes.extraHandbooks.vacContacts;
		},
    sprFormSubmissions() {
      return this.$store.state.eais.stateHandbooks.sprFormSubmissions;
    },
    sl_profs() {
      return this.$store.state.eais.stateHandbooks.sl_profs;
    },
		sprPositions () {
			return this.$store.state.eais.stateHandbooks.sprPositions;
		}
  },
  methods: {
		getContacts() {
			this.$store.dispatch('getVacContacts');
		}
  }
};
</script>
