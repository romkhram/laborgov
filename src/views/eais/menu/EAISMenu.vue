<template>
  <div>

    <!-- <v-list>
      <v-list-group
        v-for="(category, key) in menus"
        v-model="category.active"
        :key="category.title"
        :prepend-icon="category.action"
        no-action
      >
        <v-list-tile slot="activator">
          <v-list-tile-content>
            <v-list-tile-title>{{ category.title }}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>

        <v-list-tile
          v-for="subItem in category.items"
          :key="subItem.title"
          @click=""
        >
          <v-list-tile-content>
            <v-list-tile-title>{{ subItem.title }}</v-list-tile-title>
          </v-list-tile-content>

          <v-list-tile-action>
            <v-icon>{{ subItem.action }}</v-icon>
          </v-list-tile-action>
        </v-list-tile>
      </v-list-group>
    </v-list> -->

    <template v-for="(category, key) in menus">
      <div :key="key">
        <div class="sidebar-title px-3">
        </div>
        <template v-for="item in category">
          <template>
            <v-list-group
              :key="item.title"
              prepend-icon="arrow_right"
              append-icon=""
              no-action
              v-model="item.active"
              class="allUsers"
              :class="item.className"
            >

              <v-list-tile slot="activator">
                <v-list-tile-content>
                  <v-list-tile-title>
                    <i class="mr-2" :class="item.typeAction">{{item.action}}</i>
                    <span>{{item.title}}</span>
                  </v-list-tile-title>
                </v-list-tile-content>
              </v-list-tile>

              <v-list-tile
                v-for="subItem in item.items"
                v-bind:key="subItem.title"
                :to="subItem.path"
              >
                <v-list-tile-content>
                  <v-tooltip right>
                  <v-list-tile-title slot="activator">{{subItem.title}}</v-list-tile-title>
                  <span>{{subItem.title}}</span>
                </v-tooltip>
                </v-list-tile-content>

              </v-list-tile>


            </v-list-group>
          </template>


          <!-- <template v-else>
            <v-list-tile
              :to="!item.exact ? `/${getCurrentAppLayoutHandler() + item.path}` : item.path"
              :key="item.path"
            >
              <v-list-tile-action>
                <i class="zmdi zmdi-caret-right"></i>
              </v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-title>
                  <i class="mr-2 zmdi" :class="item.action"></i>
                  <span>item.title</span>
                </v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
          </template> -->


        </template>
      </div>
    </template>
<!-- <v-btn color="primary" @click="showMenuData">text</v-btn> -->
  </div>
</template>

<style>
.Eais-sidebar .v-list__group--active .v-list__group__items {
  height: auto !important;
}
</style>

<script>
import { mapGetters } from "vuex";

export default {
  data() {
    return {

      settings: {
        maxScrollbarLength: 160
      }
    };
  },
  components: {
  },
  computed: {
    menus() {
      this.getVisible();
      return this.$store.state.sidebar.menus
    },
    user() {
      console.log('userNameDB');
      console.log(this.$store.state.eais.userData.userNameDB);
      return this.$store.state.eais.userData.userNameDB;
    }
    // ...mapGetters(["sidebarSelectedFilter", "menus"])
  },
	mounted(){
		this.$store.dispatch("setActiveMenuGroup", this.$router);
    this.$store.commit('changeSidebarFilterHandler2', 0);
    this.getVisible();
    // console.log('Запустили роли');
    // this.empsOn();
	},
  methods: {
    showMenuData() {
      console.log("пункты меню");
      console.log(this.menus);
    },
    textTruncate(text) {
      return textTruncate(text, 18);
    },
    getCurrentAppLayoutHandler() {
      return getCurrentAppLayout(this.$router);
    },


      // persOn() {
      //   this.menuVisible = this.user
      //   this.getVisible();
      // },
      empsOn() {
        this.menuVisible = this.user
        this.getVisible();
      },
      // empsAll() {
      //   this.menuVisible = 'all'
      //   this.getVisible();
      // },
      getVisible() {
        var userRole = this.$store.state.eais.userData.userNameDB;
        if (userRole == 'ORGUSER' || userRole == 'PERSUSER') {
          console.log('Ограниченные права');
          document.querySelectorAll('.allUsers').forEach(function(el){
            el.style.display = "none";
          });
        }
        document.querySelectorAll('.' + userRole).forEach(function(el){
          el.style.display = "block";
        });
      }
  }
};
</script>
