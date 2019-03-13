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


                <!-- <v-flex md3>
                  <date-picker label="по"></date-picker>
                </v-flex> -->

                <v-flex md8>
                  <v-autocomplete clearable
                    :items="emplCenters"
                    item-text="shortName"
                    item-value="emplCenterId"
                    v-model="czu"
                    label="АЗН"
                  ></v-autocomplete>
                </v-flex>

                <v-flex md4>
                  <v-select
                    :items="czn"
                    label="Тип АЗН"
                    item-text="txt"
                    item-value="code"
                    v-model="czuType"
                  ></v-select>
                </v-flex>

                <v-flex md4>
                  <v-text-field label="Фамилия" v-model="fam"></v-text-field>
                </v-flex>

                <v-flex md4>
                  <v-text-field label="Имя" v-model="nam"></v-text-field>
                </v-flex>

                <v-flex md4>
                  <v-text-field label="Отчество" v-model="famn"></v-text-field>
                </v-flex>

                <v-flex md4 py-1>
                  <v-text-field
                   label="СНИЛС"
                   v-model="spensD"
                   mask="###-###-### ##"
                   @input="spensLog()"
                  ></v-text-field>
                </v-flex>

                <v-flex md4 py-1>
                  <v-text-field label="ЛДПГУ" v-model="reg_bak"></v-text-field>
                </v-flex>

                <v-flex md4>
                  <v-switch class="shrink ml-4"
                    label="Получает выплаты"
                    v-model="reg_sost2"
                    :true-value="1"
                    :false-value="0"
                  ></v-switch>
                </v-flex>

                <v-flex md6>
                  <v-autocomplete clearable
                    :items="sprRegSosts"
                    item-text="typ_name"
                    item-value="typ_cod"
                    v-model="reg_sost1"
                    label="Состояние"
                  ></v-autocomplete>
                </v-flex>

                <v-flex md6>
                  <v-autocomplete clearable
                    :items="sprRegStatuss"
                    item-text="typ_name"
                    item-value="typ_cod"
                    v-model="reg_status"
                    label="Статус"
                  ></v-autocomplete>
                </v-flex>

              <!-- <v-flex md6>
                <v-select
                  :items="sprRegSosts"
                  label="Состояние"
                  multiple
                ></v-select>
              </v-flex> -->

              <!-- <v-flex md6>
                <v-select
                  :items="card"
                  label="Вид картотеки"
                ></v-select>
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
import rules from "@/mixins/rules";
export default {
  mixins: [search, rules],
  beforeMount() {
    this.getHandbook({
      path:	'sprRegSosts', code: 'typ_cod', name: 'typ_name'
    });
    this.getHandbook({
      path:	'emplCenters', code: 'emplCenterId', name: 'shortName'
    });
    this.getHandbook({
      path:	'sprRegStatuss', code: 'typ_cod', name: 'typ_name'
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
    extraSearch: false,
    mainSearchString: '',
    reg_sost2: 0,
    fam: '',
    nam: '',
    famn: '',
    spens: null,
    spensD: null,
    reg_bak: null,
    czu: null,
    czuType: 'czu_cod',
    reg_status: null,
    reg_sost1: null,
    czn: [
      {
        code: 'czu_cod',
        txt: 'АЗН учета'
      },
      {
        code: 'cz_cod',
        txt: 'АЗН регистрации'
      }
    ],
    card: ['Нет данных'],
    // longName: '',
    // inn: '',
    // emplCenterId: '',
    // prof: '',
    // fullAddres: '',
    // ogrn: '',
    // kppInn: '',
    // companyId: '',
    // declarerId: '',
    path: 'api/v1/perses/search',
  }),
  computed: {
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
        "limit": 50,
        "attrs": [],
        "filter": {
          "and": [
            // fam: '',
            // nam: '',
            // famn: '',
            // spens: '',
            // pers_num: '',
            this.cond({
              attr: "fam",
              type: "like"
            }),
            this.cond({
              attr: "nam",
              type: "like"
            }),
            this.cond({
              attr: "famn",
              type: "like"
            }),

            this.cond({
              attr: "spens",
              type: "eq"
            }),
            this.cond({
              attr: "reg_bak",
              type: "eq"
            }),
            this.cond({
              attr: "reg_sost1",
              type: "eq"
            }),
            this.cond({
              attr: "czu_cod",
              type: "eq"
            }),
            this.condFull({
              attr: this.czuType,
              type: "eq",
              data: this.czu
            }),
            this.cond({
              attr: "reg_status",
              type: "eq"
            }),
            this.cond({
              attr: "reg_sost2",
              type: "eq"
            })
            // this.cond({
            //   attr: "companyId",
            //   type: "eq"
            // }),
            // this.cond({
            //   attr: "declarerId",
            //   type: "eq"
            // }),
            // this.condExists({
            //   attr: "addresses",
            //   existAttr: "fullAddress",
            //   existType: "like",
            //   existName: this.fullAddres.toUpperCase()
            // }),
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
                "attr": "reg_bak",
                "eq": Number(this.mainSearchString)
              }
            },
            {
              "cond": {
                "attr": "fam",
                "like": this.mainSearchString
              }
            },
            {
              "cond": {
                "attr": "spens",
                "eq": this.mainSearchString
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
    sprRegSosts() {
      return this.$store.state.eais.stateHandbooks.sprRegSosts
    },
    emplCenters() {
      return this.$store.state.eais.stateHandbooks.emplCenters
    },
    sprRegStatuss() {
      return this.$store.state.eais.stateHandbooks.sprRegStatuss;
    }
  },
  methods: {
    getHandbook(val) {
      this.$store.dispatch('getReferences', val);
    },
    spensLog() {
      const spens = this.spensD;
      if (spens.length === 11) {
        const trueSpens = spens.slice(0, -2) + ' ' + spens.slice(-2);
        this.spens = trueSpens;
      } else {
        this.spens = null;
      }
    }
  }
}
</script>
