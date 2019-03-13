<!-- Side Structure -->
<template>
  	<div class="sidebar" :class="sidebarSelectedFilter.class">
    	<vue-perfect-scrollbar class="scroll-area" :settings="settings">
        <v-toolbar flat class="transparent scroll-area navigation">
          <v-list>
				<app-logo></app-logo>
        <user-block class="my-4"></user-block>

        <router-view name="menu"></router-view>

          </v-list>
        </v-toolbar>
    	</vue-perfect-scrollbar>
  	</div>
</template>

<script>
import UserBlock from "./UserBlock";
// import { textTruncate, getCurrentAppLayout } from "Helpers/helpers";
import { mapGetters } from "vuex";
import AppLogo from "Components/AppLogo/AppLogo";

export default {
  data() {
    return {
      settings: {
        maxScrollbarLength: 160
      }
    };
  },
  components: {
    UserBlock,
    AppLogo
  },
  computed: {
    ...mapGetters(["sidebarSelectedFilter", "menus"])
  },
	mounted(){
		this.$store.dispatch("setActiveMenuGroup", this.$router);
	},
  methods: {
    textTruncate(text) {
      return textTruncate(text, 18);
    },
    // getCurrentAppLayoutHandler() {
    //   return getCurrentAppLayout(this.$router);
    // }
  }
};
</script>
