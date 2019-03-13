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

									<!-- <v-list-tile @click="letSearch(mainSearch)">
										<i class="zmdi zmdi-fullscreen primary--text mr-2 fs-14"></i>
										<span>Перейти в ЛДПГУ работодателя</span>
									</v-list-tile> -->

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
import AreYouShure from "Components/Widgets/Eais/AreYouShure";
export default {
  mixins: [oneitem],
	beforeMount() {
		this.getHandbook({
			path:	'emplCenters', code: 'emplCenterId', name: 'shortName'
		});
	},
	data: () => ({
		eaisRoutes: '/eais/dismissal/companies',
		savePath: 'api/v1/cl_mvs/'
	}),
	mounted() {
	},
	computed: {
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
	},
  components: {
		AreYouShure
  },
	methods: {
	}
}

</script>
