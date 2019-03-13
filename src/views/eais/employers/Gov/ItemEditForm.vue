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
					<router-view :oneItem="oneItem"></router-view>

					<div slot="footer" class="justify-space-between footer-flex">
						<v-spacer></v-spacer>
						<v-btn v-if="this.$store.state.eais.globalCreate" class="ml-3" color="primary" @click="openShureDialog" small>Отмена</v-btn><v-btn v-else class="ml-3" color="primary" @click="openShureDialog" small>Закрыть</v-btn>
						<v-btn v-if="this.$store.state.eais.globalCreate" class="ml-3" color="primary" :loading="putLoading" @click="create" small>Создать</v-btn>
						<v-btn v-else class="ml-3" color="primary" :loading="putLoading" @click="send" small>Сохранить</v-btn>
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
import GetOneItem from "Components/Widgets/Eais/GetOneItem";
import router from '@/router'

export default {
  mixins: [oneitem],
	beforeMount() {
		// this.getHandbook('sl_ares'); // Сферы деятельности (are_cod и are_name) (are_cod в sl_profs)
				// this.getHandbook({
		// 	path:	'sprPositions', code: 'codeInGroup', name: 'fullName'
		// });
		this.getHandbook({
			path:	'sprFormSubmissions', code: 'codeInGroup', name: 'fullName'
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
	},
	data: () => ({
		eaisRoutes: '/eais/employers/needs',
		savePath: 'api/v1/cl_potrs/',
	}),
	mounted() {
	},
	computed: {
		oneItem () {
			return this.$store.state.eais.oneItem;
		},
		forHeading() {
			if (this.oneItem.extraData) {
				return this.oneItem.extraData.c_client.longName;
			} else {
				return 'Не задана'
			}
		}
	},
  components: {
		AreYouShure
  },
	methods: {
	}
}

</script>
