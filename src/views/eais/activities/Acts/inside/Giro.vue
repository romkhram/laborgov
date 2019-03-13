<!-- Shopping Cart Widget -->
<template>
<div>
    <vue-perfect-scrollbar style="max-height:calc(100vh - 320px)" :settings="settings">
        <template>
            <v-card v-for="(item, index) in items" :key="item.id" class="eais__list mb-1">
                <v-container fluid py-3>
                    <v-layout row wrap>

                        <v-flex md2 py-1>
                            <span class="body-1">№ счета:
                                {{item.data.account}}</span>
                        </v-flex>
                        <v-flex md4 py-1>
                            <span class="body-1">
                              {{ banks[banks.findIndex(x => x.bankId === item.data.bankId)].name_bnk }}
                              Банк
                                {{item.data.bankId}}</span>
                        </v-flex>
                        <v-flex md2 py-1>
                            <span class="body-1">Открытие:
                              {{forTime(item.data.openingDate)}}</span>
                        </v-flex>
                        <v-flex md2 py-1>
                            <span class="body-1" v-if="item.data.closingDate != null">Закрытие:
                                {{forTime(item.data.closingDate)}}</span>
                        </v-flex>

                        <v-flex md2 py-1>
                            <div class="text-xs-right mrm-4">
                                <v-btn class="ma-0" icon @click="editItem(item)">
                                    <v-icon color="primary">edit</v-icon>
                                </v-btn>
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

    <v-btn color="grey lighten-1" dark absolute bottom left fab small @click="newItem" style="margin-bottom: 31px;">
      <v-icon>add</v-icon>
    </v-btn>

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

    <v-dialog v-model="editNewDialog" max-width="1100">
        <v-card>
            <v-card-title class="headline">Расчетный счет</v-card-title>

            <v-container fluid grid-list-xl>
                <v-layout row wrap>

                    <v-flex md3>
                      <v-autocomplete
                        :items="sprACCTYPEs"
                        item-text="comboVal"
                        item-value="codeInGroup"
                        v-model="editedItem.accountType"
                        label="Вид счета"
                      ></v-autocomplete>
                    </v-flex>

                    <v-flex md3>
                        <v-text-field v-model="editedItem.account" label="№ счета"></v-text-field>
                    </v-flex>

                    <v-flex md3>
                      <date-picker label="Дата открытия" v-model="editedItem.openingDate"></date-picker>
                    </v-flex>

                    <v-flex md3>
                      <date-picker label="Дата закрытия" :min="editedItem.openingDate" v-model="editedItem.closingDate"></date-picker>
                    </v-flex>

                    <v-flex md9>
                      <v-autocomplete
                        :items="banks"
                        item-text="name_bnk"
                        item-value="bankId"
                        v-model="editedItem.bankId"
                        label="Наименование Банка"
                      ></v-autocomplete>
                        <!-- <v-select
                        label="Наименование Банка"
                        label="Наименование Банка"
                        >

                        </v-select> -->
                    </v-flex>

                    <v-flex md3>
                        <v-switch label="Основной" v-model="switch1"></v-switch>
                    </v-flex>

                </v-layout>
            </v-container>

            <v-card-actions>
                <v-spacer></v-spacer>

                <v-btn v-if="isNew" color="primary" flat="flat" @click="editNewDialog = false">
                    Отменить
                </v-btn>

                <v-btn v-if="!isNew" color="primary" flat="flat" @click="editNewDialog = false">
                    Продолжить
                </v-btn>

                <v-btn v-if="isNew" color="primary" flat="flat" @click="createItemVal(items)">
                    Создать
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
import modification from "@/mixins/modification";

export default {
	props: ['oneItem'],
  mixins: [modification],
  data: () => ({
    className: 'bankDetails',
  }),
  computed: {
    banks() {
			return this.$store.state.eais.stateHandbooks.banks;
		},
    sprACCTYPEs() {
			return this.$store.state.eais.stateHandbooks.sprACCTYPEs;
		}
  },
  methods: {
    extraFunk() {
    }
  }
};
</script>
