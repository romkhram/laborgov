<!-- Shopping Cart Widget -->
<template>
<div>
<vue-perfect-scrollbar style="max-height:calc(100vh - 450px)" :settings="settings">

        <v-card color="blue-grey lighten-4"
        v-for="(item, index) in duplicateItems"
        :key="item.id"
        class="eais__list mb-1"
        >
          <v-container fluid py-3 grid-list-sm>
            <v-layout row wrap>

              <v-flex md4>
                <span class="body-1">{{item.data.longName}}</span>
              </v-flex>

              <v-flex md2>
                <span class="body-1">ИНН: <span class="subheading">{{item.data.inn}}</span></span>
              </v-flex>

              <v-flex md2>
                <span class="body-1">КПП: <span class="subheading">{{item.data.kppInn}}</span></span>
              </v-flex>

              <v-flex md2>
                <span class="body-1">ОГРН: <span class="subheading">{{item.data.ogrn}}</span></span>
              </v-flex>

              <v-flex md2>
                <span class="body-1">ОКПО: <span class="subheading">{{item.data.okpo}}</span></span>
              </v-flex>

            </v-layout>
          </v-container>
        </v-card>


        <v-card
        v-for="(item, index) in this.$store.state.eais.dublicateItems"
        :key="item.id"
        class="eais__list mb-1"
        >
          <v-container fluid py-3 grid-list-sm>
            <v-layout row wrap>

              <v-flex md4>
                <span class="body-1">{{item.data.longName}}</span>
              </v-flex>

              <v-flex md2>
                <span class="body-1">ИНН: <span class="subheading">{{item.data.inn}}</span></span>
              </v-flex>

              <v-flex md2>
                <span class="body-1">КПП: <span class="subheading">{{item.data.kppInn}}</span></span>
              </v-flex>

              <v-flex md2>
                <span class="body-1">ОГРН: <span class="subheading">{{item.data.ogrn}}</span></span>
              </v-flex>

              <v-flex md2>
                <span class="body-1">ОКПО: <span class="subheading">{{item.data.okpo}}</span></span>
              </v-flex>

            </v-layout>
          </v-container>
        </v-card>

</vue-perfect-scrollbar>
<!-- <v-btn color="grey lighten-1" dark absolute bottom left fab small @click="newItem" style="margin-bottom: 31px;">
  <v-icon>add</v-icon>
</v-btn> -->


</div>
</template>

<style>
.eais__list:nth-child(even) {
  background-color: #fafafa;
}
.eais__list span.body-1 {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.app-card .app-card-title {
  background: #fafafa;
}
.multiflex:hover {
  background: #f5f5f5;
}

span.body-1:first-letter {text-transform: capitalize;}
.eais__readerform .body-1 {color: rgba(0, 0, 0, 0.50);}
.eais__readerform .subheading:empty::before {content: "\2014";}
.eais__readerform .subheading {color: #464D69;}
</style>

<script>
import { mapState } from "vuex";
import api from "Api";
import Vue from 'vue'

export default {
  mounted() {
    // this.clearDuplicate();
    this.renameConsole();
  },
	props: ['oneItem', 'items', 'duplicateItems'],
  data: () => ({
    requests: false,
		sign: ['Руководитель', 'Уволен', 'Основной'],
    settings: {
      maxScrollbarLength: 100
    },
    noDataText: 'Нет данных',
    editNewDialog: false,
    switch1: false,
    editedItem: {},
    isNew: false,
    reasons: [
      'Развитие',
      'Создание',
      'Отсутствие',
      'в РФ',
      'Иные'
    ],
    dateMenu01: false,
    dateMenu02: false,
    dateMenu03: false,
    dateMenu04: false,
    date01: null,
    date02: null,
    date03: null,
    date04: null,
  }),
  computed: {
		// items () {
		// 	return this.emploer.linkedData.contacts;
		// },
		sprPositions () {
			return this.$store.state.eais.sprPositions;
		},

  },
  methods: {
    renameConsole() {
      console.log('запустили renameConsole');
      if (!this.$store.state.eais.listMode) {
        this.$store.commit('listModeCh');
      }
      document.querySelectorAll(".app-card .app-card-title h3")[1].textContent = "Привязанные двойики";
    },
    // clearDuplicate() {
    //   this.duplicateItems = [];
    //   console.log(this.duplicateItems);
    //   const thisItem = this.items.findIndex(x => x.id === this.oneItem.id);
    //   this.items.splice(thisItem, 1);
    // },
    // addToOriginal(item) {
    //   this.duplicateItems.push(item);
    //   const thisItem = this.items.findIndex(x => x.id === item.id);
    //   this.items.splice(thisItem, 1);
    // },
    editItem (item) {
      this.isNew = false;
      this.editedItem = item.data;
      console.log(this.editedItem);
      this.editNewDialog = true;
    },
    newItem () {
      this.isNew = true;
      this.editedItem = {}
      this.editNewDialog = true;
    },
    createItemVal(items, linkedDataName) {
      items.push({classCode: linkedDataName});
      let objlength = items.length - 1;
      Vue.set(items[objlength], 'data', this.editedItem);
      this.addUserIds(items[objlength].data);
      this.editNewDialog = false;
    },
    addUserIds(val) {
      Vue.set(val, 'userOwnerId', 9990000000);
      Vue.set(val, 'userEditorId', 9990000000);
    }
  }
};
</script>
