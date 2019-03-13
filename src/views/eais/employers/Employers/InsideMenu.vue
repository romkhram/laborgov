<template>
  <div>
        <template v-for="item in items">
          <template>
            <v-list-tile
              :to="item.path"
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
				{ title: 'Реквизиты', path: 'requisites', exact: true },
				{ title: 'Расчетный счет', path: 'giro', exact: true },
        { title: 'ОКВЭД', path: 'okved', exact: true },
				{ title: 'Контакты', path: 'contacts', exact: true },
				{ title: 'Адреса', path: 'addresses', exact: true },
				// { title: 'Среднесписочная численность', path: 'averagenumber', exact: true },
				// { title: 'Дополнительно', path: 'additionally', exact: true },
				{ title: 'Результаты', path: 'results', exact: true },
				// { title: 'Мероприятия', path: 'events', exact: true }
			],
      settings: {
        maxScrollbarLength: 160
      }
    };
  },
  components: {
  },
  computed: {
  },
	mounted(){
		// this.$store.dispatch("setActiveMenuGroup", this.$router);
    this.$store.commit('changeSidebarFilterHandler2', 1);
	},
  methods: {
    // textTruncate(text) {
    //   return textTruncate(text, 18);
    // },
    // getCurrentAppLayoutHandler() {
    //   return getCurrentAppLayout(this.$router);
    // }
  }
};
</script>
