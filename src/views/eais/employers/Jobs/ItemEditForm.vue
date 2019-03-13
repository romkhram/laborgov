<template>
	<div>
		<pre-loader v-if="this.$store.state.eais.putLoading.loading"></pre-loader>
		<div v-else>
			<v-container fluid>
				<v-layout row wrap>
					<v-flex xl12 pl-3>
						{{pageBreadcrumb}}
					</v-flex>
				</v-layout>
			</v-container>

			<v-container fluid py-0 grid-list-xl>
				<v-layout row wrap>
					<app-card
						colClasses="xl12 lg12 md12 sm12 xs12"
						:heading="forHeading"
						customClasses="mb-0"
						:fullBlock="true"
						:fullScreen="true"
						:reloadable="true"
						:closeable="true"
						:footer="true"
					>


						<div class="text-md-right eais-burger-menu">
							<v-menu
								transition="scale-transition"
								origin="right top"
								bottom
								left
							>
								<v-btn class="ma-0 mr-3" icon slot="activator">
									<v-icon>more_vert</v-icon>
								</v-btn>

								<v-list class="app-card-action">

									<v-list-tile @click="letSearch(mainSearch)">
										<i class="zmdi zmdi-fullscreen primary--text mr-2 fs-14"></i>
										<span>Перейти в ЛДПГУ работодателя</span>
									</v-list-tile>

									<v-list-tile @click="vacConfirm()">
										<i class="zmdi zmdi-fullscreen primary--text mr-2 fs-14"></i>
										<span>Подтверждение вакансии (изменение рабочих мест)</span>
									</v-list-tile>

									<v-list-tile @click="vacClose()">
										<i class="zmdi zmdi-fullscreen primary--text mr-2 fs-14"></i>
										<span>Закрытие вакансии</span>
									</v-list-tile>

								</v-list>
							</v-menu>
						</div>

						<v-dialog v-model="vacServiceDialog" max-width="1100">
								<v-card>
										<v-card-title class="headline">{{dialogHeader}}</v-card-title>

										<v-container fluid grid-list-xl class="eais__readerform">
												<v-layout row wrap>

													<v-flex md12 class="required">
				                    <v-autocomplete
				                      :no-data-text="noDataText"
				                      label="Контактное лицо предприятия"
															:items="vacContacts" :rules="[fieldRules.required]"
			          							item-text="comboVal"
			          							item-value="contactId"
				                    	v-model="contact"
				                    ></v-autocomplete>
				                  </v-flex>

													<v-flex md6 class="required">
														<v-autocomplete
															:no-data-text="noDataText"
															label="Cпособ взаимодействия"
															:items="sprFormSubmissions" :rules="[fieldRules.required]"
															item-text="fullName"
															item-value="codeInGroup"
															v-model="formSubmission"
														></v-autocomplete>
													</v-flex>

													<v-flex md6 v-if="toCloseVac" class="required">
													 <v-autocomplete
														 label="Причина закрытия вакансии"
														 :items="sprPSVs" :rules="[fieldRules.required]"
														 item-text="fullName"
														 item-value="codeInGroup"
														 v-model="psvCode"
														 :no-data-text="noDataText"
													 ></v-autocomplete>
													</v-flex>

													<v-flex md3 v-else>
				                   	 <v-text-field
				                   	 	type="number"
		 													v-model="vacNum"
		 													min="1"
		 													:rules="[maxNum, required]"
		 													:max="oneItem.data.start_free"
				                      label="Рабочих мест"
				                    ></v-text-field>
													</v-flex>

												</v-layout>
										</v-container>

										<v-card-actions>
												<v-spacer></v-spacer>

												<v-btn color="primary" flat="flat" @click="clearVacService">
														Отменить
												</v-btn>

												<v-btn color="primary" flat="flat" :disabled="canSave" @click="saveVacService">
														Сохранить
												</v-btn>

										</v-card-actions>
								</v-card>
						</v-dialog>

						<router-view :oneItem="oneItem"></router-view>
						<div slot="footer" class="justify-space-between footer-flex">
							<v-spacer></v-spacer>
							<v-btn v-if="this.$store.state.eais.globalCreate" class="ml-3" color="primary" @click="letSearch(mainSearch)" small>Отмена</v-btn>
							<v-btn v-else class="ml-3" color="primary" @click="openShureDialog" small>Закрыть</v-btn>
							<v-btn v-if="this.$store.state.eais.globalCreate" class="ml-3" color="primary" @click="create" small>Создать</v-btn>
							<v-btn v-else class="ml-3" color="primary" @click="send" small>Сохранить</v-btn>
							<are-you-shure :eaisRoutes="eaisRoutes"></are-you-shure>
						</div>
					</app-card>
				</v-layout>
			</v-container>

		</div>
	</div>

</template>

<script>
import oneitem from "@/mixins/oneitem";
import rules from "@/mixins/rules";
// import EmployersList from "Components/Widgets/Eais/Employers/EmployersList";
// import EmployerEdit from "Components/Widgets/Eais/Employers/EmployerEdit";
import AreYouShure from "Components/Widgets/Eais/AreYouShure";
// import RecentOrders from "Components/Widgets/RecentOrders";

export default {
  mixins: [oneitem, rules],
	beforeMount() {
		// this.getHandbook('sl_ares'); // Сферы деятельности (are_cod и are_name) (are_cod в sl_profs)
				// this.getHandbook({
		// 	path:	'sprPositions', code: 'codeInGroup', name: 'fullName'
		// });
		this.getHandbook({
			path:	'sprFormSalarys', code: 'codeInGroup', name: 'fullName'
		});
		this.getHandbook({
			path:	'sprACSs', code: 'codeInGroup', name: 'fullName'
		});
		this.getHandbook({
			path:	'sl_ares', code: 'are_code', name: 'are_name'
		});
		this.getHandbook({
			path:	'sprDerivativePositions', code: 'cipherInGroup', name: 'fullName'
		});
		this.getHandbook({
			path:	'emplCenters', code: 'emplCenterId', name: 'shortName'
		});
		this.getHandbook({
      path:	'sl_profs', code: 'prof_cod', name: 'prof_name'
    });
		this.getHandbook({
      path:	'sprOperatingModes', code: 'codeInGroup', name: 'fullName'
    });
		this.getHandbook({
      path:	'sprNatureWorks', code: 'cipherInGroup', name: 'fullName'
    });
		this.getHandbook({
      path:	'sprWorkConditions', code: 'codeInGroup', name: 'fullName'
    });
		this.getHandbook({
      path:	'sprPSVs', code: 'codeInGroup', name: 'fullName'
    });
    this.getHandbook({
      path:	'sl_vactypes', code: 'type_cod', name: 'type_names'
    });
		this.getHandbook({
			path:	'sprFormSubmissions', code: 'codeInGroup', name: 'fullName'
		});
	},
	data: () => ({
		switch1: false,
		eaisRoutes: '/eais/employers/vacancies',
		savePath: 'api/v1/vacs/',
		VacContacts: [],
		toCloseVac: false,
		contact: null,
		formSubmission: null,
		vacNum: null,
		psvCode: null,
		vacServiceDialog: false,
		required: v => v !== null && v !== '' && v !== undefined || 'Обязательное поле',
	}),
	computed: {
		canSave() {
			if (this.toCloseVac && this.contact && this.formSubmission && this.psvCode) {
				return false;
			} else if (!this.toCloseVac && this.contact && this.formSubmission && this.vacNum) {
				return false;
			} else {
				return true;
			}
		},
		dialogHeader() {
			if (this.toCloseVac) {
				return 'Закрытие вакансии'
			} else {
				return 'Подтверждение вакансии (изменение рабочих мест)'
			}
		},
		vacForChange() {
			var vacForChange = {
				"vacId": this.oneItem.data.vac_num,
				"contactId": this.contact,
				"formSubmission": this.formSubmission,
				"count": this.vacNum
			}
				return vacForChange;
		},
		vacForClose() {
			var vacForClose = {
				"vacId": this.oneItem.data.vac_num,
				"contactId": this.contact,
				"formSubmission": this.formSubmission,
		    "psvCode": this.psvCode
			}
				return vacForClose;
		},
		oneItem () {
			console.log(this.$store.state.eais.oneItem);
			return this.$store.state.eais.oneItem;
		},
		vacContacts() {
			console.log('in Vac');
			console.log(this.$store.state.extranotes.extraHandbooks.vacContacts);
			return this.$store.state.extranotes.extraHandbooks.vacContacts;
		},
		sprFormSubmissions() {
			return this.$store.state.eais.stateHandbooks.sprFormSubmissions;
		},
		sprPSVs() {
			return this.$store.state.eais.stateHandbooks.sprPSVs;
		},
		forHeading() {
			if (this.oneItem.extraData) {
				return this.oneItem.extraData.prof_cod.prof_name + ' — ' + this.oneItem.extraData.c_client.longName;
			} else {
				return 'Не задана'
			}
		},
		mainSearch() {
			var searchFields =  {
				"offset": 0,
				"limit": 50,
				"attrs": [],
				"filter": {
					"cond": {
						"attr": "companyId",
						"eq": this.oneItem.data.c_client
					}
				},
				"orders": [
					{"asc":"companyId"}
				]
			}
			return searchFields
		}
	},
  components: {
		AreYouShure
  },
	methods: {
		clearVacService() {
			this.contact = null;
			this.formSubmission = null;
			this.vacNum = 0;
			this.psvCode = null;
			this.vacServiceDialog = false;
		},
		maxNum(v) {
			if (v <= this.oneItem.data.start_free) {
				return true;
			} else {
				return 'Не может быть больше ' + this.oneItem.data.start_free;
			}
		},
		// getContacts() {
		// 	console.log('getVacContacts');
		// 	this.$store.dispatch('getVacContacts');
		// },
		saveVacService() {
			if (this.toCloseVac) {
				this.oneItem.data.psv_cod = this.psvCode;
				this.$store.dispatch('vacClose', this.vacForClose);
				console.log(this.vacForClose);
				this.send();
			} else {
				this.$store.dispatch('vacConfirm', this.vacForChange);
				console.log(this.vacForChange);
				this.send();
			}
			this.clearVacService();
		},
		vacConfirm() {
			this.toCloseVac = false;
			this.vacServiceDialog = true;
			this.vacNum = this.oneItem.data.start_free;
			// this.$store.dispatch('vacConfirm', this.vacForChange);
		},
		vacClose() {
			this.toCloseVac = true;
			this.vacServiceDialog = true;
			// this.$store.dispatch('vacClose', this.vacForClose);

			// "vacId": "10152891",
			// "contactId": "9990314461",
			// "formSubmission": "0",
			// "count": "10"

		},
		letSearch(val) {
			console.log(val);
			this.$store.dispatch('searchListItems', {
				value: val,
				path: 'api/v1/eaisCompanies/search'
			});
			this.$router.push('/eais/employers/employers');
		}
	}
}
</script>
