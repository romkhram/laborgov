<template>
	<div>
				<v-container fluid class="eais__readerform">
						<v-layout row wrap>

			        <!-- <v-flex md3 py-1>
			          <span class="body-1">Предприятие ОГРН:</span>
			          <span class="subheading font-weight-medium">{{oneItem.data.ogrn}}</span>
			        </v-flex>
							
			        <v-flex md8 py-1>
			          <span class="body-1">Название:</span>
			          <span class="subheading font-weight-medium">{{oneItem.data.legalpersonname}}</span>
			        </v-flex>

							<v-flex md12 py-1>
							  <v-divider></v-divider>
							</v-flex> -->

							<v-flex md6 py-1>
								<span class="body-1">Статус:</span>
								<span class="subheading font-weight-medium">
									<span v-if="oneItem.data.status !== null">
										{{ sprGuRequestStatuses.find(x => x.typ_cod == oneItem.data.status).typ_name }}
									</span>
									</span>
							</v-flex>
							<v-flex md2 py-1>
							  <span class="body-1" >Идентификатор:</span>
							  <span class="subheading font-weight-medium">{{oneItem.id}}</span>
							</v-flex>
							<v-flex md2 py-1>
							  <span class="body-1">Номер:</span>
							  <span class="subheading font-weight-medium">
									<span v-if="oneItem.data.request_num">{{oneItem.data.request_num}}</span>
									<span v-else-if="oneItem.id">{{ (oneItem.id).toString().slice(0,3) + 38 + (oneItem.id).toString().slice(-2) }}</span>
								</span>
							</v-flex>
							<v-flex md2 py-1>
							  <span class="body-1" >Дата:</span>
							  <span class="subheading font-weight-medium">
									<span v-if="oneItem.data.statusdate !== null">
										{{forTime(oneItem.data.statusdate)}}
									</span>
								</span>
							</v-flex>
							<v-flex md12 py-1>
							  <v-divider></v-divider>
							</v-flex>
							<v-flex md6 py-1>
							  <span class="body-1">Тип запроса:</span>
							  <span class="subheading font-weight-medium">{{oneItem.data.appname}}</span>
							</v-flex>
							<v-flex md6 py-1>
							  <span class="body-1">АЗН:</span>
							  <span class="subheading font-weight-medium" v-if="azns.find(x => x.code == oneItem.data.iogvcode)">{{azns.find(x => x.code == oneItem.data.iogvcode).txt}}</span>
							  <span class="subheading font-weight-medium" v-else>{{oneItem.data.iogvname}}</span>
							</v-flex>
							<v-flex md12 py-1>
							  <v-divider></v-divider>
							</v-flex>
							<v-flex md11 py-1>
							  <span class="body-1">Примечание:</span>
							  <span class="subheading font-weight-medium">{{oneItem.data.sob_comm}}</span>
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
								<v-card-title class="headline">Примечание</v-card-title>

								<v-container fluid grid-list-xl>
										<v-layout row wrap>

											<v-flex md12 py-1 class="required">
												<v-textarea label="Примечание" v-model="oneItem.data.sob_comm"></v-textarea>
											</v-flex>

		                </v-layout>
		            </v-container>

								<v-card-actions>
		                <v-spacer></v-spacer>

		                <!-- <v-btn v-if="this.$store.state.eais.globalCreate" color="primary" flat="flat" @click="editNewDialog = false">
		                    Отменить
		                </v-btn> -->

		                <v-btn color="primary" flat="flat" @click="editNewDialog = false">
		                    Продолжить
		                </v-btn>

		                <!-- <v-btn v-if="this.$store.state.eais.globalCreate" color="primary" flat="flat" @click="createItemVal(items, 'contacts')">
		                    Создать
		                </v-btn> -->
		            </v-card-actions>
		        </v-card>
		    </v-dialog>


	</div>
</template>

<style>
span.body-1:first-letter {text-transform: capitalize;}
</style>

<script>




// oneItem.data.people
// oneItem.data.foreigner
import editmain from "@/mixins/editmain";
export default {
	props: ['oneItem'],
  mixins: [editmain],
	data: () => ({
		azns: [
			{code: "azn10", txt: "АЗН Василеостровского р-на"},
			{code: "azn20", txt: "АЗН Выборгского района"},
			{code: "azn40", txt: "АЗН Приморского района"},
			{code: "azn50", txt: "АЗН Калининского района"},
			{code: "azn60", txt: "АЗН Кировского района"},
			{code: "azn70", txt: "АЗН Колпинского района"},
			{code: "azn100", txt: "АЗН Московского района"},
			{code: "azn110", txt: "АЗН Невского района"},
			{code: "azn120", txt: "АЗН Адмиралтейского района"},
			{code: "azn130", txt: "АЗН Петроградского района"},
			{code: "azn140", txt: "АЗН Петродворцового района"},
			{code: "azn150", txt: "АЗН Пушкинского района"},
			{code: "azn160", txt: "АЗН Курортного района"},
			{code: "azn170", txt: "АЗН Центрального района"},
			{code: "azn180", txt: "АЗН Фрунзенского района"},
			{code: "azn190", txt: "АЗН Кронштадтского района"},
			{code: "azn200", txt: "АЗН Красносельского района"},
			{code: "azn210", txt: "АЗН Красногвардейского р-н"},
			{code: "azn230", txt: "АЗН Ломоносова"},
			{code: "iogv431", txt: "СПб ГАУ Центр занятости населения Санкт-Петербурга"},
		],
    noDataText: 'Нет данных',
		sex: [
			{ code: 'F', txt: 'Женский'},
			{ code: 'M', txt: 'Мужской'},
		],
		resTypes: [
			{ code: 1, txt: 'Приглашен' },
			{ code: 2, txt: 'Регистрация проведена' },
			{ code: 3, txt: 'Ошибочное обращение'},
			{ code: 4, txt: 'Не удалось дозвониться'},
			{ code: 11, txt: 'Явка' },
			{ code: 12, txt: 'Не явка'}
		],
		applicantTypes: [
			{ code: 'P', txt: 'Физическое лицо'},
			{ code: 'L', txt: 'Юридическое лицо'},
			{ code: 'B', txt: 'Индивидуальный предприниматель'}
		],
	}),
	mounted() {

	},
	computed: {
		sprDocTypes() {
			return this.$store.state.eais.stateHandbooks.sprDocTypes;
		},
		emplCenters() {
			return this.$store.state.eais.stateHandbooks.emplCenters;
		},
		sprGuRequestStatuses() {
			return this.$store.state.eais.stateHandbooks.sprGuRequestStatuses;
		},
	},
  components: {
  },
	methods: {
	}
}

</script>
