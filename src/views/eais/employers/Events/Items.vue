<template>
	<div>
		<!-- <page-title-bar></page-title-bar> -->
		<v-container fluid pt-0 mt-4 grid-list-xl>
			<!-- <section-tooltip title="Работодатели" tooltip="Работодатели"></section-tooltip> -->
			<v-layout row wrap>
				<!-- Shopping Cart -->
				<app-card
					colClasses="xl12 lg12 md12 sm12 xs12"
					heading="Список потребностей"
					customClasses="mb-0"
					:fullBlock="true"
					:fullScreen="true"
					:reloadable="true"
					:closeable="true"
					:footer="true"
				>
					<items-list></items-list>
					<div slot="footer" class="justify-space-between footer-flex">

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
<!-- C:\work\seed\src\views\eais\employers\Jobs\Items.vue -->
<script>
import ItemsList from "Views/eais/employers/Events/ItemsList";
import RecentOrders from "Components/Widgets/RecentOrders";
import oneitem from "@/mixins/oneitem";

export default {
  mixins: [oneitem],
  components: {
    RecentOrders,
		ItemsList
  },
	beforeMount() {
		this.getHandbook({
			path:	'sprFormSubmissions', code: 'codeInGroup', name: 'fullName'
		});
	},
	data: () => ({

	}),
	computed: {

	},
	methods: {
		collapseSidebarHandler() {
			this.$store.commit('collapseSidebarHandler');
		}
	}
}
</script>
