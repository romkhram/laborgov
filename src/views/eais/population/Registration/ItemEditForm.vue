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
					:heading="oneItem.data.name"
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

								<!-- <v-list-tile @click="letSearch(mainSearch)">
									<i class="zmdi zmdi-fullscreen primary--text mr-2 fs-14"></i>
									<span>Перейти в заявку</span>
								</v-list-tile>

								<v-list-tile @click="letSearch(mainSearch)">
									<i class="zmdi zmdi-fullscreen primary--text mr-2 fs-14"></i>
									<span>Перейти в трудоустройство</span>
								</v-list-tile> -->

							</v-list>
						</v-menu>
					</div>

					<router-view :oneItem="oneItem"></router-view>
					<div slot="footer" class="justify-space-between footer-flex">
						<v-spacer></v-spacer>
						<v-btn v-if="this.$store.state.eais.globalCreate" class="ml-3" color="primary" @click="openShureDialog" small>Отмена</v-btn>
						<v-btn v-else class="ml-3" color="primary" @click="openShureDialog" small>Закрыть</v-btn>
						<v-btn v-if="this.$store.state.eais.globalCreate" class="ml-3" color="primary" @click="create" small>Создать</v-btn>
						<v-btn v-else class="ml-3" color="primary" @click="preSend" small>Сохранить</v-btn>
						<are-you-shure :eaisRoutes="eaisRoutes"></are-you-shure>
					</div>
				</app-card>
			</v-layout>
		</v-container>
	</div>
</div>
					<!-- <router-view :oneItem="oneItem"></router-view>
					<div slot="footer" class="justify-space-between footer-flex">
						<v-spacer></v-spacer>
						<v-btn v-if="this.$store.state.eais.globalCreate" class="ml-3" color="primary" @click="openShureDialog" small>Отмена</v-btn><v-btn v-else class="ml-3" color="primary" @click="openShureDialog" small>Закрыть</v-btn>
						<v-btn class="ml-3" color="primary" @click="send" small>Отправить</v-btn>
						<are-you-shure eaisRoutes="/eais/population/registration"></are-you-shure>
					</div>
				</app-card>
			</v-layout>
		</v-container>



	</div> -->
</template>


<!-- import oneitem from "@/mixins/oneitem";
import profSearch "@/mixins/profSearch";
import AreYouShure from "Components/Widgets/Eais/AreYouShure";

export default {
	mixins: [oneitem, profSearch], -->


<script>
import oneitem from "@/mixins/oneitem";
import AreYouShure from "Components/Widgets/Eais/AreYouShure";

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
      path:	'sl_okveds', code: 'shifr', name: 'name'
    });
		this.getHandbook({
      path:	'sprPositions', code: 'codeInGroup', name: 'fullName'
    });
		this.getHandbook({
      path:	'sprDocTypes', code: 'codeInGroup', name: 'fullName'
    });
		this.getHandbook({
      path:	'sl_oksms', code: 'oksm_cod', name: 'oksm_name'
    });
		this.getHandbook({
      path:	'sprMaritalStatuses', code: 'codeInGroup', name: 'fullName'
    });
		this.getHandbook({
      path:	'sprMilitaryRanks', code: 'codeInGroup', name: 'fullName'
    });
		this.getHandbook({
      path:	'sprPERIODes', code: 'codeInGroup', name: 'fullName'
    });
		this.getHandbook({
      path:	'sprPersStatuss', code: 'typ_cod', name: 'typ_name'
    });
    this.getHandbook({
			path:	'sprSBS', code: 'codeInGroup', name: 'shortName'
		});
    this.getHandbook({
			path:	'municipalityDivisions', code: 'cim', name: 'txt'
		});
	},
	data: () => ({
		switch1: false,
		eaisRoutes: '/eais/population/registration',
		savePath: 'api/v1/perses/',
		VacContacts: [],
	}),
	mounted() {
	},
	computed: {
		oneItem () {
			return this.$store.state.eais.oneItem;
		},
	},
  components: {
		// EmployerEdit,
		AreYouShure
  },
	methods: {
		// openShureDialog() {
		// 	this.$store.commit('toggleShureDialog');
		// },
		preSend() {
			if (this.oneItem.linkedData.mpArr_pers_ask_ref[0].id) {
				this.oneItem.linkedData.pers_ask_ref.update = this.oneItem.linkedData.mpArr_pers_ask_ref
			} else {
				this.oneItem.linkedData.pers_ask_ref.create = this.oneItem.linkedData.mpArr_pers_ask_ref
			}
			this.send();
		},
		changeSidebarFilterHandler(filter) {
			console.log(filter);
			this.$store.commit('changeSidebarFilterHandler2', filter);
		},
		// Справочники
	}
}

</script>
