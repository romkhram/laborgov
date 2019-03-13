<!-- App Main Structure -->
<template>
	<div class="app-default-layout">
		<template>

			<app-header></app-header>

			<v-content>
					<router-view></router-view>
			</v-content>

		</template>

		<v-snackbar
			v-model="queryResult.ifError"
			top
			right
			vertical
		>
			<div v-if="queryResult.details.length > 0">
				<p v-for="(item, index) in queryResult.details"  :key="item.index">{{item.message}}</p>
			</div>
			<div v-else>
				<!-- <p>Отсутствует {{queryResult.queryType}} «{{queryResult.errorPath}}».</p>
	      <p>Ошибка запроса - {{queryResult.errorCode}}: {{queryResult.errorName}}.</p> -->
				<p>Ошибка данных.</p>
				<p>Приносим извинения за вызванные неудобства.</p>
	      <p>Обратитесь к администратору.</p>
			</div>
			<v-btn
				flat
				@click="ifErrorStop"
			>
				Закрыть
			</v-btn>
		</v-snackbar>

		<v-snackbar
			v-model="putLoading"
			top
			right
			vertical
		>
      <p v-if="putLoadingData === null">Информация сохранена.</p>
			<p v-else>{{putLoadingData}}</p>
			<v-btn
				flat
				@click="putLoadingEnd"
			>
				Закрыть
			</v-btn>
		</v-snackbar>

		<!-- CHECK	 -->
		<v-snackbar
			v-model="check.switch"
			class="checkSnackbar"
			top
			right
			vertical
			:timeout='0'
		>
		<div v-if="check.txt.header">
			<p>{{check.txt.header}}</p>
			<p class="mt-4 mb-1">{{check.headers.name}}</p>
			<p class="subheading font-weight-medium">{{check.txt.name}}</p>

			<p class="mt-4 mb-1">{{check.headers.ogrnul}}</p>
			<p class="subheading font-weight-medium">{{check.txt.ogrnul}}</p>

			<p class="mt-4 mb-1">{{check.headers.ogrnulDate}}</p>
			<p class="subheading font-weight-medium">{{check.txt.ogrnulDate}}</p>

			<p class="mt-4 mb-1">{{check.headers.orgName}}</p>
			<p class="subheading font-weight-medium">{{check.txt.orgName}}</p>

			<!-- <p class="mt-4">ОГРНЮЛ: {{check.txt.ogrnul}}</p>
			<p>Дата ОГРНЮЛ: {{check.txt.ogrnulDate}}</p>
			<p>Наименование налогового органа: {{check.txt.orgName}}</p> -->
		</div>
		<div v-else>
			<p class="subheading font-weight-medium pr-5 mr-2">{{check.txt.error}}</p>
		</div>
			<v-btn
				flat
				@click="checkEnd"
			>
				Закрыть
			</v-btn>
		</v-snackbar>

	</div>
</template>

<style>
	.v-snack__content {
		height: auto !important;
	}
	@media only screen and (min-width: 600px) {
		.checkSnackbar div.v-snack__wrapper {
			max-width: auto !important;
			width: 700px;
		}
	}
	.eais__readerform .body-1 {color: rgba(0, 0, 0, 0.50);}
	.eais__readerform .subheading:empty::before {content: "\2014";}
	.eais__readerform .subheading {color: #464D69;}
</style>

<script>
import { mapGetters } from "vuex";
import Header from "Components/Header/Header.vue";
// import Tour from "Components/Tour/Tour";
import AppConfig from "Constants/AppConfig";

export default {
	beforeMount() {
		this.getHandbook({
			path:	'sl_specs', code: 'spec_cod', name: 'spec_name'
		});
		this.getHandbook({
			path:	'sl_profs', code: 'prof_cod', name: 'prof_name'
		});
		this.getHandbook({
			path:	'sl_okveds', code: 'shifr', name: 'name'
		});
		this.getHandbook({
			path:	'sl_vactypes', code: 'type_cod', name: 'type_name'
		});
	},
  mounted() {
    setTimeout(() => {
      this.loading = false;
      // setTimeout(() => {
      //   if (AppConfig.enableUserTour) {
      //     this.$tours["EaisTour"].start();
      //   }
      // }, 50);
    }, 100);
  },
  data() {
    return {
      loading: true,
			snackbarError: true
    };
  },
  components: {
    appHeader: Header,
    // Tour
  },
  computed: {
		queryResult() {
      return this.$store.state.eais.queryResult;
    },
		putLoading() {
      return this.$store.state.eais.putLoading.note;
    },
		putLoadingData() {
      return this.$store.state.eais.putLoading.data;
    },
		check() {
      return this.$store.state.eais.check;
    },
    // ...mapGetters(["selectedRouterAnimation"])
  },
	methods: {
		checkEnd() {
			this.$store.commit('checkEnd');
		},
		putLoadingEnd() {
			this.$store.commit('saveToggle');
		},
		ifErrorStop() {
			this.$store.commit('errorToggle');
		},
		getHandbook(val) {
			this.$store.dispatch('getReferences', val);
		},
	}
};
</script>

<style scoped>
.app-default-layout {
  height: 100vh;
}
</style>
