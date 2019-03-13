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
        <v-container grid-list-lg style="width:800px">

          <v-form ref="form" lazy-validation>

            <v-layout v-if="!searchType" row wrap>
              <v-flex md12>
                <v-text-field
                  label="Название"
                  hide-details
                  v-model="longName"
                ></v-text-field>
              </v-flex>

              <v-flex md12>
                <v-text-field
                  label="Адрес"
                  hide-details
                  v-model="fullAddres"
                ></v-text-field>
              </v-flex>

              <v-flex md12>
                <v-autocomplete
                  label="Район"
                  hide-details
                  clearable
                  :items="emplCenters"
                  item-text="comboVal"
                  item-value="emplCenterId"
                  v-model="emplCenterId"
                  :no-data-text="noDataText"
                ></v-autocomplete>
              </v-flex>
              <!-- <v-flex md6>
                <v-autocomplete
                  label="Муниципальный округ"
                  hide-details
                  v-model="prof"
                  :no-data-text="noDataText"
                ></v-autocomplete>
              </v-flex> -->
              <v-flex md4>
                <v-text-field
                  label="ИНН"
                  hide-details
                  v-model="inn"
                ></v-text-field>
              </v-flex>
              <v-flex md4>
                <v-text-field
                  label="ОГРН"
                  hide-details
                  v-model="ogrn"
                ></v-text-field>
              </v-flex>
              <v-flex md4>
                <v-text-field
                  label="КПП"
                  hide-details
                  v-model="kppInn"
                ></v-text-field>
              </v-flex>
              <v-flex md6>
                <v-text-field
                  label="Идентификатор организации"
                  hide-details type="number"
                  v-model="companyId"
                ></v-text-field>
              </v-flex>
              <v-flex md6>
                <v-text-field
                  label="ЛДПГУ"
                  hide-details
                  v-model="declarerId"
                ></v-text-field>
              </v-flex>

            </v-layout>
            <v-layout v-if="searchType" row wrap>

              <v-flex md12>
                <v-text-field
                  label="Фамилия"
                  hide-details
                  v-model="fam"
                ></v-text-field>
              </v-flex>
              <v-flex md6>
                <v-text-field
                  label="Имя"
                  hide-details
                  v-model="name"
                ></v-text-field>
              </v-flex>

              <v-flex md6>
                <v-text-field
                  label="Отчество"
                  hide-details
                  v-model="mname"
                ></v-text-field>
              </v-flex>

              <v-flex md6>
                <v-text-field
                 label="СНИЛС"
                 v-model="spensD"
                 mask="###-###-### ##"
                 @input="spensLog()"
                ></v-text-field>
              </v-flex>

              <v-flex md3>
                <v-text-field
                  label="Паспорт серия"
                  hide-details
                  v-model="ausser"
                ></v-text-field>
              </v-flex>

              <v-flex md3>
                <v-text-field
                  label="Паспорт номер"
                  hide-details
                  v-model="ausnum"
                ></v-text-field>
              </v-flex>

            </v-layout>

            <v-layout row wrap>

              <!-- <v-flex md4 text-md-right>
                <div>
                  <v-switch class="shrink ml-3"
                    label="Подтверждена"
                  ></v-switch>
                </div>
              </v-flex> -->
              <v-flex md6>
                <v-switch class="shrink allactive"
                  :label="areaOrCom"
                  hide-details
                  v-model="searchType"
                ></v-switch>
              </v-flex>

              <v-flex md6 text-md-right>
                <div>
                  <!-- <v-btn color="primary" :href="saveFile">редактирование объекта</v-btn> -->
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
  beforeMount() {
    this.getHandbook({
      path:	'emplCenters', code: 'emplCenterId', name: 'shortName'
    });
    this.getHandbook({
      path:	'sl_profs', code: 'prof_cod', name: 'prof_name'
    });
    // this.getHandbook('emplCenters');
    // this.getHandbook('sl_profs');
    // this.getHandbook('test_error');
    // this.getHandbook('test_error2');
    // this.getHandbook('test_error3');
  },
  updated() {
  },
  props: ['drawer'],
  data: () => ({
    spensD: null,
    longName: '',
    ausnum: '',
    ausser: '',
    inn: '',
    emplCenterId: null,
    prof: '',
    fullAddres: '',
    ogrn: '',
    kppInn: '',
    fam: '',
    name: '',
    spens: null,
    companyId: '',
    declarerId: '',
    path: 'api/v1/eaisCompanies/search',
    searchType: false,
  }),
  computed: {
    areaOrCom() {
      if (!this.searchType) {
      var areaOrCom = 'По реквизитам предприятия'
      } else {
      var areaOrCom = 'По представителю предприятия'
      }
      return areaOrCom;
    },
    saveFile() {
      const saveFile = `/file/v1/ed0260dc-2ee0-4b47-af8c-c773bb9a2e31/${this.$store.state.auth.tokenParams.access_token}`;
      console.log(saveFile);
      return saveFile
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
            this.condExists({
              attr: "contacts",
              existAttr: "contactSurname",
              existType: "like",
              existName: this.fam
            }),
            this.condExists({
              attr: "contacts",
              existAttr: "contactName",
              existType: "like",
              existName: this.name
            }),
            this.condExists({
              attr: "contacts",
              existAttr: "snils",
              existType: "eq",
              existName: this.spensD
            }),
            this.condExists({
              attr: "contacts",
              existAttr: "snils",
              existType: "eq",
              existName: this.snils
            }),
            this.condExists({
              attr: "contacts",
              existAttr: "ausnum",
              existType: "eq",
              existName: this.ausnum
            }),
            this.condExists({
              attr: "contacts",
              existAttr: "ausser",
              existType: "eq",
              existName: this.ausser
            }),
            this.condExists({
              attr: "contacts",
              existAttr: "contactMiddleName",
              existType: "like",
              existName: this.mname
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
        return searchFields;
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
                "attr": "companyId",
                "eq": Number(this.mainSearchString)
              }
            },
            {
              "cond": {
                "attr": "longName",
                "like": this.mainSearchString.toUpperCase()
              }
            },
            {
              "cond": {
                "attr": "inn",
                "eq": this.mainSearchString
              }
            }
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
      // var emplCenters = this.$store.state.eais.stateHandbooks.emplCenters;
      // return emplCenters.sort((prev, next) => prev.prof_cod - next.prof_cod);
      return this.$store.state.eais.stateHandbooks.emplCenters;
    },
    sl_profs() {
      return this.$store.state.eais.stateHandbooks.sl_profs;
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
