<template>
	<div>
				<v-container fluid class="eais__readerform">
						<v-layout row wrap>

							<v-flex md11 py-1>
								<span class="body-1">Должностные обязанности:</span>
									<span class="subheading font-weight-medium">{{duties}}</span>
							</v-flex>

							<v-flex md12 py-1>
									<v-divider></v-divider>
							</v-flex>

							<v-flex md11 py-1>
								<span class="body-1">Требования к кандидату:</span>
									<span class="subheading font-weight-medium">{{requirements}}</span>
							</v-flex>

							<v-flex md11 py-1>
								<span class="body-1">Условия работы и компенсации:</span>
									<span class="subheading font-weight-medium">{{conditions}}</span>
							</v-flex>

							<v-flex md12 py-1>
									<v-divider></v-divider>
							</v-flex>

							<v-flex md11 py-1>
								<span class="body-1">Прочая информация для клиента:</span>
									<span class="subheading font-weight-medium">{{forClient}}</span>
							</v-flex>

							<v-flex md11 py-1>
								<span class="body-1">Прочая информация по работодателю:</span>
									<span class="subheading font-weight-medium">{{forEmployer}}</span>
							</v-flex>

							<v-flex md11 py-1>
								<span class="body-1">Прочее:</span>
									<span class="subheading font-weight-medium">{{other}}</span>
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
		            <v-card-title class="headline">Сведения о вакансии</v-card-title>

		            <v-container fluid grid-list-xl>
		                <v-layout row wrap>

											<v-flex md6 py-1>
												<v-textarea
													label="Должностные обязанности"
												></v-textarea>
											</v-flex>

											 <v-flex md6 py-1>
												<v-textarea
													label="Требования к кандидату"
												></v-textarea>
											</v-flex>

											 <v-flex md6 py-1>
												<v-textarea
													label="Условия работы и компенсации"
												></v-textarea>
											</v-flex>

											 <v-flex md6 py-1>
												<v-textarea
													label="Прочая информация для клиента"
												></v-textarea>
											</v-flex>

											 <v-flex md6 py-1>
												<v-textarea
													label="Прочая информация по работодателю"
												></v-textarea>
											</v-flex>

											 <v-flex md6 py-1>
												<v-textarea
													label="Прочее"
												></v-textarea>
											</v-flex>


		                </v-layout>
		            </v-container>


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
	}),
	mounted() {
		this.getEmplCenters();
	},
	computed: {
		EmplCenters () {
			return this.$store.state.eais.EmplCenters;
		}
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
