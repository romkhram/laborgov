<template>
  <div>
    <template v-for="item in items">
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
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  data() {
    return {
      items: [
				{ title: 'Информация', path: 'info', exact: true },
  			{ title: 'Реквизиты запроса', path: 'request', exact: true },
    		{ title: 'Дополнительные сведения', path: 'elements', exact: true },
    		{ title: 'Документы', path: 'scans', exact: true }
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
