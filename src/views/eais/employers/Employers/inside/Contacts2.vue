<template>
<div>
    <vue-perfect-scrollbar style="max-height:calc(100vh - 320px)" :settings="settings">
        <template>
            <v-card v-for="(item, index) in items" :key="item.index" class="eais__list mb-1 py-1">
                <v-container fluid py-3>
                    <v-layout row wrap>

                        <v-flex md4>
                            <!-- <span class="body-1">{{item.data.contactName}} {{item.data.contactMiddleName}} {{item.data.contactSurname}}</span> -->
                        </v-flex>
                        <v-flex md3>
                          <span class="body-1">
														<span v-if="item.data.postId">
                              <!-- {{sprPositions[sprPositions.findIndex(x => x.codeInGroup == item.data.postId)].fullName}} -->
                            </span>
													</span>
                        </v-flex>
                        <v-flex md2>
                            <span class="body-1">eMail:
                                <!-- {{item.data.eMail}} -->
                              </span>
                        </v-flex>
                        <v-flex md2>
                            <span class="body-1">Телефон:
                                {{item.data.phoneNumber}}
                              </span>
                        </v-flex>

                        <v-flex md1 py-1>
                            <div class="text-xs-right mrm-4">
                                <v-btn class="ma-0" icon @click="editItem(item)">
                                    <v-icon color="primary">edit</v-icon>
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

    <v-dialog v-model="editNewDialog" max-width="1100">
        <v-card>
            <v-card-title class="headline">Контакты</v-card-title>

            <v-container fluid grid-list-xl>
                <v-layout row wrap>

                    <!-- <v-flex md4>
                        <v-select items="Нет данных" label="Вид счета"></v-select>
                    </v-flex> -->

                    <v-flex md4 class="required">
                        <v-text-field
                          :rules="[fieldRules.required]" v-model="editedItem.contactSurname" label="Фамилия"></v-text-field>
                    </v-flex>

                    <v-flex md4 class="required">
                        <v-text-field
                          :rules="[fieldRules.required]" v-model="editedItem.contactName" label="Имя"></v-text-field>
                    </v-flex>

                    <v-flex md4>
                        <v-text-field v-model="editedItem.contactMiddleName" label="Отчество"></v-text-field>
                    </v-flex>

										<v-flex md12>
					            <v-select
					              v-model="signVal"
					              :items="sign"
					              label="Признаки"
                        @input="getSign()"
					              multiple
                        chips small-chips deletable-chips
					            ></v-select>
					          </v-flex>

										<v-flex md3>
												<v-text-field label="СНИЛС" :rules="snils" mask="###-###-### ##" v-model="editedItem.snils"></v-text-field>
										</v-flex>

										<v-flex md2 offset-md1>
												<v-text-field label="Паспорт серия" mask="## ##" v-model="editedItem.ausser"></v-text-field>
										</v-flex>

										<v-flex md3>
												<v-text-field label="номер" mask="######" v-model="editedItem.ausnum"></v-text-field>
										</v-flex>

                    <v-flex md3>
                      <date-picker label="Дата выдачи" v-model="editedItem.ausdate"></date-picker>
                    </v-flex>

                    <v-flex md3>
                        <v-text-field label="Телефон" :mask="phone" v-model="editedItem.phoneNumber"></v-text-field>
                    </v-flex>

                    <v-flex md3>
                        <v-text-field label="Добавочный" mask="##########" v-model="editedItem.addPhoneNumber"></v-text-field>
                    </v-flex>

                    <v-flex md3>
                        <v-text-field label="Факс" mask="#(###) ###-##-##" v-model="editedItem.faxNumber"></v-text-field>
                    </v-flex>

                    <v-flex md3>
                        <v-text-field label="E-mail" :rules="[fieldRules.email]" v-model="editedItem.eMail"></v-text-field>
                    </v-flex>

                    <v-flex md12>
                        <v-text-field label="Список телефонов для клиентов" v-model="editedItem.auxiliaryPhoneNumber"></v-text-field>
                    </v-flex>

                    <!-- <v-flex md6>
                        <v-text-field label="Список телефонов для специалистов" v-model="editedItem.auxiliaryPhoneNumber"></v-text-field>
                    </v-flex> -->

                    <v-flex md4>
											<v-autocomplete
                       :no-data-text="noDataText"
											v-model="editedItem.postId"
											:items="sprPositions"
											item-text="fullName"
											item-value="codeInGroup"
											label="Должность из справочника"
											></v-autocomplete>
                    </v-flex>

                    <v-flex md4>
                      <v-autocomplete
                        label="Производная должность"
                        :items="sprDerivativePositions"
                        item-text="fullName"
                        item-value="codeInGroup"
                        v-model="editedItem.derivativePostId"
                        :no-data-text="noDataText"
                      ></v-autocomplete>
                    </v-flex>

                    <!-- <v-flex md4>
											<v-autocomplete
											label="Производная должность"
											:no-data-text="noDataText"
											v-model="editedItem.addPhoneNumber"
											></v-autocomplete>
                    </v-flex> -->

                    <v-flex md4>
                        <v-text-field label="Должность по данным работодателя" v-model="editedItem.postName"></v-text-field>
                    </v-flex>

                    <v-flex md3>
                        <v-text-field  label="Доверенность №" v-model="editedItem.docNumber"></v-text-field>
                    </v-flex>

										<v-flex md3>
                      <date-picker label="c" v-model="editedItem.docDate"></date-picker>
                    </v-flex>

                    <v-flex md3>
                      <date-picker label="по" :min="editedItem.docDate" v-model="editedItem.docEndDate"></date-picker>
                    </v-flex>

                    <!-- <v-flex md3>
											<v-autocomplete
											label="Тип"
											:no-data-text="noDataText"
											></v-autocomplete>
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
import { mapState } from "vuex";
import api from "Api";
import Vue from 'vue';
import modification from "@/mixins/modification";
import rules from "@/mixins/rules";

export default {
	props: ['oneItem'],
  mixins: [modification, rules],
  data: () => ({
    className: 'contacts',
		sign: ['Руководитель', 'Уволен', 'Основной'],
    signVal: [],
    switch1: false,
    dateMenu01: false,
    dateMenu02: false,
    dateMenu03: false,
    dateMenu04: false,
    date01: null,
    date02: null,
    date03: null,
    date04: null
  }),
  computed: {
    phone(val) {
      if (this.editedItem.phoneNumber && this.editedItem.phoneNumber.length === 7) {
        return '###-##-## ####'
      } else {
        return '#(###) ###-##-##'
      }
    },
    allFields() {
      if (this.editedItem.contactSurname && this.editedItem.contactSurname.length > 0 &&
        this.editedItem.contactName && this.editedItem.contactName.length > 0
      ) {
        return false;
      } else {return true}
    },
    sprDerivativePositions() {
      return this.$store.state.eais.stateHandbooks.sprDerivativePositions;
    },
		sprPositions() {
			return this.$store.state.eais.stateHandbooks.sprPositions;
		}
  },
  methods: {
    extraFunk() {
      this.toSign();
    },
    toSign() {
      this.signVal = [];
      console.log('Запустили признак');
      if (this.editedItem.pr === 1) {
        this.signVal.push('Уволен');
      }
      if (this.editedItem.tlf_p === 1) {
        this.signVal.push('Основной');
      }
      if (this.editedItem.pr_ruk === 1) {
        this.signVal.push('Руководитель');
      }
      console.log(this.signVal);
    },
    getSign() {
      this.editedItem.pr = null // уволен
      this.editedItem.tlf_p = null // основной
      this.editedItem.pr_ruk = null // руководитель
      var that = this
      this.signVal.forEach(function(item, i, arr) {
        if (item === that.sign[0]) {
          that.editedItem.pr_ruk = 1; // Меняем Руководителя
        } else if (item === that.sign[1]) {
          that.editedItem.pr = 1; // Меняем уволен
        } else if (item === that.sign[2]) {
          that.editedItem.tlf_p = 1; // Меняем основной
        }
      });

    }
  }
};
</script>
