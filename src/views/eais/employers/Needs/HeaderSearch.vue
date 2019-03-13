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
                <v-text-field
                  label="Название организации"
                  hide-details
                  v-model="longName"
                ></v-text-field>
              </v-flex>
              <v-flex md4>
                <v-text-field
                  label="Идентификатор организации"
                  hide-details type="number"
                  v-model="c_client"
                ></v-text-field>
              </v-flex>
              <v-flex md4>
                <v-text-field
                  label="ИНН"
                  hide-details
                  v-model="inn"
                ></v-text-field>
              </v-flex>
              <v-flex md4>
                <v-text-field
                  label="ЛДПГУ"
                  hide-details
                  v-model="kppInn"
                ></v-text-field>
              </v-flex>

              <v-flex md12>
                <v-autocomplete clearable
                  label="Наименование профессии"
                  hide-details
                  :items="sl_profs"
                  item-text="comboVal"
                  item-value="prof_cod"
                  v-model="prof_cod"
                  :no-data-text="noDataText"
                  chips deletable-chips small-chips
                  multiple
                ></v-autocomplete>
              </v-flex>

              <v-flex md12 text-md-right>
                <div>
                  <v-btn hide-details dark color="primary" @click="letSearch(searchFields)">Найти</v-btn>
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
  props: ['drawer'],
  beforeMount() {
    this.getHandbook({
      path:	'emplCenters', code: 'emplCenterId', name: 'shortName'
    });
    this.getHandbook({
      path:	'sl_profs', code: 'prof_cod', name: 'prof_name'
    });
    // this.getHandbook({
    //   path:	'sl_profs', code: 'prof_cod', name: 'prof_name'
    // });
    // this.getHandbook({
    //   path:	'sl_vactypes', code: 'type_cod', name: 'type_names'
    // });

  },
  updated() {
  },
  data: () => ({
salary: null,
salary1: null,
sl_vactype: '',
    longName: '',
    inn: '',
    cz_cod: '',
    prof_cod: [],
    fullAddres: '',
    ogrn: '',
    kppInn: '',
    c_client: '',
    declarerId: '',
    path: 'api/v1/cl_potrs/search',
    extraFields: [
      {
        rel: 'c_client',
        name: 'extraName',
        targetName: 'longName'
      }
    ],
  }),
  computed: {
    searchFields() {
      const searchFields =  {
        "offset": 0,
        "limit": 50,
        "attrs": [],
        "filter": {
          "and": [
            this.cond({
              attr: "c_client",
              type: "eq"
            }),
            this.condExists({
              attr: "c_client",
              existAttr: "longName",
              existType: "like",
              existName: this.longName
            }),
            this.condExists({
              attr: "c_client",
              existAttr: "inn",
              existType: "eq",
              existName: this.inn
            }),
            this.condExists({
              attr: "c_client",
              existAttr: "declarerId",
              existType: "eq",
              existName: this.kppInn
            }),
            this.condExists({
              attr: "cl_potrv_ref",
              existAttr: "prof_cod",
              existType: "in",
              existName: this.prof_cod
            })
          ]
        },
        "orders": [
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
        				"attr": "c_client",
        				"exists": {
        					"cond": {
        						"attr": "longName",
        						"like": this.mainSearchString
        					}
        				}
        			}
        		},
            this.isNumTrue({
              attr: "companyId",
              data: this.mainSearchString
            }),
            this.isNumTrue({
              attr: "inn",
              data: this.mainSearchString
            }),
            this.isNumTrue({
              attr: "declarerId",
              data: this.mainSearchString
            }),
          ]
        },
        "orders": [
          {"asc":"longName"}
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
    // sl_vactypes() {
    //   return this.$store.state.eais.stateHandbooks.sl_vactypes
    // }
  },
  methods: {
    getHandbook(val) {
      this.$store.dispatch('getReferences', val);
    }
  }
}
</script>
