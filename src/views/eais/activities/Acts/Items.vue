<template>
	<div>
		<!-- <page-title-bar></page-title-bar> -->
		<v-container fluid pt-0 mt-4 grid-list-xl>
			<!-- <section-tooltip title="Работодатели" tooltip="Работодатели"></section-tooltip> -->
			<v-layout row wrap>
				<!-- Shopping Cart -->
				<app-card
					colClasses="xl12 lg12 md12 sm12 xs12"
					heading="Список договоров активных программ"
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

							<v-list-tile @click="newElement(itemStandart)">
								<i class="zmdi zmdi-fullscreen primary--text mr-2 fs-14"></i>
								<span>Создать</span>
							</v-list-tile>

						</v-list>
					</v-menu>
				</div>

					<items-list></items-list>
					<div slot="footer" class="justify-space-between footer-flex">
						<!--  -->
						<v-spacer></v-spacer>

					</div>
				</app-card>
			</v-layout>
		</v-container>
	</div>
</template>

<style>
.app-card .app-card-title h3, .app-card .app-card-title .app-title {
    font-size: 1rem;
    color: #464D69;
    text-transform: none;
    font-weight: 700;
    margin: 0;
}
.v-btn .v-btn__content {
	font-weight: 700;
}
</style>

<script>
import ItemsList from "Views/eais/activities/Acts/ItemsList";
import RecentOrders from "Components/Widgets/RecentOrders";

export default {
  components: {
    RecentOrders,
		ItemsList
  },
	data: () => ({
		itemStandart: {
			"classCode": "eaisCompany",
			"data": {

			}
		}
	}),
	computed: {

	},
	methods: {
		collapseSidebarHandler() {
			this.$store.commit('collapseSidebarHandler');
		},
		newElement(val) {
			console.log('Создать');
			console.log(val);
			this.$store.dispatch('newElement', val);
			this.$router.push('acts/new/');
		}
	}
}
</script>
