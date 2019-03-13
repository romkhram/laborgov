<template>
   <v-list-tile class="sidebar-profile">
		<v-list-tile-avatar>
      <i class="material-icons">
        <!-- alternate_email -->
        how_to_reg
      </i>
			<!-- <img src="/ui/static/avatars/user-4.jpg" alt="avatar" height="40" width="40" class="img-responsive" /> -->
		</v-list-tile-avatar>
		<v-list-tile-content class="ml-3">
			<v-list-tile-title>
        <span>{{userData.fullName}}</span>
        <span v-if="userData.position !== null">{{userData.position}}</span>
        <span v-if="userData.email !== null">{{userData.email}}</span>
      </v-list-tile-title>
		</v-list-tile-content>
		<v-menu
			bottom
			offset-y
			left
			content-class="userblock-dropdown"
			nudge-top="-10"
			nudge-right="0"
			transition="slide-y-transition"
		>
			<v-btn dark icon slot="activator" class="ma-0">
					<v-icon>more_vert</v-icon>
			</v-btn>
			<div class="dropdown-content">
				<div class="dropdown-top white--text primary">
					<span class="white--text fs-14 fw-bold d-block">{{userData.fullName}}</span>
					<span class="d-block fs-12 fw-light">{{userData.email}}</span>
				</div>
				<v-list class="dropdown-list">
					<template v-for="userLink in userLinks" v-if="userLink.id !== 4">
						<v-list-tile :to="getMenuLink(userLink.path)" :key="userLink.id">
							<i :class="userLink.icon"></i>
							<span>{{userLink.title}}</span>
						</v-list-tile>
					</template>
					<template v-else>
						<v-list-tile @click="logoutUser" :key="userLink.id">
							<i :class="userLink.icon"></i>
							<span>{{userLink.title}}</span>
						</v-list-tile>
					</template>
				</v-list>
			</div>
		</v-menu>
   </v-list-tile>
</template>
<style>
  .Eais-sidebar .v-list__tile__title {
    height: auto;
  }
  .Eais-sidebar .sidebar-profile .v-list__tile__title span {
    display: block;
  }
  .v-list__tile__avatar .v-avatar .material-icons {
    font-size: 40px;
    color: #0e7dc2;
  }
</style>
<script>
// import { getCurrentAppLayout } from "Helpers/helpers";

export default {
  beforeMount() {
    this.getUserData();
  },
	data() {
		return {
			userLinks: [
				// {
				// 	id: 1,
				// 	title: 'Профиль',
				// 	icon: 'ti-user mr-3 primary--text',
				// 	path: '/users/user-profile'
				// },
				// {
				// 	id: 3,
				// 	title: 'Список пользователей',
				// 	icon: 'ti-bell mr-3 info--text',
				// 	path: '/users/users-list'
				// },
				{
					id: 4,
					title: 'Выйти',
					icon: 'ti-power-off mr-3 error--text'
				}
			]
		}
	},
  computed: {
    userData() {
      return this.$store.state.eais.userData;
    }
  },
  methods: {
    getUserData() {
      this.$store.dispatch("getUserData");
    },
    logoutUser() {
      window.location.reload();
      // this.$store.dispatch("logoutUserFromFirebase", this.$router);
  	 },
  	 // getMenuLink(path) {
  		//  return '/' + getCurrentAppLayout(this.$router) +  path;
  	 // }
  }
};
</script>
