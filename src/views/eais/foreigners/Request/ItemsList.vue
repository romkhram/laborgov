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


            <!-- <v-flex md4>
              <span class="body-1">
                {{item.data.prof_cod}}:
                {{ sl_profs[sl_profs.findIndex(x => x.prof_cod === item.data.prof_cod)].prof_name }}
              </span>
            </v-flex> -->

            <v-flex md4>
              <span class="body-1">{{item.data.extraName}}</span>
            </v-flex>


            <v-flex md3>
              <span class="body-1">
                <span v-if="item.data.in_date !== null">Дата заявки {{ forTime(item.data.in_date) }}</span>
              </span>
            </v-flex>

            <v-flex md2>
              <span class="body-1">Численность: {{item.data.k_all}}</span>
            </v-flex>

            <v-flex md3 pr-4>
              <span class="body-1">ИР в прошлом году: {{item.data.k_prof_bak}}</span>
            </v-flex>

            <!-- <v-flex md4>
              <span class="body-1">Требуется ИР: {{item.data.extraName}}</span>
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
      }
    }),
  mounted() {
    this.checkFields();
  },
  computed: {
    items () {
      return this.$store.state.eais.items;
    },
    sl_profs() {
      return this.$store.state.eais.stateHandbooks.sl_profs
    }
  },
  methods: {
    checkFields() {
      if (this.$store.state.eais.items[0] && this.$store.state.eais.items[0].classCode !== 'cl_z') {
        this.$store.commit('clearItems');
      }
      // if (!this.$store.state.eais.insideSearch) {
      //   this.$store.commit('clearItems');
      // } else {
      //   this.$store.commit('removeInsideSearch');
      // }
    },
    editElement(item) {
      this.$store.dispatch('editElement', item);
      this.$router.push('request/' + item.id + '/');
    },
    getListItems(val) {
      this.$store.dispatch('getListItems', val);
    },
    deleteElement() {
      this.$store.dispatch('deleteElement');
    }
  }
};
</script>
