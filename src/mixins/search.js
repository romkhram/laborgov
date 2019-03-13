import Vue from 'vue'

export default {
	data: () => ({
	  extraSearch: false,
	  mainSearchString: '',
		noDataText: 'Нет данных',
	}),
	computed: {
		searchLoading() {
			return this.$store.state.eais.searchLoading
		},
		nudgeRight() {
			console.log(this.drawer);
			if (this.drawer) {
				return 372;
			} else {
				return 72;
			}
		},
	},
	methods: {
		isNumTrue(val) {
			var field = {
				"cond": {
					"attr": "c_client",
					"exists": {
						"cond": {
							"attr": val.attr,
							"eq": Number(val.data)
						}
					}
				}
			}
			console.log(Number(val));
			if (isNaN(val.data)) {
				return {};
			} else {
				return field;
			}
		},
		letSearch(val) {
      console.log('перед серчем');
      console.log(val);

			if (val.filter.and) {
				val.filter.and = val.filter.and.filter(x => JSON.stringify(x) !== '{}');
			}
			
      if(val) {
        this.$store.dispatch('searchListItems', {
          value: val,
          path: this.path,
					extraFields: this.extraFields
        });
        this.extraSearch = false;
      } else {
        console.log("Заполни форму");
      }
    },
		cond(val) {
			var cond = {};
			cond.attr = val.attr;
			cond[val.type] = this[val.attr];
			if (this[val.attr] == null || this[val.attr].length == 0) {
				return {};
			} else {
				return {cond};
			}
		},
		condFull(val) {
			var cond = {};
			cond.attr = val.attr;
			cond[val.type] = val.data;
			if (val.data == null || val.data.length == 0 || val.data == undefined) {
				return {};
			} else {
				return {cond};
			}
		},
		condExists(val) {
			var cond = {};
			cond.attr = val.attr;
			cond.exists = { cond: {} };
			cond.exists.cond.attr = val.existAttr
			cond.exists.cond[val.existType] = val.existName
			if (val.existName == null || val.existName.length == 0) {
				return {};
			} else {
				return {cond};
			}
		}
	}
}
