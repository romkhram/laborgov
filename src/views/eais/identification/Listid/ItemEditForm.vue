<template>
	<div>
		<pre-loader v-if="this.$store.state.eais.putLoading.loading"></pre-loader>
		<div v-else>
		<v-container fluid id="topObj">
			<v-card flat color="grey lighten-5" class="app-card">
				<v-card-title primary-title class="app-card-title">
				  <h3>Основной объект</h3>
				</v-card-title>
			</v-card>
			<v-card flat>
        <v-container fluid pb-3 class="eais__readerform">
          <v-layout row wrap>

						<v-flex md3 pb-2>
							<span class="subheading">{{oneItem.data.longName}}</span>
						</v-flex>



            <!-- <v-flex md2>
              <span class="body-1">Идентификатор: <span class="subheading">{{oneItem.id}}</span></span>
            </v-flex>

						<v-flex md2>
              <span class="body-1">ЛДПГУ: <span class="subheading">{{oneItem.data.declarerId}}</span></span>
            </v-flex> -->

            <v-flex md2>
              <span class="body-1">ИНН: <span class="subheading">{{oneItem.data.inn}}</span></span>
            </v-flex>

            <v-flex md2>
              <span class="body-1">КПП: <span class="subheading">{{oneItem.data.kppInn}}</span></span>
            </v-flex>

            <v-flex md2>
              <span class="body-1">ОГРН: <span class="subheading">{{oneItem.data.ogrn}}</span></span>
            </v-flex>

            <v-flex md2>
              <span class="body-1">ОКПО: <span class="subheading">{{oneItem.data.okpo}}</span></span>
            </v-flex>

          </v-layout>
        </v-container>
      </v-card>

			<v-card flat v-if="!this.$store.state.eais.listMode && duplicateItems.length !== 0">
				<v-container fluid pt-0 pl-3>
					<v-layout row wrap>
						<v-chip small v-for="(item, index) in duplicateItems"  :key="index">
							<span v-if="item.data.shortName !== null">{{item.data.shortName}}</span>
							<span v-else>{{item.data.longName}}</span>, ИНН: {{item.data.inn}}
						</v-chip>
				</v-layout>
			</v-container>
		</v-card>

		</v-container>

		<v-container fluid py-0>
			<!-- <section-tooltip title="Работодатели / " tooltip="Работодатели"></section-tooltip> -->
			<v-layout row wrap>
				<!-- Shopping Cart -->
				<app-card
					colClasses="xl12 lg12 md12 sm12 xs12"
					heading="Выберите двойников"
					customClasses="mb-0"
					:fullBlock="true"
					:fullScreen="true"
					:reloadable="true"
					:closeable="true"
					:footer="true"
				>
					<router-view :oneItem="oneItem" :dubles="items" :listMode="listMode" :duplicateItems="duplicateItems"></router-view>
					<!-- <employer-edit :eaisExpand="switch1"></employer-edit> -->
					<div slot="footer" class="justify-space-between footer-flex">
						<v-spacer></v-spacer>
						<v-btn v-if="this.$store.state.eais.globalCreate" class="ml-3" color="primary" @click="openShureDialog" small>Отмена</v-btn><v-btn v-else class="ml-3" color="primary" @click="openShureDialog" small>Закрыть</v-btn>
						<v-btn v-if="this.$store.state.eais.globalCreate" class="ml-3" color="primary" :loading="putLoading" @click="create" small>Создать</v-btn>
						<v-btn v-else class="ml-3" color="primary" @click="beforeSend" small>Сохранить</v-btn>

						<are-you-shure :eaisRoutes="eaisRoutes"></are-you-shure>
					</div>
				</app-card>
			</v-layout>
		</v-container>



	</div>	</div>
</template>

<script>
import oneitem from "@/mixins/oneitem";
// import EmployersList from "Components/Widgets/Eais/Employers/EmployersList";
// import EmployerEdit from "Components/Widgets/Eais/Employers/EmployerEdit";
import AreYouShure from "Components/Widgets/Eais/AreYouShure";
// import RecentOrders from "Components/Widgets/RecentOrders";

export default {
  mixins: [oneitem],
	data: () => ({
		switch1: false,
    duplicateItems: [],
		listMode: false,
		eaisRoutes: '/eais/identification/identificationlist',
		savePath: 'api/v1/eaisCompanies/',
	}),
	mounted() {
		this.createDublicates();
		// this.sprPositions();
	},
	computed: {
		oneItem () {
			return this.$store.state.eais.oneItem;
		},
		items () {
		  return this.$store.state.eais.items;
		}
	},
  components: {
		// EmployerEdit,
		AreYouShure
  },
	methods: {
		beforeSend() {
			this.duplicateItems = [];
			// this.send();
			this.$store.dispatch('mergeEmpsArr', this.oneItem.linkedData.cl_idant_ref.delete);
		},
		createDublicates() {
			// console.log(this.$store.state.eais.oneItem.linkedData.mpArr_cl_idant_ref);
			var clIdants = this.oneItem.linkedData.mpArr_cl_idant_ref;
			var clIdantsArr = [];
			clIdants.forEach(function(el) {
				clIdantsArr.push(el.data.c_client_old);
			});
			console.log('clIdantsArr');
			console.log(clIdantsArr);
		},
		clearDuplicateInItems() {
			console.log('clearDuplicateInItems');
			if (this.duplicateItems.length !== 0) {
				for (var i = 0; i < this.duplicateItems.length; i++) {
					console.log(this.duplicateItems[i].id);
					const thisItem = this.items.findIndex(x => x.id === this.duplicateItems[i].id);
					this.items.splice(thisItem, 1);
				}
			}
		},

		// openShureDialog() {
		// 	this.$store.commit('toggleShureDialog');
		// },
		// send() {
		// 	this.emploer.linkedData.bankDetails.forEach(function(element) {
		// 		delete element.links
		// 		delete element.title
		// 	});
		// 	this.$store.dispatch('editEmployer', this.emploer);
		// },
		// changeSidebarFilterHandler(filter) {
		// 	console.log(filter);
		// 	this.$store.commit('changeSidebarFilterHandler2', filter);
		// },
		// Справочники
		// getSlOkveds() {
		// 	this.$store.dispatch('getSlOkveds');
		// },
		// sprPositions() {
		// 	this.$store.dispatch('sprPositions');
		// },
		// getHandbook(val) {
		// 	this.$store.dispatch('getHandbook', val);
		// },
	},
	destroyed() {
		this.$store.state.eais.items = [];
		this.$store.state.eais.items.push(this.$store.state.eais.oneItem);
	}
}

</script>
