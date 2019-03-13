<!-- Shopping Cart Widget -->
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


            <v-flex md3 pb-0>
              <span class="subheading">{{item.data.reg_bak}}</span>
            </v-flex>

            <!-- <v-flex md2>
              <span class="body-1">Рег. {{new Date(item.data.reg_date).toLocaleDateString()}}</span>
            </v-flex> -->

            <v-flex md6 pb-0 class="row">
              <span class="subheading">{{item.data.fam}} {{item.data.nam}} {{item.data.famn}}</span>
            </v-flex>

            <v-flex md3 pb-0>
              <span class="body-1">СНИЛС: <span class="subheading">{{item.data.spens}}</span></span>
            </v-flex>

            <v-flex md3 pt-1>
              <span class="body-1">
                <span v-if="item.data.status !== null && sprRegStatuss.find(x => x.typ_cod == item.data.reg_status)">
                  {{ sprRegStatuss.find(x => x.typ_cod == item.data.reg_status).typ_name }}
                </span>
              </span>
            </v-flex>

            <v-flex md6 pt-1>
              <span class="body-1">Дата рождения: <span class="subheading">{{ forTime(item.data.date_borth) }}</span></span>
            </v-flex>

            <v-flex md3 pt-1>
              <span class="body-1">Паспорт: <span class="subheading">{{item.data.austype}} {{item.data.ausnum}}</span></span>
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
      // items: []
    }),
  // beforeMount() {
  //   this.getHandbook({
  //     path:	'sprPersStatuss', code: 'typ_cod', name: 'typ_name'
  //   });
  // },
  mounted() {
    this.checkFields();
    // this.newElement();
    // this.getListItems("api/v1/perses/");
  },
  computed: {
    items () {
      return this.$store.state.eais.items;
    },
    sprPersStatuss() {
      return this.$store.state.eais.stateHandbooks.sprPersStatuss;
    },
    sprRegStatuss() {
      return this.$store.state.eais.stateHandbooks.sprRegStatuss;
    }
  },
  methods: {
    checkFields() {
      if (this.$store.state.eais.items[0] && this.$store.state.eais.items[0].classCode !== 'pers') {
        this.$store.commit('clearItems');
      }
    },
    editElement(item) {
      // console.log(item.links[0].href);
      this.$store.dispatch('editElement', item);
      this.$router.push('population/' + item.id + '/');
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
