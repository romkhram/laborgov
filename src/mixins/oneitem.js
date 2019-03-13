import Vue from 'vue'
import router from '@/router'

export default {
	data: () => ({
		noDataText: 'Нет данных',
	}),
	computed: {
		pageBreadcrumb() {
			return this.$breadcrumbs[0].meta.breadcrumb;
		}
	},
	methods: {
		openShureDialog() {
			// this.$store.commit('notNew');
			if (this.$store.state.eais.oneItem.saved) {
				this.$store.commit('toggleShureDialog');
			} else {
		    this.$store.commit('assignInsideSearch');
				router.push(this.eaisRoutes);
			}
		},
		create() {
			this.oneItem.savePath = this.savePath;
			console.log(this.oneItem);
			this.$store.dispatch('createOneItem', this.oneItem);
		},
		send() {
			this.allObject = this.oneItem;
			this.oneItem.savePath = this.savePath;
			console.log(this.oneItem);
			this.$store.dispatch('sendPutOneItem', this.oneItem);
		},
		changeSidebarFilterHandler(filter) {
			console.log(filter);
			this.$store.commit('changeSidebarFilterHandler2', filter);
		},
		getHandbook(val) {
      this.$store.dispatch('getReferences', val);
    },
	}
}
