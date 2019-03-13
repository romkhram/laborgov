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
					<span class="body-1">{{item.emplData.longName}}</span>
				</v-flex>

					<v-flex md3>
						<span class="body-1">{{item.data.prof_cod}}:
							{{ sl_profs[sl_profs.findIndex(x => x.prof_cod === item.data.prof_cod)].prof_name }}
						</span>
					</v-flex>

					<v-flex md2>
						<span class="body-1">Рабочих мест: {{item.data.start_free}}</span>
					</v-flex>

					<v-flex md2>
						<span class="body-1">{{item.data.salary}} <span v-if="item.data.salary1">- {{item.data.salary1}}</span> ₽</span>
					</v-flex>

					<v-flex md2>
						<span class="body-1">ИНН {{item.emplData.inn}}</span>
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

    <v-dialog v-model="editNewDialog" max-width="1100">
        <v-card class="eais__readerform">
            <v-card-title class="headline primary--text">Информация о рабочем месте</v-card-title>

            <v-container fluid grid-list-xl>
                <v-layout row wrap v-if="editedItem.emplData || editedItem.data">

									<v-flex md9 py-2>
										<span class="body-1">Наименование организации</span>
										<span class="subheading font-weight-medium">{{editedItem.emplData.longName}}
										</span>
									</v-flex>

		              <v-flex md3 py-2>
		                <span class="body-1">Форма собственности:</span>
		                <span class="subheading font-weight-medium">
											<span v-if="editedItem.emplData.ownershipId">{{ sprSBS[sprSBS.findIndex(x => x.codeInGroup === editedItem.emplData.ownershipId)].fullName }}
											</span>{{editedItem.emplData.ownershipId}}</span>
		              </v-flex>

		              <v-flex md12 py-1>
		                  <v-divider></v-divider>
		              </v-flex>

									<v-flex md9 py-2>
										<span class="body-1">Профессия:</span>
										<span class="subheading font-weight-medium">
											<span v-if="editedItem.data.prof_cod">{{ sl_profs[sl_profs.findIndex(x => x.prof_cod === editedItem.data.prof_cod)].prof_name }}
											</span>
										</span>
									</v-flex>


		              <v-flex md3 py-2>
		                <span class="body-1">Зарплата</span>
		                <span class="subheading font-weight-medium">{{editedItem.data.salary}} <span v-if="editedItem.data.salary1">- {{editedItem.data.salary1}}</span></span>
		              </v-flex>

									<v-flex md9 py-2>
		                <span class="body-1">Производная профессия:</span>
										<span class="subheading font-weight-medium">
											<span v-if="editedItem.data.pd_cod">{{ sprDerivativePositions[sprDerivativePositions.findIndex(x => x.codeInGroup === editedItem.data.pd_cod)].shortName }}
											</span>
										</span>
		              </v-flex>

		              <v-flex md3 py-2>
		                <span class="body-1">Сфера деятельности:</span>
										<span class="subheading font-weight-medium">
											<span v-if="editedItem.data.are_cod">{{ sl_ares[sl_ares.findIndex(x => x.are_cod == editedItem.data.are_cod)].are_name }}</span>
										</span>
		              </v-flex>


		              <v-flex md3 py-2>
		                <span class="body-1">Форма оплаты:</span>
										<span class="subheading font-weight-medium">
											<span v-if="editedItem.data.salf_cod">{{ sprFormSalarys[sprFormSalarys.findIndex(x => x.codeInGroup === editedItem.data.salf_cod)].fullName }}
											</span>
										</span>
		              </v-flex>

		              <v-flex md3 py-2>
		                <span class="body-1">Специализация:</span>
		                <span class="subheading font-weight-medium">{{editedItem.data.prof_spec}}</span>
		              </v-flex>

		              <v-flex md3 py-2>
		                <span class="body-1">Разряд, класс, категория:</span>
		                <span class="subheading font-weight-medium">{{editedItem.data.prof_lev}}</span>
		              </v-flex>

		              <v-flex md12 py-1>
		                  <v-divider></v-divider>
		              </v-flex>

		              <v-flex md3 py-2>
		                <span class="body-1">Рабочий день:</span>
		                <span class="subheading font-weight-medium">{{editedItem.data.job_time}} часов</span>
		              </v-flex>

		              <v-flex md3 py-2>
		                <span class="body-1">Режим работы:</span>
										<span class="subheading font-weight-medium">
											<span v-if="editedItem.data.jreg_cod">{{ sprOperatingModes[sprOperatingModes.findIndex(x => x.codeInGroup === editedItem.data.jreg_cod)].fullName }}
											</span>
										</span>
		              </v-flex>

		              <v-flex md3 py-2>
		                <span class="body-1">Характер работы:</span>
										<span class="subheading font-weight-medium">
											<span v-if="editedItem.data.jchar_cod">{{ sprNatureWorks[sprNatureWorks.findIndex(x => x.codeInGroup === editedItem.data.jchar_cod)].fullName }}
											</span>
										</span>
		              </v-flex>


		              <v-flex md3 py-2>
		                <span class="body-1">Условия труда: </span>
										<span class="subheading font-weight-medium">
											<span v-if="editedItem.data.jcond_cod !== null">{{ sprWorkConditions[sprWorkConditions.findIndex(x => x.codeInGroup === editedItem.data.jcond_cod)].fullName }}
											</span>
										</span>
		              </v-flex>



		              <v-flex md12 py-1>
		                  <v-divider></v-divider>
		              </v-flex>

		              <v-flex md3 py-2>
		                <span class="body-1">Рабочих мест</span>
		                <span class="subheading font-weight-medium">{{editedItem.data.start_free}}</span>
		              </v-flex>

		              <v-flex md3 py-2>
		                <span class="body-1">Направлений</span>
		                <span class="subheading font-weight-medium">{{editedItem.data.max_dir}}</span>
		              </v-flex>

		              <v-flex md3 py-2>
		                <span class="body-1">Справок</span>
		                <span class="subheading font-weight-medium">{{editedItem.data.max_spr}}</span>
		              </v-flex>


		              <v-flex md12 my-0 py-1 class="body-1">
		                  <v-divider></v-divider>
		              </v-flex>


                </v-layout>
            </v-container>

						<v-card-actions>
                <v-spacer></v-spacer>

                <v-btn color="primary" flat="flat" @click="createJobDir()">
                    Сформировать направление
                </v-btn>

                <v-btn color="primary" flat="flat" @click="createJobRef()">
                    Сформировать справку
                </v-btn>

                <v-btn color="primary" flat="flat" @click="editNewDialog = false">
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
				disable: true
			}
		}
  }),
  computed: {
		items(){
			// console.log('putItemsDir');
			// console.log(this.$store.state.eais.dirItems);

			// var arrEpls = [];
			// this.oneItem.linkedData.mpArr_job_dir_ref.forEach(function(el) {
			// 	arrEpls.push(el.data.vac_num);
			// });
			//
			// var dirItems = this.$store.state.eais.dirItems;
			//
			// arrEpls.forEach(function(el) {
			// 	dirItems.splice(dirItems.findIndex(x => x.id == el), 1);
			// 	// sl_ares[sl_ares.findIndex(x => x.id == el)].are_name
			// });
			//
			//
			// console.log('arrEpls in body');
			// console.log(arrEpls);



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
    serverHandbook() {
			return this.$store.state.eais.serverHandbook.data;
		},
    serverHandDis() {
      return this.$store.state.eais.serverHandbook.disabled;
      // return true
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
    },
		createJobDir() {
			var newJobDir = JSON.parse(JSON.stringify(this.job_dir));
			newJobDir.data.vac_num = this.editedItem.data.vac_num;
			newJobDir.data.c_client = this.editedItem.data.c_client;
			newJobDir.data.compName = this.editedItem.emplData.longName;
			newJobDir.data.prof_cod = this.editedItem.data.prof_cod;
			newJobDir.data.salary = this.editedItem.data.salary;
			newJobDir.data.reg_num = this.oneItem.id;
			newJobDir.data.dir_spr = 1; // - признак записи
			this.oneItem.linkedData.mpArr_job_dir_ref.push(newJobDir);
			if (!this.oneItem.linkedData.job_dir_ref.create) {
				this.oneItem.linkedData.job_dir_ref.create = [];
			}
			this.oneItem.linkedData.job_dir_ref.create.push(newJobDir);
			this.items.splice(this.items.findIndex(x => x.id === this.editedItem.id), 1);
			this.editNewDialog = false;
			console.log(this.oneItem);
		},
		createJobRef() {
			var newJobDir = JSON.parse(JSON.stringify(this.job_dir));
			newJobDir.data.vac_num = this.editedItem.data.vac_num;
			newJobDir.data.c_client = this.editedItem.data.c_client;
			newJobDir.data.compName = this.editedItem.emplData.longName;
			newJobDir.data.prof_cod = this.editedItem.data.prof_cod;
			newJobDir.data.salary = this.editedItem.data.salary;
			newJobDir.data.reg_num = this.oneItem.id;
			newJobDir.data.dir_spr = 2; // - признак записи
			this.oneItem.linkedData.mpArr_job_dir_ref.push(newJobDir);
			if (!this.oneItem.linkedData.job_dir_ref.create) {
				this.oneItem.linkedData.job_dir_ref.create = [];
			}
			this.oneItem.linkedData.job_dir_ref.create.push(newJobDir);
			this.items.splice(this.items.findIndex(x => x.id === this.editedItem.id), 1);
			this.editNewDialog = false;
			console.log(this.oneItem);
		}
  }
};
</script>
