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

								</v-list>
							</v-menu>
						</div>
						<router-view :oneItem="oneItem"></router-view>
						<div slot="footer" class="justify-space-between footer-flex">
							<v-spacer></v-spacer>
							<v-btn v-if="this.$store.state.eais.globalCreate" class="ml-3" color="primary" @click="openShureDialog" small>Отмена</v-btn><v-btn v-else class="ml-3" color="primary" @click="openShureDialog" small>Закрыть</v-btn>
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
// import EmployersList from "Components/Widgets/Eais/Employers/EmployersList";
// import EmployerEdit from "Components/Widgets/Eais/Employers/EmployerEdit";
import AreYouShure from "Components/Widgets/Eais/AreYouShure";
// import RecentOrders from "Components/Widgets/RecentOrders";

export default {
  mixins: [oneitem],
	beforeMount() {
		// this.getHandbook('sl_ares'); // Сферы деятельности (are_cod и are_name) (are_cod в sl_profs)
				// this.getHandbook({
		// 	path:	'sprPositions', code: 'codeInGroup', name: 'fullName'
		// });
		this.getHandbook({
			path:	'sprFormSalarys', code: 'codeInGroup', name: 'fullName'
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
			path:	'sl_okveds', code: 'shifr', name: 'name'
		});
		this.getHandbook({
			path:	'sl_oksms', code: 'oksm_cod', name: 'oksm_name'
		});
		// this.getHandbook('sl_okveds');
	},
	data: () => ({
		switch1: false,
		eaisRoutes: '/eais/foreigners/requests',
		savePath: 'api/v1/cl_zs/',
		VacContacts: [],
	}),
	mounted() {
	},
	computed: {
		oneItem () {
			console.log(this.$store.state.eais.oneItem);
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
