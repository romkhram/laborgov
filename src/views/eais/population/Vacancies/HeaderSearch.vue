<template lang="html">
  <div>
    <v-text-field
      flat
      solo

      @click:append="extraSearch = true"
      append-icon="arrow_drop_down"
      placeholder="Поиск"
      class="eais-search-bar"
    ></v-text-field>
    <v-menu v-model="extraSearch" offset-y :close-on-content-click="false" :position-y="60" :nudge-right="372" max-width="800">
      <v-card>
        <v-container grid-list-xl text-xs-right style="width:800px">
          <v-form ref="form" lazy-validation >
            <v-layout row wrap>

              <v-flex md6>
                <v-switch class="shrink"
                  label="C вакансиями"
                  hide-details
                ></v-switch>
              </v-flex>

              <v-flex md6>
                <v-switch class="shrink allactive"
                  :label="areaOrCom"
                  hide-details
                  v-model="searchType"
                ></v-switch>
              </v-flex>

              <v-flex md12>
                <v-autocomplete
                  label="Профессии"
                  :no-data-text="noDataText"
                  :items="profs"
                  chips
                  multiple
                  hide-details
                ></v-autocomplete>
              </v-flex>

              <v-flex md12 v-if="!searchType">
                <v-autocomplete
                  label="Список районов"
                  :no-data-text="noDataText"
                  chips
                  multiple
                  hide-details
                ></v-autocomplete>
              </v-flex>

              <v-flex md12 v-if="searchType">
                <v-autocomplete
                  label="Список предприятий"
                  :no-data-text="noDataText"
                  chips
                  multiple
                  hide-details
                ></v-autocomplete>
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

<style>
.v-select__selections {
  height: auto;
  flex-wrap: wrap;
  white-space: wrap;
}
.allactive .theme--light.v-input--switch__track,
.allactive .theme--light.v-input--switch__thumb {
  color: #82b1ff !important;
}
</style>

<script>
export default {
  data: () => ({
    noDataText: 'Нет данных',

    extraSearch: false,
    dateMenu01: false,
    date01: "",
    dateMenu02: false,
    date02: "",
    dateMenu03: false,
    date03: "",
    dateMenu04: false,
    date04: "",
    searchType: false,
    profs: [
      '10003 Авербандщик',
      '10005 Авиационный механик (техник) по планеру и двигателям',
      '10008 Авиационный механик (техник) по радиооборудованию',
      '10007 Авиационный механик(техник)по приборам и электрооборудованию',
      '10013 Автоклавщик',
      '10016 Автоклавщик литья под давлением',
      '10021 Автоматчик',
      '10023 Автоматчик вязальных автоматов',
      '10025 Автоматчик игольно-платинных изделий',
      '10038 Автоматчик холодновысадочных автоматов',
      '10040 Автоэлектрик',
      '20001 Агент',
      '20002 Агент банка',
      '20004 Агент коммерческий',
      '20015 Агент по закупкам',
      '20025 Агент по приему заказов на билеты',
      '20026 Агент по продаже недвижимости',
      '20031 Агент по снабжению',
      '20032 Агент рекламный',
      '20034 Агент страховой',
      '20035 Агент торговый',
      '10041 Агломератчик',
      '20040 Агроном',
      '20050 Агроном по защите растений',
      '20053 Агроном по семеноводству',
      '20056 Агрохимик',
      '20059 Адвокат',
      '20061 Административный секретарь',
      '20062 Администратор',
      '20063 Администратор гостиницы (дома отдыха)',
      '20065 Администратор дежурный',
      '20068 Администратор зала',
      '20071 Администратор кинотеатра',
      '20080 Администратор системный',
      '10043 Аквадировщик',
      '10045 Акклиматизатор',
      '20083 Аккомпаниатор',
      '10047 Аккумуляторщик',
      '20086 Акушерка',
      '10050 Альпинист промышленный',
      '20088 Аналитик',
      '10060 Антенщик-мачтовик',
      '10062 Антикоррозийщик',
      '10065 Аппаратчик',
      '10078 Аппаратчик аминирования',
      '10083 Аппаратчик аппретирования',
      '10099 Аппаратчик вакуум-аппаратов',
      '10122 Аппаратчик воздухоразделения',
      '10142 Аппаратчик вулканизации',
      '10158 Аппаратчик выпарных аппар.для получения твердого продукта',
  ],
    has: ['Высвобождения', 'Массовые', 'Режимы неп.вр.'],
    status: ['Все', 'Не снятые', 'Снятые'],
    lists: ['Все', 'Есть', 'Нет'],
    periods: ['Подачи уведомления', 'Начала высвобождения'],
    controls: ['Зарегистрированы высвобождаемые клиенты', 'Зарегистрированы клиенты и не зарегистрировано высвобождение'],
    searchFields: {
      "offset": 10,
      "limit": 50,
      "attrs": [
        "companyId",
        "longName",
        "emplCenterId",
        "dateReg"
      ],
      "filter": {
        "or": [
          {
            "cond": {
              "attr": "attr1",
              "eq": "1"
            }
          },
          {
            "cond": {
              "attr": "attr2",
              "like": "AA"
            }
          }
        ]
      },
      "orders": [
        {
          "asc": "attr1"
        },
        {
          "desc": "attr2"
        }
      ]
    }
  }),
  computed: {
    areaOrCom() {
      if (!this.searchType) {
      var areaOrCom = 'По району'
      } else {
      var areaOrCom = 'По предприятию'
      }
      return areaOrCom;
    }
  },
  methods: {
    letSearch() {
      // console.log(val);
      this.extraSearch = false;
      this.$store.dispatch('postGetEmployers', this.searchFields);
    },
  }
}
</script>
