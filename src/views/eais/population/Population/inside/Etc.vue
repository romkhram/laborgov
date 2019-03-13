<template>
	<div>
				<v-container fluid class="eais__readerform">
						<v-layout row wrap>

							<v-flex md11 py-1>
								<span class="body-1">Водительские категории</span>
								<span class="subheading font-weight-medium">
									<v-chip small v-for="(item, i) in driveCat"  :key="item.i">{{item}}</v-chip>
								</span>
							</v-flex>

							<v-flex md11 py-1>
								<v-divider></v-divider>
							</v-flex>

							<v-flex md11 py-1>
								<span class="body-1">Прочее</span>
								<span class="subheading font-weight-medium">
									<v-chip small v-for="(item, i) in signVal"  :key="item.i">{{item}}</v-chip>
								</span>
							</v-flex>

							<v-flex md12 py-1>
								<v-divider></v-divider>
							</v-flex>

							<v-flex md11 py-1>
								<span class="body-1">Обратился по направлению другого органа или организации</span>
								<span class="subheading font-weight-medium">{{oneItem.data.direct_name}}</span>
							</v-flex>

							<v-flex md12 py-1>
								<v-divider></v-divider>
							</v-flex>

							<v-flex md12 py-1>
								<span class="body-1">Отношение к обработке персональных данных</span>
								<span class="subheading font-weight-medium">
									<span v-if="oneItem.data.job_i !== null">{{ sprViewDatas[sprViewDatas.findIndex(x => x.typ_cod === oneItem.data.job_i)].typ_name }}</span>
								</span>
							</v-flex>

							<v-flex md12 py-1>
								<v-divider></v-divider>
							</v-flex>

							<v-flex md11 py-1>
								<span class="body-1">Примечание</span>
								<span class="subheading font-weight-medium">{{oneItem.data.comm}}</span>
							</v-flex>

							<v-flex md1 py-1>
								<div class="text-xs-right mrm-4">
									<v-btn class="ma-0" icon @click="editDialog" right>
										<v-icon color="primary">edit</v-icon>
									</v-btn>
								</div>
							</v-flex>

						</v-layout>
				</v-container>

				<v-dialog v-model="editNewDialog" max-width="1100">
		        <v-card>
			      	<v-card-title class="headline">Дополнительно</v-card-title>

	            <v-container fluid grid-list-xl>
	                <v-layout row wrap>

										<v-flex md4 py-1>
											<v-autocomplete
											multiple
											:no-data-text="noDataText"
											label="Водительские категории"
											v-model="driveCat"
											:items="driveCats"
											chips deletable-chips small-chips
											clearable
											></v-autocomplete>
										</v-flex>

										<v-flex md8 py-1>
	                     <v-text-field
	                      v-model="oneItem.data.direct_name"
	                      label="Обратился по направлению другого органа или организации"
	                    ></v-text-field>
										</v-flex>

										<v-flex md12 py-1>
											<v-select
												v-model="signVal"
												:items="sign"
												label="Прочее"
												@input="getSign()"
												multiple
												chips deletable-chips small-chips
												clearable
											></v-select>
										</v-flex>

										<v-flex md12 py-1>
											<v-autocomplete
												v-model="oneItem.data.job_i"
												:items="sprViewDatas"
	                      item-text="typ_name"
	                      item-value="typ_cod"
												label="Отношение к обработке персональных данных"
											></v-autocomplete>
										</v-flex>

										<v-flex md12 py-1>
	                     <v-text-field
	                      v-model="oneItem.data.comm"
	                      label="Примечание"
	                    ></v-text-field>
										</v-flex>

							</v-layout>
					</v-container>

					<v-card-actions>
							<v-spacer></v-spacer>

							<v-btn v-if="isNew" color="primary" flat="flat" @click="editNewDialog = false">
									Отменить
							</v-btn>

							<v-btn v-if="!isNew" color="primary" flat="flat" @click="editNewDialog = false">
									Продолжить
							</v-btn>

							<v-btn v-if="isNew" color="primary" flat="flat" @click="createItemVal(items, 'contacts')">
									Создать
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
import editmain from "@/mixins/editmain";
// oneItem.data.people
// oneItem.data.foreigner

export default {
	props: ['oneItem'],
	mixins: [editmain],
	mounted() {
		this.toSign();
	},
	data: () => ({

		sex: [{
			codeInGroup: 0,
			fullName: 'Мужской'
		}, {
			codeInGroup: 1,
			fullName: 'Женский'
		},

		],
		ownerTypeAr: [{
				code: 0,
				name: 'Организация'
			},
			{
				code: 1,
				name: 'Предприниматель'
			},
			{
				code: 2,
				name: 'Иногороднее'
			},
			{
				code: 3,
				name: 'Филиал'
			}
		],
		switch1: false,
		editNewDialog: false,
		isNew: false,
		dateMenu01: false,
		dateMenu02: false,
		dateMenu03: false,
		dateMenu04: false,
		date01: null,
		date02: null,
		date03: null,
		date04: null,
		sign: [
			'Высококвалифицированный специалист',
			'Согласен на ознакомление работодателя с данными ЛД'
		],
		signVal: [],
		driveCats: ['A', 'B', 'C', 'D', 'E'],
/*		persData: [
			{code: 0, name: 'Не определено'},
			{code: 1, name: 'Согласен на обработку персональных данных с целью передачи резюме на сайт'},
			{code: 2, name: 'Отозвано согласие на обработку персональных данных с целью передачи резюме на сайт'},
			{code: 3, name: 'Отказался от обработки персональных данных с целью передачи резюме на сайт'}
		],*/
	}),
	computed: {
		driveCat: {
			get () {
				var driveCats = this.driveCats;
				if (this.oneItem.data.driv_kat !== null) {
					var drivKat = this.oneItem.data.driv_kat.toString();
				} else {
					this.oneItem.data.driv_kat = '11111';
					var drivKat = this.oneItem.data.driv_kat.toString();
				}
				drivKat = drivKat.split('');
				var driveCat = [];
				drivKat.forEach(function(item, i, arr) {
					if (item === '2') {
						driveCat.push(driveCats[i]);
					}
				});
				return driveCat;
			},
			set (val) {
				var driveCats = this.driveCats;
				var originDriveCat = '';
				driveCats.forEach(function(item, i, arr) {
					if ( val.includes(item) ) {
						originDriveCat = originDriveCat + 2;
					} else {
						originDriveCat = originDriveCat + 1;
					}
				});
				this.oneItem.data.driv_kat = originDriveCat;
			}
		},
		cantSave() {
			if (this.oneItem.data.status !== null &&
					this.oneItem.data.inn !== null &&
					this.oneItem.data.adress_old !== null &&
					this.oneItem.data.ausp !== null &&
					this.oneItem.data.ausd !== null &&
					this.oneItem.data.ausnum !== null &&
					this.oneItem.data.austype !== null &&
					this.oneItem.data.doctype !== null &&
					this.oneItem.data.citizenship !== null &&
					this.oneItem.data.sex !== null &&
					this.oneItem.data.date_borth !== null &&
					this.oneItem.data.famn !== null &&
					this.oneItem.data.nam !== null &&
					this.oneItem.data.fam !== null &&
					this.oneItem.data.status !== undefined &&
					this.oneItem.data.inn !== '' &&
					this.oneItem.data.adress_old !== '' &&
					this.oneItem.data.ausp !== '' &&
					this.oneItem.data.ausnum !== '' &&
					this.oneItem.data.austype !== '' &&
					this.oneItem.data.doctype !== undefined &&
					this.oneItem.data.citizenship !== undefined &&
					this.oneItem.data.sex !== undefined &&
					this.oneItem.data.famn !== '' &&
					this.oneItem.data.nam !== '' &&
					this.oneItem.data.fam !== '') {
				return false;
			} else {
				return true;
			}
		},
		sprMaritalStatuses() {
			return this.$store.state.eais.stateHandbooks.sprMaritalStatuses;
		},
		sprMilitaryRanks() {
			return this.$store.state.eais.stateHandbooks.sprMilitaryRanks;
		},
		sl_oksms() {
			return this.$store.state.eais.stateHandbooks.sl_oksms;
		},
		sprDocTypes() {
			return this.$store.state.eais.stateHandbooks.sprDocTypes;
		},
		sprCLStatus() {
			return this.$store.state.eais.stateHandbooks.sprCLStatus;
		},
		statusId() {
			return this.sprCLStatus[this.sprCLStatus.findIndex(x => x.codeInGroup === this.oneItem.data.statusId)].fullName;
		},
		EmplCenters() {
			return this.$store.state.eais.stateHandbooks.emplCenters;
		},
		sprSBS() {
			return this.$store.state.eais.stateHandbooks.sprSBS;
		},
		sprOPFs() {
			return this.$store.state.eais.stateHandbooks.sprOPFs;
		},
		sprLiquidations() {
			return this.$store.state.eais.stateHandbooks.sprLiquidations;
		},
		sprPersStatuss() {
			return this.$store.state.eais.stateHandbooks.sprPersStatuss;
		},
		sprViewDatas() {
			return this.$store.state.eais.stateHandbooks.sprViewDatas;
		},
		liquidationSignId() {
			return this.sprLiquidations[this.sprLiquidations.findIndex(x => x.codeInGroup === this.oneItem.data.liquidationSignId)].fullName
		}
	},
	components: {},
	methods: {
		toSign() {
			this.signVal = [];
			console.log('Запустили признак');
			if (this.oneItem.data.hf === 1) {
				this.signVal.push('Высококвалифицированный специалист');
			}
			if (this.oneItem.data.job_priz === 1) {
				this.signVal.push('Согласен на ознакомление работодателя с данными ЛД');
			}
			console.log(this.signVal);
		},
		getSign() {
			this.oneItem.data.hf = null // Высококвалифицированный специалист
			this.oneItem.data.job_priz = null // Согласен на ознакомление работодателя с данными ЛД
			var that = this
			this.signVal.forEach(function(item, i, arr) {
				if (item === that.sign[0]) {
					that.oneItem.data.hf = 1; // Меняем Высококвалифицированный специалист
				} else if (item === that.sign[1]) {
					that.oneItem.data.job_priz = 1; // Меняем Согласен на ознакомление работодателя с данными ЛД
				}
			});
		}
	}
}
</script>
