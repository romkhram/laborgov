import Vue from 'vue'
import router from '@/router'

export default {
	data: () => ({
	  empSearch: null,
		noDataText: 'Нет данных',
	}),
	computed: {
		// select server search
		serverHandDis() {
			return this.$store.state.eais.serverHandbook.disabled;
		},
		serverHandbook() {
			return this.$store.state.eais.serverHandbook.data;
		},
		forSearch() {
			var searchFields =  {
				"offset": 0,
				"limit": 500,
				"filter": {
					"or": [
						{
							"cond": {
								"attr": "companyId",
								"eq": Number(this.empSearch)
							}
						},
						{
							"cond": {
								"attr": "longName",
								"like": this.empSearch
							}
						}
					]
				},
				"orders": [
					{"asc":"longName"}
				]
			}
			if (this.empSearch.length > 0) {
				return searchFields;
			}
		}
		// select server search end
	},
	watch: {
		search (val) {
			this.empSearch = val;
		}
	},
	methods: {
		fullAsk() {
			// if (this.oneItem.data.prof_cod !== null) {
			// 	this.askDefProfs = [this.oneItem.data.prof_cod];
			// }
			var that = this;
			this.oneItem.linkedData.mpArr_pers_ask_plist_ref.forEach(function(element) {
				that.askDefProfs.push(element.data.prof_cod);
			});
			// this.askProfs = JSON.parse(JSON.stringify(this.askDefProfs));
		},
		// select server search
		letSearch() {
			this.$store.dispatch('searchInBack', this.forSearch);
		}
		// select server search end
	}
}


// import profSearch from "@/mixins/profSearch";
