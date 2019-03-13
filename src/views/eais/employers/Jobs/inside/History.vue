<!-- Shopping Cart Widget -->
<template>
<div>
    <!-- <pre-loader v-if="!items"></pre-loader>  v-else -->
    <vue-perfect-scrollbar style="max-height:calc(100vh - 400px);" :settings="settings">
        <template>
            <v-card
						v-for="(item, index) in items"
						:key="item.index"
						class="eais__list mb-1 py-1">
                <v-container fluid py-3>
                    <v-layout row wrap>

                      <v-flex md2>
        								<span class="body-1">
        									<span v-if="item.data.acs_date !== null">{{ forTime(item.data.acs_date) }}</span>
        								</span>
        							</v-flex>

                        <v-flex md4>
                          <span class="body-1" v-if="item.data.acs_cod">
                            {{ sprACSs.find(x => x.codeInGroup === item.data.acs_cod).fullName }}
                          </span>
                        </v-flex>

                        <v-flex md2>
                            <span class="body-1">{{item.data.cont_comm}}</span>
                        </v-flex>

                        <!-- <v-flex md2 py-1>
                            <div class="text-xs-right mrm-4">
                                <v-btn class="ma-0" icon @click="editItem(item)">
                                    <v-icon color="primary">edit</v-icon>
                                </v-btn>
                                <v-btn class="ma-0" icon @click="openApprove(item, index)">
                                    <v-icon color="primary">delete</v-icon>
                                </v-btn>

                            </div>
                        </v-flex> -->

                    </v-layout>
                </v-container>
            </v-card>

        </template>
    </vue-perfect-scrollbar>

    <!-- <v-btn color="grey lighten-1" dark absolute bottom left fab small @click="newItem" style="margin-bottom: 31px;">
      <v-icon>add</v-icon>
    </v-btn> -->

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
            <v-card-title class="headline">Вид экономической деятельности</v-card-title>

            <v-container fluid grid-list-xl>
                <v-layout row wrap>

									<!-- <v-flex md2 class="required">
										<v-autocomplete
                      :rules="[fieldRules.required]"
                     :no-data-text="noDataText"
										v-model="editedItem.code"
										:items="slOkveds"
										item-text="shifr"
										item-value="shifr"
										label="Код"
										></v-autocomplete>
									</v-flex>

                  <v-flex md10 class="required">
										<v-autocomplete
                      :rules="[fieldRules.required]"
                     :no-data-text="noDataText"
										v-model="editedItem.code"
										:items="slOkveds"
										item-text="name"
										item-value="shifr"
										label="Расшифровка"
										></v-autocomplete>
                  </v-flex> -->

                  <!-- <v-flex md3>
                    <v-switch
                      label="Основной"
                      v-model="editedItem.addressSign"
                      true-value="2"
                      false-value="1"
                      class="allactive"
                    ></v-switch>
                  </v-flex> -->

                  <!-- <v-flex md3>
                      <v-switch label="Основной" v-model="switch1"></v-switch>
                  </v-flex> -->

                </v-layout>
            </v-container>

            <v-card-actions>
              <div class="ml-3">
                <p class="requiredNote primary--text">	&mdash; обязательные поля</p>
              </div>
                <v-spacer></v-spacer>

                <v-btn v-if="isNew" color="primary" flat="flat" @click="editNewDialog = false">
                    Отменить
                </v-btn>

                <v-btn v-if="isNew" :disabled="allFields" color="primary" flat="flat" @click="createItemVal(items)">
                    Создать
                </v-btn>

                <v-btn v-if="!isNew" color="primary" flat="flat" @click="editNewDialog = false">
                    Продолжить
                </v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>

</div>
</template>

<script>
import Vue from 'vue'
import modification from "@/mixins/modification";
import rules from "@/mixins/rules";

export default {
	props: ['oneItem'],
  mixins: [modification, rules],
  data: () => ({
    className: 'vac_history_ref',
  }),
  mounted() {
    this.getContacts();
  },
  computed: {
    allFields() {
      if (this.editedItem.code) {
        return false;
      } else {return true}
    },
		slOkveds () {
			return this.$store.state.eais.stateHandbooks.sl_okveds;
		},
    sprACSs() {
      return this.$store.state.eais.stateHandbooks.sprACSs;
    }
  },
  methods: {
    getContacts() {
      console.log('getVacContacts');
      this.$store.dispatch('getVacContacts');
    },
    extraFunk() {
    }
  }
};
</script>
