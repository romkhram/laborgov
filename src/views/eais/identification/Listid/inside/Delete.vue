<template>
<div>
    <vue-perfect-scrollbar style="max-height:calc(100vh - 450px)" :settings="settings">
        <template>
            <v-card v-for="(item, index) in itemsD" :key="item.index" class="eais__list mb-1">
                <v-container fluid py-3>
                    <v-layout row wrap>

                      <v-flex md3>
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

                      <v-flex md1 py-0>
                          <div class="text-xs-right mrm-4">
                              <v-btn class="ma-0" icon @click="openApprove(item, index)">
                                  <v-icon color="primary">delete</v-icon>
                              </v-btn>

                          </div>
                      </v-flex>

                    </v-layout>
                </v-container>
            </v-card>

        </template>
    </vue-perfect-scrollbar>

    <v-dialog v-model="approve" max-width="600">
        <v-card class="pa-3">
          <v-card-title>
            <h3 class="ironthm-sec-title">Удалить, вы уверены?</h3>
          </v-card-title>
          <v-card-actions>
              <v-spacer></v-spacer>

              <v-btn color="primary" @click="approve = false">
                  Нет
              </v-btn>

              <v-btn class="ml-3" color="primary" @click="deleteItem()">
                  Да
              </v-btn>
          </v-card-actions>
        </v-card>
    </v-dialog>

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
</style>

<script>
import Vue from 'vue'
// import modification from "@/mixins/modification";
// import rules from "@/mixins/rules";

export default {
	props: ['oneItem'],
  // mixins: [modification, rules],
  data: () => ({
    className: 'cl_idant_ref',
    settings: {
      maxScrollbarLength: 100
    },
    approve: false,
    approveVars: {
      item: {},
      index: null
    }
  }),
  computed: {
    forEdit () {
      return this.oneItem.linkedData[this.className];
    },
    itemsD () {
      return this.$store.state.eais.dublicateItems;
    },
    clIdant() {
      return this.oneItem.linkedData.mpArr_cl_idant_ref;
    },
    allFields() {
      if (this.editedItem.openingDate &&
        this.editedItem.account && this.editedItem.account.length == 20 &&
        this.editedItem.accountType &&
        this.editedItem.bankId
      ) {
        return false;
      } else {return true}
    },
    banks() {
			return this.$store.state.eais.stateHandbooks.banks;
		},
    sprACCTYPEs() {
			return this.$store.state.eais.stateHandbooks.sprACCTYPEs;
		}
  },
  methods: {
    openApprove(item, index) {
      this.approve = true;
      console.log(item.id);
      console.log(this.clIdant.find(x => x.data.c_client_old === item.id));
      this.approveVars.item = this.clIdant.find(x => x.data.c_client_old === item.id);
      this.approveVars.index = index;
    },
    deleteItem() {
      this.ldDelete(this.approveVars.item);
      // console.log(this.approveVars.index);
      // console.log(this.approveVars.item);
      this.itemsD.splice(this.approveVars.index, 1);
      this.approve = false;
      this.$store.commit('dontSaved');
    },
    ldDelete(val) {
      console.log(val);
      if (val.id) {
        if (!this.forEdit.delete) {
          Vue.set(this.forEdit, 'delete', []);
        }
        var ldDelete = this.forEdit.delete;
        ldDelete.push(val)
      }
       //else {
      //   const ldCreate = this.forEdit.create;
      //   ldCreate.splice(ldCreate.findIndex(x => x.data.account === val.data.account), 1);
      //   if (ldCreate.length === 0) {
      //     delete this.forEdit.create;
      //   }
      // }
    },
    extraFunk() {
    }
  }
};
</script>




<!--
<template>
<div>
<vue-perfect-scrollbar style="max-height:calc(100vh - 450px)" :settings="settings">

        <v-card
        v-for="(item, index) in itemsD"
        :key="item.index"
        class="eais__list mb-1"
        >
          <v-container fluid py-3 grid-list-sm>
            <v-layout row wrap>

              <v-flex md3>
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

              <v-flex md1 py-0>
                  <div class="text-xs-right mrm-4">
                      <v-btn class="ma-0" icon @click="openApprove(item, index)">
                          <v-icon color="primary">delete</v-icon>
                      </v-btn>
                  </div>
              </v-flex>

            </v-layout>
          </v-container>
        </v-card>

</vue-perfect-scrollbar>


<v-dialog v-model="approve" max-width="600">
    <v-card class="pa-3">
      <v-card-title>
        <h3 class="ironthm-sec-title">Удалить, вы уверены?</h3>
      </v-card-title>
      <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn color="primary" @click="approve = false">
              Нет
          </v-btn>

          <v-btn class="ml-3" color="primary" @click="deleteItem()">
              Да
          </v-btn>
      </v-card-actions>
    </v-card>
</v-dialog>

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
import modification from "@/mixins/modification";

export default {
  mounted() {
    // this.clearDuplicate();
    this.renameConsole();
  },
	props: ['oneItem'],
  mixins: [modification],
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
    listMode: this.listMode
  }),
  computed: {
		itemsD () {
			return this.$store.state.eais.dublicateItems
		},
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
      this.listMode = true;
      document.querySelectorAll(".app-card .app-card-title h3")[1].textContent = "Привязанные двойики";
    },
    // clearDuplicate() {
    //   this.duplicateItems = [];
    //   console.log(this.duplicateItems);
    //   const thisItem = this.items.findIndex(x => x.id === this.oneItem.id);
    //   this.items.splice(thisItem, 1);
    // },
    addToOriginal(item) {
      this.duplicateItems.push(item);
      const thisItem = this.items.findIndex(x => x.id === item.id);
      this.items.splice(thisItem, 1);
    },
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
</script> -->
