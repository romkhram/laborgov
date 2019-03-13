<template>
	<div>
		<pre-loader v-if="this.$store.state.eais.putLoading.loading"></pre-loader>
		<div v-else>

			<!-- <get-one-item parPath="api/v1/eaisCompanies/"></get-one-item> -->

			<!-- <page-title-bar :name="oneItem.data.longName"></page-title-bar> -->
			<v-container fluid>
				<v-layout row wrap>
					<v-flex xl12 pl-3>
						{{pageBreadcrumb}}
					</v-flex>
				</v-layout>
			</v-container>

			<v-container fluid py-0 grid-list-xl>
				<!-- <section-tooltip title="Работодатели / " tooltip="Работодатели"></section-tooltip> -->
				<v-layout row wrap>
					<!-- Shopping Cart -->

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
<!-- // checkEgrul -->
								<v-list class="app-card-action">

									<v-list-tile @click="checkEgrul()">
										<span>Проверка ЕГРЮЛ</span>
									</v-list-tile>

									<v-list-tile @click="letSearchVac(mainSearch)">
										<span>Перейти в вакансии работодателя</span>
									</v-list-tile>

									<v-list-tile @click="letSearchNeeds(mainSearch)">
										<span>Перейти в потребности работодателя</span>
									</v-list-tile>

									<v-list-tile @click="creNeed(oneItem.id)">
										<span>Создать потребность</span>
									</v-list-tile>

									<v-list-tile @click="creVac(oneItem.id)">
										<span>Создать вакансию</span>
									</v-list-tile>

								</v-list>
							</v-menu>
						</div>


						<router-view :oneItem="oneItem"></router-view>

						<div slot="footer" class="justify-space-between footer-flex">
							<v-spacer></v-spacer>
							<v-btn v-if="this.$store.state.eais.globalCreate" class="ml-3" color="primary" @click="openShureDialog" small>Отмена</v-btn><v-btn v-else class="ml-3" color="primary" @click="openShureDialog" small>Закрыть</v-btn>
							<v-btn v-if="this.$store.state.eais.globalCreate" class="ml-3" color="primary" :loading="putLoading" @click="create" small>Создать</v-btn>
							<v-btn v-else class="ml-3" color="primary" :loading="putLoading" @click="send" small>Сохранить</v-btn>

							<are-you-shure :eaisRoutes="eaisRoutes"></are-you-shure>

						</div>
					</app-card>
				</v-layout>
			</v-container>



		</div>
	</div>
</template>

<style>
.app-contextual-link {
	display:none;
}
.app-card-title  {
	min-height: 68px;
}
</style>

<script>
import oneitem from "@/mixins/oneitem";
// import EmployersList from "Components/Widgets/Eais/Employers/EmployersList";
// // import EmployerEdit from "Components/Widgets/Eais/Employers/EmployerEdit";
import AreYouShure from "Components/Widgets/Eais/AreYouShure";
import GetOneItem from "Components/Widgets/Eais/GetOneItem";
import router from '@/router'
// import RecentOrders from "Components/Widgets/RecentOrders";

export default {
  mixins: [oneitem],

	created() {
    // this.getHandbook('emplCenters');
    // this.getHandbook('sl_okveds');
    this.getHandbook('banks');

		this.getHandbook({
			path:	'sl_okveds', code: 'shifr', name: 'name'
		});
		this.getHandbook({
			path:	'sprFormSubmissions', code: 'codeInGroup', name: 'fullName'
		});
		this.getHandbook({
			path:	'sprPositions', code: 'codeInGroup', name: 'fullName'
		});
		this.getHandbook({
			path:	'sprCLStatus', code: 'codeInGroup', name: 'fullName'
		});
		this.getHandbook({
			path:	'sprACCTYPEs', code: 'codeInGroup', name: 'fullName'
		});
		this.getHandbook({
			path:	'sprLiquidations', code: 'codeInGroup', name: 'fullName'
		});
		this.getHandbook({
			path:	'sprDOCTYPs', code: 'codeInGroup', name: 'fullName'
		});
		this.getHandbook({
			path:	'sprOPFs', code: 'addCode', name: 'shortName'
		});
    this.getHandbook({
			path:	'sprSBS', code: 'codeInGroup', name: 'shortName'
		});
		this.getHandbook({
			path:	'banks', code: 'bankId', name: 'name_bnk'
		});
		this.getHandbook({
			path:	'emplCenters', code: 'emplCenterId', name: 'shortName'
		});
		this.getHandbook({
			path:	'sl_rezs', code: 'rez_cod', name: 'rez_name'
		});
		this.getHandbook({
			path:	'resultValues', code: 'resultValueId', name: 'rez_name'
		});
		this.getHandbook({
			path:	'detailResults', code: 'detailResultId', name: 'rez_name'
		});
		this.getHandbook({
			path:	'sprDerivativePositions', code: 'cipherInGroup', name: 'fullName'
		});
		// this.getHandbook('sl_rezs');
		// this.getHandbook('resultValues');
		// this.getHandbook('detailResults');
  },
	beforeCreate() {
		console.log('beforeCreate');
	},
  updated() {

  },
	data: () => ({
		switch1: false,
		allObject: {},
		trueRote: '',
		saveSpinner: false,
		eaisRoutes: '/eais/employers/employers',
		savePath: 'api/v1/eaisCompanies/',
		modelVac: {
			"classCode": "vac",
			"data": {
				"in_date": null,
				"pr_comp": null,
				"prof_lev": null,
				"salary": null,
				"are_cod": null,
				"vac_way": null,
				"max_spr": null,
				"usl": null,
				"userEditorId": null,
				"jchar_cod": 1,
				"okso_cod": null,
				"changeDate": null,
				"vac_num": null,
				"vac_sob": null,
				"adinfcl": null,
				"start_free": null,
				"inst_date": null,
				"stin_cod": null,
				"ncp_cod": null,
				"driv_cod": null,
				"spe_cod": null,
				"pr_show": null,
				"educ_cod": null,
				"ident_yn": null,
				"treb": null,
				"spec_cod": null,
				"psv_cod": null,
				"prof_cod": null,
				"virs_cod": null,
				"c_client": null,
				"vac_guid": null,
				"job_time": null,
				"salary1": null,
				"agr_cod": null,
				"beg_date": null,
				"rem_text": null,
				"cntc_cod": null,
				"end_date": null,
				"userOwnerId": null,
				"att_f": null,
				"type_cod": null,
				"pr_salary": null,
				"r_vac_agr": null,
				"jreg_cod": null,
				"pr_sod": null,
				"adinf": null,
				"ness_stage": null,
				"pd_cod": null,
				"prof_cod2": null,
				"cz_cod": 120,
				"jcond_cod": null,
				"max_dir": null,
				"prof_spec": null,
				"p_ra": null,
				"adinf70": null,
				"kval_cod": null,
				"r": null,
				"vac_adress": null,
				"salf_cod": 2,
				"c_contact": null,
				"dolz_ob": null,
				"test": null
			},
			"linkedData": {
				"are_cod": {},
				"c_client": {},
				"c_contact": {},
				"cntc_cod": {},
				"cz_cod": {},
				"educ_cod": {},
				"jchar_cod": {},
				"jcond_cod": {},
				"jreg_cod": {},
				"p_ra": {},
				"prof_cod": {},
				"r": {},
				"salf_cod": {},
				"type_cod": {},
				"userEditorId": {},
				"userOwnerId": {},
				"vac_cnt_ref": {},
				"vac_cr_ref": {},
				"vac_def_ref": {},
				"vac_lang_ref": {},
				"vac_lg_ref": {},
				"vac_onv_ref": {},
				"vac_pc_ref": {},
				"vac_spar_ref": {},
				"vac_trv_ref": {},
				"mpArr_are_cod": [],
				"mpArr_c_client": [],
				"mpArr_c_contact": [],
				"mpArr_cntc_cod": [],
				"mpArr_cz_cod": [],
				"mpArr_educ_cod": [],
				"mpArr_jchar_cod": [],
				"mpArr_jcond_cod": [],
				"mpArr_jreg_cod": [],
				"mpArr_p_ra": [],
				"mpArr_prof_cod": [],
				"mpArr_r": [],
				"mpArr_salf_cod": [],
				"mpArr_type_cod": [],
				"mpArr_userEditorId": [],
				"mpArr_userOwnerId": [],
				"mpArr_vac_cnt_ref": [],
				"mpArr_vac_cr_ref": [],
				"mpArr_vac_def_ref": [],
				"mpArr_vac_lang_ref": [],
				"mpArr_vac_lg_ref": [],
				"mpArr_vac_onv_ref": [],
				"mpArr_vac_pc_ref": [],
				"mpArr_vac_spar_ref": [],
				"mpArr_vac_trv_ref": []
			}
		},
		modelNeed: {
			"classCode": "cl_potr",
	    "data": {
	        "userOwnerId": null,
	        "stat": 1,
	        "cz_cod": null,
	        "date_reg": null,
	        "date_doc": null,
	        "stat_comm": null,
	        "creationDate": null,
	        "fok_cod": 3,
	        "vac_way": null,
	        "date_stat": null,
	        "c_client": null,
	        "userEditorId": null,
	        "r": null,
	        "vac_adress": null,
	        "changeDate": null,
	        "c_contact": null,
	        "num_reg": null,
	        "adinfcl": null
	    },
			"linkedData": {
				"cl_potrv_ref": {},
				"mpArr_cl_potrv_ref": []
			}
		}
	}),
	computed: {
		forHeading() {
			if (this.oneItem.data.longName) {
				return this.oneItem.data.longName;
			} else {
				return ' ';
			}
		},
		currentRouteName() {
			console.log('currentRouteName');
				console.log(this.$route.fullPath.split('/'));
		return this.$route.name;
	},
		oneItem () {
			return this.$store.state.eais.oneItem;
		},
		putLoading() {
			return this.$store.state.eais.putLoading.loading;
		},
		mainSearch() {
			var searchFields =  {
				"offset": 0,
				"limit": 50,
				"attrs": [],
				"filter": {
					"cond": {
						"attr": "c_client",
						"eq": this.oneItem.id
					}
				},
				"orders": [
					{"asc":"c_client"}
				]
			}
			return searchFields
		},
	},
  components: {
		AreYouShure,
		GetOneItem
  },
	methods: {
		checkEgrul() {
			this.$store.dispatch('checkEgrul', this.oneItem.data.inn);
		},
		creNeed(val) {
			console.log(val);
			this.modelNeed.data.c_client = val;
			this.modelNeed.data.cz_cod = this.oneItem.data.emplCenterId;
			console.log(this.modelNeed);
			this.$store.dispatch('newElement', this.modelNeed);
			this.$router.push('/eais/employers/needs/' + 'new');
		},
		creVac(val) {
			this.modelVac.data.c_client = val;
			console.log(this.modelVac);
			this.$store.dispatch('newElement', this.modelVac);
			this.$router.push('/eais/employers/vacancy/' + 'new');
		},
		toRoots() {
			this.saveSpinner = true;
			setTimeout(() => {
				this.saveSpinner = false;
			}, 2000);
		},
		letSearchVac(val) {
			console.log(val);
			this.$store.dispatch('beforeSearchListItems', {
				value: val,
				path: 'api/v1/vacs/search',
				route: '/eais/employers/vacancies',
				listName: `: вакансии работодателя ${this.oneItem.data.longName}`,
				noData: 'Вакансии отсутствуют',
				extraFields: [
					{
		        rel: 'c_client',
		        name: 'extraName',
		        targetName: 'longName'
		      },
		      {
		        rel: 'c_client',
		        name: 'extraInn',
		        targetName: 'inn'
		      }
				]
			});
			// this.$store.commit('assignSearchName', `: вакансии работодателя ${this.oneItem.data.longName}`);
			// this.$router.push('/eais/employers/vacancies');
		},
		letSearchNeeds(val) {
			console.log(val);
			this.$store.dispatch('beforeSearchListItems', {
				value: val,
				path: 'api/v1/cl_potrs/search',
				route: '/eais/employers/needs',
				listName: `: потребности работодателя ${this.oneItem.data.longName}`,
				noData: 'Потребности отсутствуют',
				extraFields: [
					{
		        rel: 'c_client',
		        name: 'extraName',
		        targetName: 'longName'
		      }
				]
			});
		}
	}
}

</script>
