<!-- Shopping Cart Widget -->
<template>
<div>
  <v-container fluid class="eais__readerform">
      <v-layout row wrap>

        <!-- <v-flex md3 py-1>
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
        </v-flex> -->

        <!-- <v-flex md3 py-1>
          <span class="body-1">Номер регистрации</span>
          <span class="subheading font-weight-medium">{{oneItem.data.num_reg}}</span>
        </v-flex> -->

        <!-- <v-flex md6 py-1>
          <span class="body-1">Рабочих мест</span>
          <span class="body-1">Заявлено <span class="subheading font-weight-medium">{{declared}}</span>
            , Активно <span class="subheading font-weight-medium">{{oneItem.data.test}}</span>,
            Закрыто <span class="subheading font-weight-medium">{{oneItem.data.test}}</span>
          </span>
        </v-flex> -->

        <v-flex md12 py-1 mb-3>
            <span class="body-1">Название мероприятия</span>
            <span class="subheading font-weight-medium">{{oneItem.data.fairName}}</span>
        </v-flex>
        <v-flex md12 my-0 py-1 class="body-1">
            <v-divider></v-divider>
        </v-flex>
        <v-flex md4 py-1>
            <span class="body-1">Вид мероприятия</span>
            <span class="subheading font-weight-medium">
              <span v-if="oneItem.data.fairTypeId !== null">{{sprSOBVIDs.find(x => x.codeInGroup === oneItem.data.fairTypeId).fullName }}</span>
            </span>
        </v-flex>
        <v-flex md4 py-1>
            <span class="body-1">Детализация мероприятия</span>
            <span class="subheading font-weight-medium">
              <span v-if="oneItem.data.fairDetailId !== null">{{sprSOBTYPs.find(x => x.codeInGroup === oneItem.data.fairDetailId).fullName }}</span>
            </span>
        </v-flex>
        <v-flex md4 py-1>
            <span class="body-1">Контактное лицо</span>
            <span class="subheading font-weight-medium">{{oneItem.data.contactName}}</span>
        </v-flex>

        <v-flex md12 my-0 py-1 class="body-1">
            <v-divider></v-divider>
        </v-flex>

        <v-flex md8 py-1>
            <span class="body-1">Место и время проведения мероприятия</span>
            <span class="subheading font-weight-medium">{{oneItem.data.note}}</span>
        </v-flex>
        <v-flex md4 py-1>
            <span class="body-1">Численность граждан, посетивших мероприятие</span>
            <span class="body-1">
              <span class="subheading font-weight-medium">{{oneItem.data.numberOfVisitors}}</span> из них трудоустроенных <span class="subheading font-weight-medium">{{oneItem.data.numberOfEmployed}}</span>
            </span>
        </v-flex>

        <v-flex md12 my-0 py-1 class="body-1">
            <v-divider></v-divider>
        </v-flex>

        <v-flex md2 py-1>
            <span class="body-1">Событие с</span>
            <span class="subheading font-weight-medium">{{ forTime(oneItem.data.startDate) }}</span>
        </v-flex>


        <v-flex md2 py-1>
            <span class="body-1">по</span>
            <span class="subheading font-weight-medium">{{ forTime(oneItem.data.endDate) }}</span>
        </v-flex>


        <v-flex md4 py-1>
            <span class="body-1">АЗН статистического учета мероприятия</span>
            <span class="subheading font-weight-medium">
              <span v-if="oneItem.data.statEmplCenterId !== null">{{ emplCenters.find(x => x.emplCenterId === oneItem.data.statEmplCenterId).shortName }}</span>
            </span>
        </v-flex>


        <v-flex md3 py-1>
            <span class="body-1">Организатор</span>
            <span class="subheading font-weight-medium">
              <span v-if="oneItem.data.emplCenterId !== null">{{ emplCenters.find(x => x.emplCenterId === oneItem.data.emplCenterId).shortName }}</span>
            </span>
        </v-flex>

          <v-flex md1 py-1>
              <div class="text-xs-right mrm-4">
                  <v-btn class="ma-0" icon @click="editDialog">
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
            <v-card-title class="headline">Информация</v-card-title>

            <v-container fluid grid-list-xl>
                <v-layout row wrap>

                  <v-flex md12 class="required">
                    <v-text-field
                      :rules="[fieldRules.required]"
                    	v-model="oneItem.data.fairName"
                      label="Название мероприятия"
                    ></v-text-field>
                  </v-flex>

                  <!-- <v-flex md6>
                    <v-autocomplete
                    	v-model="oneItem.data.fairTypeId"
                      label="Вид мероприятия"
                      :no-data-text="noDataText"
                    ></v-autocomplete>
                  </v-flex> -->
                  <v-flex md6 class="required">
                    <v-autocomplete
                    v-model="oneItem.data.fairTypeId"
                    :rules="[fieldRules.required]"
                    :items="sprSOBVIDs"
                    item-text="fullName"
                    item-value="codeInGroup"
                    label="Вид мероприятия"
                    :no-data-text="noDataText"
                    ></v-autocomplete>
                  </v-flex>

                  <v-flex md6 class="required">
                    <v-autocomplete
                    v-model="oneItem.data.fairDetailId"
                    :rules="[fieldRules.required]"
                    :items="sprSOBTYPs"
                    item-text="fullName"
                    item-value="codeInGroup"
                    label="Детализация мероприятия"
                    :no-data-text="noDataText"
                    ></v-autocomplete>
                  </v-flex>

                  <!-- <v-flex md6>
                    <v-autocomplete
                    	v-model="oneItem.data.fairDetailId"
                      label="Детализация мероприятия"
                      :no-data-text="noDataText"
                    ></v-autocomplete>
                  </v-flex> -->

                  <v-flex md12>
                    <v-text-field
                    	v-model="oneItem.data.note"
                      label="Место и время проведения мероприятия"
                    ></v-text-field>
                  </v-flex>

									<v-flex md6>
                    <v-text-field
                    	v-model="oneItem.data.contactName"
                      label="Контактное лицо"
                    ></v-text-field>
                  </v-flex>

									<v-flex md3>
                    <v-text-field
                    	v-model="oneItem.data.numberOfVisitors"
                      label="Граждан, посетивших"
                    ></v-text-field>
                  </v-flex>

									<v-flex md3>
                    <v-text-field
                    	v-model="oneItem.data.numberOfEmployed"
                      label="Трудоустроенных"
                    ></v-text-field>
                  </v-flex>

                  <!-- <v-flex md6>
                    <v-textarea
                      v-model="oneItem.data.vac_adress"
                      label="Адрес"
                    ></v-textarea>
                  </v-flex>

                  <v-flex md3 class="required">
                    <v-autocomplete
                      :items="emplCenters"
                      item-text="comboVal"
                      item-value="emplCenterId"
                      v-model="oneItem.data.cz_cod"
                      label="АЗН"
                    ></v-autocomplete>
                  </v-flex> -->

                  <v-flex md6 class="required">
                    <v-autocomplete
                    v-model="oneItem.data.statEmplCenterId"
                    :rules="[fieldRules.required]"
                    :items="emplCenters"
                    item-text="shortName"
                    item-value="emplCenterId"
                    label="АЗН статистического учета мероприятия"
                    :no-data-text="noDataText"
                    ></v-autocomplete>
                  </v-flex>

                  <v-flex md6 class="required">
                    <v-autocomplete
                    v-model="oneItem.data.emplCenterId"
                    :rules="[fieldRules.required]"
                    :items="emplCenters"
                    item-text="shortName"
                    item-value="emplCenterId"
                    label="Организатор"
                    :no-data-text="noDataText"
                    ></v-autocomplete>
                  </v-flex>

                  <v-flex md3 class="required">
                    <date-picker
                    :rules="[fieldRules.required]" label="Событие с" v-model="oneItem.data.startDate"></date-picker>
                  </v-flex>

                  <v-flex md3>
                    <date-picker :min="oneItem.data.startDate" label="по" v-model="oneItem.data.endDate"></date-picker>
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
		// this.getContacts();
	},
  computed: {
    allFields() {
      if (this.oneItem.data.fairTypeId !== null && this.oneItem.data.fairTypeId !== undefined &&
        this.oneItem.data.fairDetailId !== null && this.oneItem.data.fairDetailId !== undefined &&
        this.oneItem.data.statEmplCenterId !== null && this.oneItem.data.statEmplCenterId !== undefined &&
        this.oneItem.data.emplCenterId !== null && this.oneItem.data.emplCenterId !== undefined &&
        this.oneItem.data.startDate !== null && this.oneItem.data.startDate !== undefined &&
        this.oneItem.data.fairName
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
		// vacContacts() {
		// 	console.log('in Vac');
		// 	console.log(this.$store.state.extranotes.extraHandbooks.vacContacts);
		// 	return this.$store.state.extranotes.extraHandbooks.vacContacts;
		// },
    sprFormSubmissions() {
      return this.$store.state.eais.stateHandbooks.sprFormSubmissions;
    },
    sl_profs() {
      return this.$store.state.eais.stateHandbooks.sl_profs;
    },
		sprPositions () {
			return this.$store.state.eais.stateHandbooks.sprPositions;
		},
		sprSOBTYPs() {
			return this.$store.state.eais.stateHandbooks.sprSOBTYPs;
		},
		sprSOBVIDs() {
			return this.$store.state.eais.stateHandbooks.sprSOBVIDs;
		}
  },
  // methods: {
	// 	getContacts() {
	// 		this.$store.dispatch('getVacContacts');
	// 	}
  // }
};
</script>
