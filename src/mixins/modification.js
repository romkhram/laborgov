import Vue from 'vue'

export default {
	data: () => ({
		fieldRules: [
			v => !!v || 'Обязательное поле'
		],
		settings: {
			maxScrollbarLength: 100
		},
		editNewDialog: false,
		switch1: false,
		editedItem: {},
		isNew: false,
    noDataText: 'Нет данных',
		approve: false,
		approveVars: {
			item: {},
			index: null
		}
	}),
	computed: {
		forEdit () {
			return this.oneItem.linkedData[this.className];
		},
		items () {
			// if (this.sortField) {
			// 	console.log(this.sortField);
			// 	var sortItems = this.oneItem.linkedData['mpArr_' + this.className].sort((prev, next) => prev.data[this.sortField] - next.data[this.sortField]);
			// 	return sortItems;
			// } else {
				return this.oneItem.linkedData['mpArr_' + this.className];
			// }
		}
	},
	methods: {
		openApprove(item, index) {
			this.approve = true;
			this.approveVars.item = item;
			this.approveVars.index = index;
		},
		deleteItem() {
			this.ldDelete(this.approveVars.item);
			console.log(this.approveVars.index);
			console.log(this.approveVars.item);
			this.items.splice(this.approveVars.index, 1);
			this.approve = false;
			this.$store.commit('dontSaved');
		},
		editItem (item) {
			console.log('editItem');
			this.isNew = false;
			this.editNewDialog = true;
			this.editedItem = item.data;
			console.log(this.editedItem);
			this.ldUpdate(item);
			this.$store.commit('dontSaved');
			this.extraFunk();
		},
		newItem () {
			this.isNew = true;
			if (this.itemPattern) {
				this.editedItem = JSON.parse(JSON.stringify(this.itemPattern));
			} else {
				this.editedItem = {};
			}
			this.editNewDialog = true;
			this.$store.commit('dontSaved');
		},


		createItemVal(items) {
// this.editNewDialog = false;
			if (JSON.stringify(this.editedItem) === '{}') {
				console.log('Заполни форму');
			} else {

				console.log('createItemVal');
				console.log(items);




				if (this.className === 'contacts') {
					items.unshift({'classCode': 'contact' });
				} else if (this.className === 'addresses') {
					items.unshift({'classCode': 'address' });
				} else {
					items.unshift({'classCode': this.className.replace('_ref', '') });
				}





				// var objlength = items.length - 1;
				Vue.set(items[0], 'data', this.editedItem);
				this.ldCreate(items[0]);
				this.editNewDialog = false;
			}
		},



		ldCreate(val) {
			if (!this.forEdit.create) {
				Vue.set(this.forEdit, 'create', []);
			}
			const ldCreate = this.forEdit.create;
			ldCreate.push(val)
		},


		ldDelete(val) {
			if (val.id) {
				if (!this.forEdit.delete) {
					Vue.set(this.forEdit, 'delete', []);
				}
				const ldDelete = this.forEdit.delete;
				ldDelete.push(val)
			} else {
				const ldCreate = this.forEdit.create;
				ldCreate.splice(ldCreate.findIndex(x => x.data.account === val.data.account), 1);
				if (ldCreate.length === 0) {
					delete this.forEdit.create;
				}
			}
		},
		ldUpdate(val) {
			if (val.id) {
				if (!this.forEdit.update) {
					Vue.set(this.forEdit, 'update', []);
				}
				const ldUpdate = this.forEdit.update;
				if (this.forEdit.update.some(elem => elem.id === val.id)) {
					console.log( ldUpdate.findIndex(x => x.id === val.id) );
				} else {
					ldUpdate.push(val)
				}
				console.log('forEdit');
				console.log(this.forEdit);
				console.log(this.oneItem.linkedData);
			}
		}
	}
}
