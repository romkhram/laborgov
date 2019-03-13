<template>
	<v-container fluid>
		<app-card :fullBlock="true">
			<v-breadcrumbs>
				<h2 class="text-capitalize mb-0">
					{{name}}
				</h2>
				<div class="spacer"></div>
				<v-icon slot="divider">chevron_right</v-icon>
				<v-breadcrumbs-item>
					{{pageBreadcrumb}} / {{name}}
				</v-breadcrumbs-item>
			</v-breadcrumbs>
		</app-card>
	</v-container>
</template>

<script>
export default {
	props: ['name'],
  computed: {
    // computed property to get page breadcrumbs
    pageTitle() {
      return this.$breadcrumbs[0].meta.title;
    },
    pageBreadcrumb() {
      return this.$breadcrumbs[0].meta.breadcrumb;
    }//,
		// emploer () {
		// 	return this.$store.state.eais.emploer;
		// }
  },
	methods: {
		stOut(val) {
			setTimeout(function() {return val}, 1000);
		}
	}
};
</script>
