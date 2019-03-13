<template>
	<div>
		<!-- <page-title-bar></page-title-bar> -->
		<v-container fluid pt-0 mt-4 grid-list-xl>
			<!-- <section-tooltip title="Работодатели" tooltip="Работодатели"></section-tooltip> -->
			<v-layout row wrap>
				<!-- Shopping Cart -->
				<app-card
					colClasses="xl12 lg12 md12 sm12 xs12"
					heading="Список работодателей"
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
import ItemsList from "Views/eais/employers/Employers/ItemsList";
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
				"ownerType": null,
				"dateReg": null,
				"educationType": null,
				"municipality": null,
				"liquidationDate": null,
				"eMail": null,
				"userEditorId": null,
				"emplCenterId": null,
				"addInformation": null,
				"changeDate": null,
				"ogrnDate": null,
				"averageCompositionForeigner": null,
				"ogrn": null,
				"companyCode": null,
				"creationDate": null,
				"ogrnNumber": null,
				"accountTag": null,
				"companyId": null,
				"jurAddressId": null,
				"shortName": "",
				"userOwnerId": null,
				"note": "",
				"educationTag": null,
				"soato": null,
				"pfrNumber": null,
				"soogu": null,
				"regDate": null,
				"kppInn": null,
				"hadeCompany": null,
				"userIdentifiedDataCode": null,
				"ownershipId": null,
				"webSite": null,
				"liquidationSignId": null,
				"regNumber": null,
				"aboutCompany": null,
				"licenseStart": null,
				"averageComposition": null,
				"licenseNumber": null,
				"innDoc": null,
				"declarerId": null,
				"activityFormId": null,
				"innDate": null,
				"portalAccessCode": null,
				"inn": null,
				"factAddressId": null,
				"okpo": null,
				"subwayCode": null,
				"driveway": null,
				"licenseEnd": null,
				"shifrOKVED": null,
				"longName": null,
				"iogvTag": null
			},
			"linkedData": {
				"mpArr_cl_mv_ref": [],
				"cl_mv_ref": {},
				"emplCenterId": {},
				"mpArr_vac_free_pack_ref": [],
				"vac_free_pack_ref": {},
				"userEditorId": {},
				"mpArr_addresses": [],
				"addresses": {},
				"mpArr_bankDetails": [],
				"bankDetails": {},
				"mpArr_vac_fair_cl_ref": [],
				"vac_fair_cl_ref": {},
				"mpArr_companyResult": [],
				"companyResult": {},
				"mpArr_agr_or_ref": [],
				"agr_or_ref": {},
				"mpArr_cl_mvpers_ref": [],
				"cl_mvpers_ref": {},
				"mpArr_vac_kvot_ref": [],
				"vac_kvot_ref": {},
				"mpArr_cl_potr_ref": [],
				"cl_potr_ref": {},
				"mpArr_cl_chng_ref": [],
				"cl_chng_ref": {},
				"mpArr_cl_rez_del_ref": [],
				"cl_rez_del_ref": {},
				"mpArr_econActivClass": [],
				"econActivClass": {},
				"userOwnerId": {},
				"mpArr_cl_p_ref": [],
				"cl_p_ref": {},
				"mpArr_cl_mvnp_ref": [],
				"cl_mvnp_ref": {},
				"userIdentifiedDataCode": {},
				"mpArr_cl_z_ref": [],
				"cl_z_ref": {},
				"ownershipId": {},
				"liquidationSignId": {},
				"mpArr_cl_fil_ref": [],
				"cl_fil_ref": {},
				"mpArr_prof_agr_ref": [],
				"prof_agr_ref": {},
				"mpArr_cl_potrv_ref": [],
				"cl_potrv_ref": {},
				"activityFormId": {},
				"mpArr_cl_sr_ref": [],
				"cl_sr_ref": {},
				"mpArr_cl_zv_ref": [],
				"cl_zv_ref": {},
				"mpArr_cl_name_ref": [],
				"cl_name_ref": {},
				"mpArr_avac_ref": [],
				"avac_ref": {},
				"mpArr_contacts": [],
				"contacts": {}
			}
		},
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
			this.$router.push('employer/' + this.newNum + '/');
		}
	}
}
</script>
