<template>
  <div>
    <vue-perfect-scrollbar style="max-height:calc(100vh - 260px)" :settings="settings">
    <template>

      <v-card
      v-for="(item, index) in items"
      :key="item.id"
      class="eais__list mb-1"
      >
        <v-container fluid py-3 @click="editElement(item)" class="eais__readerform">
          <v-layout row wrap>


            <!-- <v-flex md3 pb-0>
              <span class="body-1">СНИЛС: <span class="subheading">{{item.data.psnils}}</span></span>
            </v-flex> -->

            <v-flex md2 pb-0>
              <span class="body-1">
                <span class="subheading" v-if="item.data.request_num">{{item.data.request_num}}</span>
                <span class="subheading" v-else>{{ (item.id).toString().slice(0,3) + 38 + (item.id).toString().slice(-2) }}</span>
              </span>
            </v-flex>
            <!-- <v-flex md2>
              <span class="body-1" v-if="item.data.psnils">{{item.data.psnils}}</span>
            </v-flex> -->

            <v-flex md4 pb-0 class="row">
              <span class="body-1"><span class="subheading">{{item.data.plastname}} {{item.data.pfirstname}} {{item.data.pmiddlename}}</span></span>
            </v-flex>

            <v-flex md3 pb-0>
              <span class="body-1">Дата подачи: <span class="subheading" v-if="item.data.applicationdate">{{forTime(item.data.applicationdate)}}</span></span>
            </v-flex>

            <v-flex md3 pb-0>
              <span class="body-1">Дата поступления:
                <span class="subheading" v-if="item.data.in_date">{{forTime(item.data.in_date)}}</span>
                <span class="subheading" v-else-if="!item.data.request_num">{{forTime(item.data.applicationdate)}}</span>
              </span>
            </v-flex>

            <v-flex md2 pt-1>
              <span class="body-1"></span>
            </v-flex>

            <v-flex md4 pt-1>
              <span class="body-1">{{item.data.appname}}</span>
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
      // items: []
    }),
    mounted() {
      this.checkFields();
    },
  computed: {
    items () {
      return this.$store.state.eais.items;
    }
  },
  methods: {
    checkFields() {
      if (this.$store.state.eais.items[0] && this.$store.state.eais.items[0].classCode !== 'gu_request') {
        this.$store.commit('clearItems');
      }
    },
    editElement(item) {
      // console.log(item.links[0].href);

      var forEdit = {};
      forEdit.item = item;
      forEdit.selLinks = [
        'gu_request_elem_ref',
        'sprGuRequestStatuses'
      ];
      this.$store.dispatch('editElement', forEdit);
      this.$router.push('reception/' + item.id + '/');
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
