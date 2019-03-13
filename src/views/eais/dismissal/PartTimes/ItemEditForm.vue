<template>
	<div>
		<page-title-bar :oneItem="oneItem"></page-title-bar>
		<v-container fluid py-0 grid-list-xl>
			<!-- <section-tooltip title="Работодатели / " tooltip="Работодатели"></section-tooltip> -->
			<v-layout row wrap>
				<!-- Shopping Cart -->
				<app-card
					colClasses="xl12 lg12 md12 sm12 xs12"
					:heading="oneItem.data.longName"
					customClasses="mb-0"
					:fullBlock="true"
					:fullScreen="true"
					:reloadable="true"
					:closeable="true"
					:footer="true"
				>
					<router-view :oneItem="oneItem"></router-view>
					<!-- <employer-edit :eaisExpand="switch1"></employer-edit> -->
					<div slot="footer" class="justify-space-between footer-flex">
						<!-- <v-btn class="ml-3" color="primary" @click="newItem" small>Отмена</v-btn> -->
						<v-spacer></v-spacer>
						<v-btn v-if="this.$store.state.eais.globalCreate" class="ml-3" color="primary" @click="openShureDialog" small>Отмена</v-btn><v-btn v-else class="ml-3" color="primary" @click="openShureDialog" small>Закрыть</v-btn>
						<v-btn class="ml-3" color="primary" @click="send" small>Отправить</v-btn>
						<are-you-shure eaisRoutes="/eais/dismissal/parttime"></are-you-shure>
					</div>
				</app-card>
			</v-layout>
		</v-container>



	</div>
</template>

<script>
// import EmployersList from "Components/Widgets/Eais/Employers/EmployersList";
// import EmployerEdit from "Components/Widgets/Eais/Employers/EmployerEdit";
import AreYouShure from "Components/Widgets/Eais/AreYouShure";
// import RecentOrders from "Components/Widgets/RecentOrders";

export default {

	data: () => ({
		switch1: false,
	}),
	mounted() {
		// this.getEmployers();
	 	this.getHandbook({
			path: 'api/v1/sl_okveds/search',
			stateHandbook: this.$store.state.eais.slOkveds
		});
	 	this.getHandbook({
			path: 'api/v1/sprPositions/search',
			stateHandbook: this.$store.state.eais.sprPositions
		});
		// this.sprPositions();
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
		openShureDialog() {
			this.$store.commit('toggleShureDialog');
		},
		send() {
			this.emploer.linkedData.bankDetails.forEach(function(element) {
				delete element.links
				delete element.title
			});
			this.$store.dispatch('editEmployer', this.emploer);
		},
		changeSidebarFilterHandler(filter) {
			console.log(filter);
			this.$store.commit('changeSidebarFilterHandler2', filter);
		},
		// Справочники
		getSlOkveds() {
			this.$store.dispatch('getSlOkveds');
		},
		sprPositions() {
			this.$store.dispatch('sprPositions');
		},
		getHandbook(val) {
			this.$store.dispatch('getHandbook', val);
		},
	}
}

</script>
