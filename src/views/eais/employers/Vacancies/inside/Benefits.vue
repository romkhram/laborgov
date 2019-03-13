<template>
	<div>
				<v-container fluid class="eais__readerform">
						<v-layout row wrap>

							<v-flex md11 py-1>
								<span class="body-1">{{groups[0]}}:
								<v-chip small>{{childrens[0].name}}</v-chip>
								<v-chip small>{{childrens[1].name}}</v-chip>
								<v-chip small>{{childrens[2].name}}</v-chip></span>
							</v-flex>


							<v-flex md11 py-1>
								<span class="body-1">{{groups[1]}}:
								<v-chip small>{{pensions[0].name}}</v-chip>
								<v-chip small>{{pensions[1].name}}</v-chip>
								<v-chip small>{{pensions[2].name}}</v-chip></span>
							</v-flex>

							<v-flex md11 py-1>
								<span class="body-1">{{groups[2]}}:
								<v-chip small>{{housings[0].name}}</v-chip>
								<v-chip small>{{housings[1].name}}</v-chip>
								<v-chip small>{{housings[2].name}}</v-chip></span>
							</v-flex>

							<v-flex md11 py-1>
								<span class="body-1">{{groups[3]}}:
								<v-chip small>{{healths[0].name}}</v-chip>
								<v-chip small>{{healths[1].name}}</v-chip>
								<v-chip small>{{healths[2].name}}</v-chip></span>
							</v-flex>

								<v-flex md1 py-1>
										<div class="text-xs-right mrm-4">
												<v-btn class="ma-0" icon @click="emplMain = true">
														<v-icon color="primary">edit</v-icon>
												</v-btn>
										</div>
								</v-flex>

						</v-layout>
				</v-container>

				<v-dialog v-model="emplMain" max-width="1100">
		        <v-card>
		            <v-card-title class="headline">Льготы</v-card-title>

		            <v-container fluid grid-list-xl>
		                <v-layout row wrap>

		                    <v-flex md12 py-1>
					           <v-select
			                v-model="childrenNew"
			                item-text="cypherName"
			                item-value="id"
			                :items="childrens"
			                chips
			                :label="groups[0]"
			                persistent-hint
				              return-object
				              single-line
				              multiple
					       		></v-select>
		                   </v-flex>

		                    <v-flex md12 py-1>
		                    	<v-select
				                 v-model="pensionNew"
				                 item-text="cypherName"
				                 item-value="id"
				                 :items="pensions"
				                 chips
				                 :label="groups[1]"
				                  persistent-hint
					              return-object
					              single-line
					              multiple
					       		></v-select>
		                   </v-flex>

		                    <v-flex md12 py-1>
					          <v-select
				                 v-model="housingNew"
				                 item-text="cypherName"
				                 item-value="id"
				                 :items="housings"
				                 chips
				                  :label="groups[2]"
				                  persistent-hint
					              return-object
					              single-line
					              multiple
					       		></v-select>
		                   </v-flex>

		                    <v-flex md12 py-1>
					           <v-select
				                 v-model="healthNew"
				                 item-text="cypherName"
				                 item-value="id"
				                 :items="healths"
				                 chips
				                 :label="groups[3]"
				                  persistent-hint
					              return-object
					              single-line
					              multiple
					       		></v-select>
		                   </v-flex>

		                </v-layout>
		            </v-container>

		            <v-card-actions>
		                <v-spacer></v-spacer>

		                <v-btn color="primary" flat="flat" @click="emplMain = false">
		                    Отменить
		                </v-btn>

		                <v-btn color="primary" flat="flat" @click="emplMain = false">
		                    Продолжить
		                </v-btn>
		            </v-card-actions>
		        </v-card>
		    </v-dialog>

	</div>
</template>

<style>
span.body-1:first-letter {text-transform: capitalize;}
.eais__readerform .body-1 {color: rgba(0, 0, 0, 0.50);}
.eais__readerform .subheading:empty::before {content: "\2014";}
.eais__readerform .subheading {color: #464D69;}
</style>

<script>




// oneItem.data.people
// oneItem.data.foreigner

export default {
	props: ['oneItem'],
	data: () => ({
		ownerTypeAr: [
			'организация',
			'предприниматель',
			'иногороднее',
			'филиал'
		],
		switch1: false,
		emplMain: false,
		dateMenu01: false,
		dateMenu02: false,
		dateMenu03: false,
		dateMenu04: false,
		date01: null,
		date02: null,
		date03: null,
		date04: null,
    noDataText: 'Нет данных',



		groups: ['Забота о детях', 'Льготная пенсия', 'Предоставление жилья', 'Здравоохранение'],
		children: '',
		childrens: [
			{id:'1', name: 'Питание за счет предприятия', cypher: '456'},
			{id:'2', name: 'Больница', cypher: '787'},
			{id:'3', name:'Спортивные сооружения', cypher: '098'}],
		pension: '',
		pensions: [
			{id:'1', name: 'Питание за счет предприятия', cypher: '456'},
			{id:'2', name: 'Больница', cypher: '787'},
			{id:'3', name:'Спортивные сооружения', cypher: '098'}],
		housing: '',
		housings: [
			{id:'1', name: 'Питание за счет предприятия', cypher: '456'},
			{id:'2', name: 'Больница', cypher: '787'},
			{id:'3', name:'Спортивные сооружения', cypher: '098'}],
		health: '',
		healths: [
			{id:'1', name: 'Питание за счет предприятия', cypher: '456'},
			{id:'2', name: 'Больница', cypher: '787'},
			{id:'3', name:'Спортивные сооружения', cypher: '098'}],
	}),
	mounted() {
		this.getEmplCenters();
	},
	computed: {
		EmplCenters () {
			return this.$store.state.eais.EmplCenters;
		},
		// объединение переделать в конструктор
		childrenNew() {
			this.childrens.forEach(function(p) {
				p.cypherName = p.cypher + ' ' + p.name
			})
			return this.childrens
		},
		 pensionNew() {
			this.pensions.forEach(function(p) {
				p.cypherName = p.cypher + ' ' + p.name
			})
			return this.pensions
		},
		 housingNew() {
			this.housings.forEach(function(p) {
				p.cypherName = p.cypher + ' ' + p.name
			})
			return this.housings
		},
		 healthNew() {
			this.healths.forEach(function(p) {
				p.cypherName = p.cypher + ' ' + p.name
			})
			return this.healths
		},
	},
  components: {
  },
	methods: {
		noMore(val1, val2) {
			if (val1 > val2) {
				this.oneItem.data.foreigner = val2;
			}
		},
		getEmplCenters() {
			this.$store.dispatch('getEmplCenters');
		},
		returnId() {
			console.log(this.oneItem.data.emplCenterId);
		}
	}
}

</script>
