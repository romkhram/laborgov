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

              <v-flex md3>
                <date-picker label="Регистрация с"></date-picker>
              </v-flex>

              <v-flex md3>
                <date-picker label="по"></date-picker>
              </v-flex>

                <v-flex md3>
                  <date-picker label="Снятие с учета с"></date-picker>
                </v-flex>

                <v-flex md3>
                  <date-picker label="по"></date-picker>
                </v-flex>

                <v-flex md9>
                  <v-autocomplete
                    label="АЗН"
                    :no-data-text="noDataText"
                    hide-details
                  ></v-autocomplete>
                </v-flex>

                <v-flex md3>
                  <v-select
                    :items="czn"
                    label="Тип ЦЗН"
                    hide-details
                  ></v-select>
                </v-flex>

              <v-flex md12>
                <v-text-field
                  label="Ф.И.О."
                  hide-details
                ></v-text-field>
              </v-flex>

              <v-flex md3>
                <v-text-field
                  label="Дата рождения"
                  hide-details
                ></v-text-field>
              </v-flex>

              <v-flex md3>
                <v-text-field
                  label="ЛДПГУ"
                  hide-details
                ></v-text-field>
              </v-flex>

              <v-flex md3>
                <v-select
                  label="Документ"
                  hide-details
                  :no-data-text="noDataText"
                ></v-select>
              </v-flex>

              <v-flex md3>
                <v-text-field
                  label="Серия №"
                  hide-details
                ></v-text-field>
              </v-flex>

              <v-flex md12>
                <v-text-field
                  label="Адрес"
                  hide-details
                ></v-text-field>
              </v-flex>

              <v-flex md9>
                <v-autocomplete
                  label="Специалист"
                  :no-data-text="noDataText"
                  hide-details
                ></v-autocomplete>
              </v-flex>

              <v-flex md3>
                <v-switch class="shrink ml-3"
                  label="Нет выплат"
                  hide-details
                ></v-switch>
              </v-flex>

              <v-flex md12>
                <v-select
                  :items="status"
                  label="Состояние"
                  multiple
                  hide-details
                ></v-select>
              </v-flex>

              <v-flex md12>
                <v-select
                  :items="card"
                  label="Вид картотеки"
                  multiple
                  hide-details
                ></v-select>
              </v-flex>

              <v-flex md12>
                <div>
                  <v-btn hide-details dark color="primary" @click="letSearch">Найти</v-btn>
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
export default {
  beforeMount() {
    // this.getHandbook({
    //   path:	'emplCenters', code: 'emplCenterId', name: 'shortName'
    // });
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
    extraSearch: false,
    mainSearchString: '',
    longName: '',
    inn: '',
    emplCenterId: '',
    prof: '',
    fullAddres: '',
    ogrn: '',
    kppInn: '',
    companyId: '',
    declarerId: '',
    path: 'api/v1/eaisCompanies/search',
  }),
  computed: {
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
        "limit": 50,
        "attrs": [],
        "filter": {
          "and": [
            this.cond({
              attr: "longName",
              type: "like"
            }),
            this.cond({
              attr: "inn",
              type: "eq"
            }),
            this.cond({
              attr: "emplCenterId",
              type: "eq"
            }),
            this.cond({
              attr: "ogrn",
              type: "eq"
            }),
            this.cond({
              attr: "kppInn",
              type: "eq"
            }),
            this.cond({
              attr: "companyId",
              type: "eq"
            }),
            this.cond({
              attr: "declarerId",
              type: "eq"
            }),
            this.condExists({
              attr: "addresses",
              existAttr: "fullAddress",
              existType: "like",
              existName: this.fullAddres.toUpperCase()
            }),
            // this.searchFullAddress,
          ]
        },
        "orders": [
          {"asc":"longName"},
          {"asc":"emplCenterId"}
        ]
      }
      if ( searchFields.filter.and.some( elem => elem.cond ) ) {
        return searchFields
      }
    },
    mainSearch() {
      var searchFields =  {
        "offset": 0,
        "limit": 50,
        "attrs": [],
        "filter": {
          "or": [
            {
              "cond": {
                "attr": "reg_num",
                "eq": Number(this.mainSearchString)
              }
            },
            {
              "cond": {
                "attr": "name",
                "like": this.mainSearchString
              }
            },
            {
              "cond": {
                "attr": "inn",
                "eq": Number(this.mainSearchString)
              }
            }
          ]
        },
        "orders": [
          {"asc":"name"}
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
    sl_profs() {
      return this.$store.state.eais.stateHandbooks.sl_profs
    }
  },
  methods: {
    letSearch(val) {
      console.log('перед серчем');
      console.log(val);
        if(val) {
          this.$store.dispatch('searchListItems', {
            value: val,
            path: 'api/v1/perses/search'
          });
          this.extraSearch = false;
        } else {
          console.log("Заполни форму");
        }
    },
    getHandbook(val) {
      this.$store.dispatch('getReferences', val);
    },
    cond(val) {
      var cond = {};
      cond.attr = val.attr;
      cond[val.type] = this[val.attr];
      if (this[val.attr] == null || this[val.attr].length == 0) {
        return {};
      } else {
        return {cond};
      }
    },
    condExists(val) {
      var cond = {};
      cond.attr = val.attr;
      cond.exists = { cond: {} };
      cond.exists.cond.attr = val.existAttr
      cond.exists.cond[val.existType] = val.existName
      if (val.existName == null || val.existName.length == 0) {
        return {};
      } else {
        return {cond};
      }
    }
  }
}
</script>
