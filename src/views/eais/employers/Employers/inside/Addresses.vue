<!-- Shopping Cart Widget -->
<template>
<div>
    <vue-perfect-scrollbar style="max-height:calc(100vh - 320px)" :settings="settings">
        <template>
            <v-card v-for="(item, index) in items" :key="item.id" class="eais__list mb-1">
                <v-container fluid py-3>
                    <v-layout row wrap>

                        <v-flex md10 py-1>
                            <span class="body-1">
                              <span v-if="item.data.fullAddress">
                                {{item.data.fullAddress}}
                              </span>
                              <span v-if="item.data.add_information">
                                {{item.data.add_information}}
                              </span>
                              <span v-if="!item.data.add_information && !item.data.fullAddress">
                                Строковое значение адреса не заполнено
                              </span>
                            </span>
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
            <v-card-title class="headline">Адрес</v-card-title>

            <v-container fluid grid-list-xl>
                <v-layout row wrap>

                    <v-flex md10 class="required">
                        <v-text-field :rules="[fieldRules.required]" v-model="editedItem.fullAddress" label="Адрес"></v-text-field>
                    </v-flex>

                    <v-flex md2>
                      <v-switch
                        :label="`${accSwitch}`"
                        v-model="editedItem.addressSign"
                        :true-value="2"
                        :false-value="1"
                        class="allactive"
                      ></v-switch>
                    </v-flex>

                    <v-flex md12>
                      <v-text-field v-model="editedItem.add_information" label="Дополнительная информация"></v-text-field>
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

                <v-btn v-if="isNew" :disabled="allFields" color="primary" flat="flat" @click="createItemVal(items)">
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
import rules from "@/mixins/rules";

export default {
	props: ['oneItem'],
  mixins: [modification, rules],
  data: () => ({
    itemPattern: {
      addressSign: 1
    },
    accepted: false,
    className: 'addresses',
  }),
  computed: {
    allFields() {
      if (this.editedItem.fullAddress && this.editedItem.fullAddress.length > 0
      ) {
        return false;
      } else {return true}
    },
    accSwitch() {
      if (this.editedItem.addressSign == 1) {
        var accSwitch = 'Юридический'
      } else {
        var accSwitch = 'Фактический'
      }
      return accSwitch
    },
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
