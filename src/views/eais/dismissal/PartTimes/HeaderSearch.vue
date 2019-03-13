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
    <v-menu v-model="extraSearch" offset-y :close-on-content-click="false" :position-y="60" :nudge-right="321" max-width="800">
      <v-card>
        <v-container grid-list-md text-xs-right style="width:800px">

          <v-form ref="form" v-model="valid" lazy-validation >

            <v-layout row wrap>
              <v-flex md12>
                <v-text-field
                  v-model="sr_us_surname"
                  label="Название"
                  hide-details
                ></v-text-field>
              </v-flex>
              <v-flex md12>
                <v-text-field
                  v-model="sr_us_name"
                  label="Адрес"
                  hide-details
                ></v-text-field>
              </v-flex>
              <v-flex md6>
                <v-select
                  :items="areas"
                  label="Район"
                  hide-details
                ></v-select>
              </v-flex>
              <v-flex md6>
                <v-select
                  :items="mo"
                  label="Муниципальный округ"
                  hide-details
                ></v-select>
              </v-flex>
              <v-flex md4>
                <v-text-field
                  v-model="sr_us_email"
                  label="ИНН"
                  hide-details
                ></v-text-field>
              </v-flex>
              <v-flex md4>
                <v-text-field
                  v-model="sr_us_email"
                  label="ОГРН"
                  hide-details
                ></v-text-field>
              </v-flex>
              <v-flex md4>
                <v-text-field
                  v-model="sr_us_email"
                  label="КПП"
                  hide-details
                ></v-text-field>
              </v-flex>

              <v-flex md4>
                <v-text-field
                  v-model="sr_us_email"
                  label="ID"
                  hide-details
                ></v-text-field>
              </v-flex>
              <v-flex md4>
                <v-text-field
                  v-model="sr_us_patronymic"
                  label="ЛДПГУ"
                  hide-details
                ></v-text-field>
              </v-flex>

              <v-flex md2>
                <v-checkbox
                  label="Совп."
                  v-model="checkbox"
                   class="shrink ml-3"
                ></v-checkbox>
              </v-flex>

              <v-flex md2>
                <v-checkbox
                  label="Акт."
                  v-model="checkbox"
                   class="shrink ml-3"
                ></v-checkbox>
              </v-flex>
              <v-flex md4>
                <v-select
                  :items="vacans"
                  label="Тип вакансии"
                  hide-details
                ></v-select>
              </v-flex>
              <!-- <v-flex md4>
                <v-checkbox
                  label="с вакансиями"
                  v-model="checkbox"
                   class="shrink ml-3"
                ></v-checkbox>
              </v-flex> -->
              <v-flex md4 >
                <v-switch class="shrink ml-3"
                  label="C вакансиями"
                  v-model="switch1"
                ></v-switch>
              </v-flex>
              <v-flex md4 >
                <v-switch class="shrink ml-3"
                  label="Подтверждена"
                  v-model="switch1"
                ></v-switch>
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
  data: () => ({
    extraSearch: false,
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
