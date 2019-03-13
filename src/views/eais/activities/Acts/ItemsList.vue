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

            <v-flex md1>
              <span class="body-1">{{item.data.agr_num}}</span>
            </v-flex>

            <v-flex md5>
              <span class="body-1">{{item.data.extraName}}</span>
            </v-flex>

            <v-flex md4>
              <span class="body-1">
                <span v-if="item.data.type_cod !== null && sl_vactypes.find(x => x.type_cod === item.data.type_cod)">
                  {{sl_vactypes.find(x => x.type_cod === item.data.type_cod).type_name }}
                </span>
              </span>
            </v-flex>

            <v-flex md2>
              <span class="body-1">
                <span v-if="item.data.agr_begin">с {{ forTime(item.data.agr_begin) }}</span>
                <span v-if="item.data.agr_time"> по {{ forTime(item.data.agr_time) }}</span>
              </span>
            </v-flex>

            <!-- <v-flex md2>
              <span class="body-1">Работы:
                <span v-if="item.data.date_beg">с {{ forTime(item.data.date_beg) }}</span>
                <span v-if="item.data.date_end"> по {{ forTime(item.data.date_end) }}</span>
              </span>
            </v-flex> -->

          </v-layout>
        </v-container>
        <!-- <v-btn
        absolute
        style="margin: 36px 2px 0 0"
        top
        right
        icon
        @click="deleteElement(item.id)"
        >
          <v-icon color="primary">edit</v-icon>
        </v-btn> -->
      </v-card>

      <v-card v-if="!items[0]">
        <v-container fluid>
          <v-layout row wrap>

            <v-flex md12>
              <span class="body-1 primary--text">Начните работу со строки поиска</span>
            </v-flex>

            <!-- <v-flex md12>
              <a :href="{{this.$store.state.eais.fileData}}">Скачать</a>
            </v-flex> -->

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
.eais__spinner {
  display: flex;
  justify-content: center;
  align-items: center;
  /* background: rgba(0, 0, 0, 0.8); */
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
      // loader: true,
      // selected: [],
      // localEmployers: [],
    }),
  mounted() {
    this.checkFields();
  },
  computed: {
    items () {
      return this.$store.state.eais.items;
    },
		EmplCenters() {
      console.log('stateHandbooks');
      console.log(this.$store.state.eais.stateHandbooks.emplCenters);
			return this.$store.state.eais.stateHandbooks.emplCenters;
		},
    sl_vactypes() {

      // .sort((prev, next) => prev.type_cod - next.type_cod)
      return this.$store.state.eais.stateHandbooks.sl_vactypes.sort((prev, next) => prev.type_cod - next.type_cod);
    },
  },
  methods: {
    checkFields() {
      if (this.$store.state.eais.items[0] && this.$store.state.eais.items[0].classCode !== 'agr_or') {
        this.$store.commit('clearItems');
      }
      if (!this.$store.state.eais.insideSearch) {
        this.$store.commit('clearItems');
      } else {
        this.$store.commit('removeInsideSearch');
      }
    },
    editElement(item) {
      this.$store.dispatch('editElement', item);
      this.$router.push('acts/' + item.id + '/');
    },
    getListItems(val) {
      console.log();
      this.$store.dispatch('getListItems', val);
    },
    deleteElement(val) {
      console.log(val);
      this.$store.dispatch('deleteElement', val);
    }
  }
};
</script>
