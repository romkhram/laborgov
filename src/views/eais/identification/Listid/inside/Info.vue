<!-- Shopping Cart Widget -->
<template>
<div>
<vue-perfect-scrollbar class="topScreen" :settings="settings">
        <v-card
        v-for="(item, index) in dubles"
        :key="item.id"
        class="eais__list mb-1"
        :color="ifInn(item)"
        >
          <v-container fluid py-3 @click="addToOriginal(item)" grid-list-sm>
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
        <v-card></v-card>
</vue-perfect-scrollbar>

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
.topScreen {
  max-height: calc(100vh - 450px);
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
import modification from "@/mixins/modification";

export default {
  mounted() {
    this.$store.commit('clearItems');
    this.clearDuplicate();

  	this.createDublicates();
  },
	props: ['oneItem', 'dubles', 'duplicateItems', 'listMode'],
  mixins: [modification],
  data: () => ({
    className: 'cl_idant_ref',
    vavaScreen: '450px',
  }),
  computed: {
    itemPattern() {
      var itemPattern = {
        c_client: this.oneItem.id,
        c_client_old: null,
        cz_cod: this.oneItem.data.emplCenterId,
      }
      return itemPattern;
    },
		// items () {
		// 	return this.emploer.linkedData.contacts;
		// },
		sprPositions () {
			return this.$store.state.eais.sprPositions;
		},
  },
  methods: {
    createDublicates() {
      console.log(this.oneItem.linkedData.mpArr_cl_idant_ref);
      var clIdants = this.oneItem.linkedData.mpArr_cl_idant_ref;
      var clIdantsArr = [];
      clIdants.forEach(function(el) {
        clIdantsArr.push(el.data.c_client_old);
      });
      console.log('clIdantsArr');
      console.log(clIdantsArr);
    },
    ifInn(val) {
      if (val.data.inn == this.oneItem.data.inn) {
        return 'blue-grey lighten-4'
      }
    },
    clearDuplicate() {
      document.querySelectorAll(".app-card .app-card-title h3")[1].textContent = "Выберите двойников";
      this.duplicateItems = [];
      if (this.$store.state.eais.listMode) {
        this.$store.commit('listModeCh');
      }
      const thisItem = this.dubles.findIndex(x => x.id === this.oneItem.id);
      this.dubles.splice(thisItem, 1);
    },
    addToOriginal(item) {
      this.$store.commit('dontSaved');
      console.log('itemD');
      console.log(item);
      console.log(this.oneItem);
      this.itemPattern.c_client_old = item.id;
      console.log(this.itemPattern);
      this.editedItem = this.itemPattern;
      this.createItemVal(this.items);
      this.duplicateItems.push(item);
      var thisItem = this.dubles.findIndex(x => x.id === item.id);
      this.dubles.splice(thisItem, 1);
    },
    // editItem (item) {
    //   this.isNew = false;
    //   this.editedItem = item.data;
    //   console.log(this.editedItem);
    //   this.editNewDialog = true;
    // },
    // newItem () {
    //   this.isNew = true;
    //   this.editedItem = {}
    //   this.editNewDialog = true;
    // },
    // createItemVal(items, linkedDataName) {
    //   items.push({classCode: linkedDataName});
    //   let objlength = items.length - 1;
    //   Vue.set(items[objlength], 'data', this.editedItem);
    //   this.addUserIds(items[objlength].data);
    //   this.editNewDialog = false;
    // },
    addUserIds(val) {
      Vue.set(val, 'userOwnerId', 9990000000);
      Vue.set(val, 'userEditorId', 9990000000);
    }
  }
};
</script>
