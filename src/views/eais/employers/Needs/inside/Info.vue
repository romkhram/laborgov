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
            <span v-if="oneItem.data.cz_cod !== null">{{ emplCenters[emplCenters.findIndex(x => x.emplCenterId === oneItem.data.cz_cod)].comboVal }}</span>
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
          <!-- <span class="body-1">Примечание</span>
          <span class="subheading font-weight-medium">{{oneItem.data.stat_comm}}</span> -->
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
          <span class="body-1">Заявлено <span class="subheading font-weight-medium">{{declared}}</span>
            <!-- , Активно <span class="subheading font-weight-medium">{{oneItem.data.test}}</span>,
            Закрыто <span class="subheading font-weight-medium">{{oneItem.data.test}}</span> -->
          </span>
        </v-flex>

        <v-flex md12 py-1>
            <!-- <v-divider class="mb-0"></v-divider> -->
            <v-divider></v-divider>
        </v-flex>

        <v-flex md11 py-1>
          <span class="body-1">Адрес</span>
          <span class="subheading font-weight-medium">{{oneItem.data.vac_adress}}</span>
        </v-flex>

        <v-flex md11 py-1>
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
            <v-card-title class="headline">Потребность</v-card-title>

            <v-container fluid grid-list-xl>
                <v-layout row wrap>

                  <v-flex md6>
                    <v-textarea
                      v-model="oneItem.data.vac_adress"
                      label="Адрес"
                    ></v-textarea>
                  </v-flex>

                  <v-flex md6>
                    <v-textarea
                      v-model="oneItem.data.vac_way"
                      label="Проезд"
                    ></v-textarea>
                  </v-flex>

                  <v-flex md12 class="required">
                    <v-autocomplete
                      :no-data-text="noDataText"
                      label="Представитель работодателя (список из контактов предприятия)"
                      :items="vacContacts"
                      :rules="[fieldRules.required]"
                      item-text="comboVal"
                      item-value="contactId"
                      v-model="oneItem.data.c_contact"
                    ></v-autocomplete>
                  </v-flex>

                  <v-flex md12>
                    <v-textarea
                      <v-textarea
                        v-model="oneItem.data.adinfcl"
                        label="Дополнительная информация о вакансии"
                    ></v-textarea>
                  </v-flex>

                  <v-flex md3 class="required">
                    <v-autocomplete
                      :no-data-text="noDataText"
                      label="Статус обработки"
                      :items="status"
                      item-text="name"
                      item-value="code"
                      v-model="oneItem.data.stat"
                    ></v-autocomplete>
                  </v-flex>

                  <v-flex md3 class="required">
                    <v-autocomplete
                      :items="emplCenters"
                      item-text="comboVal"
                      item-value="emplCenterId"
                      v-model="oneItem.data.cz_cod"
                      label="АЗН"
                    ></v-autocomplete>
                  </v-flex>

                  <v-flex md3>
                    <v-text-field
                      v-model="oneItem.data.num_reg"
                      label="Номер регистрации"
                    ></v-text-field>
                  </v-flex>

                    <v-flex md3>
                      <date-picker label="Дата регистрации" v-model="oneItem.data.date_reg"></date-picker>
                    </v-flex>

                </v-layout>
            </v-container>

            <v-card-actions>
              <div class="ml-3">
                <p class="requiredNote primary--text">	&mdash; обязательные поля</p>
              </div>
                <v-spacer></v-spacer>

                <v-btn color="primary" :disabled="allFields" flat="flat" @click="editNewDialog = false">
                    Продолжить
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
import rules from "@/mixins/rules";
export default {
	props: ['oneItem'],
  mixins: [editmain, rules],
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
    allFields() {
      if (this.oneItem.data.stat !== null && this.oneItem.data.stat !== undefined &&
        this.oneItem.data.cz_cod !== null && this.oneItem.data.cz_cod !== undefined &&
        this.oneItem.data.c_contact !== null && this.oneItem.data.c_contact !== undefined
      ) {
        return false;
      } else {return true}
    },
    declared() {
      var declared = null;
      var declaredArr = this.oneItem.linkedData.mpArr_cl_potrv_ref;
      if (declaredArr.length > 0) {
        declaredArr.forEach(function(el, i, arr) {
          console.log('el.data.start_free');
          console.log(el.data.start_free);
          declared = declared + el.data.start_free;
        });
      }
      return declared;
    },
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
