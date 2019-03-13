<!-- Shopping Cart Widget -->
<template>
  <div>
    <vue-perfect-scrollbar style="max-height:calc(100vh - 330px)" :settings="settings">
    <template>

      <v-card
      v-for="(item, index) in items"
      :key="item.id"
      class="eais__list mb-1"
      >
        <v-container fluid py-3>
          <v-layout row wrap>

            <v-flex md3 class="row">
              <span class="body-1">АО Банк Советский</span>
            </v-flex>

            <v-flex md3>
              <span class="body-1">Менеджер по продажам</span>
            </v-flex>

            <v-flex md2>
              <span class="body-1" >З/П: 60 000 &#8381;</span>
            </v-flex>

            <v-flex md1>
              <span class="body-1" >Своб. 3</span>
            </v-flex>

            <v-flex md2>
              <span class="body-1" >Центральный р-н</span>
            </v-flex>

            <v-flex md1 py-1>
              <div class="text-xs-right mrm-4">
                  <v-btn class="my-0" icon @click="requests = true">
                      <v-icon color="primary">event_note</v-icon>
                  </v-btn>
              </div>
            </v-flex>

          </v-layout>
        </v-container>
      </v-card>

		</template>
</vue-perfect-scrollbar>

<v-snackbar
  v-model="requests"
  auto-height
  vertical
  color="primary"
  top
  class="headline"
>
  Переход в выбранную вакансию <br> в разделе «Работодатели. Вакансии»
  <div class="text-xs-right">
    <v-btn flat icon @click="requests = false">
      <v-icon>close</v-icon>
    </v-btn>
  </div>
</v-snackbar>

  </div>
</template>

<style>
.eais__list {
  cursor: pointer;
}
.eais__list:nth-child(even) {
  background-color: #fafafa;
}
.eais__list:hover, .eais__list:nth-child(even):hover {
  background-color: #eee;
}
.eais__list span.body-1 {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.app-card .app-card-title {
  background: #fafafa;
}
</style>

<script>
import api from "Api";
import axios from 'axios';

export default {
  data: () => ({
      settings: {
        maxScrollbarLength: 100
      },
      requests: false,
      loader: true,
      selected: [],
      localEmployers: [],
      headers: [
        {
          text: "Order Id",
          align: "center",
          sortable: false,
          value: "id"
        },
        {
          text: "Product Name",
          align: "center",
          sortable: false,
          value: "productName"
        },
        {
          text: "Quantity",
          align: "center",
          sortable: false,
          value: "quantity"
        },
        {
          text: "Status",
          align: "center",
          sortable: false,
          value: "status"
        },
        {
          text: "Amount",
          align: "center",
          sortable: false,
          value: "amount"
        },
        {
          text: "",
          align: "center",
          sortable: false
        }
      ],
      // items: []
    }),
  mounted() {
    // this.newElement();
    // this.getListItems("api/v1/vacs/");
  },
  computed: {
    items () {
      return this.$store.state.eais.items;
    }
  },
  methods: {
    editElement(item) {
      // console.log(item.links[0].href);
      this.$store.dispatch('editElement', item);
      this.$router.push('vacancies/' + item.id + '/');
    },
    getListItems(val) {
      console.log();
      this.$store.dispatch('getListItems', val);
      // this.$store.dispatch('postGetEmployers');
      // this.$store.dispatch("getToken", this.auth);
    },
    newElement() {
      this.$store.dispatch('newElement');
    },
    deleteElement() {
      this.$store.dispatch('deleteElement');
    }
  }
};
</script>
