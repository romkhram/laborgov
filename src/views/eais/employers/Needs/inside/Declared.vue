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

                      <!-- <v-flex md1>
                          <span class="body-1">
                            <span v-if="item.data.in_date !== null">{{ forTime(item.data.in_date) }}</span>
                          </span>
                      </v-flex> -->

                      <v-flex md6>
                          <span class="body-1">
          									<span v-if="item.data.prof_cod !== null">{{item.data.prof_cod}}:
          										{{ sl_profs[sl_profs.findIndex(x => x.prof_cod === item.data.prof_cod)].prof_lname }}
          									</span>
                           </span>
                      </v-flex>

                      <v-flex md2>
                          <span class="body-1">
                            {{item.data.start_free}} / {{item.data.max_dir}} / {{item.data.max_spr}}
                          </span>
                      </v-flex>

                      <v-flex md2>
                        <span class="body-1">
                          {{item.data.salary}}<span v-if="item.data.salary1"> &mdash; {{item.data.salary1}}</span> &#8381;
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
            <v-card-title class="headline">Рабочее место</v-card-title>

            <v-container fluid grid-list-xl>
                <v-layout row wrap>

                  <v-flex md12 py-1 class="required">

                    <v-autocomplete
                      label="Профессия"
                      required :rules="[fieldRules.required]"
                      clearable
                      :items="sl_profs"
                      item-text="comboVal"
                      item-value="prof_cod"
                      v-model="editedItem.prof_cod"
                      @input="toAreCode"
                      :no-data-text="noDataText"
                    ></v-autocomplete>
                  </v-flex>


                  <v-flex md3 py-1>
                    <v-autocomplete
                      label="Производная профессия"
                      clearable
                      :items="sprDerivativePositions"
                      item-text="fullName"
                      item-value="codeInGroup"
                      v-model="editedItem.pd_cod"
                      :no-data-text="noDataText"
                    ></v-autocomplete>
                  </v-flex>

                  <v-flex md3 py-1 class="required">
                    <v-autocomplete
                      label="Сфера деятельности" required :rules="[fieldRules.required]"
                      clearable
                      :items="sl_ares"
                      item-text="are_name"
                      item-value="are_cod"
                      v-model="editedItem.are_cod"
                      :no-data-text="noDataText"
                    ></v-autocomplete>
                  </v-flex>

                  <v-flex md3 py-1>
                    <v-text-field
                      v-model="editedItem.prof_spec"
                      label="Специализация"
                    ></v-text-field>
                  </v-flex>

                  <v-flex md3 py-1 class="required">
                    <v-autocomplete
                      label="Форма оплаты" required :rules="[fieldRules.required]"
                      clearable
                      :items="sprFormSalarys"
                      item-text="fullName"
                      item-value="codeInGroup"
                      v-model="editedItem.salf_cod"
                      :no-data-text="noDataText"
                    ></v-autocomplete>
                  </v-flex>

                  <v-flex md3 py-1 class="required">
                    <v-text-field
                     type="number"
                      v-model="editedItem.salary" required :rules="[fieldRules.required]"
                      label="Зарплата: от"
                    ></v-text-field>
                  </v-flex>

                  <v-flex md3 py-1>
                    <v-text-field
                     type="number"
                      v-model="editedItem.salary1"
                      label="до"
                    ></v-text-field>
                  </v-flex>

                  <v-flex md6 py-1 class="required">
                    <v-autocomplete
                      label="Режим работы" required :rules="[fieldRules.required]"
                      clearable
                      :items="sprOperatingModes"
                      item-text="fullName"
                      item-value="codeInGroup"
                      v-model="editedItem.jreg_cod"
                      :no-data-text="noDataText"
                    ></v-autocomplete>
                  </v-flex>

                  <v-flex md3 py-1>
                    <v-text-field
                    type="number"
                    v-model="editedItem.job_time"
                    label="Продолжительность рабочего дня, в часах"
                    ></v-text-field>
                  </v-flex>


                   <v-flex md3 py-1>
                    <v-autocomplete
                      label="Условия труда"
                      clearable
                      :items="sprWorkConditions"
                      item-text="fullName"
                      item-value="codeInGroup"
                      v-model="editedItem.jcond_cod"
                      :no-data-text="noDataText"
                    ></v-autocomplete>
                  </v-flex>

                  <v-flex md4 py-1 class="required">
                    <v-autocomplete
                      label="Характер работы" required :rules="[fieldRules.required]"
                      clearable
                      :items="sprNatureWorks"
                      item-text="fullName"
                      item-value="codeInGroup"
                      v-model="editedItem.jchar_cod"
                      :no-data-text="noDataText"
                    ></v-autocomplete>
                  </v-flex>

                  <v-flex md2 py-1>
                     <v-text-field
                      v-model="editedItem.prof_lev"
                      label="Тарифный разряд, класс, категория"
                    ></v-text-field>
                  </v-flex>

                  <v-flex md3 py-1 class="required">
                    <v-autocomplete
                      label="Образование" required :rules="[fieldRules.required]"
                      clearable
                      :items="sprTypeEducations"
                      item-text="fullName"
                      item-value="codeInGroup"
                      v-model="editedItem.educ_cod"
                      :no-data-text="noDataText"
                    ></v-autocomplete>
                  </v-flex>

                  <v-flex md3 py-1 class="required">
                     <v-text-field
                      type="number"
                      v-model="editedItem.start_free"
                      label="Рабочих мест" required :rules="[fieldRules.required]"
                    ></v-text-field>
                  </v-flex>

                  <v-flex md3 py-1 class="required">
                     <v-text-field
                      type="number"
                      v-model="editedItem.max_dir"
                      label="Направлений" required :rules="[fieldRules.required]"
                    ></v-text-field>
                  </v-flex>

                  <v-flex md3 py-1 class="required">
                     <v-text-field
                      type="number"
                      v-model="editedItem.max_spr"
                      label="Справок" required :rules="[fieldRules.required]"
                    ></v-text-field>
                  </v-flex>

                  <v-flex md3 py-1>
                  </v-flex>

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

                <v-btn v-if="!isNew" color="primary" flat="flat" @click="createVacFrom">
                    Сформировать вакансию
                </v-btn>

                <v-btn v-if="!isNew" color="primary" flat="flat" @click="editNewDialog = false">
                    Продолжить
                </v-btn>

                <v-btn v-if="isNew" :disabled="cantSave" color="primary" flat="flat" @click="createItemVal(items)">
                    Создать
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
    className: 'cl_potrv_ref'
  }),
  computed: {
    itemPattern() {
      const itemPattern = {
        // are_cod: null,
        // educ_cod: null,
        // jchar_cod: null,
        // job_time: null,
        // jreg_cod: null,
        // max_dir: null,
        // max_spr: null,
        // prof_cod: null,
        // salary: null,
        // salf_cod: null,
        // start_free: null,
        // vac_guid: null,
        c_client: this.oneItem.data.c_client,
        cz_cod: this.oneItem.data.cz_cod
      }
      return itemPattern;
    },
    cantSave() {
      if (this.editedItem.are_cod !== null &&
          this.editedItem.educ_cod !== null &&
          this.editedItem.jchar_cod !== null &&
          this.editedItem.jreg_cod !== null &&
          this.editedItem.max_dir !== null &&
          this.editedItem.max_spr !== null &&
          this.editedItem.prof_cod !== null &&
          this.editedItem.salary !== null &&
          this.editedItem.salf_cod !== null &&
          this.editedItem.start_free !== null &&
          this.editedItem.are_cod !== undefined &&
          this.editedItem.educ_cod !== undefined &&
          this.editedItem.jchar_cod !== undefined &&
          this.editedItem.jreg_cod !== undefined &&
          this.editedItem.max_dir !== '' &&
          this.editedItem.max_spr !== '' &&
          this.editedItem.prof_cod !== undefined &&
          this.editedItem.salary !== '' &&
          this.editedItem.salf_cod !== undefined &&
          this.editedItem.start_free !== '') {
        return false;
      } else {
        return true;
      }
    },
		slOkveds () {
			return this.$store.state.eais.stateHandbooks.sl_okveds;
		},
    sprDerivativePositions() {
			return this.$store.state.eais.stateHandbooks.sprDerivativePositions;
    },
    sl_profs() {
      return this.$store.state.eais.stateHandbooks.sl_profs;
    },
    sl_ares() {
      return this.$store.state.eais.stateHandbooks.sl_ares;
    },
    sprFormSalarys() {
      return this.$store.state.eais.stateHandbooks.sprFormSalarys;
    },
    sprOperatingModes() {
      return this.$store.state.eais.stateHandbooks.sprOperatingModes;
    },
    sprWorkConditions() {
      return this.$store.state.eais.stateHandbooks.sprWorkConditions;
    },
    sprNatureWorks() {
      return this.$store.state.eais.stateHandbooks.sprNatureWorks;
    },
    sprTypeEducations() {
      return this.$store.state.eais.stateHandbooks.sprTypeEducations;
    }
  },
  methods: {
    extraFunk() {
    },
		toAreCode() {
			const areCode = this.sl_profs[this.sl_profs.findIndex(x => x.prof_cod === this.editedItem.prof_cod)].are_cod;
			console.log(areCode);
			if (areCode !== 0) {
				this.editedItem.are_cod = areCode;
			}
		},
    createVacFrom() {
      // if (this.editedItem.vac_guid !== null) {
      //   console.log('null');
      //   this.editNewDialog = false;
      // } else {
        this.editedItem.c_client = this.oneItem.data.c_client;
        this.editedItem.cz_cod = this.oneItem.data.cz_cod;
        var val = {};
        val.data = JSON.parse(JSON.stringify(this.editedItem));
        val.savePath = "api/v1/vacs/";
        val.classCode = "vac";
        console.log(val);
        this.$store.dispatch('createFrom', val);
      // }
    }
  }
};
</script>
