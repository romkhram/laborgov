<!-- Shopping Cart Widget -->
<template>
<div>
    <vue-perfect-scrollbar style="max-height:calc(100vh - 320px)" :settings="settings">
        <template>
            <v-card v-for="(item, index) in sentences" :key="item.index" class="eais__list mb-1">
                <v-container fluid py-3>
                    <v-layout row wrap>

                      <v-flex md3>
              					<span class="body-1">
                          <span v-if="item.data.compName">{{item.data.compName}}</span>
                          <span v-else>{{item.data.c_client}}</span>
                        </span>
              				</v-flex>

                        <v-flex md2>
                          <span class="body-1"><span v-if="item.data.give_date">{{ forTime(item.data.give_date) }}</span></span>
                				</v-flex>

              					<v-flex md3>
              						<span class="body-1">{{item.data.prof_cod}}:
              							{{ sl_profs[sl_profs.findIndex(x => x.prof_cod === item.data.prof_cod)].prof_name }}
              						</span>
              					</v-flex>

              					<v-flex md1>
              						<span class="body-1">{{item.data.salary}} ₽</span>
              					</v-flex>

              					<v-flex md2>
              						<span class="body-1">
                          {{ sprRecordCloses[sprRecordCloses.findIndex(x => x.typ_cod === item.data.fin_way)].typ_name }}</span>
              					</v-flex>

                        <v-flex md1 py-1>
                          <!--  -->
                            <div class="text-xs-right mrm-4" v-if="item.data.fin_way !== 2">
                                <v-btn :disabled="item.data.disable" class="ma-0" icon @click="preEdit(item)">
                                    <v-icon color="primary">edit</v-icon>
                                </v-btn>

                            </div>
                        </v-flex>

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
        <v-card class="eais__readerform">
            <v-card-title class="headline">Направление № {{editedItem.dir_num}}</v-card-title>

            <v-container fluid grid-list-xl>
                <v-layout row wrap class="mb-3">

                  <v-flex md9 pt-1 pb-4>
                    <span class="body-1">Работодатель</span>
                    <span class="subheading font-weight-medium">
                      <span v-if="editedItem.compName">{{ editedItem.compName }}</span>
                    </span>
                  </v-flex>

                  <v-flex md3 py-1>
                    <v-autocomplete
                    label="Закрытие"
                    v-model="editedItem.fin_way"
                    :items="sprRecordCloses"
                    item-text="typ_name"
                    item-value="typ_cod"
                    ></v-autocomplete>
                  </v-flex>

                  <v-flex md7 py-1>
                    <span class="body-1">Профессия</span>
                    <span class="subheading font-weight-medium">
                      <span v-if="editedItem">{{ sl_profs.find(x => x.prof_cod === editedItem.prof_cod).prof_name }}</span>
                    </span>
                  </v-flex>



                    <v-flex md2 py-1>
                      <span class="body-1">Дата выдачи</span>
                      <span class="subheading font-weight-medium">
                        <span v-if="editedItem.give_date">{{ forTime(editedItem.give_date) }}</span>
                      </span>
                    </v-flex>

                  <v-flex md3 py-1>
                    <span class="body-1">Заработная плата</span>
                    <span class="subheading font-weight-medium">{{editedItem.salary}} ₽</span>
                  </v-flex>

                </v-layout>

                <v-layout row wrap v-if="editedItem.fin_way === 1">

                  <v-flex md9 py-1>
                    <v-autocomplete
                      label="Отказ"
                      :items="resultValues"
                      item-text="rez_name"
                      item-value="resultValueId"
                      v-model="editedItem.rez_det"
                      ></v-autocomplete>
                    </v-flex>

                  <v-flex md3 py-1>
                      <date-picker label="Дата закрытия" v-model="editedItem.fin_date"></date-picker>
                  </v-flex>

                </v-layout>

                <v-layout row wrap v-if="editedItem.fin_way === 2 && !justItem.vac">
                  <v-flex md4 py-1>
                    <span class="subheading font-weight-medium error--text">Вакансии не существует!</span>
                  </v-flex>
                </v-layout>

                <v-layout row wrap v-if="editedItem.fin_way === 2 && justItem.vac">

                  <v-flex md4 py-1>
                    <span class="body-1">Режим работы</span>
                    <span class="subheading font-weight-medium">
                      <span v-if="justItem.vac.jreg_cod">{{ sprOperatingModes.find(x => x.codeInGroup === justItem.vac.jreg_cod).fullName }}</span>
                    </span>
                  </v-flex>

                  <v-flex md5 py-1>
                    <span class="body-1">Форма оплаты</span>
                    <span class="subheading font-weight-medium">
                      <span v-if="justItem.vac.salf_cod">{{ sprFormSalarys.find(x => x.codeInGroup === justItem.vac.salf_cod).fullName }}</span>
                    </span>
                  </v-flex>

                  <v-flex md3 py-1>
                    <span class="body-1">Характер работы</span>
                    <span class="subheading font-weight-medium">
                      <span v-if="justItem.vac.jchar_cod">{{ sprNatureWorks.find(x => x.codeInGroup === justItem.vac.jchar_cod).fullName }}</span>
                    </span>
                  </v-flex>

                  <v-flex md9 py-1 mt-3>
                    <v-text-field
                      v-model="tDoc"
                      label="Подтверждающий документ"
                    ></v-text-field>
                  </v-flex>

                  <v-flex md3 py-1 mt-3>
                      <date-picker label="Дата трудоустройства" v-model="tDate"></date-picker>
                  </v-flex>


                </v-layout>
            </v-container>

            <v-card-actions>
                <v-spacer></v-spacer>

                <v-btn color="primary" flat="flat" @click="cancel()">
                    Отменить
                </v-btn>

                <v-btn :disabled="cantSave" color="primary" flat="flat" @click="closeWithNum()">
                    Сохранить
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
    empSearch: null,
    tDate: null,
    tDoc: null,
    className: 'job_dir_ref',
    job_rez: {
      "classCode": "job_rez",
      "data": {
        "end_date": null,
        "plc_cod": null,
        "prof_lev": null,
        "salary": null,
        "rez_pri": null,
        "rez_date": null,
        "id_yn": null,
        "jchar_cod": null,
        "jreg_cod": null,
        "dir_num": null,
        "pd_cod": null,
        "kyv_cod": null,
        "reg_num": null,
        "spe_cod": null,
        "prof_spec": null,
        "prof_cod": null,
        "d_uvol": null,
        "c_client": null,
        "job_in_type": null,
        "salf_cod": null,
        "kzot_f": null
      }
    },
    /*otkaz: [
      'Отказ работодателя в трудоустройстве',
      'Отказ гражданина от подходящей работы',
      'Неявка без уважительной причины к работодателю в течении 3 дней',
      'Отказался явиться без уважительной причины на направленную работу',
      'Отказался от обучения по выданному направлению на ПО (ДПО)',
      'Отказ гражданина от трудоустройства',
      'Не отработано направление'
    ]*/
  }),
  watch: {
    sentences(val, old) {
      console.log('watch')
      console.log(val)
      console.log(old)
    }
  },
  computed: {
    sentences () {
      const sentences = this.oneItem.linkedData['mpArr_' + this.className];
      const newSentences = sentences.filter(ar => ar.data.dir_spr === 1);
      return newSentences;
      // return this.oneItem.linkedData['mpArr_' + this.className];
    },
    itemPattern() {
      const itemPattern = {
        date_begin: null,
        date_end: null,
        period: null,
        prof_cod: null,
        reg_num: this.oneItem.data.reg_num
      }
      return itemPattern;
    },
    forSearch() {
      var searchFields =  {
        "offset": 0,
        "limit": 99999,
        "filter": {
          "or": [
            {
              "cond": {
                "attr": "companyId",
                "eq": Number(this.empSearch)
              }
            },
            {
              "cond": {
                "attr": "longName",
                "like": this.empSearch
              }
            }
          ]
        },
        "orders": [
          {"asc":"longName"}
        ]
      }
      if (this.empSearch.length > 0) {
        return searchFields;
      }
    },
    cantSave() {
      if (this.editedItem.date_begin !== null && this.editedItem.date_end !== null && this.editedItem.period !== null) {
        return false;
      } else {
        return true;
      }
    },
    sprPERIODes() {
      return this.$store.state.eais.stateHandbooks.sprPERIODes;
    },
    sl_profs() {
      return this.$store.state.eais.stateHandbooks.sl_profs;
    },
		sprDerivativePositions() {
			return this.$store.state.eais.stateHandbooks.sprDerivativePositions;
		},
		sl_ares() {
			return this.$store.state.eais.stateHandbooks.sl_ares;
		},
    sprRecordCloses() {
			return this.$store.state.eais.stateHandbooks.sprRecordCloses;
		},
    sprOperatingModes() {
			return this.$store.state.eais.stateHandbooks.sprOperatingModes;
		},
    sprNatureWorks() {
			return this.$store.state.eais.stateHandbooks.sprNatureWorks;
		},
    sprFormSalarys() {
			return this.$store.state.eais.stateHandbooks.sprFormSalarys;
		},
    resultValues() {
      const results = this.$store.state.eais.stateHandbooks.resultValues;
    	const newResults = results.filter(ar => ar.det_eais === 'ОТКАЗ');
    	return newResults;
    },
    serverHandbook() {
			return this.$store.state.eais.serverHandbook.data;
		},
    serverHandDis() {
      return this.$store.state.eais.serverHandbook.disabled;
      // return true
    },
    justItem() {
      return this.$store.state.eais.justItem;
      // return true
    }

  },
  watch: {
    search (val) {
      this.empSearch = val;
    }
  },
  methods: {
    closeWithNum() {
      if (this.editedItem.fin_way === 2) {
        this.createRez();
      } else {
        this.tDate = null;
        this.tDoc = null;
        this.editNewDialog = false;
      }
    },
    createRez() {
      var job_rez = JSON.parse(JSON.stringify(this.job_rez));
      console.log('job_rez');
      console.log(job_rez);
      job_rez.data.rez_date = this.tDate;
      job_rez.data.salary = this.justItem.vac.salary;
      job_rez.data.rez_pri = this.tDoc;
      job_rez.data.jchar_cod = this.justItem.vac.jchar_cod;
      job_rez.data.jreg_cod = this.justItem.vac.jreg_cod;
      job_rez.data.dir_num = this.editedItem.reg_num;
      job_rez.data.pd_cod = this.justItem.vac.pd_cod;
      job_rez.data.prof_cod = this.justItem.vac.prof_cod;
      job_rez.data.c_client = this.editedItem.c_client;
      job_rez.data.salf_cod = this.justItem.vac.salf_cod;
      this.oneItem.linkedData.mpArr_job_rez_ref.push(job_rez);
      if (!this.oneItem.linkedData.job_rez_ref.create) {
        this.oneItem.linkedData.job_rez_ref.create = [];
      }
      this.oneItem.linkedData.job_rez_ref.create.push(job_rez);
      this.tDate = null;
      this.tDoc = null;
      this.editNewDialog = false;
    },
    cancel() {
      this.editedItem.fin_way = 0;
      this.editNewDialog = false;
      this.tDate = null;
      this.tDoc = null;
    },
    preEdit(item) {
      var that = this
      console.log(item.data.vac_num);
      this.$store.dispatch('getJustItem', 'api/v1/eaisCompanies/' + item.data.c_client);
      this.$store.dispatch('getJustItem', 'api/v1/vacs/' + item.data.vac_num);
      setTimeout(function() {
        that.editItem(item);
      }, 700);
    },
    extraFunk() {
    },
    letSearch() {
			this.$store.dispatch('searchInBack', this.forSearch);
    }
  }
};
</script>
