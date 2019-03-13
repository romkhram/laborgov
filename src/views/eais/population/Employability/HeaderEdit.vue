<template lang="html">
  <div>
    <pre-loader v-if="this.$store.state.eais.putLoading.loading"></pre-loader>
    <div v-else class="d-flex">
      <v-btn block flat :loading="searchLoading"  @click="extraSearch = true" color="primary">
        <v-icon class="mr-2">search</v-icon> Подобрать вакансии <v-icon class="ml-2">keyboard_arrow_down</v-icon>
      </v-btn>
      <div style="color:transparent;">
        {{askProfs}} {{pRaComp}}
      </div>
      <v-menu v-model="extraSearch" offset-y :close-on-content-click="false" :position-y="60" :nudge-right="nudgeRight" max-width="1100">
        <v-card>
          <v-container grid-list-md style="width:1100px">

            <v-form ref="form" lazy-validation>

              <v-layout row wrap>

  								<v-flex md6 py-1>
  									<v-text-field clearable
  									 type="number"
  										v-model="persAsk.salary"
  										label="Зарплата"
  									></v-text-field>
  								</v-flex>

                  <v-flex md6 py-1>
  									<v-autocomplete clearable
  										label="Характер работы"
  										:items="sprNatureWorks"
  										item-text="fullName"
  										item-value="codeInGroup"
  										v-model="persAsk.jchar_cod"
  										:no-data-text="noDataText"
  									></v-autocomplete>
                  </v-flex>

                  <v-flex md6 py-1>
                    <v-autocomplete
                      label="Тип вакансии"
                      hide-details
                      :items="sl_vactypes"
                      item-text="comboVal"
                      item-value="type_cod"
                      v-model="type_cod"
                      :no-data-text="noDataText"
                    ></v-autocomplete>
                  </v-flex>

                  <!-- <v-flex md6 py-1>
  									<v-autocomplete clearable
  										label="Форма оплаты" required
  										:items="sprFormSalarys"
  										item-text="fullName"
  										item-value="codeInGroup"
  										v-model="oneItem.linkedData.mpArr_pers_ask_ref[0].data.salf_cod"
  										:no-data-text="noDataText"
  									></v-autocomplete>
                  </v-flex> -->

                  <v-flex md6 py-1>
  									<v-autocomplete clearable
  										label="Режим работы"
  										:items="sprOperatingModes"
  										item-text="fullName"
  										item-value="codeInGroup"
  										v-model="persAsk.jreg_cod"
  										:no-data-text="noDataText"
  									></v-autocomplete>
                  </v-flex>

                  <!-- <v-flex md6>
                    <v-autocomplete clearable
  										:items="sprSBS"
        							item-text="comboVal"
        							item-value="codeInGroup"
                    	v-model="persAsk.sbs_cod"
                      label="Форма собственности"
                    ></v-autocomplete>
                  </v-flex> -->

  								<v-flex md12 pt-1 pb-0>
                    <v-autocomplete clearable
  										:items="municipalityDivisions"
        							item-text="txt"
        							item-value="cim"
                    	v-model="pRa"
                      label="Район"
  										chips deletable-chips small-chips
  										multiple
                    ></v-autocomplete>
                  </v-flex>

  								<!-- <v-flex md12 py-1>
                    <v-autocomplete clearable
                      label="ID и Наименование организации"
                      :items="serverHandbook"
                      item-text="comboVal"
                      item-value="companyId"
                      v-model="persAsk.c_client"
                      :no-data-text="noDataText"
                      append-outer-icon="search"
                      :search-input.sync="empSearch"
                      @click:append-outer="letSearch"
                      @keyup.enter="letSearch"
                      :disabled="serverHandDis"
                      :loading="serverHandDis"
                    ></v-autocomplete>
                  </v-flex> -->

  								<!-- <v-flex md12>
  									<v-text-field
  										v-model="oneItem.linkedData.mpArr_pers_ask_ref[0].data.comm"
  										label="Дополнительные пожелания"
  									></v-text-field>
  								</v-flex> -->



  								<v-flex md12 pt-0 pb-1>
  									<v-autocomplete clearable
  										class="profession"
  										@input="conslog"
  										label="Профессия"
  										v-model="askProfsArr"
  										:items="sl_profs"
  										item-text="comboVal"
  										chips deletable-chips small-chips
  										multiple
  										item-value="prof_cod"
  									></v-autocomplete>
  								</v-flex>

                <v-flex md12>
                  <div>
                    <v-btn hide-details dark color="primary" @click="letVacsSearch(searchFields)">Найти</v-btn>
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
  updated() {
  },
  beforeMount() {
    this.getHandbook({
      path:	'sl_vactypes', code: 'type_cod', name: 'type_name'
    });
  },
  props: ['drawer'],
  data: () => ({
    extraSearch: false,
    mainSearchString: '',
    longName: '',
    inn: '',
    emplCenterId: '',
    prof: '',
    pRa: [],
    clickStop: 0,
    fullAddres: '',
    ogrn: '',
    type_cod: 1,
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
      console.log('Получили oneItem');
      return this.$store.state.eais.oneItem;
    },
    pRaComp() {
      if (this.clickStop === 0 && this.persAsk.p_ra) {
        this.pRa.push(this.persAsk.p_ra);
        this.clickStop = 1;
      }
      return ' ? '
    },
    askProfs() {
      if (this.oneItem.linkedData.mpArr_pers_ask_ref.length > 0) {
        this.persAsk = JSON.parse(JSON.stringify(this.oneItem.linkedData.mpArr_pers_ask_ref[0].data));
        // var pRa = this.persAsk.p_ra
        // delete this.persAsk.p_ra;
        // console.log('this.persAsk');
        // console.log(this.persAsk);
        // console.log(pRa);
        // this.persAsk.p_ra = [pRa];

        //
        // this.persAsk.p_ra = [];
        // this.persAsk.p_ra.push(pRa);
        // this.persAsk.data.p_ra = [this.persAsk.data.p_ra];
      } else {
        console.log('Нет заявки - создаем');
        var persAskNull = {
          classCode: "pers_ask",
          data: {
            c_client: null,
            comm: null,
            inter_1: null,
            inter_2: null,
            inter_3: null,
            inter_4: null,
            inter_p: null,
            inter_v: null,
            inter_yn: null,
            jchar_cod: null,
            jreg_cod: null,
            p_ra: [],
            prizpall: null,
            salary: null,
            salf_cod: null,
            sbs_cod: null,
            tr_date: null,
            tr_lg1: null,
            tr_lg2: null,
            tr_lg3: null
          }
        }
        this.oneItem.linkedData.mpArr_pers_ask_ref.push(persAskNull)
        this.persAsk = JSON.parse(JSON.stringify(this.oneItem.linkedData.mpArr_pers_ask_ref[0].data));
      }
      // this.persAsk = JSON.parse(JSON.stringify(this.oneItem.linkedData.mpArr_pers_ask_ref[0].data));
      this.persAsk.c_client = null;
      console.log('this.persAsk');
      console.log(this.persAsk);

      // if (this.oneItem.linkedData.mpArr_pers_ask_plist_ref.length === 0 && is.oneItem.data.prof_cod !== null) {
      //   var askProfs = [this.oneItem.data.prof_cod];
      // } else {
        var askProfs = [];
      // }
      var that = this;
      this.oneItem.linkedData.mpArr_pers_ask_plist_ref.forEach(function(element) {
        // if (element.data.prof_cod !== that.oneItem.data.prof_cod) {
          askProfs.push(element.data.prof_cod);
        // }
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
    vacInDir() {
      var vacInDir = [];
      var jobDirRef = this.oneItem.linkedData.mpArr_job_dir_ref;
      jobDirRef.forEach(function(el) {
        vacInDir.push(el.data.vac_num);
      });
      console.log(vacInDir);
      return vacInDir;
    },
    searchFields() {
      const searchFields =  {
        "offset": 0,
        "limit": 50,
        "attrs": [],
        "filter": {
          "and": [
            this.condFull({
              attr: "vac_num",
              type: "notIn",
              data: this.vacInDir
            }),
            this.condFull({
              attr: "prof_cod",
              type: "in",
              data: this.askProfsArr
            }),
            this.condFull({
              attr: "type_cod",
              type: "eq",
              data: this.type_cod
            }),
            this.condFull({
              attr: "p_ra",
              type: "in",
              data: this.pRa
            }),
            this.condFull({
              attr: "jchar_cod",
              type: "eq",
              data: this.persAsk.jchar_cod
            }),
            this.condFull({
              attr: "salary",
              type: "gte",
              data: this.persAsk.salary
            }),
            this.condFull({
              attr: "jreg_cod",
              type: "eq",
              data: this.persAsk.jreg_cod
            }),
            // this.condExists({
            //   attr: "c_client",
            //   existAttr: "ownershipId",
            //   existType: "eq",
            //   existName: this.persAsk.sbs_cod
            // }),
            // this.searchFullAddress,
          ]
        },
        "orders": [
          {"asc":"salary"}
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
    sl_vactypes() {
      return this.$store.state.eais.stateHandbooks.sl_vactypes.sort((prev, next) => prev.type_cod - next.type_cod);
    }
  },
  methods: {
    conslog() {
      console.log(this.askProfs);
      console.log(this.oneItem.linkedData.mpArr_pers_ask_ref[0].data);
    },
    letVacsSearch(val) {
      console.log('перед серчем');
      console.log(val);
        if(val) {
          this.$store.dispatch('searchListItemsForDir', {
            value: val,
            path: 'api/v1/vacs/search',
            extraFields: this.extraFields
          });
          this.extraSearch = false;
        } else {
          console.log("Заполни форму");
        }
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
