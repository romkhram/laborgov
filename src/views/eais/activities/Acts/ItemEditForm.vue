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

						<!-- <div class="text-md-right eais-burger-menu">
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
										<span>Перейти в вакансии работодателя</span>
									</v-list-tile>

									<v-list-tile @click="creNeed(oneItem.id)">
										<span>Создать потребность</span>
									</v-list-tile>

									<v-list-tile @click="creVac(oneItem.id)">
										<span>Создать вакансию</span>
									</v-list-tile>

								</v-list>
							</v-menu>
						</div> -->


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
			path:	'sprVIFs', code: 'codeInGroup', name: 'fullName'
		});

		this.getHandbook({
			path:	'sl_vactypes', code: 'type_cod', name: 'type_name'
		});
		this.getHandbook({
			path:	'municipalityDivisions', code: 'cim', name: 'txt'
		});
		this.getHandbook({
			path:	'sprDevelopmentPrograms', code: 'codeInGroup', name: 'fullName'
		});
		this.getHandbook({
			path:	'sprCJTYPes', code: 'codeInGroup', name: 'fullName'
		});

		// this.getHandbook({
		// 	path:	'sprCJTYPes', code: 'codeInGroup', name: 'fullName'
		// });

		this.getHandbook('sl_rezs');
		this.getHandbook('resultValues');
		this.getHandbook('detailResults');

		// this.getHandbook('sl_vactypes');
		// this.getHandbook('municipalityDivisions');
		// this.getHandbook('sprDevelopmentPrograms');
		// this.getHandbook('sprCJTYPes');
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
		eaisRoutes: '/eais/activities/acts',
		savePath: 'api/v1/agr_ors/',
	}),
	computed: {
		currentRouteName() {
			console.log('currentRouteName');
				console.log(this.$route.fullPath.split('/'));
		return this.$route.name;
	},
		oneItem () {
			return this.$store.state.eais.oneItem;
		},
		forHeading() {
			if (this.oneItem.extraData) {
				this.oneItem.data.extraName = this.oneItem.extraData.c_client.longName;
				return this.oneItem.extraData.c_client.longName;
			} else {
				return 'Не задана'
			}
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
		creNeed(val) {
			console.log(val);
			this.modelNeed.data.c_client = val;
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
		letSearch(val) {
			console.log(val);
			this.$store.dispatch('searchListItems', {
				value: val,
				path: 'api/v1/vacs/search',
				extraFields: [
					{
		        rel: 'c_client',
		        name: 'extraName',
		        targetName: 'shortName'
		      },
		      {
		        rel: 'c_client',
		        name: 'extraInn',
		        targetName: 'inn'
		      }
				]
			});
			this.$store.commit('assignSearchName', `: вакансии работодателя ${this.oneItem.data.longName}`);
			this.$router.push('/eais/employers/vacancies');
		},
		// openShureDialog() {
		// 	this.$store.commit('notNew');
		// 	if (this.$store.state.eais.oneItem.saved) {
		// 		this.$store.commit('toggleShureDialog');
		// 	} else {
		//     this.$store.commit('assignInsideSearch');
		// 		router.push(this.eaisRoutes);
		// 	}
		// },
		// create() {
		// 	this.$store.dispatch('createOneItem', this.oneItem);
		// },
		// send() {
		// 	this.allObject = this.oneItem;
		// 	this.$store.dispatch('sendPutOneItem', this.oneItem);
		// 	// this.toRoots();
		// 	// this.$store.commit('putLoadingToggle');
		// },

		// changeSidebarFilterHandler(filter) {
		// 	console.log(filter);
		// 	this.$store.commit('changeSidebarFilterHandler2', filter);
		// },
		// getHandbook(val) {
    //   this.$store.dispatch('getReferences', val);
    // },
	}
}

</script>
