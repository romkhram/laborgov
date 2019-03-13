<template lang="html">
  <div class="d-flex">
    <v-text-field
      flat
      solo
      :disabled="searchLoading"
      @click:append="extraSearch = true"
      append-icon="arrow_drop_down"
      placeholder="Поиск"
      class="eais-search-bar"
      v-model="mainSearchString"
      @keyup.enter="letSearch(mainSearch)"
    ></v-text-field>
    <v-btn flat icon :loading="searchLoading" @click="letSearch(mainSearch)" color="primary">
      <v-icon>search</v-icon>
    </v-btn>

    <v-menu v-model="extraSearch" offset-y :close-on-content-click="false" :position-y="60" :nudge-right="nudgeRight" max-width="800">
      <v-card>
        <v-container grid-list-md style="width:800px">

          <v-form ref="form" lazy-validation >

            <v-layout row wrap>

                <v-flex md12>
                  <v-autocomplete clearable
                    :items="azns"
                    item-text="txt"
                    item-value="code"
                    v-model="iogvcode"
                    label="АЗН"
                  ></v-autocomplete>
                </v-flex>

                <v-flex md4>
                  <v-text-field label="Фамилия" v-model="plastname"></v-text-field>
                </v-flex>

                <v-flex md4>
                  <v-text-field label="Имя" v-model="pfirstname"></v-text-field>
                </v-flex>

                <v-flex md4>
                  <v-text-field label="Отчество" v-model="pmiddlename"></v-text-field>
                </v-flex>

                <v-flex md12>
                  <v-text-field label="Вид услуги" v-model="appname"></v-text-field>
                </v-flex>

                <!-- <v-flex md12 mt-5>
                  <v-select
                    :no-data-text="noDataText"
                    label="Вид услуги"
                    hide-details
                  ></v-select>
                </v-flex> -->

                <!-- <v-flex md12>
                  <v-autocomplete
                    label="ЦЗН"
                    :no-data-text="noDataText"
                    hide-details
                  ></v-autocomplete>
                </v-flex> -->

                <!-- <v-flex md12>
                  <v-autocomplete
                    label="Место проведения (окно, сотрудник)"
                    :no-data-text="noDataText"
                    hide-details
                  ></v-autocomplete>
                </v-flex> -->

                <!-- <v-flex md6>
                  <v-autocomplete
                    label="Специалист"
                    :no-data-text="noDataText"
                    hide-details
                  ></v-autocomplete>
                </v-flex> -->

                <v-flex md3>
                  <date-picker v-model="applicationDateFrom" label="Подано с"></date-picker>
                </v-flex>
                <v-flex md3>
                  <date-picker v-model="applicationDateTo" :min="statusDateFrom" label="по"></date-picker>
                </v-flex>

                <v-flex md3>
                  <date-picker v-model="statusDateFrom" label="Принято с"></date-picker>
                </v-flex>
                <v-flex md3>
                  <date-picker v-model="statusDateTo" :min="statusDateFrom" label="по"></date-picker>
                </v-flex>
<!--     applicationDateFrom: null, // дата от
    applicationDateTo: null, // дата до -->



                <!-- <v-flex md9>
                  <v-text-field
                    label="Ф.И.О."
                    hide-details
                  ></v-text-field>
                </v-flex> -->

                <!-- <v-flex md3>
                  <date-picker label="Дата рождения"></date-picker>
                </v-flex>

                <v-flex md3>
                  <date-picker label="Заявл. подано с"></date-picker>
                </v-flex>

                <v-flex md3>
                  <date-picker label="по"></date-picker>
                </v-flex> -->


                <v-flex md6>
                  <v-text-field label="СНИЛС" v-model="psnils"></v-text-field>
                </v-flex>

                <v-flex md6 pl-5>
                  <v-switch
                    label="Только не отработанные заявления"
                    v-model="statusSwith"
                  ></v-switch>
                </v-flex>

                <!-- <v-flex md6>
                  <v-switch class="shrink" v-model="status" label="Только не отработанные заявления"></v-switch>
                </v-flex> -->

              <v-flex md12 text-md-right>
                <div>
                  <v-btn dark color="primary" @click="letSearch(searchFields)">Найти</v-btn>
                </div>
              </v-flex>

            </v-layout>
          </v-form>
        </v-container>
      </v-card>
    </v-menu>
  </div>
</template>

<script>
import search from "@/mixins/search";
export default {
  mixins: [search],
  beforeMount() {
    this.getHandbook({
      path:	'sprRegSosts', code: 'typ_cod', name: 'typ_name'
    });
    this.getHandbook({
      path:	'emplCenters', code: 'emplCenterId', name: 'shortName'
    });
    this.getHandbook({
      path:	'sprPersStatuss', code: 'typ_cod', name: 'typ_name'
    });
    // this.getHandbook({
    //   path:	'sl_profs', code: 'prof_cod', name: 'prof_name'
    // });
    // this.getHandbook('test_error');
    // this.getHandbook('test_error2');
    // this.getHandbook('test_error3');
  },
  updated() {
  },
  props: ['drawer'],
  data: () => ({
    azns: [
      {code: "azn10", txt: "АЗН Василеостровского р-на"},
      {code: "azn20", txt: "АЗН Выборгского района"},
      {code: "azn40", txt: "АЗН Приморского района"},
      {code: "azn50", txt: "АЗН Калининского района"},
      {code: "azn60", txt: "АЗН Кировского района"},
      {code: "azn70", txt: "АЗН Колпинского района"},
      {code: "azn100", txt: "АЗН Московского района"},
      {code: "azn110", txt: "АЗН Невского района"},
      {code: "azn120", txt: "АЗН Адмиралтейского района"},
      {code: "azn130", txt: "АЗН Петроградского района"},
      {code: "azn140", txt: "АЗН Петродворцового района"},
      {code: "azn150", txt: "АЗН Пушкинского района"},
      {code: "azn160", txt: "АЗН Курортного района"},
      {code: "azn170", txt: "АЗН Центрального района"},
      {code: "azn180", txt: "АЗН Фрунзенского района"},
      {code: "azn190", txt: "АЗН Кронштадтского района"},
      {code: "azn200", txt: "АЗН Красносельского района"},
      {code: "azn210", txt: "АЗН Красногвардейского р-н"},
      {code: "azn230", txt: "АЗН Ломоносова"},
    ],
    statusSwith: false,
    extraSearch: false,
    mainSearchString: '',
    appname: '', // Имя типа обращения
    plastname: '', // Фамилия
    pfirstname: '', // Имя
    pmiddlename: '', // Отчество
    pbirth: null, // Дата рождения
    statusDateFrom: null, // дата от
    statusDateTo: null, // дата до
    applicationDateFrom: null, // дата от
    applicationDateTo: null, // дата до
    psnils: '', // СНИЛС
    // statusdate: '', // Имя типа обращения
    // appname: '', // Имя типа обращения
    // appname: '', // Имя типа обращения
    iogvcode: null,
    path: 'api/v1/gu_requests/search',
  }),
  computed: {
    status() {
      if (this.statusSwith) {
        return [10, 15, 16];
      } else {
        return null;
      }
    },
    userData() {
      return this.$store.state.eais.userData;
    },
    searchLoading() {
      return this.$store.state.eais.searchLoading
    },
    nudgeRight() {
      console.log(this.drawer);
      if (this.drawer) {
        return 372;
      } else {
        return 72;
      }
    },
    searchFields() {
      const searchFields =  {
        "offset": 0,
        "limit": 100,
        "attrs": [],
        "filter": {
          "and": [
            // fam: '',
            // nam: '',
            // famn: '',
            // spens: '',
            // pers_num: '',
            this.cond({
              attr: "appname",
              type: "like"
            }),
            this.cond({
              attr: "plastname",
              type: "like"
            }),
            this.cond({
              attr: "pfirstname",
              type: "like"
            }),
            this.cond({
              attr: "pmiddlename",
              type: "like"
            }),
            this.cond({
              attr: "psnils",
              type: "eq"
            }),
            this.cond({
              attr: "iogvcode",
              type: "eq"
            }),
            this.condFull({
              attr: "in_date",
              type: "gte",
              data: this.statusDateFrom && String(this.statusDateFrom).replace('T21', 'T00')
            }),
            this.condFull({
              attr: "in_date",
              type: "lte",
              data: this.statusDateTo && String(this.statusDateTo).replace('T21:00:00', 'T23:59:59')
            }),
            this.condFull({
              attr: "applicationdate",
              type: "gte",
              data: this.applicationDateFrom && String(this.applicationDateFrom).replace('T21', 'T00')
            }),
            this.condFull({
              attr: "applicationdate",
              type: "lte",
              data: this.applicationDateTo && String(this.applicationDateTo).replace('T21:00:00', 'T23:59:59')
            }),
            // applicationdate
            this.condFull({
              attr: "status",
              type: "in",
              data: this.status
            }),
            // this.condExists({
            //   attr: "addresses",
            //   existAttr: "fullAddress",
            //   existType: "like",
            //   existName: this.fullAddres.toUpperCase()
            // }),
          ]
        },
        "orders": [
          {"desc":"applicationdate"},
          {"desc":"in_date"}
        ]
      }
      if ( searchFields.filter.and.some( elem => elem.cond ) ) {
        return searchFields
      }
    },
    mainSearch() {
      var searchFields =  {
        "offset": 0,
        "limit": 100,
        "attrs": [],
        "filter": {
          "or": [
            {
              "cond": {
                "attr": "r",
                "eq": Number(this.mainSearchString)
              }
            },
            {
              "cond": {
                "attr": "iogvname",
                "like": this.mainSearchString
              }
            },
            {
              "cond": {
                "attr": "appname",
                "like": this.mainSearchString
              }
            },
            {
              "cond": {
                "attr": "psnils",
                "eq": this.mainSearchString
              }
            },
            {
              "cond": {
                "attr": "pmiddlename",
                "like": this.mainSearchString
              }
            }
          ]
        },
        "orders": [
          {"desc":"applicationdate"},
          {"desc":"in_date"}
        ]
      }
      if (this.mainSearchString.length > 0) {
        return searchFields
      }
    },
    // Handbooks
    emplCenters() {
      return this.$store.state.eais.stateHandbooks.emplCenters
    },
    sprRegSosts() {
      return this.$store.state.eais.stateHandbooks.sprRegSosts
    },
    emplCenters() {
      return this.$store.state.eais.stateHandbooks.emplCenters
    },
    sprPersStatuss() {
      return this.$store.state.eais.stateHandbooks.sprPersStatuss;
    }
  },
  methods: {
    // letSearch(val) {
    //   console.log('перед серчем');
    //   console.log(val);
    //     if(val) {
    //       this.$store.dispatch('searchListItems', {
    //         value: val,
    //         path: 'api/v1/perses/search'
    //       });
    //       this.extraSearch = false;
    //     } else {
    //       console.log("Заполни форму");
    //     }
    // },
    getHandbook(val) {
      this.$store.dispatch('getReferences', val);
    },
    // cond(val) {
    //   var cond = {};
    //   cond.attr = val.attr;
    //   cond[val.type] = this[val.attr];
    //   if (this[val.attr] == null || this[val.attr].length == 0) {
    //     return {};
    //   } else {
    //     return {cond};
    //   }
    // },
    // condExists(val) {
    //   var cond = {};
    //   cond.attr = val.attr;
    //   cond.exists = { cond: {} };
    //   cond.exists.cond.attr = val.existAttr
    //   cond.exists.cond[val.existType] = val.existName
    //   if (val.existName == null || val.existName.length == 0) {
    //     return {};
    //   } else {
    //     return {cond};
    //   }
    // }
  }
}
</script>
