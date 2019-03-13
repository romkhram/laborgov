<!-- Header Structure -->
<template>
	<div>
		<v-navigation-drawer
			v-if="!horizontal"
			app
			fixed
			v-model="drawer"
			:mini-variant="collapseSidebar"
			mini-variant-width="70"
			:width="300"
			class="Eais-sidebar"
			:style="{backgroundImage: 'url(' + selectedSidebarBgImage.url + ')'}"
			:class="{'background-none': !backgroundImage}"
			:right="rtlLayout"
		>
			<!-- App Sidebar -->
			<app-sidebar></app-sidebar>
		</v-navigation-drawer>

		<v-navigation-drawer
			v-model="fileDriver"
			absolute
			temporary
			:width="666"
			right
		>
			<reports></reports>
		</v-navigation-drawer>

		<v-toolbar
			class="Eais-toolbar"
			app
			:color="activeHeaderFilter.class"
			fixed
		>
			<div class="d-custom-flex align-items-center navbar-left">
				<div v-if="!horizontal">
					<v-btn class="mx-3" icon @click.stop="drawer = !drawer">
						<v-icon v-text="drawer ? 'navigate_before' : 'navigate_next'"></v-icon>
					</v-btn>
					<!-- <v-icon @click.stop="drawer = !drawer">{{drawer ? menu : edit}}</v-icon>
					<v-toolbar-side-icon icon large @click.stop="drawer = !drawer" class="v-step-0"></v-toolbar-side-icon> -->
				</div>
				<!-- <div class="site-logo-wrap d-custom-flex ml-0 align-items-center" v-else>
					<router-link to="/horizontal/dashboard/ecommerce" class="grayish-blue site-logo-img">
						<img src="/static/img/site-logo.png" alt="site logo" width="100" height="30">
					</router-link>
				</div> -->
				<router-view name="search" :drawer="drawer"></router-view>

				<div class="mobile-search d-none">
					<v-btn flat icon  small class="mobile-search-btn" >
						<v-icon class="font-md">search</v-icon>
					</v-btn>
				</div>
			</div>

			<div class="navbar-right">
				<v-btn icon large @click="fileDriver = true" class="full-screen ma-0">
					<v-icon color="grey">description</v-icon>
				</v-btn>
			</div>

		</v-toolbar>
	</div>
</template>

<style>
.v-navigation-drawer--close .v-btn .v-btn__content .v-icon {
	transform: rotate(180deg);
}
</style>

<script>
import Sidebar from "../Sidebar/Sidebar.vue";
import Reports from "../Reports/Reports.vue";
// import ChatSidebar from "../ChatSidebar/ChatSidebar.vue";
// import LanguageProvider from "./LanguageProvider";
// import Notifications from "./Notifications";
// import Cart from "./Cart";
// import QuickLinks from "./QuickLinks";
// import MobileSearchForm from "./MobileSearchForm";
// import { getCurrentAppLayout } from "Helpers/helpers";
import { mapGetters } from "vuex";

export default {
  props: {
    horizontal: {
      default: false,
      type: Boolean
    }
  },
  data() {
    return {
			fileDriver: false,
			extraSearch: false,
      collapsed: false, // collapse sidebar
      drawer: true, // sidebar drawer default true
      // chatSidebar: false, // chat component right sidebar
      sidebarImages: "", // sidebar background images
      enableDefaultSidebar: false
    };
  },
  computed: {
    ...mapGetters([
      "rtlLayout",
      "backgroundImage",
      "backgroundImage",
      "selectedSidebarBgImage",
			"darkMode",
			"collapseSidebar",
			"activeHeaderFilter"
    ]),
		navIco() {
			return edit;
		}
  },
  methods: {
    // toggle full screen method
    toggleFullScreen() {
      if (screenfull.enabled) {
        screenfull.toggle();
      }
		},
		// getMenuLink(link) {
		// 	return '/' + getCurrentAppLayout(this.$router) + link;
		// }
  },
  components: {
    appSidebar: Sidebar,
		Reports,
    // ChatSidebar,
    // LanguageProvider,
    // Notifications,
    // Cart,
    // QuickLinks,
    // MobileSearchForm
  }
};
</script>
