<template>
  <div>
    <!-- <template v-for="(category, key) in menus">
      <div :key="key">
        <div class="sidebar-title px-3">
        </div> -->
        <template v-for="item in items">
          <!-- <template v-if="item.items!= null">
            <v-list-group
              :key="item.title"
              prepend-icon="arrow_right"
              append-icon=""
              no-action
              v-model="item.active"
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
                v-if="subItem !== null"
                :to="!subItem.exact ? `/${getCurrentAppLayoutHandler() + subItem.path}` : subItem.path"
              >
                <v-list-tile-content>
                  <v-tooltip right>
                  <v-list-tile-title slot="activator">{{subItem.title}}</v-list-tile-title>
                  <span>{{subItem.title}}</span>
                </v-tooltip>
                </v-list-tile-content>
              </v-list-tile>
            </v-list-group>
          </template> -->
          <template>
            <v-list-tile
              :to="!item.exact ? `/${getCurrentAppLayoutHandler() + item.path}` : item.path"
              :key="item.path"
            >
              <v-list-tile-action>
                <i class="zmdi zmdi-caret-right"></i>
              </v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-title slot="activator">
                  <i class="mr-2 zmdi" :class="item.action"></i>
                  <span>{{item.title}}</span>
                </v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
          </template>
        </template>
      <!-- </div>
    </template> -->
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  data() {
    return {
      items: [
				{ title: 'Профессия', path: 'professions', exact: true }
			],
      settings: {
        maxScrollbarLength: 160
      }
    };
  },
  components: {
  },
  computed: {
    ...mapGetters(["sidebarSelectedFilter", "menus"])
  },
	mounted(){
		this.$store.dispatch("setActiveMenuGroup", this.$router);
    this.$store.commit('changeSidebarFilterHandler2', 1);
	},
  methods: {
    textTruncate(text) {
      return textTruncate(text, 18);
    },
    getCurrentAppLayoutHandler() {
      return getCurrentAppLayout(this.$router);
    }
  }
};
</script>
