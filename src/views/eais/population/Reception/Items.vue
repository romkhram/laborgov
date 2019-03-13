<template>
	<div>
		<!-- <page-title-bar></page-title-bar> -->
		<v-container fluid pt-0 mt-4 grid-list-xl>
			<!-- <section-tooltip title="Работодатели" tooltip="Работодатели"></section-tooltip> -->
			<v-layout row wrap>
				<!-- Shopping Cart -->
				<app-card
					colClasses="xl12 lg12 md12 sm12 xs12"
					heading="Реестр электронных заявлений"
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

							<v-list-tile @click="newElement()">
								<i class="zmdi zmdi-fullscreen primary--text mr-2 fs-14"></i>
								<span>Создать</span>
							</v-list-tile>

							<v-list-tile @click="asksScheduler()">
								<i class="zmdi zmdi-fullscreen primary--text mr-2 fs-14"></i>
								<span>Получить заявления</span>
							</v-list-tile>

							<v-list-tile @click="asksDelivery()">
								<i class="zmdi zmdi-fullscreen primary--text mr-2 fs-14"></i>
								<span>Отправить статусы</span>
							</v-list-tile>

						</v-list>
					</v-menu>
				</div>

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

<script>
import ItemsList from "Views/eais/population/Reception/ItemsList";
import RecentOrders from "Components/Widgets/RecentOrders";

export default {
  components: {
    RecentOrders,
		ItemsList
  },
	data: () => ({

	}),
	computed: {
		dateNow() {
			var dateNow = new Date();
			// dateNow.toISOString()
			// dateNow.setMinutes(dateNow.getMinutes() + 1);
			// console.log(dateNow);
			return dateNow.toISOString();
		},
		persPattern() {
			var persPattern = {
				"classCode": "gu_request",
				"data": {
					abbreviatedname: null,
					iogvname: null,
					in_date: null,
					pgender_name: null,
					rsadistrict_name: null,
					cmobilephone: null,
					rsabuilding: null,
					citizenship_name: null,
					appname: "Регистрация в целях поиска подходящей работы",
					expectedresponse: null,
					rsastreet_code: null,
					p_modi: null,
					rsablock: null,
					iogvcode: null,
					cphone: null,
					ogrn: null,
					rsaindex: null,
					psnils: null,
					applicanttype: "P",
					pname: null,
					formoflegalperson: null,
					rsaappartment: null,
					d_modi: null,
					country_code: null,
					idpasnumber: null,
					appcode: "213.0.10.02.2",
					sob_comm: null,
					cmail: null,
					status: "15",
					rsafias: null,
					fok_code: null,
					idpasissuer: null,
					request_num: null,
					pmiddlename: null,
					legalpersonname: null,
					pinn: null,
					applicationdate: null,
					pfirstname: null,
					rtype: null,
					sob_cod: null,
					country_name: null,
					sob_date: null,
					region_name: null,
					pers_num: null,
					pgender_code: null,
					idpasissuerdat: null,
					reg_num: null,
					idtyp: null,
					rsadistrict_code: null,
					citizenship_code: null,
					plastname: null,
					statusdate: null,
					statuscomment: null,
					idpasseries: null,
					pplaceofbirth: null,
					r: null,
					cfax: null,
					pbirth: null,
					rsastreet_name: null,
					region_code: null,
				}
			}
			return persPattern;
		}
	},
	methods: {
		// asksStatuses(val) {
		// 	this.$store.dispatch('asksDelivery', val);
		// },
		asksDelivery() {
			this.$store.dispatch('asksDelivery');
		},
		asksScheduler() {
			this.$store.dispatch('asksScheduler');
		},
		collapseSidebarHandler() {
			this.$store.commit('collapseSidebarHandler');
		},
		newElement(val) {
			console.log('Создать');
			console.log(JSON.parse(JSON.stringify(this.persPattern)));
			this.$store.dispatch('newElement', JSON.parse(JSON.stringify(this.persPattern)));
			this.$router.push('reception/new/');
		}
	}
}
</script>
