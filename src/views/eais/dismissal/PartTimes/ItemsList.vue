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
        <v-container fluid py-3 @click="editElement(item)">
          <v-layout row wrap>

            <v-flex md1 xs2>
              <span class="body-1" v-text="item.id"></span>
            </v-flex>

            <v-flex md4 xs4 class="row">
              <span class="body-1">{{item.data.longName}}</span>
            </v-flex>

            <v-flex md3 xs6>
              <span class="body-1 text-md-right" v-text="item.data.emplCenterId"></span>
            </v-flex>

            <v-flex md4 xs6 pr-4>
              <span class="body-1 text-md-right">{{new Date(item.data.dateReg).toLocaleDateString()}}</span>
            </v-flex>

          </v-layout>
        </v-container>
      </v-card>

		</template>
</vue-perfect-scrollbar>
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
    this.getListItems("api/v1/eaisCompanies/");
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
      this.$router.push('parttime/' + item.id + '/');
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
