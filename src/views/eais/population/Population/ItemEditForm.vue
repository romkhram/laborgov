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

									<v-list-tile @click="checkEgrip()">
										<i class="zmdi zmdi-fullscreen primary--text mr-2 fs-14"></i>
										<span>Проверка ЕГРИП</span>
									</v-list-tile>

									<v-list-tile @click="checkSnils()">
										<i class="zmdi zmdi-fullscreen primary--text mr-2 fs-14"></i>
										<span>Проверка СНИЛС</span>
									</v-list-tile>

									<v-list-tile @click="reReg = true">
										<i class="zmdi zmdi-fullscreen primary--text mr-2 fs-14"></i>
										<span>Перерегистрация</span>
									</v-list-tile>
<!--
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

			<v-dialog v-model="reReg" max-width="1100">
					<v-card>
							<v-card-title class="headline">Перерегистрация</v-card-title>

							<v-container fluid grid-list-xl class="eais__readerform">
									<v-layout row wrap>

										<v-flex md3 py-1>
												<date-picker label="Дата явки" v-model="oneItem.data.date_p"></date-picker>
										</v-flex>

									</v-layout>
							</v-container>

							<v-card-actions>
									<v-spacer></v-spacer>

									<v-btn color="primary" flat="flat" @click="reReg = false">
											Отменить
									</v-btn>

									<v-btn color="primary" flat="flat" @click="reReg = false">
											Сохранить
									</v-btn>

							</v-card-actions>
					</v-card>
			</v-dialog>

		</div>
	</div>
</template>

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
			path:	'sl_rks', code: 'rk_cod', name: 'rk_name'
		});
		this.getHandbook({
			path:	'sl_rk_osns', code: 'rk_osn', name: 'osn_namel'
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
      path:	'sprDEFs', code: 'cipherInGroup', name: 'fullName'
    });
		this.getHandbook({
      path:	'sprPersStatuss', code: 'typ_cod', name: 'typ_name'
    });
		this.getHandbook({
      path:	'sl_specs', code: 'spec_cod', name: 'spec_name'
    });
		this.getHandbook({
		path: 'sprViewDatas', code: 'typ_cod', name: 'typ_name'
		});
		this.getHandbook('sprPOORs');
		this.getHandbook('sprPPOes');
	},
	data: () => ({
		newDates: {
			reg_date: null,
			date_n: null,
			date_p: null
		},
		reReg: false,
		switch1: false,
		eaisRoutes: '/eais/population/population',
		savePath: 'api/v1/perses/',
		VacContacts: [],
	}),
	mounted() {
	},

	computed: {
		pasportDate() {
			var birthDate = this.oneItem.data.date_borth.split('T')[0];
			var birthDateArr = birthDate.split('-');
			var date20 = Number(((Number(birthDateArr[0]) + 20) + '-' + birthDateArr[1] + '-' + birthDateArr[2]).replace(/\D+/g,""));
			var date45 = Number(((Number(birthDateArr[0]) + 45) + '-' + birthDateArr[1] + '-' + birthDateArr[2]).replace(/\D+/g,""));
			var pasportDate = Number((this.oneItem.data.ausd.split('T')[0]).replace(/\D+/g,""));
			if (pasportDate < date45) {
				console.log('Пора менять паспорт');
			}
			return pasportDate;
		},
		oneItem () {
			return this.$store.state.eais.oneItem;
		},
		forHeading() {
			if (this.oneItem.data.name) {
				return this.oneItem.data.name;
			} else {
				return ' '
			}

		},
	},
  components: {
		AreYouShure
  },
	methods: {
		checkSnils() {
			var forSnils = {};
			// sex
			forSnils.surname = this.oneItem.data.fam;
			forSnils.name = this.oneItem.data.nam;
			forSnils.secondname = this.oneItem.data.famn;
			forSnils.birthDate = this.oneItem.data.date_borth.split('T')[0];
			if (this.oneItem.data.sex === 0) {
				forSnils.sex = 'М';
			} else {
				forSnils.sex = 'Ж';
			}
			console.log(forSnils);
			this.$store.dispatch('checkSnils', forSnils);
		},
		checkEgrip() {
			this.$store.dispatch('checkEgrip', this.oneItem.data.inn);
		},
		preSend() {
			this.$store.commit('toFormProf');
			this.send();
		}
	}
}

</script>
