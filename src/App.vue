<template>
  <v-app
	:dark="darkMode"
	id="inspire"
	:class="[{
		'box-layout': boxLayout,
		'collapse-sidebar': collapseSidebar,
		'rtl-layout': rtlLayout
	}]"
  >
    	<!-- <router-view :auth="auth" :authenticated="authenticated"></router-view> -->
      <router-view></router-view>
  </v-app>
</template>

<style>
html, body {
    overflow-y: hidden !important;
}
.required label.v-label:before, .requiredNote:before {
    content: "* ";
    color: red;
    font-size: 20px;
}
/* .required label.v-label.v-label--active:after {
    content: "";
    color: red;
} */
.v-navigation-drawer .navigation .v-list .v-list__tile--link.v-list__tile--active .v-list__tile__title {
    color: #5d92f4;
}
.eais__readerform .flex span {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}
.expand-transition-enter-active {
  height: auto !important;
}
.eais-burger-menu {
	margin-top: -52px;
	padding-right: 4px;
	margin-bottom: 16px;
}
.eais-burger-menu .v-btn .v-btn__content .v-icon {
	color: #a5a7b2;
}
.allactive .theme--light.v-input--switch__track,
.allactive .theme--light.v-input--switch__thumb {
  color: #82b1ff !important;
}
.eais-search-bar {
  -webkit-box-flex: inherit;
  -ms-flex: inherit;
  flex: inherit;
  width: 800px;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  -webkit-transition: width 0.3s ease-in-out;
  transition: width 0.3s ease-in-out;
  min-height: 40px !important;
  margin-left: 0.5rem;
  border: 1px solid #EBEDF2;
}
.eais-search-bar .v-input__prepend-outer {
  margin: 0 !important;
  padding: 0.5rem 0.75rem;
}
.eais-search-bar .v-input__control {
  min-height: 48px !important;
}
.eais-search-bar .v-input__control .v-input__slot {
  margin: 0;
}
.app-card-title {
  min-height: 68px;
}
</style>

<script>
import { mapGetters } from "vuex";

// import AuthService from "./auth/AuthService";
//
// const auth = new AuthService();
//
// const { login, logout, authenticated, authNotifier } = auth;

export default {
  data() {
    // authNotifier.on("authChange", authState => {
    //   this.authenticated = authState.authenticated;
    // });
    return {
      // auth,
      // authenticated
    };
  },
  mounted() {
    // if (
    //   this.selectedLocale.locale === "he" ||
    //   this.selectedLocale.locale === "ar"
    // ) {
    //   this.$store.dispatch("rtlLayout");
    // }
  },
  computed: {
    ...mapGetters([
      "darkMode",
      "collapseSidebar",
      "boxLayout",
      "rtlLayout",
      "selectedLocale"
    ])
  }
};
</script>
