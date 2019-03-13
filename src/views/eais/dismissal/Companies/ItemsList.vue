<template>
  <div>
    <pre-loader v-if="this.$store.state.eais.searchLoading"></pre-loader>
    <vue-perfect-scrollbar v-else style="max-height:calc(100vh - 330px)" :settings="settings">

      <v-card
      v-for="(item, index) in items"
      :key="item.id"
      class="eais__list mb-1"
      >
        <v-container fluid py-3 @click="editElement(item)">
          <v-layout row wrap>

            <v-flex md3 class="row">
              <span class="body-1">{{item.data.extraName}}</span>
            </v-flex>

            <v-flex md1>
              <!-- <span class="body-1">М {{item.data.vidd}} {{item.data.vid}}</span> -->
            </v-flex>

            <v-flex md3>
              <span class="body-1">
                <span v-if="item.data.date_beg !== null">С {{ forTime(item.data.date_beg) }}</span>
                <span v-if="item.data.date_end !== null"> по {{ forTime(item.data.date_end) }}</span>
              </span>
            </v-flex>

            <!-- <v-flex md2>
              <span class="body-1">Сокращение {{item.data.mv}} {{item.data.prim}}</span>
            </v-flex> -->

            <v-flex md3>
              <span class="body-1 ">{{item.data.k_v}} чел</span>
            </v-flex>

            <v-flex md2  pr-4>
              <span class="body-1" text-md-right>
                <span v-if="item.data.cz_cod">{{ emplCenters[emplCenters.findIndex(x => x.emplCenterId === item.data.cz_cod)].shortName }}</span>
              </span>
            </v-flex>

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
      // items: []
    }),
  mounted() {
    this.checkFields();
    // this.newElement();
    // this.getListItems("api/v1/eaisCompanies/");
  },
  computed: {
    items () {
      return this.$store.state.eais.items;
    },
    emplCenters() {
      return this.$store.state.eais.stateHandbooks.emplCenters
    }
  },
  methods: {
    checkFields() {
      if (this.$store.state.eais.items[0] && this.$store.state.eais.items[0].classCode !== 'cl_mv') {
        this.$store.commit('clearItems');
      }
    },
    editElement(item) {
      this.$store.dispatch('editElement', item);
      this.$router.push('company/' + item.id + '/');
    },
    getListItems(val) {
      this.$store.dispatch('getListItems', val);
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
