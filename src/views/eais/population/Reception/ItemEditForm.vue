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

<!-- <div v-for="(item, i) in stItems" :key="item.i">
	<v-list-tile @click="statusUtil(statusUtils[i].path)">
		<i class="zmdi zmdi-fullscreen primary--text mr-2 fs-14"></i>
		<span>{{statusUtils[i].name}}</span>
	</v-list-tile>
</div> -->
								<div v-if="oneItem.id && oneItem.data.reg_num === null">
									<v-list-tile @click="createLd()">
										<i class="zmdi zmdi-fullscreen primary--text mr-2 fs-14"></i>
										<span>Создать личное дело на основе заяки</span>
									</v-list-tile>
								</div>

								<div v-if="oneItem.id && oneItem.data.reg_num !== null">
									<v-list-tile @click="letSearch(mainSearch)">
										<i class="zmdi zmdi-fullscreen primary--text mr-2 fs-14"></i>
										<span>Перейти в личное дело</span>
									</v-list-tile>
								</div>


								<div v-if="oneItem.data.status == 10 || oneItem.data.status == 40 || oneItem.data.status == 66 || oneItem.data.status == 67">
									<v-list-tile @click="statusUtil(statusUtils[5])">
										<i class="zmdi zmdi-fullscreen primary--text mr-2 fs-14"></i>
										<span>{{statusUtils[5].name}}</span>
									</v-list-tile>
								</div>


									<div v-if="oneItem.id && oneItem.data.status == 15">
										<v-list-tile @click="statusUtil(statusUtils[1])">
											<i class="zmdi zmdi-fullscreen primary--text mr-2 fs-14"></i>
											<span>{{statusUtils[1].name}}</span>
										</v-list-tile>

										<v-list-tile @click="statusUtil(statusUtils[5])">
											<i class="zmdi zmdi-fullscreen primary--text mr-2 fs-14"></i>
											<span>{{statusUtils[5].name}}</span>
										</v-list-tile>
									</div>

									<div v-if="oneItem.id && oneItem.data.status == 16">
										<v-list-tile @click="statusUtil(statusUtils[2])">
											<i class="zmdi zmdi-fullscreen primary--text mr-2 fs-14"></i>
											<span>{{statusUtils[2].name}}</span>
										</v-list-tile>

										<v-list-tile @click="statusUtil(statusUtils[3])">
											<i class="zmdi zmdi-fullscreen primary--text mr-2 fs-14"></i>
											<span>{{statusUtils[3].name}}</span>
										</v-list-tile>

										<v-list-tile @click="statusUtil(statusUtils[5])">
											<i class="zmdi zmdi-fullscreen primary--text mr-2 fs-14"></i>
											<span>{{statusUtils[5].name}}</span>
										</v-list-tile>
									</div>

									<div v-if="oneItem.id && oneItem.data.status == 28">
										<v-list-tile @click="statusUtil(statusUtils[0])">
											<i class="zmdi zmdi-fullscreen primary--text mr-2 fs-14"></i>
											<span>{{statusUtils[0].name}}</span>
										</v-list-tile>

										<v-list-tile @click="statusUtil(statusUtils[2])">
											<i class="zmdi zmdi-fullscreen primary--text mr-2 fs-14"></i>
											<span>{{statusUtils[2].name}}</span>
										</v-list-tile>

										<v-list-tile @click="statusUtil(statusUtils[3])">
											<i class="zmdi zmdi-fullscreen primary--text mr-2 fs-14"></i>
											<span>{{statusUtils[3].name}}</span>
										</v-list-tile>

										<v-list-tile @click="statusUtil(statusUtils[4])">
											<i class="zmdi zmdi-fullscreen primary--text mr-2 fs-14"></i>
											<span>{{statusUtils[4].name}}</span>
										</v-list-tile>
									</div>

									<div v-if="oneItem.id && oneItem.data.status == 39">
										<v-list-tile @click="statusUtil(statusUtils[1])">
											<i class="zmdi zmdi-fullscreen primary--text mr-2 fs-14"></i>
											<span>{{statusUtils[1].name}}</span>
										</v-list-tile>

										<v-list-tile @click="statusUtil(statusUtils[3])">
											<i class="zmdi zmdi-fullscreen primary--text mr-2 fs-14"></i>
											<span>{{statusUtils[3].name}}</span>
										</v-list-tile>

										<v-list-tile @click="statusUtil(statusUtils[5])">
											<i class="zmdi zmdi-fullscreen primary--text mr-2 fs-14"></i>
											<span>{{statusUtils[5].name}}</span>
										</v-list-tile>
									</div>
								</v-list>
							</v-menu>
						</div>

						<v-dialog v-model="statusDialog" max-width="1100">
								<v-card>
										<v-card-title class="headline">{{editStaus.name}}</v-card-title>

										<v-container fluid grid-list-xl class="eais__readerform">
												<v-layout row wrap>

													<v-flex md12>
														<span class="body-1">Идентификатор заявления</span>
														<span class="subheading font-weight-medium">{{editStaus.id}}</span>
													</v-flex>

													<v-flex md12>
														<v-text-field
															label="Описание"
															v-model="editStaus.comment"
														></v-text-field>
													</v-flex>

												</v-layout>
										</v-container>

										<v-card-actions>
												<v-spacer></v-spacer>

												<v-btn color="primary" flat="flat" @click="clearEditStaus">
														Отменить
												</v-btn>

												<v-btn color="primary" flat="flat" @click="saveEditStaus">
														Сохранить
												</v-btn>

										</v-card-actions>
								</v-card>
						</v-dialog>

						<router-view :oneItem="oneItem"></router-view>
						<div slot="footer" class="justify-space-between footer-flex">
							<v-spacer></v-spacer>
							<!-- <a :href='toScan'>Скачать файл</a> -->


							<!-- <v-btn class="ml-3" @click="fileDownload" color="primary" small>Скачать файл</v-btn> -->
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
</template>

<script>
import oneitem from "@/mixins/oneitem";
import AreYouShure from "Components/Widgets/Eais/AreYouShure";
import {api, file, utils, epetitions, delivery, scheduler} from "Api";
export default {
	mixins: [oneitem],
	beforeMount() {
		this.getHandbook({
			path:	'emplCenters', code: 'emplCenterId', name: 'shortName'
		});
		this.getHandbook({
      path:	'sprDocTypes', code: 'codeInGroup', name: 'fullName'
    });
		this.getHandbook({
			path:	'sprGuRequestStatuses', code: 'typ_cod', name: 'typ_name'
		});
		// sprGuRequestStatuses
	},
	data: () => ({
		statusDialog: false,
		editStaus: {},
		statusUtils: [
			{
				code: 1,
				name: 'Принять положительное решение',
				path: 'utils/v1/epetitions-changeconfirmstatus/mode/change',
				status: 17,
				message: 'Принято положительное решение'
			},
			{
				code: 2,
				name: 'Удалить данные, заявитель не пришел в течение необходимого срока',
				path: 'utils/v1/epetitions-changedeletestatus/mode/change',
				status: 40,
				message: 'Данные удалены, заявитель не пришел в течение необходимого срока'
			},
			{
				code: 3,
				name: 'Ошибочное обращение',
				path: 'utils/v1/epetitions-changeerrorstatus/mode/change',
				status: 67,
				message: 'Ошибочное обращение'
			},
			{
				code: 4,
				name: 'Отозвать по настоянию заявителя',
				path: 'utils/v1/epetitions-changerecallstatus/mode/change',
				status: 66,
				message: 'Отозвано по настоянию заявителя'
			},
			{
				code: 5,
				name: 'Принять отрицательное решение',
				path: 'utils/v1/epetitions-changerejectstatus/mode/change',
				status: 19,
				message: 'Принято отрицательное решение'
			},
			{
				code: 6,
				name: 'Принять в работу',
				path: 'utils/v1/epetitions-changeworkstatus/mode/change',
				status: 28,
				message: 'Электронное дело находится в работе'
			}
		],
		switch1: false,
		eaisRoutes: '/eais/applications/reception',
		savePath: 'api/v1/gu_requests/',
		VacContacts: [],
	}),
	mounted() {
		console.log('this.$store.state.eais.oneItem.data');
		console.log(this.$store.state.eais.oneItem.data);
	},
	computed: {
		toScan() {
			// this.fileDownload();
			// console.log(file);
			// console.log(this.$store.state.auth.tokenParams.access_token);
			return file + '/file/v1/c7a0bb15-7b92-4df1-83a0-fc7b6821e9e6/' + this.$store.state.auth.tokenParams.access_token;
		},
		oneItem () {
			return this.$store.state.eais.oneItem;
		},
		forHeading() {
			if (this.oneItem.data.pfirstname && this.oneItem.data.pmiddlename && this.oneItem.data.plastname) {
				return this.oneItem.data.pfirstname + ' ' + this.oneItem.data.pmiddlename + ' ' + this.oneItem.data.plastname;
			} else {
				return " "
			}

		},
		mainSearch() {
			var searchFields = {
				"offset": 0,
				"limit": 50,
				"attrs": [],
				"filter": {
					"cond": {
						"attr": "reg_num",
						"eq": this.oneItem.data.reg_num
					}
				}
			}
			return searchFields
		}
	},
  components: {
		AreYouShure
  },
	methods: {
		fileDownload() {
			// this.$store.dispatch('getScan');
			console.log(this.$store.state.auth.tokenParams.access_token);
			console.log(file);
		},
		createLd() {
			this.$store.dispatch('createLd', this.oneItem.data.request_num);
		},
		clearEditStaus() {
			this.editStaus = {};
			this.statusDialog = false;
			this.editStaus = {};
		},
		saveEditStaus() {
			this.$store.dispatch('changeStatusGu', this.editStaus);
			this.statusDialog = false;
			// this.clearEditStaus();
		},
		statusUtil(val) {
			this.editStaus = {};
			this.editStaus = JSON.parse(JSON.stringify(val));
			this.editStaus.id = this.oneItem.data.r;
			this.statusDialog = true;
			console.log('this.editStaus');
			console.log(this.editStaus);
			// this.$store.dispatch('changeStatusGu', val);
		},
		preSend() {
			this.$store.commit('toFormProf');
			this.send();
		},
		letSearch(val) {
			console.log(val);
			this.$store.dispatch('searchListItems', {
				value: val,
				path: 'api/v1/perses/search'
			});
			this.$router.push('/eais/population/population');
		}
	}
}

</script>
