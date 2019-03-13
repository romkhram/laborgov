<template lang="html">
  <div>
    <pre-loader v-if="this.$store.state.eais.putLoading.loading"></pre-loader>
    <div v-else class="d-flex">
      <v-btn block flat :loading="searchLoading"  @click="extraSearch = true" color="primary">
        <v-icon class="mr-2">search</v-icon> Подобрать соискателей <v-icon class="ml-2">keyboard_arrow_down</v-icon>
      </v-btn>

      <v-menu v-model="extraSearch" offset-y :close-on-content-click="false" :position-y="60" :nudge-right="nudgeRight" max-width="1100">
        <v-card>
          <v-container grid-list-md style="width:1100px">

            <v-form ref="form" lazy-validation>

              <v-layout row wrap>

  								<v-flex md6 py-1>
  									<v-text-field clearable
  									 type="number"
  										v-model="oneItem.data.salary"
  										label="Зарплата от"
  									></v-text-field>
  								</v-flex>

  								<v-flex md6 py-1>
  									<v-text-field clearable
  									 type="number"
  										v-model="oneItem.data.salary1"
  										label="Зарплата до"
  									></v-text-field>
  								</v-flex>

                  <v-flex md6>
                    <v-autocomplete clearable
                      :items="emplCenters"
                      item-text="comboVal"
                      item-value="emplCenterId"
                      v-model="oneItem.data.cz_cod"
                      label="ЦЗН"
                    ></v-autocomplete>
                  </v-flex>

                  <v-flex md6 py-1>
                    <v-autocomplete
                      label="Образование"
                      clearable
                      :items="sprTypeEducations"
                      item-text="fullName"
                      item-value="codeInGroup"
                      v-model="oneItem.data.educ_cod"
                      :no-data-text="noDataText"
                    ></v-autocomplete>
                  </v-flex>

  								<v-flex md12 py-1>
  									<v-autocomplete clearable
  										class="profession"
  										@input="conslog"
  										label="Профессия"
  										v-model="profCodArr"
  										:items="sl_profs"
  										item-text="comboVal"
  										chips deletable-chips small-chips
  										multiple
  										item-value="prof_cod"
  									></v-autocomplete>
  								</v-flex>

<div style="height:1px;font-size:0px;">
  {{profCod}}
</div>
                  <v-flex md6 py-1>
                    <!-- <v-switch
                      label="Только по основной специальности"
                    ></v-switch> -->
                  </v-flex>

                <v-flex md6 text-xs-right>
                  <div>
                    <!-- <v-btn hide-details dark color="primary" @click="letPersSearch(searchFields)">Найти</v-btn> -->
                    <v-btn hide-details dark color="primary" @click="findThem(searchFields)">Найти</v-btn>
                  </div>
                </v-flex>

              </v-layout>
            </v-form>
          </v-container>
        </v-card>
      </v-menu>
    </div>
  </div>
</template>

<script>
import profSearch from "@/mixins/profSearch";
export default {
  mixins: [profSearch],
  mounted() {
    // this.oneItemSearch = {};
    // this.oneItemSearch = JSON.parse(JSON.stringify(this.$store.state.eais.oneItem));
    // console.log('oneItemSearch');
    // console.log(this.oneItemSearch);
  },
  updated() {
  },
  props: ['drawer'],
  data: () => ({
    oneItemSearch: {},
    extraSearch: false,
    profCodArr: [],
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
    path: 'api/v1/vacs/search',
    persAsk: {},
    askProfsArr: [],
    extraFields: [
      {
        rel: 'c_client',
        name: 'extraName',
        targetName: 'longName'
      },
      {
        rel: 'c_client',
        name: 'extraInn',
        targetName: 'inn'
      }
    ],
  }),
  computed: {
    oneItem () {
      // console.log('Получили oneItem');
      // this.oneItemSearch = JSON.parse(JSON.stringify(this.$store.state.eais.oneItem));
      // console.log('this.oneItemSearch');
      // console.log(this.oneItemSearch);
      return JSON.parse(JSON.stringify(this.$store.state.eais.oneItem));
    },
    profCod() {
      if (this.profCodArr.length == 0) {
        this.profCodArr.push(this.oneItem.data.prof_cod);
      }
      return this.oneItem.data.prof_cod;
    },
    askProfs() {
      this.persAsk = JSON.parse(JSON.stringify(this.oneItem.linkedData.mpArr_pers_ask_ref[0].data));
      this.persAsk.c_client = null;
      console.log('this.persAsk');
      console.log(this.persAsk);
      if (this.oneItem.data.prof_cod !== null) {
        var askProfs = [this.oneItem.data.prof_cod];
      } else {
        var askProfs = [];
      }
      var that = this;
      this.oneItem.linkedData.mpArr_pers_prof_ref.forEach(function(element) {
        askProfs.push(element.data.prof_cod);
      });
      // if (this.askProfsArr.length === 0) {
        this.askProfsArr = JSON.parse(JSON.stringify(askProfs));
      // }
      return askProfs;
    },
    nudgeRight() {
      console.log(this.drawer);
      if (this.drawer) {
        return 372;
      } else {
        return 72;
      }
    },
    searchLoading() {
      return this.$store.state.eais.searchLoading
    },
    searchFields() {
      const searchFields =  {
        "offset": 0,
        "limit": 300,
        "attrs": [],
        "filter": {
          "and": [
            this.condFull({
              attr: "prof_cod",
              type: "in",
              data: this.profCodArr
            }),
            this.condFull({
              attr: "educ_cod",
              type: "eq",
              data: this.oneItem.data.educ_cod
            }),
            this.condFull({
              attr: "czu_cod",
              type: "eq",
              data: this.oneItem.data.cz_cod
            }),
            this.condFull({
              attr: "salary",
              type: "gte",
              data: this.oneItem.data.salary
            }),
            this.condFull({
              attr: "salary",
              type: "lte",
              data: this.oneItem.data.salary1
            }),
            // this.condFull({
            //   attr: "jreg_cod",
            //   type: "eq",
            //   data: this.persAsk.jreg_cod
            // })
          ]
        },
        "orders": [
          {"asc":"changeDate"},
          // {"asc":"emplCenterId"}
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
    sprNatureWorks() {
    	return this.$store.state.eais.stateHandbooks.sprNatureWorks;
    },
    sprFormSalarys() {
    	return this.$store.state.eais.stateHandbooks.sprFormSalarys;
    },
    sprOperatingModes() {
    	return this.$store.state.eais.stateHandbooks.sprOperatingModes;
    },
    municipalityDivisions() {
    	const areas = this.$store.state.eais.stateHandbooks.municipalityDivisions;
    	const newAreas = areas.filter(ar => ar.cim_parent === '402600000');
    	return newAreas;
    },
    sprSBS() {
    	return this.$store.state.eais.stateHandbooks.sprSBS;
    },
    sl_profs() {
    	return this.$store.state.eais.stateHandbooks.sl_profs;
    },
    emplCenters() {
      return this.$store.state.eais.stateHandbooks.emplCenters;
    },
    sprTypeEducations() {
      return this.$store.state.eais.stateHandbooks.sprTypeEducations;
    }
  },
  methods: {
    findThem(val) {
      console.log('Yfxfkb');
      console.log(val);
        if(val) {
          this.$store.dispatch('searchListItemsForDir', {
            value: val,
            path: 'api/v1/perses/search',
            // extraFields: this.extraFields
          });
          this.extraSearch = false;
        } else {
          console.log("Заполни форму");
        }
    },
    conslog() {
      console.log(this.oneItem.data.prof_cod);
      // console.log(this.oneItem.linkedData.mpArr_pers_ask_ref[0].data);
    },
    letPersSearch(val) {
      console.log('перед серчем');
      // console.log(val);
      //   if(val) {
      //     this.$store.dispatch('searchListItemsForDir', {
      //       value: val,
      //       path: 'api/v1/vacs/search',
      //       extraFields: this.extraFields
      //     });
      //     this.extraSearch = false;
      //   } else {
      //     console.log("Заполни форму");
      //   }
    },
    getHandbook(val) {
      this.$store.dispatch('getReferences', val);
    },
    condFull(val) {
			var cond = {};
			cond.attr = val.attr;
			cond[val.type] = val.data;
			if (val.data == null || val.data.length == 0 || val.data == undefined) {
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
