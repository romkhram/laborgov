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
        <v-container grid-list-md text-xs-right style="width:800px">

          <v-form ref="form" lazy-validation >

            <v-layout row wrap>
              <v-flex md12>
                <v-text-field
                  label="Название"
                  hide-details
                ></v-text-field>
              </v-flex>
              <v-flex md12>
                <v-text-field
                  label="Адрес"
                  hide-details
                ></v-text-field>
              </v-flex>
              <v-flex md6>
                <v-select
                  label="Район"
                  hide-details
                ></v-select>
              </v-flex>
              <v-flex md6>
                <v-select
                  label="Муниципальный округ"
                  hide-details
                ></v-select>
              </v-flex>
              <v-flex md4>
                <v-text-field
                  label="ИНН"
                  hide-details
                ></v-text-field>
              </v-flex>
              <v-flex md4>
                <v-text-field
                  label="ОГРН"
                  hide-details
                ></v-text-field>
              </v-flex>
              <v-flex md4>
                <v-text-field
                  label="КПП"
                  hide-details
                ></v-text-field>
              </v-flex>

              <v-flex md4>
                <v-text-field
                  label="ID"
                  hide-details
                ></v-text-field>
              </v-flex>
              <v-flex md4>
                <v-text-field
                  label="ЛДПГУ"
                  hide-details
                ></v-text-field>
              </v-flex>

              <v-flex md2>
                <v-checkbox
                  label="Совп."
                   class="shrink ml-3"
                ></v-checkbox>
              </v-flex>

              <v-flex md2>
                <v-checkbox
                  label="Акт."
                   class="shrink ml-3"
                ></v-checkbox>
              </v-flex>
              <v-flex md4>
                <v-select
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
                ></v-switch>
              </v-flex>
              <v-flex md4 >
                <v-switch class="shrink ml-3"
                  label="Подтверждена"
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
      this.$store.dispatch('postGetEmployers', this.searchFields);
      this.extraSearch = false;
    },
  }
}
</script>
