<!-- Shopping Cart Widget -->
<template>
<div>
	<pre-loader v-if="this.$store.state.eais.searchLoading"></pre-loader>
	<vue-perfect-scrollbar v-else style="max-height:calc(100vh - 330px)" :settings="settings">

		<v-card
		v-for="(item, index) in items"
		:key="item.index"
		class="eais__list mb-1"
		>

			<v-container fluid py-3 @click="editItemDir(item)">
				<v-layout row wrap>

					<v-flex md3>
							<span class="body-1">{{item.data.name}}</span>
					</v-flex>

					<v-flex md2>
						<span class="body-1">
							{{ sl_profs[sl_profs.findIndex(x => x.prof_cod === item.data.prof_cod)].prof_name }}
						</span>
					</v-flex>

					<v-flex md2>
						<span class="body-1">
							{{item.data.salary}} &#8381;
						</span>
					</v-flex>

					<v-flex md2>
							<span class="body-1">
								{{item.data.tel_m}}
							</span>
					</v-flex>

					<!-- :items="municipalityDivisions"
					item-text="comboVal"
					item-value="cim"
					v-model="persAsk.p_ra"
					label="Район" -->

					<v-flex md2>
						<span class="body-1">
							<!-- {{ municipalityDivisions[municipalityDivisions.findIndex(x => x.cim === item.data.p_ra)].txt }} -->
							{{ emplCenters[emplCenters.findIndex(x => x.emplCenterId === item.data.cz_cod)].shortName }}
						</span>
					</v-flex>

				</v-layout>
			</v-container>
		</v-card>

		<v-card v-if="!items[0]">
			<v-container fluid>
				<v-layout row wrap>

					<v-flex md12>
						<!-- <span class="body-1 primary--text">Начните работу со строки поиска</span> -->
					</v-flex>

				</v-layout>
			</v-container>
		</v-card>

</vue-perfect-scrollbar>

    <v-dialog v-model="editNewDialog" max-width="1100" class="eais__readerform">
        <v-card>
            <v-card-title class="headline primary--text">Информация о рабочем месте</v-card-title>

            <v-container fluid grid-list-xl class="eais__readerform">
                <v-layout row wrap v-if="editedItem.data">

									<v-flex md4 py-1>
										<span class="body-1">Ф.И.О.</span>
										<span class="subheading font-weight-medium">{{editedItem.data.fam}} {{editedItem.data.nam}} {{editedItem.data.famn}}</span>
									</v-flex>

									<v-flex md2 py-1>
										<span class="body-1">Дата рождения</span>
										<span class="subheading font-weight-medium">
											<span v-if="editedItem.data.date_borth !== null">{{ forTime(editedItem.data.date_borth) }}</span>
										</span>
									</v-flex>

									<v-flex md2 py-1>
										<span class="body-1">Полных лет</span>
										<span class="subheading font-weight-medium">{{ Math.floor((new Date() - new Date(editedItem.data.date_borth)) / 31536000000) }}</span>
									</v-flex>

									<v-flex md2 py-1>
										<span class="body-1">Пол</span>
										<span class="subheading font-weight-medium">
											<span v-if="editedItem.data.sex !== null">{{ sex[sex.findIndex(x => x.codeInGroup == editedItem.data.sex)].fullName }}
											</span>
										</span>
									</v-flex>

									<v-flex md2 py-1>
										<span class="body-1">ЛДПГУ</span>
										<span class="subheading font-weight-medium">{{editedItem.data.pers_num}}</span>
									</v-flex>

									<v-flex md12 py-1>
										<v-divider></v-divider>
									</v-flex>

									<v-flex md12 py-1>
										<span class="body-1">Документ, удостоверяющий личность</span>
										<span class="body-1">вид документа
											<span class="subheading font-weight-medium">
												<span v-if="editedItem.data.doctype !== null">
													{{ sprDocTypes[sprDocTypes.findIndex(x => x.codeInGroup == editedItem.data.doctype)].fullName }}
												</span>
											</span>
							        серия
							        <span class="subheading font-weight-medium">{{editedItem.data.austype}}</span>
							        №
							        <span class="subheading font-weight-medium">{{editedItem.data.ausnum}}</span>
							        выдан
							        <span class="subheading font-weight-medium">{{ forTime(editedItem.data.ausd) }}</span>
											кем
							        <span class="subheading font-weight-medium">{{editedItem.data.ausp}}</span>
								    </span>
									</v-flex>

									<v-flex md10 py-1 my-3>
										<span class="body-1">Место рождения</span>
										<span class="body-1">страна
								        <span class="subheading font-weight-medium">{{editedItem.data.b_country}}</span>,
								        город
								        <span class="subheading font-weight-medium">{{editedItem.data.place_borth}}</span>
								    </span>
									</v-flex>

									<v-flex md2 py-1 my-3>
										<span class="body-1">Гражданство</span>
										<span class="subheading font-weight-medium">
											<span v-if="editedItem.data.citizenship !== null">
												{{ sl_oksms[sl_oksms.findIndex(x => x.oksm_cod == editedItem.data.citizenship)].oksm_name }}
											</span>
										</span>
									</v-flex>

									<v-flex md12 py-1>
										<span class="body-1">Адрес регистрации</span>
										<span class="subheading font-weight-medium">{{editedItem.data.adress_old}}</span>
									</v-flex>

									<v-flex md12 py-1>
										<v-divider></v-divider>
									</v-flex>

									<v-flex md10 py-1>
										<span class="body-1">Фактический адрес</span>
										<span class="subheading font-weight-medium">
											<span v-if="editedItem.data.adress_old_f == null || editedItem.data.adress_old_f == editedItem.data.adress_old">
												Совпадает с адресом регистрации
											</span>
											<span v-else>{{editedItem.data.adress_old_f}}</span>
										</span>
									</v-flex>

									<v-flex md2 py-1 v-if="editedItem.data.srok_f">
										<span class="body-1">Дата окончания</span>
										<span class="subheading font-weight-medium">{{ forTime(editedItem.data.srok_f) }}</span>
									</v-flex>

									<v-flex md12 py-1>
										<v-divider></v-divider>
									</v-flex>

									<v-flex md3 py-1>
										<span class="body-1">Статус</span>
										<span class="subheading font-weight-medium">
											<span v-if="editedItem.data.reg_status !== null">{{ sprRegStatuss[sprRegStatuss.findIndex(x => x.typ_cod == editedItem.data.reg_status)].typ_name }}
											</span>
										</span>
									</v-flex>

									<v-flex md3 py-1>
										<span class="body-1">Телефон</span>
										<span class="subheading font-weight-medium">{{editedItem.data.tel_h}}</span>
									</v-flex>

									<v-flex md3 py-1>
										<span class="body-1">Мобильный</span>
										<span class="subheading font-weight-medium">{{editedItem.data.tel_m}}</span>
									</v-flex>

									<v-flex md3 py-1>
										<span class="body-1">E-mail</span>
										<span class="subheading font-weight-medium">{{editedItem.data.e_mail}}</span>
									</v-flex>

									<v-flex md12 py-1>
										<v-divider></v-divider>
									</v-flex>

									<v-flex md3 py-1>
										<span class="body-1">ИНН</span>
										<span class="subheading font-weight-medium">{{editedItem.data.inn}}</span>
									</v-flex>

									<v-flex md3 py-1>
										<span class="body-1">СНИЛС</span>
										<span class="subheading font-weight-medium">{{editedItem.data.spens}}</span>
									</v-flex>

									<v-flex md3 py-1>
										<span class="body-1">Семейное положение</span>
										<span class="subheading font-weight-medium">
											<span v-if="editedItem.data.fem_cod !== null">
												{{ sprMaritalStatuses[sprMaritalStatuses.findIndex(x => x.codeInGroup === editedItem.data.fem_cod)].fullName }}
											</span>
										</span>
									</v-flex>

									<v-flex md2 py-1>
										<span class="body-1">Воинское звание</span>
										<span class="subheading font-weight-medium">
											<span v-if="editedItem.data.zvan_cod !== null">
												{{ sprMilitaryRanks[sprMilitaryRanks.findIndex(x => x.codeInGroup === editedItem.data.zvan_cod)].fullName }}
											</span>
										</span>
									</v-flex>


									<v-flex md12 py-1>
										<v-divider></v-divider>
									</v-flex>

                </v-layout>
            </v-container>

						<v-card-actions>
                <v-spacer></v-spacer>

                <v-btn color="primary" flat="flat" @click="createJobDir()">
                    Сформировать предложение
                </v-btn>

                <v-btn color="primary" flat="flat" @click="editNewDialog = false">
                    Закрыть
                </v-btn>

                <v-btn v-if="isNew" :disabled="cantSave" color="primary" flat="flat" @click="createItemVal(items)">
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
    empSearch: null,
    className: 'pers_book_ref',
		sex: [{
			codeInGroup: 0,
			fullName: 'Мужской'
		}, {
			codeInGroup: 1,
			fullName: 'Женский'
		}],
		job_dir: {
			classCode: "job_dir",
			data: {
				vac_num: null,
				c_client: null,
				fin_way: 0, // - признак закрытия
				prof_cod: null,
				reg_num: null,
				salary: null,
				dir_spr: null, // - признак записи
			}
		}
  }),
  computed: {
		items(){
			console.log('putItemsDir');
			console.log(this.$store.state.eais.dirItems);
			return this.$store.state.eais.dirItems;
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
		sprFormSalarys() {
			return this.$store.state.eais.stateHandbooks.sprFormSalarys;
		},
		emplCenters() {
			return this.$store.state.eais.stateHandbooks.emplCenters;
		},
		sprOperatingModes() {
			return this.$store.state.eais.stateHandbooks.sprOperatingModes;
		},
		sprNatureWorks() {
			return this.$store.state.eais.stateHandbooks.sprOperatingModes;
		},
		sprWorkConditions() {
			return this.$store.state.eais.stateHandbooks.sprWorkConditions;
		},
		sprSBS() {
			return this.$store.state.eais.stateHandbooks.sprSBS;
		},
		sprRegStatuss() {
			return this.$store.state.eais.stateHandbooks.sprRegStatuss;
		},
		municipalityDivisions() {
			return this.$store.state.eais.stateHandbooks.municipalityDivisions;
		},
    serverHandbook() {
			return this.$store.state.eais.serverHandbook.data;
		},
    serverHandDis() {
      return this.$store.state.eais.serverHandbook.disabled;
      // return true
    },
		//for persons
		sprMilitaryRanks() {
			return this.$store.state.eais.stateHandbooks.sprMilitaryRanks;
		},
		sprMaritalStatuses() {
			return this.$store.state.eais.stateHandbooks.sprMaritalStatuses;
		},
		sprPersStatuss() {
			return this.$store.state.eais.stateHandbooks.sprPersStatuss;
		},
		sl_oksms() {
			return this.$store.state.eais.stateHandbooks.sl_oksms;
		},
		sprDocTypes() {
			return this.$store.state.eais.stateHandbooks.sprDocTypes;
		}
  },
  watch: {
    search (val) {
      this.empSearch = val;
    }
  },
  methods: {
		editItemDir(item) {
			console.log('editItem');
			this.isNew = false;
			this.editNewDialog = true;
			this.editedItem = item;
			console.log(this.editedItem);
			// this.ldUpdate(item);
			this.$store.commit('dontSaved');
			this.extraFunk();
		},
    extraFunk() {
    },
    letSearch() {
			this.$store.dispatch('searchInBack', this.forSearch);
    }, //this.oneItem.
		createJobDir() {
			var newJobDir = JSON.parse(JSON.stringify(this.job_dir));
			newJobDir.data.vac_num = this.oneItem.id;
			newJobDir.data.c_client = this.oneItem.data.c_client;
			newJobDir.data.persFio = this.editedItem.data.name;
			newJobDir.data.prof_cod = this.editedItem.data.prof_cod;
			newJobDir.data.salary = this.editedItem.data.salary;
			newJobDir.data.reg_num = this.editedItem.id;
			newJobDir.data.dir_spr = 3; // - признак записи
			this.oneItem.linkedData.mpArr_job_dir_ref.push(newJobDir);
			if (!this.oneItem.linkedData.job_dir_ref.create) {
				this.oneItem.linkedData.job_dir_ref.create = [];
			}
			this.oneItem.linkedData.job_dir_ref.create.push(newJobDir);
			this.items.splice(this.items.findIndex(x => x.id === this.editedItem.id), 1);
			this.editNewDialog = false;
		}
  }
};
</script>
