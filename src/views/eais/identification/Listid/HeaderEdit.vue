<template lang="html">
  <div class="d-flex">
    <!-- <v-text-field
      flat
      solo
      :disabled="searchLoading"

      @click:append="extraSearch = true"
      append-icon="arrow_drop_down"
      placeholder="Поиск"
      class="eais-search-bar"
      v-model="dubleSearchString"
      @keyup.enter="letSearch(mainSearch)"
    ></v-text-field> -->
    <!-- <v-btn flat icon :loading="searchLoading" @click="letSearch(mainSearch)" color="primary">
      <v-icon>search</v-icon>
    </v-btn> -->

    <v-menu v-model="extraSearch" offset-y :close-on-content-click="false" :position-y="60" :nudge-right="nudgeRight" max-width="800">
      <v-card>
        <v-container grid-list-lg style="width:800px">

          <v-form ref="form" lazy-validation>

            <v-layout v-if="!searchType" row wrap>
              <v-flex md12>
                <v-text-field
                  label="Название"
                  hide-details
                  v-model="longName" clearable
                ></v-text-field>
              </v-flex>

              <v-flex md12>
                <v-autocomplete
                  label="АЗН"
                  hide-details
                  clearable
                  :items="emplCenters"
                  item-text="comboVal"
                  item-value="emplCenterId"
                  v-model="emplCenterId" clearable
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
                  v-model="inn" clearable
                ></v-text-field>
              </v-flex>
              <v-flex md4>
                <v-text-field
                  label="ОГРН"
                  hide-details
                  v-model="ogrn" clearable
                ></v-text-field>
              </v-flex>
              <v-flex md4>
                <v-text-field
                  label="КПП"
                  hide-details
                  v-model="kppInn" clearable
                ></v-text-field>
              </v-flex>
              <v-flex md6>
                <v-text-field
                  label="Идентификатор организации"
                  hide-details type="number"
                  v-model="companyId" clearable
                ></v-text-field>
              </v-flex>
              <v-flex md6>
                <v-text-field
                  label="ЛДПГУ"
                  hide-details
                  v-model="declarerId" clearable
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
  mounted() {
    var that = this;
    setTimeout(function() {
      console.log('toDubleSearchString');
      console.log(that.$store.state.eais.oneItem);
      that.longName = JSON.parse(JSON.stringify(that.$store.state.eais.oneItem.data.longName));
      that.inn = JSON.parse(JSON.stringify(that.$store.state.eais.oneItem.data.inn));
      that.dubleSearchString = JSON.parse(JSON.stringify(that.$store.state.eais.oneItem.data.longName));
      // this.toDubleSearchString()
    }, 1000);
  },
  updated() {
    this.pushNoDu();
  },
  props: ['drawer'],
  data: () => ({
    longName: '',
    inn: '',
    emplCenterId: null,
    prof: '',
    fullAddres: '',
    ogrn: '',
    kppInn: '',
    fam: '',
    noDubles: [],
    name: '',
    snils: '',
    companyId: '',
    declarerId: '',
    path: 'api/v1/eaisCompanies/search',
    searchType: false,
    dubleSearchString: null
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
            this.condFull({
              attr: "companyId",
              type: "notIn",
              data: this.noDubles
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
              existName: this.snils
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
          "and": [
            // {
            //   "cond": {
            //     "attr": "companyId",
            //     "eq": Number(this.dubleSearchString)
            //   }
            // },
            this.condFull({
              attr: "companyId",
              type: "notIn",
              data: this.noDubles //[this.$store.state.eais.oneItem.data.companyId]
            }),
            {
              "cond": {
                "attr": "longName",
                "like": this.dubleSearchString
              }
            },
            // {
            //   "cond": {
            //     "attr": "inn",
            //     "eq": this.dubleSearchString
            //   }
            // }
          ]
        },
        "orders": [
          {"asc":"longName"}
        ]
      }
      if (this.dubleSearchString.length > 0) {
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
    pushNoDu() {
      console.log('this.noDubles');
      var that = this;
      that.noDubles = [];
      that.noDubles.push(this.$store.state.eais.oneItem.data.companyId);
      var dublicates = this.$store.state.eais.dublicates;
      dublicates.forEach(function(el) {
        that.noDubles.push(el)
      });

      console.log(that.noDubles);
    },
    toDubleSearchString() {
      this.longName = JSON.parse(JSON.stringify(this.$store.state.eais.oneItem.data.longName));
      this.inn = JSON.parse(JSON.stringify(this.$store.state.eais.oneItem.data.inn));
      this.dubleSearchString = JSON.parse(JSON.stringify(this.$store.state.eais.oneItem.data.longName));
    },
    getHandbook(val) {
      this.$store.dispatch('getReferences', val);
    }
  }
}
</script>
