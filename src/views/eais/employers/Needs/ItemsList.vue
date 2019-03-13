<!-- Shopping Cart Widget -->
<template>
  <div>
    <pre-loader v-if="this.$store.state.eais.searchLoading"></pre-loader>
    <vue-perfect-scrollbar v-else style="max-height:calc(100vh - 260px)" :settings="settings">

      <v-card
      v-for="(item, index) in items"
      :key="item.id"
      class="eais__list mb-1"
      >
        <v-container fluid py-3 @click="editElement(item)">
          <v-layout row wrap>

            <v-flex md4>
              <span class="body-1">{{item.data.extraName}}</span>
            </v-flex>

            <v-flex md4>
              <span class="body-1">
                <span v-if="item.data.fok_cod !== null">{{sprFormSubmissions[sprFormSubmissions.findIndex(x => x.codeInGroup === item.data.fok_cod)].fullName }}</span>
              </span>
            </v-flex>

            <v-flex md4>
              <span class="body-1">Принято <span v-if="item.data.creationDate !== null">{{ forTime(item.data.creationDate) }}</span></span>
            </v-flex>

            <!-- <v-flex md3>
              <span class="body-1">Заявлено: 17, Активно: 0, Закрыто: 17</span>
            </v-flex> -->

          </v-layout>
        </v-container>
      </v-card>

      <v-card v-if="!items[0]">
        <v-container fluid>
          <v-layout row wrap>

            <v-flex md12>
              <span class="body-1 primary--text">Начните работу со строки поиска</span>
            </v-flex>

          </v-layout>
        </v-container>
      </v-card>

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
    this.checkFields();
  },
  computed: {
    items () {
      return this.$store.state.eais.items;
    },
    sprFormSubmissions() {
      return this.$store.state.eais.stateHandbooks.sprFormSubmissions;
    }
  },
  methods: {
    checkFields() {
      if (this.$store.state.eais.items[0] && this.$store.state.eais.items[0].classCode !== 'cl_potr') {
        this.$store.commit('clearItems');
      }
      if (!this.$store.state.eais.insideSearch) {
        this.$store.commit('clearItems');
      } else {
        this.$store.commit('removeInsideSearch');
      }
    },
    editElement(item) {
      // console.log(item.links[0].href);
      this.$store.dispatch('editElement', item);
      this.$router.push('needs/' + item.id + '/');
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
    },
    ifForeign(val) {
      if (val) {
        return ", в т.ч. ИР "
      }
    },
  }
};
</script>
